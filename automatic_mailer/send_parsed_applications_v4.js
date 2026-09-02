const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

if (!GMAIL_APP_PASSWORD) {
  console.error("GMAIL_APP_PASSWORD is not set in .env!");
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

const resumePath = path.join(__dirname, "MURALI-KRISHNA_.pdf");

const applicationsBatch4 = [
  {
    company: "eMexo Technologies",
    targetEmail: "info@emexotechnologies.com",
    role: "Software Engineer (React.js, Node.js, JavaScript, SQL, REST APIs)",
    location: "Electronic City Phase 1, Bengaluru",
    subject: "Application for Software Engineer (React.js / Node.js) – Murali Krishna Popuri",
    body: `Hi Hiring Team,

I am writing to express my strong interest in the Software Engineer position at eMexo Technologies in Electronic City Phase 1, Bengaluru.

I am a Full-Stack Developer with 2+ years of hands-on experience building dynamic web applications using React.js, Node.js, Express, JavaScript (ES6+), RESTful APIs, and SQL/NoSQL databases. In my previous role at YoungMinds Technology Solutions, I focused on creating responsive frontend interfaces and high-performance backend API services.

I am open to relocating/working on-site in Bengaluru and am currently serving my notice period as an immediate joiner.

My resume is attached for your review. I would welcome the opportunity to discuss how my technical skills align with your engineering team.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Hiring Team,</p>
        <p>I am writing to express my strong interest in the <strong>Software Engineer (React.js / Node.js)</strong> position at eMexo Technologies in Electronic City Phase 1, Bengaluru.</p>
        <p>I am a Full-Stack Developer with 2+ years of hands-on experience building dynamic web applications using <strong>React.js, Node.js, Express, JavaScript (ES6+), RESTful APIs, and SQL/NoSQL databases</strong>. In my previous role at YoungMinds Technology Solutions, I focused on creating responsive frontend interfaces and high-performance backend API services.</p>
        <p>I am open to relocating/working on-site in Bengaluru and am currently serving my notice period as an immediate joiner.</p>
        <p>My resume is attached for your review. I would welcome the opportunity to discuss how my technical skills align with your engineering team.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  }
];

async function run() {
  console.log(`Starting Batch 4 Outreach (Direct HR Only, No CC) for ${applicationsBatch4.length} matched company...`);

  for (let i = 0; i < applicationsBatch4.length; i++) {
    const app = applicationsBatch4[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`[${i + 1}/${applicationsBatch4.length}] Sending application for ${app.company}...`);
    console.log(`Target Email: ${app.targetEmail}`);
    console.log(`Subject: ${app.subject}`);

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: app.targetEmail,
      subject: app.subject,
      text: app.body,
      html: app.html,
      attachments: fs.existsSync(resumePath) ? [{ filename: "MURALI-KRISHNA_.pdf", path: resumePath }] : [],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Sent successfully directly to target HR: ${app.targetEmail}! MessageId: ${info.messageId}`);
    } catch (err) {
      console.error(`❌ Failed to send email to ${app.targetEmail}:`, err.message);
    }
  }

  console.log(`\nBatch 4 application dispatched successfully!`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
