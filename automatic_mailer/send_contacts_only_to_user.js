/**
 * SEND CONTACTS & READY-TO-COPY MESSAGES ONLY TO USER
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
    name: "Kanchan Kamankar",
    company: "Ampcus Tech",
    role: "Java & React Full Stack Developer (Hyderabad / Bangalore)",
    phone: "+91 8010900752",
    email: "kanchan.kamankar@ampcustech.com",
    message: `Hi Kanchan,

I saw your LinkedIn post hiring Full Stack Developers in Hyderabad/Bangalore.

I am a Full-Stack Developer with 2 years of experience specializing in React.js, TypeScript, Node.js, and REST APIs. I currently work at YoungMinds building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite roles in Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri

I would love to connect for a short conversation. My resume is available upon request.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Gollapalli Pavani",
    company: "Eversoft Technologies",
    role: "Full Stack Developer (React.js, TypeScript, APIs) | Hyderabad",
    phone: "+91 9032610202",
    email: "pavani.gollapalli@eversoftit.com",
    message: `Hi Pavani,

I saw your hiring post on LinkedIn regarding Full Stack development opportunities in Hyderabad.

I am a Full-Stack Developer with 2 years of professional experience building responsive web applications using React.js, TypeScript, Node.js, and RESTful APIs. At YoungMinds, I build RestoSoft—an offline-first POS system with local LAN real-time synchronization.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and based in AP ready to relocate to Hyderabad immediately.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Please let me know if we can connect regarding suitable openings.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Pavan Kalyan",
    company: "Greenbuds Technology (Client: Deloitte)",
    role: "Java Full Stack Developer (ReactJS / TypeScript / APIs) | Hyderabad",
    phone: "+91 6281477084",
    email: "mpavankalyan@greenbudstechnology.com",
    message: `Hi Pavan,

I came across your LinkedIn post for the Java & React Full Stack Developer requirement in Hyderabad.

I am a Full-Stack Developer with 2 years of production experience working on React.js, TypeScript, REST APIs, and database persistence. Currently at YoungMinds, I develop RestoSoft (offline-first POS desktop platform with LAN real-time sync).

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to interview immediately.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri

Looking forward to connecting with you.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Nitin K / Placement Team",
    company: "PEIT Consultants",
    role: "Full Stack Developer (React / Spring Boot / APIs) | Hyderabad MNC Requirement",
    phone: "+91 9866514276 / +91 8125690271",
    email: "info@peit.in",
    message: `Hi Nitin & PEIT Team,

I saw your post hiring Full Stack Developers for MNC opportunities in Hyderabad.

I am a Full-Stack Developer with 2 years of software engineering experience focused on React.js, TypeScript, Node.js, and REST APIs. I currently build RestoSoft at YoungMinds (offline-first POS desktop system in Electron with local LAN real-time sync).

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid roles in Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Would appreciate the opportunity to discuss open roles with your team.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Gowtham Kumar",
    company: "Greenbuds Technology (Client: IBM / SAP Labs)",
    role: "Full Stack Developer (Node.js, UI5, APIs) / SAP Labs Bangalore",
    phone: "+91 9490313091",
    email: "bsgowthamkumar@greenbudstechnology.com",
    message: `Hi Gowtham,

I came across your LinkedIn post regarding Full Stack openings for SAP Labs in Bangalore.

I am a Full-Stack Developer with 2 years of professional software engineering experience specializing in React.js, Node.js, TypeScript, and REST APIs. At YoungMinds, I build RestoSoft—an offline-first POS desktop system in Electron with local LAN real-time synchronization.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to attend the Face-to-Face technical round in Bangalore.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri

I would appreciate the chance to discuss this opportunity. My resume is attached upon request.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Rajitharaj Munny",
    company: "Global Digital Resources (Client: Radwell International)",
    role: "Full Stack Developer – MERN Stack / E-commerce (Bangalore)",
    phone: "+91 9390801112",
    email: "Rajitha@globaldigitalresources.com",
    message: `Hi Rajitha,

I saw your hiring post on LinkedIn for Full Stack MERN Developers for Radwell International in Bangalore.

I am a Full-Stack Developer with 2 years of hands-on production experience engineering web applications using React, Node.js, Express, MongoDB, and RESTful APIs. Currently at YoungMinds, I build RestoSoft (offline-first POS desktop platform with LAN real-time sync).

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for day-one onsite in Bangalore.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Looking forward to connecting with you.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Anit Kumar",
    company: "Acestack LLC",
    role: "Full-Stack Developer | Python / Angular / AI-ML | Bangalore / Chennai",
    phone: "+91 6394879535",
    email: "anitK@acestackllc.com",
    message: `Hi Anit,

I came across your post hiring Full-Stack Developers in Bangalore.

I am a Full-Stack Developer with 2 years of software development experience specializing in React.js, TypeScript, Node.js, and REST APIs. At YoungMinds, I build RestoSoft (an offline-first POS desktop system with local LAN real-time synchronization).

I have a fast learning curve and ramp up on new frameworks within a week in production environments. I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate to Bangalore immediately.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
];

async function sendSummary() {
  console.log(`Connecting to SMTP and sending contacts summary to ${TARGET_EMAIL}...`);
  await transporter.verify();

  let plain = "MURALI KRISHNA POPURI - RECRUITER CONTACTS & READY-TO-COPY WHATSAPP/SMS MESSAGES\n";
  plain += "=================================================================================\n\n";

  contacts.forEach((c, idx) => {
    plain += `[CONTACT ${idx + 1}] ${c.name} (${c.company})\n`;
    plain += `Role: ${c.role}\n`;
    plain += `Phone: ${c.phone}\n`;
    plain += `Email: ${c.email}\n`;
    plain += `--- READY-TO-COPY MESSAGE ---\n`;
    plain += `${c.message}\n`;
    plain += `-----------------------------\n\n`;
  });

  let html = `<div style="font-family: Arial, sans-serif; max-width: 750px; margin: 0 auto; color: #222222; line-height: 1.5;">
    <h2 style="color: #0b57d0; border-bottom: 2px solid #e1e4e8; padding-bottom: 8px;">Recruiter Mobile Contacts & Ready-to-Copy Messages</h2>
    <p style="font-size: 14px; color: #555;">Here are the verified recruiter contacts extracted from today's search feeds (Hyderabad & Bengaluru). Each has a phone number and a short, tailored message ready for you to copy and send via WhatsApp/SMS.</p>`;

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
    subject: `Recruiter Contacts & Ready-to-Copy WhatsApp Messages (${contacts.length} Contacts) - Murali Krishna`,
    text: plain,
    html: html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`SUCCESS! Summary email sent to ${TARGET_EMAIL}. Message ID: ${info.messageId}`);
}

sendSummary().catch(console.error);
