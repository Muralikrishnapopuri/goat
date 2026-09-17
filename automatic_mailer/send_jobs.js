#!/usr/bin/env node

/**
 * ============================================================
 *  🚀 Automated Job Outreach Mailer & Tracker — send_jobs.js
 * ============================================================
 *  Features:
 *   • Multi-source job lead ingestion (.xlsx, .xls, .csv, .md, .docx, .json, CLI --add)
 *   • Automated Resume PDF attachment (Murali_Krishna_Popuri_Full_Stack_Dev.pdf)
 *   • Smart role-tailored outreach emails complying with recruiter checklist (mail_instructions.txt)
 *   • Duplicate prevention & history tracking (sent_history.json)
 *   • Anti-spam randomized delays (jitter) & rate limiting
 *   • Rich HTML + plain text dual formatting
 *   • Dry-run preview generator (preview_emails.json)
 * ============================================================
 */

const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const nodemailer = require("nodemailer");
const XLSX = require("xlsx");
const mammoth = require("mammoth");

// ─── ANSI Styling Helpers ──────────────────────────────────────
const C = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgGreen: "\x1b[42m",
  bgRed: "\x1b[41m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
};

const log = {
  info: (msg) => console.log(`${C.cyan}ℹ ${C.reset}${msg}`),
  success: (msg) => console.log(`${C.green}✔ ${C.reset}${C.green}${msg}${C.reset}`),
  warn: (msg) => console.log(`${C.yellow}⚠ ${C.reset}${C.yellow}${msg}${C.reset}`),
  error: (msg) => console.log(`${C.red}✖ ${C.reset}${C.red}${msg}${C.reset}`),
  header: (msg) =>
    console.log(`\n${C.bgBlue}${C.white}${C.bright} ${msg} ${C.reset}\n`),
  divider: () => console.log(`${C.dim}${"─".repeat(65)}${C.reset}`),
  email: (idx, total, to, company, role, status, note = "") => {
    const tag =
      status === "sent"
        ? `${C.bgGreen}${C.white} SENT `
        : status === "draft"
        ? `${C.bgYellow}${C.white} DRAFT `
        : status === "skip"
        ? `${C.bgCyan}${C.white} SKIP `
        : `${C.bgRed}${C.white} FAIL `;
    console.log(
      `${tag}${C.reset} ${C.dim}[${idx}/${total}]${C.reset} ${C.bright}${company}${C.reset} → ${C.cyan}${to}${C.reset}`
    );
    console.log(`       ${C.dim}Role:${C.reset} ${role} ${note ? `${C.yellow}(${note})${C.reset}` : ""}`);
  },
};

// ─── Configuration ─────────────────────────────────────────────
const CONFIG = {
  senderEmail: process.env.SENDER_EMAIL || "popurimurali16@gmail.com",
  appPassword: process.env.GMAIL_APP_PASSWORD,
  senderName: "Murali Krishna Popuri",
  senderPhone: "+91 9347796811",
  portfolioUrl: "https://murali-portfolio-website.vercel.app",
  githubUrl: "https://github.com/Muralikrishnapopuri",
  linkedinUrl: "https://linkedin.com/in/murali-krishna-popuri",
  projectZestchat: "https://zestchat.vercel.app",
  projectPixelPolish: "https://pixelpolish.vercel.app",
  baseDelayMs: 3000, // 3s base delay
  jitterMs: 2000,    // 0-2s random jitter (3-5s total)
  previewFile: path.join(__dirname, "preview_emails.json"),
  historyFile: path.join(__dirname, "sent_history.json"),
  resumePdfFile: path.join(__dirname, "Murali_Krishna_Popuri_Full_Stack_Dev.pdf"),
  resumeTxtFile: path.join(__dirname, "resume.txt"),
};

