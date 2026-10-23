/**
 * NATURAL HUMAN DISPATCH SCRIPT - SEPTEMBER 24, 2026 (BATCH 5)
 *
 * Implements the user's mandated structure from /home/murali-krishna/Desktop/stuff/Email_template.pdf:
 * - Formal, clean cold email format (Template 1 & 3: Application / Outreach to Recruiter)
 * - Exact candidate constraints:
 *   - Strictly 2 years professional software engineering experience
 *   - RestoSoft / YoungMinds context (offline-first POS desktop system with local LAN real-time sync)
 *   - Bridge pitch for > 3 years experience: fast learning curve, asking for openings for 2 YOE role
 *   - Immediate joiner (official LWD: Nov 11, negotiable for immediate release upon offer)
 *   - Relocation to Bengaluru / Hyderabad ready
 *   - Exactly 4 permitted links (Portfolio, LinkedIn, GitHub, Zestchat)
 *   - Attached resume: /home/murali-krishna/cluad/goat/automatic_mailer/Murali_Krishna_Popuri_FullStack_Developer.pdf
 *   - Anti-spam safe pacing (45s - 90s randomized jitter)
 *   - Deduplication check (prevents duplicate emails)
 *   - Zero emojis
 */

const { sendBatchSafely, isAlreadySent } = require("./safe_mailer.js");

const FOOTNOTE =
  "P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note.";

function createEmailTemplateHtml({
  salutation,
  introLine,
  overviewBullet1,
  overviewBullet2,
  overviewBullet3,
  overviewBullet4,
}) {
  return `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #222222; line-height: 1.55;">
  <p>${salutation},</p>
  <p>I hope you’re doing well.</p>
  <p>My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.</p>
  <p>${introLine}</p>
  <p>Here’s a quick overview of my profile:</p>
  <ul style="padding-left: 20px; margin-top: 6px; margin-bottom: 14px;">
    <li style="margin-bottom: 6px;">${overviewBullet1}</li>
    <li style="margin-bottom: 6px;">${overviewBullet2}</li>
    <li style="margin-bottom: 6px;">${overviewBullet3}</li>
    <li style="margin-bottom: 6px;">${overviewBullet4}</li>
  </ul>
  <p>Please find my resume attached for your review.<br>
  Resume: Attached<br>
  Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #1155cc;">https://murali-portfolio-website.vercel.app</a><br>
  LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #1155cc;">https://linkedin.com/in/murali-krishna-popuri</a><br>
  GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #1155cc;">https://github.com/Muralikrishnapopuri</a><br>
  Zestchat: <a href="https://zestchat.vercel.app" style="color: #1155cc;">https://zestchat.vercel.app</a></p>
  <p>Thank you for your time and consideration. I look forward to hearing from you.</p>
  <p>Best regards,<br>
  Murali Krishna Popuri<br>
  Email: popurimurali16@gmail.com<br>
  Mobile: +91 9347796811</p>
  <p style="margin-top: 24px; font-size: 12px; color: #666666; font-style: italic;">${FOOTNOTE}</p>
</div>`;
}

