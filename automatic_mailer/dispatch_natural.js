/**
 * NATURAL HUMAN DISPATCH SCRIPT
 *
 * 100% human-crafted tone:
 * - No HTML cards, no borders, no gray boxes, no marketing templates
 * - Clean standard email styling (looks like composed in Gmail / Apple Mail)
 * - Authentic, direct wording free of AI jargon
 * - Strictly follows all AGENTS.md rules:
 *   - Strictly 2 years professional experience (never 2+, 2.5, or fresher)
 *   - Immediate Joiner (LWD: Nov 11, negotiable for immediate release upon offer)
 *   - Relocation: Hyderabad / Bengaluru immediately ready
 *   - Mandatory RestoSoft / YoungMinds 2-line context
 *   - Bridge pitch for >3 yrs requirements
 *   - Exactly 4 permitted links
 *   - Always attach resume PDF
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
  <p>I have attached my resume for your review. Please let me know if we can connect for a quick discussion.</p>
  <p>Thanks,<br>
  Murali Krishna Popuri<br>
  Phone: +91 9347796811<br>
  Email: popurimurali16@gmail.com</p>
  <p style="margin-top: 24px; font-size: 12px; color: #666666; font-style: italic;">${FOOTNOTE}</p>
</div>`;
}

const leads = [
  // 1. Calibre QA
  {
    email: "nalini.s@calibreqa.in",
    company: "Calibre QA",
    role: "Frontend Developer (React / Next.js)",
    subject: "Frontend Developer Application - Murali Krishna Popuri",
    plainBody: `Hi Nalini,

I saw your post for the Frontend Developer opening at Calibre QA and wanted to share my profile.

I have 2 years of professional software engineering experience working with React.js, Next.js, TypeScript, and JavaScript, building responsive UI components and integrating backend REST APIs.

${RESTOSOFT_LINE}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and available to relocate to Bengaluru immediately for onsite or hybrid work.

I have attached my resume for your review. Please let me know if we can connect for a quick discussion.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Nalini",
      intro: "I saw your post for the Frontend Developer opening at Calibre QA and wanted to share my profile.",
      techDetails:
        "I have 2 years of professional software engineering experience working with React.js, Next.js, TypeScript, and JavaScript, building responsive UI components and integrating backend REST APIs.",
      locationLine:
        "I am based in Andhra Pradesh and available to relocate to Bengaluru immediately for onsite or hybrid work.",
    }),
  },

  // 2. eKlouD Services
  {
    email: "a.radhika@ekloudservices.com",
    company: "eKlouD Services",
    role: "React Developer",
    subject: "Application for React Developer - Murali Krishna Popuri",
    plainBody: `Hi Radhika,

I noticed the React Developer opening at eKlouD Services and wanted to submit my application.

I have 2 years of professional software engineering experience focused on React.js, TypeScript, Next.js, and state management, building clean frontend features and connecting REST APIs.

${RESTOSOFT_LINE}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and ready to relocate to Bengaluru or Hyderabad immediately.

My resume is attached for your review. Would love to discuss how I can contribute to your team.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Radhika",
      intro: "I noticed the React Developer opening at eKlouD Services and wanted to submit my application.",
      techDetails:
        "I have 2 years of professional software engineering experience focused on React.js, TypeScript, Next.js, and state management, building clean frontend features and connecting REST APIs.",
      locationLine:
        "I am based in Andhra Pradesh and ready to relocate to Bengaluru or Hyderabad immediately.",
    }),
  },

  // 3. Thinkwires
  {
    email: "hr@thinkwires.com",
    company: "Thinkwires",
    role: "Frontend Developer",
    subject: "Frontend Developer Application - Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I am writing to apply for the Frontend Developer position at Thinkwires.

I have 2 years of professional software engineering experience working with React.js, JavaScript, and modern CSS, developing reusable UI components and optimizing web application performance.

${RESTOSOFT_LINE}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and available to relocate to Hyderabad or Bengaluru immediately.

I have attached my resume for your consideration. Look forward to hearing from you.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Hiring Team",
      intro: "I am writing to apply for the Frontend Developer position at Thinkwires.",
      techDetails:
        "I have 2 years of professional software engineering experience working with React.js, JavaScript, and modern CSS, developing reusable UI components and optimizing web application performance.",
      locationLine:
        "I am based in Andhra Pradesh and available to relocate to Hyderabad or Bengaluru immediately.",
    }),
  },

  // 4. LoTech Pro
  {
    email: "hr@lotechpro.in",
    company: "LoTech Pro",
    role: "Full-Stack Developer",
    subject: "Full-Stack Developer Role - Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I came across your opening for a Full-Stack Developer at LoTech Pro and would like to share my profile.

I have 2 years of professional software engineering experience working across the stack with React.js, Node.js, Express, databases, and REST APIs, building real-world web features and clean interfaces.

${RESTOSOFT_LINE}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and ready to relocate to Bengaluru immediately.

My resume is attached for your review. Would appreciate the opportunity to connect and discuss.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Hiring Team",
      intro:
        "I came across your opening for a Full-Stack Developer at LoTech Pro and would like to share my profile.",
      techDetails:
        "I have 2 years of professional software engineering experience working across the stack with React.js, Node.js, Express, databases, and REST APIs, building real-world web features and clean interfaces.",
      locationLine: "I am based in Andhra Pradesh and ready to relocate to Bengaluru immediately.",
    }),
  },

  // 5. Shereindiraa HR
  {
    email: "Shereindiraahr@gmail.com",
    company: "Shereindiraa HR",
    role: "Web Developer",
    subject: "Web Developer Application - Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I am writing regarding the Web Developer opening in Bangalore and would like to put forward my application.

I have 2 years of professional software engineering experience building web applications using React.js, Node.js, Express, SQL, and modern JavaScript.

${RESTOSOFT_LINE}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and available to relocate to Bangalore immediately.

I have attached my resume for your review. Look forward to your response.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Hiring Team",
      intro: "I am writing regarding the Web Developer opening in Bangalore and would like to put forward my application.",
      techDetails:
        "I have 2 years of professional software engineering experience building web applications using React.js, Node.js, Express, SQL, and modern JavaScript.",
      locationLine: "I am based in Andhra Pradesh and available to relocate to Bangalore immediately.",
    }),
  },

  // 6. HUQUO (Bridge Pitch applied per Rule 2)
  {
    email: "Monisha@huquo.com",
    company: "HUQUO",
    role: "Full Stack Developer (React and Node)",
    subject: "Application: Full Stack Developer (React and Node) - Murali Krishna Popuri",
    plainBody: `Hi Monisha,

I saw your post for the Full Stack Developer (React and Node) role at HUQUO and wanted to share my profile.

I have 2 years of professional software engineering experience working with React.js, Node.js, Express.js, TypeScript, and microservice architectures.

${RESTOSOFT_LINE}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and can relocate to Bengaluru, Pune, or Gurugram immediately.

I have attached my resume for your review. Look forward to discussing further.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Monisha",
      intro:
        "I saw your post for the Full Stack Developer (React and Node) role at HUQUO and wanted to share my profile.",
      techDetails:
        "I have 2 years of professional software engineering experience working with React.js, Node.js, Express.js, TypeScript, and microservice architectures.",
      bridgePitch: BRIDGE_PITCH,
      locationLine: "I am based in Andhra Pradesh and can relocate to Bengaluru, Pune, or Gurugram immediately.",
    }),
  },

  // 7. Capgemini (Bridge Pitch applied per Rule 2)
  {
    email: "harini.d-m@capgemini.com",
    company: "Capgemini",
    role: "MERN Stack Developer",
    subject: "Application for MERN Stack Developer - Murali Krishna Popuri",
    plainBody: `Hi Harini,

I noticed your post regarding the MERN Stack Developer opening at Capgemini in Bangalore and wanted to reach out with my profile.

I have 2 years of professional software engineering experience building web applications using React.js, Node.js, Express.js, MongoDB, and TypeScript.

${RESTOSOFT_LINE}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_LINE} I am based in Andhra Pradesh and available to attend client face-to-face evaluation in Bangalore immediately.

I have attached my resume for your review. Would appreciate the opportunity to discuss this role.

Thanks,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com

${FOOTNOTE}`,
    htmlBody: createNormalHtml({
      greeting: "Hi Harini",
      intro:
        "I noticed your post regarding the MERN Stack Developer opening at Capgemini in Bangalore and wanted to reach out with my profile.",
      techDetails:
        "I have 2 years of professional software engineering experience building web applications using React.js, Node.js, Express.js, MongoDB, and TypeScript.",
      bridgePitch: BRIDGE_PITCH,
      locationLine:
        "I am based in Andhra Pradesh and available to attend client face-to-face evaluation in Bangalore immediately.",
    }),
  },
];

async function main() {
  console.log("Starting natural human email dispatch for remaining verified leads...\n");
  const result = await sendBatchSafely(leads, { maxBatch: leads.length });
  console.log("\nBatch Result:", result);
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Execution error:", err);
    process.exit(1);
  });
}

module.exports = { leads };
