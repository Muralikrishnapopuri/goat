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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const targetApplications = [
  {
    company: "BCT Consulting",
    recruiter: "Angel David",
    to: "angel.r@bct-consulting.com",
    role: "Full Stack Developer (React / Kafka / REST APIs / Microservices / SQL)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    body: `Hi Angel,

My name is Murali Krishna Popuri. I am a Full-Stack Developer with 2+ years of professional experience, writing to apply for the Full Stack Developer position in Hyderabad as shared on LinkedIn.

I build scalable web applications with React.js, Node.js, REST APIs, Kafka event streaming, and relational databases. In my current role at YoungMinds Technology Solutions, I engineered real-time synchronization between client terminals using Kafka, designed relational SQL schemas, and built responsive UI components.

Why I am a strong fit:
- Frontend: Strong hands-on experience building component-driven UI in React.js and TypeScript.
- Backend & APIs: Practical experience with REST APIs, microservices, and Postman testing.
- Event Streaming: Integrated Kafka for real-time data synchronization in production.
- Databases: Experience with PostgreSQL, MySQL, and SQLite.
- Location & Availability: Based in Hyderabad, serving notice period, and available to join immediately (0 days notice). Available for face-to-face evaluation.

My resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) is attached for your review.

Professional Links:
- Portfolio: https://murali-portfolio-website.vercel.app
- GitHub: https://github.com/Muralikrishnapopuri
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- Live Project (Zestchat): https://zestchat.vercel.app

Thank you for your time.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Angel,</p>
        <p>My name is <strong>Murali Krishna Popuri</strong>. I am a Full-Stack Developer with 2+ years of professional experience, writing to apply for the <strong>Full Stack Developer</strong> position in Hyderabad as shared on LinkedIn.</p>
        
        <p>I build scalable web applications with <strong>React.js, Node.js, REST APIs, Kafka event streaming, and relational databases</strong>. In my current role at YoungMinds Technology Solutions, I engineered real-time synchronization between client terminals using Kafka, designed relational SQL schemas, and built responsive UI components.</p>

        <p><strong>Why I am a strong fit:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Frontend:</strong> Strong hands-on experience building component-driven UI in React.js and TypeScript.</li>
          <li><strong>Backend &amp; APIs:</strong> Practical experience with REST APIs, microservices, and Postman testing.</li>
          <li><strong>Event Streaming:</strong> Integrated Kafka for real-time data synchronization in production.</li>
          <li><strong>Databases:</strong> Experience with PostgreSQL, MySQL, and SQLite.</li>
          <li><strong>Location &amp; Availability:</strong> Based in Hyderabad, serving notice period, and available to join immediately (0 days notice). Available for face-to-face evaluation.</li>
        </ul>

        <p>My resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) is attached for your review.</p>

        <p style="margin-top: 18px;">
          <strong>Professional Links:</strong><br/>
          &bull; <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          &bull; <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a><br/>
          &bull; <strong>Live Project (Zestchat):</strong> <a href="https://zestchat.vercel.app" style="color: #0284c7;">zestchat.vercel.app</a>
        </p>

        <p style="margin-top: 18px;">Thank you for your time.</p>

        <p style="margin-top: 18px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "T9 IT Solutions",
    recruiter: "Vijay Chitreddy",
    to: "vijay@t9gic.com",
    role: "Full Stack / Web Developer (React / REST APIs / SQL Server)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    body: `Hi Vijay,

My name is Murali Krishna Popuri. I am a Full-Stack Developer with 2+ years of professional experience, writing to apply for the developer opportunity at T9 IT Solutions in Hyderabad.

I specialize in building scalable web applications and high-performance user interfaces using React.js, TypeScript, RESTful Web APIs, and relational databases (SQL).

Relevant qualifications:
- Frontend: Hands-on experience developing modular, responsive components with React.js, TypeScript, and modern CSS.
- Backend & Web APIs: Designing and integrating REST APIs, data transformation, and service logic.
- Databases: Experience working with relational schemas and database optimization.
- Location & Work Mode: Based in Hyderabad and available for Hyderabad office work.
- Availability: Immediate joiner (currently serving notice period, 0 days notice).

My resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) is attached for your consideration.

Professional Links:
- Portfolio: https://murali-portfolio-website.vercel.app
- GitHub: https://github.com/Muralikrishnapopuri
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- Live Project (Zestchat): https://zestchat.vercel.app

Thank you for your time.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Vijay,</p>
        <p>My name is <strong>Murali Krishna Popuri</strong>. I am a Full-Stack Developer with 2+ years of professional experience, writing to apply for the developer opportunity at T9 IT Solutions in Hyderabad.</p>
        
        <p>I specialize in building scalable web applications and high-performance user interfaces using <strong>React.js, TypeScript, RESTful Web APIs, and relational databases (SQL)</strong>.</p>

        <p><strong>Relevant qualifications:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Frontend:</strong> Hands-on experience developing modular, responsive components with React.js, TypeScript, and modern CSS.</li>
          <li><strong>Backend &amp; Web APIs:</strong> Designing and integrating REST APIs, data transformation, and service logic.</li>
          <li><strong>Databases:</strong> Experience working with relational schemas and database optimization.</li>
          <li><strong>Location &amp; Work Mode:</strong> Based in Hyderabad and available for Hyderabad office work.</li>
          <li><strong>Availability:</strong> Immediate joiner (currently serving notice period, 0 days notice).</li>
        </ul>

        <p>My resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) is attached for your consideration.</p>

        <p style="margin-top: 18px;">
          <strong>Professional Links:</strong><br/>
          &bull; <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          &bull; <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a><br/>
          &bull; <strong>Live Project (Zestchat):</strong> <a href="https://zestchat.vercel.app" style="color: #0284c7;">zestchat.vercel.app</a>
        </p>

        <p style="margin-top: 18px;">Thank you for your time.</p>

        <p style="margin-top: 18px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "NS Global",
    recruiter: "Oviya G",
    to: "oviya.nsglobal@gmail.com",
    role: "Full Stack Developer (React / REST APIs / Microservices / SQL)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    body: `Hi Oviya,

My name is Murali Krishna Popuri. I am a Full-Stack Developer with 2+ years of professional experience, writing to apply for the Full Stack Developer opening in Hyderabad as posted on LinkedIn.

I build scalable full-stack web applications with React.js, Node.js, RESTful microservices, and relational databases.

Key highlights:
- Frontend: Hands-on experience developing modular, user-friendly UI with React.js, JavaScript, HTML5, and CSS3.
- Backend & Microservices: Designing and consuming RESTful APIs, handling data validation, and microservices logic.
- Databases: Experience structuring and optimizing relational queries in PostgreSQL, MySQL, and SQLite.
- Development Practices: Clean Git version control, Agile ceremonies, and Postman API testing.
- Location & Availability: Based in Hyderabad and available to join immediately (0 days notice).

My resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) is attached for your review.

Professional Links:
- Portfolio: https://murali-portfolio-website.vercel.app
- GitHub: https://github.com/Muralikrishnapopuri
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- Live Project (Zestchat): https://zestchat.vercel.app

