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
  company: "Softmason Technologies",
  to: "info@softmason.com",
  subject: "Inquiry Regarding Full Stack / Web Developer Openings – Murali Krishna Popuri",
  body: `Hi Softmason Team,

I hope this email finds you well.

My name is Murali Krishna Popuri. I am writing to inquire if you have any current or upcoming openings for a Full Stack Developer (React.js / Node.js) at Softmason Technologies.

I have 2+ years of professional experience developing scalable web applications and enterprise solutions. In my recent role at YoungMinds Technology Solutions, I worked across the full development lifecycle—building responsive user interfaces with React.js and TypeScript, engineering performant RESTful backend services with Node.js and Express, and managing databases (MongoDB / SQL).

A quick summary of what I bring to the table:
- Frontend: React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS
- Backend: Node.js, Express.js, REST APIs, Microservices, Authentication (JWT)
- Databases: MongoDB, PostgreSQL, MySQL
- Availability: Immediate Joiner (currently serving notice period, 0 days notice)
- Work Mode: Open to Onsite / Hybrid in Hyderabad / Bengaluru or Remote

I have attached my resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) for your consideration. If there is a relevant opening or if a position opens up in your engineering team, I would be grateful for the opportunity to connect.

Professional Links:
- Portfolio: https://murali-portfolio-website.vercel.app
- GitHub: https://github.com/Muralikrishnapopuri
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- Live Project (Zestchat): https://zestchat.vercel.app

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
      <p>Hi Softmason Team,</p>
      
      <p>I hope this email finds you well.</p>

      <p>My name is <strong>Murali Krishna Popuri</strong>. I am writing to inquire if you have any current or upcoming openings for a <strong>Full Stack Developer (React.js / Node.js)</strong> at <strong>Softmason Technologies</strong>.</p>
      
      <p>I have 2+ years of professional experience developing scalable web applications and enterprise solutions. In my recent role at YoungMinds Technology Solutions, I worked across the full development lifecycle—building responsive user interfaces with <strong>React.js and TypeScript</strong>, engineering performant RESTful backend services with <strong>Node.js and Express</strong>, and managing databases (<strong>MongoDB / SQL</strong>).</p>

      <p><strong>A quick summary of my technical skill set:</strong></p>
      <ul style="padding-left: 20px; margin: 8px 0;">
        <li><strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS</li>
        <li><strong>Backend:</strong> Node.js, Express.js, REST APIs, Microservices, Authentication (JWT)</li>
        <li><strong>Databases:</strong> MongoDB, PostgreSQL, MySQL</li>
        <li><strong>Availability:</strong> Immediate Joiner (currently serving notice period, 0 days notice)</li>
        <li><strong>Work Mode:</strong> Open to Onsite / Hybrid in Hyderabad / Bengaluru or Remote</li>
      </ul>

      <p>I have attached my resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) for your consideration. If there is a relevant opening or if a position opens up in your engineering team, I would be grateful for the opportunity to connect.</p>

      <p style="margin-top: 18px;">
        <strong>Professional Links:</strong><br/>
        &bull; <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
        &bull; <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
        &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a><br/>
        &bull; <strong>Live Project (Zestchat):</strong> <a href="https://zestchat.vercel.app" style="color: #0284c7;">zestchat.vercel.app</a>
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
  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP verified.");

  console.log(`Sending job inquiry to Softmason Technologies (${targetApplication.to})...`);
  const info = await transporter.sendMail({
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
  });

  console.log("SUCCESS! Sent job inquiry to Softmason Technologies.");
  console.log("Message ID:", info.messageId);
}

main().catch((err) => {
  console.error("Failed to send job inquiry:", err);
  process.exit(1);
});
