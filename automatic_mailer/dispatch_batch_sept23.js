/**
 * BATCH DISPATCH SCRIPT - SEPTEMBER 23, 2026
 *
 * Micro-batch of 10 verified, high-yield recruiter opportunities.
 * Strictly compliant with all candidate rules from AGENTS.md:
 * - Strictly 2 years experience (never 2+, 2.5, or fresher)
 * - Immediate Joiner (LWD: Nov 11, negotiable for immediate release upon offer)
 * - Relocation: Hyderabad / Bengaluru immediately ready
 * - Mandatory RestoSoft / YoungMinds 2-line context
 * - Bridge pitch included for roles requiring >3 years or extra tools
 * - Exactly 4 permitted links (Portfolio, LinkedIn, GitHub, Zestchat)
 * - Always attach resume PDF
 * - Zero emojis throughout subject and body
 * - Anti-spam randomized delays (45s - 90s) via safe_mailer.js
 */

const path = require("path");
const { sendBatchSafely } = require("./safe_mailer.js");

const RESTOSOFT_SNIPPET =
  "I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.";

const BRIDGE_PITCH =
  "While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.";

const NOTICE_PERIOD_SNIPPET =
  "I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).";

const WORK_LINKS_TEXT = `My work links:
1. Portfolio: https://murali-portfolio-website.vercel.app
2. LinkedIn: https://linkedin.com/in/murali-krishna-popuri
3. GitHub: https://github.com/Muralikrishnapopuri
4. Zestchat: https://zestchat.vercel.app`;

const WORK_LINKS_HTML = `
<p style="margin: 14px 0 6px 0; font-weight: 600; color: #111827;">My work links:</p>
<ul style="margin: 0 0 16px 20px; padding: 0; color: #374151; line-height: 1.6;">
  <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #2563eb; text-decoration: underline;">https://murali-portfolio-website.vercel.app</a></li>
  <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #2563eb; text-decoration: underline;">https://linkedin.com/in/murali-krishna-popuri</a></li>
  <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #2563eb; text-decoration: underline;">https://github.com/Muralikrishnapopuri</a></li>
  <li><strong>Zestchat:</strong> <a href="https://zestchat.vercel.app" style="color: #2563eb; text-decoration: underline;">https://zestchat.vercel.app</a></li>
</ul>`;

function buildEmailHtml({ greeting, roleIntro, customBody, bridgePitch, locationText }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Application - Murali Krishna Popuri</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.65; color: #1f2937; margin: 0; padding: 20px; background-color: #f9fafb;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; padding: 28px; border: 1px solid #e5e7eb; border-radius: 6px;">
    <p style="margin-top: 0;">${greeting},</p>
    
    <p>${roleIntro}</p>
    
    <p>${customBody}</p>
    
    <p>${RESTOSOFT_SNIPPET}</p>
    
    ${bridgePitch ? `<p>${bridgePitch}</p>` : ""}
    
    ${WORK_LINKS_HTML}
    
    <p>${NOTICE_PERIOD_SNIPPET} ${locationText}</p>
    
    <p>My updated resume is attached to this email for your detailed review.</p>
    
    <p style="margin-bottom: 0;">
      Best regards,<br>
      <strong>Murali Krishna Popuri</strong><br>
      Full-Stack Developer<br>
      Phone: +91 9347796811<br>
      Email: popurimurali16@gmail.com
    </p>
  </div>
</body>
</html>`;
}

const leads = [
  // 1. Digi Rush Solutions
  {
    email: "isha.digirush@gmail.com",
    company: "Digi Rush Solutions",
    role: "Full Stack Developer",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Isha,

I am writing to apply for the Full Stack Developer opening at Digi Rush Solutions.

I have strictly 2 years of professional software engineering experience specializing in React.js, JavaScript (ES6+), Node.js, Express, MySQL, and real-time WebSockets integration.

${RESTOSOFT_SNIPPET}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_SNIPPET} I am based in Andhra Pradesh and available to relocate to Hyderabad or Bengaluru immediately, or start remotely.

My updated resume is attached to this email for your detailed review.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    htmlBody: buildEmailHtml({
      greeting: "Hi Isha",
      roleIntro: "I am writing to apply for the Full Stack Developer opening at Digi Rush Solutions.",
      customBody:
        "I have strictly 2 years of professional software engineering experience specializing in React.js, JavaScript (ES6+), Node.js, Express, MySQL, and real-time WebSockets integration.",
      locationText:
        "I am based in Andhra Pradesh and available to relocate to Hyderabad or Bengaluru immediately, or start remotely.",
    }),
  },

  // 2. Rugged Monitoring
  {
    email: "amylavarapu@ruggedmonitoring.com",
    company: "Rugged Monitoring",
    role: "Software Engineer 1 (Full Stack)",
    subject: "Application: Software Engineer 1 (Full Stack) – Murali Krishna Popuri",
    plainBody: `Hi Ajay,

I am reaching out to apply for the Software Engineer 1 (Full Stack) position at Rugged Monitoring in Hyderabad.

I have strictly 2 years of professional software engineering experience developing responsive web architectures with modern TypeScript, React, SQL/PostgreSQL databases, and REST APIs, while actively leveraging AI-assisted developer workflows to maintain high code velocity and system quality.

${RESTOSOFT_SNIPPET}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_SNIPPET} I am based in Andhra Pradesh and available to relocate to Hyderabad immediately.

