const nodemailer = require("nodemailer");
const path = require("path");
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

const subject = "Application for Full Stack Developer (Bulk Hiring) — Murali Krishna Popuri";

const body = `Dear Hiring Team at Excel Tech Computers,

I hope you are doing well.

I am writing to express my strong interest in the Full Stack Developer positions available through your bulk hiring program. With 2 years of professional experience building scalable desktop systems, real-time web applications, and hybrid offline-first databases, I am confident I can contribute effectively to your engineering projects.

In my current role at YoungMinds Technology Solutions, I built the core desktop POS architecture for RestoSoft using Electron, React, TypeScript, Node.js, and SQLite, which operates with zero internet dependency. I also designed a real-time LAN-based synchronization system for multiple local devices and engineered a bi-directional cloud data sync engine.

My technical stack is highly aligned with modern full-stack development:
• Frontend: React.js, Next.js, Redux, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS.
• Backend & APIs: Node.js, Express.js, PHP, REST APIs, WebSockets.
• Databases & Tools: PostgreSQL, MySQL, SQLite, MongoDB, Redis, Git, GitHub.

I am highly proactive, take complete ownership of my features, and focus on delivering robust, clean code. My notice period is 40 days (negotiable, current company bond is completed).

I have attached my resume (MURALI-KRISHNA_Aug17.pdf) for your review. You can also view my details at:
• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Thank you for your time and consideration. I would welcome the opportunity to discuss how my full-stack capabilities can support Excel Tech Computers.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

const htmlBody = `
  <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 650px;">
    <p>Dear Hiring Team at Excel Tech Computers,</p>
    <p>I hope you are doing well.</p>
    <p>I am writing to express my strong interest in the <strong>Full Stack Developer</strong> positions available through your <strong>bulk hiring program</strong>. With 2 years of professional experience building scalable desktop systems, real-time web applications, and hybrid offline-first databases, I am confident I can contribute effectively to your engineering projects.</p>
    
    <p>In my current role at YoungMinds Technology Solutions, I built the core desktop POS architecture for RestoSoft using Electron, React, TypeScript, Node.js, and SQLite, which operates with zero internet dependency. I also designed a real-time LAN-based synchronization system for multiple local devices and engineered a bi-directional cloud data sync engine.</p>

    <p>My technical stack is highly aligned with modern full-stack development:</p>
    <ul>
      <li><strong>Frontend:</strong> React.js, Next.js, Redux, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS.</li>
      <li><strong>Backend &amp; APIs:</strong> Node.js, Express.js, PHP, REST APIs, WebSockets.</li>
      <li><strong>Databases &amp; Tools:</strong> PostgreSQL, MySQL, SQLite, MongoDB, Redis, Git, GitHub.</li>
    </ul>

    <p>I am highly proactive, take complete ownership of my features, and focus on delivering robust, clean code. My notice period is 40 days (negotiable, current company bond is completed).</p>

    <p>I have attached my resume (MURALI-KRISHNA_Aug17.pdf) for your review. You can also view my details at:</p>
    <ul>
      <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank">murali-portfolio-website.vercel.app</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank">github.com/Muralikrishnapopuri</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank">linkedin.com/in/murali-krishna-popuri</a></li>
    </ul>

    <p>Thank you for your time and consideration. I would welcome the opportunity to discuss how my full-stack capabilities can support Excel Tech Computers.</p>
    <br/>
    <p>Best regards,<br/>
    <strong>Murali Krishna Popuri</strong><br/>
    Phone: +91 9347796811<br/>
    Email: popurimurali16@gmail.com</p>
  </div>
`;

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "dev@exceltechcomputers.com",
  subject: subject,
  text: body,
  html: htmlBody,
  attachments: [
    {
      filename: "MURALI-KRISHNA_Aug17.pdf",
      path: path.join(__dirname, "MURALI-KRISHNA_Aug17.pdf"),
    }
  ]
};

async function send() {
  console.log("Sending email to dev@exceltechcomputers.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
