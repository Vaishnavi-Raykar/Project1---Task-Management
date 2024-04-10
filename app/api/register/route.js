import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("User present", name, email, password);
    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword, role: "user" });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.log("User exist", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
