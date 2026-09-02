const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TEST_EMAIL = "popurimuralikrishna04@gmail.com";

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

const applications = [
  {
    company: "KOŚA / Qualify IT Solutions",
    targetEmail: "info@qualifyitsolutions.com",
    role: "Full Stack Developer (React / Node / TypeScript / PostgreSQL)",
    location: "Nizampet, Hyderabad (Onsite)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    body: `Hi Hiring Team,

I came across your opening for the Full Stack Developer role at KOŚA in Hyderabad and wanted to reach out directly.

I'm a Full-Stack Developer with 2+ years of hands-on experience building scalable applications using React, TypeScript, Node.js, and PostgreSQL. In my recent work at YoungMinds Technology Solutions, I built desktop and web platform components using React, Node.js, Express, and relational SQL databases, along with background event sync and REST APIs.

My stack aligns directly with what you're looking for (React 18, TypeScript, Node.js, PostgreSQL). Since I am currently serving my notice period, I am available to join immediately and work on-site at Nizampet, Hyderabad.

I have attached my updated resume for your reference. I would love the chance to connect and discuss how I can contribute to KOŚA.

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
        <p>I came across your opening for the <strong>Full Stack Developer</strong> role at <strong>KOŚA</strong> in Hyderabad and wanted to reach out directly.</p>
        <p>I'm a Full-Stack Developer with 2+ years of hands-on experience building scalable applications using <strong>React, TypeScript, Node.js, and PostgreSQL</strong>. In my recent work at YoungMinds Technology Solutions, I built desktop and web platform components using React, Node.js, Express, and relational SQL databases, along with background event sync and REST APIs.</p>
        <p>My stack aligns directly with what you're looking for (<strong>React 18, TypeScript, Node.js, PostgreSQL</strong>). Since I am currently serving my notice period, I am available to join immediately and work on-site at Nizampet, Hyderabad.</p>
        <p>I have attached my updated resume for your reference. I would love the chance to connect and discuss how I can contribute to KOŚA.</p>
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
    company: "TOX INTL",
    targetEmail: "contact@toxintl.com",
    role: "Full Stack Developer (Cloud, AI & Automation)",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer (Cloud & AI) – Murali Krishna Popuri",
    body: `Hi TOX INTL Team,

I saw your posting for the Full Stack Developer role in Hyderabad focused on Cloud & AI products, and I am very interested in applying.

I have 2+ years of full-stack development experience working with React, Node.js, Express, TypeScript, and SQL/NoSQL databases. On the AI side, I have hands-on experience integrating LLMs (Claude AI API) and RAG (Retrieval-Augmented Generation) in real-time web applications, alongside tools like GitHub Copilot.

I am currently based in Hyderabad and serving my notice period as an immediate joiner, so I can start right away.

My resume is attached for your review. I'd welcome a brief conversation to talk about how my skills fit your team's goals.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi TOX INTL Team,</p>
        <p>I saw your posting for the <strong>Full Stack Developer</strong> role in Hyderabad focused on Cloud & AI products, and I am very interested in applying.</p>
        <p>I have 2+ years of full-stack development experience working with <strong>React, Node.js, Express, TypeScript, and SQL/NoSQL databases</strong>. On the AI side, I have hands-on experience integrating LLMs (Claude AI API) and RAG (Retrieval-Augmented Generation) in real-time web applications, alongside AI tools like GitHub Copilot.</p>
        <p>I am currently based in Hyderabad and serving my notice period as an immediate joiner, so I can start right away.</p>
        <p>My resume is attached for your review. I'd welcome a brief conversation to talk about how my skills fit your team's goals.</p>
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

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function run() {
  console.log(`Found ${applications.length} matching job opportunities from page content.`);

  for (let i = 0; i < applications.length; i++) {
    const app = applications[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`[${i + 1}/${applications.length}] Sending application for ${app.company}...`);
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

    if (i < applications.length - 1) {
      console.log("Waiting 3 seconds before sending next application...");
      await delay(3000);
    }
  }

  console.log(`\nAll matching applications dispatched successfully!`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
