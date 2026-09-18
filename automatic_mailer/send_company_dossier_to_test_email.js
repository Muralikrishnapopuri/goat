const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TARGET_EMAIL = "popurimuralikrishna04@gmail.com";
const RESUME_PATH = path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf");

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

const companies = [
  {
    name: "Implere Technologies",
    recruiter: "Nikitha Gokaraju",
    email: "nikitha.g@impleretech.com",
    phone: "N/A",
    role: "JavaScript AI Developer / Full-Stack AI Engineer",
    location: "Hyderabad (Work From Office)",
    stack: "JavaScript, React.js, Node.js, Express, REST APIs, GenAI, LLMs, RAG, Claude/OpenAI APIs",
    about: "Enterprise product and AI engineering company specializing in Generative AI, intelligent agent workflows, and scalable cloud applications.",
    messageId: "<def27151-fa9f-e506-92d2-f70034df080f@gmail.com>",
    notes: "Strict format requested by HR with CTC & experience breakdown was fulfilled."
  },
  {
    name: "DPR Solutions Inc",
    recruiter: "Shanmuka kumari Boddu",
    email: "shanmukakumari.boddu@dprsolutionsinc.com",
    phone: "N/A",
    role: "Full Stack Developer",
    location: "Hyderabad",
    stack: "React.js, Kafka, REST APIs, Microservices, Relational/NoSQL, Git, Postman",
    about: "Global technology consulting and IT solutions provider delivering enterprise software, cloud integration, and talent engineering across India and the US.",
    messageId: "<2746b8e9-aa99-f339-0468-f7e416f35aa2@gmail.com>",
    notes: "Face-to-face interview scheduled for 22nd September in Hyderabad. Candidate availability confirmed."
  },
  {
    name: "LanceSoft India",
    recruiter: "Abdul H M Mohammed",
    email: "abdulhakeem.md@lancesoft.in",
    phone: "+91 93983 10323 (WhatsApp available)",
    role: "Full Stack Developer",
    location: "Hyderabad (Work From Office)",
    stack: "React.js, RESTful Web Services, Microservices Architecture, SQL databases",
    about: "Premier global IT workforce solutions and consulting organization providing technical talent to Fortune 500 enterprises and IT service management leaders.",
    messageId: "<d19175be-4e12-3614-3e33-c227b44b196a@gmail.com>",
    notes: "Immediate joiners preferred for Hyderabad WFO. WhatsApp message template ready."
  },
  {
    name: "BCT Consulting (Bahwan CyberTek)",
    recruiter: "Yuva Rani S",
    email: "Yuvarani.s@bct-consulting.com",
    phone: "N/A",
    role: "Full Stack Developer",
    location: "Hyderabad / Bangalore",
    stack: "React.js, Angular, REST APIs, Microservices, Spring Boot, SQL",
    about: "Global technology enterprise delivering digital transformation, IP-driven software products, and IT consulting services across 20+ countries.",
    messageId: "<0bd3d7b8-1cdf-e841-c706-8d7dd5509d6a@gmail.com>",
    notes: "Face-to-face interview scheduled for 22nd September 2026. Candidate availability confirmed."
  },
  {
    name: "Onzestt Technologies",
    recruiter: "Prajna N S",
    email: "trainee1@onzestt.com",
    phone: "N/A",
    role: "Full Stack Developer",
    location: "Hyderabad",
    stack: "React.js, JavaScript, Node.js, SQL & NoSQL, AWS S3, Docker, AI Tools",
    about: "Software development and offshore IT consultancy building cloud-native web applications, containerized microservices, and modern frontend platforms.",
    messageId: "<6a15925f-c4fd-b109-2a28-5d0f2cf73991@gmail.com>",
    notes: "Immediate joiners preferred in Hyderabad."
  },
  {
    name: "Potla Tech Solutions Pvt. Ltd.",
    recruiter: "Kousalya Thatipudi / Akhila Rao Janjala",
    email: "kousalya@potlatechsolutions.com (cc: akhila@potlatechsolutions.com)",
    phone: "N/A",
    role: "Full Stack Developer",
    location: "Hyderabad (WFO Mandatory)",
    stack: "React.js, JavaScript, REST APIs, Microservices, SQL Databases, Git",
    about: "IT services, staff augmentation, and software engineering firm delivering custom enterprise solutions and engineering teams in Hyderabad.",
    messageId: "<fb32c3dd-6167-b2c9-de87-88b394599c0d@gmail.com>",
    notes: "WFO mandatory in Hyderabad. Immediate joiner status highlighted."
  },
  {
    name: "Artech L.L.C.",
    recruiter: "BSS Keerthi",
    email: "keerthi.bss@artechinfo.in",
    phone: "N/A",
    role: "Agentic Automation Full Stack Developer",
    location: "Hyderabad",
    stack: "Agentic AI, React, Node.js, REST APIs, GitHub Copilot, Docker",
    about: "One of the largest global IT staffing and tech workforce firms with $800M+ revenue, supporting leading multinational tech giants with digital engineering.",
    messageId: "<8f78434e-0e7d-fcfa-591a-cc50b12ebaf4@gmail.com>",
    notes: "Highlights candidate's Agentic AI workflows, Claude API integration, and AWS Prompt Engineering certification."
  },
  {
    name: "VySystems",
    recruiter: "Banu S / Ajeeth Kumar",
    email: "banu.s@vysystems.com (cc: ajeethkumar@vysystems.com)",
    phone: "+91 9150005306 (Ajeeth Kumar WhatsApp)",
    role: "Full Stack Developer",
    location: "Hyderabad (Hybrid / 4 Days WFO)",
    stack: "Angular, TypeScript, REST APIs, SQL, Git, Postman",
    about: "Specialized IT recruitment and technical consulting firm delivering engineering talent to enterprise banking, financial technology, and IT leaders.",
    messageId: "<2463bb7a-9094-45ba-94c1-136bf4698b48@gmail.com>",
    notes: "Candidate details (experience, location, CTC, notice period) provided upfront."
  },
  {
    name: "Openxtro",
    recruiter: "HR Team",
    email: "hr_openxtro@openxtro.com",
    phone: "N/A",
    role: "React JS & Full Stack Developer",
    location: "Hyderabad",
    stack: "React.js, Node.js, TypeScript, RESTful APIs, MySQL/PostgreSQL, Docker/AWS",
    about: "Technology consulting and digital engineering company building scalable web solutions, cloud-backed APIs, and custom enterprise applications.",
    messageId: "<35935754-e855-818f-a32a-3ae2c5b4e19a@gmail.com>",
    notes: "Immediate joiners highly preferred. Highlighted PostgreSQL/MySQL schema design and React UI."
  },
  {
    name: "Milieudigital Technologies",
    recruiter: "Kamalakar Reddy",
    email: "kamalakar.a@milieudigital.com",
    phone: "N/A",
    role: "Full Stack / Backend & Frontend Developer",
    location: "Hyderabad",
    stack: "React.js, Node.js, TypeScript, REST APIs, PostgreSQL, MySQL, Kafka",
    about: "High-tech digital engineering and semiconductor/software solutions firm providing end-to-end technical staffing and embedded/web development in Hyderabad.",
    messageId: "<0e94ed6d-fa33-a53a-0b5c-7fe799b2a3b2@gmail.com>",
    notes: "Addressed to Kamalakar Reddy, HR Recruiter & Operations - Backend & Frontend."
  },
  {
    name: "Shell Infotech",
    recruiter: "Sravanthi N",
    email: "sravanthi@shellinfotech.com",
    phone: "N/A",
    role: "Full Stack / React & Backend Developer",
    location: "Hyderabad (Somajiguda)",
    stack: "React.js, TypeScript, Node.js, Express, REST APIs, SQL, MongoDB",
    about: "Established IT services, consulting, and recruitment firm specializing in BFSI, cloud engineering, cybersecurity, and enterprise technical staffing.",
    messageId: "<a57f0f1c-0765-7aa3-2049-54343956784f@gmail.com>",
    notes: "Addressed to Sravanthi N (Delivery Lead - Technical Hiring)."
  },
  {
    name: "BCT Consulting (Client Engagement)",
    recruiter: "Angel David",
    email: "angel.r@bct-consulting.com",
    phone: "+91 8754775420 (WhatsApp available)",
    role: "Full Stack Developer",
    location: "Hyderabad",
    stack: "React.js, Kafka, REST APIs, Microservices, PostgreSQL/MySQL, Git, Postman",
    about: "Bahwan CyberTek (BCT Consulting) enterprise digital transformation and client engineering engagements across banking and insurance.",
    messageId: "<a79bbde4-80e6-996e-9321-55491f0a18a9@gmail.com>",
    notes: "Immediate to 15 days notice. WhatsApp message template ready."
  },
  {
    name: "T9 IT Solutions (T9 GIC)",
    recruiter: "Vijay Chitreddy",
    email: "vijay@t9gic.com",
    phone: "N/A",
    role: "Full Stack / Web Developer",
    location: "Hyderabad (Hybrid WFO)",
    stack: "React.js, TypeScript, RESTful Web APIs, SQL Server, Relational Databases",
    about: "T9 Global Innovation Centers (T9 GIC) providing enterprise IT solutions, cloud architectures, and digital product consulting.",
    messageId: "<8b7545f1-79e0-9c82-adcd-9b9c92fc9103@gmail.com>",
    notes: "Applied for Hyderabad developer role with React and Web API focus."
  },
  {
    name: "NS Global",
    recruiter: "Oviya G",
    email: "oviya.nsglobal@gmail.com",
    phone: "N/A",
    role: "Full Stack Developer",
    location: "Hyderabad / Pune",
    stack: "React.js, Node.js, REST APIs, Microservices, SQL, Git, CI/CD",
    about: "Global IT staffing, contract-to-hire (C2H), and technology recruitment consultancy for Tier-1 IT companies and global enterprises.",
    messageId: "<9ed5eb03-0d4c-c3c6-5585-f62c11f456e1@gmail.com>",
    notes: "Emphasized React frontend, REST microservices, and immediate availability."
  },
  {
    name: "LTIMindtree Engagement",
    recruiter: "Vishnu P.",
    email: "vishnupriyajp0505@gmail.com",
    phone: "N/A",
    role: "Full Stack Developer",
    location: "Hyderabad (Client Location)",
    stack: "Kafka, PostgreSQL, MongoDB, REST APIs, Microservices",
    about: "LTIMindtree (L&T Group) is one of India's premier top-tier IT multinational corporations delivering technology consulting and digital enterprise services globally.",
    messageId: "<e4807c9e-6730-d130-8ec8-1060e600a9b8@gmail.com>",
    notes: "Emphasized Kafka event streaming from YoungMinds and PostgreSQL optimization."
  },
  {
    name: "Eaglemount Software",
    recruiter: "Hiring Team",
    email: "info@eaglemount.com",
    phone: "N/A",
    role: "Software Developer (React.js)",
    location: "Remote / Bangalore",
    stack: "React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, REST API Integration",
    about: "Custom software development and cloud consulting company delivering scalable modern web applications and React-based platforms.",
    messageId: "<2c55a362-acce-cf26-2a2b-96a4682d3763@gmail.com>",
    notes: "Direct application sent per company career page guidelines."
  },
  {
    name: "MVP InfoTech",
    recruiter: "HR & Recruitment Team",
    email: "Hr@mvpinfotech.com, contact@mvpinfotech.com, info@mvpinfotech.com",
    phone: "N/A",
    role: "Full Stack Developer",
    location: "Hyderabad / Bengaluru (Onsite / Hybrid)",
    stack: "React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), REST APIs, MongoDB, SQL",
    about: "IT services, enterprise solutions, and software engineering consulting company providing digital transformation and web technology applications.",
    messageId: "<ededd359-923f-7b26-122f-65ea872d60ac@gmail.com>",
    notes: "Direct application sent to HR, Contact, and Info inboxes with Full Stack profile."
  },
  {
    name: "Softmason Technologies",
    recruiter: "Hiring / Talent Team",
    email: "info@softmason.com",
    phone: "N/A",
    role: "Full Stack / Web Developer (General Inquiry)",
    location: "Hyderabad / Bengaluru / Remote",
    stack: "React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, MongoDB, SQL",
    about: "Global custom software engineering, AI, and enterprise solutions company providing scalable digital products and web architectures.",
    messageId: "<5133e7ee-dac3-d475-8bf4-766a52be0bb7@gmail.com>",
    notes: "Proactive opening inquiry sent highlighting 2+ years Full Stack experience and immediate availability."
  }
];

