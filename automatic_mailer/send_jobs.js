#!/usr/bin/env node

/**
 * ============================================================
 *  Automated Job Outreach Mailer — send_jobs.js
 * ============================================================
 *  Usage:
 *    node send_jobs.js --dry-run   → Preview all emails (saved to preview_emails.json)
 *    node send_jobs.js --send      → Send all emails via Gmail SMTP
 * ============================================================
 */

require("dotenv").config();
const nodemailer = require("nodemailer");
const XLSX = require("xlsx");
const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

// ─── ANSI Color Helpers ────────────────────────────────────────
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
};

const log = {
  info: (msg) => console.log(`${C.cyan}ℹ ${C.reset}${msg}`),
  success: (msg) => console.log(`${C.green}✔ ${C.reset}${C.green}${msg}${C.reset}`),
  warn: (msg) => console.log(`${C.yellow}⚠ ${C.reset}${C.yellow}${msg}${C.reset}`),
  error: (msg) => console.log(`${C.red}✖ ${C.reset}${C.red}${msg}${C.reset}`),
  header: (msg) =>
    console.log(
      `\n${C.bgBlue}${C.white}${C.bright} ${msg} ${C.reset}\n`
    ),
  divider: () =>
    console.log(`${C.dim}${"─".repeat(60)}${C.reset}`),
  email: (idx, total, to, subject, status) => {
    const tag =
      status === "sent"
        ? `${C.bgGreen}${C.white} SENT `
        : status === "draft"
        ? `${C.bgYellow}${C.white} DRAFT `
        : `${C.bgRed}${C.white} FAIL `;
    console.log(
      `${tag}${C.reset} ${C.dim}[${idx}/${total}]${C.reset} ${C.bright}${to}${C.reset}`
    );
    console.log(`       ${C.dim}Subject:${C.reset} ${subject}`);
  },
};

// ─── Configuration ─────────────────────────────────────────────
const CONFIG = {
  senderEmail: process.env.SENDER_EMAIL || "popurimurali16@gmail.com",
  appPassword: process.env.GMAIL_APP_PASSWORD,
  senderName: "Murali Krishna Popuri",
  delayMs: 3000, // 3-second delay between emails
  previewFile: path.join(__dirname, "preview_emails.json"),
  resumeFile: path.join(__dirname, "resume.txt"),
};

// ─── Supported Input Files ─────────────────────────────────────
const SUPPORTED_EXTENSIONS = [".xlsx", ".xls", ".csv", ".docx"];

// ─── Find the Input Data File ──────────────────────────────────
function findInputFile() {
  const files = fs.readdirSync(__dirname);
  for (const ext of SUPPORTED_EXTENSIONS) {
    const match = files.find(
      (f) =>
        f.toLowerCase().endsWith(ext) &&
        !f.startsWith("~$") && // skip temp files
        f.toLowerCase() !== "package.json"
    );
    if (match) return { file: path.join(__dirname, match), ext };
  }
  return null;
}

// ─── Parse Excel / CSV ────────────────────────────────────────
function parseExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  return rows
    .map((row) => {
      // Flexible column name matching
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
        "";
      const companyContext =
        row["Company Context"] ||
        row["Context"] ||
        row["company_context"] ||
        row["Notes"] ||
        "";
      return {
        company: company.trim(),
        email: email.trim(),
        jobLink: jobLink.trim(),
        role: role.trim(),
        companyContext: companyContext.trim(),
      };
    })
    .filter((r) => r.email && r.company);
}

// ─── Parse Docx ────────────────────────────────────────────────
async function parseDocx(filePath) {
  const buffer = fs.readFileSync(filePath);
  const result = await mammoth.extractRawText({ buffer });
  const text = result.value;

  // Attempt structured parsing: each line = Company | Email | Link
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const entries = [];
  for (const line of lines) {
    // Try pipe-separated or tab-separated
    const parts = line.includes("|") ? line.split("|") : line.split("\t");
    if (parts.length >= 2) {
      const emailPart = parts.find((p) => p.includes("@"));
      const linkPart = parts.find((p) => p.startsWith("http"));
      const companyPart = parts.find((p) => !p.includes("@") && !p.startsWith("http"));

      if (emailPart && companyPart) {
        entries.push({
          company: companyPart.trim(),
          email: emailPart.trim(),
          jobLink: linkPart ? linkPart.trim() : "",
        });
      }
    }
  }
  return entries;
}

