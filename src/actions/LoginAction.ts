"use server";
import { token } from "@/constants";
import GenerateRandomString from "@/utils/GenerateRandomString.ts";
import { cookies } from "next/headers";

const LoginAction = async (
  userName: string,
  userPassword: string
): Promise<{
  message: string;
  success: boolean;
}> => {
  const clientCookies = await cookies();
  const isValidUser =
    process.env.USER_NAME! === userName &&
    userPassword === process.env.USER_PASSWORD!;
  if (isValidUser) {
    clientCookies.set(token, GenerateRandomString(70), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
    return {
      success: true,
      message: "Login successfull",
    };
  } else {
    return {
      success: false,
      message: "Invalid username or password",
    };
  }
};

export default LoginAction;
