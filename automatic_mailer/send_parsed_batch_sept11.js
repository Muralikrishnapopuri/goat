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

// Helper to delay between sends
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Step 1: Deduplicated Target HR Applications ──────────────────────────────
const hrApplications = [
  {
    company: "LanceSoft",
    targetEmail: "rakshitha.mujakari@lancesoft.in",
    role: "Full Stack Developer (React, RESTful APIs, SQL Server, Microservices)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Rakshitha,

I am writing to apply for the Full Stack Developer position at LanceSoft in Hyderabad (via Refer Me Group notification).

I am a Full-Stack Developer with 2+ years of professional experience specializing in React.js, TypeScript, Node.js, Express, RESTful APIs, and SQL/NoSQL databases. At YoungMinds Technology Solutions, I built high-performance web platforms and desktop POS systems featuring real-time synchronization, microservices, and database query optimization.

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
        <p>Hi Rakshitha,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer</strong> position at LanceSoft in Hyderabad (via Refer Me Group notification).</p>
        <p>I am a Full-Stack Developer with 2+ years of professional experience specializing in <strong>React.js, TypeScript, Node.js, Express, RESTful APIs, and SQL/NoSQL databases</strong>. At YoungMinds Technology Solutions, I built high-performance web platforms and desktop POS systems featuring real-time synchronization, microservices, and database query optimization.</p>
        <p>I am based in Hyderabad, currently serving my notice period, and available to join immediately.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    company: "Randstad Sourceright",
    targetEmail: "mohammed.sohailabdul@randstadsourceright.com",
    role: "Software Engineer (React, Node.js, TypeScript, REST APIs, Microservices, RAG/AI)",
    subject: "Application for Software Engineering - Murali Krishna Popuri",
    body: `Hi Mohammed,

I am writing to apply for the Software Engineering position in Hyderabad as shared on LinkedIn.

I am a Full-Stack Developer with 2+ years of hands-on experience building scalable applications using React.js, Node.js, TypeScript, REST APIs, and event-driven architectures. In my work at YoungMinds Technology Solutions, I engineered real-time synchronization systems using Kafka, relational SQL schemas, and high-concurrency Node.js microservices. In addition, I have built production AI-enabled solutions incorporating RAG and LLM APIs (Claude, OpenAI).

I am located in Hyderabad, currently serving my notice period, and ready to join immediately.

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
        <p>Hi Mohammed,</p>
        <p>I am writing to apply for the <strong>Software Engineering</strong> position in Hyderabad as shared on LinkedIn.</p>
        <p>I am a Full-Stack Developer with 2+ years of hands-on experience building scalable applications using <strong>React.js, Node.js, TypeScript, REST APIs, and event-driven architectures</strong>. In my work at YoungMinds Technology Solutions, I engineered real-time synchronization systems using Kafka, relational SQL schemas, and high-concurrency Node.js microservices. In addition, I have built production AI-enabled solutions incorporating RAG and LLM APIs (Claude, OpenAI).</p>
        <p>I am located in Hyderabad, currently serving my notice period, and ready to join immediately.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your evaluation.</p>
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
    company: "Skill2Hire Technologies",
    targetEmail: "hr@skill2hiretechnologies.com",
    role: "AI & Full Stack Engineer (Agentic AI, RAG, LLMs, React, REST APIs)",
    subject: "Application for AI and Full Stack Development - Murali Krishna Popuri",
    body: `Hi Hiring Team,

I am writing to express my interest in the AI and Full Stack engineering opportunities at Skill2Hire Technologies in Hyderabad.

I am a Full-Stack Developer with 2+ years of experience specializing in React.js, TypeScript, Node.js, and modern AI integration workflows. In my personal project Zestchat, I built an AI chatbot assistant utilizing Agentic AI, RAG, and LLM APIs (Claude AI API) with vector/relational data storage in PostgreSQL. In my production role at YoungMinds Technology Solutions, I developed real-time web and desktop platforms with microservices and event pipelines.

I am based in Hyderabad, currently serving my notice period, and available as an immediate joiner.

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
        <p>Hi Hiring Team,</p>
        <p>I am writing to express my interest in the <strong>AI and Full Stack engineering</strong> opportunities at Skill2Hire Technologies in Hyderabad.</p>
        <p>I am a Full-Stack Developer with 2+ years of experience specializing in <strong>React.js, TypeScript, Node.js, and modern AI integration workflows</strong>. In my project Zestchat, I built an AI assistant utilizing Agentic AI, RAG, and LLM APIs (Claude AI API) with PostgreSQL schema design. In my production work at YoungMinds Technology Solutions, I developed real-time web and desktop platforms with microservices and event pipelines.</p>
        <p>I am based in Hyderabad, currently serving my notice period, and available as an immediate joiner.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your consideration.</p>
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
    company: "Linkage IT",
    targetEmail: "leena.popli@linkageit.com",
    role: "Full Stack Developer (React, SQL, Kafka, Agentic AI, RAG)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Leena,

I am writing to apply for the Full Stack Developer position at Linkage IT in Hyderabad (via Refer Me Group notification).

I am a Full-Stack Developer with 2+ years of experience working with React.js, TypeScript, Node.js, SQL databases, and event streaming via Apache Kafka. In addition, I have hands-on experience developing Agentic AI workflows and RAG implementations with LLM APIs. At YoungMinds Technology Solutions, I architected offline-first POS software, Kafka event-driven synchronization, and real-time multi-terminal architectures.

I am open to working on-site or hybrid in Hyderabad/Bangalore and am available to join immediately as I am currently serving my notice period.

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
        <p>Hi Leena,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer</strong> position at Linkage IT in Hyderabad (via Refer Me Group notification).</p>
        <p>I am a Full-Stack Developer with 2+ years of experience working with <strong>React.js, TypeScript, Node.js, SQL databases, and event streaming via Apache Kafka</strong>. In addition, I have hands-on experience developing Agentic AI workflows and RAG implementations with LLM APIs. At YoungMinds Technology Solutions, I architected offline-first POS software, Kafka event-driven synchronization, and real-time multi-terminal architectures.</p>
        <p>I am open to working on-site or hybrid in Hyderabad/Bangalore and am available to join immediately as I am currently serving my notice period.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    company: "VMC Groups",
    targetEmail: "hrvmcgroups365@gmail.com",
    role: "Full Stack & AI Engineer (React, Node.js, Kafka, RAG)",
    subject: "Application for Full Stack and AI Engineering - Murali Krishna Popuri",
    body: `Hi Hiring Team,

I am applying for the Full Stack and AI Engineering openings in Hyderabad / Bangalore as posted on LinkedIn.

Applicant Details:
• Present Location: Hyderabad / Open to Bangalore
• Notice Period: Serving Notice Period (Immediate Joiner)
• Experience: 2+ Years Professional Experience
• Target Roles: Full Stack Developer / AI Engineer (React, Node.js, Kafka, RAG)

Technical Background:
I have built production platforms with React.js, TypeScript, Node.js, Express, Kafka, and SQL databases at YoungMinds Technology Solutions. Furthermore, I have developed AI applications implementing Agentic AI and RAG architectures using Claude and OpenAI APIs.

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
        <p>I am applying for the <strong>Full Stack and AI Engineering</strong> openings in Hyderabad / Bangalore as posted on LinkedIn.</p>
        <p style="background-color: #f8fafc; padding: 12px; border-left: 3px solid #0284c7; margin: 14px 0;">
          <strong>Applicant Details:</strong><br/>
          • Present Location: Hyderabad / Open to Bangalore<br/>
          • Notice Period: Serving Notice Period (Immediate Joiner)<br/>
          • Experience: 2+ Years Professional Experience<br/>
          • Target Roles: Full Stack Developer / AI Engineer (React, Node.js, Kafka, RAG)
        </p>
        <p>I have built production platforms with React.js, TypeScript, Node.js, Express, Kafka, and SQL databases at YoungMinds Technology Solutions. Furthermore, I have developed AI applications implementing Agentic AI and RAG architectures using Claude and OpenAI APIs.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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
    company: "Vitim Cloud Technologies",
    targetEmail: "HR@vitimcloud.com",
    role: "AI & Full Stack Engineer (GenAI, RAG, AI Agents, React, REST APIs, SQL)",
    subject: "Application for AI and Full Stack Engineering - Murali Krishna Popuri",
    body: `Hi Archana & Hiring Team,

I am writing to express my interest in the enterprise AI and Full Stack opportunity at Vitim Cloud Technologies.

I am a Full-Stack Developer with 2+ years of professional experience in React.js, Node.js, TypeScript, SQL databases, and modern AI development (GenAI, RAG, and AI Agent development). In my production and personal projects, I have implemented AI assistants using Claude AI, architected relational database schemas, and built reliable REST APIs with background scheduling.

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
        <p>Hi Archana &amp; Hiring Team,</p>
        <p>I am writing to express my interest in the <strong>enterprise AI and Full Stack</strong> opportunity at Vitim Cloud Technologies.</p>
        <p>I am a Full-Stack Developer with 2+ years of professional experience in <strong>React.js, Node.js, TypeScript, SQL databases, and modern AI development (GenAI, RAG, and AI Agent development)</strong>. In my production and personal projects, I have implemented AI assistants using Claude AI, architected relational database schemas, and built reliable REST APIs with background scheduling.</p>
        <p>I am based in Hyderabad, currently serving my notice period, and available as an immediate joiner.</p>
        <p>My PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
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

// ─── Step 2: WhatsApp Messages & Portal Links Content for Murali ─────────────
const whatsappSummaryHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>WhatsApp HR Contacts and Application Links</title>
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a;">
  <div style="max-width: 720px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">
    
    <div style="border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px;">
      <h2 style="margin: 0; font-size: 18px; color: #1e293b;">
        Recruiter WhatsApp Contacts &amp; Ready-to-Copy Messages
      </h2>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
        Extracted from LinkedIn recruiter feed | Strictly tailored for Murali Krishna Popuri (2+ Years Exp)
      </p>
    </div>

    <!-- Contact 1 -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 18px;">
      <h3 style="margin: 0 0 6px 0; font-size: 15px; color: #0369a1;">
        1. Skill2Hire Technologies - Bhanu Prakash (Founder &amp; CEO)
      </h3>
      <p style="margin: 2px 0; font-size: 13px;"><strong>Phone / WhatsApp:</strong> +91 7349783555</p>
      <p style="margin: 2px 0; font-size: 13px;"><strong>Email Sent:</strong> hr@skill2hiretechnologies.com</p>
      <p style="margin: 2px 0; font-size: 13px;"><strong>Role:</strong> Senior AI/ML &amp; Full Stack Solutions (Hyderabad)</p>
      <p style="margin: 10px 0 4px 0; font-size: 12px; font-weight: 600; color: #475569;">Ready-to-Copy WhatsApp Message:</p>
      <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 12px; line-height: 1.5; color: #1e293b; user-select: all;">
Hi Bhanu, I am Murali Krishna Popuri, a Full-Stack & AI Application Developer with 2+ years of experience specializing in React.js, Node.js, TypeScript, REST APIs, Agentic AI, and RAG architectures. I saw your post for the Hyderabad team and would love to connect. I am currently serving my notice period and available for immediate joining. Portfolio: https://murali-portfolio-website.vercel.app. I have attached my resume via email and can share it directly here as well. Thank you.
      </div>
    </div>

    <!-- Contact 2 -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 18px;">
      <h3 style="margin: 0 0 6px 0; font-size: 15px; color: #0369a1;">
        2. VMC Groups - Recruitment Desk
      </h3>
      <p style="margin: 2px 0; font-size: 13px;"><strong>Phone / WhatsApp:</strong> +91 9014989741</p>
      <p style="margin: 2px 0; font-size: 13px;"><strong>Email Sent:</strong> hrvmcgroups365@gmail.com</p>
      <p style="margin: 2px 0; font-size: 13px;"><strong>Roles:</strong> Full Stack (React/Node/Kafka) &amp; AI Engineering (Hyderabad / Bangalore)</p>
      <p style="margin: 10px 0 4px 0; font-size: 12px; font-weight: 600; color: #475569;">Ready-to-Copy WhatsApp Message:</p>
      <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 12px; line-height: 1.5; color: #1e293b; user-select: all;">
Hi, I am Murali Krishna Popuri, applying for the Full Stack / AI Engineer openings in Hyderabad / Bangalore. I have 2+ years of professional software engineering experience with React, Node.js, Express, Kafka, and RAG/LLM solutions. Current location: Hyderabad, Notice Period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have sent my detailed resume to hrvmcgroups365@gmail.com and look forward to hearing from you.
      </div>
    </div>

    <!-- Section: Forms & Communities -->
    <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px;">
      <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #1e293b;">
        Direct Application Forms &amp; Group Links Extracted:
      </h3>
      <ul style="font-size: 13px; color: #334155; line-height: 1.8; padding-left: 20px;">
        <li>
          <strong>Vitim Cloud Technologies (Application Form):</strong><br/>
          <a href="https://lnkd.in/dwu2gC_R" target="_blank" style="color: #0284c7;">https://lnkd.in/dwu2gC_R</a>
        </li>
        <li>
          <strong>Vitim Cloud WhatsApp Community:</strong><br/>
          <a href="https://lnkd.in/dibtN699" target="_blank" style="color: #0284c7;">https://lnkd.in/dibtN699</a>
        </li>
        <li>
          <strong>LanceSoft Refer Me WhatsApp Group Link:</strong><br/>
          <a href="https://lnkd.in/dXSyj8Gm" target="_blank" style="color: #0284c7;">https://lnkd.in/dXSyj8Gm</a>
        </li>
        <li>
          <strong>Linkage IT Refer Me WhatsApp Group Link:</strong><br/>
          <a href="https://lnkd.in/e_4zxwE7" target="_blank" style="color: #0284c7;">https://lnkd.in/e_4zxwE7</a>
        </li>
      </ul>
    </div>

    <div style="margin-top: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 10px;">
      All target emails have been delivered directly to HR with Murali_Krishna_Popuri_Full_Stack_Dev.pdf attached.
    </div>

  </div>
</body>
</html>
`;

const whatsappSummaryText = `RECRUITER WHATSAPP CONTACTS AND READY-TO-COPY MESSAGES
Extracted from LinkedIn Recruiter Feed (September 11, 2026)

1. Skill2Hire Technologies - Bhanu Prakash (CEO)
Phone / WhatsApp: +91 7349783555
Email: hr@skill2hiretechnologies.com
Role: Senior AI/ML & Full Stack Solutions (Hyderabad)
Copy-Paste WhatsApp Message:
Hi Bhanu, I am Murali Krishna Popuri, a Full-Stack & AI Application Developer with 2+ years of experience specializing in React.js, Node.js, TypeScript, REST APIs, Agentic AI, and RAG architectures. I saw your post for the Hyderabad team and would love to connect. I am currently serving my notice period and available for immediate joining. Portfolio: https://murali-portfolio-website.vercel.app. I have attached my resume via email and can share it directly here as well. Thank you.

----------------------------------------------------------------------
2. VMC Groups - Recruitment Desk
Phone / WhatsApp: +91 9014989741
Email: hrvmcgroups365@gmail.com
Role: Full Stack (React/Node/Kafka) & AI Engineering (Hyderabad / Bangalore)
Copy-Paste WhatsApp Message:
Hi, I am Murali Krishna Popuri, applying for the Full Stack / AI Engineer openings in Hyderabad / Bangalore. I have 2+ years of professional software engineering experience with React, Node.js, Express, Kafka, and RAG/LLM solutions. Current location: Hyderabad, Notice Period: Immediate Joiner. Portfolio: https://murali-portfolio-website.vercel.app. I have sent my detailed resume to hrvmcgroups365@gmail.com and look forward to hearing from you.

----------------------------------------------------------------------
Direct Application Forms & Group Links:
- Vitim Cloud Technologies Application Form: https://lnkd.in/dwu2gC_R
- Vitim Cloud WhatsApp Community: https://lnkd.in/dibtN699
- LanceSoft Refer Me WhatsApp Group Link: https://lnkd.in/dXSyj8Gm
- Linkage IT Refer Me WhatsApp Group Link: https://lnkd.in/e_4zxwE7
`;

async function executeOutreach() {
  console.log("================================================================================");
  console.log("STEP 1: SEQUENTIAL TARGET HR OUTREACH DISPATCH");
  console.log(`Total Deduplicated HR Applications: ${hrApplications.length}`);
  console.log("================================================================================");

  // Check for duplicate target emails in the array to guarantee zero duplicates
  const seenEmails = new Set();
  const filteredApps = [];
  for (const app of hrApplications) {
    const lowerEmail = app.targetEmail.toLowerCase().trim();
    if (seenEmails.has(lowerEmail)) {
      console.log(`Skipping duplicate email: ${app.targetEmail} for ${app.company}`);
    } else {
      seenEmails.add(lowerEmail);
      filteredApps.push(app);
    }
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < filteredApps.length; i++) {
    const app = filteredApps[i];
    console.log(`\n[${i + 1}/${filteredApps.length}] Sending to ${app.company} -> ${app.targetEmail}...`);

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
      console.error(`FAILED: Could not send to ${app.targetEmail}: ${err.message}`);
      failCount++;
    }

    // Delay 3 seconds between sends to respect Gmail rate limits
    if (i < filteredApps.length - 1) {
      console.log("Waiting 3s before next send...");
      await delay(3000);
    }
  }

  console.log("\n================================================================================");
  console.log(`OUTREACH SUMMARY: ${successCount} Sent Successfully, ${failCount} Failed.`);
  console.log("================================================================================");

  console.log("\n================================================================================");
  console.log(`STEP 2: DISPATCHING WHATSAPP SUMMARY & PORTAL LINKS TO: ${USER_NOTIFICATION_EMAIL}`);
  console.log("================================================================================");

  const summaryMailOptions = {
    from: `"Murali Outreach System" <${SENDER_EMAIL}>`,
    to: USER_NOTIFICATION_EMAIL,
    subject: "Recruiter WhatsApp Contacts, Ready-to-Copy Messages & Portal Links (Sept 11, 2026)",
    text: whatsappSummaryText,
    html: whatsappSummaryHtml,
  };

  try {
    const summaryInfo = await transporter.sendMail(summaryMailOptions);
    console.log(`SUCCESS: WhatsApp summary sent to ${USER_NOTIFICATION_EMAIL} (Message ID: ${summaryInfo.messageId})`);
  } catch (err) {
    console.error(`FAILED to send summary to ${USER_NOTIFICATION_EMAIL}: ${err.message}`);
  }

  console.log("\nAll tasks completed successfully.");
}

executeOutreach().catch((err) => {
  console.error("Fatal execution error:", err);
  process.exit(1);
});
