/**
 * NATURAL HUMAN DISPATCH SCRIPT - BATCH 3 (SEPTEMBER 23, 2026)
 *
 * 100% human-crafted tone:
 * - Clean standard email styling (looks like composed directly in Gmail / Apple Mail)
 * - Direct, authentic wording without AI buzzwords
 * - Verified against sent_history.json (no duplicate emails)
 * - Strictly follows all AGENTS.md rules:
 *   - Strictly 2 years professional software engineering experience (never 2+, 2.5, or fresher)
 *   - Immediate Joiner (LWD: Nov 11, negotiable for immediate early release upon offer)
 *   - Relocation: Bengaluru / Bangalore immediately ready
 *   - Mandatory RestoSoft / YoungMinds 2-line context
 *   - Polite bridge pitch for senior roles
 *   - Exactly 4 permitted links (Portfolio, LinkedIn, GitHub, Zestchat)
 *   - Attached resume: Murali_Krishna_Popuri_FullStack_Developer.pdf
 *   - Zero emojis
 *   - Anti-spam randomized delay (45s - 90s)
 */

const { sendBatchSafely, isAlreadySent } = require("./safe_mailer.js");

const RESTOSOFT_LINE =
  "I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.";

const BRIDGE_PITCH =
  "While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.";

const NOTICE_PERIOD_LINE =
  "I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).";

const WORK_LINKS_TEXT = `My work links:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat: https://zestchat.vercel.app`;

const WORK_LINKS_HTML = `My work links:<br>
- Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #1155cc;">https://murali-portfolio-website.vercel.app</a><br>
- LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #1155cc;">https://linkedin.com/in/murali-krishna-popuri</a><br>
- GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #1155cc;">https://github.com/Muralikrishnapopuri</a><br>
- Zestchat: <a href="https://zestchat.vercel.app" style="color: #1155cc;">https://zestchat.vercel.app</a>`;

const FOOTNOTE =
  "P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.";

function createNormalHtml({ greeting, intro, techDetails, bridgePitch, locationLine }) {
  return `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #222222; line-height: 1.55;">
  <p>${greeting},</p>
  <p>${intro}</p>
  <p>${techDetails}</p>
  <p>${RESTOSOFT_LINE}</p>
  ${bridgePitch ? `<p>${bridgePitch}</p>` : ""}
  <p>${WORK_LINKS_HTML}</p>
  <p>${NOTICE_PERIOD_LINE} ${locationLine}</p>
  <p>I have attached my resume for your review. If you have any suitable openings or would be open to considering my profile, I would be grateful for the opportunity to connect.</p>
  <p>Thanks,<br>
  Murali Krishna Popuri<br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="margin-top: 24px; font-size: 12px; color: #666666; font-style: italic;">${FOOTNOTE}</p>
</div>`;
}

const leads = [
  // 1. Hariharan Dhanraj - VuNet Systems (Bengaluru)
  {
    email: "hariharan@vunetsystems.com",
    company: "VuNet Systems",
    role: "Senior Frontend Engineer",
    subject: "Frontend Engineer Application - Murali Krishna Popuri",
    plainBody: `Hi Hariharan,

I came across your post regarding the Frontend Engineer opening at VuNet and wanted to share my profile.

I have 2 years of professional software engineering experience building scalable, high-performance web applications with React.js, TypeScript, JavaScript (ES6+), Redux, and modern REST APIs and WebSockets.

${RESTOSOFT_LINE}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and available to relocate to Bengaluru immediately.

I have attached my resume for your review. If you are open to considering high-ownership engineers with 2 years of hands-on experience, I would be grateful for the opportunity to connect.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Hariharan",
      intro:
        "I came across your post regarding the Frontend Engineer opening at VuNet and wanted to share my profile.",
      techDetails:
        "I have 2 years of professional software engineering experience building scalable, high-performance web applications with React.js, TypeScript, JavaScript (ES6+), Redux, and modern REST APIs and WebSockets.",
      bridgePitch: BRIDGE_PITCH,
      locationLine:
        "I am based in Andhra Pradesh and available to relocate to Bengaluru immediately.",
    }),
  },

  // 2. Madan Raj - Tech and Grow Global (Bangalore)
  {
    email: "madanraj.c@techgrowglobal.com",
    company: "Tech and Grow Global",
    role: "Full Stack Engineer",
    subject: "Full Stack Engineer Application - Murali Krishna Popuri",
    plainBody: `Hi Madan,

I saw your post for the Full Stack Engineer role at Tech and Grow Global in Bangalore and wanted to reach out with my application.

I have 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express, JavaScript, TypeScript, REST APIs, and databases.

${RESTOSOFT_LINE}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and available to relocate to Bangalore immediately for full-time onsite work.

I have attached my resume for your review. If you have any suitable openings or would be open to considering my profile, I would be grateful for the opportunity to connect.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Madan",
      intro:
        "I saw your post for the Full Stack Engineer role at Tech and Grow Global in Bangalore and wanted to reach out with my application.",
      techDetails:
        "I have 2 years of professional software engineering experience specializing in React.js, Next.js, Node.js, Express, JavaScript, TypeScript, REST APIs, and databases.",
      bridgePitch: BRIDGE_PITCH,
      locationLine:
        "I am based in Andhra Pradesh and available to relocate to Bangalore immediately for full-time onsite work.",
    }),
  },
];

async function main() {
  console.log("Starting natural human email dispatch for Batch 3 leads...\n");
  const result = await sendBatchSafely(leads, { maxBatch: leads.length });
  console.log("\nBatch 3 Result:", result);
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Execution error:", err);
    process.exit(1);
  });
}

module.exports = { leads };
