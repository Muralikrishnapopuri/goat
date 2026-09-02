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

const resumePath = path.join(__dirname, "Murali_Krishna_Popuri_Full_Stack_Dev.pdf");

if (!fs.existsSync(resumePath)) {
  console.error("FATAL ERROR: Resume PDF file not found at:", resumePath);
  process.exit(1);
} else {
  console.log("Verified Resume PDF exists at:", resumePath, "Size:", fs.statSync(resumePath).size, "bytes");
}

const applicationsBatch5 = [
  {
    company: "FirstMile IT Services",
    targetEmail: "ritu@firstmileitinc.in",
    role: "Full Stack Node JS Developer (React.js, Node.js, TypeScript)",
    location: "Bangalore",
    subject: "Application for Full Stack Node JS Developer – Murali Krishna Popuri",
    body: `Hi Ritu,

I am writing to apply for the Full Stack Node JS Developer position at FirstMile IT Services in Bangalore.

I am a Full-Stack Developer with 2+ years of experience engineering web applications using Node.js, Express, React.js, TypeScript, RESTful APIs, and relational/NoSQL databases. In my work at YoungMinds Technology Solutions, I built scalable backend microservices and modern frontend component systems while maintaining high code quality.

I am open to working on-site in Bangalore and am currently serving my notice period as an immediate joiner.

I have attached my updated resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) for your review. I look forward to speaking with you.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Ritu,</p>
        <p>I am writing to apply for the <strong>Full Stack Node JS Developer (React.js, Node.js, TypeScript)</strong> position at FirstMile IT Services in Bangalore.</p>
        <p>I am a Full-Stack Developer with 2+ years of experience engineering web applications using <strong>Node.js, Express, React.js, TypeScript, RESTful APIs, and relational/NoSQL databases</strong>. In my work at YoungMinds Technology Solutions, I built scalable backend services and modern frontend component systems.</p>
        <p>I am open to working on-site in Bangalore and am currently serving my notice period as an immediate joiner.</p>
        <p>I have attached my updated resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) for your review. I look forward to speaking with you.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  },
  {
    company: "Brigosha",
    targetEmail: "Nabi.hussain@brigosha.com",
    role: "Full Stack Developer (React + Node.js / TypeScript)",
    location: "Bangalore",
    subject: "Application for React Node Fullstack – Murali Krishna Popuri",
    body: `Hi Nabi,

I saw your job post for Full Stack Developer roles and am writing to apply for the React + Node.js position in Bangalore.

I have 2+ years of full-stack development experience utilizing React.js, TypeScript, Node.js, Express, PostgreSQL, and MongoDB to deliver responsive UIs and robust backend APIs. I am comfortable handling end-to-end features, writing clean modular code, and integrating third-party APIs.

I am open to hybrid/onsite work in Bangalore and available to join immediately as I am currently serving my notice period.

My resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached to this email.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Nabi,</p>
        <p>I saw your job post for Full Stack Developer roles and am writing to apply for the <strong>React + Node.js / TypeScript</strong> position in Bangalore.</p>
        <p>I have 2+ years of full-stack development experience utilizing <strong>React.js, TypeScript, Node.js, Express, PostgreSQL, and MongoDB</strong> to deliver responsive UIs and robust backend APIs. I am comfortable handling end-to-end features, writing clean modular code, and integrating third-party APIs.</p>
        <p>I am open to hybrid/onsite work in Bangalore and available to join immediately as I am currently serving my notice period.</p>
        <p>My resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached to this email.</p>
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
  console.log(`Starting Batch 5 Outreach (Direct HR Only, PDF Resume Attached) for ${applicationsBatch5.length} matched companies...`);
  
  for (let i = 0; i < applicationsBatch5.length; i++) {
    const app = applicationsBatch5[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`[${i + 1}/${applicationsBatch5.length}] Sending application for ${app.company}...`);
    console.log(`Target Email: ${app.targetEmail}`);
    console.log(`Subject: ${app.subject}`);
    
    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: app.targetEmail,
      subject: app.subject,
      text: app.body,
      html: app.html,
      attachments: [
        {
          filename: "Murali_Krishna_Popuri_Full_Stack_Dev.pdf",
          path: resumePath
        }
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Sent successfully directly to target HR: ${app.targetEmail}! MessageId: ${info.messageId}`);
    } catch (err) {
      console.error(`❌ Failed to send email to ${app.targetEmail}:`, err.message);
    }
  }

  console.log(`\nBatch 5 applications dispatched successfully with PDF resume attached!`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
