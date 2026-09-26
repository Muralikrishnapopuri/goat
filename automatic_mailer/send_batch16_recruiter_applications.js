/**
 * BATCH 16 - RECRUITER APPLICATION DISPATCH
 * Targets:
 * 1. careers@artixio.com (Artixio - Full-Stack Developer: React, Next.js, Node.js, TypeScript, SQL)
 * 2. rutuja.bhosale@apptadinc.com (Apptad Inc - Frontend Engineer: React, Next.js, TypeScript)
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
    company: "Artixio",
    email: "careers@artixio.com",
    role: "Full-Stack Developer",
    subject: "Application for Full-Stack Developer – Murali Krishna Popuri",
    plainBody: `Dear Artixio Hiring Team,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Full-Stack Developer position at Artixio. I came across your hiring announcement for developers passionate about building real-world engineering products with TypeScript, React, Next.js, Node.js, and SQL databases.

I have strictly 2 years of professional software engineering experience. I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

About something I built and the technical challenges solved:
While building RestoSoft, the most critical challenge was ensuring zero data loss and seamless offline-first capability in busy restaurant environments with intermittent internet connectivity. I architected a local LAN real-time sync engine utilizing WebSockets and SQLite, allowing order terminals to operate independently during network dropouts and automatically reconcile transactional state with conflict resolution algorithms once local connectivity is restored. On the frontend, I engineered modular React and TypeScript interfaces managing state for multi-table orders with sub-second response times.

In addition to RestoSoft, I built Zestchat, a full-stack real-time communication platform using React, Node.js, Express, and WebSockets.

Here is a quick overview of my profile:
- Core Stack: React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), SQL (PostgreSQL, MySQL), MongoDB, Electron.js, REST APIs, WebSockets, Git.
- Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).
- Location: Available to relocate immediately to Hyderabad or Bengaluru, or work remotely.

Links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app

My resume is attached for your review. I would welcome the opportunity to discuss how my hands-on product engineering background aligns with Artixio's mission.

Thank you for your time and consideration.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Phone: +91 9347796811

P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.`,
    htmlBody: `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 650px; margin: 0 auto; padding: 20px;">
  <p>Dear Artixio Hiring Team,</p>
  
  <p>I hope you are doing well.</p>
  
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Full-Stack Developer</strong> position at Artixio. I came across your hiring announcement for developers passionate about building real-world engineering products with TypeScript, React, Next.js, Node.js, and SQL databases.</p>
  
  <p>I have strictly 2 years of professional software engineering experience. I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  
  <div style="background-color: #f6f8fa; border-left: 4px solid #0366d6; padding: 12px 16px; margin: 16px 0;">
    <p style="margin: 0 0 8px 0; font-weight: 600; color: #0366d6;">About something I built and the technical challenges solved:</p>
    <p style="margin: 0; font-size: 14px; color: #444;">While building RestoSoft, the most critical challenge was ensuring zero data loss and seamless offline-first capability in busy restaurant environments with intermittent internet connectivity. I architected a local LAN real-time sync engine utilizing WebSockets and SQLite, allowing order terminals to operate independently during network dropouts and automatically reconcile transactional state with conflict resolution algorithms once local connectivity is restored. On the frontend, I engineered modular React and TypeScript interfaces managing state for multi-table orders with sub-second response times.</p>
  </div>

  <p>In addition to RestoSoft, I built Zestchat, a full-stack real-time communication platform using React, Node.js, Express, and WebSockets.</p>

  <p><strong>Quick overview of my profile:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Core Stack:</strong> React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), SQL (PostgreSQL, MySQL), MongoDB, Electron.js, REST APIs, WebSockets, Git.</li>
    <li><strong>Notice Period:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).</li>
    <li><strong>Location:</strong> Available to relocate immediately to Hyderabad or Bengaluru, or work remotely.</li>
  </ul>

  <p><strong>Links to my work:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0366d6;">https://murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0366d6;">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0366d6;">https://github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat: <a href="https://zestchat.vercel.app" style="color: #0366d6;">https://zestchat.vercel.app</a></li>
  </ul>

  <p>My resume is attached for your review. I would welcome the opportunity to discuss how my hands-on product engineering background aligns with Artixio's mission.</p>
  
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
    company: "Apptad Inc",
    email: "rutuja.bhosale@apptadinc.com",
    role: "Frontend Engineer (React / Next.js)",
    subject: "Frontend Engineer – Murali Krishna Popuri",
    plainBody: `Dear Rutuja Bhosale,

I hope you are doing well.

My name is Murali Krishna Popuri, and I am writing to apply for the Frontend Engineer (React / Next.js) role at Apptad.

I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, TypeScript, JavaScript (ES6+), and modern component architecture.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.

Here is a quick overview of my relevant experience for this role:
- Production UI Architecture: Deep experience developing enterprise-grade, data-rich user interfaces with React, Next.js, and TypeScript, including high-performance dashboards, search-heavy views, and complex tabular data layouts.
- Component Design Systems: Engineered reusable, accessible component systems with strict TypeScript typing, responsive layouts, and clean state management.
- Real-Time & Interactive Systems: Hands-on experience building interactive workflows, real-time messaging interfaces (such as Zestchat), and low-latency client-side state handling.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to join immediately for Pune, Hyderabad, or remote arrangements.

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
  <p>Dear Rutuja Bhosale,</p>
  
  <p>I hope you are doing well.</p>
  
  <p>My name is <strong>Murali Krishna Popuri</strong>, and I am writing to apply for the <strong>Frontend Engineer (React / Next.js)</strong> role at Apptad.</p>
  
  <p>I have strictly 2 years of professional software engineering experience specializing in React.js, Next.js, TypeScript, JavaScript (ES6+), and modern component architecture.</p>
  
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  
  <p style="font-style: italic; color: #333; background: #f6f8fa; padding: 10px 14px; border-left: 3px solid #0366d6;">
    While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
  </p>

  <p><strong>Quick overview of my relevant experience for this role:</strong></p>
  <ul style="padding-left: 20px; margin: 10px 0;">
    <li><strong>Production UI Architecture:</strong> Deep experience developing enterprise-grade, data-rich user interfaces with React, Next.js, and TypeScript, including high-performance dashboards, search-heavy views, and complex tabular data layouts.</li>
    <li><strong>Component Design Systems:</strong> Engineered reusable, accessible component systems with strict TypeScript typing, responsive layouts, and clean state management.</li>
    <li><strong>Real-Time & Interactive Systems:</strong> Hands-on experience building interactive workflows, real-time messaging interfaces (such as Zestchat), and low-latency client-side state handling.</li>
    <li><strong>Availability:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to join immediately for Pune, Hyderabad, or remote arrangements.</li>
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

async function dispatchBatch16() {
  console.log("Starting Batch 16 Dispatch...");
  const history = loadHistory();

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    if (isAlreadySent(lead.email, history)) {
      console.log(`[SKIP] Already sent to ${lead.email}`);
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

  console.log("Batch 16 dispatch finished!");
}

dispatchBatch16();
