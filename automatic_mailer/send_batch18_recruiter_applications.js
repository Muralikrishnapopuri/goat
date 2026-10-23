/**
 * BATCH 18 - FRESH RECRUITER APPLICATIONS (STRICT ANTI-DUPLICATION & ANTI-SPAM)
 * Verified against sent_history.json (0 duplicates, strictly clean recruiters)
 * 
 * Target Recruiters:
 * 1. connect@octavolab.com (OctavoLab - Full Stack Engineer, 2-4 yrs, Hyderabad)
 * 2. aravind.m@abilioit.com (Abilio IT - AI Full Stack Engineer, 2-6 yrs MERN, Hyderabad)
 * 3. mpraveen@satussmart.com (Satus Smart Solutions - Sr. Full Stack MERN, 3-7 yrs, Hyderabad)
 * 4. officialuserecruitment@gmail.com (Santha Suvami Parida - MERN Full Stack, Hyderabad)
 * 5. siya.thakur@programming.com (Programming.com - Senior Software Engineer Full Stack, Hyderabad/Bangalore)
 * 6. jaisika.batra@programming.com (Programming.com - Senior Software Engineer Full Stack, Hyderabad)
 * 7. info@uhvsoftwaresolutions.com (UHV Software Solutions - Full Stack Engineer, Hyderabad)
 * 8. varshithamm@petadata.ai (PETADATA / SFTECH - Full Stack Developer, Hyderabad)
 */

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RESUME_PATH = path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf");
const HISTORY_FILE = path.join(__dirname, "sent_history.json");

if (!GMAIL_APP_PASSWORD) {
  console.error("FATAL: GMAIL_APP_PASSWORD is not set in .env!");
  process.exit(1);
}

