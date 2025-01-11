"user server";

import { Session } from "next-auth";
import { ZodError, ZodSchema } from "zod";

import { auth } from "@/auth";

import { ValidationError } from "../http-errors";
import dbConnect from "../mongoose";

type ActionOptions<T> = {
  params?: T;
  shema?: ZodSchema<T>;
  authorize?: boolean;
};

async function action<T>({ params, shema, authorize }: ActionOptions<T>) {
  if (params && shema) {
    try {
      shema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error("Schema validate error");
      }
    }
  }

  let session: Session | null = null;
  if (authorize) {
    session = await auth();

    if (!session) {
      return new Error("Unauthorized");
    }
  }

  await dbConnect();

  return { params, session };
}

export default action;
