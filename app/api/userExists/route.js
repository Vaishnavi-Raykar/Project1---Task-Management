import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    console.log("Requested email:", email);

    const existingAdmin = await User.findOne({
      email: email,
    });

    if (existingAdmin) {
      return NextResponse.error(
        { message: "Admin user already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash("admin", 10);

    await User.create({
      name: "Vaishu",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({ message: "Admin user created successfully" });
  } catch (error) {
    console.log("Error:", error);

    return NextResponse.error(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}