My updated resume is attached to this email for your detailed review.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    htmlBody: buildEmailHtml({
      greeting: "Hi Ajay",
      roleIntro:
        "I am reaching out to apply for the Software Engineer 1 (Full Stack) position at Rugged Monitoring in Hyderabad.",
      customBody:
        "I have strictly 2 years of professional software engineering experience developing responsive web architectures with modern TypeScript, React, SQL/PostgreSQL databases, and REST APIs, while actively leveraging AI-assisted developer workflows to maintain high code velocity and system quality.",
      locationText: "I am based in Andhra Pradesh and available to relocate to Hyderabad immediately.",
    }),
  },

  // 3. TidyHire
  {
    email: "shyam.devarakonda@tidyhire.app",
    company: "TidyHire",
    role: "FrontEnd Developer",
    subject: "Application for FrontEnd Developer – Murali Krishna Popuri",
    plainBody: `Hi Viswanath,

I am writing to express my interest in the FrontEnd Developer role with your client GCC team in Hyderabad.

I have strictly 2 years of professional software engineering experience centered on core JavaScript (ES6+), React.js, component architecture, state management, and building high-performance interactive interfaces. I am comfortable and fully prepared to work EST night shifts as required by the role.

${RESTOSOFT_SNIPPET}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_SNIPPET} I am based in Andhra Pradesh and available to relocate to Hyderabad immediately.

My updated resume is attached to this email for your detailed review.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    htmlBody: buildEmailHtml({
      greeting: "Hi Viswanath",
      roleIntro:
        "I am writing to express my interest in the FrontEnd Developer role with your client GCC team in Hyderabad.",
      customBody:
        "I have strictly 2 years of professional software engineering experience centered on core JavaScript (ES6+), React.js, component architecture, state management, and building high-performance interactive interfaces. I am comfortable and fully prepared to work EST night shifts as required by the role.",
      locationText: "I am based in Andhra Pradesh and available to relocate to Hyderabad immediately.",
    }),
  },

  // 4. Calibre QA
  {
    email: "nalini.s@calibreqa.in",
    company: "Calibre QA",
    role: "Frontend Developer (React / Next.js)",
    subject: "Application: Frontend Developer (React / Next.js) – Murali Krishna Popuri",
    plainBody: `Hi Nalini,

I am writing to apply for the Frontend Developer opening at Calibre QA.

I have strictly 2 years of professional software engineering experience building scalable, responsive web applications using React.js, Next.js, modern JavaScript/TypeScript, and integrating backend REST services with clean UI architecture.

${RESTOSOFT_SNIPPET}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_SNIPPET} I am based in Andhra Pradesh and available to relocate to Bengaluru immediately for onsite or hybrid collaboration.