// ─── Sent History Management ───────────────────────────────────
function loadHistory() {
  if (!fs.existsSync(CONFIG.historyFile)) {
    return [];
  }
  try {
    const data = fs.readFileSync(CONFIG.historyFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    log.warn(`Could not read sent history: ${err.message}. Starting fresh.`);
    return [];
  }
}

function saveHistory(history) {
  try {
    fs.writeFileSync(CONFIG.historyFile, JSON.stringify(history, null, 2), "utf-8");
  } catch (err) {
    log.error(`Failed to save sent history: ${err.message}`);
  }
}

function recordSent(recipientEmail, company, role, messageId, status = "SENT") {
  const history = loadHistory();
  history.push({
    timestamp: new Date().toISOString(),
    recipientEmail: recipientEmail.toLowerCase().trim(),
    company: company.trim(),
    role: role.trim(),
    status,
    messageId,
  });
  saveHistory(history);
}

function isAlreadySent(email, history) {
  if (!email) return false;
  const normalized = email.toLowerCase().trim();
  return history.some((h) => h.recipientEmail === normalized && h.status === "SENT");
}

// ─── Input Ingestion Engine ────────────────────────────────────

/**
 * Parses Excel (.xlsx, .xls) and CSV (.csv) files.
 */
function parseExcelOrCsv(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  return rows
    .map((row) => {
      const company =
        row["Company Name"] ||
        row["company_name"] ||
        row["Company"] ||
        row["company"] ||
        "";
      const email =
        row["HR Email"] ||
        row["HR/Recruiter Email"] ||
        row["Email"] ||
        row["email"] ||
        row["hr_email"] ||
        row["Recruiter Email"] ||
        row["Target Email"] ||
        "";
      const jobLink =
        row["Job Link"] ||
        row["Job Application Link"] ||
        row["job_link"] ||
        row["Link"] ||
        row["Application Link"] ||
        row["URL"] ||
        "";
      const role =
        row["Role"] ||
        row["Job Role"] ||
        row["Position"] ||
        row["Job Title"] ||
        row["role"] ||
        "Full-Stack Developer";
      const location =
        row["Location"] ||
        row["location"] ||
        row["City"] ||
        "";
      const companyContext =
        row["Company Context"] ||
        row["Context"] ||
        row["company_context"] ||
        row["Notes"] ||
        "";

      return {
        company: String(company).trim(),
        email: String(email).trim(),
        jobLink: String(jobLink).trim(),
        role: String(role).trim(),
        location: String(location).trim(),
        companyContext: String(companyContext).trim(),
      };
    })
    .filter((r) => r.email && r.company);
}

/**
 * Parses Markdown (.md) lists (such as job_opportunities_curated.md).
 */
function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const entries = [];

  // Match blocks like:
  // ### 1. 🏢 Company Name
  // * **Role:** Role Name
  // * **Location:** Location
  // * **Target Email:** `email@domain.com`
  // * **Status:** ...
  const sections = content.split(/###\s+\d+\.\s+🏢\s+/i);

  for (const sec of sections) {
    if (!sec.trim()) continue;
    const lines = sec.split("\n");
    const company = lines[0].replace(/\r$/, "").trim();

    const roleMatch = sec.match(/\*\s+\*\*Role:\*\*\s*(.+)/i);
    const emailMatch = sec.match(/\*\s+\*\*Target Email:\*\*\s*`?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})`?/i);
    const locationMatch = sec.match(/\*\s+\*\*Location:\*\*\s*(.+)/i);
    const linkMatch = sec.match(/\*\s+\*\*Job Link:\*\*\s*(.+)/i) || sec.match(/(https?:\/\/[^\s\)]+)/i);

    if (company && emailMatch) {
      entries.push({
        company: company,
        email: emailMatch[1].trim(),
        role: roleMatch ? roleMatch[1].trim() : "Full-Stack Developer",
        location: locationMatch ? locationMatch[1].trim() : "Hyderabad / Bangalore",
        jobLink: linkMatch ? linkMatch[1].trim() : "",
        companyContext: "",
      });
    }
  }

  return entries;
}

/**
 * Parses JSON (.json) input files.
 */
function parseJson(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(content);
  if (!Array.isArray(data)) {
    throw new Error("JSON file must contain an array of job application objects.");
  }
  return data
    .map((item) => ({
      company: item.company || item.companyName || item["Company Name"] || "",
      email: item.email || item.targetEmail || item.hrEmail || item["HR Email"] || "",
      role: item.role || item.position || "Full-Stack Developer",
      location: item.location || "",
      jobLink: item.jobLink || item.link || "",
      companyContext: item.companyContext || item.context || "",
    }))
    .filter((r) => r.email && r.company);
}