if (!fs.existsSync(RESUME_PATH)) {
  console.error("FATAL: Resume PDF not found at:", RESUME_PATH);
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

function loadHistory() {
  if (!fs.existsSync(HISTORY_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
  } catch (err) {
    return [];
  }
}

function isAlreadySent(email, history) {
  const norm = email.toLowerCase().trim();
  return history.some(
    (h) => ((h.recipientEmail || h.email || "").toLowerCase().trim() === norm) && h.status === "SENT"
  );
}

function recordSent(email, company, role, messageId) {
  const history = loadHistory();
  history.push({
    timestamp: new Date().toISOString(),
    recipientEmail: email.toLowerCase().trim(),
    company,
    role,
    status: "SENT",
    messageId,
    resumeAttachment: path.basename(RESUME_PATH),
  });
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
  console.log(`Recorded ${email} in sent_history.json`);
}

function getRandomDelay(minSec = 45, maxSec = 65) {
  return Math.floor(Math.random() * (maxSec - minSec + 1) + minSec) * 1000;
}

const leads = [
  {
    company: "OctavoLab",
    email: "connect@octavolab.com",
    role: "Full Stack Engineer",
    subject: "Full Stack Engineer, Murali Krishna Popuri, Immediate Joiner",
    plainBody: `Dear Hiring Team at OctavoLab,

I hope this email finds you well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer position at OctavoLab in Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, and state management.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: React.js, Next.js, TypeScript, Node.js, Express.js, PostgreSQL, REST APIs, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to work onsite/hybrid in Hyderabad immediately.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would welcome the opportunity to discuss how my full-stack engineering skills can contribute to building OctavoLab's healthcare platforms.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Hiring Team at OctavoLab,</p>
  <p>I hope this email finds you well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Full Stack Engineer</strong> position at OctavoLab in Hyderabad.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, and state management.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Next.js, TypeScript, Node.js, Express.js, PostgreSQL, REST APIs, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to work onsite/hybrid in Hyderabad immediately.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I would welcome the opportunity to discuss how my full-stack engineering skills can contribute to building OctavoLab's healthcare platforms.</p>
  <p>Thank you for your time and consideration.</p>
  <p style="margin-bottom: 0;">Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Email: popurimurali16@gmail.com<br>
  Phone: +91 9347796811</p>
  <p style="margin-top: 24px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "Abilio IT",
    email: "aravind.m@abilioit.com",
    role: "AI Full Stack Engineer",
    subject: "Application for AI Full Stack Engineer – Murali Krishna Popuri",
    plainBody: `Dear Msv Aravind,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to express my strong interest in the AI Full Stack Engineer position at Abilio IT in Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js), TypeScript, Redux, REST APIs, and modern AI developer workflows.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: MongoDB, Express.js, React.js, Node.js, Redux, TypeScript, REST APIs, Git.
- AI & Modern Tooling: Strong hands-on exposure to agentic AI workflows, LLM integrations, and AI coding assistants including Antigravity, Claude, and GitHub Copilot.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to join onsite in Hyderabad immediately.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would welcome the opportunity to discuss how my full-stack engineering and AI-assisted tooling experience align with Abilio IT's technical roadmap.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Msv Aravind,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to express my strong interest in the <strong>AI Full Stack Engineer</strong> position at Abilio IT in Hyderabad.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js), TypeScript, Redux, REST APIs, and modern AI developer workflows.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> MongoDB, Express.js, React.js, Node.js, Redux, TypeScript, REST APIs, Git.</li>
    <li><strong>AI & Modern Tooling:</strong> Hands-on exposure to agentic workflows, LLM integrations, and AI coding assistants including Antigravity, Claude, and GitHub Copilot.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to join onsite in Hyderabad immediately.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I would welcome the opportunity to discuss how my full-stack engineering and AI-assisted tooling experience align with Abilio IT's technical roadmap.</p>
  <p>Thank you for your time and consideration.</p>
  <p style="margin-bottom: 0;">Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Email: popurimurali16@gmail.com<br>
  Phone: +91 9347796811</p>
  <p style="margin-top: 24px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "Satus Smart Solutions",
    email: "mpraveen@satussmart.com",
    role: "Full Stack (MERN) Developer",
    subject: "Application for Full Stack (MERN) Developer – Murali Krishna Popuri",
    plainBody: `Dear Praveen M.,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack (MERN) Developer position at Satus Smart Solutions in Hyderabad.

I have strictly 2 years of professional software engineering experience building scalable web applications with React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), and TypeScript.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: MongoDB, Express.js, React.js, Node.js, TypeScript, REST APIs, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to work in Hyderabad immediately.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would appreciate the opportunity to interview with your technical team.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Praveen M.,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Full Stack (MERN) Developer</strong> position at Satus Smart Solutions in Hyderabad.</p>
  <p>I have strictly 2 years of professional software engineering experience building scalable web applications with React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), and TypeScript.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> MongoDB, Express.js, React.js, Node.js, TypeScript, REST APIs, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to work in Hyderabad immediately.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I would appreciate the opportunity to interview with your technical team.</p>
  <p>Thank you for your time and consideration.</p>
  <p style="margin-bottom: 0;">Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Email: popurimurali16@gmail.com<br>
  Phone: +91 9347796811</p>
  <p style="margin-top: 24px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "Executive Recruitment",
    email: "officialuserecruitment@gmail.com",
    role: "MERN Stack / Fullstack Developer",
    subject: "Application for MERN Stack / Fullstack Developer – Murali Krishna Popuri",
    plainBody: `Dear Santha Suvami Parida,

I hope this email finds you well.

My name is Murali Krishna Popuri, and I am writing regarding your opening for a MERN Stack / Fullstack Developer (React & Node.js) in Hyderabad/Hybrid.

I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), and TypeScript.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), TypeScript, REST APIs, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to work in Hyderabad / Hybrid immediately.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I look forward to hearing from you.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Santha Suvami Parida,</p>
  <p>I hope this email finds you well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing regarding your opening for a <strong>MERN Stack / Fullstack Developer (React & Node.js)</strong> in Hyderabad/Hybrid.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), and TypeScript.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), TypeScript, REST APIs, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to work in Hyderabad / Hybrid immediately.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I look forward to hearing from you.</p>
  <p>Thank you for your time and consideration.</p>
  <p style="margin-bottom: 0;">Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Email: popurimurali16@gmail.com<br>
  Phone: +91 9347796811</p>
  <p style="margin-top: 24px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "Programming.com",
    email: "siya.thakur@programming.com",
    role: "Full Stack Engineer (React / Node / AWS)",
    subject: "Application for Full Stack Engineer (React / Node / AWS) – Murali Krishna Popuri",
    plainBody: `Dear Siya Thakur,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer position at Programming.com in Hyderabad / Bangalore.

I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, REST APIs, and modern cloud-connected applications.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: React.js, Node.js, Express.js, TypeScript, REST APIs, PostgreSQL/MongoDB, Git.
- Developer Tooling: Proficient with AI coding assistants (Claude Code, Cursor, Copilot) to accelerate delivery and ensure clean, tested code.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to join in Hyderabad immediately.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would welcome the opportunity to discuss how my full-stack background can support your engineering initiatives.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Siya Thakur,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Full Stack Engineer</strong> position at Programming.com in Hyderabad / Bangalore.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, REST APIs, and modern cloud-connected applications.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Node.js, Express.js, TypeScript, REST APIs, PostgreSQL/MongoDB, Git.</li>
    <li><strong>Developer Tooling:</strong> Proficient with AI coding assistants (Claude Code, Cursor, Copilot) to accelerate delivery and ensure clean, tested code.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to join in Hyderabad immediately.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I would welcome the opportunity to discuss how my full-stack background can support your engineering initiatives.</p>
  <p>Thank you for your time and consideration.</p>
  <p style="margin-bottom: 0;">Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Email: popurimurali16@gmail.com<br>
  Phone: +91 9347796811</p>
  <p style="margin-top: 24px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "Programming.com",
    email: "jaisika.batra@programming.com",
    role: "Full Stack Engineer (Network Tech)",
    subject: "Application for Full Stack Engineer – Murali Krishna Popuri",
    plainBody: `Dear Jaisika Batra,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to express my interest in the Full Stack Engineer role at Programming.com in Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, REST APIs, and distributed architectures.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: React.js, Node.js, Express.js, TypeScript, REST APIs, MongoDB, PostgreSQL, Git.
