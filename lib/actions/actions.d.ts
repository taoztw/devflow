import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { signIn } from "@/auth";
import Account from "@/db/account.model";
import User from "@/db/user.model";
import { ActionResponse, ErrorResponse } from "@/types/global";

import handleError from "../handlers/error";
import { SignUpSchema } from "../validations";

export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, username, email, password } = validationResult;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) {
      throw new Error("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, name, email }], {
      session,
    });
    await Account.create(
      {
        userId: newUser._id,
        name,
        provider: "credentials",
        providerAccountId: email,
        password: hashedPassword,
      },
      { session }
    );

    await signIn({ email, password, redirect: false });

    return { success: true };
  } catch (error) {
    await session.abortTransaction();

    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
