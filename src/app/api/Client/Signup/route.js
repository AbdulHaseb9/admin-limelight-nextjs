import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectionDB } from "../../../libs/Db_connection";
import Client from "../../../libs/ClientModel";

export async function POST(req) {
  try {
    await connectionDB();

    const body = await req.json();
    const { username, email, password } = body;

    // validation check
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // user already exist check
    const existingUser = await Client.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      );
    }

    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // new user create
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          joinedAt: newUser.joinedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectionDB();

    const users = await Client.find().select("-password"); // password hide kar diya

    return NextResponse.json(
      {
        message: "All users fetched successfully",
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Users Error:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}