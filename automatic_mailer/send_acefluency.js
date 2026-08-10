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

const subject = "Application for Full Stack Developer — Murali Krishna Popuri | 2.5+ Yrs Experience";

const body = `Dear AceFluency Team,

I hope you're doing well. I am writing to express my interest in any open Full Stack Developer or Software Engineer positions at AceFluency.

I really admire what AceFluency is building — a platform that connects learners for real-time English practice through 1-on-1 live sessions, peer-to-peer calling, anonymous practice modes, and voice clubs. Building a real-time, interactive EdTech product like this at scale requires solid engineering across the full stack — and that's exactly where my experience lies.

About Me:
• Name: Murali Krishna Popuri
• Experience: 2.5+ years as a Full-Stack Developer
• Current Company: YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present)
• Current Role: Building RestoSoft — an offline-first POS and restaurant ERP platform using Electron, React, Node.js, and PostgreSQL
• Notice Period: 40 Days (Open to immediate discussions)
• Open to: Bangalore, Hyderabad, Remote/Hybrid

Key Technical Skills:
• Frontend: React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
• Backend & APIs: Node.js, Express.js, PHP, REST APIs, WebSockets (real-time communication)
• Databases: PostgreSQL, MySQL, SQLite, MongoDB, Redis
• Tools & Platforms: Git, GitHub, Electron, Docker, AI-powered development workflows

Why I'd Be a Good Fit for AceFluency:
• Real-time communication experience — I've built WebSocket-based real-time sync systems and LAN-based multi-terminal architectures. This maps directly to building real-time calling, voice clubs, and live session features.
• Full-stack product ownership — At my current role, I own features end-to-end from UI design to backend APIs to database optimization, which is exactly the kind of ownership a growing startup like AceFluency needs.
• Scalable architecture — I engineered a bi-directional cloud sync engine that handles concurrent data from multiple terminals without duplication — the kind of reliability real-time user-to-user platforms demand.
• Quick learner & AI-powered workflow — I actively use AI tools to accelerate development cycles, helping ship features faster without compromising quality.

I have attached my updated resume for your review. You can also check my work here:
• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would love the opportunity to discuss how I can contribute to AceFluency's product engineering. Please feel free to reach out at your convenience.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

const htmlBody = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.7; max-width: 680px;">
    <p>Dear <strong>AceFluency Team</strong>,</p>

    <p>I hope you're doing well. I am writing to express my interest in any open <strong>Full Stack Developer</strong> or <strong>Software Engineer</strong> positions at <strong>AceFluency</strong>.</p>

    <p>I really admire what AceFluency is building — a platform that connects learners for real-time English practice through <strong>1-on-1 live sessions, peer-to-peer calling, anonymous practice modes, and voice clubs</strong>. Building a real-time, interactive EdTech product like this at scale requires solid engineering across the full stack — and that's exactly where my experience lies.</p>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p><strong>📋 About Me:</strong></p>
    <table style="border-collapse: collapse; width: 100%; margin: 10px 0;">
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold; width: 35%;">Name</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Murali Krishna Popuri</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Experience</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">2.5+ years as a Full-Stack Developer</td></tr>
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Current Company</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present)</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Current Role</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Building <strong>RestoSoft</strong> — offline-first POS & restaurant ERP (Electron, React, Node.js, PostgreSQL)</td></tr>
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Notice Period</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">40 Days (Open to immediate discussions)</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Open To</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Bangalore, Hyderabad, Remote/Hybrid</td></tr>
    </table>

    <p><strong>🛠️ Key Technical Skills:</strong></p>
    <ul>
      <li><strong>Frontend:</strong> React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</li>
      <li><strong>Backend & APIs:</strong> Node.js, Express.js, PHP, REST APIs, WebSockets (real-time communication)</li>
      <li><strong>Databases:</strong> PostgreSQL, MySQL, SQLite, MongoDB, Redis</li>
      <li><strong>Tools & Platforms:</strong> Git, GitHub, Electron, Docker, AI-powered development workflows</li>
    </ul>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p><strong>🎯 Why I'd Be a Good Fit for AceFluency:</strong></p>
    <ul>
      <li><strong>Real-time communication experience</strong> — Built WebSocket-based real-time sync systems and LAN-based multi-terminal architectures. Maps directly to real-time calling, voice clubs, and live session features.</li>
      <li><strong>Full-stack product ownership</strong> — I own features end-to-end from UI to backend APIs to database optimization — the kind of ownership a growing startup needs.</li>
      <li><strong>Scalable architecture</strong> — Engineered a bi-directional cloud sync engine handling concurrent data without duplication — the reliability real-time user-to-user platforms demand.</li>
      <li><strong>Quick learner & AI-powered workflow</strong> — Actively use AI tools to accelerate development, shipping features faster without compromising quality.</li>
    </ul>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p>I have attached my <strong>updated resume</strong> for your review. Please find my online profiles below:</p>
    <ul>
      <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank" style="color: #1a73e8;">murali-portfolio-website.vercel.app</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank" style="color: #1a73e8;">github.com/Muralikrishnapopuri</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank" style="color: #1a73e8;">linkedin.com/in/murali-krishna-popuri</a></li>
    </ul>

    <p>I would love the opportunity to discuss how I can contribute to <strong>AceFluency's product engineering</strong>. Please feel free to reach out at your convenience.</p>

    <p>Thank you for your time and consideration.</p>

    <br/>
    <p>Best regards,<br/>
    <strong>Murali Krishna Popuri</strong><br/>
    Phone: +91 9347796811<br/>
    Email: <a href="mailto:popurimurali16@gmail.com" style="color: #1a73e8;">popurimurali16@gmail.com</a></p>
  </div>
`;

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "support@acefluency.com",
  subject: subject,
  text: body,
  html: htmlBody,
  attachments: [
    {
      filename: "MURALI-KRISHNA_Aug_07.pdf",
      path: path.join(__dirname, "MURALI-KRISHNA_Aug_07.pdf"),
    }
  ]
};

async function send() {
  console.log("Sending application email to support@acefluency.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully:", info.messageId);
}

send().catch((err) => {
  console.error("❌ Error sending email:", err);
  process.exit(1);
});
