import { NextResponse } from "next/server";

import User from "@/db/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

export const runtime = "edge";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;
  try {
    await dbConnect();
    const validatedData = UserSchema.partial().safeParse(body);

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    const user = await User.findOne({ email });

    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
