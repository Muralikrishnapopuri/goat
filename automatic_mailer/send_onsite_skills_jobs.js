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

function createLinkedInJobUrl(keywords, location, past24h = true) {
  const timeFilter = past24h ? "r86400" : "r604800";
  const params = new URLSearchParams({
    f_AL: "true",       // Easy Apply
    f_WT: "1",          // Onsite Only (Work From Office)
    f_E: "2,3",         // Entry level & Associate (Strictly <= 2-3 yrs)
    f_TPR: timeFilter,  // Past 24h or Past 7d
    keywords: `${keywords} -senior -lead -architect -principal -manager -intern`,
    location: location,
    sortBy: "DD",       // Most recent first
  });
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

function createLinkedInPostsUrl(keywords, location, past24h = true) {
  const timeFilter = past24h ? '"past-24h"' : '"past-week"';
  const query = `${keywords} AND "${location}" AND ("hiring" OR "talent acquisition" OR "send resume" OR "immediate joiner")`;
  const params = new URLSearchParams({
    datePosted: timeFilter,
    keywords: query,
    sortBy: '"date_posted"',
  });
  return `https://www.linkedin.com/search/results/content/?${params.toString()}`;
}

const roles = [
  {
    roleName: "Full Stack Developer",
    keySkills: "React.js, Node.js, Express, TypeScript, SQL, MongoDB, REST APIs",
    hydLinkedIn24h: createLinkedInJobUrl("Full Stack Developer", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("Full Stack Developer", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("Full Stack Developer", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("Full Stack Developer", "Bengaluru, Karnataka, India", false),
    hydPosts24h: createLinkedInPostsUrl('"Full Stack Developer" AND "React" AND "Node"', "Hyderabad", true),
    blrPosts24h: createLinkedInPostsUrl('"Full Stack Developer" AND "React" AND "Node"', "Bangalore", true),
    hydNaukri24h: "https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    roleName: "React.js Developer",
    keySkills: "React.js, Next.js, Redux, JavaScript (ES6+), TypeScript, Tailwind CSS",
    hydLinkedIn24h: createLinkedInJobUrl("React.js Developer", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("React.js Developer", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("React.js Developer", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("React.js Developer", "Bengaluru, Karnataka, India", false),
    hydPosts24h: createLinkedInPostsUrl('"React.js" AND ("TypeScript" OR "JavaScript")', "Hyderabad", true),
    blrPosts24h: createLinkedInPostsUrl('"React.js" AND ("TypeScript" OR "Redux")', "Bangalore", true),
    hydNaukri24h: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    roleName: "Node.js Developer",
    keySkills: "Node.js, Express.js, REST APIs, Microservices, SQL, MongoDB, Kafka",
    hydLinkedIn24h: createLinkedInJobUrl("Node.js Developer", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("Node.js Developer", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("Node.js Developer", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("Node.js Developer", "Bengaluru, Karnataka, India", false),
    hydPosts24h: createLinkedInPostsUrl('"Node.js" AND "Express"', "Hyderabad", true),
    blrPosts24h: createLinkedInPostsUrl('"Node.js" AND ("PostgreSQL" OR "MongoDB")', "Bangalore", true),
    hydNaukri24h: "https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    roleName: "MERN Stack Developer",
    keySkills: "MongoDB, Express.js, React.js, Node.js, REST APIs",
    hydLinkedIn24h: createLinkedInJobUrl("MERN Stack Developer", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("MERN Stack Developer", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("MERN Stack Developer", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("MERN Stack Developer", "Bengaluru, Karnataka, India", false),
    hydPosts24h: createLinkedInPostsUrl('"MERN Stack"', "Hyderabad", true),
    blrPosts24h: createLinkedInPostsUrl('"MERN Stack"', "Bangalore", true),
    hydNaukri24h: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    roleName: "JavaScript / TypeScript Developer",
    keySkills: "JavaScript (ES6+), TypeScript, Web Development, Frontend / Backend, HTML5, CSS3",
    hydLinkedIn24h: createLinkedInJobUrl("JavaScript Developer", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("JavaScript Developer", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("JavaScript Developer", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("JavaScript Developer", "Bengaluru, Karnataka, India", false),
    hydPosts24h: createLinkedInPostsUrl('"JavaScript Developer" OR "TypeScript Developer"', "Hyderabad", true),
    blrPosts24h: createLinkedInPostsUrl('"JavaScript Developer" OR "TypeScript Developer"', "Bangalore", true),
    hydNaukri24h: "https://www.naukri.com/javascript-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/javascript-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/javascript-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/javascript-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    roleName: "Software Engineer (Full Stack)",
    keySkills: "Software Engineering, Full Stack Web, React, Node, REST APIs, Git",
    hydLinkedIn24h: createLinkedInJobUrl("Software Engineer React Node", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("Software Engineer React Node", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("Software Engineer React Node", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("Software Engineer React Node", "Bengaluru, Karnataka, India", false),
    hydPosts24h: createLinkedInPostsUrl('"Software Engineer" AND ("React" OR "Node")', "Hyderabad", true),
    blrPosts24h: createLinkedInPostsUrl('"Software Engineer" AND ("React" OR "Node")', "Bangalore", true),
    hydNaukri24h: "https://www.naukri.com/software-engineer-jobs-in-hyderabad-secunderabad?k=software%20engineer%20react%20node&experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/software-engineer-jobs-in-hyderabad-secunderabad?k=software%20engineer%20react%20node&experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/software-engineer-jobs-in-bengaluru-bangalore?k=software%20engineer%20react%20node&experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/software-engineer-jobs-in-bengaluru-bangalore?k=software%20engineer%20react%20node&experience=2&jobAge=7&wfhType=0",
  },
];

const hrLeads = [
  {
    company: "DPR Solutions Inc",
    recruiter: "Shanmuka kumari Boddu",
    email: "shanmukakumari.boddu@dprsolutionsinc.com",
    role: "Full Stack Developer",
    location: "Hyderabad (Onsite)",
    stack: "React.js, Kafka, REST APIs, Microservices, SQL/NoSQL, Git",
    phone: "N/A",
  },
  {
    company: "LanceSoft India",
    recruiter: "Abdul H M Mohammed",
    email: "abdulhakeem.md@lancesoft.in",
    role: "Full Stack Developer",
    location: "Hyderabad (Work From Office)",
    stack: "React.js, RESTful Web Services, Microservices, SQL",
    phone: "+91 93983 10323",
    whatsappMsg: "Hello Abdul, I came across the Full Stack Developer opening in Hyderabad at LanceSoft. I have 2+ years of professional full-stack development experience and 8 months of project experience in React.js, Node.js, and TypeScript. I am currently serving notice and available to join immediately (0 days notice). You can view my work at https://murali-portfolio-website.vercel.app and https://github.com/Muralikrishnapopuri. My LinkedIn is https://linkedin.com/in/murali-krishna-popuri. I would be glad to share my PDF resume with you here.",
  },
  {
    company: "Bahwan CyberTek (BCT Consulting)",
    recruiter: "Yuva Rani S",
    email: "Yuvarani.s@bct-consulting.com",
    role: "Full Stack Developer",
    location: "Hyderabad / Bangalore (Onsite/Hybrid)",
    stack: "React.js, Angular, REST APIs, Microservices, SQL",
    phone: "N/A",
  },
  {
    company: "Implere Technologies",
    recruiter: "Nikitha Gokaraju",
    email: "nikitha.g@impleretech.com",
    role: "JavaScript AI Developer / Full-Stack AI Engineer",
    location: "Hyderabad (Work From Office)",
    stack: "JavaScript, React.js, Node.js, Express, REST APIs, LLMs, RAG",
    phone: "N/A",
  },
  {
    company: "Onzestt Technologies",
    recruiter: "Prajna N S",
    email: "trainee1@onzestt.com",
    role: "Full Stack Developer",
    location: "Hyderabad (Onsite)",
    stack: "React.js, JavaScript, Node.js, SQL & NoSQL, Docker",
    phone: "N/A",
  },
  {
    company: "Potla Tech Solutions Pvt. Ltd.",
    recruiter: "Kousalya Thatipudi / Akhila Rao Janjala",
    email: "kousalya@potlatechsolutions.com, akhila@potlatechsolutions.com",
    role: "Full Stack Developer",
    location: "Hyderabad (WFO Mandatory)",
    stack: "React.js, JavaScript, REST APIs, Microservices, SQL",
    phone: "N/A",
  },
  {
    company: "PCRA Technologies Pvt Ltd",
    recruiter: "HR Team",
    email: "hr@pcratechnologies.com",
    role: "Full-Stack Developer (2-4 Years)",
    location: "Hyderabad (Hitech City, Onsite)",
    stack: "React.js, Node.js, REST APIs, SQL",
    phone: "N/A",
  },
  {
    company: "CloudSoft Solutions",
    recruiter: "Talent Acquisition",
    email: "careers@cloudsoftsol.com",
    role: "MERN Stack Developer (2+ Years)",
    location: "Hyderabad (Gachibowli, Onsite)",
    stack: "React.js, Node.js, Express.js, MongoDB, MySQL",
    phone: "N/A",
  },
  {
    company: "CredibleSoft IT Solutions",
    recruiter: "Talent Acquisition",
    email: "careers@crediblesoft.com",
    role: "Full-Stack Web Engineer (2+ Years)",
    location: "Bengaluru (Electronic City, Onsite)",
    stack: "React.js, Node.js, TypeScript, PostgreSQL, Kafka",
    phone: "N/A",
  },
  {
    company: "Webmoon Technologies",
    recruiter: "Recruitment Team",
    email: "careers@webmoon.co.in",
    role: "React.js / Frontend Developer (2-3 Years)",
    location: "Bengaluru (HSR Layout, Onsite)",
    stack: "React.js, TypeScript, Redux, Tailwind CSS, HTML5",
    phone: "N/A",
  },
];

function buildPlainText() {
  let text = `Murali Krishna Popuri | Onsite Job Apply Links & HR Posts
Candidate: Murali Krishna Popuri (+91 9347796811 | popurimurali16@gmail.com)
Experience: 2+ Years Professional Full-Stack Experience (+ 8 Months Project Experience)
Status: Immediate Joiner (0 Days Notice)
Core Skills: React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), MERN Stack, PostgreSQL, MongoDB, MySQL, Kafka, REST APIs, PHP
Filters Applied: Onsite Only (Work From Office) | Strictly <= 2-3 Years Experience | Hyderabad & Bengaluru Only
Resume Attached: Murali_Krishna_Popuri_FullStack_Developer.pdf

================================================================================
1. LINKEDIN EASY APPLY DIRECT LINKS (ONSITE ONLY, 2-3 YRS)
================================================================================
`;

  roles.forEach((r, i) => {
    text += `
${i + 1}. ${r.roleName}
   Skills: ${r.keySkills}
   Hyderabad (Onsite):
   - Past 24 Hours: ${r.hydLinkedIn24h}
   - Past 7 Days:   ${r.hydLinkedIn7d}
   Bengaluru (Onsite):
   - Past 24 Hours: ${r.blrLinkedIn24h}
   - Past 7 Days:   ${r.blrLinkedIn7d}
`;
  });

  text += `
================================================================================
2. LINKEDIN RECRUITER & TALENT ACQUISITION HIRING POSTS (PAST 24 HOURS)
================================================================================
`;

  roles.forEach((r, i) => {
    text += `
${i + 1}. ${r.roleName} Hiring Posts:
   - Hyderabad Posts (24h): ${r.hydPosts24h}
   - Bengaluru Posts (24h): ${r.blrPosts24h}
`;
  });

  text += `
================================================================================
3. NAUKRI DIRECT SEARCH LINKS (2 YEARS EXP, WORK FROM OFFICE / ONSITE)
================================================================================
`;

  roles.forEach((r, i) => {
    text += `
${i + 1}. ${r.roleName}
   Hyderabad (Onsite):
   - Past 24 Hours: ${r.hydNaukri24h}
   - Past 7 Days:   ${r.hydNaukri7d}
   Bengaluru (Onsite):
   - Past 24 Hours: ${r.blrNaukri24h}
   - Past 7 Days:   ${r.blrNaukri7d}
`;
  });

  text += `
================================================================================
4. VERIFIED ACTIVE HR & TALENT ACQUISITION LEADS (100% SKILL-MATCHED)
================================================================================
`;

  hrLeads.forEach((l, i) => {
    text += `
${i + 1}. Company: ${l.company}
   Role: ${l.role}
   Location: ${l.location}
   Recruiter: ${l.recruiter}
   Email: ${l.email}
   Tech Stack: ${l.stack}
   Phone / WhatsApp: ${l.phone}
`;
    if (l.whatsappMsg) {
      text += `   Ready-to-Copy WhatsApp Message:
   ${l.whatsappMsg}
`;
    }
  });

  text += `
--------------------------------------------------------------------------------
Candidate Profile:
Murali Krishna Popuri | +91 9347796811 | popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
`;

  return text;
}

function buildHtml() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Onsite Skill-Matched Job Links & Recruiter Posts</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #0f172a;">
  <div style="max-width: 900px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Header -->
    <div style="background-color: #0f172a; padding: 24px 30px; border-bottom: 3px solid #0284c7;">
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
        Onsite Skill-Matched Job Links & Recruiter Posts
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 13px; color: #94a3b8;">
        LinkedIn Easy Apply &bull; Recruiter Posts &bull; Naukri WFO &bull; Hyderabad &amp; Bengaluru &bull; Last 24 Hours
      </p>
    </div>

    <!-- Candidate Parameters Badge -->
    <div style="background-color: #f8fafc; padding: 16px 30px; border-bottom: 1px solid #e2e8f0; font-size: 13px; line-height: 1.6; color: #334155;">
      <div><strong>Target Candidate:</strong> Murali Krishna Popuri (2+ Years Professional Full-Stack Experience)</div>
      <div><strong>Strict Filters:</strong> Onsite / Work From Office Only &bull; Strictly 2-3 Years &bull; Hyderabad &amp; Bengaluru Only</div>
      <div><strong>Core Stack:</strong> React.js, Node.js, Express, TypeScript, JavaScript (ES6+), MERN, SQL, MongoDB, Kafka, PHP</div>
      <div><strong>Resume Attached:</strong> Murali_Krishna_Popuri_FullStack_Developer.pdf</div>
    </div>

    <div style="padding: 24px 30px;">

      <!-- SECTION 1: LINKEDIN EASY APPLY (HYDERABAD) -->
      <div style="margin-bottom: 32px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 14px 0;">
          1. Hyderabad: LinkedIn Easy Apply Links (Onsite Only, 2-3 Yrs) [Preferred]
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Role Designation</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Matched Skills</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 110px;">Past 24 Hours</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 110px;">Past 7 Days</th>
            </tr>
          </thead>
          <tbody>
            ${roles.map(r => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 10px; font-weight: 600; color: #1e293b;">${r.roleName}</td>
                <td style="padding: 10px 10px; color: #64748b; font-size: 12px;">${r.keySkills}</td>
                <td style="padding: 10px 10px;">
                  <a href="${r.hydLinkedIn24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Apply (24h) &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${r.hydLinkedIn7d}" target="_blank" style="color: #475569; text-decoration: underline;">Apply (7d) &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- SECTION 2: LINKEDIN EASY APPLY (BENGALURU) -->
      <div style="margin-bottom: 32px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 14px 0;">
          2. Bengaluru: LinkedIn Easy Apply Links (Onsite Only, 2-3 Yrs)
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Role Designation</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Matched Skills</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 110px;">Past 24 Hours</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 110px;">Past 7 Days</th>
            </tr>
          </thead>
          <tbody>
            ${roles.map(r => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 10px; font-weight: 600; color: #1e293b;">${r.roleName}</td>
                <td style="padding: 10px 10px; color: #64748b; font-size: 12px;">${r.keySkills}</td>
                <td style="padding: 10px 10px;">
                  <a href="${r.blrLinkedIn24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Apply (24h) &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${r.blrLinkedIn7d}" target="_blank" style="color: #475569; text-decoration: underline;">Apply (7d) &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- SECTION 3: LINKEDIN RECRUITER & HR POSTS (PAST 24 HOURS) -->
      <div style="margin-bottom: 32px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 14px 0;">
          3. LinkedIn Recruiter &amp; Talent Acquisition Hiring Posts (Past 24 Hours)
        </h2>
        <p style="font-size: 12px; color: #64748b; margin: 0 0 12px 0;">
          Live feeds of posts by recruiters and HR personnel hiring directly for your exact skills.
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Track / Role</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 160px;">Hyderabad Posts (24h)</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 160px;">Bengaluru Posts (24h)</th>
            </tr>
          </thead>
          <tbody>
            ${roles.map(r => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 10px; font-weight: 600; color: #1e293b;">${r.roleName}</td>
                <td style="padding: 10px 10px;">
                  <a href="${r.hydPosts24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Hyd HR Posts &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${r.blrPosts24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Blr HR Posts &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- SECTION 4: NAUKRI DIRECT SEARCH (WFO / ONSITE) -->
      <div style="margin-bottom: 32px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 14px 0;">
          4. Naukri Direct Search Links (2 Years Exp, Work From Office / Onsite)
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Role Designation</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 140px;">Hyderabad (24h)</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 140px;">Hyderabad (7d)</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 140px;">Bengaluru (24h)</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 140px;">Bengaluru (7d)</th>
            </tr>
          </thead>
          <tbody>
            ${roles.map(r => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 10px; font-weight: 600; color: #1e293b;">${r.roleName}</td>
                <td style="padding: 10px 10px;">
                  <a href="${r.hydNaukri24h}" target="_blank" style="color: #0284c7; text-decoration: underline;">Hyd 24h &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${r.hydNaukri7d}" target="_blank" style="color: #475569; text-decoration: underline;">Hyd 7d &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${r.blrNaukri24h}" target="_blank" style="color: #0284c7; text-decoration: underline;">Blr 24h &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${r.blrNaukri7d}" target="_blank" style="color: #475569; text-decoration: underline;">Blr 7d &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- SECTION 5: VERIFIED ACTIVE HR OPENINGS -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 14px 0;">
          5. Verified Active HR &amp; Talent Acquisition Openings (100% Skill-Matched)
        </h2>
        <div style="display: grid; grid-template-columns: 1fr; gap: 14px;">
          ${hrLeads.map((l, i) => `
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 18px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                <span style="font-weight: 700; font-size: 14px; color: #0f172a;">${i + 1}. ${l.company}</span>
                <span style="font-size: 12px; color: #0284c7; font-weight: 600;">${l.location}</span>
              </div>
              <div style="font-size: 13px; color: #334155; margin-bottom: 4px;"><strong>Role:</strong> ${l.role}</div>
              <div style="font-size: 13px; color: #334155; margin-bottom: 4px;"><strong>Target Email:</strong> <a href="mailto:${l.email}" style="color: #0284c7;">${l.email}</a></div>
              <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;"><strong>Skills:</strong> ${l.stack}</div>
              ${l.phone !== "N/A" ? `<div style="font-size: 12px; color: #166534; font-weight: 600; margin-top: 4px;">WhatsApp Contact: ${l.phone}</div>` : ""}
              ${l.whatsappMsg ? `
                <div style="margin-top: 8px; background-color: #ffffff; border: 1px dashed #cbd5e1; border-radius: 4px; padding: 10px; font-size: 12px; color: #1e293b; font-family: monospace; white-space: pre-wrap;">${l.whatsappMsg}</div>
              ` : ""}
            </div>
          `).join("")}
        </div>
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
  subject: "Latest Onsite Job Apply Feeds: LinkedIn Easy Apply, Recruiter Posts & Naukri (Hyd & Blr)",
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
  console.log("SMTP verified.");

  console.log(`Sending onsite skill-matched job links & posts to: ${TARGET_EMAIL}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log("SUCCESS! Email sent.");
  console.log("Message ID:", info.messageId);
}

main().catch((err) => {
  console.error("Failed to send email:", err);
  process.exit(1);
});
