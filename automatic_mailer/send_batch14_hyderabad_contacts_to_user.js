/**
 * SEND BATCH 14 - FRESH HYDERABAD WHATSAPP/PHONE CONTACTS TO USER
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

const contactsData = [
  {
    company: "PoloSoft Technologies",
    contactPerson: "Laxmipriya Pradhan (HR)",
    phone: "+91 9938037974",
    whatsappLink: "https://wa.me/919938037974",
    email: "hr@polosoftech.com",
    role: "Developer – Full Stack & AI (2–5 Years) / Developer – Front End (Angular/React 2–5 Years)",
    location: "Hyderabad & Bhubaneswar (Full-Time)",
    experienceBracket: "2 to 5 Years (DIRECT MATCH)",
    notice: "Immediate Joiner",
    urgency: "HIGH VALUE - DIRECT RECRUITER WHATSAPP & EMAIL (2-5 YRS MATCH)",
    pitch: `Hi Laxmipriya,

I saw your hiring post for Developer – Full Stack & AI and Front End (React) openings in Hyderabad (2–5 Years experience).

I have strictly 2 years of professional software engineering experience at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system in Electron with local LAN real-time synchronization and role-based web platforms.

My core expertise spans React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), REST APIs, and databases (SQL/MongoDB). I ramp up on new frameworks and tools rapidly (mastering Electron.js in RestoSoft within a single week).

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available in Hyderabad for full-time work.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is ready to share. Looking forward to connecting.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Vmanico",
    contactPerson: "Raj HR (HR Operations Manager)",
    phone: "+91 9052509995",
    whatsappLink: "https://wa.me/919052509995",
    email: "Direct Phone Call to Schedule Interview",
    role: "Java Full Stack Developer (React / Node.js / Express.js / REST APIs / SQL)",
    location: "Hyderabad – Hitech City (Work From Office)",
    experienceBracket: "Entry Level / 2 Years (5 Vacancies)",
    notice: "In-Person Interviews Tuesday & Wednesday in Hitech City",
    urgency: "DIRECT CALL TO SCHEDULE IN-PERSON INTERVIEW IN HITECH CITY",
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
    company: "Caltek",
    contactPerson: "Sravya Datla",
    phone: "+91 9666742743",
    whatsappLink: "https://wa.me/919666742743",
    email: "hrit@caltek.us",
    role: "Full Stack Developer (ReactJS, Node.js, JavaScript, MySQL, MongoDB, Docker, REST APIs)",
    location: "Hyderabad",
    experienceBracket: "7–10 Years (Fast-Learning Pitch)",
    notice: "Immediate Joiner",
    urgency: "DIRECT RECRUITER WHATSAPP & PHONE",
    pitch: `Hi Sravya,

I saw your hiring post for the Full Stack Developer role in Hyderabad requiring ReactJS, Node.js, JavaScript, REST APIs, and databases.

I have 2 years of professional software engineering experience at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN synchronization and role-based web platforms).

My core technical stack covers React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), REST APIs, and MySQL/MongoDB. I have a steep learning curve and ramp up on unfamiliar tools rapidly (mastering Electron.js in RestoSoft within a week).

I am an immediate joiner (official LWD Nov 11, negotiable for immediate release upon offer) and available in Hyderabad. If you have active or upcoming openings where my skills fit, I would love to connect.

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
  console.log("Preparing Batch 14 Hyderabad Dossier for test email:", TARGET_EMAIL);

  let contactsHtml = contactsData
    .map(
      (c, i) => `
    <div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 18px; margin-bottom: 20px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eaeef2; padding-bottom: 10px; margin-bottom: 12px;">
        <h3 style="margin: 0; color: #0969da; font-size: 17px;">#${i + 1}. ${c.company} — ${c.role}</h3>
        <span style="background-color: #dafbe1; color: #1a7f37; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 12px; border: 1px solid #aceebb;">${c.urgency}</span>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 12px;">
        <tr>
          <td style="width: 130px; padding: 4px 0; color: #57606a; font-weight: 600;">Contact Person:</td>
          <td style="padding: 4px 0; color: #24292f; font-weight: 600;">${c.contactPerson}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Phone / WhatsApp:</td>
          <td style="padding: 4px 0; color: #24292f;">
            <a href="tel:${c.phone}" style="color: #0969da; font-weight: bold; text-decoration: none;">${c.phone}</a> &nbsp;|&nbsp; <a href="${c.whatsappLink}" style="color: #1a7f37; font-weight: bold; text-decoration: none;" target="_blank">Open in WhatsApp</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Email:</td>
          <td style="padding: 4px 0;"><a href="mailto:${c.email}" style="color: #0969da; text-decoration: none; font-weight: 600;">${c.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Location:</td>
          <td style="padding: 4px 0; color: #24292f;">${c.location}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Experience Req:</td>
          <td style="padding: 4px 0; color: #24292f;">${c.experienceBracket}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Notice / Pivot:</td>
          <td style="padding: 4px 0; color: #cf222e; font-weight: 600;">${c.notice}</td>
        </tr>
      </table>
      <div style="background-color: #f6f8fa; border-left: 3px solid #0969da; padding: 12px 14px; border-radius: 0 4px 4px 0;">
        <div style="font-size: 12px; font-weight: bold; color: #24292f; margin-bottom: 6px;">READY-TO-COPY OUTREACH MESSAGE:</div>
        <pre style="margin: 0; font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; font-size: 12px; white-space: pre-wrap; word-break: break-word; color: #24292f; background: #ffffff; padding: 10px; border: 1px solid #d0d7de; border-radius: 4px;">${c.pitch}</pre>
      </div>
    </div>`
    )
    .join("");

  const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Batch 14 — Fresh Hyderabad WhatsApp & Phone Contacts</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; background-color: #f6f8fa; margin: 0; padding: 24px;">
  <div style="max-width: 850px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #d0d7de; padding: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
    
    <div style="border-bottom: 2px solid #0969da; padding-bottom: 14px; margin-bottom: 22px;">
      <h1 style="margin: 0 0 6px 0; color: #0969da; font-size: 22px;">Batch 14: Fresh Hyderabad WhatsApp & Phone Recruiter Leads</h1>
      <p style="margin: 0; color: #57606a; font-size: 13px;">Curated for Murali Krishna Popuri | 2 Years Full-Stack Experience | Immediate Joiner (Nov 11 LWD / Negotiable)</p>
    </div>

    <div style="background-color: #dafbe1; border: 1px solid #aceebb; border-radius: 6px; padding: 14px; margin-bottom: 24px; font-size: 13px; color: #1a7f37;">
      <strong>Top Highlights:</strong><br>
      • <strong>PoloSoft Technologies:</strong> 2–5 Years experience requirement (DIRECT MATCH for 2 years!). Full Stack & Frontend React. HR WhatsApp: <strong>9938037974</strong>.<br>
      • <strong>Vmanico (Hitech City):</strong> 5 Freshers/Entry-level Full Stack vacancies. Direct in-person interview schedule on Tuesday/Wednesday. Call HR directly: <strong>9052509995</strong>.
    </div>

    ${contactsHtml}

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
    subject: "Batch 14 — Fresh Hyderabad Recruiter WhatsApp Contacts & Direct Call Leads",
    text: `Batch 14 Fresh Hyderabad WhatsApp & Phone Recruiter Leads for Murali Krishna Popuri.

1. PoloSoft Technologies (2-5 Years Direct Match): +91 9938037974 / hr@polosoftech.com
2. Vmanico (Hitech City Walk-In Interview): +91 9052509995
3. Caltek (Full Stack React & Node): +91 9666742743 / hrit@caltek.us

Please check HTML view in your email for complete interactive tables and ready-to-copy WhatsApp messages.`,
    html: emailHtml,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Batch 14 Dossier successfully sent to test email!");
  console.log("Message ID:", info.messageId);
}

sendDossier().catch((err) => {
  console.error("Error sending dossier:", err);
  process.exit(1);
});
