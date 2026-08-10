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

const subject = "Naresh IT Alumni — Seeking Placement Guidance & Job Switch Support | Murali Krishna Popuri";

const body = `Dear Naresh IT Placement Team,

I hope this email finds you well. My name is Murali Krishna Popuri, and I am a proud alumni of Naresh IT. I completed the UI Full Stack Web Development with React course last year, and I was successfully placed through your screening test process.

First, I would like to sincerely thank the Naresh IT team for the excellent training and placement support that helped me kickstart my career in the IT industry.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions Pvt Ltd, where I have gained 2.5+ years of hands-on professional experience building production-grade applications. I am now looking to switch to a new opportunity and would greatly appreciate your guidance and placement support once again.

My Current Profile:
• Name: Murali Krishna Popuri
• Course Completed: UI Full Stack Web Development with React (Naresh IT)
• Current Company: YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present)
• Current Role: Full-Stack Developer — Building RestoSoft, an offline-first POS and restaurant ERP platform using Electron, React, Node.js, and PostgreSQL
• Total Experience: 2.5+ years
• Notice Period: 40 Days (Open to immediate discussions)

Technical Skills (Updated):
• Frontend: React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap
• Backend & APIs: Node.js, Express.js, PHP, REST APIs, WebSockets
• Databases: PostgreSQL, MySQL, SQLite, MongoDB, Redis
• Tools & Platforms: Git, GitHub, Electron, Docker, AI-powered development workflows

What I'm Looking For:
• Roles: Full Stack Developer / Frontend Developer / React Developer / Node.js Developer
• Preferred Locations: Hyderabad, Bangalore (also open to remote/hybrid)
• Open to product-based, service-based, and startup companies

I kindly request:
1. If there are any current job openings available through Naresh IT's placement cell, please consider my profile.
2. Any updated placement drives, company tie-ups, or screening tests that I can participate in.
3. Any guidance on how alumni like me can leverage Naresh IT's placement network for a job switch.

I have attached my updated resume for your reference. Please find my online profiles below:
• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would really appreciate any support or direction you can provide. Thank you for always being a great institution — Naresh IT truly made a difference in my career, and I look forward to your guidance once again.

Warm regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Naresh IT Alumni — UI Full Stack Web Development with React`;

const htmlBody = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.7; max-width: 680px;">
    <p>Dear <strong>Naresh IT Placement Team</strong>,</p>

    <p>I hope this email finds you well. My name is <strong>Murali Krishna Popuri</strong>, and I am a proud alumni of <strong>Naresh IT</strong>. I completed the <strong>UI Full Stack Web Development with React</strong> course last year, and I was <strong>successfully placed through your screening test</strong> process.</p>

    <p>First, I would like to sincerely thank the Naresh IT team for the excellent training and placement support that helped me kickstart my career in the IT industry.</p>

    <p>I am currently working as a <strong>Full-Stack Developer</strong> at <strong>YoungMinds Technology Solutions Pvt Ltd</strong>, where I have gained <strong>2.5+ years</strong> of hands-on professional experience building production-grade applications. I am now <strong>looking to switch to a new opportunity</strong> and would greatly appreciate your guidance and placement support once again.</p>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p><strong>📋 My Current Profile:</strong></p>
    <table style="border-collapse: collapse; width: 100%; margin: 10px 0;">
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold; width: 35%;">Name</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Murali Krishna Popuri</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Naresh IT Course</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">UI Full Stack Web Development with React</td></tr>
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Current Company</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present)</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Current Role</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">Full-Stack Developer — Building <strong>RestoSoft</strong> (offline-first POS & restaurant ERP using Electron, React, Node.js, PostgreSQL)</td></tr>
      <tr style="background: #f0f4ff;"><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Total Experience</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">2.5+ years</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #d0d7e6; font-weight: bold;">Notice Period</td><td style="padding: 8px 12px; border: 1px solid #d0d7e6;">40 Days (Open to immediate discussions)</td></tr>
    </table>

    <p><strong>🛠️ Technical Skills (Updated):</strong></p>
    <ul>
      <li><strong>Frontend:</strong> React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap</li>
      <li><strong>Backend & APIs:</strong> Node.js, Express.js, PHP, REST APIs, WebSockets</li>
      <li><strong>Databases:</strong> PostgreSQL, MySQL, SQLite, MongoDB, Redis</li>
      <li><strong>Tools & Platforms:</strong> Git, GitHub, Electron, Docker, AI-powered development workflows</li>
    </ul>

    <p><strong>🎯 What I'm Looking For:</strong></p>
    <ul>
      <li><strong>Roles:</strong> Full Stack Developer / Frontend Developer / React Developer / Node.js Developer</li>
      <li><strong>Preferred Locations:</strong> Hyderabad, Bangalore (also open to remote/hybrid)</li>
      <li>Open to product-based, service-based, and startup companies</li>
    </ul>

    <hr style="border: 1px solid #e8e8e8; margin: 20px 0;"/>

    <p><strong>🙏 I kindly request:</strong></p>
    <ol>
      <li>If there are any <strong>current job openings</strong> available through Naresh IT's placement cell, please consider my profile.</li>
      <li>Any <strong>updated placement drives, company tie-ups, or screening tests</strong> that I can participate in.</li>
      <li>Any <strong>guidance on how alumni</strong> like me can leverage Naresh IT's placement network for a job switch.</li>
    </ol>

    <p>I have attached my <strong>updated resume</strong> for your reference. Please find my online profiles below:</p>
    <ul>
      <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank" style="color: #1a73e8;">murali-portfolio-website.vercel.app</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank" style="color: #1a73e8;">github.com/Muralikrishnapopuri</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank" style="color: #1a73e8;">linkedin.com/in/murali-krishna-popuri</a></li>
    </ul>

    <p>I would really appreciate any support or direction you can provide. Thank you for always being a great institution — <strong>Naresh IT truly made a difference in my career</strong>, and I look forward to your guidance once again.</p>

    <br/>
    <p>Warm regards,<br/>
    <strong>Murali Krishna Popuri</strong><br/>
    Phone: +91 9347796811<br/>
    Email: <a href="mailto:popurimurali16@gmail.com" style="color: #1a73e8;">popurimurali16@gmail.com</a><br/>
    <em style="color: #666;">Naresh IT Alumni — UI Full Stack Web Development with React</em></p>
  </div>
`;

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "info@nareshit.com",
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
  console.log("Sending email to info@nareshit.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully:", info.messageId);
}

send().catch((err) => {
  console.error("❌ Error sending email:", err);
  process.exit(1);
});
