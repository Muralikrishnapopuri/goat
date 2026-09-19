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
  resumePdfFile: fs.existsSync(path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf"))
    ? path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf")
    : path.join(__dirname, "Murali_Krishna_Popuri_Full_Stack_Dev.pdf"),
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

  // ── 1. Clean, Natural Subject Line ──
  const subject = `${appliedRole} – Murali Krishna Popuri`;

  // ── 2. Tailored Tech Stack based on Target Role ──
  let techStackHighlight = "";

  if (roleLower.includes("frontend") || roleLower.includes("react") || roleLower.includes("ui")) {
    techStackHighlight = "React.js, Next.js, TypeScript, JavaScript (ES6+), Redux, and Tailwind CSS";
  } else if (roleLower.includes("backend") || roleLower.includes("node") || roleLower.includes("api")) {
    techStackHighlight = "Node.js, Express.js, PostgreSQL, MySQL, SQLite, MongoDB, Redis, and REST/WebSocket APIs";
  } else if (roleLower.includes("php") || roleLower.includes("wordpress")) {
    techStackHighlight = "PHP, MySQL, React.js, JavaScript (ES6+), and REST APIs";
  } else {
    // Default Full-Stack
    techStackHighlight = "React.js, Node.js, Express, TypeScript, JavaScript (ES6+), PostgreSQL, and MySQL";
  }

  const locText = location ? ` in ${location}` : "";

  // ── 3. Natural, Human Plain Text Body ──
  const plainBody = `Hi ${company} Team,

I'm reaching out to apply for the ${appliedRole} role at ${company}${locText}.

I'm a developer with 2 years of professional experience working with ${techStackHighlight}. In my current role at YoungMinds Technology Solutions, I built RestoSoft—an offline-first POS desktop system (Electron) with real-time LAN synchronization, SQLite/MySQL, and role-based web platforms.

Here are quick links to my work and projects:
• Portfolio: ${CONFIG.portfolioUrl}
• GitHub: ${CONFIG.githubUrl}
• LinkedIn: ${CONFIG.linkedinUrl}
• Zestchat (Live Project): ${CONFIG.projectZestchat}
• Pixel Polish (Live Project): ${CONFIG.projectPixelPolish}

Regarding my availability: I am currently serving notice with an official Last Working Day of Nov 11, but I can get released earlier if needed as my manager is flexible (can join immediately). I am open to on-site/hybrid opportunities${locText}.

I have attached my resume for your review. Let me know if my background aligns with what you're looking for, and we can set up a short call.

Thanks,

Murali Krishna Popuri
+91 9347796811
${CONFIG.senderEmail}`;

  // ── 4. Clean, Human HTML Body (Standard Email Look, Zero Marketing Gimmicks) ──
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.55; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 4px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; line-height: 1.45; color: #333333; }
  </style>
</head>
<body>
  <p>Hi ${company} Team,</p>

  <p>I'm reaching out to apply for the ${appliedRole} role at ${company}${locText}.</p>

  <p>I'm a developer with 2 years of professional experience working with ${techStackHighlight}. In my current role at YoungMinds Technology Solutions, I built RestoSoft—an offline-first POS desktop system (Electron) with real-time LAN synchronization, SQLite/MySQL, and role-based web platforms.</p>

  <p>Here are quick links to my work and projects:</p>
  <ul>
    <li>Portfolio: <a href="${CONFIG.portfolioUrl}">${CONFIG.portfolioUrl}</a></li>
    <li>GitHub: <a href="${CONFIG.githubUrl}">${CONFIG.githubUrl}</a></li>
    <li>LinkedIn: <a href="${CONFIG.linkedinUrl}">${CONFIG.linkedinUrl}</a></li>
    <li>Zestchat (Live): <a href="${CONFIG.projectZestchat}">${CONFIG.projectZestchat}</a></li>
    <li>Pixel Polish (Live): <a href="${CONFIG.projectPixelPolish}">${CONFIG.projectPixelPolish}</a></li>
  </ul>

  <p>Regarding my availability: I am currently serving notice with an official Last Working Day of Nov 11, but I can get released earlier if needed as my manager is flexible (can join immediately). I am open to on-site/hybrid opportunities${locText}.</p>

  <p>I have attached my resume for your review. Let me know if my background aligns with what you're looking for, and we can set up a short call.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${CONFIG.senderEmail}">${CONFIG.senderEmail}</a>
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
function getAttachments(company = "") {
  const attachments = [];
  if (company) {
    const safeComp = company.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_");
    const tailoredPath = path.join(__dirname, "dist_resumes", `Murali_Krishna_Popuri_${safeComp}.pdf`);
    if (fs.existsSync(tailoredPath)) {
      attachments.push({
        filename: path.basename(tailoredPath),
        path: tailoredPath,
      });
      return attachments;
    }
  }

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
      attachment: getAttachments(app.company).length > 0 ? getAttachments(app.company)[0].filename : "None",
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
      attachments: getAttachments(app.company),
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
