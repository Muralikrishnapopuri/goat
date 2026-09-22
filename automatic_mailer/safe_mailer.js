/**
 * SAFE MAILER MODULE - ANTI-SPAM COMPLIANT ENGINE
 *
 * Designed to prevent emails from landing in Spam / Junk folders:
 * 1. Human-Paced Delays (45s - 90s randomized jitter between dispatches)
 * 2. Strict Batch Limits (Max 10 per execution session)
 * 3. Daily Account Safety Cap (Max 45 cold emails / day for @gmail.com reputation protection)
 * 4. Zero Spam Triggers: 0 emojis, clean HTML + plain text multipart fallback
 * 5. Professional Headers (Reply-To, Normal Priority, standard mail client signature)
 * 6. Spam Filter Evasion: Rotating subject lines to prevent hash clustering
 * 7. Polite Opt-out / Disregard notice to prevent recipients hitting "Report Spam"
 */

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RESUME_PATH = path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf");
const HISTORY_FILE = path.join(__dirname, "sent_history.json");

// Safety Thresholds
const MAX_BATCH_SIZE = 10;
const MAX_DAILY_LIMIT = 45;
const MIN_DELAY_SEC = 45;
const MAX_DELAY_SEC = 90;

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

function isAlreadySent(email, history = null) {
  const list = history || loadHistory();
  const norm = (email || "").toLowerCase().trim();
  return list.some((h) => (h.recipientEmail || "").toLowerCase().trim() === norm && h.status === "SENT");
}

function getTodaySentCount(history = null) {
  const list = history || loadHistory();
  const todayStr = new Date().toISOString().split("T")[0];
  return list.filter((h) => h.timestamp && h.timestamp.startsWith(todayStr) && h.status === "SENT").length;
}

function recordSent(email, company, role, messageId) {
  const history = loadHistory();
  history.push({
    timestamp: new Date().toISOString(),
    recipientEmail: (email || "").toLowerCase().trim(),
    company: company || "General Outreach",
    role: role || "Full-Stack Developer",
    status: "SENT",
    messageId,
    resumeAttachment: path.basename(RESUME_PATH),
  });
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
}

function getRandomDelay(minSec = MIN_DELAY_SEC, maxSec = MAX_DELAY_SEC) {
  return Math.floor(Math.random() * (maxSec - minSec + 1) + minSec) * 1000;
}

const SUBJECT_ROTATION_TEMPLATES = [
  (role) => `Application for ${role || "Full-Stack Developer"} – Murali Krishna Popuri`,
  (role) => `${role || "Full-Stack Developer (React / Node.js)"} – Murali Krishna Popuri`,
  (role) => `Application: ${role || "React & Node.js Developer"} – Murali Krishna Popuri`,
  (role) => `Full Stack Software Engineer Application – Murali Krishna Popuri`,
];

function getRotatedSubject(role, index = 0) {
  const fn = SUBJECT_ROTATION_TEMPLATES[index % SUBJECT_ROTATION_TEMPLATES.length];
  return fn(role);
}

const COURTESY_DISREGARD_TEXT = `P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this email.`;

const COURTESY_DISREGARD_HTML = `<p style="margin-top: 22px; border-top: 1px solid #e1e4e8; padding-top: 12px; font-size: 12px; color: #666666; font-style: italic;">P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.</p>`;

/**
 * Creates standard anti-spam headers and verified mail options
 */
function createMailOptions({ to, subject, text, html }) {
  // Ensure polite note is included to prevent "Report Spam" clicks
  const finalPlainText = text.includes("disregard")
    ? text
    : `${text}\n\n${COURTESY_DISREGARD_TEXT}`;

  const finalHtml = html.includes("disregard")
    ? html
    : html.replace("</body>", `${COURTESY_DISREGARD_HTML}</body>`);

  return {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    replyTo: SENDER_EMAIL,
    to: to.trim(),
    subject: subject,
    text: finalPlainText,
    html: finalHtml,
    headers: {
      "X-Mailer": "Apple Mail (2.3654.120.0.1)",
      "Importance": "Normal",
      "X-Priority": "3",
      "X-MSMail-Priority": "Normal",
    },
    attachments: [
      {
        filename: path.basename(RESUME_PATH),
        path: RESUME_PATH,
      },
    ],
  };
}

