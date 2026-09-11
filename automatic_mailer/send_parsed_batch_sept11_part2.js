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

const resumePath = path.join(__dirname, "Murali_Krishna_Popuri_Full_Stack_Dev.pdf");

if (!fs.existsSync(resumePath)) {
  console.error("FATAL ERROR: Resume PDF file not found at:", resumePath);
  process.exit(1);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Direct Target HR Applications (Curated & Tailored for 2+ Years Exp) ─────
const targetApplications = [
  {
    company: "Ascend Talent Consultants",
    targetEmail: "mahek@ascendtalentconsultants.com",
    role: "Full Stack Developer (React & Node.js, 2-3 Years Exp)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Mahek,

I am writing to apply for the Full Stack Developer role in JP Nagar, Bengaluru (2-3 Years Experience).

I am a Full-Stack Developer with 2+ years of hands-on experience building end-to-end web applications with React.js, Node.js, Express, JavaScript (ES6+), REST APIs, and database management (PostgreSQL, MySQL, MongoDB). At YoungMinds Technology Solutions, I built real-time platforms, cloud synchronization engines, and background event-driven services.

I am an immediate joiner, currently serving my notice period, and open to Bengaluru (on-site / hybrid).

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Mahek,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer</strong> role in JP Nagar, Bengaluru (2-3 Years Experience).</p>
        <p>I am a Full-Stack Developer with 2+ years of hands-on experience building end-to-end web applications with <strong>React.js, Node.js, Express, JavaScript (ES6+), REST APIs, and databases (PostgreSQL, MySQL, MongoDB)</strong>. At YoungMinds Technology Solutions, I built real-time platforms, cloud synchronization engines, and background event-driven services.</p>
        <p>I am an immediate joiner, currently serving my notice period, and open to Bengaluru (on-site / hybrid).</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    `,
  },
  {
    company: "Ionic Wealth",
    targetEmail: "mayank@ionic.in",
    role: "Backend Engineer (Node.js, JavaScript, REST APIs, PostgreSQL, Redis, Kafka)",
    subject: "Application for Backend Engineer - Murali Krishna Popuri",
    body: `Hi Mayank,

I am writing to apply for the Backend Engineer position at Ionic Wealth in Bengaluru.

I am a software engineer with 2+ years of professional backend and full-stack development experience using Node.js, Express, JavaScript/TypeScript, and relational databases. At YoungMinds Technology Solutions, I designed relational PostgreSQL/SQLite schemas, integrated Apache Kafka for event synchronization across distributed terminals, and built microservices handling real-time data flows. I also regularly use Claude Code and AI tooling to accelerate delivery.

I am serving my notice period, available to join immediately, and based in/open to working in Bengaluru.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your consideration.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Mayank,</p>
        <p>I am writing to apply for the <strong>Backend Engineer</strong> position at Ionic Wealth in Bengaluru.</p>
        <p>I am a software engineer with 2+ years of professional backend and full-stack development experience using <strong>Node.js, Express, JavaScript/TypeScript, and relational databases</strong>. At YoungMinds Technology Solutions, I designed relational PostgreSQL/SQLite schemas, integrated Apache Kafka for event synchronization across distributed terminals, and built microservices handling real-time data flows. I also regularly use Claude Code and AI tooling to accelerate delivery.</p>
        <p>I am serving my notice period, available to join immediately, and based in/open to working in Bengaluru.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your consideration.</p>
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
    `,
  },
  {
    company: "Implere Technologies",
    targetEmail: "siri.p@impleretech.com",
    role: "JavaScript AI Developer / Full-Stack AI Engineer",
    subject: "JavaScript AI Developer – Hyderabad – Murali Krishna Popuri",
    body: `Hi Siri,

I am writing to apply for the JavaScript AI Developer / Full-Stack AI Engineer role in Hyderabad.

Applicant Summary:
• Total Experience: 2+ Years
• Relevant React/Node.js Experience: 2+ Years
• GenAI / LLM Experience: Hands-on implementation of Agentic AI, RAG, and Claude/OpenAI APIs in production and personal projects (Zestchat)
• Current Location: Hyderabad
• Notice Period: Serving Notice Period (Immediate Joiner)

I specialize in JavaScript/TypeScript, React.js, Node.js, Express, and REST APIs, paired with modern AI API orchestration and vector/relational data storage.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Siri,</p>
        <p>I am writing to apply for the <strong>JavaScript AI Developer / Full-Stack AI Engineer</strong> role in Hyderabad.</p>
        <p style="background-color: #f8fafc; padding: 12px; border-left: 3px solid #0284c7; margin: 12px 0;">
          <strong>Applicant Profile:</strong><br/>
          • Total Experience: 2+ Years<br/>
          • Relevant React/Node.js Experience: 2+ Years<br/>
          • GenAI / LLM Experience: Hands-on with Agentic AI, RAG, and Claude/OpenAI APIs (Zestchat)<br/>
          • Current Location: Hyderabad<br/>
          • Notice Period: Serving Notice Period (Immediate Joiner)
        </p>
        <p>I specialize in <strong>JavaScript/TypeScript, React.js, Node.js, Express, and REST APIs</strong>, paired with modern AI API orchestration and vector/relational data storage.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    `,
  },
  {
    company: "Computronics",
    targetEmail: "kanha@computronics.in",
    role: "Software Engineer (MEAN/MERN & AI)",
    subject: "Application for Software Engineer (MERN & AI) - Murali Krishna Popuri",
    body: `Hi Kanha,

I am writing to apply for the Software Engineer (MERN & AI) position in Hyderabad / Bangalore.

I am a Full-Stack Developer with 2+ years of professional software engineering experience with JavaScript/TypeScript, React.js, Node.js, Express.js, and MongoDB/SQL. Additionally, I have practical experience building AI-backed applications integrating RAG, prompt engineering, and Agentic AI workflows using LLM APIs.

I am located in Hyderabad, currently serving my notice period, and available as an immediate joiner.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your consideration.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Kanha,</p>
        <p>I am writing to apply for the <strong>Software Engineer (MERN & AI)</strong> position in Hyderabad / Bangalore.</p>
        <p>I am a Full-Stack Developer with 2+ years of professional software engineering experience with <strong>JavaScript/TypeScript, React.js, Node.js, Express.js, and MongoDB/SQL</strong>. Additionally, I have practical experience building AI-backed applications integrating RAG, prompt engineering, and Agentic AI workflows using LLM APIs.</p>
        <p>I am located in Hyderabad, currently serving my notice period, and available as an immediate joiner.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your consideration.</p>
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
    `,
  },
  {
    company: "Codemonk",
    targetEmail: "RaviTeja.Rayadurgam@codemonk.io",
    role: "Full Stack Engineer (React.js, TypeScript, Node.js)",
    subject: "Application for Full Stack Engineer - Murali Krishna Popuri",
    body: `Hi Ravi Teja,

I am writing to apply for the Full Stack Engineer role at Codemonk in Bengaluru.

I am a Full-Stack Developer with 2+ years of professional experience with React.js, TypeScript, Node.js, RESTful APIs, and relational databases (PostgreSQL/MySQL). At YoungMinds Technology Solutions, I owned frontend and backend features end-to-end, optimized database queries, and implemented real-time sync systems using Kafka and Express.

I am open to Bengaluru on-site, serving my notice period, and available to join immediately.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Ravi Teja,</p>
        <p>I am writing to apply for the <strong>Full Stack Engineer</strong> role at Codemonk in Bengaluru.</p>
        <p>I am a Full-Stack Developer with 2+ years of professional experience with <strong>React.js, TypeScript, Node.js, RESTful APIs, and relational databases (PostgreSQL/MySQL)</strong>. At YoungMinds Technology Solutions, I owned frontend and backend features end-to-end, optimized database queries, and implemented real-time sync systems using Kafka and Express.</p>
        <p>I am open to Bengaluru on-site, serving my notice period, and available to join immediately.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    `,
  },
  {
    company: "Vitim Cloud Technologies",
    targetEmail: "hasini.rageesh@vitimcloud.com",
    role: "Full Stack Developer (React.js, Next.js, Node.js, MongoDB, GenAI)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Hasini,

I am writing to express my interest in the Full Stack Developer position at Vitim Cloud Technologies.

I am a Full-Stack Developer with 2+ years of professional experience building web platforms using React.js, Next.js, JavaScript, TypeScript, Node.js, Express, and MongoDB/SQL databases. Additionally, I have hands-on experience integrating GenAI and LLM APIs for automated workflows and real-time messaging.

I am based in Hyderabad, currently serving my notice period, and available as an immediate joiner.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Hasini,</p>
        <p>I am writing to express my interest in the <strong>Full Stack Developer</strong> position at Vitim Cloud Technologies.</p>
        <p>I am a Full-Stack Developer with 2+ years of professional experience building web platforms using <strong>React.js, Next.js, JavaScript, TypeScript, Node.js, Express, and MongoDB/SQL databases</strong>. Additionally, I have hands-on experience integrating GenAI and LLM APIs for automated workflows and real-time messaging.</p>
        <p>I am based in Hyderabad, currently serving my notice period, and available as an immediate joiner.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    `,
  },
  {
    company: "Thinqor Solutions",
    targetEmail: "ashwinin@thinqorsolutions.com",
    role: "Full Stack React JS Developer",
    subject: "Application for Full Stack React JS Developer - Murali Krishna Popuri",
    body: `Hi Ashwini,

I am writing to apply for the Full Stack React JS Developer opening in Hyderabad.

I am a Full-Stack Developer with 2+ years of professional experience with React JS, JavaScript (ES6+), TypeScript, HTML5, CSS3, REST APIs, and relational databases (PostgreSQL/MySQL). At YoungMinds Technology Solutions, I engineered responsive client applications and integrated them with backend APIs and microservices.

I am based in Hyderabad, currently serving my notice period, and available to join immediately.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Ashwini,</p>
        <p>I am writing to apply for the <strong>Full Stack React JS Developer</strong> opening in Hyderabad.</p>
        <p>I am a Full-Stack Developer with 2+ years of professional experience with <strong>React JS, JavaScript (ES6+), TypeScript, HTML5, CSS3, REST APIs, and relational databases (PostgreSQL/MySQL)</strong>. At YoungMinds Technology Solutions, I engineered responsive client applications and integrated them with backend APIs and microservices.</p>
        <p>I am based in Hyderabad, currently serving my notice period, and available to join immediately.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    `,
  },
  {
    company: "Kodelize",
    targetEmail: "recruiting@kodelize.com",
    role: "Backend & AI Developer (RAG, LLMs, APIs, Microservices)",
    subject: "Application for Backend & AI Developer - Murali Krishna Popuri",
    body: `Hi Hiring Team,

I am writing to express my interest in the Backend & AI Developer position in Hyderabad.

I am a software developer with 2+ years of professional experience specializing in Node.js, Express, REST APIs, and database engineering. In my project Zestchat, I built an AI chatbot assistant implementing Agentic AI patterns, RAG, and LLM APIs (Claude AI API) with PostgreSQL schema design. In my production role at YoungMinds Technology Solutions, I engineered real-time microservices and event pipelines using Kafka.

I am based in Hyderabad, serving my notice period, and available as an immediate joiner.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Hiring Team,</p>
        <p>I am writing to express my interest in the <strong>Backend & AI Developer</strong> position in Hyderabad.</p>
        <p>I am a software developer with 2+ years of professional experience specializing in <strong>Node.js, Express, REST APIs, and database engineering</strong>. In my project Zestchat, I built an AI assistant implementing Agentic AI patterns, RAG, and LLM APIs (Claude AI API) with PostgreSQL schema design. In my production role at YoungMinds Technology Solutions, I engineered real-time microservices and event pipelines using Kafka.</p>
        <p>I am based in Hyderabad, serving my notice period, and available as an immediate joiner.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    `,
  },
  {
    company: "PRIMUS Global Technologies",
    targetEmail: "rkondamudi@primusglobal.com",
    role: "Full-Stack / Backend Developer (REST APIs, React, Microservices)",
    subject: "Application for Java Developer_C2H_150462_4",
    body: `Hi Rajesh,

I am writing to apply for the Backend / Full-Stack Developer opening in Bangalore / Hyderabad (as per mandatory subject line Application for Java Developer_C2H_150462_4).

I have 2+ years of software engineering experience building microservices, REST APIs, and responsive frontend components using React.js, Node.js, Express, and relational databases. I also have strong experience using AI developer assistants (Claude, Copilot) to accelerate delivery.

I am an immediate joiner currently serving my notice period.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your evaluation.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Rajesh,</p>
        <p>I am writing to apply for the <strong>Backend / Full-Stack Developer</strong> opening in Bangalore / Hyderabad.</p>
        <p>I have 2+ years of software engineering experience building microservices, REST APIs, and responsive frontend components using <strong>React.js, Node.js, Express, and relational databases</strong>. I also have strong experience using AI developer assistants (Claude, Copilot) to accelerate delivery.</p>
        <p>I am an immediate joiner currently serving my notice period.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your evaluation.</p>
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
    `,
  },
  {
    company: "ProvenTech Consulting",
    targetEmail: "prakashreddy.g@proventech.in",
    role: "Database / Backend Developer (SQL Server, PostgreSQL, Query Optimization)",
    subject: "Application for Database / Backend Developer - Murali Krishna Popuri",
    body: `Hi Prakash,

I am applying for the Database / Backend Developer role at ProvenTech in Hyderabad.

Applicant Details:
• Total Experience: 2+ Years Professional Experience
• Relevant Database Experience: 2+ Years with PostgreSQL, MySQL, SQLite & schema design
• Notice Period: Immediate Joiner (Serving Notice Period)
• Location: Hyderabad

At YoungMinds Technology Solutions, I designed relational database schemas, optimized SQL query plans, and built real-time local network sync engines.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Prakash,</p>
        <p>I am applying for the <strong>Database / Backend Developer</strong> role at ProvenTech in Hyderabad.</p>
        <p style="background-color: #f8fafc; padding: 12px; border-left: 3px solid #0284c7; margin: 12px 0;">
          <strong>Applicant Details:</strong><br/>
          • Total Experience: 2+ Years Professional Experience<br/>
          • Relevant Database Experience: 2+ Years with PostgreSQL, MySQL, SQLite &amp; schema design<br/>
          • Notice Period: Immediate Joiner (Serving Notice Period)<br/>
          • Location: Hyderabad
        </p>
        <p>At YoungMinds Technology Solutions, I designed relational database schemas, optimized SQL query plans, and built real-time local network sync engines.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    `,
  },
  {
    company: "Dignity Aspire",
    targetEmail: "Payal.jain@DignityAspire.com",
    role: "PHP Backend Developer (PHP, REST APIs, MySQL/PostgreSQL, JavaScript)",
    subject: "Application for PHP Backend Developer - Murali Krishna Popuri",
    body: `Hi Payal,

I am writing to apply for the PHP Backend Developer opening in Bengaluru.

I am a backend-focused developer with 2+ years of professional experience building web platforms and RESTful APIs with PHP, Node.js, JavaScript, and relational databases (MySQL, PostgreSQL). At YoungMinds Technology Solutions, I developed backend services, handled third-party integrations, and implemented database optimization.

I am open to Bengaluru, currently serving my notice period, and available to join immediately.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your evaluation.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Payal,</p>
        <p>I am writing to apply for the <strong>PHP Backend Developer</strong> opening in Bengaluru.</p>
        <p>I am a backend-focused developer with 2+ years of professional experience building web platforms and RESTful APIs with <strong>PHP, Node.js, JavaScript, and relational databases (MySQL, PostgreSQL)</strong>. At YoungMinds Technology Solutions, I developed backend services, handled third-party integrations, and implemented database optimization.</p>
        <p>I am open to Bengaluru, currently serving my notice period, and available to join immediately.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your evaluation.</p>
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
    `,
  },
  {
    company: "CloudTern Solutions",
    targetEmail: "hr@cloudtern.com",
    role: "Backend & Distributed Systems Developer (Node.js, PostgreSQL/MariaDB, Microservices)",
    subject: "Application for Backend Developer - Murali Krishna Popuri",
    body: `Hi Hiring Team,

I am writing to express my interest in the backend development opportunities at CloudTern Solutions in Hyderabad.

I am a software engineer with 2+ years of professional experience building microservices, REST APIs, and event-driven architectures with Node.js, Express, Kafka, and PostgreSQL. At YoungMinds Technology Solutions, I architected offline-first POS systems, local network synchronization, and multi-tenant persistence.

I am based in Hyderabad, currently serving my notice period, and available as an immediate joiner.

My PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Hiring Team,</p>
        <p>I am writing to express my interest in the <strong>backend development</strong> opportunities at CloudTern Solutions in Hyderabad.</p>
        <p>I am a software engineer with 2+ years of professional experience building microservices, REST APIs, and event-driven architectures with <strong>Node.js, Express, Kafka, and PostgreSQL</strong>. At YoungMinds Technology Solutions, I architected offline-first POS systems, local network synchronization, and multi-tenant persistence.</p>
        <p>I am based in Hyderabad, currently serving my notice period, and available as an immediate joiner.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    `,
  },
];

// ─── Step 2: Extracted WhatsApp Numbers & Ready-to-Copy Messages ─────────────
const whatsappSummaryText = `RECRUITER WHATSAPP CONTACTS, PHONE NUMBERS & READY-TO-COPY MESSAGES
Extracted from LinkedIn Recruiter Feed (September 11, 2026 - Batch 2)

1. Hasini Rageesh (Vitim Cloud Technologies)
Phone / WhatsApp: +91 9840705512
Email: hasini.rageesh@vitimcloud.com
Role: Full Stack Developer (React, Next.js, Node.js, MongoDB, GenAI)
Copy-Paste WhatsApp Message:
Hi Hasini, I am Murali Krishna Popuri, applying for the Full Stack Developer position. I have 2+ years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express, and MongoDB. Current location: Hyderabad, Notice Period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have sent my detailed resume to hasini.rageesh@vitimcloud.com and can share it directly here as well. Thank you.

----------------------------------------------------------------------
2. Kodelize / Thinqor Recruitment Desk
Phone / WhatsApp: +91 8125353006
Email: recruiting@kodelize.com
Role: Backend & AI Developer (RAG, LLMs, APIs, Microservices)
Copy-Paste WhatsApp Message:
Hi, I am Murali Krishna Popuri, applying for the Backend & AI Developer position in Hyderabad. I have 2+ years of professional experience in Node.js, Express, REST APIs, and hands-on implementation of RAG and Agentic AI workflows with LLM APIs. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have sent my resume to recruiting@kodelize.com and look forward to connecting. Thank you.

----------------------------------------------------------------------
3. Prakash Reddy (ProvenTech Consulting / NTT Data Company)
Phone / WhatsApp: +91 8978325652
Email: prakashreddy.g@proventech.in
Role: Database / Backend Developer (Hyderabad)
Copy-Paste WhatsApp Message:
Hi Prakash, I am Murali Krishna Popuri, applying for the Database / Backend Developer role at ProvenTech in Hyderabad. I have 2+ years of software development experience working extensively with PostgreSQL, MySQL, SQLite, and schema design. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have emailed my updated resume to prakashreddy.g@proventech.in. Thank you.

----------------------------------------------------------------------
4. Rajesh Kondamudi (PRIMUS Global Technologies)
Phone / WhatsApp: +91 9701005708
Email: rkondamudi@primusglobal.com
Role: Backend / Full-Stack Developer (Ref: Application for Java Developer_C2H_150462_4)
Copy-Paste WhatsApp Message:
Hi Rajesh, I am Murali Krishna Popuri, applying for the Backend / Full-Stack Developer opening in Bangalore / Hyderabad. I have 2+ years of professional experience in REST APIs, microservices, React.js, Node.js, and SQL databases. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have sent my application and resume to rkondamudi@primusglobal.com. Thank you.

----------------------------------------------------------------------
5. Vinay Kumar (Raad7)
Phone / WhatsApp: +91 9247979281
Email: vinaykumar@raad7.com
Role: Cloud & Backend / Node.js & AI Solutions
Copy-Paste WhatsApp Message:
Hi Vinay, I am Murali Krishna Popuri, applying for the Backend / Cloud & AI opportunities in Hyderabad / Bangalore. I have 2+ years of professional engineering experience with Node.js, REST APIs, microservices, and AI tool integrations. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have shared my updated resume with your team and look forward to discussing the role. Thank you.

----------------------------------------------------------------------
6. Sai Chandu (Raad7)
Phone / WhatsApp: +91 7730983958
Email: saichandu@raad7.com
Role: AWS Cloud & Node.js Developer
Copy-Paste WhatsApp Message:
Hi Sai Chandu, I am Murali Krishna Popuri, applying for the Software Engineering and Cloud positions in Hyderabad / Bangalore. I bring 2+ years of experience with Node.js, microservices, REST APIs, and containerized workflows. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have forwarded my resume and would appreciate the opportunity to connect. Thank you.

----------------------------------------------------------------------
7. Nirosha Kabildev
Phone / WhatsApp: +91 9092366444
Email: niroshcse@gmail.com
Role: Full Stack Developer
Copy-Paste WhatsApp Message:
Hi Nirosha, I am Murali Krishna Popuri, a Full-Stack Developer with 2+ years of experience in React.js, TypeScript, Node.js, Express, and SQL/NoSQL databases. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have emailed my resume to niroshcse@gmail.com and look forward to hearing from you. Thank you.

----------------------------------------------------------------------
Direct Application Forms & Portals Extracted from this Batch:
- Invictus Performance Lab (Full Stack Developer - React/Node/PostgreSQL, Bengaluru): https://tally.so/r/LZL8D1
- Newton School (SDE I - Bengaluru, 0-2 Years): https://lnkd.in/gafcWwqh
- Technology Company via Sneha Sony (React/Node/AWS/Claude, Hyderabad): https://lnkd.in/gHzfuSYk
- Groupsoft US Inc (SAP BTP / GenAI / Node.js, Hyderabad): https://lnkd.in/da4juyaZ
- UST Global Referral Link: https://lnkd.in/ggHvaPD5
- DataArt India Full Stack with React & C#: https://lnkd.in/e2nJjSee
`;

function buildHtmlSummary() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Recruiter WhatsApp Contacts &amp; Portal Links</title>
  </head>
  <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a;">
    <div style="max-width: 740px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
      
      <div style="border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="margin: 0; font-size: 18px; color: #1e293b;">
          Recruiter Phone Numbers &amp; Ready-to-Copy WhatsApp Messages
        </h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
          Extracted from LinkedIn Feed (Batch 2) | Tailored for Murali Krishna Popuri (2+ Years Exp)
        </p>
      </div>

      <!-- Item 1 -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 16px;">
        <h3 style="margin: 0 0 6px 0; font-size: 14px; color: #0369a1;">1. Hasini Rageesh (Vitim Cloud Technologies)</h3>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Phone / WhatsApp:</strong> +91 9840705512 | <strong>Email Sent:</strong> hasini.rageesh@vitimcloud.com</p>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Role:</strong> Full Stack Developer (React, Next.js, Node.js, MongoDB, GenAI)</p>
        <p style="margin: 8px 0 4px 0; font-size: 12px; font-weight: 600; color: #475569;">Ready-to-Copy WhatsApp Message:</p>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px; font-family: monospace; font-size: 12px; line-height: 1.5; color: #1e293b; user-select: all;">
Hi Hasini, I am Murali Krishna Popuri, applying for the Full Stack Developer position. I have 2+ years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express, and MongoDB. Current location: Hyderabad, Notice Period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have sent my detailed resume to hasini.rageesh@vitimcloud.com and can share it directly here as well. Thank you.
        </div>
      </div>

      <!-- Item 2 -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 16px;">
        <h3 style="margin: 0 0 6px 0; font-size: 14px; color: #0369a1;">2. Kodelize / Thinqor Recruitment Desk</h3>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Phone / WhatsApp:</strong> +91 8125353006 | <strong>Email Sent:</strong> recruiting@kodelize.com</p>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Role:</strong> Backend &amp; AI Developer (RAG, LLMs, APIs, Microservices)</p>
        <p style="margin: 8px 0 4px 0; font-size: 12px; font-weight: 600; color: #475569;">Ready-to-Copy WhatsApp Message:</p>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px; font-family: monospace; font-size: 12px; line-height: 1.5; color: #1e293b; user-select: all;">
Hi, I am Murali Krishna Popuri, applying for the Backend &amp; AI Developer position in Hyderabad. I have 2+ years of professional experience in Node.js, Express, REST APIs, and hands-on implementation of RAG and Agentic AI workflows with LLM APIs. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have sent my resume to recruiting@kodelize.com and look forward to connecting. Thank you.
        </div>
      </div>

      <!-- Item 3 -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 16px;">
        <h3 style="margin: 0 0 6px 0; font-size: 14px; color: #0369a1;">3. Prakash Reddy (ProvenTech Consulting / NTT Data Company)</h3>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Phone / WhatsApp:</strong> +91 8978325652 | <strong>Email Sent:</strong> prakashreddy.g@proventech.in</p>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Role:</strong> Database / Backend Developer (Hyderabad)</p>
        <p style="margin: 8px 0 4px 0; font-size: 12px; font-weight: 600; color: #475569;">Ready-to-Copy WhatsApp Message:</p>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px; font-family: monospace; font-size: 12px; line-height: 1.5; color: #1e293b; user-select: all;">
Hi Prakash, I am Murali Krishna Popuri, applying for the Database / Backend Developer role at ProvenTech in Hyderabad. I have 2+ years of software development experience working extensively with PostgreSQL, MySQL, SQLite, and schema design. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have emailed my updated resume to prakashreddy.g@proventech.in. Thank you.
        </div>
      </div>

      <!-- Item 4 -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 16px;">
        <h3 style="margin: 0 0 6px 0; font-size: 14px; color: #0369a1;">4. Rajesh Kondamudi (PRIMUS Global Technologies)</h3>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Phone / WhatsApp:</strong> +91 9701005708 | <strong>Email Sent:</strong> rkondamudi@primusglobal.com</p>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Role:</strong> Backend / Full-Stack Developer (Bangalore / Hyderabad)</p>
        <p style="margin: 8px 0 4px 0; font-size: 12px; font-weight: 600; color: #475569;">Ready-to-Copy WhatsApp Message:</p>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px; font-family: monospace; font-size: 12px; line-height: 1.5; color: #1e293b; user-select: all;">
Hi Rajesh, I am Murali Krishna Popuri, applying for the Backend / Full-Stack Developer opening in Bangalore / Hyderabad. I have 2+ years of professional experience in REST APIs, microservices, React.js, Node.js, and SQL databases. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have sent my application and resume to rkondamudi@primusglobal.com. Thank you.
        </div>
      </div>

      <!-- Item 5 -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 16px;">
        <h3 style="margin: 0 0 6px 0; font-size: 14px; color: #0369a1;">5. Vinay Kumar (Raad7)</h3>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Phone / WhatsApp:</strong> +91 9247979281 | <strong>Email Sent:</strong> vinaykumar@raad7.com</p>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Role:</strong> Cloud &amp; Backend / Node.js &amp; AI Solutions</p>
        <p style="margin: 8px 0 4px 0; font-size: 12px; font-weight: 600; color: #475569;">Ready-to-Copy WhatsApp Message:</p>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px; font-family: monospace; font-size: 12px; line-height: 1.5; color: #1e293b; user-select: all;">
Hi Vinay, I am Murali Krishna Popuri, applying for the Backend / Cloud &amp; AI opportunities in Hyderabad / Bangalore. I have 2+ years of professional engineering experience with Node.js, REST APIs, microservices, and AI tool integrations. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have shared my updated resume with your team and look forward to discussing the role. Thank you.
        </div>
      </div>

      <!-- Item 6 -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 16px;">
        <h3 style="margin: 0 0 6px 0; font-size: 14px; color: #0369a1;">6. Sai Chandu (Raad7)</h3>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Phone / WhatsApp:</strong> +91 7730983958 | <strong>Email Sent:</strong> saichandu@raad7.com</p>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Role:</strong> AWS Cloud &amp; Node.js Developer</p>
        <p style="margin: 8px 0 4px 0; font-size: 12px; font-weight: 600; color: #475569;">Ready-to-Copy WhatsApp Message:</p>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px; font-family: monospace; font-size: 12px; line-height: 1.5; color: #1e293b; user-select: all;">
Hi Sai Chandu, I am Murali Krishna Popuri, applying for the Software Engineering and Cloud positions in Hyderabad / Bangalore. I bring 2+ years of experience with Node.js, microservices, REST APIs, and containerized workflows. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have forwarded my resume and would appreciate the opportunity to connect. Thank you.
        </div>
      </div>

      <!-- Item 7 -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 16px;">
        <h3 style="margin: 0 0 6px 0; font-size: 14px; color: #0369a1;">7. Nirosha Kabildev</h3>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Phone / WhatsApp:</strong> +91 9092366444 | <strong>Email Sent:</strong> niroshcse@gmail.com</p>
        <p style="margin: 2px 0; font-size: 13px;"><strong>Role:</strong> Full Stack Developer</p>
        <p style="margin: 8px 0 4px 0; font-size: 12px; font-weight: 600; color: #475569;">Ready-to-Copy WhatsApp Message:</p>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px; font-family: monospace; font-size: 12px; line-height: 1.5; color: #1e293b; user-select: all;">
Hi Nirosha, I am Murali Krishna Popuri, a Full-Stack Developer with 2+ years of experience in React.js, TypeScript, Node.js, Express, and SQL/NoSQL databases. Notice period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have emailed my resume to niroshcse@gmail.com and look forward to hearing from you. Thank you.
        </div>
      </div>

      <!-- Application Links -->
      <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px;">
        <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #1e293b;">
          Direct Application Forms &amp; Career Portals Extracted:
        </h3>
        <ul style="font-size: 13px; color: #334155; line-height: 1.8; padding-left: 20px;">
          <li>
            <strong>Invictus Performance Lab (Full Stack Developer - React/Node/PostgreSQL, Bengaluru):</strong><br/>
            <a href="https://tally.so/r/LZL8D1" target="_blank" style="color: #0284c7;">https://tally.so/r/LZL8D1</a>
          </li>
          <li>
            <strong>Newton School (SDE I - Bengaluru, 0-2 Years):</strong><br/>
            <a href="https://lnkd.in/gafcWwqh" target="_blank" style="color: #0284c7;">https://lnkd.in/gafcWwqh</a>
          </li>
          <li>
            <strong>Technology Company via Sneha Sony (React/Node/AWS/Claude, Hyderabad):</strong><br/>
            <a href="https://lnkd.in/gHzfuSYk" target="_blank" style="color: #0284c7;">https://lnkd.in/gHzfuSYk</a>
          </li>
          <li>
            <strong>Groupsoft US Inc (SAP BTP / GenAI / Node.js, Hyderabad):</strong><br/>
            <a href="https://lnkd.in/da4juyaZ" target="_blank" style="color: #0284c7;">https://lnkd.in/da4juyaZ</a>
          </li>
          <li>
            <strong>UST Global Java Backend Referral:</strong><br/>
            <a href="https://lnkd.in/ggHvaPD5" target="_blank" style="color: #0284c7;">https://lnkd.in/ggHvaPD5</a>
          </li>
          <li>
            <strong>DataArt India Full Stack Developer:</strong><br/>
            <a href="https://lnkd.in/e2nJjSee" target="_blank" style="color: #0284c7;">https://lnkd.in/e2nJjSee</a>
          </li>
        </ul>
      </div>

    </div>
  </body>
  </html>
  `;
}

async function runBatch() {
  console.log("================================================================================");
  console.log("STEP 1: DISPATCHING CURATED TARGET HR APPLICATIONS (BATCH 2)");
  console.log(`Total Curated Applications: ${targetApplications.length}`);
  console.log("================================================================================");

  // Guarantee Deduplication
  const seenEmails = new Set();
  const dedupedApps = [];
  for (const app of targetApplications) {
    const key = app.targetEmail.toLowerCase().trim();
    if (seenEmails.has(key)) {
      console.log(`Skipping duplicate email: ${app.targetEmail}`);
    } else {
      seenEmails.add(key);
      dedupedApps.push(app);
    }
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < dedupedApps.length; i++) {
    const app = dedupedApps[i];
    console.log(`\n[${i + 1}/${dedupedApps.length}] Sending to ${app.company} -> ${app.targetEmail}...`);

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: app.targetEmail,
      subject: app.subject,
      text: app.body,
      html: app.html,
      attachments: [
        {
          filename: "Murali_Krishna_Popuri_Full_Stack_Dev.pdf",
          path: resumePath,
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`SUCCESS: Sent to ${app.targetEmail} (Message ID: ${info.messageId})`);
      successCount++;
    } catch (err) {
      console.error(`FAILED to send to ${app.targetEmail}: ${err.message}`);
      failCount++;
    }

    // 3-second throttle between emails
    if (i < dedupedApps.length - 1) {
      console.log("Waiting 3s before next send...");
      await delay(3000);
    }
  }

  console.log("\n================================================================================");
  console.log(`OUTREACH SUMMARY: ${successCount} Sent Successfully, ${failCount} Failed.`);
  console.log("================================================================================");

  console.log("\n================================================================================");
  console.log(`STEP 2: SENDING WHATSAPP SUMMARY & PORTALS TO: ${USER_NOTIFICATION_EMAIL}`);
  console.log("================================================================================");

  const summaryMailOptions = {
    from: `"Murali Outreach System" <${SENDER_EMAIL}>`,
    to: USER_NOTIFICATION_EMAIL,
    subject: "Recruiter WhatsApp Contacts, Ready-to-Copy Messages & Application Portals (Batch 2)",
    text: whatsappSummaryText,
    html: buildHtmlSummary(),
  };

  try {
    const summaryInfo = await transporter.sendMail(summaryMailOptions);
    console.log(`SUCCESS: Summary email sent to ${USER_NOTIFICATION_EMAIL} (Message ID: ${summaryInfo.messageId})`);
  } catch (err) {
    console.error(`FAILED to send summary to ${USER_NOTIFICATION_EMAIL}: ${err.message}`);
  }

  console.log("\nAll batch 2 tasks completed successfully.");
}

runBatch().catch((err) => {
  console.error("Fatal error in batch execution:", err);
  process.exit(1);
});
