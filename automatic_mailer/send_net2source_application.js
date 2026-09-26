/**
 * DISPATCH APPLICATION TO NET2SOURCE (N2S)
 * Recruiter: Shipra Sharma
 * Role: Full Stack Developer (React.js + Node.js)
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

if (!fs.existsSync(RESUME_PATH)) {
  console.error("FATAL: Resume PDF not found at:", RESUME_PATH);
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

async function sendNet2SourceApplication() {
  const recipientEmail = "sharma.shipra@net2source.co.in";
  const ccEmail = "sharma.shipra@net2source.com";
  const company = "Net2Source (N2S)";
  const role = "Full Stack Developer (React.js + Node.js)";
  const subject = "Application for Full Stack Developer (React.js + Node.js) – Murali Krishna Popuri";

  const plainText = `Dear Shipra,

I am writing to apply for the Full Stack Developer (React.js + Node.js) position at Net2Source.

I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer). I am currently located in Vijayawada and available to relocate immediately to Hyderabad or Bengaluru for onsite or hybrid roles.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My updated resume is attached for your review. Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`;

  const htmlText = `<!DOCTYPE html>
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
  <p>Dear Shipra,</p>
  <p>I am writing to apply for the <strong>Full Stack Developer (React.js + Node.js)</strong> position at Net2Source.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate early release upon offer). I am currently located in Vijayawada and available to relocate <strong>immediately</strong> to Hyderabad or Bengaluru for onsite or hybrid roles.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My updated resume is attached for your review. Thank you for your time and consideration.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="margin-top: 22px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`;

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: recipientEmail,
    cc: ccEmail,
    replyTo: SENDER_EMAIL,
    subject: subject,
    text: plainText,
    html: htmlText,
    headers: {
      "X-Mailer": "Apple Mail (2.3654.120.0.1)",
      Importance: "Normal",
      "X-Priority": "3",
    },
    attachments: [
      {
        filename: path.basename(RESUME_PATH),
        path: RESUME_PATH,
      },
    ],
  };

  console.log(`Sending application to ${recipientEmail} (CC: ${ccEmail})...`);
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`SENT SUCCESSFULLY! Message ID: ${info.messageId}`);
    recordSent(recipientEmail, company, role, info.messageId);
  } catch (err) {
    console.error("ERROR sending email:", err);
    process.exit(1);
  }
}

sendNet2SourceApplication();
