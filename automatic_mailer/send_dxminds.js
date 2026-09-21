const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const RESUME_TAILORED = path.join(__dirname, "dist_resumes", "Murali_Krishna_Popuri_DxMinds.pdf");
const RESUME_MASTER = path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf");
const RESUME_PATH = fs.existsSync(RESUME_TAILORED) ? RESUME_TAILORED : RESUME_MASTER;

if (!fs.existsSync(RESUME_PATH)) {
  console.error("FATAL ERROR: Resume PDF not found at:", RESUME_PATH);
  process.exit(1);
}

const targetApplication = {
  company: "DxMinds Innovation Labs",
  to: "hr@dxminds.com",
  subject: "Inquiry Regarding Full Stack / Web Developer Openings – Murali Krishna Popuri",
  body: `Hi DxMinds Team,

I hope you are doing well.

My name is Murali Krishna Popuri. I am writing to inquire if you have any current or upcoming openings for a Full Stack Developer (React.js / Node.js / TypeScript) at DxMinds.

I have 2 years of professional experience developing full-stack web applications, scalable backend systems, and responsive user interfaces. In my current role at YoungMinds Technology Solutions, I have been building RestoSoft (an offline-first POS and enterprise platform) utilizing React.js, TypeScript, Node.js, Express, and PostgreSQL/MySQL.

Summary of my technical skills:
- Frontend: React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Redux, HTML5/CSS3
- Backend: Node.js, Express.js, RESTful APIs, Microservices, JWT Authentication
- Databases: PostgreSQL, MySQL, MongoDB, SQLite, Redis
- Notice Period: Immediate Joiner (Serving notice period, official LWD Nov 11, negotiable for immediate early release)
- Preferred Location: Bengaluru / Hyderabad / Remote

I have attached my resume (Murali_Krishna_Popuri_DxMinds.pdf) for your review. If there is a relevant opening or if a position opens up in your engineering team, I would welcome the opportunity to connect.

Portfolio & Profiles:
- Portfolio: https://murali-portfolio-website.vercel.app
- GitHub: https://github.com/Muralikrishnapopuri
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- Live Project (Zestchat): https://zestchat.vercel.app
- Live Project (Pixel Polish): https://pixelpolish.vercel.app

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
      <p>Hi DxMinds Team,</p>
      
      <p>I hope you are doing well.</p>

      <p>My name is <strong>Murali Krishna Popuri</strong>. I am writing to inquire if you have any current or upcoming openings for a <strong>Full Stack Developer (React.js / Node.js / TypeScript)</strong> at <strong>DxMinds</strong>.</p>
      
      <p>I have 2 years of professional experience developing full-stack web applications, scalable backend systems, and responsive user interfaces. In my current role at YoungMinds Technology Solutions, I have been building RestoSoft (an offline-first POS and enterprise platform) utilizing <strong>React.js, TypeScript, Node.js, Express, and PostgreSQL/MySQL</strong>.</p>

      <p><strong>Key Technical Highlights:</strong></p>
      <ul style="padding-left: 20px; margin: 8px 0;">
        <li><strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Redux, HTML5/CSS3</li>
        <li><strong>Backend:</strong> Node.js, Express.js, RESTful APIs, Microservices, JWT Authentication</li>
        <li><strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, SQLite, Redis</li>
        <li><strong>Notice Period:</strong> Immediate Joiner (Serving notice period, official LWD Nov 11, negotiable for immediate early release)</li>
        <li><strong>Preferred Location:</strong> Bengaluru / Hyderabad / Remote</li>
      </ul>

      <p>I have attached my resume (<strong>Murali_Krishna_Popuri_DxMinds.pdf</strong>) for your review. If there is a relevant opening or if a position opens up in your engineering team, I would welcome the opportunity to connect.</p>

      <p style="margin-top: 18px;">
        <strong>Portfolio & Profiles:</strong><br/>
        &bull; <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
        &bull; <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
        &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a><br/>
        &bull; <strong>Live Project (Zestchat):</strong> <a href="https://zestchat.vercel.app" style="color: #0284c7;">zestchat.vercel.app</a><br/>
        &bull; <strong>Live Project (Pixel Polish):</strong> <a href="https://pixelpolish.vercel.app" style="color: #0284c7;">pixelpolish.vercel.app</a>
      </p>

      <p style="margin-top: 18px;">Thank you for your time and consideration.</p>

      <p style="margin-top: 18px;">
        Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com
      </p>
    </div>
  `,
};

async function main() {
  if (!GMAIL_APP_PASSWORD) {
    console.log("--------------------------------------------------");
    console.log("EMAIL DRAFT PREPARED FOR DXMINDS:");
    console.log("To:", targetApplication.to);
    console.log("Subject:", targetApplication.subject);
    console.log("Attachment:", RESUME_PATH);
    console.log("--------------------------------------------------");
    console.log(targetApplication.body);
    console.log("--------------------------------------------------");
    console.error("GMAIL_APP_PASSWORD is not set in automatic_mailer/.env.");
    console.error("Please ensure .env has SENDER_EMAIL and GMAIL_APP_PASSWORD set to dispatch live emails.");
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

  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP verified successfully.");

  console.log(`Sending job inquiry to DxMinds (${targetApplication.to})...`);
  const info = await transporter.sendMail({
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: targetApplication.to,
    subject: targetApplication.subject,
    text: targetApplication.body,
    html: targetApplication.html,
    attachments: [
      {
        filename: path.basename(RESUME_PATH),
        path: RESUME_PATH,
      },
    ],
  });

  console.log("SUCCESS! Sent job inquiry to DxMinds.");
  console.log("Message ID:", info.messageId);

  // Update sent_history.json
  const historyPath = path.join(__dirname, "sent_history.json");
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));
    } catch (e) {
      history = [];
    }
  }

  history.push({
    timestamp: new Date().toISOString(),
    recipientEmail: targetApplication.to,
    company: targetApplication.company,
    role: "Full Stack / Web Developer (React.js, Node.js, TypeScript)",
    status: "SENT",
    messageId: info.messageId,
  });

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), "utf-8");
  console.log("Updated sent_history.json successfully.");
}

main().catch((err) => {
  console.error("Failed to send email to DxMinds:", err);
  process.exit(1);
});
