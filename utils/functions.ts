import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ZodObject, ZodSchema, ZodType } from "zod";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/");
    // throw new Error("No user logged");
  }
  return user;
};

export const checkSchema = (schema: ZodObject, val: {}): any => {
  const test3 = schema.parse(val);
  return test3;
};
