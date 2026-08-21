const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
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

const subject = "[NEW RESUME TEST] Murali Krishna Popuri — Updated Resume Attachment";

const body = `Hi Murali,

Attached is your new updated resume file (MURALI-KRISHNA_.pdf) for testing and review.

Resume Details:
• File Name: MURALI-KRISHNA_.pdf
• File Path: /home/murali-krishna/cluad/goat/automatic_mailer/MURALI-KRISHNA_.pdf
• File Size: ~69.2 KB

Links:
• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811`;

const htmlBody = `
  <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 650px;">
    <h3 style="color: #0066cc;">[NEW RESUME TEST] Updated Resume Attachment</h3>
    <p>Hi Murali,</p>
    <p>Attached is your new updated resume file (<strong>MURALI-KRISHNA_.pdf</strong>) for testing and review.</p>
    
    <p><strong>Resume File Details:</strong></p>
    <ul>
      <li><strong>File Name:</strong> MURALI-KRISHNA_.pdf</li>
      <li><strong>File Path:</strong> <code>/home/murali-krishna/cluad/goat/automatic_mailer/MURALI-KRISHNA_.pdf</code></li>
      <li><strong>File Size:</strong> ~69.2 KB</li>
    </ul>

    <p><strong>Work Links:</strong></p>
    <ul>
      <li>🌐 <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank">murali-portfolio-website.vercel.app</a></li>
      <li>💻 <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank">github.com/Muralikrishnapopuri</a></li>
      <li>🔗 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank">linkedin.com/in/murali-krishna-popuri</a></li>
    </ul>

    <br/>
    <p>Best regards,<br/>
    <strong>Murali Krishna Popuri</strong><br/>
    Phone: +91 9347796811<br/>
    Email: popurimurali16@gmail.com</p>
  </div>
`;

const resumeFilePath = path.join(__dirname, "MURALI-KRISHNA_.pdf");

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "popurimuralikrishna04@gmail.com",
  subject: subject,
  text: body,
  html: htmlBody,
  attachments: [
    {
      filename: "MURALI-KRISHNA_.pdf",
      path: resumeFilePath,
    }
  ]
};

async function send() {
  console.log("Sending test email with new resume (MURALI-KRISHNA_.pdf) to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Test email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending test email:", err);
  process.exit(1);
});
