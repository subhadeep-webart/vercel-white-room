import dbConnect from "@/lib/mongodb";
import { error, success } from "@/lib/responseHandler";
import User from "@/model/userModel";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookie = await cookies();
    await dbConnect();
    console.log("Request=====>", req);
    const { email, password } = await req.json();
    const user = await User.findOne({ email }).lean();
    console.log("User FOUND======>", user);
    if (!user) {
      return error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return error("Oops! That password doesn’t match.");
    }
    const cookieOptions = {
      name: "isLoggedIn",
      value: "true",

      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "strict",
    };

    cookie.set(cookieOptions);

    delete user.password;

    console.log("User========>", user);
    return success("login successfully", user);
  } catch (err) {
    console.log(err);
    return error({ error: err.message });
  }
}
