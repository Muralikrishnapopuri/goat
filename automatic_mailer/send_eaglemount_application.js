const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RESUME_PATH = path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf");

if (!GMAIL_APP_PASSWORD) {
  console.error("GMAIL_APP_PASSWORD is not set in .env!");
  process.exit(1);
}

if (!fs.existsSync(RESUME_PATH)) {
  console.error("FATAL ERROR: Resume PDF not found at:", RESUME_PATH);
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

const targetApplication = {
  company: "Eaglemount Software",
  to: "info@eaglemount.com",
  role: "Software Developer (React.js)",
  subject: "Application for Software Developer (React.js) – Murali Krishna Popuri",
  body: `Hi Hiring Team,

My name is Murali Krishna Popuri. I am a developer with 2+ years of professional experience, writing to apply for the Software Developer (React.js) position at Eaglemount Software.

I specialize in building responsive, scalable web applications with React.js, modern JavaScript (ES6+), TypeScript, and RESTful API integrations. In my current role at YoungMinds Technology Solutions, I developed high-performance frontends, modular UI components, and integrated backend services.

How my experience aligns with your requirements:
- React.js & JavaScript: Strong expertise in component architecture, React hooks, and clean JavaScript (ES6+).
- API Integration: Hands-on experience integrating REST APIs, data parsing, and handling real-time asynchronous workflows.
- Styling & Responsiveness: Proficient with HTML5, CSS3, Tailwind CSS, and responsive cross-browser layouts.
- Performance & Quality: Proven track record optimizing rendering times and maintaining clean Git-based workflows.
- Availability: Available as an immediate joiner (currently serving notice period, 0 days notice).

My updated resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) is attached for your review.

Professional Links:
- Portfolio: https://murali-portfolio-website.vercel.app
- GitHub: https://github.com/Muralikrishnapopuri
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- Live Project (Zestchat): https://zestchat.vercel.app

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
      <p>Hi Hiring Team,</p>
      <p>My name is <strong>Murali Krishna Popuri</strong>. I am a developer with 2+ years of professional experience, writing to apply for the <strong>Software Developer (React.js)</strong> position at Eaglemount Software.</p>
      
      <p>I specialize in building responsive, scalable web applications with <strong>React.js, modern JavaScript (ES6+), TypeScript, and RESTful API integrations</strong>. In my current role at YoungMinds Technology Solutions, I developed high-performance frontends, modular UI components, and integrated backend services.</p>

      <p><strong>How my experience aligns with your requirements:</strong></p>
      <ul style="padding-left: 20px; margin: 8px 0;">
        <li><strong>React.js &amp; JavaScript:</strong> Strong expertise in component architecture, React hooks, and clean JavaScript (ES6+).</li>
        <li><strong>API Integration:</strong> Hands-on experience integrating REST APIs, data parsing, and handling real-time asynchronous workflows.</li>
        <li><strong>Styling &amp; Responsiveness:</strong> Proficient with HTML5, CSS3, Tailwind CSS, and responsive cross-browser layouts.</li>
        <li><strong>Performance &amp; Quality:</strong> Proven track record optimizing rendering times and maintaining clean Git-based workflows.</li>
        <li><strong>Availability:</strong> Available as an immediate joiner (currently serving notice period, 0 days notice).</li>
      </ul>

      <p>My updated resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) is attached for your review.</p>

      <p style="margin-top: 18px;">
        <strong>Professional Links:</strong><br/>
        &bull; <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
        &bull; <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
        &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a><br/>
        &bull; <strong>Live Project (Zestchat):</strong> <a href="https://zestchat.vercel.app" style="color: #0284c7;">zestchat.vercel.app</a>
      </p>

      <p style="margin-top: 18px;">Thank you for your time and consideration.</p>

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
  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP verified.");

  console.log(`Sending application to ${targetApplication.company} (${targetApplication.to})...`);

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: targetApplication.to,
    subject: targetApplication.subject,
    text: targetApplication.body,
    html: targetApplication.html,
    attachments: [
      {
        filename: "Murali_Krishna_Popuri_FullStack_Developer.pdf",
        path: RESUME_PATH,
      },
    ],
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`SUCCESS! Message sent to ${targetApplication.to}. Message ID: ${info.messageId}`);
}

main().catch((err) => {
  console.error("Failed to send email:", err);
  process.exit(1);
});
