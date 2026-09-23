const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RESUME_PATH = "/home/murali-krishna/cluad/goat/automatic_mailer/Murali_Krishna_Popuri_FullStack_Developer.pdf";
const HISTORY_FILE = path.join(__dirname, "sent_history.json");
const RECIPIENT_EMAIL = process.argv[2] || "001jyosh@gmail.com";
const RECIPIENT_NAME = process.argv[3] || (RECIPIENT_EMAIL.includes("jyosh") ? "Jyothsna" : "Hiring Manager");

if (!GMAIL_APP_PASSWORD) {
  console.error("ERROR: GMAIL_APP_PASSWORD is not set in .env!");
  process.exit(1);
}

if (!fs.existsSync(RESUME_PATH)) {
  console.error("ERROR: Resume PDF not found at:", RESUME_PATH);
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

function recordSent(email, company, role, messageId) {
  let history = [];
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      history = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
    } catch (err) {
      history = [];
    }
  }
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

const subject = "Application for Full-Stack Developer (React.js / Node.js) – Murali Krishna Popuri";

const plainBody = `Hi ${RECIPIENT_NAME},

I am writing to express my interest in Full-Stack Developer opportunities, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing scalable web applications, responsive user interfaces, and robust backend services using React.js, Node.js, Express.js, JavaScript, TypeScript, SQL databases, and MongoDB.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bengaluru for onsite/hybrid work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi ${RECIPIENT_NAME},</p>
  <p>I am writing to express my interest in <strong>Full-Stack Developer</strong> opportunities, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing scalable web applications, responsive user interfaces, and robust backend services using React.js, Node.js, Express.js, JavaScript, TypeScript, SQL databases, and MongoDB.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bengaluru for onsite/hybrid work.</p>
  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>
  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`;

async function main() {
  console.log("============================================================");
  console.log(`Sending Test Email to: ${RECIPIENT_EMAIL}`);
  console.log("============================================================");

  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP connection verified successfully.\n");

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    replyTo: SENDER_EMAIL,
    to: RECIPIENT_EMAIL,
    subject: subject,
    text: plainBody + "\n\nP.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this email.",
    html: htmlBody.replace("</body>", `<p style="margin-top: 22px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p></body>`),
    headers: {
      "X-Mailer": "Apple Mail (2.3654.120.0.1)",
      "Importance": "Normal",
      "X-Priority": "3",
      "X-MSMail-Priority": "Normal",
    },
    attachments: [
      {
        filename: path.basename(RESUME_PATH),
        path: RESUME_PATH,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`SUCCESS! Sent test email to ${RECIPIENT_EMAIL}. Message ID: ${info.messageId}`);
    recordSent(RECIPIENT_EMAIL, "Test / Self Verification", "Full-Stack Developer (React.js / Node.js)", info.messageId);
  } catch (err) {
    console.error(`FAILED sending to ${RECIPIENT_EMAIL}:`, err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Execution failed:", err);
  process.exit(1);
});