My updated resume is attached to this email for your detailed review.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    htmlBody: buildEmailHtml({
      greeting: "Hi Nalini",
      roleIntro: "I am writing to apply for the Frontend Developer opening at Calibre QA.",
      customBody:
        "I have strictly 2 years of professional software engineering experience building scalable, responsive web applications using React.js, Next.js, modern JavaScript/TypeScript, and integrating backend REST services with clean UI architecture.",
      locationText:
        "I am based in Andhra Pradesh and available to relocate to Bengaluru immediately for onsite or hybrid collaboration.",
    }),
  },

  // 5. eKlouD Services
  {
    email: "a.radhika@ekloudservices.com",
    company: "eKlouD Services",
    role: "React Developer",
    subject: "React Developer Application – Murali Krishna Popuri",
    plainBody: `Hi Radhika,

I am writing to apply for the React Developer position at eKlouD Services.

I have strictly 2 years of professional software engineering experience focused on React.js, TypeScript, Next.js, UI component development, and RESTful API integrations with a strong focus on responsive performance.

${RESTOSOFT_SNIPPET}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_SNIPPET} I am based in Andhra Pradesh and available to relocate immediately to Bengaluru or Hyderabad.

My updated resume is attached to this email for your detailed review.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    htmlBody: buildEmailHtml({
      greeting: "Hi Radhika",
      roleIntro: "I am writing to apply for the React Developer position at eKlouD Services.",
      customBody:
        "I have strictly 2 years of professional software engineering experience focused on React.js, TypeScript, Next.js, UI component development, and RESTful API integrations with a strong focus on responsive performance.",
      locationText:
        "I am based in Andhra Pradesh and available to relocate immediately to Bengaluru or Hyderabad.",
    }),
  },

  // 6. Thinkwires
  {
    email: "hr@thinkwires.com",
    company: "Thinkwires",
    role: "Frontend Developer",
    subject: "Application: Frontend Developer – Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I am writing to apply for the Frontend Developer opening at Thinkwires.

I have strictly 2 years of professional software engineering experience building reusable UI component libraries, architecting frontend layouts with React.js and modern JavaScript, and optimizing client-side performance.

${RESTOSOFT_SNIPPET}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_SNIPPET} I am based in Andhra Pradesh and available to relocate immediately to Hyderabad or Bengaluru.

My updated resume is attached to this email for your detailed review.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    htmlBody: buildEmailHtml({
      greeting: "Hi Hiring Team",
      roleIntro: "I am writing to apply for the Frontend Developer opening at Thinkwires.",
      customBody:
        "I have strictly 2 years of professional software engineering experience building reusable UI component libraries, architecting frontend layouts with React.js and modern JavaScript, and optimizing client-side performance.",
      locationText:
        "I am based in Andhra Pradesh and available to relocate immediately to Hyderabad or Bengaluru.",
    }),
  },

  // 7. LoTech Pro
  {
    email: "hr@lotechpro.in",
    company: "LoTech Pro",
    role: "Full-Stack Developer",
    subject: "Application for Full-Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I am writing to apply for the Full-Stack Developer position at LoTech Pro.

I have strictly 2 years of professional software engineering experience developing full-stack applications with React.js, Node.js, Express, databases, and modern APIs, while integrating AI-assisted developer workflows to accelerate engineering delivery.

${RESTOSOFT_SNIPPET}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_SNIPPET} I am based in Andhra Pradesh and available to relocate to Bengaluru or Hyderabad immediately.

My updated resume is attached to this email for your detailed review.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    htmlBody: buildEmailHtml({
      greeting: "Hi Hiring Team",
      roleIntro: "I am writing to apply for the Full-Stack Developer position at LoTech Pro.",
      customBody:
        "I have strictly 2 years of professional software engineering experience developing full-stack applications with React.js, Node.js, Express, databases, and modern APIs, while integrating AI-assisted developer workflows to accelerate engineering delivery.",
      locationText:
        "I am based in Andhra Pradesh and available to relocate to Bengaluru or Hyderabad immediately.",
    }),
  },

  // 8. Shereindiraa HR
  {
    email: "Shereindiraahr@gmail.com",
    company: "Shereindiraa HR",
    role: "Web Developer",
    subject: "Application: Web Developer – Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I am writing to express my interest in the Web Developer position.

I have strictly 2 years of professional software engineering experience developing robust, user-centric web applications using React.js, Node.js, Express, SQL, and responsive frontend architectures.

${RESTOSOFT_SNIPPET}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_SNIPPET} I am based in Andhra Pradesh and available to relocate to Bengaluru or Chennai immediately.

My updated resume is attached to this email for your detailed review.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    htmlBody: buildEmailHtml({
      greeting: "Hi Hiring Team",
      roleIntro: "I am writing to express my interest in the Web Developer position.",
      customBody:
        "I have strictly 2 years of professional software engineering experience developing robust, user-centric web applications using React.js, Node.js, Express, SQL, and responsive frontend architectures.",
      locationText:
        "I am based in Andhra Pradesh and available to relocate to Bengaluru or Chennai immediately.",
    }),
  },

  // 9. HUQUO (Bridge Pitch applied for experience requirement)
  {
    email: "Monisha@huquo.com",
    company: "HUQUO",
    role: "Full Stack Developer (React and Node)",
    subject: "Application: Full Stack Developer (React and Node) – Murali Krishna Popuri",
    plainBody: `Hi Monisha,

I am writing to apply for the Full Stack Developer (React and Node) position at HUQUO.

I have strictly 2 years of professional software engineering experience building production systems with React.js, Node.js, Express.js, TypeScript, and microservice architectures.

${RESTOSOFT_SNIPPET}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_SNIPPET} I am based in Andhra Pradesh and available to relocate to Bengaluru, Pune, or Gurugram immediately.

