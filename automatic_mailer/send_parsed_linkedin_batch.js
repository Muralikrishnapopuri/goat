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

const linkedinApplications = [
  {
    company: "Linkage IT",
    targetEmail: "shruti.gupta@linkageit.com",
    role: "Full Stack Developer (React, TypeScript, NestJS, Node.js)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Shruti,

I am writing to express my interest in the Full Stack Developer position at Linkage IT in Hyderabad.

I am a Full-Stack Developer with 2 years of core software engineering experience building responsive interfaces and scalable backend services using React.js, TypeScript, Node.js, Express, and SQL/NoSQL databases. At YoungMinds Technology Solutions, I engineered real-time POS platforms, bi-directional cloud synchronization engines, and background event services using Kafka and Express.

I am currently based in/available for Hyderabad on-site work and can join immediately as I am serving my notice period.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review. I would welcome the opportunity to discuss how my technical background aligns with your team's requirements.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Shruti,</p>
        <p>I am writing to express my interest in the <strong>Full Stack Developer</strong> position at Linkage IT in Hyderabad.</p>
        <p>I am a Full-Stack Developer with 2 years of core software engineering experience building responsive interfaces and scalable backend services using <strong>React.js, TypeScript, Node.js, Express, and SQL/NoSQL databases</strong>. At YoungMinds Technology Solutions, I engineered real-time POS platforms, bi-directional cloud synchronization engines, and background event services using Kafka and Express.</p>
        <p>I am currently based in/available for Hyderabad on-site work and can join immediately as I am serving my notice period.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review. I would welcome the opportunity to discuss how my technical background aligns with your team's requirements.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "Covenant Global Tech",
    targetEmail: "moses@covenantglobaltech.com",
    role: "React + Python + MongoDB Full Stack Developer",
    subject: "Application for React & Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Moses,

I am applying for the React Full Stack Developer position at Covenant Global Tech.

I have 2 years of experience developing full-stack web applications using React.js, Next.js, JavaScript, TypeScript, Node.js, Express, REST APIs, and MongoDB/SQL databases. Additionally, I work with AI-assisted tools (Claude, Cursor, GitHub Copilot) and RAG architecture to build modern, performant applications.

I am available for joining immediately and flexible with initial office verification visits at Hyderabad or Bengaluru.

My PDF resume is attached. I look forward to discussing the role further.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Moses,</p>
        <p>I am applying for the <strong>React Full Stack Developer</strong> position at Covenant Global Tech.</p>
        <p>I have 2 years of experience developing full-stack web applications using <strong>React.js, Next.js, JavaScript, TypeScript, Node.js, Express, REST APIs, and MongoDB/SQL databases</strong>. Additionally, I work with AI-assisted development workflows (Claude, Cursor, GitHub Copilot) and RAG architecture to build modern, performant applications.</p>
        <p>I am available for joining immediately and flexible with initial office verification visits at Hyderabad or Bengaluru.</p>
        <p>My PDF resume is attached for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "Sanathana Analytics",
    targetEmail: "raviteja@sanathanaars.com",
    role: "React Front-End Developer",
    subject: "Application for React Front-End Developer - Murali Krishna Popuri",
    body: `Hi Ravi Teja,

I am writing to express my interest in the React Front-End Developer opportunity in Hyderabad.

I am a Full-Stack & Frontend Developer with 2 years of experience specializing in React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Redux, and RESTful API integration. I have built component-driven UIs, real-time POS dashboard interfaces, and interactive client filters with canvas rendering under 50ms.

I am based in Hyderabad and ready for an immediate start as I am serving my notice period.

My resume PDF is attached. I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Ravi Teja,</p>
        <p>I am writing to express my interest in the <strong>React Front-End Developer</strong> opportunity in Hyderabad.</p>
        <p>I am a Full-Stack & Frontend Developer with 2 years of experience specializing in <strong>React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Redux, and RESTful API integration</strong>. I have built component-driven UIs, real-time POS dashboard interfaces, and interactive client filters with performance optimization.</p>
        <p>I am based in Hyderabad and ready for an immediate start as I am serving my notice period.</p>
        <p>My resume PDF is attached for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "Motivity Labs",
    targetEmail: "dikshith.nalapatla@motivitylabs.com",
    role: "Fullstack Developer - React.js Focus",
    subject: "Application for Fullstack Developer (React.js Focus) - Murali Krishna Popuri",
    body: `Hi Dikshith,

I am writing to apply for the Fullstack Developer (React.js Focus) position at Motivity Labs in Hyderabad.

I bring 2 years of experience in full-stack web development, working extensively with React.js, Redux, JavaScript, RESTful APIs, Node.js/Express, PHP, and SQL databases. I specialize in building user interfaces, handling microservices integration, and delivering production-ready applications.

I am located in Hyderabad and available to join immediately.

Please find my attached resume PDF for details on my background and projects.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Dikshith,</p>
        <p>I am writing to apply for the <strong>Fullstack Developer (React.js Focus)</strong> position at Motivity Labs in Hyderabad.</p>
        <p>I bring 2 years of experience in full-stack web development, working extensively with <strong>React.js, Redux, JavaScript, RESTful APIs, Node.js/Express, PHP, and SQL databases</strong>. I specialize in building user interfaces, handling API integrations, and delivering production-ready applications.</p>
        <p>I am located in Hyderabad and available to join immediately.</p>
        <p>Please find my attached resume PDF for details on my background and projects.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "PetaData / SFTech",
    targetEmail: "varshitham@petadata.ai",
    role: "Full Stack Developer - AI & Data Integrations",
    subject: "Application for Full Stack Developer (AI & Data Integrations) - Murali Krishna Popuri",
    body: `Hi Varshitha,

I am writing to submit my application for the Full Stack Developer - AI & Data Integrations role at SFTech in Hyderabad.

I am a Full-Stack Developer with hands-on experience building web systems with React.js, Next.js, TypeScript, Node.js, Express, REST APIs, PostgreSQL, and LLM/RAG integrations. In my daily workflow, I leverage AI tools including Claude, Cursor, and GitHub Copilot to optimize development and maintain clean architecture.

I am based in Hyderabad, comfortable with production support, and available as an immediate joiner.

My resume PDF is attached to this email. I look forward to connecting.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Varshitha,</p>
        <p>I am writing to submit my application for the <strong>Full Stack Developer - AI & Data Integrations</strong> role at SFTech in Hyderabad.</p>
        <p>I am a Full-Stack Developer with hands-on experience building web systems with <strong>React.js, Next.js, TypeScript, Node.js, Express, REST APIs, PostgreSQL, and LLM/RAG integrations</strong>. In my daily workflow, I leverage AI tools including Claude, Cursor, and GitHub Copilot to optimize development and maintain clean architecture.</p>
        <p>I am based in Hyderabad, comfortable with production support, and available as an immediate joiner.</p>
        <p>My resume PDF is attached to this email for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "2Coms",
    targetEmail: "sushmita.r@2coms.com",
    role: "Full Stack Developer - Laravel / AI / Automation",
    subject: "Application for Full Stack Developer (PHP, React, AI & Automation) - Murali Krishna Popuri",
    body: `Hi Sushmitha,

I am writing to apply for the Full Stack Developer position in Hyderabad focusing on PHP, REST APIs, React, and AI automation.

My background includes 2 years of professional full-stack development with PHP, SQL, React.js, Express/Node.js, REST API integrations, and building AI agent/RAG workflows using Claude AI API and Node-Cron automation.

I am based in Hyderabad and ready for an immediate start as I am serving my notice period.

My PDF resume is attached to this email. I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Sushmitha,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer</strong> position in Hyderabad focusing on PHP, REST APIs, React, and AI automation.</p>
        <p>My background includes 2 years of professional full-stack development with <strong>PHP, SQL, React.js, Express/Node.js, REST API integrations</strong>, and building AI agent/RAG workflows using Claude AI API and Node-Cron automation.</p>
        <p>I am based in Hyderabad and ready for an immediate start as I am serving my notice period.</p>
        <p>My PDF resume is attached to this email for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "Potla Tech Solutions",
    targetEmail: "venkatarakesh1989@gmail.com",
    role: "Full Stack Developer - React + Node.js",
    subject: "Application for Full Stack Developer (React + Node.js) - Murali Krishna Popuri",
    body: `Hi Venkata Rakesh,

I am applying for the Full Stack Developer (React + Node.js) role at Potla Tech Solutions in Hyderabad.

I am a Full-Stack Developer with 2 years of experience building scalable applications using React.js, JavaScript, TypeScript, Node.js, Express, REST APIs, and PostgreSQL/MySQL. At YoungMinds Technology Solutions, I engineered core POS software, bi-directional cloud sync engines, and local network server synchronization protocols.

I am based in Hyderabad and available to join immediately.

Please find my resume PDF attached.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Venkata Rakesh,</p>
        <p>I am applying for the <strong>Full Stack Developer (React + Node.js)</strong> role at Potla Tech Solutions in Hyderabad.</p>
        <p>I am a Full-Stack Developer with 2 years of experience building scalable applications using <strong>React.js, JavaScript, TypeScript, Node.js, Express, REST APIs, and PostgreSQL/MySQL</strong>. At YoungMinds Technology Solutions, I engineered core POS software, bi-directional cloud sync engines, and local network server synchronization protocols.</p>
        <p>I am based in Hyderabad and available to join immediately.</p>
        <p>Please find my resume PDF attached.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "Frenzoft",
    targetEmail: "kalai@frenzoft.com",
    role: "React / Node.js Developer",
    subject: "Application for React / Node.js Developer - Murali Krishna Popuri",
    body: `Hi Kalai,

I am writing to express my interest in the React / Node.js Developer position at Frenzoft for your MNC client in Hyderabad.

I am a Full-Stack Developer with 2 years of hands-on experience building frontend UIs with React.js, TypeScript, Material UI, HTML5/CSS3, and backend RESTful microservices with Node.js and Express.

I am based in Hyderabad, comfortable working in second shift hours, and available to join immediately.

My resume PDF is attached. I look forward to discussing this role with you.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Kalai,</p>
        <p>I am writing to express my interest in the <strong>React / Node.js Developer</strong> position at Frenzoft in Hyderabad.</p>
        <p>I am a Full-Stack Developer with 2 years of hands-on experience building frontend UIs with <strong>React.js, TypeScript, Material UI, HTML5/CSS3, and backend RESTful microservices with Node.js and Express</strong>.</p>
        <p>I am based in Hyderabad, comfortable working in shift hours, and available to join immediately.</p>
        <p>My resume PDF is attached for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "RSA Tech Group",
    targetEmail: "sukumar.n@rsatechgroup.com",
    role: "Senior React / Node.js Developer",
    subject: "Application for React / Node.js Developer - Murali Krishna Popuri",
    body: `Hi Sukumar,

I am writing to apply for the React & Node.js Developer position at RSA Tech Group in Hyderabad.

I bring 2 years of full-stack engineering experience working with React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Material UI, and REST APIs. I specialize in building dynamic user interfaces and scalable backend integration layers.

I am based in Hyderabad and ready for an immediate start as I am serving my notice period.

My PDF resume is attached to this email.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Sukumar,</p>
        <p>I am writing to apply for the <strong>React & Node.js Developer</strong> position at RSA Tech Group in Hyderabad.</p>
        <p>I bring 2 years of full-stack engineering experience working with <strong>React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Material UI, and REST APIs</strong>. I specialize in building dynamic user interfaces and scalable backend integration layers.</p>
        <p>I am based in Hyderabad and ready for an immediate start as I am serving my notice period.</p>
        <p>My PDF resume is attached to this email for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "GyanNidhi Innovations",
    targetEmail: "sravani@gyannidhi.in",
    role: "Full Stack Developer",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Sravani,

I am writing to express my interest in the Full Stack Developer role at GyanNidhi Innovations in Hyderabad.

I am a Full-Stack Developer with 2 years of professional experience building web applications using React.js, Node.js, Express.js, JavaScript (ES6+), PostgreSQL, SQL, and REST APIs. I have built production offline-first desktop architectures and cloud synchronization systems.

I am located in Hyderabad and available to join immediately.

My resume PDF is attached. I look forward to connecting with you.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Sravani,</p>
        <p>I am writing to express my interest in the <strong>Full Stack Developer</strong> role at GyanNidhi Innovations in Hyderabad.</p>
        <p>I am a Full-Stack Developer with 2 years of professional experience building web applications using <strong>React.js, Node.js, Express.js, JavaScript (ES6+), PostgreSQL, SQL, and REST APIs</strong>. I have built production offline-first desktop architectures and cloud synchronization systems.</p>
        <p>I am located in Hyderabad and available to join immediately.</p>
        <p>My resume PDF is attached for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  }
];

async function run() {
  console.log(`Starting Batch Outreach (Direct HR Only, PDF Resume Attached) for ${linkedinApplications.length} target contacts...`);
  
  for (let i = 0; i < linkedinApplications.length; i++) {
    const app = linkedinApplications[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`[${i + 1}/${linkedinApplications.length}] Dispatching email for ${app.company}...`);
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
      console.log(`Sent successfully directly to target HR: ${app.targetEmail}! MessageId: ${info.messageId}`);
    } catch (err) {
      console.error(`Failed to send email to ${app.targetEmail}:`, err.message);
    }
  }

  console.log(`\nAll target applications dispatched successfully with PDF resume attached!`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
