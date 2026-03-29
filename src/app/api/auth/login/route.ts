import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide both email and password" },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await User.findOne({ email });

    // Auto-create a default admin if there are no users in the DB (for initial setup)
    if (!user) {
      const count = await User.countDocuments();
      if (count === 0 && email === "admin@masoft.com") {
        const hashedPassword = await bcrypt.hash("admin", 10);
        user = await User.create({ email, password: hashedPassword, name: "Admin" });
      } else {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Sign JWT Token
    const payload = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
    
    const token = await signToken(payload);
    
    // Set cookie via jose auth standard
    await setAuthCookie(token);

    return NextResponse.json({ message: "Login successful", user: payload }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
