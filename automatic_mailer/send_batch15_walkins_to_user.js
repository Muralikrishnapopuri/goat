/**
 * SEND BATCH 15 - HYDERABAD WALK-IN DRIVES & F2F INTERVIEW DOSSIER
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

const walkinsData = [
  {
    company: "Artech L.L.C.",
    role: "React JS + TypeScript Developer",
    date: "29 September 2026 (Tuesday)",
    location: "Hyderabad",
    experience: "4–6 Years (Local Hyderabad candidates preferred)",
    contactPerson: "Siddharth G. (Senior Talent Acquisition Specialist)",
    phone: "+91 8265998498",
    whatsappLink: "https://wa.me/918265998498",
    email: "siddharth.gupta@artech.com",
    urgency: "CONFIRMED WALK-IN DRIVE DATE: 29 SEPT 2026",
    pitch: `Hi Siddharth,

I saw your announcement regarding the React JS + TypeScript Walk-In Drive on 29 September 2026 in Hyderabad.

I bring 2 years of professional software engineering experience at YoungMinds Technology Solutions, where I build RestoSoft (an offline-first POS desktop system in Electron with local LAN synchronization and role-based web platforms).

My core technical stack covers React.js, TypeScript, JavaScript (ES6+), HTML5/CSS3, and REST APIs. I have a steep learning curve and ramp up on unfamiliar tools rapidly.

I am an immediate joiner (official LWD Nov 11, negotiable for immediate early release upon offer) and available in Hyderabad to attend the Walk-In Drive on 29 September.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume is ready to share. Looking forward to attending the drive.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Test Yantra",
    role: "Automation API Tester / Quality Engineer – Full Stack",
    date: "30 September 2026 (Wednesday)",
    location: "Hyderabad & Chennai",
    experience: "1–3 Years (₹5.5 LPA) & 3–5 Years (₹7.5 LPA)",
    contactPerson: "Meghana Jadhav & S Adithyan",
    phone: "+91 8105508290 (Meghana - WhatsApp Only)",
    whatsappLink: "https://wa.me/918105508290",
    email: "Meghana.j@testyantra.com / adithyan.s@testyantra.com",
    urgency: "CONFIRMED F2F INTERVIEW DATE: 30 SEPT 2026",
    pitch: `Hi Meghana,

I am reaching out regarding the Full Stack Automation & API Testing Walk-In / F2F Interview scheduled for 30th September 2026 in Hyderabad.

I have 2 years of professional software engineering experience at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system with local LAN synchronization). My core skills include REST APIs, Postman, SQL, JavaScript, React.js, and Node.js.

I am an immediate joiner (official LWD Nov 11, negotiable for immediate early release) and available for the F2F interview on 30th September in Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is ready to share. Looking forward to your confirmation.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Vmanico",
    role: "Full Stack Developer (React / Node.js / Express / SQL)",
    date: "Interviews ONLY on Tuesday & Wednesday",
    location: "Hyderabad – Hitech City (Work From Office)",
    experience: "Entry Level / 2 Years (5 Vacancies)",
    contactPerson: "Raj HR (HR Operations Manager)",
    phone: "+91 9052509995",
    whatsappLink: "https://wa.me/919052509995",
    email: "Direct Phone Call to Schedule Advance Slot",
    urgency: "IN-PERSON INTERVIEWS TUESDAY & WEDNESDAY (HITECH CITY)",
    pitch: `Hi Raj,

I saw your hiring update for Full Stack Developers with Node.js, Express.js, and React at your Hitech City office in Hyderabad.

I bring 2 years of full-time professional software engineering experience from YoungMinds Technology Solutions building RestoSoft (POS system in Electron with local LAN synchronization). My core skills are React.js, Node.js, Express.js, REST APIs, and SQL.

I am an immediate joiner (official LWD Nov 11, negotiable for immediate early release) and available to attend the in-person interview in Hitech City on Tuesday or Wednesday.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "VR Della IT Services",
    role: "React JS Developer (Micro Frontend Architecture)",
    date: "Face to Face Round Scheduled Upon Profile Review",
    location: "Hyderabad Only (Immediate Joiners Only)",
    experience: "4+ Years (Long Term Contract)",
    contactPerson: "Deepa R (Talent Acquisition)",
    phone: "DM / Email in post",
    whatsappLink: "N/A",
    email: "deepa.r@vrdella.com",
    urgency: "FACE TO FACE INTERVIEW HYDERABAD",
    pitch: `Dear Deepa,

I saw your hiring post for the React JS Developer opening in Hyderabad requiring strong React, TypeScript, Redux, and REST API integration.

I have 2 years of professional software engineering experience at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with real-time LAN synchronization). My core stack covers React.js, TypeScript, JavaScript (ES6+), Redux, and REST APIs.

I am an immediate joiner (official LWD Nov 11, negotiable for immediate release) and available in Hyderabad for a Face to Face interview.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Apptad",
    role: "Full Stack Developer (React / REST APIs) / SDET (Playwright & React)",
    date: "R1 Virtual | R2 Face-to-Face in Hyderabad (Kokapet)",
    location: "Hyderabad – Kokapet",
    experience: "4+ Years",
    contactPerson: "Shalima Singh & Sneha Parashar",
    phone: "Direct Recruiter Emails",
    whatsappLink: "N/A",
    email: "Shalima@apptad.com / sneha.parashar@apptad.com",
    urgency: "FACE-TO-FACE ROUND IN KOKAPET HYDERABAD",
    pitch: `Dear Shalima,

I have applied for the Full Stack Developer opening in Hyderabad (Kokapet).

I bring 2 years of professional engineering experience at YoungMinds Technology Solutions building RestoSoft (Electron POS desktop system with local LAN sync). My core stack is React.js, Node.js, Express, JavaScript, and REST APIs.

I am an immediate joiner (official LWD Nov 11, negotiable for immediate early release) and available in Hyderabad for the in-person interview round in Kokapet.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
];

async function sendDossier() {
  console.log("Preparing Batch 15 Hyderabad Walk-Ins Dossier for test email:", TARGET_EMAIL);

  let cardsHtml = walkinsData
    .map(
      (w, i) => `
    <div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 18px; margin-bottom: 20px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eaeef2; padding-bottom: 10px; margin-bottom: 12px;">
        <h3 style="margin: 0; color: #0969da; font-size: 17px;">#${i + 1}. ${w.company} — ${w.role}</h3>
        <span style="background-color: #fff8c5; color: #9a6700; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 12px; border: 1px solid #d4a72c;">${w.urgency}</span>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 12px;">
        <tr>
          <td style="width: 140px; padding: 4px 0; color: #57606a; font-weight: 600;">Interview Date / Mode:</td>
          <td style="padding: 4px 0; color: #cf222e; font-weight: 700;">${w.date}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Location:</td>
          <td style="padding: 4px 0; color: #24292f; font-weight: 600;">${w.location}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Contact Person:</td>
          <td style="padding: 4px 0; color: #24292f;">${w.contactPerson}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Phone / WhatsApp:</td>
          <td style="padding: 4px 0; color: #24292f;">
            ${w.phone !== "N/A" && w.phone !== "DM / Email in post" && w.phone !== "Direct Recruiter Emails"
              ? `<a href="tel:${w.phone}" style="color: #0969da; font-weight: bold; text-decoration: none;">${w.phone}</a> &nbsp;|&nbsp; <a href="${w.whatsappLink}" style="color: #1a7f37; font-weight: bold; text-decoration: none;" target="_blank">Open in WhatsApp</a>`
              : `<span style="color: #6e7781;">${w.phone}</span>`}
          </td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Email:</td>
          <td style="padding: 4px 0;"><a href="mailto:${w.email}" style="color: #0969da; text-decoration: none; font-weight: 600;">${w.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Experience Req:</td>
          <td style="padding: 4px 0; color: #24292f;">${w.experience}</td>
        </tr>
      </table>
      <div style="background-color: #f6f8fa; border-left: 3px solid #0969da; padding: 12px 14px; border-radius: 0 4px 4px 0;">
        <div style="font-size: 12px; font-weight: bold; color: #24292f; margin-bottom: 6px;">READY-TO-COPY OUTREACH MESSAGE:</div>
        <pre style="margin: 0; font-family: SFMono-Regular, Consolas, monospace; font-size: 12px; white-space: pre-wrap; word-break: break-word; color: #24292f; background: #ffffff; padding: 10px; border: 1px solid #d0d7de; border-radius: 4px;">${w.pitch}</pre>
      </div>
    </div>`
    )
    .join("");

  const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Batch 15 — Hyderabad Walk-In Drives & Face-to-Face Interviews</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; background-color: #f6f8fa; margin: 0; padding: 24px;">
  <div style="max-width: 850px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #d0d7de; padding: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
    
    <div style="border-bottom: 2px solid #0969da; padding-bottom: 14px; margin-bottom: 22px;">
      <h1 style="margin: 0 0 6px 0; color: #0969da; font-size: 22px;">Batch 15: Hyderabad Walk-In Drives & F2F Scheduled Interviews</h1>
      <p style="margin: 0; color: #57606a; font-size: 13px;">Curated for Murali Krishna Popuri | 2 Years Full-Stack Experience | Immediate Joiner (Nov 11 LWD / Negotiable)</p>
    </div>

    <div style="background-color: #fff8c5; border: 1px solid #d4a72c; border-radius: 6px; padding: 14px; margin-bottom: 24px; font-size: 13px; color: #735c0f;">
      <strong>Key Dates to Mark in Your Calendar:</strong><br>
      • <strong>29 September 2026:</strong> Artech L.L.C. React JS + TypeScript Walk-In Drive in Hyderabad. Call recruiter Siddharth at <strong>+91 8265998498</strong>.<br>
      • <strong>30 September 2026:</strong> Test Yantra API Testing / Full Stack F2F Interview in Hyderabad (₹5.5 - 7.5 LPA). WhatsApp Meghana at <strong>81055 08290</strong>.<br>
      • <strong>Tuesday & Wednesday:</strong> Vmanico Hitech City In-Person Interviews (5 Vacancies). Call Raj HR at <strong>9052509995</strong>.
    </div>

    ${cardsHtml}

    <div style="border-top: 1px solid #eaeef2; padding-top: 14px; margin-top: 28px; font-size: 12px; color: #57606a;">
      <p style="margin: 0 0 6px 0;"><strong>Candidate Profile Summary:</strong></p>
      <p style="margin: 0 0 4px 0;">• Name: Murali Krishna Popuri | Phone: +91 9347796811 | Email: popurimurali16@gmail.com</p>
      <p style="margin: 0 0 4px 0;">• Experience: Strictly 2 years professional software engineering experience (YoungMinds Technology Solutions - RestoSoft)</p>
      <p style="margin: 0 0 4px 0;">• Availability: Immediate Joiner (official LWD Nov 11, negotiable for immediate early release upon offer)</p>
      <p style="margin: 0 0 4px 0;">• Relocation: Immediately available for Hyderabad or Bengaluru</p>
      <p style="margin: 0;">• Permitted Links: Portfolio | LinkedIn | GitHub | Zestchat</p>
    </div>

  </div>
</body>
</html>`;

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    subject: "Batch 15 — Hyderabad Walk-In Drives (29 & 30 Sept) & F2F Interview Contacts",
    text: `Batch 15 Hyderabad Walk-In Drives & Face-to-Face Scheduled Interviews for Murali Krishna Popuri.

1. Artech L.L.C. Walk-In Drive (29 Sept 2026): +91 8265998498 / siddharth.gupta@artech.com
2. Test Yantra Walk-In Drive (30 Sept 2026): +91 8105508290 (WhatsApp) / Meghana.j@testyantra.com / adithyan.s@testyantra.com
3. Vmanico Hitech City In-Person Interviews (Tue/Wed): +91 9052509995
4. VR Della IT Services F2F Interview: deepa.r@vrdella.com
5. Apptad F2F Round Kokapet: Shalima@apptad.com / sneha.parashar@apptad.com

Please check HTML view in your email for complete interactive tables and ready-to-copy WhatsApp messages.`,
    html: emailHtml,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Batch 15 Dossier successfully sent to test email!");
  console.log("Message ID:", info.messageId);
}

sendDossier().catch((err) => {
  console.error("Error sending dossier:", err);
  process.exit(1);
});
