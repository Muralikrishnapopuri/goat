/**
 * NATURAL HUMAN DISPATCH SCRIPT - SEPTEMBER 25, 2026 (BATCH 1)
 *
 * Implements user's mandated structure from /home/murali-krishna/Desktop/stuff/Email_template.pdf:
 * - Template 1 for <= 3 years experience (Direct Job Application)
 * - Template 3 for > 3 years experience (Inquiring about openings for 2 YOE + Impressive Fast-Learning Pitch)
 * - Candidate profile constraints from AGENTS.md:
 *   - Strictly 2 years professional software engineering experience
 *   - RestoSoft / YoungMinds context (offline-first POS desktop system with local LAN real-time sync)
 *   - Impressive fast-learning pitch for secondary/non-main skills
 *   - Notice period: Immediate joiner (official LWD: Nov 11, negotiable for early release) with enthusiastic tone
 *   - Relocation to Hyderabad / Bengaluru ready
 *   - Exactly 4 permitted links (Portfolio, LinkedIn, GitHub, Zestchat)
 *   - Attached resume: /home/murali-krishna/cluad/goat/automatic_mailer/Murali_Krishna_Popuri_FullStack_Developer.pdf
 *   - Anti-spam safe pacing (45s - 90s randomized jitter)
 *   - Strict deduplication check against sent_history.json
 *   - Zero emojis throughout
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
  // 1. Thripura Bojja - Gopiverse IT (Full Stack Developer, Freshers-2 Yrs, Hyderabad) -> Template 1 (<= 3 YOE)
  {
    email: "thripura.b@gopiverse.com",
    company: "Gopiverse Universal IT Solutions",
    role: "Full Stack Developer",
    subject: "Application for Full Stack Developer at Gopiverse IT - Murali Krishna Popuri",
    plainBody: `Dear Thripura Bojja,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your opening for the Full Stack Developer role in Hyderabad and would like to apply for this position. With 2 years of hands-on experience building scalable applications using React, JavaScript/TypeScript, RESTful APIs, and relational SQL databases, I believe my skills make me a strong candidate for your team.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular React frontend components, designing robust REST APIs, and optimizing database queries using MySQL and PostgreSQL.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), and I am deeply enthusiastic about bringing my hands-on production engineering experience to your team in Hyderabad and making an impact from day one.

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
      salutation: "Dear Thripura Bojja",
      introLine:
        "I came across your opening for the Full Stack Developer role in Hyderabad and would like to apply for this position. With 2 years of hands-on experience building scalable applications using React, JavaScript/TypeScript, RESTful APIs, and relational SQL databases, I believe my skills make me a strong candidate for your team.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React frontend components, designing robust REST APIs, and optimizing database queries using MySQL and PostgreSQL.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability & Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), and I am deeply enthusiastic about bringing my hands-on production engineering experience to your team in Hyderabad and making an impact from day one.",
    }),
  },

  // 2. Quickdines Private Limited (Mobile / Frontend Application Developer, Freshers-2 Yrs, Hyderabad) -> Template 1 (<= 3 YOE)
  {
    email: "hr@quickdines.in",
    company: "Quickdines Private Limited",
    role: "Mobile Application Developer",
    subject: "Application – Mobile Application Developer - Murali Krishna Popuri",
    plainBody: `Dear Hiring Team at Quickdines,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your opening for a Mobile Application Developer at Quickdines in Hyderabad and wanted to submit my application. I am very impressed by how Quickdines is connecting passengers, buses, and highway dining through technology, and I would love to contribute to your mobile and web platforms.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing responsive cross-platform applications, integrating RESTful APIs, handling live location/tracking workflows, and ensuring smooth UI performance.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), and I am deeply enthusiastic about joining your startup in Hyderabad to build smooth travel and dining experiences from day one.

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
      salutation: "Dear Hiring Team at Quickdines",
      introLine:
        "I came across your opening for a Mobile Application Developer at Quickdines in Hyderabad and wanted to submit my application. I am very impressed by how Quickdines is connecting passengers, buses, and highway dining through technology, and I would love to contribute to your mobile and web platforms.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing responsive cross-platform applications, integrating RESTful APIs, handling live location/tracking workflows, and ensuring smooth UI performance.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability & Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), and I am deeply enthusiastic about joining your startup in Hyderabad to build smooth travel and dining experiences from day one.",
    }),
  },

  // 3. YouHired (Full Stack Developer - React / Next.js / Node.js / PostgreSQL / AWS) -> Template 1 (<= 3 YOE)
  {
    email: "info@youhired.cloud",
    company: "YouHired",
    role: "Full Stack Developer",
    subject: "Application for Full Stack Developer (React / Next.js / Node.js) - Murali Krishna Popuri",
    plainBody: `Dear Hiring Team at YouHired,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I saw your requirement for a Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, and PostgreSQL and wanted to submit my profile for your client opportunities.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on software engineering experience building scalable full-stack applications with React, Next.js, TypeScript, Node.js, Express, and PostgreSQL/SQL databases.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), deeply enthusiastic about working on challenging client engineering projects.

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
      salutation: "Dear Hiring Team at YouHired",
      introLine:
        "I saw your requirement for a Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, and PostgreSQL and wanted to submit my profile for your client opportunities.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on software engineering experience building scalable full-stack applications with React, Next.js, TypeScript, Node.js, Express, and PostgreSQL/SQL databases.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills & Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability & Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), deeply enthusiastic about working on challenging client engineering projects.",
    }),
  },

  // 4. Himanshi Grover - PineQ Lab Technology (Python + React + AI/LLM, 4-6 Yrs, Hyderabad) -> Template 3 (> 3 YOE)
  {
    email: "himanshi.grover@pineqlab.com",
    company: "PineQ Lab Technology",
    role: "Full Stack / React Developer",
    subject: "Exploring Full Stack / React Developer Opportunities at PineQ Lab Technology - Murali Krishna Popuri",
    plainBody: `Dear Himanshi Grover,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the developer opportunity in Hyderabad. With 2 years of real-time experience building production web applications in React, modern JavaScript/TypeScript, and RESTful APIs, I wanted to reach out to check if there are any openings or hiring in your company suitable for a 2-year experienced engineer.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular React components, integrating RESTful APIs, managing state, and building performant database-backed systems.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Impressive Learning Curve: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), and I am deeply enthusiastic about bringing my hands-on problem-solving skills to PineQ Lab Technology in Hyderabad.

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
      salutation: "Dear Himanshi Grover",
      introLine:
        "I came across your post regarding the developer opportunity in Hyderabad. With 2 years of real-time experience building production web applications in React, modern JavaScript/TypeScript, and RESTful APIs, I wanted to reach out to check if there are any openings or hiring in your company suitable for a 2-year experienced engineer.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React components, integrating RESTful APIs, managing state, and building performant database-backed systems.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Impressive Learning Curve:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), and I am deeply enthusiastic about bringing my hands-on problem-solving skills to PineQ Lab Technology in Hyderabad.",
    }),
  },

  // 5. Kavitha Gollagadda - Petadata / SFTECH (Full Stack Developer, 6+ Yrs, Hyderabad) -> Template 3 (> 3 YOE)
  {
    email: "kavithag@petadata.ai",
    company: "SFTECH / Petadata",
    role: "Full Stack Developer",
    subject: "Exploring Full Stack Developer Opportunities at SFTECH / Petadata - Murali Krishna Popuri",
    plainBody: `Dear Kavitha Gollagadda,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Full Stack Developer opening in Hyderabad. With 2 years of real-time production experience building scalable applications using TypeScript, React, Next.js, and Node.js, I wanted to check if there are any openings in your team or company suitable for a 2-year experienced engineer.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience building full-stack applications with TypeScript, React, Next.js, Node.js, and REST APIs with database persistence.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Impressive Learning Curve: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), comfortable with required shifts, and deeply enthusiastic about contributing from day one.

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
      salutation: "Dear Kavitha Gollagadda",
      introLine:
        "I came across your post regarding the Full Stack Developer opening in Hyderabad. With 2 years of real-time production experience building scalable applications using TypeScript, React, Next.js, and Node.js, I wanted to check if there are any openings in your team or company suitable for a 2-year experienced engineer.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building full-stack applications with TypeScript, React, Next.js, Node.js, and REST APIs with database persistence.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Impressive Learning Curve:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), comfortable with required shifts, and deeply enthusiastic about contributing from day one.",
    }),
  },

  // 6. DIVYA RAJBHAR - Techno-Facts (Frontend Developer / React JS, 4+ Yrs, Hyderabad / Bangalore) -> Template 3 (> 3 YOE)
  {
    email: "divya.r@techno-facts.com",
    company: "Techno-Facts",
    role: "Frontend Developer (React JS)",
    subject: "Exploring Frontend Developer (React) Opportunities at Techno-Facts - Murali Krishna Popuri",
    plainBody: `Dear Divya Rajbhar,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Frontend Developer opening in Hyderabad / Bangalore. With 2 years of hands-on experience specializing in React JS, JavaScript (ES6+), HTML5, CSS3, and responsive UI architecture, I wanted to check if there are any openings or hiring in your company suitable for a 2-year experienced engineer.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular React components, converting Figma designs into pixel-perfect responsive web pages, and integrating REST APIs.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Impressive Learning Curve: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate immediately to Hyderabad or Bangalore, deeply enthusiastic about contributing to your team.

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
      salutation: "Dear Divya Rajbhar",
      introLine:
        "I came across your post regarding the Frontend Developer opening in Hyderabad / Bangalore. With 2 years of hands-on experience specializing in React JS, JavaScript (ES6+), HTML5, CSS3, and responsive UI architecture, I wanted to check if there are any openings or hiring in your company suitable for a 2-year experienced engineer.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React components, converting Figma designs into pixel-perfect responsive web pages, and integrating REST APIs.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Impressive Learning Curve:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate immediately to Hyderabad or Bangalore, deeply enthusiastic about contributing to your team.",
    }),
  },

  // 7. Kasak Agarwal - AltezzaSys (React / Node / Full Stack, 7+ Yrs, Hyderabad) -> Template 3 (> 3 YOE)
  {
    email: "kasak.agarwal@altezzasys.com",
    company: "AltezzaSys",
    role: "Full-Stack Developer",
    subject: "Exploring Full-Stack Developer (React / Node) Opportunities at AltezzaSys - Murali Krishna Popuri",
    plainBody: `Dear Kasak Agarwal,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the Full-Stack Developer opening in Hyderabad. With 2 years of real-time production experience working with ReactJS, TypeScript, Node.js, and RESTful APIs, I wanted to check if there are any openings or hiring in your company suitable for a 2-year experienced engineer.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience building scalable web architectures using ReactJS, TypeScript, Node.js, RESTful microservices, and database systems.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Impressive Learning Curve: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to join in Hyderabad immediately, deeply enthusiastic about contributing from day one.

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
      salutation: "Dear Kasak Agarwal",
      introLine:
        "I came across your post regarding the Full-Stack Developer opening in Hyderabad. With 2 years of real-time production experience working with ReactJS, TypeScript, Node.js, and RESTful APIs, I wanted to check if there are any openings or hiring in your company suitable for a 2-year experienced engineer.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building scalable web architectures using ReactJS, TypeScript, Node.js, RESTful microservices, and database systems.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Impressive Learning Curve:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to join in Hyderabad immediately, deeply enthusiastic about contributing from day one.",
    }),
  },

  // 8. Mohammed Abdul Sohail - Randstad (Full Stack / React Developer, 5-8 Yrs, Hyderabad) -> Template 3 (> 3 YOE)
  {
    email: "mohammed.sohailabdul@randstadsourceright.com",
    company: "Randstad",
    role: "Full Stack Developer",
    subject: "Exploring Full Stack / React Developer Opportunities - Murali Krishna Popuri",
    plainBody: `Dear Mohammed Abdul Sohail,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding the developer opportunity in Hyderabad. With 2 years of hands-on experience developing responsive web applications using React, JavaScript (ES6+), TypeScript, and REST APIs, I wanted to reach out to check if there are any openings suitable for a 2-year experienced engineer.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience specializing in React, TypeScript, modern frontend state management, REST API integration, and database operations.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Impressive Learning Curve: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), fully available for an interview on 26/Sep/2026, and deeply enthusiastic about contributing from day one.

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
      salutation: "Dear Mohammed Abdul Sohail",
      introLine:
        "I came across your post regarding the developer opportunity in Hyderabad. With 2 years of hands-on experience developing responsive web applications using React, JavaScript (ES6+), TypeScript, and REST APIs, I wanted to reach out to check if there are any openings suitable for a 2-year experienced engineer.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience specializing in React, TypeScript, modern frontend state management, REST API integration, and database operations.",
      overviewBullet2:
        "<strong>Current Role & RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Impressive Learning Curve:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview. If you have any openings suitable for a 2-year experienced engineer, I would be grateful for the opportunity.",
      overviewBullet4:
        "<strong>Availability & Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), fully available for an interview on 26/Sep/2026, and deeply enthusiastic about contributing from day one.",
    }),
  },
];

async function main() {
  console.log("Starting natural human email dispatch for September 25 (Batch 1) leads...\n");

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
