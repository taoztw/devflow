import { NextResponse } from "next/server";

import Account from "@/db/account.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

export const runtime = "edge";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await dbConnect();
    const account = await Account.findById(id);
    if (!account) throw new Error("Account not found");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
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
    const account = await Account.findByIdAndDelete(id);
    if (!account) throw new Error("Account not found");

    return NextResponse.json({ success: true, data: account }, { status: 204 });
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
    const validatedData = AccountSchema.partial().safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const account = await Account.findByIdAndUpdate(id, validatedData, {
      new: true,
    });
    if (!account) throw new Error("User not found");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
