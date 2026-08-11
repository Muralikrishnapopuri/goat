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

const subject = "Re: Job Application Details — Murali Krishna Popuri";

const body = `Dear Abhinandana,

Here are my details:

* Exp: 2 Years (React, Node.js, SQL, PHP — Unit Testing, Development to Deployment)
* Location: Tirupati (Native: Vijayawada, open to relocate)
* Current CTC: ₹15k/month
* Expected CTC: ₹3 - 5 LPA
* Notice Period: 40 Days (Negotiable, contract-based)

Best,
Murali Krishna Popuri
+91 9347796811`;

const htmlBody = `
  <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 600px;">
    <p>Dear Abhinandana,</p>
    <p>Here are my details:</p>
    <ul>
      <li><strong>Exp:</strong> 2 Years (React, Node.js, SQL, PHP — Unit Testing, Development to Deployment)</li>
      <li><strong>Location:</strong> Tirupati (Native: Vijayawada, open to relocate)</li>
      <li><strong>Current CTC:</strong> ₹15k/month</li>
      <li><strong>Expected CTC:</strong> ₹3 - 5 LPA</li>
      <li><strong>Notice Period:</strong> 40 Days (Negotiable, contract-based)</li>
    </ul>
    <br/>
    <p>Best,<br/>
    <strong>Murali Krishna Popuri</strong><br/>
    +91 9347796811</p>
  </div>
`;

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "popurimuralikrishna04@gmail.com", // Send preview first
  subject: subject,
  text: body,
  html: htmlBody,
  attachments: [
    {
      filename: "MURALI-KRISHNA_Aug_11.pdf",
      path: path.join(__dirname, "MURALI-KRISHNA_Aug_11.pdf"),
    }
  ]
};

async function send() {
  console.log("Sending preview reply to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Preview email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
