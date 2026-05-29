import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    // Save to database
    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      service,
      message,
    });

    // Send email notification
    // Note: You should configure these environment variables in your .env file
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Request: ${service || "General Inquiry"}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (mailError) {
        console.error("Email sending failed:", mailError);
        // We still return success because it was saved to the DB
    }

    return NextResponse.json({ success: true, id: contactMessage._id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Transmission error" }, { status: 500 });
  }
}