/**
 * Parses Word (.docx) documents.
 */
async function parseDocx(filePath) {
  const buffer = fs.readFileSync(filePath);
  const result = await mammoth.extractRawText({ buffer });
  const text = result.value;

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const entries = [];
  for (const line of lines) {
    const parts = line.includes("|") ? line.split("|") : line.split("\t");
    if (parts.length >= 2) {
      const emailPart = parts.find((p) => p.includes("@"));
      const linkPart = parts.find((p) => p.startsWith("http"));
      const companyPart = parts.find((p) => !p.includes("@") && !p.startsWith("http"));
      const rolePart = parts.find((p) => p !== emailPart && p !== linkPart && p !== companyPart);

      if (emailPart && companyPart) {
        entries.push({
          company: companyPart.trim(),
          email: emailPart.trim(),
          role: rolePart ? rolePart.trim() : "Full-Stack Developer",
          jobLink: linkPart ? linkPart.trim() : "",
          location: "",
          companyContext: "",
        });
      }
    }
  }
  return entries;
}

/**
 * Parses single pipe-delimited text string passed via CLI.
 * Format: "Company | Email | Role | Location"
 */
function parseSingleLead(leadStr) {
  const parts = leadStr.split("|").map((p) => p.trim());
  if (parts.length < 2) {
    throw new Error('Single lead format must be: "Company | email@corp.com | [Role] | [Location]"');
  }
  const company = parts[0];
  const email = parts[1];
  const role = parts[2] || "Full-Stack Developer";
  const location = parts[3] || "";

  return [
    {
      company,
      email,
      role,
      location,
      jobLink: "",
      companyContext: "",
    },
  ];
}

/**
 * Auto-detects input file in directory if none specified.
 */
function findDefaultInputFile() {
  const files = fs.readdirSync(__dirname);
  const preferred = [
    "job_applications.xlsx",
    "job_applications.csv",
    "job_opportunities_curated.md",
  ];

  for (const name of preferred) {
    if (files.includes(name)) {
      return { file: path.join(__dirname, name), ext: path.extname(name).toLowerCase() };
    }
  }

  const supportedExts = [".xlsx", ".xls", ".csv", ".md", ".docx", ".json"];
  for (const ext of supportedExts) {
    const match = files.find(
      (f) =>
        f.toLowerCase().endsWith(ext) &&
        !f.startsWith("~$") &&
        f.toLowerCase() !== "package.json" &&
        f.toLowerCase() !== "preview_emails.json" &&
        f.toLowerCase() !== "sent_history.json"
    );
    if (match) return { file: path.join(__dirname, match), ext };
  }
  return null;
}

