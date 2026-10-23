/**
 * BATCH 17 - FRESH RECRUITER APPLICATIONS (STRICT ANTI-DUPLICATION)
 * Targets:
 * 1. careers@vancor.ai (Vancor AI - MERN Full Stack Developer, Hyderabad)
 * 2. umamaheswari.s@techno-facts.com (Techno-Facts - Front End Developer React, Hyderabad)
 * 3. srushti.j@tekpillar.com (TekPillar - Full Stack Engineer React/TypeScript, Bangalore/Hyderabad)
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
    (h) => (h.recipientEmail || "").toLowerCase().trim() === norm && h.status === "SENT"
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
    company: "Vancor AI LLC",
    email: "careers@vancor.ai",
    role: "MERN Full Stack Developer",
    subject: "Application for MERN Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Hiring Team at Vancor AI,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the MERN Full Stack Developer position at Vancor AI in Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in the complete MERN stack (MongoDB, Express.js, React.js, Node.js), JavaScript (ES6+), TypeScript, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my profile:
- Core Stack: MongoDB, Express.js, React.js, Node.js, JavaScript (ES6+), TypeScript, REST APIs, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to join immediately in Hyderabad for full-time work.

Links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would appreciate the opportunity to discuss how my MERN production experience can add value to Vancor AI.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Hiring Team at Vancor AI,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>MERN Full Stack Developer</strong> position at Vancor AI in Hyderabad.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in the complete MERN stack (MongoDB, Express.js, React.js, Node.js), JavaScript (ES6+), TypeScript, and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Quick overview of my profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> MongoDB, Express.js, React.js, Node.js, JavaScript (ES6+), TypeScript, REST APIs, Git.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to join immediately in Hyderabad for full-time work.</li>
  </ul>
  <p><strong>Links to my work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. I would appreciate the opportunity to discuss how my MERN production experience can add value to Vancor AI.</p>
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
    company: "Techno-Facts Solutions",
    email: "umamaheswari.s@techno-facts.com",
    role: "Front End Developer (React.js)",
    subject: "Application for Front End Developer (React.js) – Murali Krishna Popuri",
    plainBody: `Dear Umashree Saragalla,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Front End Developer opening at Techno-Facts in Hyderabad (Hybrid).

I have strictly 2 years of professional software engineering experience specializing in React.js, JavaScript (ES6+), TypeScript, Redux state management, and modern REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my profile:
- Core Frontend Skills: React.js, TypeScript, JavaScript (ES6+), Redux, REST API Integration, Responsive UI Architecture.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available in Hyderabad for hybrid/onsite work immediately.

Links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time and consideration, and I look forward to hearing from you.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Umashree Saragalla,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Front End Developer (React.js)</strong> opening at Techno-Facts in Hyderabad (Hybrid).</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, JavaScript (ES6+), TypeScript, Redux state management, and modern REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Quick overview of my profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Frontend Skills:</strong> React.js, TypeScript, JavaScript (ES6+), Redux, REST API Integration, Responsive UI Architecture.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available in Hyderabad for hybrid/onsite work immediately.</li>
  </ul>
  <p><strong>Links to my work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time and consideration, and I look forward to hearing from you.</p>
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
    company: "TekPillar",
    email: "srushti.j@tekpillar.com",
    role: "Full Stack Engineer (React / TypeScript)",
    subject: "Application: Full Stack Engineer (React & TypeScript) – Murali Krishna Popuri",
    plainBody: `Dear Srushti Jivani,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full Stack Engineer role at TekPillar for Bangalore / Hyderabad.

I have strictly 2 years of professional software engineering experience specializing in React 18, TypeScript, Node.js, Express, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my profile:
- Core Stack: React 18, TypeScript, JavaScript (ES6+), Node.js, Express.js, REST APIs, Microservices Integration.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to relocate immediately to Hyderabad or Bangalore for full-time work.

Links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. Thank you for your time and consideration, and I look forward to hearing from you.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Srushti Jivani,</p>
  <p>I hope you are doing well.</p>
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Full Stack Engineer (React & TypeScript)</strong> role at TekPillar for Bangalore / Hyderabad.</p>
  <p>I have strictly 2 years of professional software engineering experience specializing in React 18, TypeScript, Node.js, Express, and REST APIs.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>
  <p><strong>Quick overview of my profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React 18, TypeScript, JavaScript (ES6+), Node.js, Express.js, REST APIs, Microservices Integration.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to relocate immediately to Hyderabad or Bangalore for full-time work.</li>
  </ul>
  <p><strong>Links to my work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>
  <p>My resume is attached for your review. Thank you for your time and consideration, and I look forward to hearing from you.</p>
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
];

async function dispatchBatch17() {
  console.log("Starting Batch 17 Dispatch...");
  const history = loadHistory();

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    if (isAlreadySent(lead.email, history)) {
      console.log(`[SKIP - DUPLICATE PREVENTED] Already sent to ${lead.email}`);
      continue;
    }

    console.log(`Sending to ${lead.email} (${lead.company})...`);
    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: lead.email,
      replyTo: SENDER_EMAIL,
      subject: lead.subject,
      text: lead.plainBody,
      html: lead.htmlBody,
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
      const info = await transporter.sendMail(mailOptions);
      console.log(`[SUCCESS] Sent to ${lead.email}! Message ID: ${info.messageId}`);
      recordSent(lead.email, lead.company, lead.role, info.messageId);
    } catch (err) {
      console.error(`[ERROR] Failed to send to ${lead.email}:`, err.message);
    }

    if (i < leads.length - 1) {
      const delay = getRandomDelay(45, 60);
      console.log(`Waiting ${Math.round(delay / 1000)}s jitter delay before next email...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  console.log("Batch 17 dispatch finished!");
}

dispatchBatch17();
