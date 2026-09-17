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
  console.error("FATAL ERROR: Resume PDF file not found at:", RESUME_PATH);
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

const hrApplications = [
  {
    company: "Implere Technologies",
    recruiter: "Nikitha Gokaraju",
    to: "nikitha.g@impleretech.com",
    role: "JavaScript AI Developer / Full-Stack AI Engineer",
    subject: "JavaScript AI Developer – Hyderabad",
    body: `Hi Nikitha,

I am writing to apply for the JavaScript AI Developer / Full-Stack AI Engineer position in Hyderabad as posted on LinkedIn.

Here are the details you requested:
- Total Experience: 2+ Years
- Relevant React / Node.js Experience: 2+ Years
- GenAI / LLM Experience: 8+ Months (RAG architectures, Claude AI API, OpenAI API)
- Current Location: Hyderabad (available for Work From Office)
- Notice Period: Immediate Joiner (0 Days notice)
- Current CTC: Negotiable / As per company standards
- Expected CTC: As per company standards

Summary of relevant work:
In my current role at YoungMinds Technology Solutions, I built web and desktop platforms and integrated the Claude AI API for context-aware customer interactions. In my personal project Zestchat, I architected an AI assistant utilizing RAG, LLM APIs, and PostgreSQL. I also hold an AWS Certification in Foundations of Prompt Engineering (completed August 2026).

My updated resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Nikitha,</p>
        <p>I am writing to apply for the <strong>JavaScript AI Developer / Full-Stack AI Engineer</strong> position in Hyderabad as posted on LinkedIn.</p>
        
        <p>Here are the details you requested:</p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Total Experience:</strong> 2+ Years</li>
          <li><strong>Relevant React / Node.js Experience:</strong> 2+ Years</li>
          <li><strong>GenAI / LLM Experience:</strong> 8+ Months (RAG architectures, Claude AI API, OpenAI API)</li>
          <li><strong>Current Location:</strong> Hyderabad (available for Work From Office)</li>
          <li><strong>Notice Period:</strong> Immediate Joiner (0 Days notice)</li>
          <li><strong>Current CTC:</strong> Negotiable / As per company standards</li>
          <li><strong>Expected CTC:</strong> As per company standards</li>
        </ul>

        <p><strong>Summary of relevant work:</strong><br/>
        In my current role at YoungMinds Technology Solutions, I built web and desktop platforms and integrated the Claude AI API for context-aware customer interactions. In my personal project Zestchat, I architected an AI assistant utilizing RAG, LLM APIs, and PostgreSQL. I also hold an AWS Certification in Foundations of Prompt Engineering (completed August 2026).</p>

        <p>My updated resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) is attached for your review.</p>

        <p style="margin-top: 18px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>

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
    company: "DPR Solutions Inc",
    recruiter: "Shanmuka kumari Boddu",
    to: "shanmukakumari.boddu@dprsolutionsinc.com",
    role: "Full Stack Developer (React / Kafka / REST APIs / Microservices / SQL)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Shanmuka,

I saw your LinkedIn post regarding the Full Stack Developer opening in Hyderabad and would like to put forward my application.

I have 2+ years of professional experience developing scalable web systems with React.js, Node.js, REST APIs, Kafka event streaming, and relational/NoSQL databases.

How my background aligns with your requirements:
- Frontend: Strong hands-on experience building modular, responsive user interfaces in React.js.
- Backend & APIs: Practical experience with REST APIs, microservices, and Postman API testing.
- Event Streaming: Integrated Kafka for real-time synchronization between client terminals in production at YoungMinds Technology Solutions.
- Databases: Experience with PostgreSQL, MySQL, and SQLite schema design and queries.
- Version Control: Clean Git workflows and collaborative development.

I am based in Hyderabad, currently serving my notice period, and can join immediately. I am also readily available for the face-to-face interview on 22nd September in Hyderabad.

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Shanmuka,</p>
        <p>I saw your LinkedIn post regarding the <strong>Full Stack Developer</strong> opening in Hyderabad and would like to put forward my application.</p>
        <p>I have 2+ years of professional experience developing scalable web systems with <strong>React.js, Node.js, REST APIs, Kafka event streaming, and relational/NoSQL databases</strong>.</p>
        
        <p><strong>How my background aligns with your requirements:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Frontend:</strong> Strong hands-on experience building modular, responsive user interfaces in React.js.</li>
          <li><strong>Backend &amp; APIs:</strong> Practical experience with REST APIs, microservices, and Postman API testing.</li>
          <li><strong>Event Streaming:</strong> Integrated Kafka for real-time synchronization between client terminals in production at YoungMinds Technology Solutions.</li>
          <li><strong>Databases:</strong> Experience with PostgreSQL, MySQL, and SQLite schema design and queries.</li>
          <li><strong>Version Control:</strong> Clean Git workflows and collaborative development.</li>
        </ul>

        <p>I am based in Hyderabad, currently serving my notice period, and can join immediately. I am also readily available for the face-to-face interview on <strong>22nd September</strong> in Hyderabad.</p>
        <p>My resume is attached for your review.</p>

        <p style="margin-top: 18px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>

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
    company: "LanceSoft India",
    recruiter: "Abdul H M Mohammed",
    to: "abdulhakeem.md@lancesoft.in",
    role: "Full Stack Developer (React.js / REST APIs / Microservices / SQL)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Abdul,

I am writing to apply for the Full Stack Developer position in Hyderabad that you posted on LinkedIn.

I have 2+ years of professional experience building web platforms, desktop systems, and RESTful APIs with strong expertise in React.js and microservices architecture.

Key points of alignment:
- Frontend: Hands-on experience developing responsive, component-driven UI using React.js and modern JavaScript (ES6+).
- Backend & Microservices: Solid experience with RESTful web services, API integration, and microservices logic.
- Databases: Hands-on work with relational SQL databases and MongoDB.
- Location & Work Mode: Based in Hyderabad and ready to work from office (WFO) full-time.
- Availability: Immediate joiner (currently serving notice period, 0 days notice).

My resume is attached for your consideration.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Abdul,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer</strong> position in Hyderabad that you posted on LinkedIn.</p>
        <p>I have 2+ years of professional experience building web platforms, desktop systems, and RESTful APIs with strong expertise in <strong>React.js and microservices architecture</strong>.</p>
        
        <p><strong>Key points of alignment:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Frontend:</strong> Hands-on experience developing responsive, component-driven UI using React.js and modern JavaScript (ES6+).</li>
          <li><strong>Backend &amp; Microservices:</strong> Solid experience with RESTful web services, API integration, and microservices logic.</li>
          <li><strong>Databases:</strong> Hands-on work with relational SQL databases and MongoDB.</li>
          <li><strong>Location &amp; Work Mode:</strong> Based in Hyderabad and ready to work from office (WFO) full-time.</li>
          <li><strong>Availability:</strong> Immediate joiner (currently serving notice period, 0 days notice).</li>
        </ul>

        <p>My resume is attached for your consideration.</p>

        <p style="margin-top: 18px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>

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
    company: "BCT Consulting",
    recruiter: "Yuva Rani S",
    to: "Yuvarani.s@bct-consulting.com",
    role: "Full Stack Developer (React / Angular / REST APIs / Microservices)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Yuva Rani,

I am writing to apply for the Full Stack Developer position as shared on LinkedIn.

I have 2+ years of professional development experience building scalable web applications with React.js, Angular, RESTful APIs, and microservices architecture.

Relevant experience:
- Modern Frontend: Building component-based user interfaces with React.js, TypeScript, and responsive CSS.
- APIs & Microservices: Designing and consuming RESTful microservices, handling data validation, and third-party integrations.
- Databases: Experience with PostgreSQL, MySQL, and SQLite.
- Availability: Immediate joiner (currently serving notice period).
- Interview: Based in Hyderabad and readily available for the face-to-face interview on 22nd September.

Please find my updated resume attached.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Yuva Rani,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer</strong> position as shared on LinkedIn.</p>
        <p>I have 2+ years of professional development experience building scalable web applications with <strong>React.js, Angular, RESTful APIs, and microservices architecture</strong>.</p>
        
        <p><strong>Relevant experience:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Modern Frontend:</strong> Building component-based user interfaces with React.js, TypeScript, and responsive CSS.</li>
          <li><strong>APIs &amp; Microservices:</strong> Designing and consuming RESTful microservices, handling data validation, and third-party integrations.</li>
          <li><strong>Databases:</strong> Experience with PostgreSQL, MySQL, and SQLite.</li>
          <li><strong>Availability:</strong> Immediate joiner (currently serving notice period).</li>
          <li><strong>Interview:</strong> Based in Hyderabad and readily available for the face-to-face interview on <strong>22nd September</strong>.</li>
        </ul>

        <p>Please find my updated resume attached.</p>

        <p style="margin-top: 18px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>

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
    company: "Onzestt Technologies",
    recruiter: "Prajna N S",
    to: "trainee1@onzestt.com",
    role: "Full Stack Developer (React.js UI / Node.js / SQL / AWS S3 / AI Tools)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Prajna,

I saw your LinkedIn post for the Full Stack Developer opening in Hyderabad and would like to apply.

I am a Full-Stack Developer with 2+ years of professional experience building web applications using React.js, JavaScript, Node.js, REST APIs, and database systems.

Key highlights:
- React.js & JavaScript: Building modular, reusable UI components and responsive layouts.
- Backend & Microservices: Developing REST APIs and server-side logic in Node.js and Express.
- Databases: Hands-on with both SQL (MySQL, PostgreSQL) and NoSQL (MongoDB, Redis).
- Cloud & AI Tools: Experience with AWS S3 asset storage, Docker basics, and modern AI development tooling (Claude AI and OpenAI APIs).
- Availability: Based in Hyderabad and available to join immediately.

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Prajna,</p>
        <p>I saw your LinkedIn post for the <strong>Full Stack Developer</strong> opening in Hyderabad and would like to apply.</p>
        <p>I am a Full-Stack Developer with 2+ years of professional experience building web applications using <strong>React.js, JavaScript, Node.js, REST APIs, and database systems</strong>.</p>
        
        <p><strong>Key highlights:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>React.js &amp; JavaScript:</strong> Building modular, reusable UI components and responsive layouts.</li>
          <li><strong>Backend &amp; Microservices:</strong> Developing REST APIs and server-side logic in Node.js and Express.</li>
          <li><strong>Databases:</strong> Hands-on with both SQL (MySQL, PostgreSQL) and NoSQL (MongoDB, Redis).</li>
          <li><strong>Cloud &amp; AI Tools:</strong> Experience with AWS S3 asset storage, Docker basics, and modern AI development tooling (Claude AI and OpenAI APIs).</li>
          <li><strong>Availability:</strong> Based in Hyderabad and available to join immediately.</li>
        </ul>

        <p>My resume is attached for your review.</p>

        <p style="margin-top: 18px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>

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
    company: "Potla Tech Solutions Pvt. Ltd.",
    recruiter: "Kousalya Thatipudi / Akhila Rao Janjala",
    to: "kousalya@potlatechsolutions.com",
    cc: "akhila@potlatechsolutions.com",
    role: "Full Stack Developer (React.js / JavaScript / REST APIs / Microservices / SQL)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Kousalya,

I am writing regarding the Full Stack Developer opening in Hyderabad that you posted on LinkedIn.

I have 2+ years of professional experience building full-stack web applications with React.js, JavaScript, REST APIs, and relational databases.

Summary of technical qualifications:
- Frontend: Strong hands-on experience in React.js, JavaScript (ES6+), HTML5, and CSS3.
- Backend & APIs: Designing and integrating RESTful APIs and microservices.
- Databases: Schema design and query optimization in PostgreSQL, MySQL, and SQLite.
- Work Mode: Located in Hyderabad and fully committed to Work From Office (WFO).
- Availability: Immediate joiner (currently serving notice period, ready for immediate onboarding).

My updated resume is attached for your evaluation.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Kousalya,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Hyderabad that you posted on LinkedIn.</p>
        <p>I have 2+ years of professional experience building full-stack web applications with <strong>React.js, JavaScript, REST APIs, and relational databases</strong>.</p>
        
        <p><strong>Summary of technical qualifications:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Frontend:</strong> Strong hands-on experience in React.js, JavaScript (ES6+), HTML5, and CSS3.</li>
          <li><strong>Backend &amp; APIs:</strong> Designing and integrating RESTful APIs and microservices.</li>
          <li><strong>Databases:</strong> Schema design and query optimization in PostgreSQL, MySQL, and SQLite.</li>
          <li><strong>Work Mode:</strong> Located in Hyderabad and fully committed to Work From Office (WFO).</li>
          <li><strong>Availability:</strong> Immediate joiner (currently serving notice period, ready for immediate onboarding).</li>
        </ul>

        <p>My updated resume is attached for your evaluation.</p>

        <p style="margin-top: 18px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>

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
    company: "Artech L.L.C.",
    recruiter: "BSS Keerthi",
    to: "keerthi.bss@artechinfo.in",
    role: "Agentic Automation Full Stack Developer (Agentic AI / React / LLMs / APIs)",
    subject: "Application for Agentic Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Keerthi,

I saw your LinkedIn post for the Agentic Automation Full Stack Developer opportunity in Hyderabad and would like to share my profile.

I am a Full-Stack Developer with 2+ years of professional experience building modern web systems, with hands-on experience in Agentic AI workflows, LLM integration, and full-stack development.

Relevant background:
- Agentic & AI Integration: Hands-on experience building AI assistants with LLMs (Claude AI API, OpenAI API), RAG architecture, and agentic workflows using GitHub Copilot. Completed AWS Training & Certification in Foundations of Prompt Engineering.
- Full Stack Development: React.js frontend, Node.js and Express backend, REST APIs, and connector-based data pipelines.
- Containerization & Tools: Familiar with Docker basics, Git, and collaborative development.
- Location & Joining: Based in Hyderabad and available to join immediately.

My resume is attached for your consideration.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Keerthi,</p>
        <p>I saw your LinkedIn post for the <strong>Agentic Automation Full Stack Developer</strong> opportunity in Hyderabad and would like to share my profile.</p>
        <p>I am a Full-Stack Developer with 2+ years of professional experience building modern web systems, with hands-on experience in <strong>Agentic AI workflows, LLM integration, and full-stack development</strong>.</p>
        
        <p><strong>Relevant background:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Agentic &amp; AI Integration:</strong> Hands-on experience building AI assistants with LLMs (Claude AI API, OpenAI API), RAG architecture, and agentic workflows using GitHub Copilot. Completed AWS Training &amp; Certification in Foundations of Prompt Engineering.</li>
          <li><strong>Full Stack Development:</strong> React.js frontend, Node.js and Express backend, REST APIs, and connector-based data pipelines.</li>
          <li><strong>Containerization &amp; Tools:</strong> Familiar with Docker basics, Git, and collaborative development.</li>
          <li><strong>Location &amp; Joining:</strong> Based in Hyderabad and available to join immediately.</li>
        </ul>

        <p>My resume is attached for your consideration.</p>

        <p style="margin-top: 18px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>

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
    company: "VySystems",
    recruiter: "Banu S / Ajeeth Kumar",
    to: "banu.s@vysystems.com",
    cc: "ajeethkumar@vysystems.com",
    role: "Full Stack Developer (Angular / TypeScript / REST APIs / SQL)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Banu,

I am writing regarding the Full Stack Developer opening in Hyderabad that you posted on LinkedIn.

I have 2+ years of professional experience building web platforms, with hands-on development experience in Angular, TypeScript, HTML/CSS, and RESTful web services.

Summary of experience:
- Frontend: Experience with Angular, TypeScript, responsive UI development, and component architecture.
- Backend & APIs: Developing and consuming RESTful APIs, handling data validation, and database operations with SQL.
- Problem-Solving & Debugging: Strong debugging skills and clean code practices using Git and Postman.
- Location & Notice: Based in Hyderabad, comfortable with WFO/hybrid requirements, and available to join immediately (0 days notice).

Here are the details you requested:
- Total Experience: 2+ Years
- Relevant Frontend / Angular Experience: 2+ Years
- Current Location: Hyderabad
- Notice Period: Immediate Joiner (0 Days)
- Current CTC: Negotiable / As per company standards
- Expected CTC: As per company standards

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 640px;">
        <p>Hi Banu,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Hyderabad that you posted on LinkedIn.</p>
        <p>I have 2+ years of professional experience building web platforms, with hands-on development experience in <strong>Angular, TypeScript, HTML/CSS, and RESTful web services</strong>.</p>
        
        <p><strong>Summary of experience:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Frontend:</strong> Experience with Angular, TypeScript, responsive UI development, and component architecture.</li>
          <li><strong>Backend &amp; APIs:</strong> Developing and consuming RESTful APIs, handling data validation, and database operations with SQL.</li>
          <li><strong>Problem-Solving &amp; Debugging:</strong> Strong debugging skills and clean code practices using Git and Postman.</li>
          <li><strong>Location &amp; Notice:</strong> Based in Hyderabad, comfortable with WFO/hybrid requirements, and available to join immediately (0 days notice).</li>
        </ul>

        <p><strong>Details as requested:</strong></p>
        <ul style="padding-left: 20px; margin: 8px 0;">
          <li><strong>Total Experience:</strong> 2+ Years</li>
          <li><strong>Relevant Frontend / Angular Experience:</strong> 2+ Years</li>
          <li><strong>Current Location:</strong> Hyderabad</li>
          <li><strong>Notice Period:</strong> Immediate Joiner (0 Days)</li>
          <li><strong>Current CTC:</strong> Negotiable / As per company standards</li>
          <li><strong>Expected CTC:</strong> As per company standards</li>
        </ul>

        <p>My resume is attached for your review.</p>

        <p style="margin-top: 18px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>

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
  console.log("SMTP connection verified successfully.\n");

  console.log(`Starting sequential dispatch of ${hrApplications.length} targeted HR applications...\n`);

  const results = [];

  for (let i = 0; i < hrApplications.length; i++) {
    const app = hrApplications[i];
    console.log(`[${i + 1}/${hrApplications.length}] Sending to ${app.company} (${app.to})...`);

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: app.to,
      cc: app.cc || undefined,
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

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`   -> SUCCESS! Message ID: ${info.messageId}`);
      results.push({
        company: app.company,
        recruiter: app.recruiter,
        to: app.to,
        status: "SENT",
        messageId: info.messageId,
      });
    } catch (err) {
      console.error(`   -> FAILED to send to ${app.to}:`, err.message);
      results.push({
        company: app.company,
        recruiter: app.recruiter,
        to: app.to,
        status: "FAILED",
        error: err.message,
      });
    }

    if (i < hrApplications.length - 1) {
      console.log("   Waiting 3 seconds before next dispatch...");
      await delay(3000);
    }
  }

  console.log("\n========================================================");
  console.log("DISPATCH COMPLETE. SUMMARY REPORT:");
  console.log("========================================================");
  console.table(results);
}

main().catch((err) => {
  console.error("Execution failed:", err);
  process.exit(1);
});
