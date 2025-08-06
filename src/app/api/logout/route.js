import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();

    // Clear authentication cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Expire immediately
    };

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    );

    // Clear the 'token' cookie that is set by the login endpoint
    response.cookies.set("token", "", cookieOptions);

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    // Always attempt to clear cookies
    const response = NextResponse.json(
      {
        success: false,
        error: "Logout failed",
      },
      { status: 500 }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    };

    // Clear the 'token' cookie that is set by the login endpoint
    response.cookies.set("token", "", cookieOptions);

    return response;
  }
}