Thank you for your time.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Oviya,</p>
        <p>My name is <strong>Murali Krishna Popuri</strong>. I am a Full-Stack Developer with 2+ years of professional experience, writing to apply for the <strong>Full Stack Developer</strong> opening in Hyderabad as posted on LinkedIn.</p>
        
        <p>I build scalable full-stack web applications with <strong>React.js, Node.js, RESTful microservices, and relational databases</strong>.</p>

        <p><strong>Key highlights:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Frontend:</strong> Hands-on experience developing modular, user-friendly UI with React.js, JavaScript, HTML5, and CSS3.</li>
          <li><strong>Backend &amp; Microservices:</strong> Designing and consuming RESTful APIs, handling data validation, and microservices logic.</li>
          <li><strong>Databases:</strong> Experience structuring and optimizing relational queries in PostgreSQL, MySQL, and SQLite.</li>
          <li><strong>Development Practices:</strong> Clean Git version control, Agile ceremonies, and Postman API testing.</li>
          <li><strong>Location &amp; Availability:</strong> Based in Hyderabad and available to join immediately (0 days notice).</li>
        </ul>

        <p>My resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) is attached for your review.</p>

        <p style="margin-top: 18px;">
          <strong>Professional Links:</strong><br/>
          &bull; <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          &bull; <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a><br/>
          &bull; <strong>Live Project (Zestchat):</strong> <a href="https://zestchat.vercel.app" style="color: #0284c7;">zestchat.vercel.app</a>
        </p>

        <p style="margin-top: 18px;">Thank you for your time.</p>

        <p style="margin-top: 18px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "LTIMindtree Engagement",
    recruiter: "Vishnu P.",
    to: "vishnupriyajp0505@gmail.com",
    role: "Full Stack Developer (Kafka / PostgreSQL / REST APIs)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    body: `Hi Vishnu,

My name is Murali Krishna Popuri. I am a Full-Stack Developer with 2+ years of professional experience, writing to share my application for the Full Stack Developer position in Hyderabad.

I specialize in building scalable web and distributed backend applications with Kafka event streaming, REST APIs, and relational databases. In my work at YoungMinds Technology Solutions, I integrated Kafka for real-time synchronization across distributed client terminals and built relational data workflows in PostgreSQL and MySQL.

Summary of qualifications:
- Event Streaming: Hands-on production experience with Kafka for real-time event streaming and synchronization.
- Databases: Structuring, querying, and optimizing PostgreSQL and MongoDB databases.
- REST APIs & Services: Building and maintaining robust RESTful APIs and backend services.
- Location & Availability: Based in Hyderabad, serving notice period, and ready to join immediately (0 days notice).

My resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) is attached for your evaluation.

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
        <p>Hi Vishnu,</p>
        <p>My name is <strong>Murali Krishna Popuri</strong>. I am a Full-Stack Developer with 2+ years of professional experience, writing to share my application for the <strong>Full Stack Developer</strong> position in Hyderabad.</p>
        
        <p>I specialize in building scalable web and distributed backend applications with <strong>Kafka event streaming, REST APIs, and relational databases</strong>. In my work at YoungMinds Technology Solutions, I integrated Kafka for real-time synchronization across distributed client terminals and built relational data workflows in PostgreSQL and MySQL.</p>

        <p><strong>Summary of qualifications:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Event Streaming:</strong> Hands-on production experience with Kafka for real-time event streaming and synchronization.</li>
          <li><strong>Databases:</strong> Structuring, querying, and optimizing PostgreSQL and MongoDB databases.</li>
          <li><strong>REST APIs &amp; Services:</strong> Building and maintaining robust RESTful APIs and backend services.</li>
          <li><strong>Location &amp; Availability:</strong> Based in Hyderabad, serving notice period, and ready to join immediately (0 days notice).</li>
        </ul>

        <p>My resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) is attached for your evaluation.</p>

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
  },
];

async function main() {
  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP connection verified.\n");

  for (let i = 0; i < targetApplications.length; i++) {
    const app = targetApplications[i];
    console.log(`[${i + 1}/${targetApplications.length}] Sending to ${app.company} (${app.to})...`);

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: app.to,
      subject: app.subject,
      text: app.body,
      html: app.html,
      attachments: [
        {
          filename: "Murali_Krishna_Popuri_FullStack_Developer.pdf",
          path: RESUME_PATH,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`   -> SUCCESS! Message ID: ${info.messageId}`);

    if (i < targetApplications.length - 1) {
      await delay(3000);
    }
  }

  console.log("\nAll 4 new applications successfully dispatched!");
}

main().catch((err) => {
  console.error("Failed to send email:", err);
  process.exit(1);
});
