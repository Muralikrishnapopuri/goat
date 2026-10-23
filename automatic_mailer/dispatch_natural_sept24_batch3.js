/**
 * NATURAL HUMAN DISPATCH SCRIPT - SEPTEMBER 24, 2026 (BATCH 3)
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
  // 1. ShriKrishiv HR - Bangalore (Forward Deployed / Solutions Engineer - React, APIs, SQL)
  {
    email: "shrikrishiv@gmail.com",
    company: "ShriKrishiv HR",
    role: "Solutions Engineer / Full-Stack Developer",
    subject: "Application for Solutions Engineer / Full-Stack Role - Murali Krishna Popuri",
    plainBody: `Dear ShriKrishiv Hiring Team,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Forward Deployed / Solutions Engineer opening in Bangalore and wanted to reach out regarding the role. With 2 years of professional software engineering experience across React, JavaScript, APIs, and databases, I am very interested in this opportunity.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience building responsive web and desktop applications using React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, and REST APIs.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
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
      salutation: "Dear ShriKrishiv Hiring Team",
      introLine:
        "I came across your post regarding the Forward Deployed / Solutions Engineer opening in Bangalore and wanted to reach out regarding the role. With 2 years of professional software engineering experience across React, JavaScript, APIs, and databases, I am very interested in this opportunity.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building responsive web and desktop applications using React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, and REST APIs.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore.",
    }),
  },

  // 2. M Tejaswi - DXC Technology (Full Stack Developer - React, Node.js, SQL)
  {
    email: "plokeshwari392@gmail.com",
    company: "DXC Technology",
    role: "Software Engineer / Full Stack Developer",
    subject: "Application for Full Stack Developer at DXC Technology",
    plainBody: `Dear M Tejaswi,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Software Engineer / Full Stack Developer opening for DXC Technology in Bangalore / Hyderabad and wanted to submit my application as an immediate joiner.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on software development experience with strong proficiency in React.js, JavaScript (ES6+), TypeScript, Node.js, Express.js, and SQL databases.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
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
      salutation: "Dear M Tejaswi",
      introLine:
        "I came across your post regarding the Software Engineer / Full Stack Developer opening for DXC Technology in Bangalore / Hyderabad and wanted to submit my application as an immediate joiner.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on software development experience with strong proficiency in React.js, JavaScript (ES6+), TypeScript, Node.js, Express.js, and SQL databases.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore or Hyderabad.",
    }),
  },

  // 3. Khushi Sah - SuccessPact (Full Stack Engineer - React, Node.js, APIs)
  {
    email: "Khushi.sah@successpact.com",
    company: "SuccessPact",
    role: "Full Stack Engineer",
    subject: "Application for Full Stack Engineer at SuccessPact",
    plainBody: `Dear Khushi Sah,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Full Stack Engineer role in HSR Layout, Bangalore and wanted to reach out. I would be grateful if you could consider my profile for this or any suitable full-stack engineering openings at your organization.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience specializing in React.js, Node.js, JavaScript (ES6+), TypeScript, and full-stack API integration.
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
      salutation: "Dear Khushi Sah",
      introLine:
        "I came across your post regarding the Full Stack Engineer role in HSR Layout, Bangalore and wanted to reach out. I would be grateful if you could consider my profile for this or any suitable full-stack engineering openings at your organization.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience specializing in React.js, Node.js, JavaScript (ES6+), TypeScript, and full-stack API integration.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore.",
    }),
  },

  // 4. Ananda Karthikeyan - Aparajitha (Full Stack / Software Engineer - React, Node.js, APIs)
  {
    email: "ananda.karthikeyan@aparajitha.com",
    company: "Aparajitha",
    role: "Full Stack / Software Engineer",
    subject: "Application for Software Engineer at Aparajitha",
    plainBody: `Dear Ananda Karthikeyan,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the software development opening in Bangalore and wanted to reach out regarding potential opportunities. Based on my hands-on background in React and Node.js, I would appreciate the opportunity to connect.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of professional software engineering experience working with React.js, Node.js, JavaScript (ES6+), TypeScript, HTML5, REST APIs, and SQL databases.
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
      salutation: "Dear Ananda Karthikeyan",
      introLine:
        "I came across your post regarding the software development opening in Bangalore and wanted to reach out regarding potential opportunities. Based on my hands-on background in React and Node.js, I would appreciate the opportunity to connect.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of professional software engineering experience working with React.js, Node.js, JavaScript (ES6+), TypeScript, HTML5, REST APIs, and SQL databases.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore.",
    }),
  },

  // 5. Bhavya Kote - Tech and Grow Global (Full Stack Engineer - React, Next.js, Node.js)
  {
    email: "bhavya.k@techgrowglobal.com",
    company: "Tech and Grow Global",
    role: "Full Stack Engineer",
    subject: "Application for Full Stack Engineer at Tech and Grow Global",
    plainBody: `Dear Bhavya Kote,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Full Stack Engineer role in Bangalore and wanted to submit my application as an immediate joiner.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on software development experience with React.js, Next.js, Node.js, TypeScript, JavaScript (ES6+), and REST APIs.
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
      salutation: "Dear Bhavya Kote",
      introLine:
        "I came across your post regarding the Full Stack Engineer role in Bangalore and wanted to submit my application as an immediate joiner.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on software development experience with React.js, Next.js, Node.js, TypeScript, JavaScript (ES6+), and REST APIs.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While your post mentions senior requirements, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore.",
    }),
  },

  // 6. Mahatej Mulugu - Adroit Innovative (Full Stack / React Developer)
  {
    email: "mulugu.mahatej@adroitinnovative.com",
    company: "Adroit Innovative",
    role: "Full Stack / React Developer",
    subject: "Application for Full Stack / React Developer at Adroit Innovative",
    plainBody: `Dear Mahatej Mulugu,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the developer opening in Bangalore and wanted to reach out regarding potential opportunities. Based on my hands-on background in React and web application development, I would appreciate it if you could review my profile.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), REST APIs, and database design.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore or Pune.

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
      salutation: "Dear Mahatej Mulugu",
      introLine:
        "I came across your post regarding the developer opening in Bangalore and wanted to reach out regarding potential opportunities. Based on my hands-on background in React and web application development, I would appreciate it if you could review my profile.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), REST APIs, and database design.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore or Pune.",
    }),
  },

  // 7. Technical Recruitment Team / Priya Dharm (Full Stack / Front-End Engineer)
  {
    email: "priyadharm004@gmail.com",
    company: "Technical Recruitment Team",
    role: "Full Stack / Front-End Engineer",
    subject: "Application for Full Stack / Front-End Engineer - Murali Krishna Popuri",
    plainBody: `Dear Recruitment Team,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding Full Stack / Front-End Engineer hiring for Bangalore / Hyderabad and wanted to submit my application as an immediate joiner.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on software development experience with React.js, TypeScript, JavaScript (ES6+), Node.js, HTML5, CSS3, and REST APIs.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
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
      salutation: "Dear Recruitment Team",
      introLine:
        "I came across your post regarding Full Stack / Front-End Engineer hiring for Bangalore / Hyderabad and wanted to submit my application as an immediate joiner.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on software development experience with React.js, TypeScript, JavaScript (ES6+), Node.js, HTML5, CSS3, and REST APIs.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Bangalore or Hyderabad.",
    }),
  },
];

async function main() {
  console.log("Starting natural human email dispatch for September 24 (Batch 3) leads...\n");

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
