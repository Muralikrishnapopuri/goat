/**
 * NATURAL HUMAN DISPATCH SCRIPT - SEPTEMBER 24, 2026 (BATCH 2)
 *
 * Implements the user's mandated structure from /home/murali-krishna/Desktop/stuff/Email_template.pdf:
 * - Formal, clean cold email format (Template 1 & 3: Application / Outreach to Recruiter)
 * - Exact candidate constraints:
 *   - Strictly 2 years professional software engineering experience
 *   - RestoSoft / YoungMinds context (offline-first POS desktop system with local LAN real-time sync)
 *   - Bridge pitch for > 3 years experience: fast learning curve, asking for openings for 2 YOE role
 *   - Immediate joiner (official LWD: Nov 11, negotiable for immediate release upon offer)
 *   - Relocation to Bengaluru ready
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
  // 1. Anusha V. - Millennium IMS Private Limited (Bangalore)
  {
    email: "anusha.v@millims.com",
    company: "Millennium IMS Private Limited",
    role: "Frontend / UI Developer",
    subject: "Application for Frontend Developer at Millennium IMS",
    plainBody: `Dear Anusha V.,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the frontend opening at Millennium IMS in Bangalore and wanted to reach out regarding potential opportunities. Based on my hands-on experience in React and modern UI development, I would appreciate it if you could consider my profile.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, React Hooks, and state management.
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
      salutation: "Dear Anusha V.",
      introLine:
        "I came across your post regarding the frontend opening at Millennium IMS in Bangalore and wanted to reach out regarding potential opportunities. Based on my hands-on experience in React and modern UI development, I would appreciate it if you could consider my profile.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, React Hooks, and state management.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore.",
    }),
  },

  // 2. Smita Thorat - Beansbit (Bengaluru)
  {
    email: "smita@beansbit.com",
    company: "Beansbit",
    role: "Fullstack Developer",
    subject: "Application for Fullstack Developer at Beansbit",
    plainBody: `Dear Smita Thorat,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Fullstack opening at Beansbit in Bengaluru and wanted to reach out regarding potential opportunities. Based on my technical background across React and Node.js, I would appreciate it if you could consider my profile.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on software engineering experience developing web applications with React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), and REST APIs.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced developer, I would be grateful for the opportunity.
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
      salutation: "Dear Smita Thorat",
      introLine:
        "I came across your post regarding the Fullstack opening at Beansbit in Bengaluru and wanted to reach out regarding potential opportunities. Based on my technical background across React and Node.js, I would appreciate it if you could consider my profile.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on software engineering experience developing web applications with React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), and REST APIs.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced developer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bengaluru.",
    }),
  },

  // 3. Ritika K. - Tech and Grow Global (Bangalore)
  {
    email: "ritika.k@techgrowglobal.com",
    company: "Tech and Grow Global",
    role: "Full Stack Engineer",
    subject: "Application for Full Stack Engineer at Tech and Grow Global",
    plainBody: `Dear Ritika K.,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Full Stack Engineer opening at Tech and Grow Global in Bangalore and wanted to reach out regarding the opportunity.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience specializing in React.js, Next.js, Node.js, Express.js, JavaScript, TypeScript, REST APIs, and databases.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While your post mentions 4–5 years of experience, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you are open to considering high-ownership developers with 2 years of hands-on experience, I would be grateful for the opportunity.
✓ Availability & Work Mode: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore for full-time onsite work.

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
      salutation: "Dear Ritika K.",
      introLine:
        "I came across your post regarding the Full Stack Engineer opening at Tech and Grow Global in Bangalore and wanted to reach out regarding the opportunity.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience specializing in React.js, Next.js, Node.js, Express.js, JavaScript, TypeScript, REST APIs, and databases.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions 4–5 years of experience, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you are open to considering high-ownership developers with 2 years of hands-on experience, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Work Mode:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore for full-time onsite work.",
    }),
  },
];

async function main() {
  console.log("Starting natural human email dispatch for September 24 (Batch 2) leads...\n");
  const result = await sendBatchSafely(leads, { maxBatch: leads.length });
  console.log("\nDispatch Result:", result);
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Execution error:", err);
    process.exit(1);
  });
}

module.exports = { leads };
