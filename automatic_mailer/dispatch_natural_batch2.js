/**
 * NATURAL HUMAN DISPATCH SCRIPT - BATCH 2 (SEPTEMBER 23, 2026)
 *
 * 100% human-crafted tone:
 * - Clean standard email styling (looks like composed directly in Gmail / Apple Mail)
 * - Direct, authentic wording without AI buzzwords
 * - Verified against sent_history.json (no duplicate emails)
 * - Strictly follows all AGENTS.md rules:
 *   - Strictly 2 years professional software engineering experience (never 2+, 2.5, or fresher)
 *   - Immediate Joiner (LWD: Nov 11, negotiable for immediate early release upon offer)
 *   - Relocation: Hyderabad / Bengaluru immediately ready
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
  // 1. Rajika / Sireesha - Senior MERN Developer (Hyderabad / Bangalore)
  {
    email: "rajika.pp94@gmail.com",
    company: "MERN Development Team",
    role: "MERN Developer",
    subject: "MERN Developer Application - Murali Krishna Popuri",
    plainBody: `Hi Rajika,

I came across your post regarding the MERN Developer opening in Hyderabad/Bangalore and wanted to share my profile.

While I see the post calls for more senior experience, my daily core stack directly aligns with MongoDB, Express.js, React.js, Node.js, and RESTful APIs. I have 2 years of professional software engineering experience building scalable web applications and integrating real-time communication protocols.

${RESTOSOFT_LINE}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and available to relocate to Hyderabad or Bangalore immediately.

I have attached my resume for your review. If you have any suitable openings or would be open to considering my profile, I would be grateful for the opportunity to connect.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Rajika",
      intro:
        "I came across your post regarding the MERN Developer opening in Hyderabad/Bangalore and wanted to share my profile.",
      techDetails:
        "While I see the post calls for more senior experience, my daily core stack directly aligns with MongoDB, Express.js, React.js, Node.js, and RESTful APIs. I have 2 years of professional software engineering experience building scalable web applications and integrating real-time communication protocols.",
      bridgePitch: BRIDGE_PITCH,
      locationLine:
        "I am based in Andhra Pradesh and available to relocate to Hyderabad or Bangalore immediately.",
    }),
  },

  // 2. Sakshi Bhardwaj (The Global Skills) - Full Stack Engineer (Hyderabad)
  {
    email: "sakshi@theglobalskills.com",
    company: "The Global Skills",
    role: "Full Stack Engineer (TypeScript / Node / React)",
    subject: "Full Stack Engineer Application - Murali Krishna Popuri",
    plainBody: `Hi Sakshi,

I noticed your post regarding the Engineer opening in Hyderabad and wanted to reach out.

While I understand the role seeks senior experience, my primary expertise is centered on TypeScript, Node.js, React, APIs, and modern web application development. I have 2 years of professional software engineering experience and am completely comfortable working night shifts.

${RESTOSOFT_LINE}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and available to relocate to Hyderabad immediately.

I have attached my resume for your review. If you have any suitable openings or would be open to considering my profile, I would be grateful for the opportunity to connect.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Sakshi",
      intro:
        "I noticed your post regarding the Engineer opening in Hyderabad and wanted to reach out.",
      techDetails:
        "While I understand the role seeks senior experience, my primary expertise is centered on TypeScript, Node.js, React, APIs, and modern web application development. I have 2 years of professional software engineering experience and am completely comfortable working night shifts.",
      bridgePitch: BRIDGE_PITCH,
      locationLine:
        "I am based in Andhra Pradesh and available to relocate to Hyderabad immediately.",
    }),
  },

  // 3. Rekha Goodaara (eKlouD Services) - Full Stack Developer (Bangalore)
  {
    email: "rekha.g@ekloudservices.com",
    company: "eKlouD Services",
    role: "Full Stack Developer",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    plainBody: `Hi Rekha,

I came across your post regarding the urgent Full Stack Developer requirement in Bangalore and wanted to reach out with my profile.

I have 2 years of professional software engineering experience working with React.js, Next.js, TypeScript, and modern APIs, building clean frontend interfaces and connecting backend services.

${RESTOSOFT_LINE}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and available to relocate to Bangalore immediately for onsite work.

I have attached my resume for your review. If you have any suitable openings or would be open to considering my profile, I would be grateful for the opportunity to connect.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Rekha",
      intro:
        "I came across your post regarding the urgent Full Stack Developer requirement in Bangalore and wanted to reach out with my profile.",
      techDetails:
        "I have 2 years of professional software engineering experience working with React.js, Next.js, TypeScript, and modern APIs, building clean frontend interfaces and connecting backend services.",
      bridgePitch: BRIDGE_PITCH,
      locationLine:
        "I am based in Andhra Pradesh and available to relocate to Bangalore immediately for onsite work.",
    }),
  },

  // 4. Saibabu Surapaneni (Pronix Inc) - Full Stack AI Engineer (Hyderabad)
  {
    email: "sai@pronixinc.com",
    company: "Pronix Inc",
    role: "Full Stack AI Engineer",
    subject: "Full Stack AI Engineer Application - Murali Krishna Popuri",
    plainBody: `Hi Saibabu,

I noticed your post regarding the Full Stack AI Engineer opening at Pronix in Gachibowli, Hyderabad, and wanted to share my profile.

I have 2 years of professional software engineering experience developing full-stack web platforms with React.js, Node.js, TypeScript, and integrating modern APIs and data workflows.

${RESTOSOFT_LINE}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and ready to relocate to Hyderabad immediately for onsite shifts.

I have attached my resume for your review. If you have any suitable openings or would be open to considering my profile, I would be grateful for the opportunity to connect.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Saibabu",
      intro:
        "I noticed your post regarding the Full Stack AI Engineer opening at Pronix in Gachibowli, Hyderabad, and wanted to share my profile.",
      techDetails:
        "I have 2 years of professional software engineering experience developing full-stack web platforms with React.js, Node.js, TypeScript, and integrating modern APIs and data workflows.",
      bridgePitch: BRIDGE_PITCH,
      locationLine:
        "I am based in Andhra Pradesh and ready to relocate to Hyderabad immediately for onsite shifts.",
    }),
  },

  // 5. Aryaanshi Chaturvedi (Apidel Technologies) - Full Stack Developer (Remote)
  {
    email: "aryaanshi.c@apideltech.com",
    company: "Apidel Technologies",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Application - Murali Krishna Popuri",
    plainBody: `Hi Aryaanshi,

I saw your post for the Full Stack Developer role at Apidel Technologies and would like to put forward my application.

I have 2 years of professional software engineering experience working with Next.js, React.js, Node.js, and SQL, building scalable web applications and connecting cloud services.

${RESTOSOFT_LINE}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and comfortable working UK shift hours.

I have attached my resume for your review. If you have any suitable openings or would be open to considering my profile, I would be grateful for the opportunity to connect.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Aryaanshi",
      intro:
        "I saw your post for the Full Stack Developer role at Apidel Technologies and would like to put forward my application.",
      techDetails:
        "I have 2 years of professional software engineering experience working with Next.js, React.js, Node.js, and SQL, building scalable web applications and connecting cloud services.",
      bridgePitch: BRIDGE_PITCH,
      locationLine: "I am based in Andhra Pradesh and comfortable working UK shift hours.",
    }),
  },

  // 6. Jashu Sinha - UI Developer (ReactJS)
  {
    email: "Jashusinha.jmp02@gmail.com",
    company: "Recruitment Team",
    role: "UI Developer (ReactJS)",
    subject: "UI Developer Application (ReactJS) - Murali Krishna Popuri",
    plainBody: `Hi Jashu,

I noticed your post regarding the UI Developer (ReactJS) opening and wanted to share my profile.

I have 2 years of professional software engineering experience focused on ReactJS, JavaScript, responsive web development, and integrating backend REST APIs with clean, maintainable components.

${RESTOSOFT_LINE}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and available to relocate immediately.

I have attached my resume for your consideration. If you have any suitable openings or would be open to considering my profile, I would be grateful for the opportunity to connect.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Jashu",
      intro:
        "I noticed your post regarding the UI Developer (ReactJS) opening and wanted to share my profile.",
      techDetails:
        "I have 2 years of professional software engineering experience focused on ReactJS, JavaScript, responsive web development, and integrating backend REST APIs with clean, maintainable components.",
      bridgePitch: BRIDGE_PITCH,
      locationLine: "I am based in Andhra Pradesh and available to relocate immediately.",
    }),
  },
];

async function main() {
  console.log("Starting natural human email dispatch for Batch 2 leads...\n");
  const result = await sendBatchSafely(leads, { maxBatch: leads.length });
  console.log("\nBatch 2 Result:", result);
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Execution error:", err);
    process.exit(1);
  });
}

module.exports = { leads };
