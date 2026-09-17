const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const USER_NOTIFICATION_EMAIL = "popurimuralikrishna04@gmail.com";

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

const resumePath = path.join(__dirname, "Murali_Krishna_Popuri_Resume.pdf");

if (!fs.existsSync(resumePath)) {
  console.error("FATAL ERROR: Resume PDF file not found at:", resumePath);
  process.exit(1);
}

const targetEmail = "sapjobs@mallangsalma.com";
const targetRole = "Full Stack Developer & AI Developer (Bangalore / Hyderabad)";
const emailSubject = "Application for Full Stack Developer & AI Developer - Murali Krishna Popuri";

const emailBody = `Hi Mansoor,

I am writing to express my interest in the Full Stack Developer and AI Developer openings in Bangalore / Hyderabad.

I am a Full-Stack Developer with 2+ years of professional full-stack development experience and 8 months of hands-on project experience building scalable web applications and AI-driven services.

Candidate Summary:
- Professional Experience: 2+ Years Full-Stack Development
- Project Experience: 8 Months Hands-on Development
- Frontend: React.js, Next.js, Angular, TypeScript, JavaScript (ES6+), HTML5/CSS3, responsive UI development
- Backend & APIs: RESTful APIs, Node.js, Express, microservices integration, and backend logic
- Databases: PostgreSQL, SQLite, MySQL, and MongoDB
- AI & GenAI: Hands-on experience integrating RAG (Retrieval-Augmented Generation) and LLM APIs (Claude AI, OpenAI)
- Availability: Immediate Joiner (currently serving notice period, 0 days notice)
- Work Mode / Locations: Open to Bangalore / Hyderabad (Hybrid / Virtual)

My resume (Murali_Krishna_Popuri_Resume.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

const emailHtml = `
  <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
    <p>Hi Mansoor,</p>
    <p>I am writing to express my interest in the <strong>Full Stack Developer</strong> and <strong>AI Developer</strong> openings in Bangalore / Hyderabad.</p>
    <p>I am a Full-Stack Developer with <strong>2+ years of professional full-stack development experience</strong> and <strong>8 months of hands-on project experience</strong> building scalable web applications and AI-driven services.</p>
    
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin: 16px 0;">
      <p style="margin: 0 0 8px 0; font-weight: bold; color: #0f172a;">Candidate Details & Skills:</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li><strong>Professional Experience:</strong> 2+ Years Full-Stack Development</li>
        <li><strong>Project Experience:</strong> 8 Months Hands-on Development</li>
        <li><strong>Frontend:</strong> React.js, Next.js, Angular, TypeScript, JavaScript (ES6+), responsive UI</li>
        <li><strong>Backend & APIs:</strong> RESTful APIs, Node.js, Express, microservices integration</li>
        <li><strong>Databases:</strong> PostgreSQL, SQLite, MySQL, and MongoDB</li>
        <li><strong>AI & GenAI:</strong> Hands-on implementation of RAG pipelines and LLM APIs (Claude AI, OpenAI)</li>
        <li><strong>Availability:</strong> Immediate Joiner (0 days notice / serving notice period)</li>
        <li><strong>Preferred Locations:</strong> Bangalore / Hyderabad (Hybrid / Virtual)</li>
      </ul>
    </div>

    <p>My resume (<strong>Murali_Krishna_Popuri_Resume.pdf</strong>) is attached for your review.</p>
    <p style="margin-top: 16px;">
      <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
      <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
      <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
    </p>
    <p style="margin-top: 16px;">
      Best regards,<br/>
      <strong>Murali Krishna Popuri</strong><br/>
      Phone: +91 9347796811<br/>
      Email: popurimurali16@gmail.com
    </p>
  </div>
`;

// WhatsApp outreach text strictly adhering to rules (NO email mention, includes links)
const whatsappMessage = `Hi Mansoor,

I noticed your posting regarding Full Stack Developer and AI Developer openings in Bangalore and Hyderabad.

I am a Full-Stack Developer with 2+ years of professional experience and 8 months of hands-on project experience in React.js, Node.js, TypeScript, and Generative AI integrations. I am an immediate joiner (0 days notice) available for roles in Bangalore or Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would be glad to share my resume (Murali_Krishna_Popuri_Resume.pdf) directly here on WhatsApp for your consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811`;

async function sendTargetApplication() {
  console.log("================================================================================");
  console.log(`SENDING APPLICATION TO: ${targetEmail}`);
  console.log(`Role: ${targetRole}`);
  console.log(`Resume: ${resumePath}`);
  console.log("================================================================================\n");

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: targetEmail,
    subject: emailSubject,
    text: emailBody,
    html: emailHtml,
    attachments: [
      {
        filename: "Murali_Krishna_Popuri_Resume.pdf",
        path: resumePath,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`SUCCESS: Application sent to ${targetEmail} (Message ID: ${info.messageId})`);
  } catch (err) {
    console.error(`FAILED to send to ${targetEmail}: ${err.message}`);
    process.exit(1);
  }

  console.log("\n================================================================================");
  console.log(`SENDING WHATSAPP CONTACT SUMMARY TO: ${USER_NOTIFICATION_EMAIL}`);
  console.log("================================================================================");

  const summaryText = `RECRUITER WHATSAPP CONTACT & READY-TO-COPY MESSAGE
Target Recruiter: Mansoor MS
Phone / WhatsApp: +91 9550185379
Email: ${targetEmail}
Role: ${targetRole}

Ready-to-Copy WhatsApp Message (NO email mention, links included):
--------------------------------------------------------------------------------
${whatsappMessage}
--------------------------------------------------------------------------------
`;

  const summaryHtml = `
    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 650px; margin: 0 auto; background: #f8fafc; padding: 20px; border-radius: 8px;">
      <div style="background: #0f172a; color: #ffffff; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 4px 0; color: #ffffff;">Target Application Dispatched: Mallang Salma</h3>
        <p style="margin: 0; font-size: 13px; color: #94a3b8;">Email: ${targetEmail} | Role: ${targetRole}</p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 18px;">
        <div style="font-size: 15px; font-weight: bold; color: #0f172a; margin-bottom: 6px;">
          Recruiter WhatsApp Contact
        </div>
        <div style="font-size: 13px; color: #475569; margin-bottom: 12px;">
          <strong>Recruiter:</strong> Mansoor MS<br/>
          <strong>WhatsApp:</strong> <a href="tel:+919550185379" style="color: #0284c7; font-weight: bold;">+91 9550185379</a><br/>
          <strong>Experience Stated:</strong> 2+ Years Professional + 8 Months Projects (100% Honest)
        </div>

        <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #059669; margin-bottom: 6px;">
          Ready-to-Copy WhatsApp Message:
        </div>
        <pre style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 13px; color: #0f172a; white-space: pre-wrap; word-break: break-word; margin: 0;">${whatsappMessage}</pre>
      </div>
    </div>
  `;

  const summaryMailOptions = {
    from: `"Murali Outreach System" <${SENDER_EMAIL}>`,
    to: USER_NOTIFICATION_EMAIL,
    subject: "Target Application Dispatched & WhatsApp Contact: sapjobs@mallangsalma.com",
    text: summaryText,
    html: summaryHtml,
  };

  try {
    const sumInfo = await transporter.sendMail(summaryMailOptions);
    console.log(`SUCCESS: WhatsApp contact summary sent to ${USER_NOTIFICATION_EMAIL} (Message ID: ${sumInfo.messageId})`);
  } catch (err) {
    console.error(`FAILED to send summary: ${err.message}`);
  }

  console.log("\nApplication and notification completed successfully.");
}

sendTargetApplication().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
