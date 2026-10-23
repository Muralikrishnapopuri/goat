/**
 * NATURAL HUMAN DISPATCH SCRIPT - SEPTEMBER 24, 2026 (BATCH 6)
 *
 * Mandated structure from /home/murali-krishna/Desktop/stuff/Email_template.pdf
 * All candidate constraints from AGENTS.md strictly adhered to:
 * - Strictly 2 years professional software engineering experience
 * - Mandatory RestoSoft / YoungMinds context (offline-first POS desktop system with local LAN real-time sync)
 * - Bridge pitch for > 3 years experience / fast learning curve
 * - Immediate joiner (official LWD: Nov 11, negotiable for immediate early release upon offer)
 * - Relocation to Hyderabad / Bengaluru ready
 * - Exactly 4 permitted links (Portfolio, LinkedIn, GitHub, Zestchat)
 * - Attached resume: /home/murali-krishna/cluad/goat/automatic_mailer/Murali_Krishna_Popuri_FullStack_Developer.pdf
 * - Anti-spam safe pacing (45s - 90s randomized jitter)
 * - Strict deduplication check (prevents duplicate emails)
 * - Zero emojis throughout
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
  // 1. Martha Srilaxmi - Openskale (Frontend Developer - React.js / Next.js, 1-4 Yrs, Hyderabad WFO)
  {
    email: "careers@openskale.com",
    company: "Openskale",
    role: "Frontend Developer – React.js / Next.js",
    subject: "Application for Frontend Developer (React.js / Next.js) at Openskale - Murali Krishna Popuri",
    plainBody: `Dear Martha Srilaxmi and Openskale Hiring Team,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Frontend Developer (React.js / Next.js) opening in Hyderabad and wanted to submit my application. With 2 years of hands-on experience building performant frontend applications with React.js, Next.js, TypeScript, Tailwind CSS, and REST APIs, I am very enthusiastic about contributing to Openskale.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience building responsive and scalable web applications using React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, and RESTful APIs.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to work from the Hyderabad office immediately.

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
      salutation: "Dear Martha Srilaxmi and Openskale Hiring Team",
      introLine:
        "I came across your post regarding the Frontend Developer (React.js / Next.js) opening in Hyderabad and wanted to submit my application. With 2 years of hands-on experience building performant frontend applications with React.js, Next.js, TypeScript, Tailwind CSS, and REST APIs, I am very enthusiastic about contributing to Openskale.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building responsive and scalable web applications using React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, and RESTful APIs.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to work from the Hyderabad office immediately.",
    }),
  },

  // 2. Saiteja Kothwala - Ariumsoft (Frontend Developer / React Native, 2-5 Yrs, Hyderabad WFO)
  {
    email: "saiteja.kothwala@ariumsoft.com",
    company: "Ariumsoft",
    role: "Frontend Developer – React Native / Web",
    subject: "Application for Frontend Developer Role at Ariumsoft - Murali Krishna Popuri",
    plainBody: `Dear Saiteja Kothwala,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I saw your recent update regarding the Frontend Developer position in Hyderabad and wanted to apply. With 2 years of professional experience specializing in modern JavaScript/TypeScript, React-based architectures, and responsive interface development, I am eager to contribute to Ariumsoft.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience crafting cross-platform UI architectures, integrating backend REST APIs, and optimizing frontend performance.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available for full-time work from office in Hyderabad.

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
      salutation: "Dear Saiteja Kothwala",
      introLine:
        "I saw your recent update regarding the Frontend Developer position in Hyderabad and wanted to apply. With 2 years of professional experience specializing in modern JavaScript/TypeScript, React-based architectures, and responsive interface development, I am eager to contribute to Ariumsoft.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience crafting cross-platform UI architectures, integrating backend REST APIs, and optimizing frontend performance.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available for full-time work from office in Hyderabad.",
    }),
  },

  // 3. Swathi Bokkala - i95Dev (Full Stack Developer / React.js + Web Services, 2-3 Yrs, Hyderabad)
  {
    email: "swathi.bokkala@i95dev.com",
    company: "i95Dev",
    role: "Full Stack Developer",
    subject: "Application for Full Stack Developer at i95Dev - Murali Krishna Popuri",
    plainBody: `Dear Swathi Bokkala,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your opening for a Full Stack Developer at i95Dev in Hyderabad and wanted to express my strong interest in joining your engineering team.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular React.js frontend components, robust RESTful APIs, and complex relational SQL database systems.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
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
      salutation: "Dear Swathi Bokkala",
      introLine:
        "I came across your opening for a Full Stack Developer at i95Dev in Hyderabad and wanted to express my strong interest in joining your engineering team.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React.js frontend components, robust RESTful APIs, and complex relational SQL database systems.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Hyderabad.",
    }),
  },

  // 4. Sindhu - UniqueHire / KarmaDisha (Full Stack Developer - React / Next.js / Cloud, 2-5 Yrs, Hyderabad)
  {
    email: "sindhu@uniquehire.co.in",
    company: "UniqueHire",
    role: "Full Stack Developer (React / Next.js)",
    subject: "Application for Full Stack Developer (React / Next.js) - Murali Krishna Popuri",
    plainBody: `Dear Sindhu,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Full Stack Developer opening in Hyderabad and wanted to submit my application. With 2 years of hands-on experience in React.js, Next.js, TypeScript, SQL databases, and cloud-integrated web services, I am very keen to contribute.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience building scalable full-stack web applications with React.js, Next.js, TypeScript, Node.js, and relational SQL databases.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Hyderabad for hybrid or onsite roles.

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
      salutation: "Dear Sindhu",
      introLine:
        "I came across your post regarding the Full Stack Developer opening in Hyderabad and wanted to submit my application. With 2 years of hands-on experience in React.js, Next.js, TypeScript, SQL databases, and cloud-integrated web services, I am very keen to contribute.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building scalable full-stack web applications with React.js, Next.js, TypeScript, Node.js, and relational SQL databases.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Hyderabad for hybrid or onsite roles.",
    }),
  },

  // 5. Divya Kandula - Invictus Data (Frontend Developer / React, 2-4 Yrs, Hyderabad)
  {
    email: "divyak@invictusdata.ai",
    company: "Invictus Data",
    role: "Frontend Developer – React",
    subject: "Application for Frontend Developer (React) at Invictus Data - Murali Krishna Popuri",
    plainBody: `Dear Divya Kandula,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Frontend Developer opening in Hyderabad and wanted to reach out. With 2 years of hands-on experience specializing in React.js, JavaScript (ES6+), HTML5, CSS3, and component-based UI engineering, I am very interested in this opportunity at Invictus Data.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience building responsive interfaces, reusable UI components, and integrating REST APIs using React and modern JavaScript.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.
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
      salutation: "Dear Divya Kandula",
      introLine:
        "I came across your post regarding the Frontend Developer opening in Hyderabad and wanted to reach out. With 2 years of hands-on experience specializing in React.js, JavaScript (ES6+), HTML5, CSS3, and component-based UI engineering, I am very interested in this opportunity at Invictus Data.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building responsive interfaces, reusable UI components, and integrating REST APIs using React and modern JavaScript.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Hyderabad.",
    }),
  },

  // 6. Suhasini Pudi - Miracle Software Systems (React JS Developer, Hyderabad)
  {
    email: "spudi@miraclesoft.com",
    company: "Miracle Software Systems",
    role: "React JS Developer",
    subject: "Application for React JS Developer at Miracle Software Systems - Murali Krishna Popuri",
    plainBody: `Dear Suhasini Pudi,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the React JS Developer requirement in Hyderabad and wanted to submit my profile for consideration. With 2 years of hands-on experience building scalable UI architectures in React.js, state management, and REST API integration, I am very excited about opportunities with Miracle Software Systems.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience specializing in React.js, JavaScript (ES6+), TypeScript, React Hooks, Redux/state management, and REST API integration.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
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
      salutation: "Dear Suhasini Pudi",
      introLine:
        "I came across your post regarding the React JS Developer requirement in Hyderabad and wanted to submit my profile for consideration. With 2 years of hands-on experience building scalable UI architectures in React.js, state management, and REST API integration, I am very excited about opportunities with Miracle Software Systems.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience specializing in React.js, JavaScript (ES6+), TypeScript, React Hooks, Redux/state management, and REST API integration.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Hyderabad.",
    }),
  },

  // 7. Jitendra Kumar - Celebal Technologies (Full Stack Developer - React / Next.js / AWS / SQL)
  {
    email: "jitendrakumar.pareek@celebaltech.com",
    company: "Celebal Technologies",
    role: "Full Stack Developer",
    subject: "Application for Full Stack Developer at Celebal Technologies - Murali Krishna Popuri",
    plainBody: `Dear Jitendra Kumar,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Full Stack Developer opening in Hyderabad / Bengaluru and wanted to express my strong interest in joining Celebal Technologies.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience building responsive frontends with React.js, Next.js, and TypeScript, combined with backend RESTful APIs, relational PostgreSQL/SQL databases, and cloud services.
✓ Current Role & RestoSoft: Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Hyderabad or Bengaluru.

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
      salutation: "Dear Jitendra Kumar",
      introLine:
        "I came across your post regarding the Full Stack Developer opening in Hyderabad / Bengaluru and wanted to express my strong interest in joining Celebal Technologies.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building responsive frontends with React.js, Next.js, and TypeScript, combined with backend RESTful APIs, relational PostgreSQL/SQL databases, and cloud services.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> Currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available to relocate immediately to Hyderabad or Bengaluru.",
    }),
  },
];

async function main() {
  console.log("Starting natural human email dispatch for September 24 (Batch 6) leads...\n");

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