// ─── Email Personalization Engine ──────────────────────────────
function generateOutreachEmail(app) {
  const { company, role, location, jobLink, companyContext } = app;
  const appliedRole = role || "Full-Stack Developer";
  const roleLower = appliedRole.toLowerCase();

  // ── 1. Clear, Standardized Subject Line ──
  const subject = `Application for ${appliedRole} – Murali Krishna Popuri`;

  // ── 2. Tailored Tech Stack & Highlights based on Target Role ──
  let techStackHighlight = "";
  let roleSpecialization = "";

  if (roleLower.includes("frontend") || roleLower.includes("react") || roleLower.includes("ui")) {
    techStackHighlight = "React.js, Next.js, TypeScript, JavaScript (ES6+), Redux, Tailwind CSS, HTML5/CSS3, and REST APIs";
    roleSpecialization = "building high-performance, responsive UI components, optimizing frontend performance, and state management";
  } else if (roleLower.includes("backend") || roleLower.includes("node") || roleLower.includes("api")) {
    techStackHighlight = "Node.js, Express.js, Kafka, PostgreSQL, MySQL, MongoDB, Redis, WebSockets, and RESTful APIs";
    roleSpecialization = "architecting scalable backend APIs, database query optimization, event streaming with Kafka, and real-time socket services";
  } else if (roleLower.includes("php") || roleLower.includes("wordpress")) {
    techStackHighlight = "PHP, React.js, JavaScript (ES6+), MySQL, HTML5, CSS3, REST APIs, and responsive web platforms";
    roleSpecialization = "full-stack development, database schema design, and custom web application engineering";
  } else if (roleLower.includes("ai") || roleLower.includes("gen-ai") || roleLower.includes("llm")) {
    techStackHighlight = "React.js, Node.js, TypeScript, REST APIs, PostgreSQL, Claude AI / OpenAI API integrations, and RAG architectures";
    roleSpecialization = "leveraging modern Gen-AI coding tools (Claude, Cursor, GitHub Copilot) to accelerate delivery and integrating AI assistants into web platforms";
  } else {
    // Default Full-Stack
    techStackHighlight = "React.js, Node.js, Express, TypeScript, JavaScript (ES6+), PostgreSQL, MongoDB, and RESTful APIs";
    roleSpecialization = "building responsive frontend interfaces and robust backend microservices from end to end";
  }

  const locText = location ? ` in ${location}` : "";
  const contextNote = companyContext ? ` I am especially inspired by ${company}'s work in ${companyContext}.` : "";

  // ── 3. Clean, High-Impact Plain Text Email Body (5-8 Sentences) ──
  const plainBody = `Hi Hiring Team,

I am writing to express my strong interest in the ${appliedRole} position at ${company}${locText}.${contextNote}

I am a Full-Stack Developer with 2+ years of professional experience specializing in ${techStackHighlight}. In my recent work at YoungMinds Technology Solutions, I engineered RestoSoft—an offline-first POS desktop & web ecosystem with real-time LAN synchronization, Kafka message brokering, and role-based web platforms.

My technical focus centers on ${roleSpecialization}. I actively integrate modern AI development workflows (Claude, Cursor, GitHub Copilot) to ensure rapid, clean feature delivery.

I am based in / open to on-site/hybrid opportunities${locText} and am currently serving my notice period, available as an immediate joiner.

My updated PDF resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached to this email. I look forward to discussing how my experience can benefit ${company}'s team.

Best regards,

Murali Krishna Popuri
Phone: ${CONFIG.senderPhone}
Email: ${CONFIG.senderEmail}
Portfolio: ${CONFIG.portfolioUrl}
GitHub: ${CONFIG.githubUrl}
LinkedIn: ${CONFIG.linkedinUrl}

Featured Live Projects:
• Zestchat (Real-time Messaging & AI Assistant): ${CONFIG.projectZestchat}
• Pixel Polish (Canvas Image Filter Studio): ${CONFIG.projectPixelPolish}`;

  // ── 4. Elegant HTML Email Body ──
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2d3748; line-height: 1.6; margin: 0; padding: 0; }
    .container { max-width: 620px; margin: 0 auto; padding: 20px; }
    .greeting { font-size: 15px; margin-bottom: 12px; }
    .paragraph { font-size: 14.5px; margin-bottom: 14px; color: #2d3748; }
    .highlight-box { background: #f7fafc; border-left: 4px solid #3182ce; padding: 12px 16px; margin: 16px 0; border-radius: 0 6px 6px 0; }
    .highlight-box p { margin: 4px 0; font-size: 14px; color: #4a5568; }
    .signature { margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 16px; }
    .name { font-size: 16px; font-weight: 700; color: #1a202c; }
    .links-row { margin-top: 8px; font-size: 13.5px; }
    .link-item { color: #3182ce; text-decoration: none; font-weight: 600; margin-right: 12px; }
    .link-item:hover { text-decoration: underline; }
    .badge { display: inline-block; background: #ebf8ff; color: #2b6cb0; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-left: 6px; }
    .projects { margin-top: 10px; font-size: 13.5px; color: #4a5568; }
  </style>
</head>
<body>
  <div class="container">
    <p class="greeting">Hi Hiring Team,</p>
    
    <p class="paragraph">
      I am writing to express my strong interest in the <strong>${appliedRole}</strong> position at <strong>${company}</strong>${locText}.${contextNote}
    </p>

    <p class="paragraph">
      I am a <strong>Full-Stack Developer with 2+ years of professional experience</strong> specializing in <strong>${techStackHighlight}</strong>. At YoungMinds Technology Solutions, I engineered <em>RestoSoft</em>—an offline-first POS desktop & web ecosystem with real-time LAN synchronization, Kafka message brokering, and 4 role-based web platforms.
    </p>

    <div class="highlight-box">
      <p>⚡ <strong>Key Focus:</strong> ${roleSpecialization}.</p>
      <p>🚀 <strong>Status:</strong> Serving notice period / <span class="badge">Immediate Joiner</span> (Open to On-Site / Hybrid).</p>
    </div>

    <p class="paragraph">
      My complete PDF resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached to this email for your review.
    </p>

    <div class="signature">
      <div class="name">Murali Krishna Popuri</div>
      <div style="font-size: 13.5px; color: #718096; margin-top: 2px;">
        📞 ${CONFIG.senderPhone} &nbsp;|&nbsp; ✉️ <a href="mailto:${CONFIG.senderEmail}" style="color:#718096;">${CONFIG.senderEmail}</a>
      </div>
      <div class="links-row">
        🌐 <a class="link-item" href="${CONFIG.portfolioUrl}" target="_blank">Portfolio</a>
        💻 <a class="link-item" href="${CONFIG.githubUrl}" target="_blank">GitHub</a>
        🔗 <a class="link-item" href="${CONFIG.linkedinUrl}" target="_blank">LinkedIn</a>
      </div>
      <div class="projects">
        ⭐ <strong>Live Projects:</strong> 
        <a href="${CONFIG.projectZestchat}" target="_blank" style="color:#3182ce; text-decoration:none;">Zestchat (Messaging & AI)</a> &bull; 
        <a href="${CONFIG.projectPixelPolish}" target="_blank" style="color:#3182ce; text-decoration:none;">Pixel Polish (Image Editor)</a>
      </div>
    </div>
  </div>
</body>
</html>`;

  return { subject, plainBody, htmlBody };
}

// ─── Delay with Jitter Utility ─────────────────────────────────
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function randomDelay(baseMs = CONFIG.baseDelayMs, jitterMs = CONFIG.jitterMs) {
  const totalMs = baseMs + Math.floor(Math.random() * jitterMs);
  return sleep(totalMs);
}

// ─── Create Nodemailer Transport ───────────────────────────────
function createTransport() {
  if (!CONFIG.appPassword || CONFIG.appPassword === "your_16_digit_app_password") {
    log.error("GMAIL_APP_PASSWORD is not set in .env!");
    log.info("Generate one at: https://myaccount.google.com/apppasswords");
    process.exit(1);
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: CONFIG.senderEmail,
      pass: CONFIG.appPassword,
    },
  });
}

// ─── Attachments Verifier ──────────────────────────────────────
function getAttachments() {
  const attachments = [];
  if (fs.existsSync(CONFIG.resumePdfFile)) {
    attachments.push({
      filename: path.basename(CONFIG.resumePdfFile),
      path: CONFIG.resumePdfFile,
    });
  } else {
    log.warn(`Resume PDF not found at: ${CONFIG.resumePdfFile}. Email will be sent without PDF attachment.`);
  }
  return attachments;
}

// ─── DRY RUN Mode ──────────────────────────────────────────────
async function runDryRun(entries, force = false) {
  log.header("🔍 DRY RUN — Generating & Validating Email Previews");
  log.info(`Found ${entries.length} candidate recipient(s) to process.\n`);

  const history = loadHistory();
  const previews = [];
  let eligibleCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < entries.length; i++) {
    const app = entries[i];
    const alreadySent = isAlreadySent(app.email, history);

    if (alreadySent && !force) {
      skippedCount++;
      log.email(i + 1, entries.length, app.email, app.company, app.role, "skip", "Already contacted");
      continue;
    }

    eligibleCount++;
    const { subject, plainBody, htmlBody } = generateOutreachEmail(app);

    previews.push({
      index: eligibleCount,
      company: app.company,
      recipientEmail: app.email,
      role: app.role,
      location: app.location || "N/A",
      jobLink: app.jobLink || "N/A",
      subject,
      attachment: fs.existsSync(CONFIG.resumePdfFile) ? path.basename(CONFIG.resumePdfFile) : "None",
      body: plainBody,
    });

    log.email(i + 1, entries.length, app.email, app.company, app.role, "draft");
    log.divider();
  }

  fs.writeFileSync(CONFIG.previewFile, JSON.stringify(previews, null, 2), "utf-8");

  console.log("");
  log.success(`Generated ${previews.length} ready-to-send draft(s) in: preview_emails.json`);
  if (skippedCount > 0) {
    log.info(`Skipped ${skippedCount} recipient(s) already in sent history (use --force to override).`);
  }
  console.log("");
  log.info("To dispatch these emails for real, run:");
  console.log(`   ${C.bright}${C.green}npm run send${C.reset}  or  ${C.bright}${C.cyan}node send_jobs.js --send${C.reset}\n`);
}

// ─── SEND Mode ─────────────────────────────────────────────────
async function runSend(entries, force = false) {
  log.header("🚀 SENDING OUTREACH EMAILS via Gmail SMTP");

  const transporter = createTransport();

  // Verify SMTP connection first
  try {
    process.stdout.write("Verifying Gmail SMTP connection... ");
    await transporter.verify();
    console.log(`${C.green}CONNECTED ✔${C.reset}\n`);
  } catch (err) {
    console.log(`${C.red}FAILED ✖${C.reset}`);
    log.error(`SMTP verification failed: ${err.message}`);
    log.info("Check your SENDER_EMAIL and GMAIL_APP_PASSWORD in .env");
    process.exit(1);
  }

  const attachments = getAttachments();
  if (attachments.length > 0) {
    log.success(`PDF Resume attached: ${attachments[0].filename} (${(fs.statSync(attachments[0].path).size / 1024).toFixed(1)} KB)`);
  }

  const history = loadHistory();
  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < entries.length; i++) {
    const app = entries[i];
    const alreadySent = isAlreadySent(app.email, history);

    if (alreadySent && !force) {
      skipped++;
      log.email(i + 1, entries.length, app.email, app.company, app.role, "skip", "Already contacted");
      continue;
    }

    const { subject, plainBody, htmlBody } = generateOutreachEmail(app);

    const mailOptions = {
      from: `"${CONFIG.senderName}" <${CONFIG.senderEmail}>`,
      to: app.email,
      subject,
      text: plainBody,
      html: htmlBody,
      attachments,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      sent++;
      recordSent(app.email, app.company, app.role, info.messageId, "SENT");
      log.email(i + 1, entries.length, app.email, app.company, app.role, "sent");
    } catch (err) {
      failed++;
      recordSent(app.email, app.company, app.role, null, `FAILED: ${err.message}`);
      log.email(i + 1, entries.length, app.email, app.company, app.role, "fail");
      log.error(`  Error: ${err.message}`);
    }

    log.divider();

    // Anti-spam jitter delay between emails
    if (i < entries.length - 1) {
      const waitTimeMs = CONFIG.baseDelayMs + Math.floor(Math.random() * CONFIG.jitterMs);
      process.stdout.write(
        `${C.dim}  ⏳ Waiting ${(waitTimeMs / 1000).toFixed(1)}s before next dispatch...${C.reset}\r`
      );
      await sleep(waitTimeMs);
      process.stdout.write("                                                      \r");
    }
  }

  // Summary Report
  console.log("");
  log.header("📊 OUTREACH DISPATCH SUMMARY");
  log.success(`Sent Successfully: ${sent}`);
  if (skipped > 0) log.info(`Skipped (Duplicates): ${skipped}`);
  if (failed > 0) log.error(`Failed Deliveries:    ${failed}`);
  log.info(`Total Processed:      ${entries.length}`);
  console.log("");
}

// ─── HISTORY Mode ──────────────────────────────────────────────
function showHistory() {
  log.header("📋 SENT APPLICATIONS HISTORY");
  const history = loadHistory();

  if (history.length === 0) {
    log.info("No outreach history recorded yet.");
    return;
  }

  console.log(`Total outreach records: ${C.bright}${history.length}${C.reset}\n`);
  history.forEach((h, idx) => {
    const timeStr = new Date(h.timestamp).toLocaleString();
    const tag = h.status === "SENT" ? `${C.green}✔ SENT${C.reset}` : `${C.red}✖ ${h.status}${C.reset}`;
    console.log(
      `${C.dim}[${idx + 1}]${C.reset} ${tag} | ${C.bright}${h.company}${C.reset} (${C.cyan}${h.recipientEmail}${C.reset})`
    );
    console.log(`    ${C.dim}Role:${C.reset} ${h.role} | ${C.dim}Date:${C.reset} ${timeStr}`);
  });
  console.log("");
}

// ─── CLI Entrypoint ───────────────────────────────────────────
async function main() {
  console.log("");
  console.log(
    `${C.bgMagenta}${C.white}${C.bright} 📧  AUTOMATED JOB OUTREACH MAILER & TRACKER  ${C.reset}`
  );
  console.log(
    `${C.dim}    Personalized cold applications with PDF Resume attachment & tracking${C.reset}`
  );
  console.log("");

  const args = process.argv.slice(2);

  // Check for history flag
  if (args.includes("--history") || args.includes("-h")) {
    showHistory();
    return;
  }

  // Determine mode
  const isSend = args.includes("--send") || args.includes("-s");
  const isDryRun = args.includes("--dry-run") || args.includes("-d") || args.includes("--preview");
  const force = args.includes("--force") || args.includes("-f");

  // Determine input source
  let entries = [];
  const addIdx = args.indexOf("--add");
  const inputIdx = args.indexOf("--input") !== -1 ? args.indexOf("--input") : args.indexOf("-i");

  if (addIdx !== -1 && args[addIdx + 1]) {
    const leadStr = args[addIdx + 1];
    log.info(`Parsing single lead from CLI: "${leadStr}"`);
    entries = parseSingleLead(leadStr);
  } else if (inputIdx !== -1 && args[inputIdx + 1]) {
    const customFile = path.resolve(process.cwd(), args[inputIdx + 1]);
    if (!fs.existsSync(customFile)) {
      log.error(`Specified input file does not exist: ${customFile}`);
      process.exit(1);
    }
    const ext = path.extname(customFile).toLowerCase();
    log.info(`Reading custom input file: ${path.basename(customFile)} (${ext})`);

    if (ext === ".xlsx" || ext === ".xls" || ext === ".csv") {
      entries = parseExcelOrCsv(customFile);
    } else if (ext === ".md") {
      entries = parseMarkdown(customFile);
    } else if (ext === ".json") {
      entries = parseJson(customFile);
    } else if (ext === ".docx") {
      entries = await parseDocx(customFile);
    } else {
      log.error(`Unsupported file extension: ${ext}`);
      process.exit(1);
    }
  } else {
    // Search for default input files
    const found = findDefaultInputFile();
    if (!found) {
      log.error("No input data file found (.xlsx, .csv, .md, .docx, .json).");
      console.log(`\nUsage examples:`);
      console.log(`  ${C.cyan}node send_jobs.js --dry-run${C.reset}                        (Auto-detects file and previews)`);
      console.log(`  ${C.cyan}node send_jobs.js --send${C.reset}                           (Auto-detects file and sends)`);
      console.log(`  ${C.cyan}node send_jobs.js --input job_opportunities.md --dry-run${C.reset} (Preview markdown list)`);
      console.log(`  ${C.cyan}node send_jobs.js --add "Acme Corp | hr@acme.com | React Dev | Hyderabad" --dry-run${C.reset}`);
      console.log(`  ${C.cyan}node send_jobs.js --history${C.reset}                        (View all sent applications)`);
      process.exit(1);
    }

    log.info(`Auto-detected input source: ${path.basename(found.file)} (${found.ext})`);
    if (found.ext === ".xlsx" || found.ext === ".xls" || found.ext === ".csv") {
      entries = parseExcelOrCsv(found.file);
    } else if (found.ext === ".md") {
      entries = parseMarkdown(found.file);
    } else if (found.ext === ".json") {
      entries = parseJson(found.file);
    } else if (found.ext === ".docx") {
      entries = await parseDocx(found.file);
    }
  }

  if (!entries || entries.length === 0) {
    log.error("No valid job application records could be parsed.");
    process.exit(1);
  }

  log.success(`Parsed ${entries.length} job lead(s).`);

  if (!isSend && !isDryRun) {
    log.warn("No execution mode flag passed. Defaulting to --dry-run preview.\n");
    await runDryRun(entries, force);
    return;
  }

  if (isDryRun) {
    await runDryRun(entries, force);
  } else if (isSend) {
    await runSend(entries, force);
  }
}

main().catch((err) => {
  log.error(`Fatal execution error: ${err.message}`);
  console.error(err);
  process.exit(1);
});
