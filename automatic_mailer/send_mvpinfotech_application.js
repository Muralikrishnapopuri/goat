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
  company: "MVP InfoTech",
  to: ["Hr@mvpinfotech.com", "contact@mvpinfotech.com", "info@mvpinfotech.com"],
  role: "Full Stack Developer",
  subject: "Application for Full Stack Developer – Murali Krishna Popuri",
  body: `Hi Hiring Team,

My name is Murali Krishna Popuri. I am a Full Stack Developer with 2+ years of professional experience, writing to apply for the Full Stack Developer position at MVP InfoTech.

I specialize in developing scalable, end-to-end web applications utilizing React.js on the frontend, Node.js and Express on the backend, along with TypeScript, REST APIs, and database design (MongoDB / SQL). In my current role at YoungMinds Technology Solutions, I built responsive client interfaces, developed performant backend services, and ensured seamless API integrations.

Summary of key qualifications:
- Frontend: React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, responsive UI design
- Backend: Node.js, Express.js, RESTful API architecture, authentication (JWT), microservices
- Databases: MongoDB, PostgreSQL, MySQL
- Availability: Immediate joiner (currently serving notice period, 0 days notice)
- Work Mode: Open to Onsite / Hybrid in Hyderabad / Bengaluru

My updated resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) is attached for your review.

Professional Links:
- Portfolio: https://murali-portfolio-website.vercel.app
- GitHub: https://github.com/Muralikrishnapopuri
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- Live Project (Zestchat): https://zestchat.vercel.app

Thank you for your time and consideration. I would welcome the opportunity to discuss how my skill set can contribute to MVP InfoTech.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
      <p>Hi Hiring Team,</p>
      <p>My name is <strong>Murali Krishna Popuri</strong>. I am a Full Stack Developer with 2+ years of professional experience, writing to apply for the <strong>Full Stack Developer</strong> position at <strong>MVP InfoTech</strong>.</p>
      
      <p>I specialize in developing scalable, end-to-end web applications utilizing <strong>React.js</strong> on the frontend, <strong>Node.js and Express</strong> on the backend, along with <strong>TypeScript, REST APIs, and databases (MongoDB / SQL)</strong>. In my current role at YoungMinds Technology Solutions, I built responsive client interfaces, developed performant backend services, and ensured seamless API integrations.</p>

      <p><strong>Summary of key qualifications:</strong></p>
      <ul style="padding-left: 20px; margin: 8px 0;">
        <li><strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, responsive UI design</li>
        <li><strong>Backend:</strong> Node.js, Express.js, RESTful API architecture, authentication (JWT), microservices</li>
        <li><strong>Databases &amp; Tools:</strong> MongoDB, PostgreSQL, MySQL, Git, Docker, Postman</li>
        <li><strong>Availability:</strong> Immediate joiner (currently serving notice period, 0 days notice)</li>
        <li><strong>Work Mode:</strong> Open to Onsite / Hybrid in Hyderabad / Bengaluru</li>
      </ul>

      <p>My updated resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) is attached for your review.</p>

      <p style="margin-top: 18px;">
        <strong>Professional Links:</strong><br/>
        &bull; <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
        &bull; <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
        &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a><br/>
        &bull; <strong>Live Project (Zestchat):</strong> <a href="https://zestchat.vercel.app" style="color: #0284c7;">zestchat.vercel.app</a>
      </p>

      <p style="margin-top: 18px;">Thank you for your time and consideration. I would welcome the opportunity to discuss how my skill set can contribute to MVP InfoTech.</p>

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

  console.log(`Sending application to ${targetApplication.company} (${targetApplication.to.join(", ")})...`);
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

  console.log(`SUCCESS! Sent application to ${targetApplication.company}`);
  console.log("Message ID:", info.messageId);
}

main().catch((err) => {
  console.error("Failed to send application:", err);
  process.exit(1);
});
