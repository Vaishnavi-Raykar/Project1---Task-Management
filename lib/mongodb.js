import User from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Task");
    console.log("Connected to MongoDB.");

    // create a admin login if not exists
    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("pass@123", 10);

      await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
