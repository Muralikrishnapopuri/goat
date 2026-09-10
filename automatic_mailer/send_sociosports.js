const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const USER_NOTIFICATION_EMAIL = "popurimuralikrishna04@gmail.com";
const TARGET_EMAIL = "careers@sociosports.com";

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
  console.error("Resume file not found at:", resumePath);
  process.exit(1);
}

const subject = "Application for MERN Stack Developer – Murali Krishna Popuri";

const body = `Dear SocioSports Hiring Team,

I hope this email finds you well.

I am writing to enthusiastically apply for the MERN Stack Developer role at SocioSports. With 2 years of professional experience building scalable web applications, real-time event-driven systems, and responsive frontends, I am excited about the opportunity to contribute to your sports-tech ecosystem.

About Me & Key Highlights:
• Name: Murali Krishna Popuri
• Experience: 2 years as a Full-Stack / MERN Developer
• Core Stack: MongoDB, Express.js, React.js, Node.js, TypeScript, REST APIs, WebSockets
• Current/Recent Role: Full-Stack Developer at YoungMinds Technology Solutions Pvt Ltd
• Key Achievements: Built real-time multi-terminal platforms, bi-directional cloud data synchronization engines, and high-performance REST APIs.
• Availability: Immediate / 1-2 weeks negotiable notice period | Open to Hyderabad (Hybrid/Onsite)

Why I Am a Strong Fit for SocioSports:
1. MERN Expertise: Proficient in developing interactive user interfaces in React.js/Next.js and architecting reliable, clean backend APIs with Node.js and Express.
2. Real-Time & Event Architecture: Experienced with WebSockets and real-time state sync, vital for dynamic sports tracking, user engagement, and live platform features.
3. Database & System Performance: Skilled in designing optimized schemas (MongoDB, PostgreSQL, MySQL) and implementing caching, authentication (JWT), and background jobs.
4. Product-Oriented Mindset: Passionate about building seamless user journeys, end-to-end product delivery, and fast feature turnarounds.

My updated resume is attached (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) for your review. You can also explore my portfolio and code repositories below:

• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would welcome the opportunity to discuss how my technical skills and enthusiasm for sports technology can add immediate value to SocioSports.

Thank you for your time and consideration.

Best regards,

Murali Krishna Popuri
MERN / Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com
`;