function buildPlainText() {
  return `Murali Krishna Popuri | Complete Outreached Companies Dossier
Date of Outreach: September 17, 2026
Total Companies Contacted: ${companies.length}
Candidate Profile: Full-Stack Developer (2+ Years Professional Experience)
Notice Period: Immediate Joiner (0 Days Notice) | Location: Hyderabad (WFO Ready)
Resume Attached: Murali_Krishna_Popuri_FullStack_Developer.pdf

================================================================================
EXECUTIVE APPLICATION SUMMARY (${companies.length} COMPANIES CONTACTED)
================================================================================

${companies.map((c, i) => `
${i + 1}. ${c.name}
   - Target Role:     ${c.role}
   - Recruiter:       ${c.recruiter}
   - Recruiter Email: ${c.email}
   - Phone / WhatsApp:${c.phone}
   - Location:        ${c.location}
   - Stack Matched:   ${c.stack}
   - About Company:   ${c.about}
   - Special Notes:   ${c.notes}
   - Message ID:      ${c.messageId}
   - Status:          Delivered Successfully
`).join("\n" + "-".repeat(80) + "\n")}

================================================================================
RECRUITERS WITH DIRECT WHATSAPP NUMBERS (READY-TO-COPY)
================================================================================

1. Abdul H M Mohammed (LanceSoft India) | WhatsApp: +91 93983 10323
Hi Abdul,
I saw your LinkedIn post regarding the Full Stack Developer opening in Hyderabad.
I am a Full-Stack Developer with 2+ years of professional full-stack development experience and 8 months of project experience specializing in React.js, Node.js, and TypeScript.
I am based in Hyderabad, comfortable with Work From Office, and available to join immediately (0 days notice).
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
Please let me know if I can share my PDF resume with you here on WhatsApp.
Best regards,
Murali Krishna Popuri (+91 9347796811)

2. Angel David (BCT Consulting) | WhatsApp: +91 8754775420
Hi Angel,
I saw your LinkedIn post regarding the Full Stack Developer opening in Hyderabad.
I am a Full-Stack Developer with 2+ years of professional experience and 8 months of project experience specializing in React.js, Kafka event streaming, REST APIs, and SQL/NoSQL databases.
I am based in Hyderabad, available for face-to-face evaluation, and ready to join immediately (0 days notice).
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
Please let me know if I can share my PDF resume with you here on WhatsApp.
Best regards,
Murali Krishna Popuri (+91 9347796811)

3. Ajeeth Kumar (VySystems) | WhatsApp: +91 9150005306
Hi Ajeeth,
I saw your LinkedIn post regarding the Full Stack Developer opening in Hyderabad.
I have 2+ years of professional full-stack development experience and 8 months of project experience in Angular, React.js, TypeScript, and REST APIs.
I am based in Hyderabad and available to join immediately (0 days notice).
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
Please let me know if I can share my PDF resume with you here on WhatsApp.
Best regards,
Murali Krishna Popuri (+91 9347796811)

================================================================================
EXTERNAL CAREER PORTAL OPENINGS (TO APPLY MANUALLY)
================================================================================

1. Tradelab Technologies Pvt. Ltd. — Front-End Developer (React / Next.js / Redux)
   URL: https://lnkd.in/gdiXKC2S

2. RayVector — Software Engineer (Frontend, 1-3 Yrs, Bengaluru)
   URL: https://lnkd.in/gBMfxaVh

--------------------------------------------------------------------------------
Candidate Contact:
Murali Krishna Popuri | +91 9347796811 | popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
`;
}

