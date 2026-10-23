/**
 * NATURAL HUMAN DISPATCH SCRIPT - SEPTEMBER 25, 2026 (BATCH 4 - HYDERABAD FOCUS)
 *
 * Adheres strictly to AGENTS.md:
 * - Strictly 2 years of professional software engineering experience (never "2+ years")
 * - RestoSoft / YoungMinds context (offline-first POS desktop system with local LAN real-time sync)
 * - Impressive fast-learning pitch for roles asking >3 years or secondary tools
 * - Notice period: Immediate joiner (official LWD: Nov 11, negotiable for immediate early release upon offer)
 * - Relocation: Immediate relocation to Hyderabad for Onsite/Hybrid roles
 * - Exactly 4 permitted links: Portfolio, LinkedIn, GitHub, Zestchat
 * - Attached resume: /home/murali-krishna/cluad/goat/automatic_mailer/Murali_Krishna_Popuri_FullStack_Developer.pdf
 * - Anti-spam safe pacing: 45s - 90s randomized jitter delays
 * - Strict deduplication check against sent_history.json
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
  // 1. Siddharth G. - Artech L.L.C. (React JS + TypeScript Developer, Hyderabad)
  {
    email: "siddharth.gupta@artech.com",
    company: "Artech L.L.C.",
    role: "React JS + TypeScript Developer",
    subject: "Application: React JS + TypeScript Developer (Hyderabad) – Murali Krishna Popuri",
    plainBody: `Dear Siddharth G.,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring announcement for the React JS + TypeScript Developer walk-in drive in Hyderabad and would like to formally submit my profile. With solid hands-on experience building performant user interfaces, modular components, and integrating RESTful APIs using React.js and TypeScript, I am confident in adding immediate value to your team.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience developing responsive, accessible web applications using React.js, TypeScript, JavaScript (ES6+), Redux, and REST APIs.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite interviews and relocation to Hyderabad immediately.

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
      salutation: "Dear Siddharth G.",
      introLine:
        "I came across your hiring announcement for the React JS + TypeScript Developer walk-in drive in Hyderabad and would like to formally submit my profile. With solid hands-on experience building performant user interfaces, modular components, and integrating RESTful APIs using React.js and TypeScript, I am confident in adding immediate value to your team.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing responsive, accessible web applications using React.js, TypeScript, JavaScript (ES6+), Redux, and REST APIs.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite interviews and relocation to Hyderabad immediately.",
    }),
  },

  // 2. Meghana Jadhav - Test Yantra (React JS Developer, Hyderabad Client Location)
  {
    email: "Meghana.j@testyantra.com",
    company: "Test Yantra",
    role: "React JS Developer",
    subject: "Application for React JS Developer (Hyderabad) – Murali Krishna Popuri",
    plainBody: `Dear Meghana Jadhav,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for the React JS Developer role in Hyderabad for your client location (100% Work from Office) and would like to apply. With 2 years of experience specializing in React.js, TypeScript, state management, and modern frontend architectures, I would welcome the opportunity to attend the screening rounds.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience crafting reusable React components, managing global application state, and building high-performance frontend interfaces.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability & WFO Readiness: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), fully comfortable with 100% Work from Office in Hyderabad, and available for L1/L2 interview rounds.

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
      salutation: "Dear Meghana Jadhav",
      introLine:
        "I came across your hiring post for the React JS Developer role in Hyderabad for your client location (100% Work from Office) and would like to apply. With 2 years of experience specializing in React.js, TypeScript, state management, and modern frontend architectures, I would welcome the opportunity to attend the screening rounds.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience crafting reusable React components, managing global application state, and building high-performance frontend interfaces.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; WFO Readiness:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), fully comfortable with 100% Work from Office in Hyderabad, and available for L1/L2 interview rounds.",
    }),
  },

  // 3. Sri Sahasra M - Ayaanex Technologies (Senior React UI Engineer, Hyderabad)
  {
    email: "info@ayaanextechnologies.com",
    company: "Ayaanex Technologies",
    role: "Senior React UI Engineer",
    subject: "Senior React UI Engineer – Hyderabad – 8+ Years (Inquiry & Application) – Murali Krishna Popuri",
    plainBody: `Dear Sri Sahasra M and Ayaanex Hiring Team,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I saw your hiring post for the Senior React UI Engineer position in Hyderabad at Ayaanex Technologies. While this role specifies 8+ years, I am reaching out to explore if you might also consider a strong 2-year Full-Stack / React Engineer, or if you have adjacent frontend openings within your engineering team.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience developing pixel-perfect, responsive React dashboards, complex state management workflows, and reusable UI design systems.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate to Hyderabad immediately.

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
      salutation: "Dear Sri Sahasra M and Ayaanex Hiring Team",
      introLine:
        "I saw your hiring post for the Senior React UI Engineer position in Hyderabad at Ayaanex Technologies. While this role specifies 8+ years, I am reaching out to explore if you might also consider a strong 2-year Full-Stack / React Engineer, or if you have adjacent frontend openings within your engineering team.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing pixel-perfect, responsive React dashboards, complex state management workflows, and reusable UI design systems.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate to Hyderabad immediately.",
    }),
  },

  // 4. Venkatesh Babu Karna - Techno Facts (AEM / React JS Frontend Developer, Hyderabad)
  {
    email: "venkateshbabu.k@techno-facts.com",
    company: "Techno Facts",
    role: "Frontend Developer (React JS / JavaScript)",
    subject: "Application: Frontend Developer (React JS / JavaScript) – Hyderabad – Murali Krishna Popuri",
    plainBody: `Dear Venkatesh Babu Karna,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for the Frontend Developer (React JS, JavaScript, UI/UX) position in Hyderabad and would like to apply as an immediate joiner. With strong production experience turning wireframes into performant, reusable UI components using React and JavaScript, I believe I can make an immediate impact.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience building responsive, accessible web interfaces, managing component libraries, and integrating RESTful APIs.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability & Notice Period: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and ready for hybrid/onsite work in Hyderabad immediately.

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
      salutation: "Dear Venkatesh Babu Karna",
      introLine:
        "I came across your hiring post for the Frontend Developer (React JS, JavaScript, UI/UX) position in Hyderabad and would like to apply as an immediate joiner. With strong production experience turning wireframes into performant, reusable UI components using React and JavaScript, I believe I can make an immediate impact.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building responsive, accessible web interfaces, managing component libraries, and integrating RESTful APIs.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Notice Period:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and ready for hybrid/onsite work in Hyderabad immediately.",
    }),
  },

  // 5. Revathi R - VY Systems (Java Full Stack Developer / React, Hyderabad)
  {
    email: "revathi.r@vysystems.com",
    company: "VY Systems",
    role: "Full Stack Developer (React / JavaScript / APIs)",
    subject: "Application for Full Stack Developer (React / JavaScript) – Hyderabad – Murali Krishna Popuri",
    plainBody: `Dear Revathi R,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring announcement on LinkedIn for Full Stack Developer opportunities in Hyderabad and would like to apply. While my core expertise is in React.js, TypeScript, Node.js, and modern APIs, I am very comfortable with full-stack engineering and cross-tier integration.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience developing modular React frontend architectures, architecting robust backend APIs, and managing database layers.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for virtual as well as F2F interviews in Hyderabad.

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
      salutation: "Dear Revathi R",
      introLine:
        "I came across your hiring announcement on LinkedIn for Full Stack Developer opportunities in Hyderabad and would like to apply. While my core expertise is in React.js, TypeScript, Node.js, and modern APIs, I am very comfortable with full-stack engineering and cross-tier integration.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React frontend architectures, architecting robust backend APIs, and managing database layers.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for virtual as well as F2F interviews in Hyderabad.",
    }),
  },

  // 6. Bhawna Sharma - Softobiz (Technical Full Stack - Node.js / React / Next.js, Hyderabad)
  {
    email: "bhawna.sharma@softobiz.com",
    company: "Softobiz",
    role: "Full Stack Developer (Node.js / React / Next.js)",
    subject: "Application for Full Stack Developer (Node.js / React / Next.js) – Hyderabad – Murali Krishna Popuri",
    plainBody: `Dear Bhawna Sharma,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full-Stack JavaScript/TypeScript engineering at Softobiz and would like to apply. My core development background is centered exactly on Node.js, React, and Next.js, building scalable APIs, server-rendered applications, and robust web systems.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience developing full-stack applications with Node.js, Express, Next.js, React.js, TypeScript, and SQL databases.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for opportunities in Hyderabad.

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
      salutation: "Dear Bhawna Sharma",
      introLine:
        "I came across your hiring post for Full-Stack JavaScript/TypeScript engineering at Softobiz and would like to apply. My core development background is centered exactly on Node.js, React, and Next.js, building scalable APIs, server-rendered applications, and robust web systems.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing full-stack applications with Node.js, Express, Next.js, React.js, TypeScript, and SQL databases.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for opportunities in Hyderabad.",
    }),
  },

  // 7. Praneeth kumar Yekkala - UVH Tech Solutions (Full Stack Engineer - React.js / APIs, Hyderabad)
  {
    email: "us@uvhtech.com",
    company: "UVH Tech Solutions",
    role: "Full Stack Engineer (React.js / APIs)",
    subject: "Application for Full Stack Engineer (React.js / APIs) – Immediate Joiner – Murali Krishna Popuri",
    plainBody: `Dear Praneeth kumar Yekkala and UVH Hiring Team,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for the Full Stack Engineer role in Hyderabad requiring mandatory React.js, JavaScript/TypeScript, REST APIs, and SQL. As an immediate joiner with strong production experience in React, state management, and full-stack systems, I would like to apply for this opening.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience developing responsive React.js interfaces, managing Redux/Context state, building REST APIs, and handling SQL/relational data storage.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid/onsite opportunities in Hyderabad.

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
      salutation: "Dear Praneeth kumar Yekkala and UVH Hiring Team",
      introLine:
        "I came across your hiring post for the Full Stack Engineer role in Hyderabad requiring mandatory React.js, JavaScript/TypeScript, REST APIs, and SQL. As an immediate joiner with strong production experience in React, state management, and full-stack systems, I would like to apply for this opening.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing responsive React.js interfaces, managing Redux/Context state, building REST APIs, and handling SQL/relational data storage.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid/onsite opportunities in Hyderabad.",
    }),
  },

  // 8. Komal Bansal - Zetamicron Technologies (UI & API Engineer - React / REST APIs, Hyderabad)
  {
    email: "komal.bansal@zetamicron.com",
    company: "Zetamicron Technologies",
    role: "UI & API Engineer (React / REST APIs)",
    subject: "Application: UI & API Engineer (React / REST APIs) – Hyderabad – Murali Krishna Popuri",
    plainBody: `Dear Komal Bansal,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for the UI & API Engineer position at Zetamicron Technologies in Hyderabad and would like to submit my application. With hands-on experience building dynamic React UIs, integrating REST APIs, and handling end-to-end data flow, I am excited about contributing to your engineering initiatives.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience engineering modern React frontend applications, consuming RESTful APIs, and implementing clean data layer abstractions.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite positions in Hyderabad.

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
      salutation: "Dear Komal Bansal",
      introLine:
        "I came across your hiring post for the UI & API Engineer position at Zetamicron Technologies in Hyderabad and would like to submit my application. With hands-on experience building dynamic React UIs, integrating REST APIs, and handling end-to-end data flow, I am excited about contributing to your engineering initiatives.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience engineering modern React frontend applications, consuming RESTful APIs, and implementing clean data layer abstractions.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite positions in Hyderabad.",
    }),
  },

  // 9. Sneha Parashar - Apptad (React.js & API Software Engineer, Hyderabad)
  {
    email: "sneha.parashar@apptad.com",
    company: "Apptad",
    role: "React.js & API Software Engineer",
    subject: "Application: React.js & API Software Engineer – Hyderabad – Murali Krishna Popuri",
    plainBody: `Dear Sneha Parashar,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for technical roles in Hyderabad requiring hands-on React.js, JavaScript/TypeScript, and API integration/testing. With 2 years of software engineering experience developing robust React applications and REST APIs, I would like to apply.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience developing modular React architectures, writing testable code, and testing/integrating complex REST APIs.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for F2F interview rounds in Hyderabad.

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
      salutation: "Dear Sneha Parashar",
      introLine:
        "I came across your hiring post for technical roles in Hyderabad requiring hands-on React.js, JavaScript/TypeScript, and API integration/testing. With 2 years of software engineering experience developing robust React applications and REST APIs, I would like to apply.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React architectures, writing testable code, and testing/integrating complex REST APIs.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for F2F interview rounds in Hyderabad.",
    }),
  },

  // 10. Mamta Mishra - NuStar Technologies (Senior Full Stack Developer - TypeScript / React, Hyderabad)
  {
    email: "mamta@nustartech.com",
    company: "NuStar Technologies",
    role: "Full Stack Developer (TypeScript / React)",
    subject: "Application for Full Stack Developer (TypeScript / React) – Hyderabad – Murali Krishna Popuri",
    plainBody: `Dear Mamta Mishra,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring announcement for the Full Stack Developer opening in Hyderabad at NuStar Technologies. With strong hands-on experience building production-grade frontend architectures using TypeScript and React along with robust REST API backends, I am keen to explore opportunities with your team.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience building responsive React applications with TypeScript, implementing component libraries, and designing scalable REST APIs.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability & Location: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite roles in Hyderabad.

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
      salutation: "Dear Mamta Mishra",
      introLine:
        "I came across your hiring announcement for the Full Stack Developer opening in Hyderabad at NuStar Technologies. With strong hands-on experience building production-grade frontend architectures using TypeScript and React along with robust REST API backends, I am keen to explore opportunities with your team.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building responsive React applications with TypeScript, implementing component libraries, and designing scalable REST APIs.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Location:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite roles in Hyderabad.",
    }),
  },
];

async function run() {
  console.log("Starting Batch 4 dispatch (Hyderabad Focus)...");
  await sendBatchSafely(leads, { maxBatch: 10, ignoreDailyCap: false });
}

run().catch((err) => {
  console.error("Batch 4 dispatch failed:", err);
  process.exit(1);
});
