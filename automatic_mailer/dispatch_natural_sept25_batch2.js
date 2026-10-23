/**
 * NATURAL HUMAN DISPATCH SCRIPT - SEPTEMBER 25, 2026 (BATCH 2)
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
  // 1. Praveen Kumar - Pronix Inc (Full Stack AI Engineer, Gachibowli Hyderabad, Immediate Joiners Preferred)
  {
    email: "praveenl@pronixinc.com",
    company: "Pronix Inc",
    role: "Full Stack AI Engineer",
    subject: "Application for Full Stack AI Engineer at Pronix Inc - Murali Krishna Popuri",
    plainBody: `Dear Praveen Kumar,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your opening for the Full Stack AI Engineer position in Gachibowli, Hyderabad, and wanted to express my strong interest in joining Pronix Inc. With 2 years of production experience building modern web applications with React, Node.js, TypeScript, and REST APIs, I am enthusiastic about contributing to your engineering team.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on software development experience creating performant React frontend interfaces, building scalable backend services in Node.js, and integrating robust REST APIs.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for onsite work in Gachibowli, Hyderabad, and enthusiastic about delivering high-quality engineering from day one.

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
      salutation: "Dear Praveen Kumar",
      introLine:
        "I came across your opening for the Full Stack AI Engineer position in Gachibowli, Hyderabad, and wanted to express my strong interest in joining Pronix Inc. With 2 years of production experience building modern web applications with React, Node.js, TypeScript, and REST APIs, I am enthusiastic about contributing to your engineering team.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on software development experience creating performant React frontend interfaces, building scalable backend services in Node.js, and integrating robust REST APIs.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for onsite work in Gachibowli, Hyderabad, and enthusiastic about delivering high-quality engineering from day one.",
    }),
  },

  // 2. Dixit Parekh - Ancile Digital (Full Stack Developer, React.js, Node.js, JS/TS, REST APIs) -> Template 3
  {
    email: "Dixit.parekh@anciledigital.com",
    company: "Ancile Digital",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Opportunities at Ancile Digital - Murali Krishna Popuri",
    plainBody: `Dear Dixit Parekh,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding Full Stack Developer hiring at Ancile Digital. While I noticed the senior requirement, I wanted to reach out to check if Ancile Digital has any openings or upcoming opportunities for a Full Stack Developer with 2 years of experience focused on React.js, Node.js, JavaScript, TypeScript, and REST APIs.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of professional software development experience engineering scalable web applications with React.js, Node.js, TypeScript, Express, and SQL/NoSQL databases.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to relocate immediately, and keen to contribute to high-impact software initiatives at Ancile Digital.

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
      salutation: "Dear Dixit Parekh",
      introLine:
        "I came across your post regarding Full Stack Developer hiring at Ancile Digital. While I noticed the senior requirement, I wanted to reach out to check if Ancile Digital has any openings or upcoming opportunities for a Full Stack Developer with 2 years of experience focused on React.js, Node.js, JavaScript, TypeScript, and REST APIs.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of professional software development experience engineering scalable web applications with React.js, Node.js, TypeScript, Express, and SQL/NoSQL databases.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to relocate immediately, and keen to contribute to high-impact software initiatives at Ancile Digital.",
    }),
  },

  // 3. Kanchan Kamankar - Ampcus Tech (Java / React Full Stack Developer, Hyderabad / Bangalore) -> Template 3
  {
    email: "kanchan.kamankar@ampcustech.com",
    company: "Ampcus Tech",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Openings at Ampcus Tech - Murali Krishna Popuri",
    plainBody: `Dear Kanchan Kamankar,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack Developers in Hyderabad/Bangalore. While I noticed the senior requirement, I wanted to inquire if your team has openings for Full-Stack Developers with 2 years of solid production experience specializing in React.js, TypeScript, RESTful services, and modern backend integration.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on software development experience building performant React and TypeScript user interfaces, integrating microservices and RESTful APIs, and working with relational SQL databases.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), ready to relocate immediately to Hyderabad or Bengaluru, and excited about collaborating on enterprise projects.

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
      salutation: "Dear Kanchan Kamankar",
      introLine:
        "I came across your hiring post for Full Stack Developers in Hyderabad/Bangalore. While I noticed the senior requirement, I wanted to inquire if your team has openings for Full-Stack Developers with 2 years of solid production experience specializing in React.js, TypeScript, RESTful services, and modern backend integration.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on software development experience building performant React and TypeScript user interfaces, integrating microservices and RESTful APIs, and working with relational SQL databases.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), ready to relocate immediately to Hyderabad or Bengaluru, and excited about collaborating on enterprise projects.",
    }),
  },

  // 4. Sharmila Bala - Volto Consulting (SDE II, TypeScript, APIs, Frontend/Backend, Hyderabad) -> Template 3
  {
    email: "sharmila.b@voltoconsulting.com",
    company: "Volto Consulting",
    role: "Software Developer Engineer",
    subject: "Software Developer Engineer Openings at Volto Consulting - Murali Krishna Popuri",
    plainBody: `Dear Sharmila Bala,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Software Developer Engineers in Hyderabad. While I noticed the 4-6 years requirement for SDE II, I wanted to reach out to check if Volto Consulting has openings for developers with 2 years of strong production experience in TypeScript, React, REST APIs, and database engineering.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular frontend web applications, architecting RESTful endpoints, and writing maintainable TypeScript code.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for roles in Hyderabad, and eager to contribute to your engineering deliverables.

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
      salutation: "Dear Sharmila Bala",
      introLine:
        "I came across your hiring post for Software Developer Engineers in Hyderabad. While I noticed the 4-6 years requirement for SDE II, I wanted to reach out to check if Volto Consulting has openings for developers with 2 years of strong production experience in TypeScript, React, REST APIs, and database engineering.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular frontend web applications, architecting RESTful endpoints, and writing maintainable TypeScript code.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for roles in Hyderabad, and eager to contribute to your engineering deliverables.",
    }),
  },

  // 5. Gollapalli Pavani - Eversoft Technologies (Full Stack / React / TypeScript, Hyderabad) -> Template 3
  {
    email: "pavani.gollapalli@eversoftit.com",
    company: "Eversoft Technologies",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Opportunities at Eversoft Technologies - Murali Krishna Popuri",
    plainBody: `Dear Gollapalli Pavani,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack development roles in Hyderabad. While I noted the lead position requirements, I wanted to check if Eversoft Technologies is also hiring Full Stack Developers with 2 years of experience specialized in React.js, JavaScript, TypeScript, and REST APIs.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing responsive React interfaces, integrating backend APIs, and managing relational databases.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for Hyderabad opportunities, and ready to get started immediately.

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
      salutation: "Dear Gollapalli Pavani",
      introLine:
        "I came across your hiring post for Full Stack development roles in Hyderabad. While I noted the lead position requirements, I wanted to check if Eversoft Technologies is also hiring Full Stack Developers with 2 years of experience specialized in React.js, JavaScript, TypeScript, and REST APIs.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing responsive React interfaces, integrating backend APIs, and managing relational databases.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for Hyderabad opportunities, and ready to get started immediately.",
    }),
  },

  // 6. Mohita Srivastava - bbworks (Weekend F2F Drive Hyderabad, Full Stack React) -> Template 3
  {
    email: "mohita@bbworks.in",
    company: "bbworks",
    role: "Full Stack Developer",
    subject: "Application: Java & React Full Stack Drive - Hyderabad - Murali Krishna Popuri",
    plainBody: `Dear Mohita Srivastava,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your announcement regarding the Weekend Face-to-Face Interview Drive in Hyderabad for Full Stack Developer roles. While I saw the senior experience band, I wanted to reach out and express my strong interest in attending and interviewing for Full Stack Developer openings with 2 years of hands-on production experience in React, modern JavaScript, and API integration.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience building responsive user interfaces with React.js, managing complex state, and integrating secure RESTful APIs.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to attend the Face-to-Face interview drive in Hyderabad, and enthusiastic about contributing immediately.

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
      salutation: "Dear Mohita Srivastava",
      introLine:
        "I came across your announcement regarding the Weekend Face-to-Face Interview Drive in Hyderabad for Full Stack Developer roles. While I saw the senior experience band, I wanted to reach out and express my strong interest in attending and interviewing for Full Stack Developer openings with 2 years of hands-on production experience in React, modern JavaScript, and API integration.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building responsive user interfaces with React.js, managing complex state, and integrating secure RESTful APIs.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to attend the Face-to-Face interview drive in Hyderabad, and enthusiastic about contributing immediately.",
    }),
  },

  // 7. Nitin K / PEIT Consultants (Java / React Full Stack Developer, Hyderabad, 3.5+ YOE) -> Template 1 / 3
  {
    email: "info@peit.in",
    company: "PEIT Consultants",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Application - Hyderabad - Murali Krishna Popuri",
    plainBody: `Dear Nitin K and PEIT Team,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack Developers for MNC opportunities in Hyderabad. With 2 years of hands-on software development experience building scalable frontend applications with React and integrating robust RESTful APIs, I would love to be considered for your open positions.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular React components, writing RESTful services, and optimizing database persistence with SQL.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for hybrid opportunities in Hyderabad, and eager to hit the ground running.

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
      salutation: "Dear Nitin K and PEIT Team",
      introLine:
        "I came across your hiring post for Full Stack Developers for MNC opportunities in Hyderabad. With 2 years of hands-on software development experience building scalable frontend applications with React and integrating robust RESTful APIs, I would love to be considered for your open positions.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React components, writing RESTful services, and optimizing database persistence with SQL.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for hybrid opportunities in Hyderabad, and eager to hit the ground running.",
    }),
  },

  // 8. Chavi Mishra - Aliqan Technologies (Full Stack React / JS, Gachibowli Hyderabad) -> Template 3
  {
    email: "e-chavi@aliqan.com",
    company: "Aliqan Technologies",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Opportunities at Aliqan Technologies - Murali Krishna Popuri",
    plainBody: `Dear Chavi Mishra,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack Developer roles in Gachibowli, Hyderabad. While I noted the senior experience requirement, I wanted to inquire if Aliqan Technologies has openings for Full Stack Developers with 2 years of hands-on production experience in React.js, JavaScript/TypeScript, and RESTful API integration.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of hands-on experience building dynamic React.js frontend interfaces, architecting REST APIs, and working with SQL/NoSQL databases.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for 5 days work from office in Gachibowli, Hyderabad, and eager to contribute from day one.

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
      salutation: "Dear Chavi Mishra",
      introLine:
        "I came across your hiring post for Full Stack Developer roles in Gachibowli, Hyderabad. While I noted the senior experience requirement, I wanted to inquire if Aliqan Technologies has openings for Full Stack Developers with 2 years of hands-on production experience in React.js, JavaScript/TypeScript, and RESTful API integration.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of hands-on experience building dynamic React.js frontend interfaces, architecting REST APIs, and working with SQL/NoSQL databases.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for 5 days work from office in Gachibowli, Hyderabad, and eager to contribute from day one.",
    }),
  },

  // 9. Madhan M - Datatech Genius (Full Stack Developer, React.js, Remote / Hyderabad) -> Template 3
  {
    email: "mathan26mathan@gmail.com",
    company: "Datatech Genius",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Opportunities - Remote / Hyderabad - Murali Krishna Popuri",
    plainBody: `Dear Madhan M,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your post regarding Full Stack Developer positions in Hyderabad / Remote. While I noticed the senior requirement, I wanted to reach out to check if there are openings for Full Stack Developers with 2 years of hands-on experience in React.js, JavaScript/TypeScript, REST APIs, and database engineering.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular React components, writing RESTful APIs, and working with SQL databases.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for remote or Hyderabad roles, and ready to contribute immediately.

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
      salutation: "Dear Madhan M",
      introLine:
        "I came across your post regarding Full Stack Developer positions in Hyderabad / Remote. While I noticed the senior requirement, I wanted to reach out to check if there are openings for Full Stack Developers with 2 years of hands-on experience in React.js, JavaScript/TypeScript, REST APIs, and database engineering.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React components, writing RESTful APIs, and working with SQL databases.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for remote or Hyderabad roles, and ready to contribute immediately.",
    }),
  },
];

async function main() {
  console.log("Starting dispatch of Batch 2 (Sept 25, 2026)...");
  const result = await sendBatchSafely(leads, { maxBatch: 10 });
  console.log("Dispatch finished with result:", result);
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Batch execution encountered an error:", err);
    process.exit(1);
  });
}

module.exports = { leads, main };