My updated resume is attached to this email for your detailed review.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    htmlBody: buildEmailHtml({
      greeting: "Hi Monisha",
      roleIntro:
        "I am writing to apply for the Full Stack Developer (React and Node) position at HUQUO.",
      customBody:
        "I have strictly 2 years of professional software engineering experience building production systems with React.js, Node.js, Express.js, TypeScript, and microservice architectures.",
      bridgePitch: BRIDGE_PITCH,
      locationText:
        "I am based in Andhra Pradesh and available to relocate to Bengaluru, Pune, or Gurugram immediately.",
    }),
  },

  // 10. Capgemini (Bridge Pitch applied for experience requirement)
  {
    email: "harini.d-m@capgemini.com",
    company: "Capgemini",
    role: "MERN Stack Developer",
    subject: "Application for MERN Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Harini,

I am writing to apply for the MERN Stack Developer position at Capgemini.

I have strictly 2 years of professional software engineering experience developing web platforms using MongoDB, Express.js, React.js, Node.js, TypeScript, and SQL databases.

${RESTOSOFT_SNIPPET}

${BRIDGE_PITCH}

${WORK_LINKS_TEXT}

${NOTICE_PERIOD_SNIPPET} I am based in Andhra Pradesh and available to relocate to Bengaluru immediately for client face-to-face evaluation.

My updated resume is attached to this email for your detailed review.

Best regards,
Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    htmlBody: buildEmailHtml({
      greeting: "Hi Harini",
      roleIntro: "I am writing to apply for the MERN Stack Developer position at Capgemini.",
      customBody:
        "I have strictly 2 years of professional software engineering experience developing web platforms using MongoDB, Express.js, React.js, Node.js, TypeScript, and SQL databases.",
      bridgePitch: BRIDGE_PITCH,
      locationText:
        "I am based in Andhra Pradesh and available to relocate to Bengaluru immediately for client face-to-face evaluation.",
    }),
  },
];

async function main() {
  console.log("Starting dispatch of 10 verified leads via safe_mailer.js...\n");
  const result = await sendBatchSafely(leads, { maxBatch: 10 });
  console.log("\nExecution Summary:", result);
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Execution error:", err);
    process.exit(1);
  });
}

module.exports = { leads };