const leads = [
  // 1. Malar Oviyam - Stanco Solutions (React JS Developer - Bangalore / Hyderabad, 2-5 Yrs)
  {
    email: "malaroviyam.k@stancosolutions.com",
    company: "Stanco Solutions",
    role: "React JS Developer",
    subject: "Application for React JS Developer at Stanco Solutions - Murali Krishna Popuri",
    plainBody: `Dear Malar Oviyam,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the React JS Developer opening in Bangalore / Hyderabad and wanted to submit my application. With 2 years of hands-on experience in React.js and modern frontend architecture, I am very interested in this opportunity.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience specializing in React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, REST API integration, and responsive web design.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore or Hyderabad for permanent employment.

Please find my resume attached for your review.
Resume: Attached
Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Mobile: +91 9347796811

${FOOTNOTE}`,
    htmlBody: createEmailTemplateHtml({
      salutation: "Dear Malar Oviyam",
      introLine:
        "I came across your post regarding the React JS Developer opening in Bangalore / Hyderabad and wanted to submit my application. With 2 years of hands-on experience in React.js and modern frontend architecture, I am very interested in this opportunity.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience specializing in React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, REST API integration, and responsive web design.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore or Hyderabad for permanent employment.",
    }),
  },

  // 2. Uplabh Engineering Team (Software Engineer - Frontend / React.js - Bengaluru)
  {
    email: "careers@uplabh.com",
    company: "Uplabh",
    role: "Software Engineer - Frontend",
    subject: "Application for Software Engineer - Frontend (React.js) at Uplabh",
    plainBody: `Dear Uplabh Hiring Team,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Frontend Software Engineer opening in Bengaluru and wanted to reach out regarding the role. With strong proficiency in React.js, modern JavaScript, and component architecture, I would be grateful if you could consider my application.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of professional software engineering experience developing responsive web applications with React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS, and WebSockets.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bengaluru.

Please find my resume attached for your review.
Resume: Attached
Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Mobile: +91 9347796811

${FOOTNOTE}`,
    htmlBody: createEmailTemplateHtml({
      salutation: "Dear Uplabh Hiring Team",
      introLine:
        "I came across your post regarding the Frontend Software Engineer opening in Bengaluru and wanted to reach out regarding the role. With strong proficiency in React.js, modern JavaScript, and component architecture, I would be grateful if you could consider my application.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of professional software engineering experience developing responsive web applications with React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS, and WebSockets.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bengaluru.",
    }),
  },

  // 3. Rinku Sharma - Publicis Sapient (React Front End Developer - Bangalore / Hyderabad)
  {
    email: "rinku.sharma@publicissapient.com",
    company: "Publicis Sapient",
    role: "React Front End Developer",
    subject: "Application for React Front End Developer at Publicis Sapient",
    plainBody: `Dear Rinku Sharma,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the React Front End opening for Bangalore / Hyderabad and wanted to reach out regarding potential opportunities. Based on my hands-on background in React.js and Next.js, I would appreciate it if you could review my profile.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience specializing in React.js, Next.js, TypeScript, JavaScript (ES6+), Redux, REST APIs, and modern frontend workflows.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore or Hyderabad.

Please find my resume attached for your review.
Resume: Attached
Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Mobile: +91 9347796811

${FOOTNOTE}`,
    htmlBody: createEmailTemplateHtml({
      salutation: "Dear Rinku Sharma",
      introLine:
        "I came across your post regarding the React Front End opening for Bangalore / Hyderabad and wanted to reach out regarding potential opportunities. Based on my hands-on background in React.js and Next.js, I would appreciate it if you could review my profile.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience specializing in React.js, Next.js, TypeScript, JavaScript (ES6+), Redux, REST APIs, and modern frontend workflows.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore or Hyderabad.",
    }),
  },

  // 4. Ruchitha Veerabathini - Aura Placements (Senior React.js Developer - Bangalore)
  {
    email: "ruchitha@auraplacements.com",
    company: "Aura Placements",
    role: "React.js Developer",
    subject: "Application for React.js Developer - Murali Krishna Popuri (Immediate Joiner)",
    plainBody: `Dear Ruchitha Veerabathini,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding urgent hiring for React.js Developers in Bangalore and wanted to submit my application as an immediate joiner.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of professional software engineering experience with deep expertise in React.js, Redux, JavaScript (ES6+), HTML5, CSS3, and REST APIs.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore.

Please find my resume attached for your review.
Resume: Attached
Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Mobile: +91 9347796811

${FOOTNOTE}`,
    htmlBody: createEmailTemplateHtml({
      salutation: "Dear Ruchitha Veerabathini",
      introLine:
        "I came across your post regarding urgent hiring for React.js Developers in Bangalore and wanted to submit my application as an immediate joiner.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of professional software engineering experience with deep expertise in React.js, Redux, JavaScript (ES6+), HTML5, CSS3, and REST APIs.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore.",
    }),
  },

  // 5. Dhanyatha Rai - Recruise Global (Software Engineer II - Node.js & React - Bangalore)
  {
    email: "dhanya@recruiseglobal.com",
    company: "Recruise Global",
    role: "Full Stack Engineer (Node.js & React)",
    subject: "Application for Full Stack Engineer (Node.js & React) at Recruise Global",
    plainBody: `Dear Dhanyatha Rai,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the engineering opening for Node.js and React in Bangalore and wanted to reach out. With strong experience in both frontend and backend JavaScript development, I would be grateful if you could consider my profile.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing full-stack web solutions using React.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, REST APIs, and MongoDB/SQL databases.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore.

Please find my resume attached for your review.
Resume: Attached
Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Mobile: +91 9347796811

${FOOTNOTE}`,
    htmlBody: createEmailTemplateHtml({
      salutation: "Dear Dhanyatha Rai",
      introLine:
        "I came across your post regarding the engineering opening for Node.js and React in Bangalore and wanted to reach out. With strong experience in both frontend and backend JavaScript development, I would be grateful if you could consider my profile.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing full-stack web solutions using React.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, REST APIs, and MongoDB/SQL databases.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore.",
    }),
  },

  // 6. Ankita Nayar - Encred (Senior React JS Developer - Bangalore / Hyderabad)
  {
    email: "ankita.n@encred.io",
    company: "Encred",
    role: "React JS Developer",
    subject: "Application for React JS Developer at Encred - Murali Krishna Popuri",
    plainBody: `Dear Ankita Nayar,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the React JS Developer opening in Bangalore / Hyderabad and wanted to reach out regarding potential opportunities. Based on my hands-on background in React and TypeScript, I would appreciate the opportunity to connect.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on software development experience with React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, REST APIs, and SQL databases.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore or Hyderabad.

Please find my resume attached for your review.
Resume: Attached
Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
Murali Krishna Popuri
Email: popurimurali16@gmail.com
Mobile: +91 9347796811

${FOOTNOTE}`,
    htmlBody: createEmailTemplateHtml({
      salutation: "Dear Ankita Nayar",
      introLine:
        "I came across your post regarding the React JS Developer opening in Bangalore / Hyderabad and wanted to reach out regarding potential opportunities. Based on my hands-on background in React and TypeScript, I would appreciate the opportunity to connect.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on software development experience with React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, REST APIs, and SQL databases.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore or Hyderabad.",
    }),
  },
];

async function main() {
  console.log("Starting natural human email dispatch for September 24 (Batch 5) leads...\n");

  const unSentLeads = [];
  for (const lead of leads) {
    if (isAlreadySent(lead.email)) {
      console.log(`[SKIP] Already sent to ${lead.email}`);
    } else {
      unSentLeads.push(lead);
    }
  }

  if (unSentLeads.length === 0) {
    console.log("No new leads to dispatch. All have already been sent!");
    return;
  }

  console.log(`Queueing ${unSentLeads.length} leads for safe dispatch...`);
  const result = await sendBatchSafely(unSentLeads, {
    maxBatchSize: 10,
    minDelayMs: 45000,
    maxDelayMs: 90000,
  });

  console.log("\nDispatch Result:", result);
}

main().catch((err) => {
  console.error("Batch dispatch encountered an error:", err);
  process.exit(1);
});
