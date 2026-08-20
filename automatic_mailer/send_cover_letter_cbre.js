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
CBRE Group, Inc.

Subject: Application for Full-Stack Developer Position — Murali Krishna Popuri

Dear Hiring Team at CBRE,

I am writing to express my strong interest in the Full-Stack Developer position at CBRE Group, Inc. With 2 years of professional experience building scalable web applications, real-time desktop systems, and distributed cloud synchronization platforms, I am excited about the prospect of contributing to CBRE’s world-class digital and technology solutions.

In my current role at YoungMinds Technology Solutions, I built high-performance web applications (Admin SaaS, Cashier, Waiter, and Digital Menu portals) and led the engineering of RestoSoft—an offline-first POS platform developed with React, TypeScript, Node.js, Electron, and SQLite. I engineered a real-time LAN synchronization protocol for local terminals alongside a bi-directional cloud data sync engine that ensures automatic retries, conflict handling, and seamless multi-location data consistency.

My technical experience aligns directly with CBRE's software development needs:
• Frontend Excellence: Proficient in React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS for creating intuitive, responsive user experiences.
• Scalable Backend Architecture: Hands-on expertise in Node.js, Express.js, PHP, WebSockets, and RESTful API integrations.
• Database Management: Strong capabilities in PostgreSQL, MySQL, SQLite, MongoDB, and Redis caching for optimized query execution.
• Cloud & Tools: Experienced with AWS S3, Vercel, Git version control, and Agile development workflows.

CBRE's commitment to technological innovation in commercial real estate deeply motivates me. Having completed my initial contract/bond commitment at YoungMinds, I am actively seeking a job switch to an organization where I can deliver impactful, clean, and scalable code.

My notice period is 40 days (negotiable for the right opportunity). I have attached my resume for your review and look forward to discussing how my full-stack capabilities can support CBRE’s engineering team.

Thank you for your time and consideration.

Sincerely,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

const coverLetterHtml = `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #111; line-height: 1.6; max-width: 700px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 30px; background-color: #ffffff;">
  <div style="border-bottom: 2px solid #006633; padding-bottom: 15px; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #006633; font-size: 22px;">MURALI KRISHNA POPURI</h2>
    <p style="margin: 5px 0 0 0; font-weight: bold; color: #555;">Full-Stack Developer</p>
    <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">
      Phone: +91 9347796811 | Email: <a href="mailto:popurimurali16@gmail.com" style="color: #006633;">popurimurali16@gmail.com</a><br/>
      Portfolio: <a href="https://murali-portfolio-website.vercel.app" target="_blank" style="color: #006633;">murali-portfolio-website.vercel.app</a> | 
      LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank" style="color: #006633;">linkedin.com/in/murali-krishna-popuri</a> | 
      GitHub: <a href="https://github.com/Muralikrishnapopuri" target="_blank" style="color: #006633;">github.com/Muralikrishnapopuri</a>
    </p>
  </div>

  <p style="color: #666; font-size: 13px;">Date: August 18, 2026</p>

  <p><strong>To,</strong><br/>
  The Hiring Team &amp; Talent Acquisition,<br/>
  <strong>CBRE Group, Inc.</strong></p>

  <p style="font-weight: bold; color: #006633; font-size: 15px;">Subject: Application for Full-Stack Developer Position — Murali Krishna Popuri</p>

  <p>Dear Hiring Team at CBRE,</p>

  <p>I am writing to express my strong interest in the <strong>Full-Stack Developer</strong> position at <strong>CBRE Group, Inc.</strong> With 2 years of professional experience building scalable web applications, real-time desktop systems, and distributed cloud synchronization platforms, I am excited about the prospect of contributing to CBRE’s world-class digital and technology solutions.</p>

  <p>In my current role at YoungMinds Technology Solutions, I built high-performance web applications (Admin SaaS, Cashier, Waiter, and Digital Menu portals) and led the engineering of RestoSoft—an offline-first POS platform developed with React, TypeScript, Node.js, Electron, and SQLite. I engineered a real-time LAN synchronization protocol for local terminals alongside a bi-directional cloud data sync engine that ensures automatic retries, conflict handling, and seamless multi-location data consistency.</p>

  <p><strong>My technical experience aligns directly with CBRE's software development needs:</strong></p>
  <ul style="padding-left: 20px;">
    <li style="margin-bottom: 8px;"><strong>Frontend Excellence:</strong> Proficient in React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS for creating intuitive, responsive user experiences.</li>
    <li style="margin-bottom: 8px;"><strong>Scalable Backend Architecture:</strong> Hands-on expertise in Node.js, Express.js, PHP, WebSockets, and RESTful API integrations.</li>
    <li style="margin-bottom: 8px;"><strong>Database Management:</strong> Strong capabilities in PostgreSQL, MySQL, SQLite, MongoDB, and Redis caching for optimized query execution.</li>
    <li style="margin-bottom: 8px;"><strong>Cloud &amp; Tools:</strong> Experienced with AWS S3, Vercel, Git version control, and Agile development workflows.</li>
  </ul>

  <p>CBRE's commitment to technological innovation in commercial real estate deeply motivates me. Having completed my initial contract/bond commitment at YoungMinds, I am actively seeking a job switch to an organization where I can deliver impactful, clean, and scalable code.</p>

  <p>My notice period is 40 days (negotiable for the right opportunity). I have attached my resume for your review and look forward to discussing how my full-stack capabilities can support CBRE’s engineering team.</p>

  <p>Thank you for your time and consideration.</p>

  <p style="margin-top: 25px;">Sincerely,</p>
  <p><strong>Murali Krishna Popuri</strong><br/>
  Phone: +91 9347796811<br/>
  Email: popurimurali16@gmail.com</p>
</div>
`;

// Save the cover letter text file locally
const filePath = path.join(__dirname, "CBRE_Cover_Letter_Murali_Krishna.txt");
fs.writeFileSync(filePath, coverLetterText);

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "popurimuralikrishna04@gmail.com",
  subject: "CBRE Cover Letter — Full-Stack Developer Application (Murali Krishna Popuri)",
  text: coverLetterText,
  html: coverLetterHtml,
  attachments: [
    {
      filename: "CBRE_Cover_Letter_Murali_Krishna.txt",
      path: filePath,
    },
    {
      filename: "MURALI-KRISHNA_Aug17.pdf",
      path: path.join(__dirname, "MURALI-KRISHNA_Aug17.pdf"),
    }
  ]
};

async function send() {
  console.log("Sending CBRE Cover Letter to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
