import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { sendEmail } from "@/lib/mailer";

const GENERIC_OK =
  "If an account exists for that email, we sent a password reset link.";

function originFromRequest(req: Request) {
  const url = new URL(req.url);
  const proto = req.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || url.host;
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const normalized = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalized) {
      return NextResponse.json({ message: "Please provide an email address" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
    });

    if (user) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: new Date(Date.now() + 60 * 60 * 1000),
          },
        }
      );

      const resetUrl = `${originFromRequest(req)}/reset-password?token=${rawToken}`;

      try {
        await sendEmail({
          to: user.email,
          subject: "Reset your MA Softs admin password",
          html: `
            <p>We received a request to reset the password for ${user.email}.</p>
            <p><a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;">Reset password</a></p>
            <p>This link expires in 1 hour. If you did not request a reset, you can ignore this email.</p>
          `,
        });
      } catch (mailError) {
        console.error("Forgot-password email failed:", mailError);
        return NextResponse.json(
          { message: "Could not send the reset email. Check SMTP settings and try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: GENERIC_OK }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