// ─── Parse Resume ──────────────────────────────────────────────
function parseResume() {
  if (!fs.existsSync(CONFIG.resumeFile)) {
    log.warn("resume.txt not found — using default skill summary.");
    return {
      raw: "",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "SQL", "TypeScript", "JavaScript", "HTML", "CSS"],
      highlights: [
        "Built production-level web platforms and REST APIs",
        "Strong MERN stack experience",
        "Immediate availability",
      ],
    };
  }

  const raw = fs.readFileSync(CONFIG.resumeFile, "utf-8");
  const lower = raw.toLowerCase();

  // Extract skills dynamically
  const allSkills = [
    "React.js", "React", "Node.js", "Express.js", "Express",
    "MongoDB", "MySQL", "PostgreSQL", "SQL Server", "SQL",
    "TypeScript", "JavaScript", "HTML5", "CSS3", "HTML", "CSS",
    "Docker", "Git", "REST API", "JWT", "OAuth",
    "Agile", "CI/CD", "Linux", "Responsive Design",
  ];
  const foundSkills = allSkills.filter((s) => lower.includes(s.toLowerCase()));

  // Extract project highlights — handle both inline bullets and
  // the format where • is on its own line with content on the next line
  const highlights = [];
  const rawLines = raw.split("\n");
  for (let i = 0; i < rawLines.length; i++) {
    const trimmed = rawLines[i].trim();
    // Inline bullet: "• Built offline-first ..."
    if (trimmed.startsWith("• ") && trimmed.length > 2) {
      highlights.push(trimmed.replace(/^•\s*/, "").trim());
    }
    // Standalone bullet on its own line — grab the next non-empty line
    else if (trimmed === "•" && i + 1 < rawLines.length) {
      const next = rawLines[i + 1].trim();
      if (next && next !== "•") {
        highlights.push(next);
        i++; // skip the content line we just consumed
      }
    }
    // Dash-style bullet: "- Built something ..."
    else if (trimmed.startsWith("- ") && trimmed.length > 2) {
      highlights.push(trimmed.replace(/^-\s*/, "").trim());
    }
  }

  // Extract years of experience from professional summary
  const yearsMatch = raw.match(/(\d+)\s*years?\s*(of)?\s*(professional)?\s*experience/i);
  const yearsExp = yearsMatch ? yearsMatch[1] : null;

  return { raw, skills: foundSkills, highlights: highlights.slice(0, 8), yearsExp };
}

