#!/usr/bin/env node

/**
 * ============================================================
 *  🚀 Automated Job Outreach Mailer — LinkedIn Recruiter Posts
 * ============================================================
 * Lead 1: lraveena@charterglobal.com (Charter Global - Hyderabad)
 * Lead 2: asawari.b@voltoconsulting.com (VOLTO Consulting - Hyderabad/Bangalore)
 * Resume: Murali_Krishna_Popuri_FullStack_Developer.pdf
 * ============================================================
 */

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RESUME_PATH = "/home/murali-krishna/cluad/goat/automatic_mailer/Murali_Krishna_Popuri_FullStack_Developer.pdf";
const HISTORY_FILE = path.join(__dirname, "sent_history.json");

if (!GMAIL_APP_PASSWORD) {
  console.error("❌ ERROR: GMAIL_APP_PASSWORD is not set in .env!");
  process.exit(1);
}

if (!fs.existsSync(RESUME_PATH)) {
  console.error("❌ ERROR: Resume PDF not found at:", RESUME_PATH);
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

function loadHistory() {
  if (!fs.existsSync(HISTORY_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
  } catch (err) {
    return [];
  }
}

function isAlreadySent(email, history) {
  const norm = email.toLowerCase().trim();
  return history.some((h) => h.recipientEmail === norm && h.status === "SENT");
}

function recordSent(email, company, role, messageId) {
  const history = loadHistory();
  history.push({
    timestamp: new Date().toISOString(),
    recipientEmail: email.toLowerCase().trim(),
    company,
    role,
    status: "SENT",
    messageId,
    resumeAttachment: path.basename(RESUME_PATH),
  });
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
  console.log(`✔ Recorded to sent history (${HISTORY_FILE})`);
}

const leads = [
  {
    company: "Charter Global",
    recruiterName: "Raveena Laxmishetty",
    email: "lraveena@charterglobal.com",
    role: "Full Stack Developer",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Raveena,

I saw your hiring post on LinkedIn for the Full Stack Developer position at Charter Global in Hyderabad, and I would like to put forward my application.

I have 2 years of professional experience building scalable web applications with React.js, TypeScript, JavaScript (ES6+), Node.js, Express, MongoDB, and REST/WebSocket APIs. While my core expertise is centered on the React and modern JavaScript/TypeScript ecosystem, I have a fast learning curve and a proven ability to pick up new backend frameworks, libraries, and tools within a week when collaborating with engineering teams. I am confident I will match your team's technical expectations and look forward to proving my skills in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work. I am serving my notice period with an official Last Working Day of Nov 11, but my manager is flexible and I can be released earlier to join immediately upon offer.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Raveena,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Full Stack Developer</strong> position at Charter Global in Hyderabad, and I would like to put forward my application.</p>

  <p>I have 2 years of professional experience building scalable web applications with <strong>React.js, TypeScript, JavaScript (ES6+), Node.js, Express, MongoDB, and REST/WebSocket APIs</strong>. While my core expertise is centered on the React and modern JavaScript/TypeScript ecosystem, I have a fast learning curve and a proven ability to pick up new backend frameworks, libraries, and tools within a week when collaborating with engineering teams. I am confident I will match your team's technical expectations and look forward to proving my skills in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work. I am serving my notice period with an official Last Working Day of Nov 11, but my manager is flexible and I can be released earlier to join immediately upon offer.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "VOLTO Consulting",
    recruiterName: "Asawari Bhatawdekar",
    email: "asawari.b@voltoconsulting.com",
    role: "Full Stack / React Developer",
    location: "Hyderabad / Bangalore",
    subject: "Application for Full Stack / React Developer – Murali Krishna Popuri",
    plainBody: `Hi Asawari,

I saw your hiring post on LinkedIn regarding the Developer opening across Hyderabad and Bangalore, and I would like to submit my application.

I have 2 years of professional experience with React.js, TypeScript, JavaScript (ES6+), Node.js, Express, and modern REST/WebSocket APIs. While my core technical foundation is focused on React and full-stack JavaScript architectures, I have strong software development fundamentals and adapt to new tools, stacks, and libraries within a week when working with engineering teams. I am confident I will meet your project's standards and prove my problem-solving ability in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for earlier release upon receiving an offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for onsite or hybrid work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Asawari,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Developer</strong> opening across Hyderabad and Bangalore, and I would like to submit my application.</p>

  <p>I have 2 years of professional experience with <strong>React.js, TypeScript, JavaScript (ES6+), Node.js, Express, and modern REST/WebSocket APIs</strong>. While my core technical foundation is focused on React and full-stack JavaScript architectures, I have strong software development fundamentals and adapt to new tools, stacks, and libraries within a week when working with engineering teams. I am confident I will meet your project's standards and prove my problem-solving ability in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for earlier release upon receiving an offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for onsite or hybrid work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to hearing from you.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  }
];

async function main() {
  console.log("============================================================");
  console.log("  LinkedIn Feed Job Leads — Dispatcher");
  console.log("============================================================");
  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("✔ SMTP connection verified successfully.\n");

  const history = loadHistory();

  for (const lead of leads) {
    if (isAlreadySent(lead.email, history)) {
      console.log(`⚠ SKIP: ${lead.email} (${lead.company}) was already contacted. Skipping to avoid duplicate.`);
      continue;
    }

    console.log(`Dispatching email to: ${lead.email} (${lead.company})...`);
    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: lead.email,
      subject: lead.subject,
      text: lead.plainBody,
      html: lead.htmlBody,
      attachments: [
        {
          filename: path.basename(RESUME_PATH),
          path: RESUME_PATH,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✔ SUCCESS! Sent to ${lead.email}. Message ID: ${info.messageId}`);
    recordSent(lead.email, lead.company, lead.role, info.messageId);

    // 2-second delay between emails
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\n============================================================");
  console.log("✔ All eligible LinkedIn leads processed.");
  console.log("============================================================");
}

main().catch((err) => {
  console.error("❌ Execution failed:", err);
  process.exit(1);
});
