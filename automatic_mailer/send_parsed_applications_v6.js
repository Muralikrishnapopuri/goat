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

const resumePath = path.join(__dirname, "Murali_Krishna_Popuri_Full_Stack_Dev.pdf");

if (!fs.existsSync(resumePath)) {
  console.error("FATAL ERROR: Resume PDF file not found at:", resumePath);
  process.exit(1);
} else {
  console.log("Verified Resume PDF exists at:", resumePath, "Size:", fs.statSync(resumePath).size, "bytes");
}

const applicationsBatch6 = [
  {
    company: "Innomax IT Solutions",
    targetEmail: "careers@innomaxsol.com",
    role: "AI Developer Trainee / Web Developer (JavaScript, React.js, Node.js)",
    location: "Hyderabad",
    subject: "Application for AI Developer Trainee / Web Developer – Murali Krishna Popuri",
    body: `Hi Hiring Team,

I am writing to express my strong interest in the AI Developer Trainee / Web Developer position at Innomax IT Solutions in Hyderabad.

I am a Full-Stack Developer with 2+ years of hands-on experience in JavaScript, React.js, Node.js, Express, RESTful APIs, databases, and AI coding tools (Claude, Cursor, GitHub Copilot). At YoungMinds Technology Solutions, I built responsive frontend interfaces and high-performance backend services.

I am based in/open to working on-site in Hyderabad and am currently serving my notice period as an immediate joiner.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached to this email. I look forward to the possibility of discussing this opportunity with you.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Hiring Team,</p>
        <p>I am writing to express my strong interest in the <strong>AI Developer Trainee / Web Developer</strong> position at Innomax IT Solutions in Hyderabad.</p>
        <p>I am a Full-Stack Developer with 2+ years of hands-on experience in <strong>JavaScript, React.js, Node.js, Express, RESTful APIs, databases, and AI tools (Claude, Cursor, GitHub Copilot)</strong>. At YoungMinds Technology Solutions, I built responsive frontend interfaces and high-performance backend services.</p>
        <p>I am based in/open to working on-site in Hyderabad and am currently serving my notice period as an immediate joiner.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached to this email.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  },
  {
    company: "Vidyavision.com",
    targetEmail: "info@vidyavision.com",
    role: "Front-End UI Developer (React JS & Next JS)",
    location: "Hyderabad",
    subject: "Application for Front-End UI Developer (React.js / Next.js) – Murali Krishna Popuri",
    body: `Hi Hiring Team,

I am writing to apply for the Front-End UI Developer position at Vidyavision.com in Hyderabad.

I am a Frontend & Full-Stack Developer with 2+ years of experience building modern, responsive web applications using React.js, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, REST APIs, and state management libraries. I specialize in building reusable component libraries and optimizing frontend web performance.

I am based in Hyderabad and available to join immediately as I am currently serving my notice period.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Hiring Team,</p>
        <p>I am writing to apply for the <strong>Front-End UI Developer (React JS & Next JS)</strong> position at Vidyavision.com in Hyderabad.</p>
        <p>I am a Frontend & Full-Stack Developer with 2+ years of experience building modern, responsive web applications using <strong>React.js, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, REST APIs</strong>, and state management libraries. I specialize in building reusable component libraries and optimizing frontend web performance.</p>
        <p>I am based in Hyderabad and available to join immediately as I am currently serving my notice period.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  },
  {
    company: "ThinkRisk",
    targetEmail: "sindoori@miyoglobal.com",
    role: "Full Stack Developer | Gen-AI (React.js, Full Stack, REST APIs, MySQL)",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    body: `Hi Sindoori,

I am writing to apply for the Full Stack Developer role at ThinkRisk in Hyderabad.

I am a Full-Stack Developer with 2+ years of experience building web applications using React.js, Node.js, JavaScript, REST APIs, and MySQL. I actively utilize modern Gen-AI development tools (Claude, Cursor, GitHub Copilot) in my daily workflow to accelerate feature delivery and build robust application architecture.

I am based in Hyderabad, comfortable with hybrid work, and available to join immediately as I am currently serving my notice period.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached to this email. I look forward to discussing this opportunity further.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Sindoori,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer</strong> role at ThinkRisk in Hyderabad.</p>
        <p>I am a Full-Stack Developer with 2+ years of experience building web applications using <strong>React.js, Node.js, JavaScript, REST APIs, and MySQL</strong>. I actively utilize modern Gen-AI development tools (Claude, Cursor, GitHub Copilot) in my daily workflow to accelerate feature delivery and build robust application architecture.</p>
        <p>I am based in Hyderabad, comfortable with hybrid work, and available to join immediately as I am currently serving my notice period.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached to this email.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  }
];

async function run() {
  console.log(`Starting Batch 6 Outreach (Direct HR Only, PDF Resume Attached) for ${applicationsBatch6.length} matched companies...`);
  
  for (let i = 0; i < applicationsBatch6.length; i++) {
    const app = applicationsBatch6[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`[${i + 1}/${applicationsBatch6.length}] Sending application for ${app.company}...`);
    console.log(`Target Email: ${app.targetEmail}`);
    console.log(`Subject: ${app.subject}`);
    
    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: app.targetEmail,
      subject: app.subject,
      text: app.body,
      html: app.html,
      attachments: [
        {
          filename: "Murali_Krishna_Popuri_Full_Stack_Dev.pdf",
          path: resumePath
        }
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Sent successfully directly to target HR: ${app.targetEmail}! MessageId: ${info.messageId}`);
    } catch (err) {
      console.error(`❌ Failed to send email to ${app.targetEmail}:`, err.message);
    }
  }

  console.log(`\nBatch 6 applications dispatched successfully with PDF resume attached!`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
