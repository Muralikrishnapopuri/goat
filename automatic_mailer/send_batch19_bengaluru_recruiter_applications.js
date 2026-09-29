/**
 * BATCH 19 - BENGALURU RECRUITER APPLICATIONS (STRICT DEDUPLICATION & ANTI-SPAM)
 * Verified against sent_history.json (0 duplicates, strictly clean recruiters)
 * 
 * Target Recruiters:
 * 1. hrashish0612@gmail.com (Ashish Sharma / Sanki - Lead Full Stack Developer React/Next/Node, Bengaluru)
 * 2. hr@areteminds.com (AreteMinds Technologies - Next.js with TypeScript, Bengaluru)
 * 3. mounika.d@ideslabs.com (Mounika Doma / Ides Labs - Full Stack Engineer Node/React/AWS, Bengaluru)
 * 4. ananth.kulkarni@valuelabs.com (Ananth Kulkarni / ValueLabs - Fullstack Developer Node + React, Bengaluru)
 * 5. tausif.talent@gmail.com (Md Tausif Alam - GenAI Full-Stack Engineer React, Bengaluru)
 * 6. kashish.sharma@cvent.com (Kashish Sharma / Cvent - Fullstack Engineer React/Next/Node, Bengaluru)
 * 7. arnapurna@albireorecruiters.in (Arnapurna P. / Albireo Recruiters - Full Stack AI Engineer, Bengaluru)
 * 8. bhoomishanmuk5686@gmail.com (Bhoomika Shanmuk / Teamware Solutions - Full Stack Developer React/Node, Bengaluru)
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
    company: "Sanki",
    email: "hrashish0612@gmail.com",
    role: "Full Stack Developer (React.js / Next.js / Node.js)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Ashish Sharma,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer role at Sanki in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, MongoDB, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, MongoDB, PostgreSQL, REST APIs, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to relocate immediately to Bengaluru for full-time work.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would appreciate the opportunity to interview with your engineering team.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Ashish Sharma,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Full Stack Developer</strong> role at Sanki in Bengaluru.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, MongoDB, and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Next.js, Node.js, Express.js, TypeScript, MongoDB, PostgreSQL, REST APIs, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to relocate immediately to Bengaluru for full-time work.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I would appreciate the opportunity to interview with your engineering team.</p>
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
    company: "AreteMinds Technologies",
    email: "hr@areteminds.com",
    role: "Frontend / Full Stack Developer (Next.js & TypeScript)",
    subject: "Application for Next.js with TypeScript Developer – Murali Krishna Popuri",
    plainBody: `Dear Hiring Team at AreteMinds Technologies,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Next.js with TypeScript opening at AreteMinds Technologies in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in Next.js, React.js, TypeScript, JavaScript (ES6+), Redux, REST APIs, and responsive web performance.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: Next.js, React.js, TypeScript, JavaScript (ES6+), Redux, Node.js, REST APIs, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to relocate immediately to Bengaluru for full-time work.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I look forward to an opportunity to interview with your technical team.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Hiring Team at AreteMinds Technologies,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Next.js with TypeScript</strong> opening at AreteMinds Technologies in Bengaluru.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in Next.js, React.js, TypeScript, JavaScript (ES6+), Redux, REST APIs, and responsive web performance.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> Next.js, React.js, TypeScript, JavaScript (ES6+), Redux, Node.js, REST APIs, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to relocate immediately to Bengaluru for full-time work.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I look forward to an opportunity to interview with your technical team.</p>
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
    company: "Ides Labs",
    email: "mounika.d@ideslabs.com",
    role: "Full Stack Engineer (Node.js / React / AWS)",
    subject: "Application for Full Stack Engineer – Murali Krishna Popuri",
    plainBody: `Dear Mounika Doma,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer (Node.js / React / AWS) role at Ides Labs in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in Node.js, Express.js, React.js, TypeScript, MongoDB, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: Node.js, Express.js, React.js, TypeScript, MongoDB, PostgreSQL, REST APIs, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to relocate immediately to Bengaluru for full-time work.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I look forward to speaking with you regarding this opportunity.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Mounika Doma,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Full Stack Engineer (Node.js / React / AWS)</strong> role at Ides Labs in Bengaluru.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in Node.js, Express.js, React.js, TypeScript, MongoDB, and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> Node.js, Express.js, React.js, TypeScript, MongoDB, PostgreSQL, REST APIs, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to relocate immediately to Bengaluru for full-time work.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I look forward to speaking with you regarding this opportunity.</p>
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
    company: "ValueLabs",
    email: "ananth.kulkarni@valuelabs.com",
    role: "Fullstack Developer (Node.js & React)",
    subject: "Application for Fullstack Developer – Murali Krishna Popuri",
    plainBody: `Dear Ananth Kulkarni,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Fullstack Developer (Node.js + React) position at ValueLabs in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in Node.js, Express.js, React.js, TypeScript, REST APIs, and MongoDB.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: Node.js, Express.js, React.js, TypeScript, MongoDB, REST APIs, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to relocate immediately to Bengaluru for full-time work.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would welcome the opportunity to discuss how my full-stack development experience can contribute to ValueLabs.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Ananth Kulkarni,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Fullstack Developer (Node.js + React)</strong> position at ValueLabs in Bengaluru.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in Node.js, Express.js, React.js, TypeScript, REST APIs, and MongoDB.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> Node.js, Express.js, React.js, TypeScript, MongoDB, REST APIs, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to relocate immediately to Bengaluru for full-time work.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I would welcome the opportunity to discuss how my full-stack development experience can contribute to ValueLabs.</p>
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
    company: "Technology Recruitment",
    email: "tausif.talent@gmail.com",
    role: "Full-Stack Engineer (React & Modern APIs)",
    subject: "Application for Full-Stack Engineer – Murali Krishna Popuri",
    plainBody: `Dear Md Tausif Alam,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full-Stack Engineer position in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, and database engineering.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: React.js, Node.js, Express.js, TypeScript, MongoDB, PostgreSQL, REST APIs, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to relocate immediately to Bengaluru for full-time work.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would appreciate the opportunity to discuss my application further.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Md Tausif Alam,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Full-Stack Engineer</strong> position in Bengaluru.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, and database engineering.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Node.js, Express.js, TypeScript, MongoDB, PostgreSQL, REST APIs, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to relocate immediately to Bengaluru for full-time work.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I would appreciate the opportunity to discuss my application further.</p>
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
    company: "Cvent",
    email: "kashish.sharma@cvent.com",
    role: "Fullstack Software Engineer (React / Next.js / Node.js)",
    subject: "Application for Fullstack Software Engineer – Murali Krishna Popuri",
    plainBody: `Dear Kashish Sharma,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Fullstack Software Engineer opening at Cvent in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, JavaScript (ES6+), and TypeScript.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to relocate immediately to Bengaluru for full-time work.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would appreciate the opportunity to interview with Cvent's engineering team.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Kashish Sharma,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Fullstack Software Engineer</strong> opening at Cvent in Bengaluru.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, JavaScript (ES6+), and TypeScript.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to relocate immediately to Bengaluru for full-time work.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I would appreciate the opportunity to interview with Cvent's engineering team.</p>
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
    company: "Albireo Recruiters",
    email: "arnapurna@albireorecruiters.in",
    role: "Full Stack Engineer (React / TypeScript / AI Workflows)",
    subject: "Application for Full Stack Engineer – Murali Krishna Popuri",
    plainBody: `Dear Arnapurna P.,

I hope this email finds you well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer position at Albireo Recruiters in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, and modern AI development tools.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, PostgreSQL, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to relocate immediately to Bengaluru for full-time work.

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
  <p>Dear Arnapurna P.,</p>
  <p>I hope this email finds you well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Full Stack Engineer</strong> position at Albireo Recruiters in Bengaluru.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, and modern AI development tools.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, PostgreSQL, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to relocate immediately to Bengaluru for full-time work.</li>
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
    company: "Teamware Solutions",
    email: "bhoomishanmuk5686@gmail.com",
    role: "Full Stack Developer (React / Node / APIs)",
    subject: "Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Bhoomika Shanmuk,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing regarding the Full Stack Developer opening at Teamware Solutions in Bengaluru / Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, REST APIs, and relational databases.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Key Highlights of My Profile:
- Core Stack: React.js, Node.js, Express.js, TypeScript, REST APIs, PostgreSQL, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to join in Bengaluru or Hyderabad immediately.

Links to My Work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I look forward to speaking with your recruitment team.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Bhoomika Shanmuk,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing regarding the <strong>Full Stack Developer</strong> opening at Teamware Solutions in Bengaluru / Hyderabad.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, REST APIs, and relational databases.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Key Highlights of My Profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Node.js, Express.js, TypeScript, REST APIs, PostgreSQL, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to join in Bengaluru or Hyderabad immediately.</li>
  </ul>
  <p><strong>Links to My Work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I look forward to speaking with your recruitment team.</p>
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
  console.log("STARTING BATCH 19 DISPATCH - BENGALURU RECRUITERS");
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
  console.log("BATCH 19 DISPATCH COMPLETED");
  console.log(`Total Sent: ${sentCount}`);
  console.log(`Total Skipped: ${skippedCount}`);
  console.log("=================================================");
}

sendBatch();
