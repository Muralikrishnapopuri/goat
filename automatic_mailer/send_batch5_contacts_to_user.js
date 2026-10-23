/**
 * SEND BATCH 5 (BENGALURU) CONTACTS & READY-TO-COPY MESSAGES TO USER
 * Target: popurimuralikrishna04@gmail.com
 */

const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TARGET_EMAIL = "popurimuralikrishna04@gmail.com";

if (!GMAIL_APP_PASSWORD) {
  console.error("FATAL: GMAIL_APP_PASSWORD is not set in .env!");
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

const contacts = [
  {
    name: "Saravanan Thayagarajan / Umadevi Sureshraja",
    company: "Buddy Power Into Tech",
    role: "Custom Web Application Developer (React JS / TypeScript / HTML5 / CSS3)",
    phone: "+91 8438280059",
    email: "hr@buddypowerintotech.com",
    notes: "Direct contact number provided in LinkedIn post for Bengaluru / Remote opportunities.",
    message: `Hi Saravanan,

I saw your hiring post on LinkedIn regarding application development opportunities in Bengaluru.

I am a Full-Stack Developer with 2 years of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), and REST APIs. At YoungMinds, I build RestoSoft—an offline-first POS desktop platform with local LAN real-time synchronization.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate to Bengaluru immediately.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri

I would appreciate connecting regarding suitable developer openings on your team.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Kobika Siva",
    company: "Meghnify HR Solution Private Limited (Client: TCS)",
    role: "Full Stack Developer (Java / React / SQL) | Bangalore & Hyderabad",
    phone: "+91 733-8787597",
    email: "WhatsApp CV submission requested in post",
    notes: "WhatsApp CV submission requested directly (+91 733-8787597). Virtual interview process.",
    message: `Hi Kobika,

I saw your hiring post on LinkedIn for the Full Stack Developer requirement in Bangalore.

I am a Full-Stack Developer with 2 years of experience working with React.js, TypeScript, REST APIs, and database systems. Currently at YoungMinds, I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for virtual interviews immediately.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri

I can share my resume PDF directly on WhatsApp or email.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
];

async function sendSummary() {
  console.log(`Connecting to SMTP and sending contacts summary to ${TARGET_EMAIL}...`);
  await transporter.verify();

  let plain = "MURALI KRISHNA POPURI - RECRUITER CONTACTS & READY-TO-COPY WHATSAPP/SMS MESSAGES (BENGALURU BATCH)\n";
  plain += "===============================================================================================\n\n";

  contacts.forEach((c, idx) => {
    plain += `[CONTACT ${idx + 1}] ${c.name} (${c.company})\n`;
    plain += `Role: ${c.role}\n`;
    plain += `Phone: ${c.phone}\n`;
    plain += `Email: ${c.email}\n`;
    plain += `Notes: ${c.notes}\n`;
    plain += `--- READY-TO-COPY MESSAGE ---\n`;
    plain += `${c.message}\n`;
    plain += `-----------------------------\n\n`;
  });

  let html = `<div style="font-family: Arial, sans-serif; max-width: 750px; margin: 0 auto; color: #222222; line-height: 1.5;">
    <h2 style="color: #0b57d0; border-bottom: 2px solid #e1e4e8; padding-bottom: 8px;">Recruiter Mobile Contacts & Ready-to-Copy Messages (Bengaluru Feed)</h2>
    <p style="font-size: 14px; color: #555;">Here are the verified recruiter contacts extracted from your latest LinkedIn feed search ("React" AND "Bangalore" / "Bengaluru"). Each has a phone/WhatsApp number and a short, tailored message ready for you to copy and send via WhatsApp/SMS.</p>`;

  contacts.forEach((c, idx) => {
    html += `
    <div style="background: #f8f9fa; border: 1px solid #dcdfe4; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
      <h3 style="margin-top: 0; color: #1f2328; font-size: 16px;">
        <span style="background: #0b57d0; color: #ffffff; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-right: 8px;">#${idx + 1}</span>
        ${c.name} &bull; <span style="color: #57606a; font-weight: normal;">${c.company}</span>
      </h3>
      <p style="margin: 4px 0; font-size: 13px;"><strong>Role:</strong> ${c.role}</p>
      <p style="margin: 4px 0; font-size: 13px;"><strong>Phone / WhatsApp:</strong> <a href="tel:${c.phone.replace(/[^0-9+]/g, '')}" style="color: #0969da; font-weight: bold;">${c.phone}</a></p>
      <p style="margin: 4px 0; font-size: 13px;"><strong>Email:</strong> ${c.email}</p>
      <p style="margin: 4px 0; font-size: 13px; color: #666;"><strong>Note:</strong> ${c.notes}</p>
      <div style="margin-top: 10px;">
        <strong style="font-size: 12px; color: #444; text-transform: uppercase;">Ready-to-Copy WhatsApp / SMS Message:</strong>
        <div style="background: #ffffff; border: 1px solid #e1e4e8; border-radius: 6px; padding: 12px; margin-top: 6px; white-space: pre-wrap; font-family: monospace; font-size: 12.5px; color: #111;">${c.message}</div>
      </div>
    </div>`;
  });

  html += `<p style="font-size: 12px; color: #888; text-align: center; margin-top: 24px;">Generated autonomously by Antigravity Mailer System</p></div>`;

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    subject: `Recruiter Phone Contacts & Ready-to-Copy WhatsApp Messages (Bengaluru Feed) - Murali Krishna`,
    text: plain,
    html: html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`SUCCESS! Summary email sent to ${TARGET_EMAIL}. Message ID: ${info.messageId}`);
}

sendSummary().catch(console.error);
