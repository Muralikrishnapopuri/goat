#!/usr/bin/env node

/**
 * ============================================================
 *  🚀 Automated Job Outreach Mailer — iPrism Technologies (Node.js)
 * ============================================================
 * Target: careers@iprismtech.com
 * Company: iPrism Technologies
 * Role: Node.js Developer
 * Resume: Murali_Krishna_Popuri_Node_Developer.pdf
 * ============================================================
 */

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RESUME_PATH = "/home/murali-krishna/Desktop/resumes/Murali_Krishna_Popuri_Node_Developer.pdf";
const HISTORY_FILE = path.join(__dirname, "sent_history.json");

const TARGET = {
  company: "iPrism Technologies",
  email: "careers@iprismtech.com",
  role: "Node.js Developer",
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

I am a backend-focused developer with 2 years of professional experience working with Node.js, Express.js, TypeScript, JavaScript (ES6+), RESTful APIs, and database systems (MySQL, PostgreSQL, SQLite, MongoDB). In my current role at YoungMinds Technology Solutions, I architected server-side services for RestoSoft—an offline-first POS platform featuring real-time LAN synchronization over WebSockets, conflict-free bi-directional cloud data sync, automated retry pipelines, and secure JWT/OAuth2 authentication.

Here are quick links to my work and projects:
• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri
• Zestchat (Live Project): https://zestchat.vercel.app
• Pixel Polish (Live Project): https://pixelpolish.vercel.app

Availability & Location:
I am an Immediate Joiner (Official Last Working Day: Nov 11, negotiable for earlier release upon receiving an offer). I am ready to join onsite in ${TARGET.location} for the 9am–6pm IST shift.

I have attached my tailored resume (${path.basename(RESUME_PATH)}) for your review. Let me know if my backend engineering background aligns with your team's requirements, and I would be happy to connect for a short discussion.

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

  <p>I'm reaching out to apply for the <strong>${TARGET.role}</strong> position at ${TARGET.company} in ${TARGET.location}.</p>

  <p>I am a backend-focused developer with <strong>2 years</strong> of professional experience working with <strong>Node.js, Express.js, TypeScript, JavaScript (ES6+), RESTful APIs</strong>, and database systems (MySQL, PostgreSQL, SQLite, MongoDB). In my current role at YoungMinds Technology Solutions, I architected server-side services for <strong>RestoSoft</strong>—an offline-first POS platform featuring real-time LAN synchronization over WebSockets, conflict-free bi-directional cloud data sync, automated retry pipelines, and secure JWT/OAuth2 authentication.</p>

  <p>Here are quick links to my work and projects:</p>
  <ul>
    <li>🌐 <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>💻 <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>🔗 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>💬 <strong>Zestchat (Live Project):</strong> <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
    <li>🎨 <strong>Pixel Polish (Live Project):</strong> <a href="https://pixelpolish.vercel.app">pixelpolish.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an <strong>Immediate Joiner</strong> (Official Last Working Day: Nov 11, negotiable for earlier release upon receiving an offer). I am ready to join onsite in <strong>${TARGET.location}</strong> for the 9am–6pm IST shift.</p>

  <p>I have attached my tailored resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Let me know if my backend engineering background aligns with your team's requirements, and I would be happy to connect for a short discussion.</p>

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
  console.log("  iPrism Technologies — Node.js Developer Application Mailer");
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
    console.log("    node send_iprism_node_application.js --send");
    console.log("  To send a test email to your own inbox, run:");
    console.log("    node send_iprism_node_application.js --test");
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
