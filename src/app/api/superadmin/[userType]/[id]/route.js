import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Chemist from "@/models/Chemist"
import Supplier from "@/models/Supplier"

export async function GET(request, { params }) {
  try {
    await dbConnect()
    const { userType, id } = params
    let user
    switch (userType) {
      case "chemist":
        user = await Chemist.findById(id)
        break
      case "supplier":
        user = await Supplier.findById(id)
        break
      default:
        return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }
    if (!user) {
      return NextResponse.json({ error: `${userType} not found` }, { status: 404 })
    }
    return NextResponse.json({
      ...user.toObject(),
      userType,
      role: userType === "chemist" ? "Chemist" : "Supplier",
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    await dbConnect()
    const { userType, id } = params
    const updateData = await request.json()
    let Model
    if (userType === "chemist") {
      Model = Chemist
    } else if (userType === "supplier") {
      Model = Supplier
    } else {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }
    const updatedUser = await Model.findByIdAndUpdate(id, updateData, { new: true })
    if (!updatedUser) {
      return NextResponse.json({ error: `${userType} not found` }, { status: 404 })
    }
    return NextResponse.json({
      ...updatedUser.toObject(),
      userType,
      role: userType === "chemist" ? "Chemist" : "Supplier",
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
