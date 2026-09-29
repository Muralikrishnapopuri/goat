/**
 * BATCH 20 - FRESH RECRUITER APPLICATIONS
 * Strictly follows AGENTS.md rules:
 * - Strictly 2 years experience
 * - Immediate Joiner (LWD Nov 11, negotiable for immediate release)
 * - Available immediately for Hyderabad / Bengaluru
 * - Mandatory RestoSoft 2-line context
 * - Rule 2 fast-learning pitch
 * - Exactly 4 permitted links
 * - Attached resume PDF
 * - Zero emojis
 * - 100% Natural Human-Typed Appearance (STRICTLY NO CSS STYLING / NO BORDER BOXES)
 * - Anti-spam randomized jitter delay (45s - 65s)
 * 
 * Targets (9 Leads):
 * 1. wilma@recruiseglobal.com (Recruise India Consulting - Hyderabad)
 * 2. pratiksha@posterity.in (Posterity GCC - Hyderabad)
 * 3. belgincts@gmail.com (Belgin Varghese - Cognizant Referral, Bangalore/Hyderabad)
 * 4. fayazshaik5623@gmail.com (Fayaz Shaik - Hyderabad)
 * 5. Khan.Rija@net2source.co.in (Rija Khan / Net2Source - Hyderabad/Bangalore)
 * 6. Swetha@cygnuspro.com (Swetha Prakash / Cygnus Professionals - Hyderabad/Bangalore)
 * 7. anjali.kashyap@apptadinc.com (Anjali Kashyap / Apptad Inc - Hyderabad/Bangalore)
 * 8. jasmitha.p@tscs.global (Peddapally Jasmitha / TSCS Global - Bangalore/Hyderabad)
 * 9. bhavna@cosettenetwork.com (Bhawana Pant / Cosette Network - Bengaluru)
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
    company: "Recruise India Consulting",
    email: "wilma@recruiseglobal.com",
    role: "Full Stack Engineer (React.js / Node.js / APIs)",
    subject: "Application for Full Stack Engineer – Murali Krishna Popuri",
    plainBody: `Dear Wilma Dsouza,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer role with Recruise India Consulting in Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my profile:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Location: Available to join in Hyderabad immediately for full-time work

Links to my work:
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
    htmlBody: `<p>Dear Wilma Dsouza,</p>
<p>I hope you are doing well.</p>
<p>My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer role with Recruise India Consulting in Hyderabad.</p>
<p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, and REST APIs.</p>
<p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
<p>While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.</p>
<p>Here is a quick overview of my profile:<br>
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git<br>
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)<br>
- Location: Available to join in Hyderabad immediately for full-time work</p>
<p>Links to my work:<br>
- Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br>
- LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a><br>
- GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br>
- Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></p>
<p>My resume is attached for your review. I would appreciate the opportunity to interview with your technical team.</p>
<p>Thank you for your time and consideration.</p>
<p>Best regards,<br>
Murali Krishna Popuri<br>
Email: popurimurali16@gmail.com<br>
Phone: +91 9347796811</p>
<p>P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>`
  },
  {
    company: "Posterity",
    email: "pratiksha@posterity.in",
    role: "Full Stack Developer (React / APIs)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Pratiksha Gautam,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer opportunity at the Hyderabad Global Capability Centre.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, and scalable REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my profile:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Location: Available to join in Hyderabad immediately for full-time on-site work

Links to my work:
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
    htmlBody: `<p>Dear Pratiksha Gautam,</p>
<p>I hope you are doing well.</p>
<p>My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer opportunity at the Hyderabad Global Capability Centre.</p>
<p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, and scalable REST APIs.</p>
<p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
<p>While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.</p>
<p>Here is a quick overview of my profile:<br>
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git<br>
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)<br>
- Location: Available to join in Hyderabad immediately for full-time on-site work</p>
<p>Links to my work:<br>
- Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br>
- LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a><br>
- GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br>
- Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></p>
<p>My resume is attached for your review. I look forward to speaking with you regarding this opportunity.</p>
<p>Thank you for your time and consideration.</p>
<p>Best regards,<br>
Murali Krishna Popuri<br>
Email: popurimurali16@gmail.com<br>
Phone: +91 9347796811</p>
<p>P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>`
  },
  {
    company: "Cognizant Referral",
    email: "belgincts@gmail.com",
    role: "Full Stack Developer (React & Node.js)",
    subject: "Full Stack Developer - React & Node | Job ID: 68620791",
    plainBody: `Dear Belgin Varghese,

I hope you are doing well.

I am writing regarding the Cognizant opportunities you shared on LinkedIn for Full Stack Developer roles in Bangalore / Hyderabad. I would greatly appreciate a referral for Job ID: 68620791.

Here are the requested mandatory details:
- Job ID: 68620791
- Target Location: Hyderabad / Bangalore (available to join onsite or hybrid immediately)
- Total Years of Experience: Strictly 2 years of professional software engineering experience
- Top 5 Skills: React.js, Next.js, Node.js, TypeScript, PostgreSQL

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Availability: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).

Links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached. Thank you for your support with the referral.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently accepting referrals or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<p>Dear Belgin Varghese,</p>
<p>I hope you are doing well.</p>
<p>I am writing regarding the Cognizant opportunities you shared on LinkedIn for Full Stack Developer roles in Bangalore / Hyderabad. I would greatly appreciate a referral for Job ID: 68620791.</p>
<p>Here are the requested mandatory details:<br>
- Job ID: 68620791<br>
- Target Location: Hyderabad / Bangalore (available to join onsite or hybrid immediately)<br>
- Total Years of Experience: Strictly 2 years of professional software engineering experience<br>
- Top 5 Skills: React.js, Next.js, Node.js, TypeScript, PostgreSQL</p>
<p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
<p>While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.</p>
<p>Availability: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</p>
<p>Links to my work:<br>
- Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br>
- LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a><br>
- GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br>
- Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></p>
<p>My resume is attached. Thank you for your support with the referral.</p>
<p>Best regards,<br>
Murali Krishna Popuri<br>
Email: popurimurali16@gmail.com<br>
Phone: +91 9347796811</p>
<p>P.S. If you are not currently accepting referrals or are not the right person to reach out to, please feel free to disregard this note.</p>`
  },
  {
    company: "Software Services",
    email: "fayazshaik5623@gmail.com",
    role: "Full Stack Developer (React.js / APIs)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Fayaz Shaik,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer position in Gachibowli, Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, and SQL databases.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my profile:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Location: Available to work in Gachibowli, Hyderabad immediately

Links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would appreciate the opportunity to discuss this role.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<p>Dear Fayaz Shaik,</p>
<p>I hope you are doing well.</p>
<p>My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer position in Gachibowli, Hyderabad.</p>
<p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, and SQL databases.</p>
<p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
<p>While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.</p>
<p>Here is a quick overview of my profile:<br>
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git<br>
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)<br>
- Location: Available to work in Gachibowli, Hyderabad immediately</p>
<p>Links to my work:<br>
- Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br>
- LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a><br>
- GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br>
- Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></p>
<p>My resume is attached for your review. I would appreciate the opportunity to discuss this role.</p>
<p>Thank you for your time and consideration.</p>
<p>Best regards,<br>
Murali Krishna Popuri<br>
Email: popurimurali16@gmail.com<br>
Phone: +91 9347796811</p>
<p>P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>`
  },
  {
    company: "Net2Source",
    email: "Khan.Rija@net2source.co.in",
    role: "Full Stack Developer (React.js / TypeScript)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Rija Khan,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer opening with Net2Source in Hyderabad / Bangalore.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my profile:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Location: Available to join immediately in Hyderabad or Bangalore

Links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I look forward to speaking with you.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<p>Dear Rija Khan,</p>
<p>I hope you are doing well.</p>
<p>My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer opening with Net2Source in Hyderabad / Bangalore.</p>
<p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, and REST APIs.</p>
<p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
<p>While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.</p>
<p>Here is a quick overview of my profile:<br>
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git<br>
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)<br>
- Location: Available to join immediately in Hyderabad or Bangalore</p>
<p>Links to my work:<br>
- Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br>
- LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a><br>
- GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br>
- Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></p>
<p>My resume is attached for your review. I look forward to speaking with you.</p>
<p>Thank you for your time and consideration.</p>
<p>Best regards,<br>
Murali Krishna Popuri<br>
Email: popurimurali16@gmail.com<br>
Phone: +91 9347796811</p>
<p>P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>`
  },
  {
    company: "Cygnus Professionals",
    email: "Swetha@cygnuspro.com",
    role: "Full Stack Developer (React.js / Node.js / APIs)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Swetha Prakash,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer position with Cygnus Professionals in Hyderabad / Bangalore.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, and microservices-based web applications.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my profile:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Location: Available to join immediately in Hyderabad or Bangalore

Links to my work:
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
    htmlBody: `<p>Dear Swetha Prakash,</p>
<p>I hope you are doing well.</p>
<p>My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer position with Cygnus Professionals in Hyderabad / Bangalore.</p>
<p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, and microservices-based web applications.</p>
<p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
<p>While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.</p>
<p>Here is a quick overview of my profile:<br>
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git<br>
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)<br>
- Location: Available to join immediately in Hyderabad or Bangalore</p>
<p>Links to my work:<br>
- Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br>
- LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a><br>
- GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br>
- Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></p>
<p>My resume is attached for your review. I look forward to an opportunity to interview with your team.</p>
<p>Thank you for your time and consideration.</p>
<p>Best regards,<br>
Murali Krishna Popuri<br>
Email: popurimurali16@gmail.com<br>
Phone: +91 9347796811</p>
<p>P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>`
  },
  {
    company: "Apptad Inc",
    email: "anjali.kashyap@apptadinc.com",
    role: "Full Stack Developer (React / AWS)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Anjali Kashyap,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer position with Apptad Inc in Hyderabad / Bangalore.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, and cloud-backed architectures.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my profile:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Location: Available to join immediately in Hyderabad or Bangalore

Links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would appreciate the opportunity to interview with your team.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<p>Dear Anjali Kashyap,</p>
<p>I hope you are doing well.</p>
<p>My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Developer position with Apptad Inc in Hyderabad / Bangalore.</p>
<p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, TypeScript, and cloud-backed architectures.</p>
<p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
<p>While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.</p>
<p>Here is a quick overview of my profile:<br>
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git<br>
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)<br>
- Location: Available to join immediately in Hyderabad or Bangalore</p>
<p>Links to my work:<br>
- Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br>
- LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a><br>
- GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br>
- Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></p>
<p>My resume is attached for your review. I would appreciate the opportunity to interview with your team.</p>
<p>Thank you for your time and consideration.</p>
<p>Best regards,<br>
Murali Krishna Popuri<br>
Email: popurimurali16@gmail.com<br>
Phone: +91 9347796811</p>
<p>P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>`
  },
  {
    company: "TSCS Global",
    email: "jasmitha.p@tscs.global",
    role: "Full Stack Engineer (React / TypeScript)",
    subject: "Application for Full Stack Engineer – Murali Krishna Popuri",
    plainBody: `Dear Peddapally Jasmitha,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer position at TSCS Global in Bangalore / Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here are the requested details:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git
- Notice Period / Last Working Day: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Current Location: Vijayawada, Andhra Pradesh
- Preferred Location: Hyderabad or Bangalore (available to join immediately)

Links to my work:
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
    htmlBody: `<p>Dear Peddapally Jasmitha,</p>
<p>I hope you are doing well.</p>
<p>My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer position at TSCS Global in Bangalore / Hyderabad.</p>
<p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, and REST APIs.</p>
<p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
<p>While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.</p>
<p>Here are the requested details:<br>
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, REST APIs, Git<br>
- Notice Period / Last Working Day: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)<br>
- Current Location: Vijayawada, Andhra Pradesh<br>
- Preferred Location: Hyderabad or Bangalore (available to join immediately)</p>
<p>Links to my work:<br>
- Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br>
- LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a><br>
- GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br>
- Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></p>
<p>My resume is attached for your review. I look forward to speaking with you regarding this opportunity.</p>
<p>Thank you for your time and consideration.</p>
<p>Best regards,<br>
Murali Krishna Popuri<br>
Email: popurimurali16@gmail.com<br>
Phone: +91 9347796811</p>
<p>P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>`
  },
  {
    company: "Cosette Network",
    email: "bhavna@cosettenetwork.com",
    role: "Frontend / Full Stack Developer (React.js / Next.js / TypeScript)",
    subject: "Application for Frontend / Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Bhawana Pant,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Frontend / Full Stack Developer role with Cosette Network in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, JavaScript (ES6+), TypeScript, and modern APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my profile:
- Core Stack: React.js, Next.js, TypeScript, JavaScript (ES6+), Node.js, REST APIs, Git
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Location: Available to relocate immediately to Bengaluru for full-time work

Links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would appreciate the opportunity to discuss how my development skills can add value to Cosette Network.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<p>Dear Bhawana Pant,</p>
<p>I hope you are doing well.</p>
<p>My name is Murali Krishna Popuri, and I am writing to apply for the Frontend / Full Stack Developer role with Cosette Network in Bengaluru.</p>
<p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, JavaScript (ES6+), TypeScript, and modern APIs.</p>
<p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
<p>While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.</p>
<p>Here is a quick overview of my profile:<br>
- Core Stack: React.js, Next.js, TypeScript, JavaScript (ES6+), Node.js, REST APIs, Git<br>
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)<br>
- Location: Available to relocate immediately to Bengaluru for full-time work</p>
<p>Links to my work:<br>
- Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br>
- LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a><br>
- GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br>
- Zestchat: <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></p>
<p>My resume is attached for your review. I would appreciate the opportunity to discuss how my development skills can add value to Cosette Network.</p>
<p>Thank you for your time and consideration.</p>
<p>Best regards,<br>
Murali Krishna Popuri<br>
Email: popurimurali16@gmail.com<br>
Phone: +91 9347796811</p>
<p>P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>`
  }
];

async function sendBatch() {
  console.log("=================================================");
  console.log("STARTING BATCH 20 DISPATCH - 100% HUMAN-TYPED FORMAT (NO CSS)");
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
  console.log("BATCH 20 DISPATCH COMPLETED");
  console.log(`Total Sent: ${sentCount}`);
  console.log(`Total Skipped: ${skippedCount}`);
  console.log("=================================================");
}

sendBatch();
