const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const USER_NOTIFICATION_EMAIL = "popurimuralikrishna04@gmail.com";

if (!GMAIL_APP_PASSWORD) {
  console.error("GMAIL_APP_PASSWORD is not set in .env!");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
});

const resumePath = path.join(__dirname, "Murali_Krishna_Popuri_Full_Stack_Dev.pdf");

// 1. Direct HR Applications to send with PDF Resume Attached (Target HRs)
const directHrApplications = [
  {
    company: "Kruthak Technology Private Limited",
    targetEmail: "hrkruthak@kruthaktech.com",
    role: "Senior Full-Stack Developer (React, Next.js, Node.js)",
    subject: "Application for Senior Full-Stack Developer - Murali Krishna Popuri",
    body: `Hi HR Team,

I am writing to express my interest in the Full-Stack Developer position at Kruthak Technology in Bengaluru.

I am a Full-Stack Developer with 2 years of experience building web applications using React.js, Next.js, Node.js, TypeScript, REST APIs, and database systems. In my previous role at YoungMinds Technology Solutions, I built real-time POS platforms, cloud synchronization engines, and background event services using Express and Kafka.

I am available for Bengaluru on-site roles and can join immediately.

My PDF resume is attached for your review. I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi HR Team,</p>
        <p>I am writing to express my interest in the <strong>Full-Stack Developer</strong> position at Kruthak Technology in Bengaluru.</p>
        <p>I am a Full-Stack Developer with 2 years of experience building web applications using <strong>React.js, Next.js, Node.js, TypeScript, REST APIs, and database systems</strong>. At YoungMinds Technology Solutions, I built real-time POS platforms, cloud synchronization engines, and background event services using Express and Kafka.</p>
        <p>I am available for Bengaluru on-site roles and can join immediately.</p>
        <p>My PDF resume is attached for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "GoTechnosys",
    targetEmail: "career@gotechnosys.com",
    role: "Auth0 CIAM & Full Stack Developer (ReactJS, NodeJS)",
    subject: "Application for Full Stack / Auth0 CIAM Developer - Murali Krishna Popuri",
    body: `Hi Recruitment Team,

I am applying for the Full Stack / Auth0 CIAM Developer position in Bengaluru.

I have 2 years of full-stack engineering experience working with React.js, Node.js, JavaScript, TypeScript, REST APIs, and security/auth workflows including JWT, OAuth, and role-based access control.

I am based in South India and available for immediate joining.

Please find my resume attached.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Recruitment Team,</p>
        <p>I am applying for the <strong>Full Stack / Auth0 CIAM Developer</strong> position in Bengaluru.</p>
        <p>I have 2 years of full-stack engineering experience working with <strong>React.js, Node.js, JavaScript, TypeScript, REST APIs</strong>, and security/auth workflows including JWT, OAuth, and role-based access control.</p>
        <p>I am based in South India and available for immediate joining.</p>
        <p>Please find my resume attached for your consideration.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "Wits Innovation Lab",
    targetEmail: "tanuj.lamba@thewitslab.com",
    role: "Full Stack Developer (ReactJS, NodeJS, TypeScript)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Tanuj,

I am writing to express my interest in the Full Stack Developer position at Wits Innovation Lab.

I am a Full-Stack Developer with 2 years of core software engineering experience building responsive interfaces and microservice integration layers with ReactJS, NodeJS, TypeScript, REST APIs, and SQL/NoSQL databases.

I can join immediately as I am currently serving my notice period.

My resume PDF is attached. I look forward to connecting.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Tanuj,</p>
        <p>I am writing to express my interest in the <strong>Full Stack Developer</strong> position at Wits Innovation Lab.</p>
        <p>I am a Full-Stack Developer with 2 years of core software engineering experience building responsive interfaces and microservice integration layers with <strong>ReactJS, NodeJS, TypeScript, REST APIs, and SQL/NoSQL databases</strong>.</p>
        <p>I can join immediately as I am currently serving my notice period.</p>
        <p>My resume PDF is attached for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "eMexo Technologies",
    targetEmail: "info@emexotechnologies.com",
    role: "Software Engineer (React, Node.js, Full Stack)",
    subject: "Application for Software Engineer - Murali Krishna Popuri",
    body: `Hi Recruitment Team,

I am applying for the Software Engineer role at eMexo Technologies in Electronic City, Bengaluru.

I bring 2 years of hands-on software development experience building production applications with JavaScript, React.js, Node.js, Express, REST APIs, SQL/NoSQL, and Git. In addition, I work with modern AI-assisted workflows (Claude, Cursor, GitHub Copilot) to accelerate delivery.

I am located in/available for Bengaluru and can join immediately.

Please find my attached resume PDF.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Recruitment Team,</p>
        <p>I am applying for the <strong>Software Engineer</strong> role at eMexo Technologies in Electronic City, Bengaluru.</p>
        <p>I bring 2 years of hands-on software development experience building production applications with <strong>JavaScript, React.js, Node.js, Express, REST APIs, SQL/NoSQL, and Git</strong>. In addition, I work with modern AI-assisted workflows (Claude, Cursor, GitHub Copilot) to accelerate delivery.</p>
        <p>I am located in/available for Bengaluru and can join immediately.</p>
        <p>Please find my attached resume PDF for review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "Bolo India",
    targetEmail: "yogitha@boloindia.com",
    role: "Full Stack Developer (React, Node.js)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Yogitha,

I am writing to submit my application for the Full Stack Developer position at Bolo India in Bengaluru.

I am a Full-Stack Engineer with experience building scalable applications using React, JavaScript, TypeScript, Node.js, Express, REST APIs, and database systems (PostgreSQL, MongoDB). I am an immediate joiner serving my notice period.

My resume PDF is attached to this email.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Yogitha,</p>
        <p>I am writing to submit my application for the <strong>Full Stack Developer</strong> position at Bolo India in Bengaluru.</p>
        <p>I am a Full-Stack Engineer with experience building scalable applications using <strong>React, JavaScript, TypeScript, Node.js, Express, REST APIs, and database systems (PostgreSQL, MongoDB)</strong>. I am an immediate joiner serving my notice period.</p>
        <p>My resume PDF is attached to this email.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "DKU Technologies",
    targetEmail: "surya@dkutechnologies.in",
    role: "App Developer / Full Stack Developer (React / Node)",
    subject: "Application for React / Node Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Surya,

I am writing to apply for the App Developer (React / Node) and Full Stack Developer opportunities in Bengaluru / Hyderabad.

I bring 2 years of hands-on experience building web applications using React.js, Node.js, Express, JavaScript, TypeScript, and SQL/NoSQL databases.

I am based in Hyderabad/available for Bengaluru and ready to join immediately.

Please find my resume PDF attached.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Surya,</p>
        <p>I am writing to apply for the <strong>App Developer (React / Node) and Full Stack Developer</strong> opportunities in Bengaluru / Hyderabad.</p>
        <p>I bring 2 years of hands-on experience building web applications using <strong>React.js, Node.js, Express, JavaScript, TypeScript, and SQL/NoSQL databases</strong>.</p>
        <p>I am based in Hyderabad/available for Bengaluru and ready to join immediately.</p>
        <p>Please find my resume PDF attached.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "Luxmorai Technologies",
    targetEmail: "lathikaadhira7824@gmail.com",
    role: "Full Stack Developer (React / Node)",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Lathika,

I am writing to submit my application for the Full Stack Developer position at Luxmorai Technologies in Bengaluru / Chennai.

I am a Full-Stack Developer with 2 years of experience working with React.js, Node.js, JavaScript, HTML/CSS, SQL, and REST APIs. I also utilize AI tools (Claude, Cursor, GitHub Copilot) to enhance application delivery.

I am available for an immediate start as I am serving my notice period.

My resume PDF is attached to this email.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Lathika,</p>
        <p>I am writing to submit my application for the <strong>Full Stack Developer</strong> position at Luxmorai Technologies in Bengaluru / Chennai.</p>
        <p>I am a Full-Stack Developer with 2 years of experience working with <strong>React.js, Node.js, JavaScript, HTML/CSS, SQL, and REST APIs</strong>. I also utilize AI tools (Claude, Cursor, GitHub Copilot) to enhance application delivery.</p>
        <p>I am available for an immediate start as I am serving my notice period.</p>
        <p>My resume PDF is attached to this email.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  },
  {
    company: "Cortex Consultants",
    targetEmail: "lavanya.m@cortexconsultants.com",
    role: "AWS Connect + Claude AI Developer / Full Stack Developer",
    subject: "Application for Full Stack & AI Developer - Murali Krishna Popuri",
    body: `Hi Lavanya,

I am writing to apply for the Full Stack & AI Developer opportunity (Bengaluru / Hyderabad / Remote).

I bring 2 years of experience developing full-stack web applications with Node.js, Python, React, REST APIs, SQL, and integrating AI / LLM APIs (Claude AI, RAG concepts, vector search workflows).

I am available immediately and can join on short notice.

My resume PDF is attached for your review.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Lavanya,</p>
        <p>I am writing to apply for the <strong>Full Stack & AI Developer</strong> opportunity (Bengaluru / Hyderabad / Remote).</p>
        <p>I bring 2 years of experience developing full-stack web applications with <strong>Node.js, Python, React, REST APIs, SQL</strong>, and integrating AI / LLM APIs (Claude AI, RAG concepts, vector search workflows).</p>
        <p>I am available immediately and can join on short notice.</p>
        <p>My resume PDF is attached for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a><br/>
        GitHub: <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a><br/>
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></p>
      </div>
    `
  }
];

// 2. Portal Application Links & WhatsApp Messages to email to popurimuralikrishna04@gmail.com
const portalLinksContent = `
<h2>🚀 NEW JOB PORTAL APPLY LINKS & WHATSAPP HR CONTACTS SUMMARY</h2>
<p>Below are the parsed career portal application links and ready-to-copy WhatsApp recruiter messages from the latest LinkedIn feed.</p>

<hr/>

<h3>🌐 CAREER PORTAL & FORM APPLY LINKS</h3>

<ol>
  <li>
    <strong>QuickHire — Full Stack Developer (Freshers/0 Yrs - React/Node/TS)</strong><br/>
    📍 Bengaluru | On-site<br/>
    🔗 Apply Link: <a href="https://lnkd.in/djCwu7db">https://lnkd.in/djCwu7db</a><br/>
    🌐 More Jobs: <a href="https://quickhire.me/">https://quickhire.me/</a>
  </li>
  <br/>
  <li>
    <strong>Zamstars — Frontend Developer (Angular/Node/WordPress)</strong><br/>
    📍 Greater Bengaluru Area | On-site<br/>
    🔗 Apply Link: <a href="https://lnkd.in/dqpBHPQU">https://lnkd.in/dqpBHPQU</a>
  </li>
  <br/>
  <li>
    <strong>Meuwic Technologies — Full Stack Developer (MERN Stack)</strong><br/>
    📍 Bengaluru | 2-4 Yrs<br/>
    🔗 Apply Link: <a href="https://lnkd.in/dAPh-JG2">https://lnkd.in/dAPh-JG2</a>
  </li>
  <br/>
  <li>
    <strong>PERN + AWS Full Stack Developer (Node/React/PostgreSQL)</strong><br/>
    📍 Bengaluru | On-site<br/>
    🔗 Apply Link: <a href="https://lnkd.in/gEFeuQHf">https://lnkd.in/gEFeuQHf</a>
  </li>
  <br/>
  <li>
    <strong>DigitalXNode — Full Stack Developer (Node.js & Next.js)</strong><br/>
    📍 Bengaluru / Remote / Pan India<br/>
    🔗 Apply Link: <a href="https://lnkd.in/gFJNciHC">https://lnkd.in/gFJNciHC</a>
  </li>
  <br/>
  <li>
    <strong>FanCode — Software Engineer Intern (Backend / Node / Java)</strong><br/>
    📍 Remote / Mumbai<br/>
    🔗 Apply Link: <a href="https://lnkd.in/gNfrjgQ4">https://lnkd.in/gNfrjgQ4</a>
  </li>
  <br/>
  <li>
    <strong>Infosys — AWS Developer (Node.js / MongoDB / AWS)</strong><br/>
    📍 Bengaluru East<br/>
    🔗 Apply Link: <a href="https://lnkd.in/dFxUYpm6">https://lnkd.in/dFxUYpm6</a>
  </li>
  <br/>
  <li>
    <strong>Allyted — Vercel DevOps / Next.js / Node.js Engineer</strong><br/>
    📍 Bengaluru | WFO<br/>
    🔗 Application Form: <a href="https://forms.gle/qgJgsUK5YfavX3Q19">https://forms.gle/qgJgsUK5YfavX3Q19</a>
  </li>
  <br/>
  <li>
    <strong>Okta / Auth0 — Senior Software Engineer (Dev Tools / JS / TS / Node)</strong><br/>
    📍 Bengaluru<br/>
    🔗 Apply Link: <a href="https://lnkd.in/guzQm2Bd">https://lnkd.in/guzQm2Bd</a>
  </li>
  <br/>
  <li>
    <strong>bolt — Full Stack Engineer (React / Angular / C#)</strong><br/>
    📍 Greater Bengaluru Area<br/>
    🔗 Easy Apply Link: <a href="https://lnkd.in/d9XRUYDD">https://lnkd.in/d9XRUYDD</a>
  </li>
</ol>

<hr/>

<h3>📱 HR WHATSAPP CONTACTS & READY-TO-COPY MESSAGES</h3>

<div style="background-color: #f4f6f8; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
  <h4>1. eMexo Technologies (Software Engineer - React/Node/Full Stack)</h4>
  <p><strong>Phone / WhatsApp:</strong> +91 9513216462</p>
  <p><strong>Copy-Paste Message:</strong></p>
  <pre style="background: #fff; padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">Hi, I am Murali Krishna Popuri, a Full-Stack Developer with 2 years of experience building applications using React.js, Node.js, Express, REST APIs, and SQL/NoSQL databases. I am interested in the Software Engineer position at eMexo Technologies in Bengaluru. I am an immediate joiner currently serving my notice period. My portfolio is https://murali-portfolio-website.vercel.app and my resume is available for review. Thank you!</pre>
</div>

<div style="background-color: #f4f6f8; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
  <h4>2. Jay Kulkarni IT Openings (Node.js & Full Stack Roles)</h4>
  <p><strong>Phone / WhatsApp:</strong> +91 73851 22872</p>
  <p><strong>Copy-Paste Message:</strong></p>
  <pre style="background: #fff; padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">Hi, I am Murali Krishna Popuri, a Full-Stack Developer with 2 years of experience in React.js, Node.js, Express, TypeScript, and SQL/MongoDB. I am looking for Full Stack / Node.js / React developer roles in Bengaluru or Hyderabad. I can join immediately as I am serving my notice period. My portfolio link is https://murali-portfolio-website.vercel.app. Please let me know if there are suitable openings.</pre>
</div>

<div style="background-color: #f4f6f8; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
  <h4>3. Kutakula Harshitha - MSPC Services (SAP BTP / Node.js)</h4>
  <p><strong>Phone / WhatsApp:</strong> +91 9676208555</p>
  <p><strong>Copy-Paste Message:</strong></p>
  <pre style="background: #fff; padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">Hi Harshitha, I am Murali Krishna Popuri, a Full Stack Developer specializing in Node.js, React.js, JavaScript, and REST APIs with 2 years of experience. I am interested in developer opportunities in Bengaluru and can join immediately. Portfolio: https://murali-portfolio-website.vercel.app. Thank you!</pre>
</div>

<div style="background-color: #f4f6f8; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
  <h4>4. DKU Technologies - Surya (App Developer - React / Node)</h4>
  <p><strong>Phone / WhatsApp:</strong> +91 9057882797</p>
  <p><strong>Copy-Paste Message:</strong></p>
  <pre style="background: #fff; padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">Hi Surya, I am Murali Krishna Popuri, applying for the React / Node App Developer and Full Stack Developer roles in Bengaluru / Hyderabad. I have 2 years of software development experience with React.js, Node.js, Express, and databases. I am serving my notice period and available for immediate joining. Portfolio: https://murali-portfolio-website.vercel.app. Thank you!</pre>
</div>

<div style="background-color: #f4f6f8; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
  <h4>5. STACKLY Hiring (Full Stack / MERN / React / Node)</h4>
  <p><strong>Phone / WhatsApp:</strong> +91 9392386513</p>
  <p><strong>Copy-Paste Message:</strong></p>
  <pre style="background: #fff; padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">Hi, I am Murali Krishna Popuri, a Full Stack MERN Developer with 2 years of experience in React.js, Node.js, Express, TypeScript, and SQL/MongoDB. I am interested in Software Development / Full Stack positions in Hyderabad or Bengaluru and am available to join immediately. Portfolio: https://murali-portfolio-website.vercel.app. Thank you!</pre>
</div>
`;

async function run() {
  console.log(`=== Step 1: Dispatching ${directHrApplications.length} Direct Target HR Email Applications ===`);

  for (let i = 0; i < directHrApplications.length; i++) {
    const app = directHrApplications[i];
    console.log(`\n[${i + 1}/${directHrApplications.length}] Sending to ${app.company} (${app.targetEmail})...`);

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: app.targetEmail,
      subject: app.subject,
      text: app.body,
      html: app.html,
      attachments: [
        {
          filename: "Murali_Krishna_Popuri_Full_Stack_Dev.pdf",
          path: resumePath
        }
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Sent successfully to target HR: ${app.targetEmail}! MessageId: ${info.messageId}`);
    } catch (err) {
      console.error(`Failed to send email to ${app.targetEmail}:`, err.message);
    }
  }

  console.log(`\n=== Step 2: Sending Portal Links & WhatsApp Summary to ${USER_NOTIFICATION_EMAIL} ===`);

  const summaryMailOptions = {
    from: `"Auto Job Mailer System" <${SENDER_EMAIL}>`,
    to: USER_NOTIFICATION_EMAIL,
    subject: "Curated Job Portal Links & WhatsApp HR Contacts (Sept 3, 2026)",
    html: portalLinksContent,
  };

  try {
    const info = await transporter.sendMail(summaryMailOptions);
    console.log(`Successfully sent Portal Links & WhatsApp summary email to ${USER_NOTIFICATION_EMAIL}! MessageId: ${info.messageId}`);
  } catch (err) {
    console.error(`Failed to send summary email to ${USER_NOTIFICATION_EMAIL}:`, err.message);
  }

  console.log(`\nAll tasks completed successfully!`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
