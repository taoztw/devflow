import { NextResponse } from "next/server";

import User from "@/db/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

export const runtime = "edge";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await dbConnect();
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Delete
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await dbConnect();
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User not found");

    return NextResponse.json({ success: true, data: user }, { status: 204 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// PUT
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await dbConnect();
    const body = await request.json();
    const validatedData = UserSchema.partial().safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const user = await User.findByIdAndUpdate(id, validatedData, { new: true });
    if (!user) throw new Error("User not found");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
