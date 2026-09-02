const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

if (!GMAIL_APP_PASSWORD) {
  console.error("GMAIL_APP_PASSWORD is not set in .env!");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
});

const mdPath = path.join(__dirname, "job_opportunities_curated.md");
const mdContent = fs.readFileSync(mdPath, "utf-8");

function convertMdToHtml(md) {
  let html = md
    .replace(/^# (.*$)/gim, '<h1 style="color:#1a73e8; border-bottom: 2px solid #1a73e8; padding-bottom:5px;">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 style="color:#202124; margin-top:20px; border-bottom: 1px solid #ddd; padding-bottom:4px;">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 style="color:#3c4043; margin-top:15px;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:#1a73e8; font-weight:bold; text-decoration:none;">$1</a>')
    .replace(/^\* (.*$)/gim, '<li style="margin:4px 0;">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li style="margin:4px 0;">$1</li>')
    .replace(/---/g, '<hr style="border:0; border-top:1px solid #e0e0e0; margin:15px 0;">');

  return `
    <div style="font-family: Arial, sans-serif; font-size:14px; color:#222; line-height:1.6; max-width:750px; margin:0 auto; padding:20px; background:#f9f9f9; border-radius:8px;">
      <div style="background:linear-gradient(135deg, #1a73e8, #4285f4); color:white; padding:20px; border-radius:8px 8px 0 0; text-align:center;">
        <h1 style="margin:0; font-size:22px; color:white; border:none;">🚀 High-Priority Job Opportunities & Search Links</h1>
        <p style="margin:5px 0 0; font-size:14px; opacity:0.9;">Hyderabad & Bengaluru | 24-Hour Updated Search Links & MNC Portals</p>
      </div>
      <div style="background:white; padding:25px; border-radius:0 0 8px 8px; border:1px solid #e0e0e0;">
        ${html}
      </div>
      <p style="text-align:center; font-size:12px; color:#777; margin-top:15px;">
        Sent via Automatic Mailer for Murali Krishna Popuri
      </p>
    </div>
  `;
}

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "popurimuralikrishna04@gmail.com",
  subject: "🚀 [24H UPDATED] Full-Stack Job Opportunities, Walk-Ins & MNC Career Links (Hyderabad & Bengaluru)",
  text: mdContent,
  html: convertMdToHtml(mdContent),
};

async function send() {
  console.log("Sending curated job opportunities email to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully! MessageId:", info.messageId);
}

send().catch((err) => {
  console.error("❌ Error sending email:", err);
  process.exit(1);
});
