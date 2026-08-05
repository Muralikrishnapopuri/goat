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

const subject = "Application for Full Stack Developer — Murali Krishna Popuri";

const body = `Dear Hiring Team,

I hope you are doing well.

I am writing to express my strong interest in the Full Stack Developer position at Billions United. With 2.5 years of professional experience building scalable web applications, real-time sync systems, and offline-first desktop architectures, I am confident I can contribute effectively to your engineering projects.

Here is a summary of my current role and availability:
• Current Role: Full-Stack Developer at YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present), building offline-first Electron POS systems and real-time web applications.
• Notice Period: 40 Days (Open to immediate discussions).

Key Technical Skills:
• Frontend: React.js, Next.js, Redux, HTML5, CSS3, Tailwind CSS, Bootstrap, JavaScript (ES6+), TypeScript.
• Backend & APIs: Node.js, Express.js, PHP, REST APIs, WebSockets, silent printing integrations.
• Databases & Tooling: PostgreSQL, MySQL, SQLite, MongoDB, Redis, Git, GitHub.

I have attached my resume (MURALI-KRISHNA_Aug_05.pdf) for your review. You can also view my portfolio and live projects at:
• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri
• Featured Project (Zestchat): https://zestchat.vercel.app

Thank you for your time and consideration. I would welcome the opportunity to discuss how my full-stack capabilities can support Billions United.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

const htmlBody = `
  <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 650px;">
    <p>Dear Hiring Team,</p>
    <p>I hope you are doing well.</p>
    <p>I am writing to express my strong interest in the <strong>Full Stack Developer</strong> position at <strong>Billions United</strong>. With 2.5 years of professional experience building scalable web applications, real-time sync systems, and offline-first desktop architectures, I am confident I can contribute effectively to your engineering projects.</p>
    
    <p>Here is a summary of my current role and availability:</p>
    <ul>
      <li><strong>Current Role:</strong> Full-Stack Developer at YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present), building offline-first Electron POS systems and real-time web applications.</li>
      <li><strong>Notice Period:</strong> 40 Days (Open to immediate discussions).</li>
    </ul>

    <p>Key Technical Skills:</p>
    <ul>
      <li><strong>Frontend:</strong> React.js, Next.js, Redux, HTML5, CSS3, Tailwind CSS, Bootstrap, JavaScript (ES6+), TypeScript.</li>
      <li><strong>Backend & APIs:</strong> Node.js, Express.js, PHP, REST APIs, WebSockets, silent printing integrations.</li>
      <li><strong>Databases & Tooling:</strong> PostgreSQL, MySQL, SQLite, MongoDB, Redis, Git, GitHub.</li>
    </ul>
    
    <p>I have attached my resume (MURALI-KRISHNA_Aug_05.pdf) for your review. You can also view my portfolio and live projects at:</p>
    <ul>
      <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank">murali-portfolio-website.vercel.app</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank">github.com/Muralikrishnapopuri</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank">linkedin.com/in/murali-krishna-popuri</a></li>
      <li><strong>Featured Project (Zestchat):</strong> <a href="https://zestchat.vercel.app" target="_blank">zestchat.vercel.app</a></li>
    </ul>
    
    <p>Thank you for your time and consideration. I would welcome the opportunity to discuss how my full-stack capabilities can support Billions United.</p>
    <br/>
    <p>Best regards,<br/>
    <strong>Murali Krishna Popuri</strong><br/>
    Phone: +91 9347796811<br/>
    Email: popurimurali16@gmail.com</p>
  </div>
`;

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "jobs@billionsunited.com",
  subject: subject,
  text: body,
  html: htmlBody,
  attachments: [
    {
      filename: "MURALI-KRISHNA_Aug_05.pdf",
      path: path.join(__dirname, "MURALI-KRISHNA_Aug_05.pdf"),
    }
  ]
};

async function send() {
  console.log("Sending email to jobs@billionsunited.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
