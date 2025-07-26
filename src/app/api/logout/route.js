import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request) {
  try {
    const cookieStore = await cookies()

    // Log the logout attempt
    console.log("User logout at:", new Date().toISOString())

    // Create the response
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 },
    )

    // Clear all authentication cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // This expires the cookie immediately
    }

    response.cookies.set("authToken", "", cookieOptions)
    response.cookies.set("refreshToken", "", cookieOptions)
    response.cookies.set("userRole", "", cookieOptions)
    response.cookies.set("sessionId", "", cookieOptions)

    return response
  } catch (error) {
    console.error("Logout error:", error)

    // Even if there's an error, clear cookies for security
    const response = NextResponse.json(
      {
        success: false,
        error: "Logout failed",
      },
      { status: 500 },
    )

    // Clear cookies even on error
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    }

    response.cookies.set("authToken", "", cookieOptions)
    response.cookies.set("refreshToken", "", cookieOptions)
    response.cookies.set("userRole", "", cookieOptions)
    response.cookies.set("sessionId", "", cookieOptions)

    return response
  }
}
