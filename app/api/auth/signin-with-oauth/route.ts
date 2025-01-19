import mongoose from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";

import Account from "@/db/account.model";
import User from "@/db/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { SignInWithOAuthSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

export const runtime = "edge";

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();

  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validateData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });

    if (!validateData.success)
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    const { name, username, email, image } = user;

    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    let existingUser = await User.findOne({ email }).session(session);
    if (!existingUser) {
      [existingUser] = await User.create(
        [{ name, username: slugifiedUsername, email, image }],
        { session }
      );
    } else {
      const updateData: { name?: string; image?: string } = {};
      if (existingUser.name !== name) updateData.name = name;
      if (existingUser.image !== image) updateData.image = image;
      if (Object.keys(updateData).length > 0) {
        await User.updateOne(
          { _id: existingUser._id },
          { $set: updateData }
        ).session(session);
      }
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            provider,
            providerAccountId,
            name,
            image,
          },
        ],
        { session }
      );
    }
    await session.commitTransaction();

    return NextResponse.json(
      { success: true, data: existingUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    await session.abortTransaction();
    return handleError(error, "api") as APIErrorResponse;
  } finally {
    session.endSession();
  }
}
