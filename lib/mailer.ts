// lib/mailer.ts
import nodemailer from "nodemailer";
import dbConnect from "@/lib/mongodb";
import SiteSettingsModel from "@/models/SiteSettings";

/**
 * Sends an email using SMTP configuration stored fully dynamically 
 * and securely in MongoDB via the Admin panel.
 */
export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string; }) {
  await dbConnect();
  
  // Fetch dynamic SMTP settings from the database
  const settings = await SiteSettingsModel.findById("settings").lean();
  
  const host = settings?.smtpHost || process.env.SMTP_HOST;
  const port = settings?.smtpPort || process.env.SMTP_PORT || 465;
  const user = settings?.smtpUser || process.env.SMTP_USER;
  const pass = settings?.smtpPass || process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP settings are missing. Please configure them in the Admin panel.");
  }

  // Create transporter securely on the backend
  const transporter = nodemailer.createTransport({
    host: host as string,
    port: Number(port),
    secure: Number(port) === 465, // true for 465, false for 587
    auth: {
      user: user as string,
      pass: pass as string,
    },
  });

  return await transporter.sendMail({
    from: `"${settings?.siteName || 'System'}" <${user}>`,
    to,
    subject,
    html,
  });
}