// ─── ATS Resume Tailoring Engine ────────────────────────────────
// Uses ONLY Murali's genuine skills from MURALI-KRISHNA_Aug_03.pdf
function generateAtsTailoredResume(company, role, keywords) {
  const roleLower = role.toLowerCase();
  
  let topSkillsSection = "";
  if (roleLower.includes("frontend") || roleLower.includes("react")) {
    topSkillsSection = "• Core Frontend: React.js, Next.js, TypeScript, JavaScript (ES6+), Redux, Tailwind CSS, HTML5, CSS3, Handlebars (HBS)\n• Architecture & UI: Component Lifecycle, State Management, HTML5 Canvas filters, Responsive Web UI/UX\n• Desktop & Backend: Electron, Node.js, Express.js, REST APIs, WebSockets\n• Databases & Tools: PostgreSQL, MongoDB, SQLite, Git, GitHub, Postman, Vercel";
  } else if (roleLower.includes("backend") || roleLower.includes("node")) {
    topSkillsSection = "• Core Backend: Node.js, Express.js, REST APIs, WebSockets, Webhooks, Node-Cron, Multer, Axios\n• Databases & Caching: PostgreSQL, MySQL, SQLite, MongoDB, Redis, Schema Design, Query Optimization\n• Frontend & Desktop: React.js, TypeScript, Next.js, Electron, Redux\n• Systems & DevOps: LAN Local Server Architecture, Bi-directional Cloud Sync, S3 Uploads, Git, Postman";
  } else {
    topSkillsSection = "• Languages & Core: JavaScript (ES6+), TypeScript, PHP, SQL (MySQL, PostgreSQL, SQLite), HTML5, CSS3\n• Frontend & Desktop: React.js, Next.js, Electron, Redux, Tailwind CSS, Bootstrap\n• Backend & APIs: Node.js, Express.js, REST APIs, WebSockets, Node-Cron, Multer, Axios\n• Databases & Tools: MongoDB, Redis, Git, GitHub, VS Code, Postman, AWS S3, Vercel";
  }

  return `MURALI KRISHNA POPURI
Full-Stack Developer | 2+ Years Experience | Location: Open to Relocation (Hyderabad / Bangalore / Vizag)
Phone: +91 9347796811 | Email: popurimurali16@gmail.com | Portfolio: murali-portfolio-website.vercel.app
LinkedIn: linkedin.com/in/murali-krishna-popuri | GitHub: github.com/Muralikrishnapopuri

Target Role: ${role} — ${company}

PROFESSIONAL SUMMARY
Results-driven Full-Stack Developer with 2+ years of professional experience building scalable desktop systems, real-time web applications, and hybrid offline-first platforms. Proficient in React, TypeScript, Node.js, Express, and SQL/NoSQL databases. Proven track record of architecting local network synchronization protocols, optimizing queries, and delivering high-performance UIs.

TARGETED ATS TECHNICAL SKILLS
${topSkillsSection}

PROFESSIONAL EXPERIENCE
YoungMinds Technology Solutions Pvt Ltd | Full-Stack Developer | Feb 2025 – Present
RestoSoft – Offline Desktop POS (Electron) & Web Platform
• Built offline-first Windows POS (Electron, React/TS, Node/Express, SQLite) — full billing/KOT works with zero internet.
• Designed LAN architecture: Main Computer as local server, cashier terminals + waiter app synced via local IP in real-time.
• Built bi-directional cloud sync engine with auto upload/download, failure retry logic, and zero duplication.
• Developed 4 role-based web applications (Admin, Cashier, Waiter, Digital Menu) supporting Fine Dine, QSR, and Takeaway.
• Implemented live order updates via long polling, API rate limiting, AWS S3 uploads, and silent thermal printing.

Codtech IT Solutions Pvt Ltd | Full-Stack Developer Intern | Sep 2024 – Oct 2024
• Developed responsive beverage e-commerce platform using React, Node.js, Express, and MongoDB with REST API integrations.
• Collaborated in Agile team using Git version control for code reviews and feature pull requests.

Chegg India Pvt Ltd | Subject Matter Expert | Oct 2022 – Jan 2023
• Resolved 150+ complex computer science and web development queries with verified code snippets.

KEY PROJECTS
Zestchat (Real-Time Messaging) | React, Redux, Node.js, Express, PostgreSQL, Cloudinary, Node-Cron
• Live Demo: https://zestchat.vercel.app | Relational PostgreSQL schema using pg connection pool for optimized query execution.
• Built Express routes for guest credential expiration and scheduled Node-Cron background session cleanups.

Pixel Polish (Web Photo Editor) | React.js, HTML5 Canvas, Express, Multer, Cloudinary
• Live Demo: https://pixelpolish.vercel.app | High-speed client-side image filters (brightness/contrast) using HTML5 Canvas under 50ms.

EDUCATION
B.Tech in Computer Science | Amrita Sai Institute of Science and Technology (2019 – 2023) | CGPA: 7.35`;
}

