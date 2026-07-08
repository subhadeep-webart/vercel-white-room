import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookie = await cookies();
    const cookieOptions = {
      name: "isLoggedIn",
      value: "false",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
      sameSite: "strict",
    };

    cookie.set(cookieOptions);

    return NextResponse.json(
      {
        message: "Logged out successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred during logout",
      },
      { status: 500 }
    );
  }
}
