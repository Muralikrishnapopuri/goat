/**
 * DISPATCH BATCH 12 FRESH RECRUITER APPLICATIONS - HYDERABAD
 * Compliant with AGENTS.md and Email_template.pdf reference:
 * - 2 years strictly professional experience
 * - YoungMinds / RestoSoft 2-line context
 * - Fast learning proof (Electron.js within a week)
 * - Immediate joiner (LWD Nov 11, negotiable for immediate early release)
 * - Relocation: Immediate to Hyderabad or Bengaluru
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
    company: "Programming.com",
    recruiterName: "Shweta Rai",
    email: "shweta.rai@programming.com",
    role: "Full Stack Developer (Node.js & React.js)",
    subject: "Application for Full Stack Developer (Node.js & React.js) – Murali Krishna Popuri",
    plainText: `Dear Shweta,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer / Software Engineer opening at Programming.com in Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently located in Vijayawada and available to relocate immediately to Hyderabad for onsite or hybrid work, and I am comfortable with US-aligned shifts.

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
  <p>Dear Shweta,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>Full Stack Developer (Node.js & React.js)</strong> opening at Programming.com in Hyderabad.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently located in Vijayawada and available to relocate <strong>immediately</strong> to Hyderabad for onsite or hybrid work, and I am comfortable with US-aligned shifts.</p>
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
  <p style="margin-top: 22px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "Techno Facts Solutions Pvt Ltd",
    recruiterName: "Anudeepthi Raj",
    email: "anudeepthi.vadde@techno-facts.com",
    role: "Front-End Developer (React / TypeScript)",
    subject: "Application for Front-End Developer (React) – Murali Krishna Popuri",
    plainText: `Dear Anudeepthi,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Front-End Developer position at Techno Facts Solutions in Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), Redux, and REST API integrations.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Hyderabad for hybrid work.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time.

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
  <p>Dear Anudeepthi,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>Front-End Developer (React)</strong> position at Techno Facts Solutions in Hyderabad.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), Redux, and REST API integrations.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate <strong>immediately</strong> to Hyderabad for hybrid work.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="margin-top: 22px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "Nilasu Consulting",
    recruiterName: "Sowmya Chittajallu",
    email: "Sowmya@nilasu.com",
    role: "React.js / Next.js Front-End Developer",
    subject: "Application for React.js / Next.js Developer – Murali Krishna Popuri",
    plainText: `Dear Sowmya,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the React.js / Next.js Front-End Developer opening in Hyderabad.

I have strictly 2 years of professional software engineering experience centered on React.js, Next.js, TypeScript, JavaScript (ES6+), and modern UI state management.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate immediately to Hyderabad.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your consideration.

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
  <p>Dear Sowmya,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>React.js / Next.js Front-End Developer</strong> opening in Hyderabad.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience centered on React.js, Next.js, TypeScript, JavaScript (ES6+), and modern UI state management.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate <strong>immediately</strong> to Hyderabad.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your consideration.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="margin-top: 22px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "CIEL HR",
    recruiterName: "Aishwarya R.",
    email: "aishwarya.rani@cielhr.com",
    role: "Senior Full-Stack Developer (MERN Stack)",
    subject: "Application for Full-Stack Developer (MERN Stack) – Murali Krishna Popuri",
    plainText: `Dear Aishwarya,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full-Stack Developer (MERN Stack) position in Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), MongoDB, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate immediately to Hyderabad.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time.

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
  <p>Dear Aishwarya,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>Full-Stack Developer (MERN Stack)</strong> position in Hyderabad.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), MongoDB, and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate <strong>immediately</strong> to Hyderabad.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="margin-top: 22px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "DTC Infotech",
    recruiterName: "Girish Kumar",
    email: "opportunity@dtcinfotech.com",
    role: "React JS Developer",
    subject: "Application for React JS Developer (Job ID: DTC-REACT-MFE-HYD-015) – Murali Krishna Popuri",
    plainText: `Dear Girish,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the React JS Developer opening (Job ID: DTC-REACT-MFE-HYD-015) at DTC Infotech in Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), Redux, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for full-time on-site work and in-person discussions in Hyderabad.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time.

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
  <p>Dear Girish,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>React JS Developer</strong> opening (Job ID: DTC-REACT-MFE-HYD-015) at DTC Infotech in Hyderabad.</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), Redux, and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for full-time on-site work and in-person discussions in Hyderabad.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="margin-top: 22px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
  {
    company: "LinkageIT",
    recruiterName: "Leena Popli",
    email: "leena.popli@linkageit.com",
    role: "Front End Developer (React)",
    subject: "Application for Front End Developer (React) – Murali Krishna Popuri",
    plainText: `Dear Leena,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Front End Developer (React) opening in Hyderabad (Hybrid).

I have strictly 2 years of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), Redux, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate immediately to Hyderabad for hybrid work.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time.

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
  <p>Dear Leena,</p>
  <p>I hope you are doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am writing to apply for the <strong>Front End Developer (React)</strong> opening in Hyderabad (Hybrid).</p>
  <p>I have strictly <strong>2 years</strong> of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), Redux, and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <div class="quote-box">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. For instance, in building RestoSoft at YoungMinds, I mastered Electron.js and local LAN synchronization within a week to deliver production software. In fast-paced engineering environments, I consistently ramp up on unfamiliar libraries, cloud tools, and frameworks within a week. If this specific opening requires higher seniority, I would be grateful if you could consider my profile for any active or upcoming roles on your team where my background would add value, which I would love to demonstrate in a technical interview.
  </div>
  <p>I am an <strong>immediate joiner</strong> (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate <strong>immediately</strong> to Hyderabad for hybrid work.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time.</p>
  <p>Best regards,<br>
  <strong>Murali Krishna Popuri</strong><br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="margin-top: 22px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">
    P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.
  </p>
</body>
</html>`,
  },
];

async function dispatchBatch() {
  console.log("=================================================");
  console.log("STARTING SAFE DISPATCH FOR BATCH 12 HYDERABAD LEADS");
  console.log(`Total Leads to Process: ${leads.length}`);
  console.log("=================================================\n");

  const history = loadHistory();

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`[${i + 1}/${leads.length}] Checking: ${lead.email} (${lead.company})...`);

    if (isAlreadySent(lead.email, history)) {
      console.log(`  -> SKIP: ${lead.email} already present in sent_history.json`);
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
          filename: path.basename(RESUME_PATH),
          path: RESUME_PATH,
        },
      ],
    };

    try {
      console.log(`  -> Dispatching email to ${lead.email}...`);
      const info = await transporter.sendMail(mailOptions);
      console.log(`  -> SENT! Message ID: ${info.messageId}`);
      recordSent(lead.email, lead.company, lead.role, info.messageId);

      if (i < leads.length - 1) {
        const waitMs = getRandomDelay(45, 65);
        console.log(`  -> Waiting ${Math.round(waitMs / 1000)}s jitter delay before next dispatch...\n`);
        await delay(waitMs);
      }
    } catch (err) {
      console.error(`  -> ERROR sending to ${lead.email}:`, err.message);
    }
  }

  console.log("\n=================================================");
  console.log("BATCH 12 HYDERABAD LEADS DISPATCH FINISHED!");
  console.log("=================================================");
}

dispatchBatch();