const htmlBody = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #2d3748; line-height: 1.6; max-width: 680px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #ffffff;">
    <div style="border-bottom: 2px solid #3182ce; padding-bottom: 12px; margin-bottom: 20px;">
      <h2 style="color: #2b6cb0; margin: 0 0 6px 0; font-size: 22px;">Application for MERN Stack Developer</h2>
      <p style="margin: 0; color: #4a5568; font-size: 14px;"><strong>Murali Krishna Popuri</strong> | Full-Stack / MERN Developer</p>
    </div>

    <p>Dear <strong>SocioSports Hiring Team</strong>,</p>

    <p>I hope this email finds you well.</p>

    <p>I am writing to enthusiastically apply for the <strong>MERN Stack Developer</strong> role at <strong>SocioSports</strong>. With <strong>2 years of hands-on experience</strong> building scalable web applications, real-time systems, and high-performance frontends, I am excited about the opportunity to contribute to your sports-tech ecosystem.</p>

    <div style="background-color: #f7fafc; border-left: 4px solid #3182ce; padding: 14px 18px; margin: 20px 0; border-radius: 4px;">
      <strong style="color: #2b6cb0; font-size: 15px;">⚡ Quick Snapshot:</strong>
      <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #4a5568;">
        <li style="margin-bottom: 6px;"><strong>Core Tech Stack:</strong> React.js, Node.js, Express.js, MongoDB, TypeScript, REST APIs, WebSockets &amp; Tailwind CSS.</li>
        <li style="margin-bottom: 6px;"><strong>Track Record:</strong> Engineered an offline-first POS &amp; web ecosystem (RestoSoft) with zero-latency local sync, bi-directional cloud data synchronization, and event-driven architecture.</li>
        <li style="margin-bottom: 6px;"><strong>Key Project:</strong> Built <em>Zestchat</em> — real-time messaging platform with AI assistant integration, image optimization, and PostgreSQL/MongoDB data layers.</li>
        <li><strong>Notice Period &amp; Location:</strong> <strong>Immediate / Short notice (1-2 weeks)</strong> | Open to Hyderabad (Hybrid / Onsite).</li>
      </ul>
    </div>

    <p style="margin-top: 20px;"><strong>🎯 Why I Am a Strong Match for SocioSports:</strong></p>
    <ul style="padding-left: 20px; color: #4a5568;">
      <li style="margin-bottom: 8px;"><strong>Full-Lifecycle MERN Engineering:</strong> Seamlessly handle frontend state management (React/Redux) and architect modular, scalable microservices in Node.js &amp; Express.</li>
      <li style="margin-bottom: 8px;"><strong>Real-Time Data &amp; WebSockets:</strong> Experienced in building responsive event streaming and live data updates, critical for interactive sports engagement and notifications.</li>
      <li style="margin-bottom: 8px;"><strong>Database &amp; Schema Design:</strong> Deep experience designing scalable NoSQL (MongoDB) and SQL schemas optimized for low latency and high read/write throughput.</li>
      <li style="margin-bottom: 8px;"><strong>Ownership &amp; Agility:</strong> Accustomed to fast-paced environments, agile workflows, and writing clean, maintainable, production-ready code.</li>
    </ul>

    <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 22px 0;" />

    <p>My updated resume is attached for your review: <strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>.</p>

    <p><strong>🌐 Online Profiles &amp; Work:</strong></p>
    <ul style="list-style-type: none; padding-left: 0; margin: 10px 0;">
      <li style="margin-bottom: 8px;">🚀 <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank" style="color: #3182ce; text-decoration: none; font-weight: 600;">murali-portfolio-website.vercel.app</a></li>
      <li style="margin-bottom: 8px;">💻 <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank" style="color: #3182ce; text-decoration: none; font-weight: 600;">github.com/Muralikrishnapopuri</a></li>
      <li style="margin-bottom: 8px;">💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank" style="color: #3182ce; text-decoration: none; font-weight: 600;">linkedin.com/in/murali-krishna-popuri</a></li>
    </ul>

    <p>I would appreciate the chance to discuss how my technical expertise can help drive SocioSports forward. Thank you for your time and consideration.</p>

    <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #edf2f7;">
      <p style="margin: 0; font-weight: bold; color: #2d3748;">Murali Krishna Popuri</p>
      <p style="margin: 2px 0 0 0; color: #718096; font-size: 14px;">Full-Stack / MERN Developer</p>
      <p style="margin: 4px 0 0 0; color: #4a5568; font-size: 14px;">📞 +91 9347796811 | ✉️ <a href="mailto:popurimurali16@gmail.com" style="color: #3182ce; text-decoration: none;">popurimurali16@gmail.com</a></p>
    </div>
  </div>
`;

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: TARGET_EMAIL,
  bcc: USER_NOTIFICATION_EMAIL,
  subject: subject,
  text: body,
  html: htmlBody,
  attachments: [
    {
      filename: "Murali_Krishna_Popuri_Full_Stack_Dev.pdf",
      path: resumePath,
    },
  ],
};

async function sendEmail() {
  console.log(`Sending job application to ${TARGET_EMAIL} (Bcc: ${USER_NOTIFICATION_EMAIL})...`);
  console.log(`Attachment: ${resumePath}`);
  
  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email successfully sent!");
  console.log("Message ID:", info.messageId);
  console.log("Accepted:", info.accepted);
}

sendEmail().catch((err) => {
  console.error("❌ Error sending email:", err);
  process.exit(1);
});
