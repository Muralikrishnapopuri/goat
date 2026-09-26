/**
 * NATURAL HUMAN DISPATCH SCRIPT - SEPTEMBER 25, 2026 (BATCH 5 - FINAL DAILY ALLOCATION)
 *
 * Implements:
 * - 4 years combined professional & hands-on development experience pitch for >3 YOE roles
 * - 2 years enterprise production at YoungMinds building RestoSoft (offline-first POS with LAN sync)
 * - Immediate joiner status (official LWD Nov 11, negotiable for immediate early release)
 * - 4 permitted links (Portfolio, LinkedIn, GitHub, Zestchat)
 * - Attached resume: Murali_Krishna_Popuri_FullStack_Developer.pdf
 * - Anti-spam safe pacing (45s - 90s randomized jitter)
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
  <p>My name is Murali Krishna Popuri, and I am a Full-Stack Developer bringing 4 years of combined professional and hands-on software engineering experience actively seeking opportunities in Software Development.</p>
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
  // 1. ICROZ Solutions / Headout (Software Engineer Web Frontend - 1+ YOE, Bengaluru)
  {
    email: "hr@icrozsolution.com",
    company: "ICROZ Solutions / Headout",
    role: "Software Engineer, Web (Frontend)",
    subject: "Application: Software Engineer, Web (Frontend) – Murali Krishna Popuri",
    plainBody: `Dear Hiring Team at ICROZ Solutions and Headout,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Frontend and Full-Stack Engineering.

I came across your hiring post for the Software Engineer, Web (Frontend) role for Headout in Bengaluru and would like to apply. With strong hands-on experience developing performant, responsive web applications using React, TypeScript, and modern JavaScript, I am confident in delivering high-impact features.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience developing modular React components, optimizing web performance, and integrating RESTful APIs.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Architecture: Core expertise in React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, and REST API integration with proven capability in cross-browser compatibility and responsive UI.
- Availability: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite/hybrid roles in Bengaluru immediately.

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
      salutation: "Dear Hiring Team at ICROZ Solutions and Headout",
      introLine:
        "I came across your hiring post for the Software Engineer, Web (Frontend) role for Headout in Bengaluru and would like to apply. With strong hands-on experience developing performant, responsive web applications using React, TypeScript, and modern JavaScript, I am confident in delivering high-impact features.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React components, optimizing web performance, and integrating RESTful APIs.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Architecture:</strong> Core expertise in React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, and REST API integration with proven capability in cross-browser compatibility and responsive UI.",
      overviewBullet4:
        "<strong>Availability:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite/hybrid roles in Bengaluru immediately.",
    }),
  },

  // 2. Swati Shrivastava - Spectrum Talent (Java Full Stack Developer with React - 2+ YOE, Bangalore)
  {
    email: "swati.shrivastava@stmpl.co.in",
    company: "Spectrum Talent Management",
    role: "Full Stack Developer (React / JavaScript / APIs)",
    subject: "Application for Full Stack Developer (React / APIs) – Bangalore – Murali Krishna Popuri",
    plainBody: `Dear Swati Shrivastava,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack Developer opportunities (2+ years) in Bangalore and would like to submit my profile. With solid production experience building responsive React.js frontends, designing REST APIs, and handling relational database layers, I am excited about contributing to your client's projects.

Here’s a quick overview of my profile:
- Professional Experience: 2 years of software engineering experience developing scalable web applications, REST APIs, and database-driven interfaces.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and ready to relocate to Bangalore immediately.

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
      salutation: "Dear Swati Shrivastava",
      introLine:
        "I came across your hiring post for Full Stack Developer opportunities (2+ years) in Bangalore and would like to submit my profile. With solid production experience building responsive React.js frontends, designing REST APIs, and handling relational database layers, I am excited about contributing to your client's projects.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing scalable web applications, REST APIs, and database-driven interfaces.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and ready to relocate to Bangalore immediately.",
    }),
  },

  // 3. Lavanya M - Cortex Consultants (Full Stack Developer - React.js / Node.js / APIs, Hyderabad / Bangalore)
  {
    email: "lavanya.m@cortexconsultants.com",
    company: "Cortex Consultants",
    role: "Full Stack Developer (React.js / Node.js)",
    subject: "Application: Full Stack Developer (React.js / Node.js) – Murali Krishna Popuri",
    plainBody: `Dear Lavanya M,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I bring 4 years of combined professional and hands-on full-stack engineering experience actively seeking opportunities in Software Development.

I came across your hiring announcement for Full Stack Developer opportunities across Hyderabad and Bangalore. With comprehensive experience in building responsive React frontends, robust Node.js/Express REST APIs, and database architectures, I would love to explore opportunities with Cortex Consultants.

Here’s a quick overview of my profile:
- Combined Experience: 4 years of hands-on software development across frontend and backend systems, with the last 2 years in a full-time capacity at YoungMinds Technology Solutions.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid roles in Hyderabad or Bangalore.

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
      salutation: "Dear Lavanya M",
      introLine:
        "I came across your hiring announcement for Full Stack Developer opportunities across Hyderabad and Bangalore. With comprehensive experience in building responsive React frontends, robust Node.js/Express REST APIs, and database architectures, I would love to explore opportunities with Cortex Consultants.",
      overviewBullet1:
        "<strong>Combined Experience:</strong> 4 years of hands-on software development across frontend and backend systems, with the last 2 years in a full-time capacity at YoungMinds Technology Solutions.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid roles in Hyderabad or Bangalore.",
    }),
  },

  // 4. Srikanth . - DataQ Inc (Technical Full Stack Developer - React / TypeScript / APIs, Hyderabad)
  {
    email: "ulli.srikanth@dataqinc.com",
    company: "DataQ Inc",
    role: "Full Stack Developer (React / TypeScript)",
    subject: "Application: Full Stack Developer (React / TypeScript) – Immediate Joiner – Murali Krishna Popuri",
    plainBody: `Dear Srikanth,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I bring 4 years of combined professional and hands-on full-stack software development experience.

I saw your hiring post for full-stack engineering in Hyderabad requiring immediate joiners with expertise in React, TypeScript, and database APIs. As an immediate joiner with strong hands-on experience delivering complex applications, I am eager to apply.

Here’s a quick overview of my profile:
- Combined Experience: 4 years of software development experience, including 2 years of full-time professional software engineering at YoungMinds Technology Solutions.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid work in Hyderabad immediately.

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
      salutation: "Dear Srikanth",
      introLine:
        "I saw your hiring post for full-stack engineering in Hyderabad requiring immediate joiners with expertise in React, TypeScript, and database APIs. As an immediate joiner with strong hands-on experience delivering complex applications, I am eager to apply.",
      overviewBullet1:
        "<strong>Combined Experience:</strong> 4 years of software development experience, including 2 years of full-time professional software engineering at YoungMinds Technology Solutions.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid work in Hyderabad immediately.",
    }),
  },

  // 5. Kavitha Sandra - Costaff Global (React Frontend Developer, Hyderabad / Bangalore)
  {
    email: "kavitha@costaffglobal.com",
    company: "Costaff Global",
    role: "React Frontend Developer",
    subject: "Application for React Frontend Developer (Hyderabad / Bangalore) – Murali Krishna Popuri",
    plainBody: `Dear Kavitha Sandra,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I bring 4 years of combined professional and hands-on full-stack development experience specializing in React.js and modern UI architectures.

I came across your hiring announcement for the React Frontend Developer position across Hyderabad and Bangalore. With deep experience building dynamic, responsive dashboards, modernizing UI components, and consuming REST APIs, I would love to be considered for this role.

Here’s a quick overview of my profile:
- Combined Experience: 4 years of software engineering experience developing modular React interfaces, implementing Redux/Context state management, and optimizing frontend performance.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite/hybrid work in Hyderabad or Bangalore.

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
      salutation: "Dear Kavitha Sandra",
      introLine:
        "I came across your hiring announcement for the React Frontend Developer position across Hyderabad and Bangalore. With deep experience building dynamic, responsive dashboards, modernizing UI components, and consuming REST APIs, I would love to be considered for this role.",
      overviewBullet1:
        "<strong>Combined Experience:</strong> 4 years of software engineering experience developing modular React interfaces, implementing Redux/Context state management, and optimizing frontend performance.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for onsite/hybrid work in Hyderabad or Bangalore.",
    }),
  },

  // 6. Rishi Sinha - IIRIS Consulting (Software Developer - React / Node.js / TypeScript, Bangalore)
  {
    email: "rishikesh.sinha@iirisconsulting.com",
    company: "IIRIS Consulting",
    role: "Software Developer (React / Node.js)",
    subject: "Application for Software Developer (React / Node.js) – Bangalore – Murali Krishna Popuri",
    plainBody: `Dear Rishi Sinha,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I bring 4 years of combined professional and hands-on full-stack development experience actively seeking opportunities in Software Development.

I came across your hiring post for the Software Developer opening in Bangalore requiring hands-on proficiency with React, Node.js, TypeScript, and RESTful APIs. With solid production experience in full-stack JavaScript/TypeScript ecosystems, I would like to apply.

Here’s a quick overview of my profile:
- Combined Experience: 4 years of software development experience building performant web applications, with 2 years of full-time professional experience at YoungMinds.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and ready to relocate to Bangalore immediately.

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
      salutation: "Dear Rishi Sinha",
      introLine:
        "I came across your hiring post for the Software Developer opening in Bangalore requiring hands-on proficiency with React, Node.js, TypeScript, and RESTful APIs. With solid production experience in full-stack JavaScript/TypeScript ecosystems, I would like to apply.",
      overviewBullet1:
        "<strong>Combined Experience:</strong> 4 years of software development experience building performant web applications, with 2 years of full-time professional experience at YoungMinds.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and ready to relocate to Bangalore immediately.",
    }),
  },

  // 7. Vinay Sharma - Coders Brain (React Full Stack Developer, Bengaluru)
  {
    email: "vinay.sharma@codersbrain.com",
    company: "Coders Brain",
    role: "React Full Stack Developer",
    subject: "Application for React Full Stack Developer – Bengaluru – Murali Krishna Popuri",
    plainBody: `Dear Vinay Sharma,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I bring 4 years of combined professional and hands-on full-stack development experience.

I came across your hiring post for the React Full Stack Developer role in Bengaluru (Work from Office) and would like to apply as an immediate joiner. With comprehensive experience delivering responsive React frontends and robust backend integrations, I am excited about this opportunity.

Here’s a quick overview of my profile:
- Combined Experience: 4 years of software development experience, including 2 years of production software engineering at YoungMinds Technology Solutions.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and ready for full-time Work from Office in Bengaluru.

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
      salutation: "Dear Vinay Sharma",
      introLine:
        "I came across your hiring post for the React Full Stack Developer role in Bengaluru (Work from Office) and would like to apply as an immediate joiner. With comprehensive experience delivering responsive React frontends and robust backend integrations, I am excited about this opportunity.",
      overviewBullet1:
        "<strong>Combined Experience:</strong> 4 years of software development experience, including 2 years of production software engineering at YoungMinds Technology Solutions.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and ready for full-time Work from Office in Bengaluru.",
    }),
  },

  // 8. Jyoti Sharma - Strawberry Infotech (Full Stack Engineer - Node.js / React / TypeScript, Bangalore)
  {
    email: "jyoti.s@strawberryinfotech.com",
    company: "Strawberry Infotech",
    role: "Full Stack Engineer (React / Node.js)",
    subject: "Application for Full Stack Engineer (React / Node.js) – Bangalore – Murali Krishna Popuri",
    plainBody: `Dear Jyoti Sharma,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I bring 4 years of combined professional and hands-on full-stack development experience actively seeking opportunities in Software Development.

I came across your hiring announcement for the Full Stack Engineer role in Bangalore requiring hands-on production experience in React, Node.js, TypeScript, and REST/GraphQL APIs. With strong full-stack JavaScript/TypeScript engineering skills, I am excited to submit my profile.

Here’s a quick overview of my profile:
- Combined Experience: 4 years of software development experience architecting modern frontend interfaces and scalable backend services, including 2 years full-time at YoungMinds.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate to Bangalore immediately.

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
      salutation: "Dear Jyoti Sharma",
      introLine:
        "I came across your hiring announcement for the Full Stack Engineer role in Bangalore requiring hands-on production experience in React, Node.js, TypeScript, and REST/GraphQL APIs. With strong full-stack JavaScript/TypeScript engineering skills, I am excited to submit my profile.",
      overviewBullet1:
        "<strong>Combined Experience:</strong> 4 years of software development experience architecting modern frontend interfaces and scalable backend services, including 2 years full-time at YoungMinds.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate to Bangalore immediately.",
    }),
  },

  // 9. Sneha U. / Keerthana S - Recruitment Hub 365 (Frontend Developer SDE 2 - React.js / Next.js / TypeScript, Bengaluru)
  {
    email: "contact@recruitmenthub365.com",
    company: "Recruitment Hub 365",
    role: "Frontend Developer – SDE 2",
    subject: "Application: Frontend Developer – SDE 2 (React.js / Next.js) – Murali Krishna Popuri",
    plainBody: `Dear Keerthana S and Recruitment Hub 365 Team,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I bring 4 years of combined professional and hands-on full-stack development experience specializing in React.js, Next.js, and TypeScript.

I came across your hiring announcement for the Frontend Developer – SDE 2 role in Bengaluru (Hybrid). With strong hands-on expertise building scalable React/Next.js frontend architectures, implementing Redux Toolkit state, and integrating complex RESTful APIs, I would love to be considered.

Here’s a quick overview of my profile:
- Combined Experience: 4 years of software engineering experience developing responsive, high-performance web applications, including 2 years in production at YoungMinds Technology Solutions.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Architecture: Mastery of React.js, Next.js, TypeScript, JavaScript (ES6+), Redux, Context API, REST APIs, and modern frontend testing/tooling.
- Availability: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid work in Bengaluru immediately.

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
      salutation: "Dear Keerthana S and Recruitment Hub 365 Team",
      introLine:
        "I came across your hiring announcement for the Frontend Developer – SDE 2 role in Bengaluru (Hybrid). With strong hands-on expertise building scalable React/Next.js frontend architectures, implementing Redux Toolkit state, and integrating complex RESTful APIs, I would love to be considered.",
      overviewBullet1:
        "<strong>Combined Experience:</strong> 4 years of software engineering experience developing responsive, high-performance web applications, including 2 years in production at YoungMinds Technology Solutions.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Architecture:</strong> Mastery of React.js, Next.js, TypeScript, JavaScript (ES6+), Redux, Context API, REST APIs, and modern frontend testing/tooling.",
      overviewBullet4:
        "<strong>Availability:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid work in Bengaluru immediately.",
    }),
  },

  // 10. Supriya Kataram - Nxthire (.NET Full Stack Developer with React, Hyderabad)
  {
    email: "supriya.nxthireindia@gmail.com",
    company: "Nxthire",
    role: "Full Stack Developer (React / JavaScript / SQL)",
    subject: "Application for Full Stack Developer (React / SQL) – Hyderabad – Murali Krishna Popuri",
    plainBody: `Dear Supriya Kataram,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I bring 4 years of combined professional and hands-on full-stack development experience actively seeking opportunities in Software Development.

I came across your hiring post for full-stack engineering in Hyderabad requiring strong React, JavaScript, HTML/CSS, and SQL database skills. With proven experience delivering responsive frontend interfaces and managing database layers, I am keen to apply.

Here’s a quick overview of my profile:
- Combined Experience: 4 years of software development experience, including 2 years of full-time professional experience at YoungMinds Technology Solutions.
- Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
- Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
- Availability: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid work in Hyderabad immediately.

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
      salutation: "Dear Supriya Kataram",
      introLine:
        "I came across your hiring post for full-stack engineering in Hyderabad requiring strong React, JavaScript, HTML/CSS, and SQL database skills. With proven experience delivering responsive frontend interfaces and managing database layers, I am keen to apply.",
      overviewBullet1:
        "<strong>Combined Experience:</strong> 4 years of software development experience, including 2 years of full-time professional experience at YoungMinds Technology Solutions.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid work in Hyderabad immediately.",
    }),
  },
];

async function run() {
  console.log("Starting Batch 5 dispatch (Final Daily Safe Quota)...");
  await sendBatchSafely(leads, { maxBatch: 10, ignoreDailyCap: false });
}

run().catch((err) => {
  console.error("Batch 5 dispatch failed:", err);
  process.exit(1);
});
