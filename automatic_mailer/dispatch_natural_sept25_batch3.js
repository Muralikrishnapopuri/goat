/**
 * NATURAL HUMAN DISPATCH SCRIPT - SEPTEMBER 25, 2026 (BATCH 3 - BENGALURU FOCUS)
 *
 * Implements user's mandated structure from /home/murali-krishna/Desktop/stuff/Email_template.pdf:
 * - Template 1 for <= 3 years experience (Direct Job Application, e.g. Sushmitha C at CareerXperts 2-5 YOE)
 * - Template 3 for > 3 years experience (Inquiring about openings for 2 YOE + Impressive Fast-Learning Pitch)
 * - Candidate profile constraints from AGENTS.md:
 *   - Strictly 2 years professional software engineering experience
 *   - RestoSoft / YoungMinds context (offline-first POS desktop system with local LAN real-time sync)
 *   - Impressive fast-learning pitch for secondary/non-main skills
 *   - Notice period: Immediate joiner (official LWD: Nov 11, negotiable for early release) with enthusiastic tone
 *   - Relocation to Bengaluru ready (Available for Immediate Relocation)
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
  // 1. Sushmitha C - CareerXperts (Full Stack Engineer, 2-5 YOE, Bangalore SaaS Product Company) -> Template 1 (<= 3 YOE)
  {
    email: "sushmitha.c@careerxperts.com",
    company: "CareerXperts",
    role: "Full Stack Engineer",
    subject: "Application for Full Stack Engineer - SaaS Product Company (Bangalore) - Murali Krishna Popuri",
    plainBody: `Dear Sushmitha C,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your opening for Full Stack Engineers in Bangalore for a SaaS Product Company and would like to apply for this position. With 2 years of hands-on experience building scalable, high-volume applications using React, Next.js, Node.js, JavaScript, TypeScript, and REST APIs, I believe my skills make me a strong candidate for this role.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular React/Next.js frontend architectures, building high-throughput Node.js backend services, and designing RESTful APIs and SQL/NoSQL databases.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to relocate to Bangalore immediately, and deeply enthusiastic about driving product excellence from day one.

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
      salutation: "Dear Sushmitha C",
      introLine:
        "I came across your opening for Full Stack Engineers in Bangalore for a SaaS Product Company and would like to apply for this position. With 2 years of hands-on experience building scalable, high-volume applications using React, Next.js, Node.js, JavaScript, TypeScript, and REST APIs, I believe my skills make me a strong candidate for this role.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React/Next.js frontend architectures, building high-throughput Node.js backend services, and designing RESTful APIs and SQL/NoSQL databases.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to relocate to Bangalore immediately, and deeply enthusiastic about driving product excellence from day one.",
    }),
  },

  // 2. Rajeshwari VH - CareerXperts (Full stack Developer React + Node.js, Bangalore) -> Template 3
  {
    email: "rajeshwari.vh@careerxperts.com",
    company: "CareerXperts",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Opportunities (Bangalore) - Murali Krishna Popuri",
    plainBody: `Dear Rajeshwari VH,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for a Full Stack Developer with strong React and Node.js experience in Bangalore. While I noticed the 3-6 years requirement, I wanted to reach out to check if there are opportunities for developers with 2 years of hands-on production experience in React, TypeScript, Node.js APIs, and real-time systems.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience building responsive React interfaces, architecting RESTful APIs in Node.js, and implementing database persistence with SQL.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), ready to relocate to Bangalore immediately, and keen to take end-to-end ownership.

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
      salutation: "Dear Rajeshwari VH",
      introLine:
        "I came across your hiring post for a Full Stack Developer with strong React and Node.js experience in Bangalore. While I noticed the 3-6 years requirement, I wanted to reach out to check if there are opportunities for developers with 2 years of hands-on production experience in React, TypeScript, Node.js APIs, and real-time systems.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building responsive React interfaces, architecting RESTful APIs in Node.js, and implementing database persistence with SQL.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), ready to relocate to Bangalore immediately, and keen to take end-to-end ownership.",
    }),
  },

  // 3. Ritika K - Tech Grow Global (FullStack Engineer, React/Next.js/Node.js, Bangalore) -> Template 3
  {
    email: "ritika.k@techgrowglobal.com",
    company: "Tech Grow Global",
    role: "Full Stack Engineer",
    subject: "Full Stack Engineer Opportunities (Bangalore) - Murali Krishna Popuri",
    plainBody: `Dear Ritika K,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for a Full Stack Engineer in Bangalore building an AI-powered e-commerce platform. While I noted the 4-5 years experience range, I wanted to check if there are openings for Full Stack Engineers with 2 years of hands-on production experience in React, Next.js, Node.js, TypeScript, and REST APIs.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular web interfaces with React and Next.js, writing robust Node.js backend services, and managing SQL/NoSQL databases.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for work in Bangalore, and eager to contribute from day one.

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
      salutation: "Dear Ritika K",
      introLine:
        "I came across your hiring post for a Full Stack Engineer in Bangalore building an AI-powered e-commerce platform. While I noted the 4-5 years experience range, I wanted to check if there are openings for Full Stack Engineers with 2 years of hands-on production experience in React, Next.js, Node.js, TypeScript, and REST APIs.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular web interfaces with React and Next.js, writing robust Node.js backend services, and managing SQL/NoSQL databases.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for work in Bangalore, and eager to contribute from day one.",
    }),
  },

  // 4. Yogita Paliwal - Xponentium India (Full Stack Developer Java/React + GenAI, Bangalore) -> Template 3
  {
    email: "yogita.paliwal@xponentiums.com",
    company: "Xponentium India",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Opportunities (Bangalore) - Murali Krishna Popuri",
    plainBody: `Dear Yogita Paliwal,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack Developers with React and AI integration experience in Bangalore. While I noticed the 5-8 years experience requirement, I wanted to check if Xponentium India has openings for Full Stack Developers with 2 years of production experience delivering modern React frontends, TypeScript, REST APIs, and database engineering.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software development experience engineering interactive React interfaces, integrating secure RESTful APIs, and implementing database persistence with PostgreSQL.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to relocate to Bangalore immediately, and enthusiastic about building scalable enterprise applications.

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
      salutation: "Dear Yogita Paliwal",
      introLine:
        "I came across your hiring post for Full Stack Developers with React and AI integration experience in Bangalore. While I noticed the 5-8 years experience requirement, I wanted to check if Xponentium India has openings for Full Stack Developers with 2 years of production experience delivering modern React frontends, TypeScript, REST APIs, and database engineering.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software development experience engineering interactive React interfaces, integrating secure RESTful APIs, and implementing database persistence with PostgreSQL.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to relocate to Bangalore immediately, and enthusiastic about building scalable enterprise applications.",
    }),
  },

  // 5. Riya Raj - HuQuo (AI Full-Stack / React, Bengaluru) -> Template 3
  {
    email: "riyaraj@huquo.com",
    company: "HuQuo",
    role: "Full Stack Engineer",
    subject: "Full Stack Development Opportunities (Bengaluru) - Murali Krishna Popuri",
    plainBody: `Dear Riya Raj,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full-Stack development roles in Bengaluru. While I saw the senior experience band, I wanted to reach out to check if HuQuo has openings for developers with 2 years of hands-on production experience in React.js, TypeScript, REST APIs, SQL, and cloud integrations.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software development experience engineering modular React interfaces, designing RESTful APIs, and managing database persistence.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for hybrid work in Bengaluru, and ready to get started immediately.

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
      salutation: "Dear Riya Raj",
      introLine:
        "I came across your hiring post for Full-Stack development roles in Bengaluru. While I saw the senior experience band, I wanted to reach out to check if HuQuo has openings for developers with 2 years of hands-on production experience in React.js, TypeScript, REST APIs, SQL, and cloud integrations.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software development experience engineering modular React interfaces, designing RESTful APIs, and managing database persistence.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for hybrid work in Bengaluru, and ready to get started immediately.",
    }),
  },

  // 6. Chandrasekhar P M - Greenbuds Technology (Deloitte Client - React / Full Stack, Bangalore) -> Template 3
  {
    email: "chandrashekharpm@greenbudstechnology.com",
    company: "Greenbuds Technology",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Opportunities (Bangalore) - Murali Krishna Popuri",
    plainBody: `Dear Chandrasekhar P M,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack Developer roles with React and microservices in Bangalore. While I noticed the senior requirement, I wanted to inquire if Greenbuds Technology has openings for Full Stack Developers with 2 years of hands-on production experience in React.js, TypeScript, REST APIs, and database engineering.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing responsive React components, writing RESTful services, and optimizing database queries using SQL.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to relocate to Bangalore immediately, and eager to contribute.

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
      salutation: "Dear Chandrasekhar P M",
      introLine:
        "I came across your hiring post for Full Stack Developer roles with React and microservices in Bangalore. While I noticed the senior requirement, I wanted to inquire if Greenbuds Technology has openings for Full Stack Developers with 2 years of hands-on production experience in React.js, TypeScript, REST APIs, and database engineering.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing responsive React components, writing RESTful services, and optimizing database queries using SQL.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to relocate to Bangalore immediately, and eager to contribute.",
    }),
  },

  // 7. Gowtham Kumar - Greenbuds Technology (SAP Labs / Node.js / Full Stack Bangalore) -> Template 3
  {
    email: "bsgowthamkumar@greenbudstechnology.com",
    company: "Greenbuds Technology",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Opportunities (Bangalore) - Murali Krishna Popuri",
    plainBody: `Dear Gowtham Kumar,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack roles in Bangalore. While I noticed the senior requirement, I wanted to reach out to check if there are opportunities for developers with 2 years of solid production experience in Node.js, JavaScript, TypeScript, REST APIs, and modern frontend frameworks.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular web components, writing scalable Node.js services, and managing database persistence.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to attend face-to-face technical rounds in Bangalore, and ready to get started.

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
      salutation: "Dear Gowtham Kumar",
      introLine:
        "I came across your hiring post for Full Stack roles in Bangalore. While I noticed the senior requirement, I wanted to reach out to check if there are opportunities for developers with 2 years of solid production experience in Node.js, JavaScript, TypeScript, REST APIs, and modern frontend frameworks.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular web components, writing scalable Node.js services, and managing database persistence.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available to attend face-to-face technical rounds in Bangalore, and ready to get started.",
    }),
  },

  // 8. Deepa R - VR Della IT Services (Java/Angular/React Full Stack, Bangalore, Immediate Joiner) -> Template 3
  {
    email: "deepa.r@vrdella.com",
    company: "VR Della IT Services",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Application (Bangalore) - Murali Krishna Popuri",
    plainBody: `Dear Deepa R,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack Developers in Bangalore. While I noted the senior requirement, I wanted to check if VR Della IT Services has openings for Full Stack Developers with 2 years of hands-on production experience in JavaScript, TypeScript, React, REST APIs, and SQL databases.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience building responsive user interfaces, developing backend APIs, and writing efficient SQL queries.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for roles in Bangalore, and ready to contribute immediately.

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
      salutation: "Dear Deepa R",
      introLine:
        "I came across your hiring post for Full Stack Developers in Bangalore. While I noted the senior requirement, I wanted to check if VR Della IT Services has openings for Full Stack Developers with 2 years of hands-on production experience in JavaScript, TypeScript, React, REST APIs, and SQL databases.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience building responsive user interfaces, developing backend APIs, and writing efficient SQL queries.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for roles in Bangalore, and ready to contribute immediately.",
    }),
  },

  // 9. Monica Kandhari - TEKsystems (Full Stack Developer React + APIs, Bangalore) -> Template 3
  {
    email: "mokandhari@teksystems.com",
    company: "TEKsystems",
    role: "Full Stack Developer",
    subject: "Full Stack Developer Opportunities at TEKsystems (Bangalore) - Murali Krishna Popuri",
    plainBody: `Dear Monica Kandhari,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack Developer roles with React and API development in Bangalore. While I noticed the senior requirement, I wanted to reach out to check if TEKsystems has openings for Full Stack Developers with 2 years of production experience in React, TypeScript, REST APIs, and database management.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software engineering experience developing modular React frontend components, designing RESTful APIs, and managing database persistence.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for hybrid work in Bangalore, and ready to get started immediately.

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
      salutation: "Dear Monica Kandhari",
      introLine:
        "I came across your hiring post for Full Stack Developer roles with React and API development in Bangalore. While I noticed the senior requirement, I wanted to reach out to check if TEKsystems has openings for Full Stack Developers with 2 years of production experience in React, TypeScript, REST APIs, and database management.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software engineering experience developing modular React frontend components, designing RESTful APIs, and managing database persistence.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for hybrid work in Bangalore, and ready to get started immediately.",
    }),
  },

  // 10. Rajitharaj Munny - Global Digital Resources (Full Stack Developer MERN Stack, Radwell Bangalore) -> Template 3
  {
    email: "Rajitha@globaldigitalresources.com",
    company: "Global Digital Resources",
    role: "Full Stack Developer",
    subject: "Full Stack MERN Developer Opportunities (Bangalore) - Murali Krishna Popuri",
    plainBody: `Dear Rajitharaj Munny,

I hope you’re doing well.

My name is Murali Krishna Popuri, and I am a Full-Stack Developer with 2 years of professional software engineering experience actively seeking opportunities in Software Development.

I came across your hiring post for Full Stack MERN Developers for your client Radwell International in Bangalore. While I noticed the senior requirement, I wanted to reach out to check if there are openings for Full Stack MERN Developers with 2 years of solid production experience building applications using React, Node.js, Express, and MongoDB.

Here’s a quick overview of my profile:
✓ Professional Experience: 2 years of software development experience engineering end-to-end web applications with React, Node.js, Express, MongoDB, and RESTful APIs.
✓ Current Role & RestoSoft: I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.
✓ Skills & Adaptability: While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.
✓ Availability & Enthusiasm: I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for day one onsite work in Bangalore, and eager to deliver high-quality code.

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
      salutation: "Dear Rajitharaj Munny",
      introLine:
        "I came across your hiring post for Full Stack MERN Developers for your client Radwell International in Bangalore. While I noticed the senior requirement, I wanted to reach out to check if there are openings for Full Stack MERN Developers with 2 years of solid production experience building applications using React, Node.js, Express, and MongoDB.",
      overviewBullet1:
        "<strong>Professional Experience:</strong> 2 years of software development experience engineering end-to-end web applications with React, Node.js, Express, MongoDB, and RESTful APIs.",
      overviewBullet2:
        "<strong>Current Role &amp; RestoSoft:</strong> I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.",
      overviewBullet3:
        "<strong>Skills &amp; Adaptability:</strong> While my core expertise is centered on React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have an exceptionally steep learning curve. In fast-paced production environments, I have consistently ramped up on unfamiliar libraries, cloud tools, and frameworks within a week. I take pride in quickly bridging technical requirements and am confident I will match your team's technical expectations, which I would love to demonstrate in a technical interview.",
      overviewBullet4:
        "<strong>Availability &amp; Enthusiasm:</strong> I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer), available for day one onsite work in Bangalore, and eager to deliver high-quality code.",
    }),
  },
];

async function main() {
  console.log("Starting dispatch of Batch 3 (Sept 25, 2026 - Bangalore Focus)...");
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
