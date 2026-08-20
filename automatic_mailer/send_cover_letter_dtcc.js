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

const coverLetterText = `MURALI KRISHNA POPURI
Full-Stack Developer | +91 9347796811 | popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri

Date: August 18, 2026

To,
The Hiring Team & Talent Acquisition,
The Depository Trust & Clearing Corporation (DTCC)

Subject: Application for Full-Stack Developer Position — Murali Krishna Popuri

Dear Hiring Team at DTCC,

I am writing to express my enthusiastic interest in the Full-Stack Developer position at The Depository Trust & Clearing Corporation (DTCC). With 2 years of hands-on professional experience architecting mission-critical, real-time desktop POS solutions, distributed cloud synchronization engines, and high-performance web applications, I am eager to leverage my technical skill set to support DTCC's robust, secure financial market infrastructure.

In my current role at YoungMinds Technology Solutions, I spearheaded the core software architecture for RestoSoft—an offline-first POS platform built with Electron, React, TypeScript, Node.js, and SQLite. A central achievement was designing a real-time LAN synchronization protocol that maintains zero-latency data consistency across cashier and waiter terminals without internet dependency. Additionally, I engineered a resilient, bi-directional cloud data synchronization engine handling automatic retries and conflict resolution to guarantee data integrity across multi-branch enterprise setups.

My technical profile closely aligns with DTCC’s standards for software engineering excellence:
• Frontend Development: Proficient in React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS for building responsive, intuitive user interfaces.
• Backend & Distributed Systems: Hands-on experience with Node.js, Express.js, PHP, WebSockets for real-time streaming, and RESTful API architecture.
• Databases & Data Integrity: Strong experience in PostgreSQL, MySQL, SQLite, MongoDB, and Redis caching.
• Systems Architecture: Deep focus on data sync, rate limiting, secure middle-ware authentication (JWT/OAuth2), and high availability.

DTCC's reputation for powering the global financial system with resilient, scalable, and innovative post-trade infrastructure deeply inspires me. Having completed my initial contract/bond commitment at YoungMinds, I am actively seeking a job switch to an organization where I can solve complex engineering challenges, write resilient code, and drive continuous technical value.

My notice period is 40 days (negotiable for the right opportunity). I have attached my resume for your review and would welcome the opportunity to discuss how my full-stack experience can contribute to DTCC’s engineering goals.

Thank you for your time and consideration.

Sincerely,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

const coverLetterHtml = `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #111; line-height: 1.6; max-width: 700px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 30px; background-color: #ffffff;">
  <div style="border-bottom: 2px solid #003366; padding-bottom: 15px; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #003366; font-size: 22px;">MURALI KRISHNA POPURI</h2>
    <p style="margin: 5px 0 0 0; font-weight: bold; color: #555;">Full-Stack Developer</p>
    <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">
      Phone: +91 9347796811 | Email: <a href="mailto:popurimurali16@gmail.com" style="color: #003366;">popurimurali16@gmail.com</a><br/>
      Portfolio: <a href="https://murali-portfolio-website.vercel.app" target="_blank" style="color: #003366;">murali-portfolio-website.vercel.app</a> | 
      LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank" style="color: #003366;">linkedin.com/in/murali-krishna-popuri</a> | 
      GitHub: <a href="https://github.com/Muralikrishnapopuri" target="_blank" style="color: #003366;">github.com/Muralikrishnapopuri</a>
    </p>
  </div>

  <p style="color: #666; font-size: 13px;">Date: August 18, 2026</p>

  <p><strong>To,</strong><br/>
  The Hiring Team &amp; Talent Acquisition,<br/>
  <strong>The Depository Trust &amp; Clearing Corporation (DTCC)</strong></p>

  <p style="font-weight: bold; color: #003366; font-size: 15px;">Subject: Application for Full-Stack Developer Position — Murali Krishna Popuri</p>

  <p>Dear Hiring Team at DTCC,</p>

  <p>I am writing to express my enthusiastic interest in the <strong>Full-Stack Developer</strong> position at <strong>The Depository Trust &amp; Clearing Corporation (DTCC)</strong>. With 2 years of hands-on professional experience architecting mission-critical, real-time desktop POS solutions, distributed cloud synchronization engines, and high-performance web applications, I am eager to leverage my technical skill set to support DTCC's robust, secure financial market infrastructure.</p>

  <p>In my current role at YoungMinds Technology Solutions, I spearheaded the core software architecture for RestoSoft—an offline-first POS platform built with Electron, React, TypeScript, Node.js, and SQLite. A central achievement was designing a real-time LAN synchronization protocol that maintains zero-latency data consistency across cashier and waiter terminals without internet dependency. Additionally, I engineered a resilient, bi-directional cloud data synchronization engine handling automatic retries and conflict resolution to guarantee data integrity across multi-branch enterprise setups.</p>

  <p><strong>My technical profile closely aligns with DTCC’s standards for software engineering excellence:</strong></p>
  <ul style="padding-left: 20px;">
    <li style="margin-bottom: 8px;"><strong>Frontend Development:</strong> Proficient in React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS for building responsive, intuitive user interfaces.</li>
    <li style="margin-bottom: 8px;"><strong>Backend &amp; Distributed Systems:</strong> Hands-on experience with Node.js, Express.js, PHP, WebSockets for real-time streaming, and RESTful API architecture.</li>
    <li style="margin-bottom: 8px;"><strong>Databases &amp; Data Integrity:</strong> Strong experience in PostgreSQL, MySQL, SQLite, MongoDB, and Redis caching.</li>
    <li style="margin-bottom: 8px;"><strong>Systems Architecture:</strong> Deep focus on data sync, rate limiting, secure middleware authentication (JWT/OAuth2), and high availability.</li>
  </ul>

  <p>DTCC's reputation for powering the global financial system with resilient, scalable, and innovative post-trade infrastructure deeply inspires me. Having completed my initial contract/bond commitment at YoungMinds, I am actively seeking a job switch to an organization where I can solve complex engineering challenges, write resilient code, and drive continuous technical value.</p>

  <p>My notice period is 40 days (negotiable for the right opportunity). I have attached my resume for your review and would welcome the opportunity to discuss how my full-stack experience can contribute to DTCC’s engineering goals.</p>

  <p>Thank you for your time and consideration.</p>

  <p style="margin-top: 25px;">Sincerely,</p>
  <p><strong>Murali Krishna Popuri</strong><br/>
  Phone: +91 9347796811<br/>
  Email: popurimurali16@gmail.com</p>
</div>
`;

// Save the cover letter text file locally as well
const filePath = path.join(__dirname, "DTCC_Cover_Letter_Murali_Krishna.txt");
fs.writeFileSync(filePath, coverLetterText);

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "popurimuralikrishna04@gmail.com",
  subject: "DTCC Cover Letter — Full-Stack Developer Application (Murali Krishna Popuri)",
  text: coverLetterText,
  html: coverLetterHtml,
  attachments: [
    {
      filename: "DTCC_Cover_Letter_Murali_Krishna.txt",
      path: filePath,
    },
    {
      filename: "MURALI-KRISHNA_Aug17.pdf",
      path: path.join(__dirname, "MURALI-KRISHNA_Aug17.pdf"),
    }
  ]
};

async function send() {
  console.log("Sending DTCC Cover Letter to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