// ─── Email Generation Engine ───────────────────────────────────
function generateEmail(company, jobLink, resume, role, companyContext, jobDescription) {
  const expYears = resume.yearsExp || "2";
  const appliedRole = role || "Full-Stack Developer";

  // ── Subject line (clear, actionable) ──
  const subject = `Application for ${appliedRole} – Murali Krishna Popuri`;

  // ── Role-aware skill selection ──
  const roleLower = appliedRole.toLowerCase();
  let relevantStack;
  if (roleLower.includes("frontend") || roleLower.includes("front-end") || roleLower.includes("react")) {
    relevantStack = "React.js, Next.js, TypeScript, JavaScript, Redux, Tailwind CSS, HTML5, CSS3";
  } else if (roleLower.includes("backend") || roleLower.includes("node")) {
    relevantStack = "Node.js, Express.js, REST APIs, MongoDB, PostgreSQL, MySQL, Redis";
  } else {
    relevantStack = "React.js, Node.js, TypeScript, Express, MongoDB, PostgreSQL, SQL";
  }

  // ── Enthusiastic Hook tailored to Company & JD ──
  const enthusiasmHook = companyContext
    ? `I am extremely enthusiastic about ${company}'s work in ${companyContext}. Having built production-grade web systems and real-time synchronization engines, I am confident I am a perfect fit for this role.`
    : `I am highly enthusiastic about ${company}'s products and engineering culture. My hands-on experience building production SaaS platforms makes me a strong fit for your team.`;

  // ── Job link reference ──
  const jobRef = jobLink
    ? `I am writing to express my strong interest in the ${appliedRole} role at ${company} (${jobLink}).`
    : `I am writing to express my strong interest in the ${appliedRole} role at ${company}.`;

  // ── Generate Tailored ATS Resume Text ──
  const atsResumeText = generateAtsTailoredResume(company, appliedRole, jobDescription || companyContext);

  // ── Build the email body ──
  const body = `Dear Hiring Team,

${jobRef}

${enthusiasmHook}

I'm Murali Krishna Popuri, a Full-Stack Developer with ${expYears}+ years of professional experience specializing in React, TypeScript, Node.js, and SQL/NoSQL databases.

Key Highlights of My Experience:
• Production SaaS & Offline POS: Built an offline-first Windows POS system using Electron, React, TypeScript, Node.js, and SQLite, alongside 4 role-based web platforms handling real-time data sync, long-polling, and microservices.
• Stack Expertise: ${relevantStack}.
• Performance & Real-Time: Architected relational PostgreSQL schemas, Canvas image processing under 50ms, and WebSockets/Node-Cron background services.

Please find my customized ATS-friendly resume below and attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Featured Live Projects:
• Zestchat (Real-time Messaging): https://zestchat.vercel.app
• Pixel Polish (Canvas Image Editor): https://pixelpolish.vercel.app

============================================================
📄 CUSTOM ATS-TAILORED RESUME SUMMARY FOR ${company.toUpperCase()}
============================================================
${atsResumeText}
============================================================

I'd welcome the opportunity to discuss how my full-stack skills and enthusiasm can contribute to ${company}'s team.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

  return { subject, body, atsResumeText };
}

// ─── Generate HTML Email ───────────────────────────────────────
function generateHtmlBody(plainBody) {
  const lines = plainBody.split("\n");
  let html = "";
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("•")) {
      if (!inList) {
        html += "<ul style=\"margin:8px 0;padding-left:20px;\">";
        inList = true;
      }
      html += `<li style="margin:3px 0;color:#333;">${trimmed.replace(/^•\s*/, "")}</li>`;
    } else {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      if (trimmed === "") {
        html += "<br/>";
      } else {
        html += `<p style="margin:4px 0;color:#222;line-height:1.5;">${trimmed}</p>`;
      }
    }
  }
  if (inList) html += "</ul>";

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; color: #222; max-width: 600px;">
      ${html}
    </div>
  `;
}

