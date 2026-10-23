/**
 * DISPATCH APPLICATION TO WINTECH INC (WALK-IN DRIVE BANGALORE 26 SEPT)
 * Recipient: hrwintech01@gmail.com (Nivetha Lakshmi K)
 */

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RESUME_PATH = path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf");
const HISTORY_FILE = path.join(__dirname, "sent_history.json");
const RECIPIENT = "hrwintech01@gmail.com";

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
    company: company,
    role: role,
    status: "SENT",
    messageId: messageId,
    resumeAttachment: path.basename(RESUME_PATH),
  });
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
}

async function sendApplication() {
  console.log(`Sending Walk-In Drive application to: ${RECIPIENT} (WinTech Inc)...`);

  const subject = "Application for Full Stack / React JS Developer (Walk-In Drive 26th Sept) – Murali Krishna Popuri";

  const plainText = `Dear Nivetha Lakshmi,

I am writing to express my interest in attending the Walk-In Interview Drive tomorrow (Saturday, 26th September 2026) for the Full Stack / React Developer position at WinTech Inc in Bangalore.

I bring 4 years of combined professional and hands-on full-stack development experience. I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

My technical core includes React.js, TypeScript, JavaScript (ES6+), Node.js, REST APIs, and database engineering (PostgreSQL/SQL), along with hands-on experience building scalable UI architectures, micro-services, and cloud deployments.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to attend the walk-in rounds in Bangalore tomorrow between 9:00 AM and 3:00 PM. Could you please share the exact venue address for the drive?

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My complete resume is attached as a PDF. Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; background-color: #ffffff; padding: 15px; }
        p { margin-bottom: 12px; }
        ul { margin-top: 4px; margin-bottom: 12px; padding-left: 20px; }
        li { margin-bottom: 4px; }
        a { color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .quote { border-left: 3px solid #0366d6; padding-left: 12px; color: #444d56; margin: 12px 0; font-style: italic; }
        .footer { margin-top: 24px; border-top: 1px solid #eaecef; padding-top: 12px; font-size: 13px; color: #586069; }
      </style>
    </head>
    <body>
      <p>Dear Nivetha Lakshmi,</p>

      <p>I am writing to express my interest in attending the <strong>Walk-In Interview Drive tomorrow (Saturday, 26th September 2026)</strong> for the Full Stack / React Developer position at WinTech Inc in Bangalore.</p>

      <p>I bring 4 years of combined professional and hands-on full-stack development experience. I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

      <p>My core technical foundation spans React.js, TypeScript, JavaScript (ES6+), Node.js, REST APIs, and database engineering (PostgreSQL/SQL), along with hands-on experience building scalable UI architectures, micro-services, and cloud deployments.</p>

      <p class="quote">While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.</p>

      <p>I am an <strong>immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer)</strong> and available to attend the walk-in rounds in Bangalore tomorrow between 9:00 AM and 3:00 PM. Could you please share the exact venue address for the drive?</p>

      <p><strong>Professional Links:</strong></p>
      <ul>
        <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
        <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
        <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
        <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
      </ul>

      <p>My resume PDF is attached. Thank you for your time and consideration.</p>

      <div class="footer">
        <p>Best regards,<br>
        <strong>Murali Krishna Popuri</strong><br>
        Full-Stack Developer<br>
        Phone: +91 9347796811<br>
        Email: popurimurali16@gmail.com</p>

        <p style="margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 10px; font-size: 11.5px; color: #6a737d; font-style: italic;">
          P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
        </p>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    replyTo: SENDER_EMAIL,
    to: RECIPIENT,
    subject: subject,
    text: plainText,
    html: htmlContent,
    headers: {
      "X-Mailer": "Apple Mail (2.3654.120.0.1)",
      Importance: "Normal",
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
    console.log("SUCCESS! Application email dispatched to WinTech Inc.");
    console.log("Message ID:", info.messageId);
    recordSent(RECIPIENT, "WinTech Inc", "Full Stack / React JS Developer (Walk-In Drive)", info.messageId);
  } catch (err) {
    console.error("ERROR dispatching application:", err.message);
  }
}

sendApplication();
