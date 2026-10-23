/**
 * DISPATCH TEST YANTRA WALK-IN APPLICATION - HYDERABAD
 * Target: adithyan.s@testyantra.com (S Adithyan)
 * Walk-In Date: 30 September 2026
 */

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RESUME_PATH = path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf");
const HISTORY_FILE = path.join(__dirname, "sent_history.json");

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
  return history.some((h) => (h.recipientEmail || "").toLowerCase().trim() === norm && h.status === "SENT");
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
  console.log(`Recorded to sent history (${HISTORY_FILE})`);
}

async function sendAdithyan() {
  const email = "adithyan.s@testyantra.com";
  const history = loadHistory();
  if (isAlreadySent(email, history)) {
    console.log(`SKIPPING: Already sent to ${email}`);
    return;
  }

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: email,
    replyTo: SENDER_EMAIL,
    subject: "Application for Walk-In Drive (API Testing / Full Stack) – Murali Krishna Popuri",
    headers: {
      "X-Mailer": "Apple Mail (2.3654.120.0.1)",
      Importance: "Normal",
      "X-Priority": "3",
    },
    text: `Dear Adithyan,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Walk-In Drive on 30 September 2026 in Hyderabad for the API Testing / Full Stack Quality Engineer opening.

I have strictly 2 years of professional software engineering experience specializing in REST APIs, Postman, SQL, JavaScript (ES6+), React.js, and Node.js.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Throughout my work on RestoSoft, I extensively designed, tested, and validated RESTful APIs, payload schemas (JSON), authentication mechanisms, and SQL database integrity. While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, testing frameworks, and cloud tools within a week.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available in Hyderabad to attend the Walk-In Interview on 30 September 2026.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 20px; padding: 0; }
    li { margin-bottom: 6px; }
    a { color: #0366d6; text-decoration: none; }
    .quote-box { background: #f6f8fa; border-left: 3px solid #0366d6; padding: 10px 14px; margin: 14px 0; font-style: italic; }
  </style>
</head>
<body>
  <p>Dear Adithyan,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>Walk-In Drive on 30 September 2026 in Hyderabad</strong> for the API Testing / Full Stack Quality Engineer opening.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in REST APIs, Postman, SQL, JavaScript (ES6+), React.js, and Node.js.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    Throughout my work on RestoSoft, I extensively designed, tested, and validated RESTful APIs, payload schemas (JSON), authentication mechanisms, and SQL database integrity. While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, testing frameworks, and cloud tools within a week.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available in Hyderabad to attend the <strong>Walk-In Interview on 30 September 2026</strong>.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time and consideration.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="font-size: 11px; color: #6a737d; margin-top: 24px;">P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>
</body>
</html>`,
    attachments: [
      {
        filename: "Murali_Krishna_Popuri_FullStack_Developer.pdf",
        path: RESUME_PATH,
        contentType: "application/pdf",
      },
    ],
  };

  console.log(`Sending application to ${email}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log(`SUCCESS! Sent to ${email}. Message ID: ${info.messageId}`);
  recordSent(email, "Test Yantra", "API Testing / Quality Engineer (Walk-in)", info.messageId);
}

sendAdithyan().catch((err) => {
  console.error("Error sending to Test Yantra:", err);
  process.exit(1);
});