// ─── Delay Utility ─────────────────────────────────────────────
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Create Nodemailer Transport ───────────────────────────────
function createTransport() {
  if (!CONFIG.appPassword || CONFIG.appPassword === "your_16_digit_app_password") {
    log.error("GMAIL_APP_PASSWORD is not set in .env file!");
    log.info(
      "Generate one at: https://myaccount.google.com/apppasswords"
    );
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

// ─── DRY RUN Mode ──────────────────────────────────────────────
async function dryRun(entries, resume) {
  log.header("DRY RUN — Generating Email Previews");
  log.info(`Found ${entries.length} recipient(s) to process.\n`);

  const previews = [];

  for (let i = 0; i < entries.length; i++) {
    const { company, email, jobLink, role, companyContext } = entries[i];
    const { subject, body } = generateEmail(company, jobLink, resume, role, companyContext);

    previews.push({
      index: i + 1,
      company,
      recipientEmail: email,
      jobLink: jobLink || "N/A",
      subject,
      body,
    });

    log.email(i + 1, entries.length, email, subject, "draft");
    log.divider();
  }

  fs.writeFileSync(CONFIG.previewFile, JSON.stringify(previews, null, 2), "utf-8");

  console.log("");
  log.success(`All ${previews.length} email draft(s) saved to: preview_emails.json`);
  log.info("Review the file, then run:  node send_jobs.js --send");
}

// ─── SEND Mode ─────────────────────────────────────────────────
async function sendEmails(entries, resume) {
  log.header("SENDING EMAILS via Gmail SMTP");

  const transporter = createTransport();

  // Verify SMTP connection
  try {
    await transporter.verify();
    log.success("SMTP connection verified successfully.\n");
  } catch (err) {
    log.error(`SMTP verification failed: ${err.message}`);
    log.info("Check your SENDER_EMAIL and GMAIL_APP_PASSWORD in .env");
    process.exit(1);
  }

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < entries.length; i++) {
    const { company, email, jobLink, role, companyContext } = entries[i];
    const { subject, body } = generateEmail(company, jobLink, resume, role, companyContext);
    const htmlBody = generateHtmlBody(body);

    const mailOptions = {
      from: `"${CONFIG.senderName}" <${CONFIG.senderEmail}>`,
      to: email,
      subject,
      text: body,
      html: htmlBody,
    };

    try {
      await transporter.sendMail(mailOptions);
      sent++;
      log.email(i + 1, entries.length, email, subject, "sent");
    } catch (err) {
      failed++;
      log.email(i + 1, entries.length, email, subject, "fail");
      log.error(`  Error: ${err.message}`);
    }

    log.divider();

    // Delay between emails (skip after last)
    if (i < entries.length - 1) {
      process.stdout.write(
        `${C.dim}  ⏳ Waiting ${CONFIG.delayMs / 1000}s before next email...${C.reset}\r`
      );
      await delay(CONFIG.delayMs);
      process.stdout.write("                                                \r");
    }
  }

  // Summary
  console.log("");
  log.header("SEND SUMMARY");
  log.success(`Sent:   ${sent}`);
  if (failed > 0) log.error(`Failed: ${failed}`);
  log.info(`Total:  ${entries.length}`);
}

// ─── Main Entry Point ─────────────────────────────────────────
async function main() {
  console.log("");
  console.log(
    `${C.bgMagenta}${C.white}${C.bright} 📧  AUTOMATIC JOB OUTREACH MAILER  ${C.reset}`
  );
  console.log(
    `${C.dim}    Personalized cold emails for job applications${C.reset}`
  );
  console.log("");

  // Parse CLI args
  const args = process.argv.slice(2);
  const mode = args.includes("--send")
    ? "send"
    : args.includes("--dry-run")
    ? "dry-run"
    : null;

  if (!mode) {
    log.warn("No mode specified. Use one of:");
    console.log(`   ${C.cyan}node send_jobs.js --dry-run${C.reset}  → Preview emails`);
    console.log(`   ${C.cyan}node send_jobs.js --send${C.reset}     → Send emails`);
    process.exit(0);
  }

  // Find and parse input file
  log.info("Scanning for input data file...");
  const inputResult = findInputFile();

  if (!inputResult) {
    log.error(
      "No input file found! Place an .xlsx, .xls, .csv, or .docx file in the automatic_mailer folder."
    );
    log.info('Expected columns: "Company Name", "HR Email" (or "Email"), "Job Link"');
    process.exit(1);
  }

  log.success(`Found: ${path.basename(inputResult.file)} (${inputResult.ext})`);

  let entries;
  if (inputResult.ext === ".docx") {
    entries = await parseDocx(inputResult.file);
  } else {
    entries = parseExcel(inputResult.file);
  }

  if (!entries || entries.length === 0) {
    log.error("No valid entries found in the input file.");
    log.info('Ensure columns: "Company Name", "HR Email", "Job Link" are present.');
    process.exit(1);
  }

  log.success(`Parsed ${entries.length} company record(s).`);

  // Parse resume
  log.info("Reading resume for skill context...");
  const resume = parseResume();
  log.success(`Skills detected: ${resume.skills.join(", ")}`);
  console.log("");

  // Execute mode
  if (mode === "dry-run") {
    await dryRun(entries, resume);
  } else {
    await sendEmails(entries, resume);
  }

  console.log("");
}

main().catch((err) => {
  log.error(`Fatal error: ${err.message}`);
  console.error(err);
  process.exit(1);
});
