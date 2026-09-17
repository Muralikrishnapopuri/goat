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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const newApplications = [
  {
    company: "Milieudigital Technologies",
    recruiter: "Kamalakar Reddy",
    to: "kamalakar.a@milieudigital.com",
    role: "Full Stack / Backend & Frontend Developer",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    body: `Hi Kamalakar,

My name is Murali Krishna Popuri. I am a Full-Stack Developer with 2+ years of professional experience, writing to express my interest in Full Stack and Backend/Frontend Developer openings at Milieudigital Technologies in Hyderabad.

I specialize in building scalable web and desktop applications using React.js, Node.js, Express, TypeScript, and SQL/NoSQL databases. In my current role at YoungMinds Technology Solutions, I engineered real-time synchronization pipelines with Kafka, designed relational SQL schemas, and developed responsive user interfaces.

Why I am a strong fit:
- Frontend: React.js, TypeScript, Next.js, and component-driven UI development.
- Backend & APIs: RESTful APIs, Node.js, microservices architecture, and WebSocket integrations.
- Databases: PostgreSQL, MySQL, and MongoDB query optimization.
- Availability: Based in Hyderabad, available as an immediate joiner (0 days notice).

My updated resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) is attached for your review.

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
        <p>Hi Kamalakar,</p>
        <p>My name is <strong>Murali Krishna Popuri</strong>. I am a Full-Stack Developer with 2+ years of professional experience, writing to express my interest in <strong>Full Stack and Backend/Frontend Developer</strong> openings at Milieudigital Technologies in Hyderabad.</p>
        
        <p>I specialize in building scalable web and desktop applications using <strong>React.js, Node.js, Express, TypeScript, and SQL/NoSQL databases</strong>. In my current role at YoungMinds Technology Solutions, I engineered real-time synchronization pipelines with Kafka, designed relational SQL schemas, and developed responsive user interfaces.</p>

        <p><strong>Why I am a strong fit:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Frontend:</strong> React.js, TypeScript, Next.js, and component-driven UI development.</li>
          <li><strong>Backend &amp; APIs:</strong> RESTful APIs, Node.js, microservices architecture, and WebSocket integrations.</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, and MongoDB query optimization.</li>
          <li><strong>Availability:</strong> Based in Hyderabad, available as an immediate joiner (0 days notice).</li>
        </ul>

        <p>My updated resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) is attached for your review.</p>

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
  },
  {
    company: "Shell Infotech",
    recruiter: "Sravanthi N",
    to: "sravanthi@shellinfotech.com",
    role: "Full Stack / React & Backend Developer",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    body: `Hi Sravanthi,

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2+ years of professional experience. I am writing to apply for Full Stack, React, and Backend Developer roles at Shell Infotech in Hyderabad.

I build scalable web applications and RESTful services using React.js, Node.js, Express, TypeScript, and database systems. At YoungMinds Technology Solutions, I developed real-time synchronized platforms with microservices and relational SQL schemas.

Key highlights:
- Tech Stack: React.js, TypeScript, Node.js, Express, REST APIs, SQL, MongoDB.
- Frontend & Backend: End-to-end development from responsive UI components to server-side APIs.
- Location & Availability: Based in Hyderabad, serving notice period, and ready to join immediately (0 days notice).

My resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) is attached for your review.

Professional Links:
- Portfolio: https://murali-portfolio-website.vercel.app
- GitHub: https://github.com/Muralikrishnapopuri
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- Live Project (Zestchat): https://zestchat.vercel.app

Thank you for your time.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Sravanthi,</p>
        <p>My name is <strong>Murali Krishna Popuri</strong>, and I am a Full-Stack Developer with 2+ years of professional experience. I am writing to apply for <strong>Full Stack, React, and Backend Developer</strong> roles at Shell Infotech in Hyderabad.</p>
        
        <p>I build scalable web applications and RESTful services using <strong>React.js, Node.js, Express, TypeScript, and database systems</strong>. At YoungMinds Technology Solutions, I developed real-time synchronized platforms with microservices and relational SQL schemas.</p>

        <p><strong>Key highlights:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Tech Stack:</strong> React.js, TypeScript, Node.js, Express, REST APIs, SQL, MongoDB.</li>
          <li><strong>Frontend &amp; Backend:</strong> End-to-end development from responsive UI components to server-side APIs.</li>
          <li><strong>Location &amp; Availability:</strong> Based in Hyderabad, serving notice period, and ready to join immediately (0 days notice).</li>
        </ul>

        <p>My resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) is attached for your review.</p>

        <p style="margin-top: 18px;">
          <strong>Professional Links:</strong><br/>
          &bull; <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          &bull; <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a><br/>
          &bull; <strong>Live Project (Zestchat):</strong> <a href="https://zestchat.vercel.app" style="color: #0284c7;">zestchat.vercel.app</a>
        </p>

        <p style="margin-top: 18px;">Thank you for your time.</p>

        <p style="margin-top: 18px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
];

async function main() {
  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP verified.\n");

  for (let i = 0; i < newApplications.length; i++) {
    const app = newApplications[i];
    console.log(`Sending application to ${app.company} (${app.to})...`);

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: app.to,
      subject: app.subject,
      text: app.body,
      html: app.html,
      attachments: [
        {
          filename: "Murali_Krishna_Popuri_FullStack_Developer.pdf",
          path: RESUME_PATH,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`SUCCESS! Sent to ${app.to}. Message ID: ${info.messageId}`);

    if (i < newApplications.length - 1) {
      await delay(3000);
    }
  }
}

main().catch((err) => {
  console.error("Failed to send email:", err);
  process.exit(1);
});
