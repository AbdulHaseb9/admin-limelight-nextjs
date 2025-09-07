import { NextResponse } from "next/server";
import { connectionDB } from "../../../../lib/Db_connection";
import Client from "../../../../lib/ClientModel";
import bcrypt from "bcryptjs";

export async function DELETE(req, { params }) {
  try {
    await connectionDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const deletedUser = await Client.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PUT(req, { params }) {
  try {
    await connectionDB();

    const { id } = params;
    const body = await req.json();
    const { username, email, password } = body;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    let updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await Client.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          joinedAt: updatedUser.joinedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Error:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET(req, { params }) {
  try {
    await connectionDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await Client.findById(id).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User fetched successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Single User Error:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}