/**
 * Sends a single email with anti-spam headers and validation
 */
async function sendSingleEmail({ to, subject, text, html, company, role }) {
  const history = loadHistory();

  if (isAlreadySent(to, history)) {
    console.log(`[SKIP] Already sent to ${to} in previous batch.`);
    return { status: "SKIPPED", reason: "Already sent" };
  }

  const mailOptions = createMailOptions({ to, subject, text, html });
  const info = await transporter.sendMail(mailOptions);
  recordSent(to, company, role, info.messageId);
  return { status: "SENT", messageId: info.messageId };
}

/**
 * Dispatches a batch of leads with strict anti-spam pacing and daily caps
 */
async function sendBatchSafely(leads, options = {}) {
  const batchLimit = options.maxBatch || MAX_BATCH_SIZE;
  const ignoreDailyCap = options.ignoreDailyCap || false;

  console.log("============================================================");
  console.log("ANTI-SPAM PROTECTED BATCH DISPATCHER");
  console.log(`Total Leads in Queue: ${leads.length} | Max Batch Run: ${batchLimit}`);
  console.log("============================================================");

  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP connection verified.\n");

  const history = loadHistory();
  const todaySent = getTodaySentCount(history);
  console.log(`Today's Sent Count: ${todaySent} / ${MAX_DAILY_LIMIT} max safe daily volume`);

  if (!ignoreDailyCap && todaySent >= MAX_DAILY_LIMIT) {
    console.warn(`\n[DAILY LIMIT REACHED] You have already sent ${todaySent} emails today.`);
    console.warn("To protect your Gmail reputation from spam filters, please resume tomorrow.");
    return { successCount: 0, skippedCount: 0, stoppedByDailyCap: true };
  }

  let successCount = 0;
  let skippedCount = 0;
  const processQueue = leads.slice(0, batchLimit);

  for (let i = 0; i < processQueue.length; i++) {
    const lead = processQueue[i];
    console.log(`\n[${i + 1}/${processQueue.length}] Processing: ${lead.email} (${lead.company || "General"})...`);

    if (isAlreadySent(lead.email, history)) {
      console.log(`  -> SKIP: ${lead.email} already present in sent_history.json`);
      skippedCount++;
      continue;
    }

    const subject = lead.subject || getRotatedSubject(lead.role, i);
    const mailOptions = createMailOptions({
      to: lead.email,
      subject: subject,
      text: lead.plainBody,
      html: lead.htmlBody,
    });

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`  -> SUCCESS! Message ID: ${info.messageId}`);
      recordSent(lead.email, lead.company, lead.role, info.messageId);
      successCount++;
    } catch (err) {
      console.error(`  -> FAILED for ${lead.email}:`, err.message);
    }

    // Natural humanized delay between emails
    if (i < processQueue.length - 1) {
      const delayMs = getRandomDelay();
      const delaySec = Math.round(delayMs / 1000);
      console.log(`  -> Waiting ${delaySec} seconds before next dispatch (natural pacing)...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  console.log("\n============================================================");
  console.log(`Batch Complete: Sent = ${successCount}, Skipped = ${skippedCount}`);
  console.log(`Total Emails Sent Today: ${getTodaySentCount()}`);
  console.log("============================================================");

  return { successCount, skippedCount, stoppedByDailyCap: false };
}

module.exports = {
  transporter,
  sendSingleEmail,
  sendBatchSafely,
  createMailOptions,
  getRotatedSubject,
  getRandomDelay,
  getTodaySentCount,
  isAlreadySent,
  recordSent,
  SENDER_EMAIL,
  RESUME_PATH,
  MAX_DAILY_LIMIT,
  MAX_BATCH_SIZE,
};