- Real-Time & Event Architecture: Experience with local network synchronization, WebSockets, and state consistency.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to join in Hyderabad immediately.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I look forward to speaking with your engineering team.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Jaisika Batra,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to express my interest in the <strong>Full Stack Engineer</strong> role at Programming.com in Hyderabad.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, REST APIs, and distributed architectures.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Node.js, Express.js, TypeScript, REST APIs, MongoDB, PostgreSQL, Git.</li>
    <li><strong>Real-Time & Event Architecture:</strong> Experience with local network synchronization, WebSockets, and state consistency.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to join in Hyderabad immediately.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I look forward to speaking with your engineering team.</p>
  <p>Thank you for your time and consideration.</p>
  <p style="margin-bottom: 0;">Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Email: popurimurali16@gmail.com<br>
  Phone: +91 9347796811</p>
  <p style="margin-top: 24px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "UHV Software Solutions",
    email: "info@uhvsoftwaresolutions.com",
    role: "Full Stack Engineer",
    subject: "Full Stack Engineer – Hyderabad - Murali Krishna Popuri",
    plainBody: `Dear Hiring Team at UHV Software Solutions,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am applying for the Full Stack Engineer position at UHV Software Solutions in Hyderabad (Hybrid).

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, JavaScript, TypeScript, REST APIs, and relational databases.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Details Requested:
- Current CTC: Available upon request
- Expected CTC: Negotiable based on role and standards
- Notice Period / Last Working Day: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Current Location: Vijayawada, Andhra Pradesh (Available to relocate to Hyderabad immediately for full-time hybrid/onsite work)
- Core Stack: React.js, Next.js, TypeScript, Node.js, Express.js, PostgreSQL/MySQL, REST APIs, Git

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I look forward to an opportunity to interview with your team.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Hiring Team at UHV Software Solutions,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am applying for the <strong>Full Stack Engineer</strong> position at UHV Software Solutions in Hyderabad (Hybrid).</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, JavaScript, TypeScript, REST APIs, and relational databases.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Details Requested:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Notice Period / Last Working Day:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Vijayawada, Andhra Pradesh (Available to relocate to Hyderabad immediately for full-time hybrid/onsite work).</li>
    <li><strong>Core Stack:</strong> React.js, Next.js, TypeScript, Node.js, Express.js, PostgreSQL/MySQL, REST APIs, Git.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I look forward to an opportunity to interview with your team.</p>
  <p>Thank you for your time and consideration.</p>
  <p style="margin-bottom: 0;">Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Email: popurimurali16@gmail.com<br>
  Phone: +91 9347796811</p>
  <p style="margin-top: 24px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "PETADATA / SFTECH",
    email: "varshithamm@petadata.ai",
    role: "Full Stack Developer",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Medisetti Varshitha,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer role at PETADATA in Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, and database architecture.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: React.js, Next.js, TypeScript, Node.js, Express.js, PostgreSQL, MongoDB, REST APIs, Git.
- AI Workflows: Experienced with AI-assisted coding and agentic workflows to increase development velocity and software quality.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to join in Hyderabad immediately.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would appreciate the opportunity to discuss how my technical expertise can support PETADATA.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Medisetti Varshitha,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Full Stack Developer</strong> role at PETADATA in Hyderabad.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, and database architecture.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Next.js, TypeScript, Node.js, Express.js, PostgreSQL, MongoDB, REST APIs, Git.</li>
    <li><strong>AI Workflows:</strong> Experienced with AI-assisted coding and agentic workflows to increase development velocity and software quality.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to join in Hyderabad immediately.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I would appreciate the opportunity to discuss how my technical expertise can support PETADATA.</p>
  <p>Thank you for your time and consideration.</p>
  <p style="margin-bottom: 0;">Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Email: popurimurali16@gmail.com<br>
  Phone: +91 9347796811</p>
  <p style="margin-top: 24px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  }
];

async function sendBatch() {
  console.log("=================================================");
  console.log("STARTING BATCH 18 DISPATCH - RECRUITER APPLICATIONS");
  console.log(`Sender: ${SENDER_EMAIL}`);
  console.log(`Resume: ${RESUME_PATH}`);
  console.log(`Total Leads to Process: ${leads.length}`);
  console.log("=================================================\n");

  const history = loadHistory();
  let sentCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`\n--- [${i + 1}/${leads.length}] Checking: ${lead.email} (${lead.company}) ---`);

    if (isAlreadySent(lead.email, history)) {
      console.log(`[SKIP - DUPLICATE]: Email already recorded in sent_history.json for ${lead.email}`);
      skippedCount++;
      continue;
    }

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: lead.email,
      replyTo: SENDER_EMAIL,
      subject: lead.subject,
      text: lead.plainBody,
      html: lead.htmlBody,
      attachments: [
        {
          filename: "Murali_Krishna_Popuri_FullStack_Developer.pdf",
          path: RESUME_PATH,
          contentType: "application/pdf",
        },
      ],
      headers: {
        "X-Mailer": "Apple Mail (2.3654.120.0.1)",
        Importance: "Normal",
        "X-Priority": "3",
      },
    };

    try {
      console.log(`Dispatching to ${lead.email}...`);
      const info = await transporter.sendMail(mailOptions);
      console.log(`SUCCESS! Message ID: ${info.messageId}`);
      recordSent(lead.email, lead.company, lead.role, info.messageId);
      sentCount++;

      // If more emails remain in this batch, wait anti-spam randomized delay
      if (i < leads.length - 1) {
        const delay = getRandomDelay(45, 65);
        console.log(`Waiting ${(delay / 1000).toFixed(1)}s (anti-spam human jitter delay) before next dispatch...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (err) {
      console.error(`ERROR sending to ${lead.email}:`, err.message);
    }
  }

  console.log("\n=================================================");
  console.log("BATCH 18 DISPATCH COMPLETED");
  console.log(`Total Sent: ${sentCount}`);
  console.log(`Total Skipped: ${skippedCount}`);
  console.log("=================================================");
}

sendBatch();
