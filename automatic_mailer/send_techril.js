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

const body = `Dear Techril Hiring Team,

I hope you're doing well. I am writing to express my interest in any open Full Stack Developer positions at Techril Software Solutions. After researching your company, I was genuinely impressed by the breadth of your services — from custom enterprise applications and AI/ML solutions to cloud infrastructure and ERP systems. The kind of end-to-end product engineering Techril delivers closely aligns with the work I do today, and I'd love the opportunity to contribute to your team.

About Me:
• Name: Murali Krishna Popuri
• Experience: 2.5+ years as a Full-Stack Developer
• Current Company: YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present)
• Current Role: Building RestoSoft — an offline-first POS and restaurant ERP platform using Electron, React, Node.js, and PostgreSQL
• Notice Period: 40 Days (Open to immediate discussions)
• Preferred Location: Hyderabad (also open to Bangalore / remote / hybrid)

Key Technical Skills:
• Frontend: React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap
• Backend & APIs: Node.js, Express.js, PHP, REST APIs, WebSockets
• Databases: PostgreSQL, MySQL, SQLite, MongoDB, Redis
• Tools & Platforms: Git, GitHub, Electron, Docker, AI-powered development workflows

What Makes Me a Good Fit for Techril:
• I have hands-on experience building custom enterprise software (ERP/POS systems) — which directly aligns with Techril's business solutions practice.
• I've engineered a bi-directional cloud sync engine and a LAN-based real-time sync architecture for multi-terminal setups — demonstrating strong backend and systems thinking.
• I actively use AI tools and agentic workflows to accelerate development — relevant to Techril's AI & ML offerings.
• I take full ownership from feature ideation to production deployment, ensuring clean, maintainable, and scalable code.

I have attached my updated resume for your review. Please find my online profiles below:
• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would welcome the opportunity to discuss how my skills and experience can add value to Techril's engineering team. Please feel free to reach out at your convenience.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

const htmlBody = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.7; max-width: 680px;">
    <p>Dear <strong>Techril Hiring Team</strong>,</p>

    <p>I hope you're doing well. I am writing to express my interest in any open <strong>Full Stack Developer</strong> positions at <strong>Techril Software Solutions</strong>. After researching your company, I was genuinely impressed by the breadth of your services — from custom enterprise applications and AI/ML solutions to cloud infrastructure and ERP systems. The kind of end-to-end product engineering Techril delivers closely aligns with the work I do today, and I'd love the opportunity to contribute to your team.</p>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p><strong>📋 About Me:</strong></p>
    <table style="border-collapse: collapse; width: 100%; margin: 10px 0;">
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold; width: 35%;">Name</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Murali Krishna Popuri</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Experience</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">2.5+ years as a Full-Stack Developer</td></tr>
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Current Company</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present)</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Current Role</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Building <strong>RestoSoft</strong> — offline-first POS & restaurant ERP (Electron, React, Node.js, PostgreSQL)</td></tr>
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Notice Period</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">40 Days (Open to immediate discussions)</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Preferred Location</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Hyderabad (also open to Bangalore / remote / hybrid)</td></tr>
    </table>

    <p><strong>🛠️ Key Technical Skills:</strong></p>
    <ul>
      <li><strong>Frontend:</strong> React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap</li>
      <li><strong>Backend & APIs:</strong> Node.js, Express.js, PHP, REST APIs, WebSockets</li>
      <li><strong>Databases:</strong> PostgreSQL, MySQL, SQLite, MongoDB, Redis</li>
      <li><strong>Tools & Platforms:</strong> Git, GitHub, Electron, Docker, AI-powered development workflows</li>
    </ul>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p><strong>🎯 What Makes Me a Good Fit for Techril:</strong></p>
    <ul>
      <li>Hands-on experience building <strong>custom enterprise software (ERP/POS systems)</strong> — directly aligns with Techril's business solutions practice.</li>
      <li>Engineered a <strong>bi-directional cloud sync engine</strong> and <strong>LAN-based real-time sync architecture</strong> for multi-terminal setups — strong backend & systems thinking.</li>
      <li>Actively use <strong>AI tools and agentic workflows</strong> to accelerate development — relevant to Techril's AI & ML offerings.</li>
      <li>Full ownership from <strong>feature ideation to production deployment</strong> — clean, maintainable, and scalable code.</li>
    </ul>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p>I have attached my <strong>updated resume</strong> for your review. Please find my online profiles below:</p>
    <ul>
      <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank" style="color: #1a73e8;">murali-portfolio-website.vercel.app</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank" style="color: #1a73e8;">github.com/Muralikrishnapopuri</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank" style="color: #1a73e8;">linkedin.com/in/murali-krishna-popuri</a></li>
    </ul>

    <p>I would welcome the opportunity to discuss how my skills and experience can add value to <strong>Techril's engineering team</strong>. Please feel free to reach out at your convenience.</p>

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
  to: "careers@techril.com",
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
  console.log("Sending application email to careers@techril.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully:", info.messageId);
}

send().catch((err) => {
  console.error("❌ Error sending email:", err);
  process.exit(1);
});
