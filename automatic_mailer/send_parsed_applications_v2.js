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

const newApplications = [
  {
    company: "Programming.com",
    targetEmail: "Rashamdeep.kaur@programming.com",
    role: "Senior Software Engineer (JavaScript, Node.js, React, TypeScript, AI)",
    location: "Hyderabad (Work From Office)",
    subject: "Application for Senior Software Engineer (Node.js, React & AI) – Murali Krishna Popuri",
    body: `Hi Rashamdeep,

I came across your posting for the Senior Software Engineer role (Node.js, React & AI) in Hyderabad and wanted to reach out.

I am a Full-Stack Developer with 2+ years of hands-on experience building scalable applications using JavaScript, TypeScript, Node.js, Express, and React. On the AI side, I actively incorporate modern AI tools like GitHub Copilot and Claude AI API, including RAG architecture, into my daily engineering workflow.

I am based in Hyderabad, comfortable working from the office, and currently serving my notice period as an immediate joiner.

I have attached my updated resume for your reference. I would appreciate the opportunity to discuss how my technical background aligns with your team's goals.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Rashamdeep,</p>
        <p>I came across your posting for the <strong>Senior Software Engineer</strong> role (Node.js, React & AI) in Hyderabad and wanted to reach out.</p>
        <p>I am a Full-Stack Developer with 2+ years of hands-on experience building scalable applications using <strong>JavaScript, TypeScript, Node.js, Express, and React</strong>. On the AI side, I actively incorporate modern AI tools like GitHub Copilot and Claude AI API, including RAG architecture, into my daily engineering workflow.</p>
        <p>I am based in Hyderabad, comfortable working from the office, and currently serving my notice period as an immediate joiner.</p>
        <p>I have attached my updated resume for your reference. I would appreciate the opportunity to discuss how my technical background aligns with your team's goals.</p>
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
  console.log(`Found ${newApplications.length} new matching job opportunity from page content.`);

  for (let i = 0; i < newApplications.length; i++) {
    const app = newApplications[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`[${i + 1}/${newApplications.length}] Sending application for ${app.company}...`);
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

  console.log(`\nAll new matching applications dispatched successfully!`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
