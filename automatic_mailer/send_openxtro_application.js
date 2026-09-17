const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RESUME_PATH = path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf");

if (!GMAIL_APP_PASSWORD) {
  console.error("GMAIL_APP_PASSWORD is not set in .env!");
  process.exit(1);
}

if (!fs.existsSync(RESUME_PATH)) {
  console.error("FATAL ERROR: Resume PDF not found at:", RESUME_PATH);
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

const targetApplication = {
  company: "Openxtro",
  recruiter: "HR Team",
  to: "hr_openxtro@openxtro.com",
  role: "React JS & Full Stack Developer",
  subject: "Application for React JS & Full Stack Developer - Murali Krishna Popuri",
  body: `Hi Hiring Team,

I saw your LinkedIn posting for the React JS and Full Stack Developer opening in Hyderabad and would like to put forward my application.

I am a Full-Stack Developer with 2+ years of professional experience building scalable web applications with React.js, Node.js, TypeScript, RESTful APIs, and relational databases.

How my experience aligns with your requirements:
- React JS & Frontend: Hands-on experience developing modular, high-performance UI components using React.js, modern JavaScript (ES6+), HTML5, and CSS3.
- REST APIs & Microservices: Designing, developing, and consuming RESTful APIs and microservices with clean, maintainable code.
- Databases: Experience structuring and optimizing relational databases using PostgreSQL and MySQL.
- Tools & Cloud: Familiar with Git version control, Docker fundamentals, and AWS S3 asset storage.
- Availability: Based in Hyderabad, available as an immediate joiner (currently serving notice period, 0 days notice).

My resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
      <p>Hi Hiring Team,</p>
      <p>I saw your LinkedIn posting for the <strong>React JS &amp; Full Stack Developer</strong> opening in Hyderabad and would like to put forward my application.</p>
      <p>I am a Full-Stack Developer with 2+ years of professional experience building scalable web applications with <strong>React.js, Node.js, TypeScript, RESTful APIs, and relational databases</strong>.</p>
      
      <p><strong>How my experience aligns with your requirements:</strong></p>
      <ul style="padding-left: 20px; margin: 8px 0;">
        <li><strong>React JS &amp; Frontend:</strong> Hands-on experience developing modular, high-performance UI components using React.js, modern JavaScript (ES6+), HTML5, and CSS3.</li>
        <li><strong>REST APIs &amp; Microservices:</strong> Designing, developing, and consuming RESTful APIs and microservices with clean, maintainable code.</li>
        <li><strong>Databases:</strong> Experience structuring and optimizing relational databases using PostgreSQL and MySQL.</li>
        <li><strong>Tools &amp; Cloud:</strong> Familiar with Git version control, Docker fundamentals, and AWS S3 asset storage.</li>
        <li><strong>Availability:</strong> Based in Hyderabad, available as an immediate joiner (currently serving notice period, 0 days notice).</li>
      </ul>

      <p>My resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) is attached for your review.</p>

      <p style="margin-top: 18px;">
        <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
        <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
        <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
      </p>

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
  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP verified.");

  console.log(`Sending application to ${targetApplication.company} (${targetApplication.to})...`);

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: targetApplication.to,
    subject: targetApplication.subject,
    text: targetApplication.body,
    html: targetApplication.html,
    attachments: [
      {
        filename: "Murali_Krishna_Popuri_FullStack_Developer.pdf",
        path: RESUME_PATH,
      },
    ],
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`SUCCESS! Message sent to ${targetApplication.to}. Message ID: ${info.messageId}`);
}

main().catch((err) => {
  console.error("Failed to send email:", err);
  process.exit(1);
});
