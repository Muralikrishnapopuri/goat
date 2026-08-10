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

const body = `Dear Tealvue Team,

I hope you're doing well. I am writing to express my interest in any open Full Stack Developer positions at Tealvue Software Solutions.

I was impressed by the product suite you've built — Stilt for derivative analytics, Flamingo for stock screening, Swift for trading terminals, and Hawk SOC for real-time monitoring. Building real-time, data-intensive platforms like these requires exactly the kind of engineering I specialize in — fast, responsive frontends paired with robust backend architectures and real-time data pipelines.

About Me:
• Name: Murali Krishna Popuri
• Experience: 2.5+ years as a Full-Stack Developer
• Current Company: YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present)
• Current Role: Building RestoSoft — an offline-first POS and restaurant ERP platform using Electron, React, Node.js, and PostgreSQL
• Notice Period: 40 Days (Open to immediate discussions)
• Open to: Chennai, Hyderabad, Bangalore, Remote/Hybrid

Key Technical Skills:
• Frontend: React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
• Backend & APIs: Node.js, Express.js, PHP, REST APIs, WebSockets (real-time data)
• Databases: PostgreSQL, MySQL, SQLite, MongoDB, Redis
• Tools & Platforms: Git, GitHub, Electron, Docker, AI-powered development workflows

Why I'd Be a Good Fit for Tealvue:
• Built real-time sync systems — I engineered a bi-directional cloud sync engine and LAN-based real-time architecture for multi-terminal POS setups. This experience translates directly to building real-time trading dashboards and analytics platforms.
• Strong in data-heavy UIs — My current work involves rendering complex data tables, live order tracking, and dynamic reporting dashboards — similar to what Stilt, Flamingo, and Albatross require.
• Full ownership mindset — I handle everything from feature design to production deployment, writing clean, maintainable, and scalable code.
• AI-integrated workflows — I actively use AI tools to accelerate development, which aligns with Tealvue's data analytics and automation focus.

I have attached my updated resume for your review. You can also check my work here:
• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would love the opportunity to discuss how I can contribute to Tealvue's product engineering efforts. Please feel free to reach out at your convenience.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

const htmlBody = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.7; max-width: 680px;">
    <p>Dear <strong>Tealvue Team</strong>,</p>

    <p>I hope you're doing well. I am writing to express my interest in any open <strong>Full Stack Developer</strong> positions at <strong>Tealvue Software Solutions</strong>.</p>

    <p>I was impressed by the product suite you've built — <strong>Stilt</strong> for derivative analytics, <strong>Flamingo</strong> for stock screening, <strong>Swift</strong> for trading terminals, and <strong>Hawk SOC</strong> for real-time monitoring. Building real-time, data-intensive platforms like these requires exactly the kind of engineering I specialize in — fast, responsive frontends paired with robust backend architectures and real-time data pipelines.</p>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p><strong>📋 About Me:</strong></p>
    <table style="border-collapse: collapse; width: 100%; margin: 10px 0;">
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold; width: 35%;">Name</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Murali Krishna Popuri</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Experience</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">2.5+ years as a Full-Stack Developer</td></tr>
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Current Company</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present)</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Current Role</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Building <strong>RestoSoft</strong> — offline-first POS & restaurant ERP (Electron, React, Node.js, PostgreSQL)</td></tr>
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Notice Period</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">40 Days (Open to immediate discussions)</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Open To</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Chennai, Hyderabad, Bangalore, Remote/Hybrid</td></tr>
    </table>

    <p><strong>🛠️ Key Technical Skills:</strong></p>
    <ul>
      <li><strong>Frontend:</strong> React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</li>
      <li><strong>Backend & APIs:</strong> Node.js, Express.js, PHP, REST APIs, WebSockets (real-time data)</li>
      <li><strong>Databases:</strong> PostgreSQL, MySQL, SQLite, MongoDB, Redis</li>
      <li><strong>Tools & Platforms:</strong> Git, GitHub, Electron, Docker, AI-powered development workflows</li>
    </ul>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p><strong>🎯 Why I'd Be a Good Fit for Tealvue:</strong></p>
    <ul>
      <li><strong>Built real-time sync systems</strong> — Engineered a bi-directional cloud sync engine and LAN-based real-time architecture for multi-terminal setups. This translates directly to building real-time trading dashboards and analytics platforms.</li>
      <li><strong>Strong in data-heavy UIs</strong> — My current work involves rendering complex data tables, live order tracking, and dynamic reporting dashboards — similar to what Stilt, Flamingo, and Albatross require.</li>
      <li><strong>Full ownership mindset</strong> — I handle everything from feature design to production deployment, writing clean, maintainable, and scalable code.</li>
      <li><strong>AI-integrated workflows</strong> — I actively use AI tools to accelerate development, which aligns with Tealvue's data analytics and automation focus.</li>
    </ul>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p>I have attached my <strong>updated resume</strong> for your review. Please find my online profiles below:</p>
    <ul>
      <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank" style="color: #1a73e8;">murali-portfolio-website.vercel.app</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank" style="color: #1a73e8;">github.com/Muralikrishnapopuri</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank" style="color: #1a73e8;">linkedin.com/in/murali-krishna-popuri</a></li>
    </ul>

    <p>I would love the opportunity to discuss how I can contribute to <strong>Tealvue's product engineering</strong> efforts. Please feel free to reach out at your convenience.</p>

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
  to: "info@tealvue.com",
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
  console.log("Sending application email to info@tealvue.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully:", info.messageId);
}

send().catch((err) => {
  console.error("❌ Error sending email:", err);
  process.exit(1);
});
