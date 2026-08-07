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

const subject = "Following Up — Full Stack Developer | Open to New Opportunities";

const body = `Hi Lakshmi,

I hope you're doing well!

Thank you for reaching out to me previously with an opportunity — I really appreciated it. I wanted to follow up and check if there are any current openings at Neutara or with your clients that might be a good fit for my profile.

A quick summary about me:

• Name: Murali Krishna Popuri
• Experience: 2.5+ years as a Full-Stack Developer
• Current Company: YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present)
• Current Role: Building RestoSoft — an offline-first POS and restaurant ERP platform using Electron, React, Node.js, and PostgreSQL
• Notice Period: 40 Days (Open to immediate discussions)

Key Technical Skills:
• Frontend: React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap
• Backend & APIs: Node.js, Express.js, PHP, REST APIs, WebSockets
• Databases: PostgreSQL, MySQL, SQLite, MongoDB, Redis
• Tools: Git, GitHub, Electron, Docker, AI-powered development workflows

What I'm Looking For:
• Full Stack Developer / Frontend Developer / Backend Developer roles
• Preferred Locations: Hyderabad, Bangalore (also open to remote/hybrid)
• Open to both product-based and service-based companies

I have attached my updated resume for your reference. You can also check my work here:
• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Please do let me know if there are any suitable opportunities. I'd be happy to discuss further at your convenience.

Thank you for your time, Lakshmi!

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

const htmlBody = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.7; max-width: 650px;">
    <p>Hi Lakshmi,</p>
    <p>I hope you're doing well!</p>
    <p>Thank you for reaching out to me previously with an opportunity — I really appreciated it. I wanted to follow up and check if there are any <strong>current openings at Neutara</strong> or with your clients that might be a good fit for my profile.</p>

    <p><strong>A quick summary about me:</strong></p>
    <table style="border-collapse: collapse; width: 100%; margin: 10px 0;">
      <tr style="background: #f5f7fa;"><td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-weight: bold;">Name</td><td style="padding: 8px 12px; border: 1px solid #e0e0e0;">Murali Krishna Popuri</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-weight: bold;">Experience</td><td style="padding: 8px 12px; border: 1px solid #e0e0e0;">2.5+ years as a Full-Stack Developer</td></tr>
      <tr style="background: #f5f7fa;"><td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-weight: bold;">Current Company</td><td style="padding: 8px 12px; border: 1px solid #e0e0e0;">YoungMinds Technology Solutions Pvt Ltd (Feb 2025–Present)</td></tr>
      <tr><td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-weight: bold;">Current Role</td><td style="padding: 8px 12px; border: 1px solid #e0e0e0;">Building <strong>RestoSoft</strong> — an offline-first POS & restaurant ERP platform using Electron, React, Node.js, PostgreSQL</td></tr>
      <tr style="background: #f5f7fa;"><td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-weight: bold;">Notice Period</td><td style="padding: 8px 12px; border: 1px solid #e0e0e0;">40 Days (Open to immediate discussions)</td></tr>
    </table>

    <p><strong>Key Technical Skills:</strong></p>
    <ul>
      <li><strong>Frontend:</strong> React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap</li>
      <li><strong>Backend & APIs:</strong> Node.js, Express.js, PHP, REST APIs, WebSockets</li>
      <li><strong>Databases:</strong> PostgreSQL, MySQL, SQLite, MongoDB, Redis</li>
      <li><strong>Tools:</strong> Git, GitHub, Electron, Docker, AI-powered development workflows</li>
    </ul>

    <p><strong>What I'm Looking For:</strong></p>
    <ul>
      <li>Full Stack Developer / Frontend Developer / Backend Developer roles</li>
      <li>Preferred Locations: <strong>Hyderabad, Bangalore</strong> (also open to remote/hybrid)</li>
      <li>Open to both product-based and service-based companies</li>
    </ul>

    <p>I have attached my <strong>updated resume</strong> for your reference. You can also check my work here:</p>
    <ul>
      <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank">murali-portfolio-website.vercel.app</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank">github.com/Muralikrishnapopuri</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank">linkedin.com/in/murali-krishna-popuri</a></li>
    </ul>

    <p>Please do let me know if there are any suitable opportunities. I'd be happy to discuss further at your convenience.</p>

    <p>Thank you for your time, Lakshmi!</p>

    <br/>
    <p>Best regards,<br/>
    <strong>Murali Krishna Popuri</strong><br/>
    Phone: +91 9347796811<br/>
    Email: <a href="mailto:popurimurali16@gmail.com">popurimurali16@gmail.com</a></p>
  </div>
`;

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "kanchi.lakshmi@neutara.com",
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
  console.log("Sending follow-up email to kanchi.lakshmi@neutara.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully:", info.messageId);
}

send().catch((err) => {
  console.error("❌ Error sending email:", err);
  process.exit(1);
});
