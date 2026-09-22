#!/usr/bin/env node

/**
 * ============================================================
 *  🚀 Automated Job Outreach Mailer — mTouch Labs
 * ============================================================
 * Target: careers@mtouchlabs.com
 * Company: mTouch Labs
 * Role: Full Stack Developer
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

const TARGET = {
  company: "mTouch Labs",
  email: "careers@mtouchlabs.com",
  role: "Full Stack Developer",
  location: "Hyderabad",
};

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

const subject = `Application for ${TARGET.role} – Murali Krishna Popuri`;

const plainBody = `Hi ${TARGET.company} Team,

I'm reaching out to apply for the ${TARGET.role} position at ${TARGET.company} in ${TARGET.location}.

I am a developer with 2 years of professional experience working with React.js, Node.js, Express, TypeScript, JavaScript (ES6+), PostgreSQL, MySQL, and REST APIs. I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to ${TARGET.location} for onsite or hybrid work. I am serving my notice period with an official Last Working Day of Nov 11, but my manager is flexible and I can be released earlier to join immediately upon offer.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Please let me know if my background aligns with your requirements, and I would be happy to connect for a short call.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`;

const htmlBody = `<!DOCTYPE html>
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
  <p>Hi ${TARGET.company} Team,</p>

  <p>I'm reaching out to apply for the ${TARGET.role} position at ${TARGET.company} in ${TARGET.location}.</p>

  <p>I am a developer with 2 years of professional experience working with React.js, Node.js, Express, TypeScript, JavaScript (ES6+), PostgreSQL, MySQL, and REST APIs. I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to ${TARGET.location} for onsite or hybrid work. I am serving my notice period with an official Last Working Day of Nov 11, but my manager is flexible and I can be released earlier to join immediately upon offer.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Please let me know if my background aligns with your requirements, and I would be happy to connect for a short call.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`;

function recordHistory(recipient, status, messageId) {
  try {
    let history = [];
    if (fs.existsSync(HISTORY_FILE)) {
      history = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
    }
    history.push({
      timestamp: new Date().toISOString(),
      recipientEmail: recipient.toLowerCase().trim(),
      company: TARGET.company,
      role: TARGET.role,
      status: status,
      messageId: messageId,
      resumeAttachment: path.basename(RESUME_PATH),
    });
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
    console.log(`✔ Recorded to sent history (${HISTORY_FILE})`);
  } catch (err) {
    console.error("⚠ Warning: Failed to record to sent_history.json:", err.message);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const isSend = args.includes("--send");
  const isTest = args.includes("--test");

  console.log("============================================================");
  console.log("  mTouch Labs — Automated Application Mailer");
  console.log("============================================================");
  console.log(`• Target Email:      ${TARGET.email}`);
  console.log(`• Company:           ${TARGET.company}`);
  console.log(`• Role:              ${TARGET.role}`);
  console.log(`• Location:          ${TARGET.location}`);
  console.log(`• Resume Attachment: ${RESUME_PATH} (${(fs.statSync(RESUME_PATH).size / 1024).toFixed(1)} KB)`);
  console.log(`• Sender:            ${SENDER_EMAIL}`);
  console.log(`• Mode:              ${isSend ? "LIVE SEND TO TARGET" : isTest ? "SEND TEST TO SELF" : "DRY-RUN / PREVIEW"}`);
  console.log("------------------------------------------------------------");

  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("✔ SMTP connection verified successfully.");

  if (!isSend && !isTest) {
    console.log("\n--- [EMAIL PREVIEW] ---");
    console.log(`Subject: ${subject}`);
    console.log("\nPlain Text Body:\n");
    console.log(plainBody);
    console.log("\n------------------------------------------------------------");
    console.log("ℹ DRY RUN COMPLETE: No email was sent.");
    console.log("  To send real email to target, run:");
    console.log("    node send_mtouchlabs_application.js --send");
    console.log("============================================================");
    return;
  }

  const recipient = isTest ? SENDER_EMAIL : TARGET.email;
  const currentSubject = isTest ? `[TEST PREVIEW] ${subject}` : subject;

  console.log(`\nDispatching email to: ${recipient}...`);

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: recipient,
    subject: currentSubject,
    text: plainBody,
    html: htmlBody,
    attachments: [
      {
        filename: path.basename(RESUME_PATH),
        path: RESUME_PATH,
      },
    ],
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✔ SUCCESS! Email sent successfully.`);
  console.log(`  Message ID: ${info.messageId}`);
  console.log(`  Recipient:  ${recipient}`);

  if (isSend) {
    recordHistory(recipient, "SENT", info.messageId);
  }
}

main().catch((err) => {
  console.error("❌ Execution failed:", err);
  process.exit(1);
});