function buildHtml() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Company Dossier & Applications Summary</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #0f172a;">
  <div style="max-width: 860px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Top Header -->
    <div style="background-color: #0f172a; padding: 24px 30px; border-bottom: 3px solid #0284c7;">
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
        Outreached Companies Dossier &amp; Status Report
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 13px; color: #94a3b8;">
        16 Companies Successfully Contacted | September 17, 2026 | Candidate: Murali Krishna Popuri
      </p>
    </div>

    <!-- Candidate Summary Badge -->
    <div style="background-color: #f8fafc; padding: 16px 30px; border-bottom: 1px solid #e2e8f0; font-size: 13px; line-height: 1.6; color: #334155;">
      <div><strong>Profile:</strong> Full-Stack Developer (2+ Years Professional Experience + 8 Months Hands-on Project Experience)</div>
      <div><strong>Availability:</strong> Immediate Joiner (0 Days Notice / Serving Notice Period) | <strong>Location:</strong> Hyderabad (WFO Ready)</div>
      <div><strong>Resume Attached:</strong> Murali_Krishna_Popuri_FullStack_Developer.pdf (Delivered with all emails)</div>
    </div>

    <div style="padding: 24px 30px;">

      <!-- Section: Full Dossier -->
      <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 20px 0;">
        Detailed Company Dossier (${companies.length} Companies)
      </h2>

      ${companies.map((c, i) => `
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin-bottom: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
            <div style="font-size: 16px; font-weight: 700; color: #0284c7;">
              ${i + 1}. ${c.name}
            </div>
            <span style="background-color: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px;">
              DELIVERED
            </span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 8px;">
            <tr>
              <td style="padding: 4px 0; color: #64748b; width: 140px; font-weight: 600;">Role Applied:</td>
              <td style="padding: 4px 0; font-weight: 600; color: #1e293b;">${c.role}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Recruiter:</td>
              <td style="padding: 4px 0; color: #1e293b;">${c.recruiter} &bull; <a href="mailto:${c.email}" style="color: #0284c7;">${c.email}</a></td>
            </tr>
            ${c.phone !== "N/A" ? `
            <tr>
              <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Phone / WhatsApp:</td>
              <td style="padding: 4px 0; color: #15803d; font-weight: 600;">${c.phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Location &amp; Mode:</td>
              <td style="padding: 4px 0; color: #1e293b;">${c.location}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Stack Matched:</td>
              <td style="padding: 4px 0; color: #1e293b;">${c.stack}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border-left: 3px solid #0284c7; padding: 8px 12px; font-size: 12px; color: #334155; margin-top: 6px; border-radius: 0 4px 4px 0;">
            <strong>About the Company:</strong> ${c.about}<br/>
            <strong>Special Notes:</strong> ${c.notes}
          </div>
          
          <div style="font-size: 11px; color: #94a3b8; margin-top: 8px; font-family: monospace;">
            Message ID: ${c.messageId}
          </div>
        </div>
      `).join("")}

      <!-- Section: WhatsApp Outreach -->
      <div style="margin-top: 30px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 16px 0;">
          Direct WhatsApp Follow-Up Templates
        </h2>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px; margin-bottom: 14px; font-size: 13px;">
          <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">
            1. Abdul H M Mohammed (LanceSoft India) &bull; <span style="color: #15803d;">+91 93983 10323</span>
          </div>
          <pre style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #334155; white-space: pre-wrap; margin: 6px 0 0 0;">Hi Abdul,

I saw your LinkedIn post regarding the Full Stack Developer opening in Hyderabad.

I am a Full-Stack Developer with 2+ years of professional full-stack development experience and 8 months of project experience specializing in React.js, Node.js, and TypeScript.

I am based in Hyderabad, comfortable with Work From Office, and available to join immediately (0 days notice).

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Please let me know if I can share my PDF resume with you here on WhatsApp.

Best regards,
Murali Krishna Popuri
+91 9347796811</pre>
        </div>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px; margin-bottom: 14px; font-size: 13px;">
          <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">
            2. Angel David (BCT Consulting) &bull; <span style="color: #15803d;">+91 8754775420</span>
          </div>
          <pre style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #334155; white-space: pre-wrap; margin: 6px 0 0 0;">Hi Angel,

I saw your LinkedIn post regarding the Full Stack Developer opening in Hyderabad.

I am a Full-Stack Developer with 2+ years of professional experience and 8 months of project experience specializing in React.js, Kafka event streaming, REST APIs, and SQL/NoSQL databases.

I am based in Hyderabad, available for face-to-face evaluation, and ready to join immediately (0 days notice).

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Please let me know if I can share my PDF resume with you here on WhatsApp.

Best regards,
Murali Krishna Popuri
+91 9347796811</pre>
        </div>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px; margin-bottom: 14px; font-size: 13px;">
          <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">
            3. Ajeeth Kumar (VySystems) &bull; <span style="color: #15803d;">+91 9150005306</span>
          </div>
          <pre style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #334155; white-space: pre-wrap; margin: 6px 0 0 0;">Hi Ajeeth,

I saw your LinkedIn post regarding the Full Stack Developer opening in Hyderabad.

I have 2+ years of professional full-stack development experience and 8 months of project experience in Angular, React.js, TypeScript, and REST APIs.

I am based in Hyderabad and available to join immediately (0 days notice).

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Please let me know if I can share my PDF resume with you here on WhatsApp.

Best regards,
Murali Krishna Popuri
+91 9347796811</pre>
        </div>

      </div>

      <!-- Section: Career Portal Links -->
      <div style="margin-top: 30px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 16px 0;">
          External Career Portal Openings (Direct Apply)
        </h2>
        <ul style="font-size: 13px; line-height: 1.8; color: #334155; padding-left: 20px;">
          <li>
            <strong>Tradelab Technologies Pvt. Ltd.</strong> — Front-End Developer (React.js, Next.js, Redux, Tailwind):<br/>
            <a href="https://lnkd.in/gdiXKC2S" target="_blank" style="color: #0284c7;">Open Tradelab Career Application Portal &rarr;</a>
          </li>
          <li>
            <strong>RayVector</strong> — Software Engineer – Frontend (1–3 Yrs Experience, Bengaluru):<br/>
            <a href="https://lnkd.in/gBMfxaVh" target="_blank" style="color: #0284c7;">Open RayVector Career Application Portal &rarr;</a>
          </li>
        </ul>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 30px; font-size: 12px; color: #64748b; line-height: 1.5;">
      <div><strong>Murali Krishna Popuri</strong> | Full-Stack Developer | +91 9347796811 | popurimurali16@gmail.com</div>
      <div style="margin-top: 4px;">
        Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a> &bull;
        GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a> &bull;
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
      </div>
    </div>

  </div>
</body>
</html>
  `;
}

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: TARGET_EMAIL,
  subject: `Job Applications Summary & Company Dossier: ${companies.length} Companies Contacted`,
  text: buildPlainText(),
  html: buildHtml(),
  attachments: fs.existsSync(RESUME_PATH) ? [
    {
      filename: "Murali_Krishna_Popuri_FullStack_Developer.pdf",
      path: RESUME_PATH,
    }
  ] : []
};

async function main() {
  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP connection verified successfully.");

  console.log(`Sending detailed company dossier (${companies.length} companies) to test email: ${TARGET_EMAIL}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log("SUCCESS! Company dossier email sent.");
  console.log("Message ID:", info.messageId);
}

main().catch((err) => {
  console.error("Failed to send email:", err);
  process.exit(1);
});
