import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ message: "Reset token is missing" }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await dbConnect();
    const hashedPassword = await bcrypt.hash(password, 10);

    const updated = await User.findOneAndUpdate(
      {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: new Date() },
      },
      {
        $set: { password: hashedPassword },
        $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 },
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "This reset link is invalid or has expired" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Password updated. You can sign in now." }, { status: 200 });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
