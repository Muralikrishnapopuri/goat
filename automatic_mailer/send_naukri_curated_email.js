#!/usr/bin/env node

/**
 * ============================================================
 *  🚀 Send Curated Naukri Job Links to Murali's Email
 * ============================================================
 * Recipient: popurimuralikrishna04@gmail.com
 * Content: Filtered Naukri Search & Apply Links (Hyderabad & Bengaluru)
 * Filter: 2 Years Experience | Past 24 Hours & Past 7 Days | Onsite/Hybrid
 * ============================================================
 */

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TARGET_EMAIL = "popurimuralikrishna04@gmail.com";

if (!GMAIL_APP_PASSWORD) {
  console.error("❌ ERROR: GMAIL_APP_PASSWORD is not set in .env!");
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

const naukriCategories = [
  {
    category: "Full Stack Developer (React.js + Node.js)",
    skills: "React.js, Node.js, Express, TypeScript, SQL, MongoDB",
    hyd24h: "https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?k=full%20stack%20developer%20react%20node&experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?k=full%20stack%20developer%20react%20node&experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?k=full%20stack%20developer%20react%20node&experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?k=full%20stack%20developer%20react%20node&experience=2&jobAge=7",
  },
  {
    category: "React.js / Next.js Developer",
    skills: "React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), Tailwind CSS",
    hyd24h: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7",
  },
  {
    category: "Node.js / Express Backend Developer",
    skills: "Node.js, Express.js, REST APIs, WebSockets, PostgreSQL, MySQL, SQLite, MongoDB",
    hyd24h: "https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7",
  },
  {
    category: "MERN Stack Developer",
    skills: "MongoDB, Express.js, React.js, Node.js, RESTful APIs",
    hyd24h: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7",
  },
  {
    category: "Frontend Developer (React + TypeScript)",
    skills: "React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS",
    hyd24h: "https://www.naukri.com/frontend-developer-react-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/frontend-developer-react-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/frontend-developer-react-jobs-in-bengaluru-bangalore?experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/frontend-developer-react-jobs-in-bengaluru-bangalore?experience=2&jobAge=7",
  },
  {
    category: "JavaScript / Web Developer (2 Yrs Exp)",
    skills: "JavaScript (ES6+), TypeScript, Web Development, REST APIs",
    hyd24h: "https://www.naukri.com/javascript-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/javascript-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/javascript-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/javascript-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7",
  },
];

const subject = "Curated Naukri Job Links — Hyderabad & Bengaluru (2 Yrs Experience)";

const plainBody = `Hi Murali,

Here are your curated Naukri job search links strictly filtered for your skill set (React.js, Node.js, Express, TypeScript, MERN, Full Stack) and experience level (strictly 2 years) across Hyderabad and Bengaluru.

================================================================================
1. HYDERABAD NAUKRI DIRECT JOB LINKS (2 YEARS EXPERIENCE)
================================================================================

${naukriCategories
  .map(
    (c, i) => `${i + 1}. ${c.category}
   Skills: ${c.skills}
   - Past 24 Hours: ${c.hyd24h}
   - Past 7 Days:   ${c.hyd7d}
`
  )
  .join("\n")}

================================================================================
2. BENGALURU NAUKRI DIRECT JOB LINKS (2 YEARS EXPERIENCE)
================================================================================

${naukriCategories
  .map(
    (c, i) => `${i + 1}. ${c.category}
   Skills: ${c.skills}
   - Past 24 Hours: ${c.blr24h}
   - Past 7 Days:   ${c.blr7d}
`
  )
  .join("\n")}

All links have been configured with experience=2 and job age filters so you see active openings.

Best regards,
Antigravity Agent`;

const htmlBody = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 15px; }
    h2 { color: #0052cc; border-bottom: 2px solid #e0e6ed; padding-bottom: 8px; margin-top: 25px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 16px; margin-bottom: 14px; }
    .role-title { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
    .skills { font-size: 12px; color: #475569; margin-bottom: 8px; }
    .link-row { margin-top: 6px; }
    a.btn-link { display: inline-block; padding: 4px 10px; margin-right: 8px; margin-bottom: 4px; background: #0284c7; color: #ffffff !important; text-decoration: none; border-radius: 4px; font-size: 12px; font-weight: 600; }
    a.btn-link-sec { display: inline-block; padding: 4px 10px; margin-right: 8px; margin-bottom: 4px; background: #475569; color: #ffffff !important; text-decoration: none; border-radius: 4px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <p>Hi Murali,</p>
  <p>Here are your curated <strong>Naukri direct job search links</strong> strictly filtered for your skill set (React.js, Node.js, Express, TypeScript, MERN, Full Stack) and experience level (strictly 2 years) across Hyderabad and Bengaluru.</p>

  <h2>1. Hyderabad Jobs (2 Years Experience)</h2>
  ${naukriCategories
    .map(
      (c) => `
    <div class="card">
      <div class="role-title">${c.category}</div>
      <div class="skills">Key Skills: ${c.skills}</div>
      <div class="link-row">
        <a href="${c.hyd24h}" class="btn-link" target="_blank">Past 24 Hours</a>
        <a href="${c.hyd7d}" class="btn-link-sec" target="_blank">Past 7 Days</a>
      </div>
    </div>`
    )
    .join("")}

  <h2>2. Bengaluru Jobs (2 Years Experience)</h2>
  ${naukriCategories
    .map(
      (c) => `
    <div class="card">
      <div class="role-title">${c.category}</div>
      <div class="skills">Key Skills: ${c.skills}</div>
      <div class="link-row">
        <a href="${c.blr24h}" class="btn-link" target="_blank">Past 24 Hours</a>
        <a href="${c.blr7d}" class="btn-link-sec" target="_blank">Past 7 Days</a>
      </div>
    </div>`
    )
    .join("")}

  <p style="margin-top: 25px; font-size: 13px; color: #64748b;">Generated automatically by Antigravity Mailer System.</p>
</body>
</html>`;

async function main() {
  console.log("============================================================");
  console.log("  Sending Curated Naukri Links Email to Murali");
  console.log("============================================================");
  console.log(`• Target Email: ${TARGET_EMAIL}`);
  console.log(`• Sender Email: ${SENDER_EMAIL}`);
  console.log(`• Subject:      ${subject}`);
  console.log("------------------------------------------------------------");

  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("✔ SMTP connection verified successfully.");

  console.log(`Dispatching email to: ${TARGET_EMAIL}...`);

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    subject: subject,
    text: plainBody,
    html: htmlBody,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✔ SUCCESS! Email sent successfully.`);
  console.log(`  Message ID: ${info.messageId}`);
  console.log(`  Recipient:  ${TARGET_EMAIL}`);
}

main().catch((err) => {
  console.error("❌ Execution failed:", err);
  process.exit(1);
});
