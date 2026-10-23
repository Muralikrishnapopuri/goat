/**
 * NATURAL HUMAN DISPATCH SCRIPT - SEPTEMBER 24, 2026 (BATCH 4)
 *
 * Implements the user's mandated structure from /home/murali-krishna/Desktop/stuff/Email_template.pdf:
 * - Formal, clean cold email format (Template 1 & 3: Application / Outreach to Recruiter)
 * - Exact candidate constraints:
 *   - Strictly 2 years professional software engineering experience
 *   - RestoSoft / YoungMinds context (offline-first POS desktop system with local LAN real-time sync)
 *   - Bridge pitch for > 3 years experience: fast learning curve, asking for openings for 2 YOE role
 *   - Immediate joiner (official LWD: Nov 11, negotiable for immediate release upon offer)
 *   - Relocation to Hyderabad / Bengaluru ready (or Remote)
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
  // 1. Shubham S Thakare - DGN Technologies Inc. (React UI Developer - Remote India)
  {
    email: "sthakare@dgntechnologies.com",
    company: "DGN Technologies Inc.",
    role: "React UI Developer",
    subject: "Application for React UI Developer - Murali Krishna Popuri",
    plainBody: `Dear Shubham S Thakare,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the React UI Developer opening with DGN Technologies and wanted to submit my application. Based on my hands-on experience in React.js and modern frontend development, I would be grateful if you could consider my profile.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience specializing in React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Redux, and converting Figma designs into responsive, high-performance UI components.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Schedule: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer), comfortable with US PST overlap hours, and available for remote work.

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
      salutation: "Dear Shubham S Thakare",
      introLine:
        "I came across your post regarding the React UI Developer opening with DGN Technologies and wanted to submit my application. Based on my hands-on experience in React.js and modern frontend development, I would be grateful if you could consider my profile.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience specializing in React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Redux, and converting Figma designs into responsive, high-performance UI components.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Schedule:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer), comfortable with US PST overlap hours, and available for remote work.",
    }),
  },

  // 2. Pradhapdurai A K - Kudzu Infotech (Senior UI Developer - React.js, Hyderabad)
  {
    email: "pradhap.d@kudzuinfotech.com",
    company: "Kudzu Infotech",
    role: "UI Developer / React.js",
    subject: "Application for UI Developer - Murali Krishna Popuri (Immediate Joiner)",
    plainBody: `Dear Pradhapdurai A K,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the UI Developer opening in Hyderabad for immediate onboarding and wanted to reach out regarding potential opportunities. With my strong background in React.js and immediate availability, I would appreciate the opportunity to connect.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of professional software engineering experience with deep expertise in React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Next.js, and REST APIs.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Hyderabad.

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
      salutation: "Dear Pradhapdurai A K",
      introLine:
        "I came across your post regarding the UI Developer opening in Hyderabad for immediate onboarding and wanted to reach out regarding potential opportunities. With my strong background in React.js and immediate availability, I would appreciate the opportunity to connect.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of professional software engineering experience with deep expertise in React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Next.js, and REST APIs.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Hyderabad.",
    }),
  },

  // 3. Deqode Recruitment Team (Software Developer - React.js)
  {
    email: "kpatel@deqode.com",
    company: "Deqode",
    role: "Software Developer",
    subject: "Application for Software Developer (React.js) at Deqode",
    plainBody: `Dear Deqode Hiring Team,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Software Developer opening at Deqode and wanted to submit my application as an immediate joiner.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on software development experience with strong proficiency in React.js, JavaScript (ES6+), TypeScript, Node.js, Express.js, and SQL databases.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
✓ Availability & Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).

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
      salutation: "Dear Deqode Hiring Team",
      introLine:
        "I came across your post regarding the Software Developer opening at Deqode and wanted to submit my application as an immediate joiner.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on software development experience with strong proficiency in React.js, JavaScript (ES6+), TypeScript, Node.js, Express.js, and SQL databases.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Notice Period:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer).",
    }),
  },
];

async function main() {
  console.log("Starting natural human email dispatch for September 24 (Batch 4) leads...\n");

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
