const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

// Target is Umasankar Patro
const TARGET_EMAIL = process.argv[2] || "umasankar.patro@audax.io";

const FORM_PATH = path.join(__dirname, "Referred_Candidate_Declaration_Form_Murali_Krishna_Popuri.pdf");
const RESUME_PATH = path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf");

if (!fs.existsSync(FORM_PATH)) {
  console.error("FATAL ERROR: Declaration Form PDF not found at:", FORM_PATH);
  process.exit(1);
}

const mailData = {
  to: TARGET_EMAIL,
  subject: "Audax Referral: Completed Declaration Form – Murali Krishna Popuri (Senior Software Engineer - Web)",
  body: `Hi Umasankar,

I hope you are doing well.

As discussed, I have completed and signed the Referred Candidate Declaration Form for the Senior Software Engineer (Web) role (India / Bangalore).

Please find attached:
1. Referred_Candidate_Declaration_Form_Murali_Krishna_Popuri.pdf (Completed & Signed)
2. Murali_Krishna_Popuri_FullStack_Developer.pdf (Resume)

Quick overview of my profile:
- Total Experience: 2 years of full-stack web development specializing in React.js, Next.js, TypeScript, Node.js, Express, and PostgreSQL/MySQL.
- Current Role: Full-Stack Developer at YoungMinds Technology Solutions (building RestoSoft enterprise platform).
- Notice Period: Immediate Joiner (Official LWD: Nov 11, negotiable for early release upon offer).
- Location: Open to onsite / hybrid in Bangalore (as indicated in the declaration form).

Portfolio & Links:
- Portfolio: https://murali-portfolio-website.vercel.app
- GitHub: https://github.com/Muralikrishnapopuri
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- Live Demo (Zestchat): https://zestchat.vercel.app
- Live Demo (Pixel Polish): https://pixelpolish.vercel.app

Thank you so much for referring me. Please let me know if you need any additional details from my end to submit the referral.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,

  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
      <p>Hi Umasankar,</p>
      
      <p>I hope you are doing well.</p>

      <p>As discussed, I have completed and signed the <strong>Referred Candidate Declaration Form</strong> for the <strong>Senior Software Engineer (Web)</strong> role (India / Bangalore).</p>
      
      <p><strong>Please find attached:</strong></p>
      <ol style="padding-left: 20px; margin: 8px 0;">
        <li><strong>Referred_Candidate_Declaration_Form_Murali_Krishna_Popuri.pdf</strong> (Completed &amp; Signed)</li>
        <li><strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong> (Resume)</li>
      </ol>

      <p><strong>Quick overview of my profile:</strong></p>
      <ul style="padding-left: 20px; margin: 8px 0;">
        <li><strong>Total Experience:</strong> 2 years of full-stack web development (React.js, Next.js, TypeScript, Node.js, Express, PostgreSQL, MySQL)</li>
        <li><strong>Current Role:</strong> Full-Stack Developer at YoungMinds Technology Solutions (building RestoSoft enterprise platform)</li>
        <li><strong>Notice Period:</strong> Immediate Joiner (Official LWD: Nov 11, negotiable for early release upon offer)</li>
        <li><strong>Location:</strong> Open to onsite / hybrid in Bangalore</li>
      </ul>

      <p style="margin-top: 18px;">
        <strong>Portfolio &amp; Links:</strong><br/>
        &bull; <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
        &bull; <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
        &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a><br/>
        &bull; <strong>Live Demo (Zestchat):</strong> <a href="https://zestchat.vercel.app" style="color: #0284c7;">zestchat.vercel.app</a><br/>
        &bull; <strong>Live Demo (Pixel Polish):</strong> <a href="https://pixelpolish.vercel.app" style="color: #0284c7;">pixelpolish.vercel.app</a>
      </p>

      <p style="margin-top: 18px;">Thank you so much for referring me. Please let me know if you need any additional details from my end to submit the referral.</p>

      <p style="margin-top: 18px;">
        Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com
      </p>
    </div>
  `,
};

async function main() {
  console.log("==================================================");
  console.log("AUDAX REFERRED CANDIDATE DECLARATION SUBMISSION");
  console.log("To:", mailData.to);
  console.log("Subject:", mailData.subject);
  console.log("Attachments:");
  console.log("  1.", FORM_PATH);
  if (fs.existsSync(RESUME_PATH)) {
    console.log("  2.", RESUME_PATH);
  }
  console.log("==================================================");
  console.log(mailData.body);
  console.log("==================================================");

  if (!GMAIL_APP_PASSWORD) {
    console.log("\n⚠️  GMAIL_APP_PASSWORD is not set in automatic_mailer/.env.");
    console.log("Please create automatic_mailer/.env with:");
    console.log("  SENDER_EMAIL=popurimurali16@gmail.com");
    console.log("  GMAIL_APP_PASSWORD=your_16_digit_app_password");
    console.log("\nTo dispatch live to", mailData.to, "set the password and re-run.");
    return;
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

  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP verified successfully.");

  const attachments = [
    {
      filename: "Referred_Candidate_Declaration_Form_Murali_Krishna_Popuri.pdf",
      path: FORM_PATH,
    },
  ];

  if (fs.existsSync(RESUME_PATH)) {
    attachments.push({
      filename: "Murali_Krishna_Popuri_FullStack_Developer.pdf",
      path: RESUME_PATH,
    });
  }

  console.log(`Dispatching email to ${mailData.to}...`);
  const info = await transporter.sendMail({
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: mailData.to,
    subject: mailData.subject,
    text: mailData.body,
    html: mailData.html,
    attachments: attachments,
  });

  console.log("✅ SUCCESS! Email sent successfully to:", mailData.to);
  console.log("Message ID:", info.messageId);

  // Record in sent_history.json
  const historyPath = path.join(__dirname, "sent_history.json");
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));
    } catch (e) {
      history = [];
    }
  }

  history.push({
    timestamp: new Date().toISOString(),
    recipientEmail: mailData.to,
    company: "Audax (Referral via Umasankar Patro)",
    role: "Senior Software Engineer (Web)",
    status: "SENT",
    messageId: info.messageId,
  });

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), "utf-8");
  console.log("Updated sent_history.json successfully.");
}

main().catch((err) => {
  console.error("❌ Failed to send email:", err);
  process.exit(1);
});
