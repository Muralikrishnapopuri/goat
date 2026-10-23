/**
 * DISPATCH BATCH 13 FRESH RECRUITER APPLICATIONS - BENGALURU
 * Compliant with AGENTS.md and Email_template.pdf reference:
 * - 2 years strictly professional experience
 * - YoungMinds / RestoSoft 2-line context
 * - Fast learning proof (Electron.js within a week)
 * - Immediate joiner (LWD Nov 11, negotiable for immediate early release)
 * - Relocation: Immediate to Bengaluru or Hyderabad
 * - Exactly 4 permitted links
 * - Resume PDF attached
 * - Zero emojis
 * - Standard Apple Mail headers & polite opt-out footnote
 * - Deduplication against sent_history.json
 * - Randomized 45s-65s human delay
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
  return history.some((h) => (h.recipientEmail || "").toLowerCase().trim() === norm && h.status === "SENT");
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
  console.log(`Recorded to sent history (${HISTORY_FILE})`);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomDelay(minSec = 45, maxSec = 65) {
  return Math.floor(Math.random() * (maxSec - minSec + 1) + minSec) * 1000;
}

const leads = [
  {
    company: "Vingo",
    recruiterName: "Hiring Team",
    email: "careers@justvingo.com",
    role: "Full Stack Engineer (TypeScript, Node.js, React/Next.js, PostgreSQL)",
    subject: "Application for Full Stack Engineer – Murali Krishna Popuri",
    plainText: `Dear Hiring Team,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer role at Vingo in Koramangala, Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), and PostgreSQL.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Your emphasis on first-principles debugging, high ownership, and valuing how an engineer thinks and builds resonates strongly with me. When starting RestoSoft with no prior Electron background, I mastered Electron.js and local LAN synchronization within a single week to architect and ship a production system that handles live merchant workflows. In fast-paced engineering environments, I consistently ramp up on unfamiliar tools, libraries, and protocols within a week, and I take pride in shipping robust, user-centric software.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently located in Vijayawada and available to relocate immediately to Bengaluru for in-office work in Koramangala.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlText: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 20px; padding: 0; }
    li { margin-bottom: 6px; }
    a { color: #0366d6; text-decoration: none; }
    .quote-box { background: #f6f8fa; border-left: 3px solid #0366d6; padding: 10px 14px; margin: 14px 0; font-style: italic; }
  </style>
</head>
<body>
  <p>Dear Hiring Team,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>Full Stack Engineer</strong> role at Vingo in Koramangala, Bengaluru.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), and PostgreSQL.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    Your emphasis on first-principles debugging, high ownership, and valuing how an engineer thinks and builds resonates strongly with me. When starting RestoSoft with no prior Electron background, I mastered Electron.js and local LAN synchronization within a single week to architect and ship a production system that handles live merchant workflows. In fast-paced engineering environments, I consistently ramp up on unfamiliar tools, libraries, and protocols within a week, and I take pride in shipping robust, user-centric software.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently located in Vijayawada and available to relocate <strong>immediately</strong> to Bengaluru for in-office work in Koramangala.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time and consideration.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="font-size: 11px; color: #6a737d; margin-top: 24px;">P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>
</body>
</html>`,
  },
  {
    company: "Ampcus Tech",
    recruiterName: "Vaishnavi Singh",
    email: "vaishnavi.singh@ampcustech.com",
    role: "Front-End Developer (UI / React / TypeScript / JavaScript)",
    subject: "Application for Front-End Developer – Murali Krishna Popuri",
    plainText: `Dear Vaishnavi,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Front-End Developer opening at Ampcus Tech in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week (such as mastering Electron.js within a week to deliver RestoSoft at YoungMinds). I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in an in-person technical interview in Bengaluru.

As requested in your post, here are my candidate details:
- Current Location: Vijayawada, Andhra Pradesh (Available to relocate immediately to Bengaluru)
- Notice Period: Immediate Joiner
- Official Last Working Day (LWD): November 11, negotiable for immediate release upon offer
- Current CTC: Detailed upon discussion
- Expected CTC: As per company standards

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlText: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 20px; padding: 0; }
    li { margin-bottom: 6px; }
    a { color: #0366d6; text-decoration: none; }
    .quote-box { background: #f6f8fa; border-left: 3px solid #0366d6; padding: 10px 14px; margin: 14px 0; font-style: italic; }
  </style>
</head>
<body>
  <p>Dear Vaishnavi,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>Front-End Developer</strong> opening at Ampcus Tech in Bengaluru.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week (such as mastering Electron.js within a week to deliver RestoSoft at YoungMinds). I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in an in-person technical interview in Bengaluru.
  </div>
  <p>As requested in your post, here are my candidate details:</p>
  <ul>
    <li><strong>Current Location:</strong> Vijayawada, Andhra Pradesh (Available to relocate <strong>immediately</strong> to Bengaluru)</li>
    <li><strong>Notice Period:</strong> Immediate Joiner</li>
    <li><strong>Official Last Working Day (LWD):</strong> November 11, negotiable for immediate early release upon offer</li>
    <li><strong>Current CTC:</strong> Detailed upon discussion</li>
    <li><strong>Expected CTC:</strong> As per company standards</li>
  </ul>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time and consideration.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="font-size: 11px; color: #6a737d; margin-top: 24px;">P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>
</body>
</html>`,
  },
  {
    company: "IIRIS Consulting",
    recruiterName: "Manisha Kumari",
    email: "career@iirisconsulting.com",
    role: "Software Developer (React / Node.js / APIs / SQL)",
    subject: "Application for Software Developer – Murali Krishna Popuri",
    plainText: `Dear Manisha,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Software Developer opening at IIRIS Consulting in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), databases (SQL/NoSQL), and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN networking within a week to deliver production software. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently located in Vijayawada and available to relocate immediately to Bengaluru for onsite or hybrid work.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlText: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 20px; padding: 0; }
    li { margin-bottom: 6px; }
    a { color: #0366d6; text-decoration: none; }
    .quote-box { background: #f6f8fa; border-left: 3px solid #0366d6; padding: 10px 14px; margin: 14px 0; font-style: italic; }
  </style>
</head>
<body>
  <p>Dear Manisha,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>Software Developer</strong> opening at IIRIS Consulting in Bengaluru.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), databases (SQL/NoSQL), and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN networking within a week to deliver production software. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently located in Vijayawada and available to relocate <strong>immediately</strong> to Bengaluru for onsite or hybrid work.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time and consideration.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="font-size: 11px; color: #6a737d; margin-top: 24px;">P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>
</body>
</html>`,
  },
  {
    company: "Cosette Network",
    recruiterName: "Seema Rawat",
    email: "seema@cosettenetwork.com",
    role: "Full Stack Engineer (React.js, Next.js, TypeScript, Node.js, Express.js)",
    subject: "Application for Full Stack Engineer – Murali Krishna Popuri",
    plainText: `Dear Seema,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer role at Cosette Network in Bengaluru (Hybrid).

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), PostgreSQL, and MongoDB.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently located in Vijayawada and available to relocate immediately to Bengaluru for onsite or hybrid work.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlText: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 20px; padding: 0; }
    li { margin-bottom: 6px; }
    a { color: #0366d6; text-decoration: none; }
    .quote-box { background: #f6f8fa; border-left: 3px solid #0366d6; padding: 10px 14px; margin: 14px 0; font-style: italic; }
  </style>
</head>
<body>
  <p>Dear Seema,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>Full Stack Engineer</strong> role at Cosette Network in Bengaluru (Hybrid).</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), PostgreSQL, and MongoDB.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently located in Vijayawada and available to relocate <strong>immediately</strong> to Bengaluru for onsite or hybrid work.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time and consideration.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="font-size: 11px; color: #6a737d; margin-top: 24px;">P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>
</body>
</html>`,
  },
  {
    company: "JobTrip",
    recruiterName: "Hiring Team",
    email: "career@jobtrip.in",
    role: "Managed Services Engineer II – Fullstack (React / REST APIs / Relational Databases)",
    subject: "Application for Managed Services Engineer II – Fullstack – Murali Krishna Popuri",
    plainText: `Dear Hiring Team,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Managed Services Engineer II – Fullstack role in Bengaluru / Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), REST APIs, and relational databases.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week (such as mastering Electron.js within a week to deliver RestoSoft at YoungMinds). I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently located in Vijayawada and available to relocate immediately to Bengaluru or Hyderabad for onsite or hybrid work.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlText: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 20px; padding: 0; }
    li { margin-bottom: 6px; }
    a { color: #0366d6; text-decoration: none; }
    .quote-box { background: #f6f8fa; border-left: 3px solid #0366d6; padding: 10px 14px; margin: 14px 0; font-style: italic; }
  </style>
</head>
<body>
  <p>Dear Hiring Team,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>Managed Services Engineer II – Fullstack</strong> role in Bengaluru / Hyderabad.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), REST APIs, and relational databases.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week (such as mastering Electron.js within a week to deliver RestoSoft at YoungMinds). I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently located in Vijayawada and available to relocate <strong>immediately</strong> to Bengaluru or Hyderabad for onsite or hybrid work.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time and consideration.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="font-size: 11px; color: #6a737d; margin-top: 24px;">P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>
</body>
</html>`,
  },
];

async function dispatchBatch() {
  console.log(`Starting Batch 13 Recruiter Dispatches. Total candidates to evaluate: ${leads.length}`);
  const history = loadHistory();

  let sentCount = 0;
  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`[${i + 1}/${leads.length}] Evaluating: ${lead.email} (${lead.company})`);

    if (isAlreadySent(lead.email, history)) {
      console.log(`SKIPPING: Already sent to ${lead.email} previously.`);
      continue;
    }

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: lead.email,
      replyTo: SENDER_EMAIL,
      subject: lead.subject,
      text: lead.plainText,
      html: lead.htmlText,
      headers: {
        "X-Mailer": "Apple Mail (2.3654.120.0.1)",
        Importance: "Normal",
        "X-Priority": "3",
      },
      attachments: [
        {
          filename: "Murali_Krishna_Popuri_FullStack_Developer.pdf",
          path: RESUME_PATH,
          contentType: "application/pdf",
        },
      ],
    };

    try {
      console.log(`Sending application to ${lead.email}...`);
      const info = await transporter.sendMail(mailOptions);
      console.log(`SUCCESS! Sent to ${lead.email}. Message ID: ${info.messageId}`);
      recordSent(lead.email, lead.company, lead.role, info.messageId);
      sentCount++;

      // Wait human randomized delay if there are more emails to send
      if (i < leads.length - 1) {
        const delayMs = getRandomDelay(45, 65);
        console.log(`Waiting ${(delayMs / 1000).toFixed(1)}s (human anti-spam jitter) before next dispatch...`);
        await delay(delayMs);
      }
    } catch (err) {
      console.error(`ERROR sending to ${lead.email}:`, err.message);
    }
  }

  console.log(`\n==================================================`);
  console.log(`Batch 13 dispatch completed. Total newly dispatched: ${sentCount}`);
}

dispatchBatch().catch((err) => {
  console.error("Fatal error during dispatch:", err);
  process.exit(1);
});
