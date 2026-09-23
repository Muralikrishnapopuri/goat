const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RESUME_PATH = "/home/murali-krishna/cluad/goat/automatic_mailer/Murali_Krishna_Popuri_FullStack_Developer.pdf";
const HISTORY_FILE = path.join(__dirname, "sent_history.json");

if (!GMAIL_APP_PASSWORD) {
  console.error("ERROR: GMAIL_APP_PASSWORD is not set in .env!");
  process.exit(1);
}

if (!fs.existsSync(RESUME_PATH)) {
  console.error("ERROR: Resume PDF not found at:", RESUME_PATH);
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

function loadHistory() {
  if (!fs.existsSync(HISTORY_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
  } catch (err) {
    return [];
  }
}

function isAlreadySent(email, history) {
  const norm = email.toLowerCase().trim();
  return history.some((h) => h.recipientEmail === norm && h.status === "SENT");
}

function recordSent(email, company, role, messageId) {
  const history = loadHistory();
  history.push({
    timestamp: new Date().toISOString(),
    recipientEmail: email.toLowerCase().trim(),
    company,
    role,
    status: "SENT",
    messageId,
    resumeAttachment: path.basename(RESUME_PATH),
  });
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
  console.log(`Recorded to sent history (${HISTORY_FILE})`);
}

// 26 Tailored Leads from LinkedIn feed post dump
const leads = [
  {
    company: "Mordor Intelligence",
    recruiterName: "Jan Basha Shaik",
    email: "jan.basha@mordorintelligence.com",
    role: "Full Stack Developer (Forward-Deployed + AI-Native)",
    location: "Hyderabad (Remote)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Jan Basha,

I saw your post on LinkedIn regarding the Full Stack Developer opening (Forward-Deployed + AI-Native) at Mordor Intelligence, and I would like to submit my application.

I have 2 years of professional software development experience building production web platforms with React.js, Next.js, Node.js, Express.js, MongoDB, and REST APIs. I actively use AI-assisted engineering workflows (Claude Code, GitHub Copilot) in my daily development to write clean, modular code, build APIs, and ship production features efficiently.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available for remote work or immediate relocation to Hyderabad.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Jan Basha,</p>

  <p>I saw your post on LinkedIn regarding the <strong>Full Stack Developer opening (Forward-Deployed + AI-Native)</strong> at Mordor Intelligence, and I would like to submit my application.</p>

  <p>I have 2 years of professional software development experience building production web platforms with <strong>React.js, Next.js, Node.js, Express.js, MongoDB, and REST APIs</strong>. I actively use AI-assisted engineering workflows (Claude Code, GitHub Copilot) in my daily development to write clean, modular code, build APIs, and ship production features efficiently.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available for remote work or immediate relocation to Hyderabad.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "CIS Technologies Inc",
    recruiterName: "Smily Kante",
    email: "Smily@cis-tec.com",
    role: "Full Stack Developer",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Smily,

I saw your hiring post on LinkedIn for the Full Stack Developer position at CIS Technologies Inc in Hyderabad, and I would like to express my strong interest in joining your team.

I have 2 years of professional full-stack development experience building responsive, scalable applications with React.js, Node.js, Express, JavaScript (ES6+), TypeScript, Git, and REST APIs. I enjoy fast-paced environments where I can take ownership of features, solve technical challenges, and leverage modern development and AI tools to deliver robust products.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am currently based in Vijayawada, Andhra Pradesh, and ready to relocate immediately to Hyderabad for day-shift onsite work. I am serving my notice period with an official Last Working Day of Nov 11, negotiable for immediate release upon offer.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Smily,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Full Stack Developer</strong> position at CIS Technologies Inc in Hyderabad, and I would like to express my strong interest in joining your team.</p>

  <p>I have 2 years of professional full-stack development experience building responsive, scalable applications with <strong>React.js, Node.js, Express, JavaScript (ES6+), TypeScript, Git, and REST APIs</strong>. I enjoy fast-paced environments where I can take ownership of features, solve technical challenges, and leverage modern development and AI tools to deliver robust products.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am currently based in Vijayawada, Andhra Pradesh, and ready to relocate immediately to Hyderabad for day-shift onsite work. I am serving my notice period with an official Last Working Day of Nov 11, negotiable for immediate release upon offer.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to hearing from you.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "GA Talent Hunt Pvt Ltd",
    recruiterName: "T. Uma",
    email: "thipparaveniuma@gmail.com",
    role: "Web Developer",
    location: "Hyderabad",
    subject: "Application for Web Developer – Murali Krishna Popuri",
    plainBody: `Hi Uma,

I saw your hiring post on LinkedIn for the Web Developer opening at GA Talent Hunt Pvt Ltd in Hyderabad, and I would like to submit my application.

I have 2 years of professional experience in web and software development, working extensively with HTML5, CSS3, JavaScript (ES6+), React.js, Node.js, REST APIs, Git/GitHub, and database systems. I specialize in building responsive, user-friendly frontend interfaces and integrating them with scalable backend services.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am currently located in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite or hybrid opportunities. My official notice period Last Working Day is Nov 11, but I can be relieved early to join immediately upon offer.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to discussing how I can contribute to your team.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Uma,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Web Developer</strong> opening at GA Talent Hunt Pvt Ltd in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional experience in web and software development, working extensively with <strong>HTML5, CSS3, JavaScript (ES6+), React.js, Node.js, REST APIs, Git/GitHub, and database systems</strong>. I specialize in building responsive, user-friendly frontend interfaces and integrating them with scalable backend services.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am currently located in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite or hybrid opportunities. My official notice period Last Working Day is Nov 11, but I can be relieved early to join immediately upon offer.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to discussing how I can contribute to your team.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Fhem Global",
    recruiterName: "Mohammed Faique Aziz",
    email: "aziz@fhemglobal.com",
    role: "Full-Stack Developer",
    location: "Shaikpet, Hyderabad",
    subject: "Full-Stack Developer Intern / Junior – Hyderabad – Murali Krishna Popuri",
    plainBody: `Hi Mohammed,

I saw your hiring post on LinkedIn regarding the Full-Stack Developer position at Fhem Global in Shaikpet, Hyderabad, and I would love to be considered.

I have 2 years of hands-on experience building production SaaS platforms and web applications using React.js, Next.js, JavaScript, TypeScript, Node.js, Express.js, PostgreSQL/MongoDB, and REST APIs. I take pride in writing scalable code, designing clean API contracts, and solving core product challenges.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad (including Shaikpet) for onsite work. I am serving my notice period with an official Last Working Day of Nov 11, negotiable for immediate release upon offer.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Mohammed,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full-Stack Developer</strong> position at Fhem Global in Shaikpet, Hyderabad, and I would love to be considered.</p>

  <p>I have 2 years of hands-on experience building production SaaS platforms and web applications using <strong>React.js, Next.js, JavaScript, TypeScript, Node.js, Express.js, PostgreSQL/MongoDB, and REST APIs</strong>. I take pride in writing scalable code, designing clean API contracts, and solving core product challenges.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad (including Shaikpet) for onsite work. I am serving my notice period with an official Last Working Day of Nov 11, negotiable for immediate release upon offer.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Incedo Inc",
    recruiterName: "Anmol Bhatia",
    email: "anmol.bhatia@incedoinc.com",
    role: "Full Stack Developer (Node.js + React + PostgreSQL)",
    location: "Hyderabad / Gurgaon",
    subject: "Application for Full Stack Developer (Node.js + React) – Murali Krishna Popuri",
    plainBody: `Hi Anmol,

I saw your post on LinkedIn regarding the Full Stack Developer (Node.js + React + PostgreSQL) opening at Incedo Inc in Hyderabad/Gurgaon, and I would like to submit my application.

I have 2 years of professional software development experience focusing heavily on Node.js backend development, RESTful API architecture, React.js frontend interfaces, and relational/NoSQL databases.

While my primary core stack is centered on React.js, Node.js, Express, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Gurgaon.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to discussing the role.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Anmol,</p>

  <p>I saw your post on LinkedIn regarding the <strong>Full Stack Developer (Node.js + React + PostgreSQL)</strong> opening at Incedo Inc in Hyderabad/Gurgaon, and I would like to submit my application.</p>

  <p>I have 2 years of professional software development experience focusing heavily on <strong>Node.js backend development, RESTful API architecture, React.js frontend interfaces, and relational/NoSQL databases</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, Express, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Gurgaon.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to discussing the role.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Programming.com",
    recruiterName: "Armaan Singh",
    email: "armaan.singh@programming.com",
    role: "Full Stack Developer (Node.js & React.js)",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Armaan,

I saw your hiring post on LinkedIn for the Full Stack Developer position at Programming.com in Hyderabad, and I would like to apply.

I have 2 years of professional software engineering experience building scalable full-stack applications with Node.js, React.js, Express, TypeScript, and modern APIs.

While my primary core stack is centered on Node.js and React.js, I have a fast learning curve and when collaborating with engineering teams I pick up new cloud tools, AWS Lambda, DynamoDB, and infrastructure services within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am comfortable with shifts and available to relocate immediately to Hyderabad. I am serving my notice period with an official Last Working Day of Nov 11, negotiable for immediate release upon offer.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Armaan,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Full Stack Developer</strong> position at Programming.com in Hyderabad, and I would like to apply.</p>

  <p>I have 2 years of professional software engineering experience building scalable full-stack applications with <strong>Node.js, React.js, Express, TypeScript, and modern APIs</strong>.</p>

  <p>While my primary core stack is centered on Node.js and React.js, I have a fast learning curve and when collaborating with engineering teams I pick up new cloud tools, AWS Lambda, DynamoDB, and infrastructure services within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am comfortable with shifts and available to relocate immediately to Hyderabad. I am serving my notice period with an official Last Working Day of Nov 11, negotiable for immediate release upon offer.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to hearing from you.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "DPR Solutions Inc",
    recruiterName: "Savitha Komaravalli",
    email: "Savitha@dprsolutionsinc.com",
    role: "MERN Stack Developer",
    location: "Hyderabad",
    subject: "Application for MERN Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Savitha,

I saw your hiring post on LinkedIn for the MERN Stack Developer position at DPR Solutions Inc in Hyderabad, and I would like to submit my application.

I have 2 years of professional software development experience with React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), TypeScript, and REST APIs.

While my primary core stack is centered on React.js and Node.js full-stack development, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid or onsite work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Savitha,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>MERN Stack Developer</strong> position at DPR Solutions Inc in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software development experience with <strong>React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), TypeScript, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js and Node.js full-stack development, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid or onsite work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "CoreTek",
    recruiterName: "Kalyani Burla",
    email: "kalyani@coretek.io",
    role: "Full Stack Developer – GenAI / AI",
    location: "Bengaluru / Hyderabad",
    subject: "Application for Full Stack Developer – GenAI / AI – Murali Krishna Popuri",
    plainBody: `Hi Kalyani,

I saw your hiring post on LinkedIn regarding the Full Stack Developer – GenAI / AI opportunity at CoreTek, and I would like to submit my application.

I have 2 years of professional software engineering experience with React.js, Node.js, Express.js, TypeScript, REST APIs, SQL/NoSQL databases, and integrating AI workflows.

While my primary core stack is centered on React.js, Node.js, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bengaluru.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Kalyani,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer – GenAI / AI</strong> opportunity at CoreTek, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience with <strong>React.js, Node.js, Express.js, TypeScript, REST APIs, SQL/NoSQL databases, and integrating AI workflows</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bengaluru.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to hearing from you.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "MLOps Solutions",
    recruiterName: "Tammana Chandu Bharadhwaja",
    email: "chandu.t@mlopssol.com",
    role: "Full Stack Developer",
    location: "Hyderabad / Bangalore",
    subject: "Application: Full Stack Python Developer – Murali Krishna Popuri",
    plainBody: `Hi Chandu,

I saw your hiring post on LinkedIn regarding the Full Stack Developer role at MLOps Solutions in Hyderabad / Bangalore, and I would like to put forward my application.

I have 2 years of professional full-stack development experience building end-to-end applications across frontend, backend, APIs, databases, and deployment pipelines using React, Next.js, Node.js, Express, TypeScript, and SQL/MongoDB databases.

While my primary core stack is centered on React, Next.js, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release within 7-15 days). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for hybrid work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Chandu,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer</strong> role at MLOps Solutions in Hyderabad / Bangalore, and I would like to put forward my application.</p>

  <p>I have 2 years of professional full-stack development experience building end-to-end applications across frontend, backend, APIs, databases, and deployment pipelines using <strong>React, Next.js, Node.js, Express, TypeScript, and SQL/MongoDB databases</strong>.</p>

  <p>While my primary core stack is centered on React, Next.js, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release within 7-15 days). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for hybrid work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "PETADATA / SFTECH",
    recruiterName: "Pavan Majeti",
    email: "pavanm@petadata.ai",
    role: "Full Stack Developer – AI & Data Integrations",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – AI & Data Integrations – Murali Krishna Popuri",
    plainBody: `Hi Pavan,

I saw your hiring post on LinkedIn for the Full Stack Developer – AI & Data Integrations opening at PETADATA in Hyderabad, and I would like to submit my application.

I have 2 years of professional software engineering experience developing full-stack web applications, REST/GraphQL APIs, and data integrations with TypeScript, React, Next.js, Node.js, Express, and databases. I am well versed with modern AI-assisted development tools (Claude Code, Cursor, GitHub Copilot) to accelerate delivery and ensure high software quality.

While my primary core stack is centered on React.js, Next.js, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am based in Vijayawada, Andhra Pradesh, comfortable with night shifts (USA time zones), and available to relocate immediately to Hyderabad for onsite interviews and work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Pavan,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Full Stack Developer – AI & Data Integrations</strong> opening at PETADATA in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience developing full-stack web applications, REST/GraphQL APIs, and data integrations with <strong>TypeScript, React, Next.js, Node.js, Express, and databases</strong>. I am well versed with modern AI-assisted development tools (Claude Code, Cursor, GitHub Copilot) to accelerate delivery and ensure high software quality.</p>

  <p>While my primary core stack is centered on React.js, Next.js, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am based in Vijayawada, Andhra Pradesh, comfortable with night shifts (USA time zones), and available to relocate immediately to Hyderabad for onsite interviews and work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Worknexa Infotech",
    recruiterName: "Hiring Team",
    email: "info@worknexainf.com",
    role: "Senior GenAI / Node.js & TypeScript Developer",
    location: "Hyderabad",
    subject: "Application for Senior GenAI Developer – Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I saw your hiring post on LinkedIn for the Senior GenAI Developer role at Worknexa Infotech in Hyderabad, and I would like to submit my application.

I have 2 years of professional experience building scalable backend services and web applications with Node.js, TypeScript, Express, REST APIs, and database architectures, along with integrating modern AI developer tools and workflows.

While my primary core stack is centered on Node.js, TypeScript, React, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid (3 days WFO) work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Hiring Team,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Senior GenAI Developer</strong> role at Worknexa Infotech in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional experience building scalable backend services and web applications with <strong>Node.js, TypeScript, Express, REST APIs, and database architectures</strong>, along with integrating modern AI developer tools and workflows.</p>

  <p>While my primary core stack is centered on Node.js, TypeScript, React, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid (3 days WFO) work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Martinette Technologies",
    recruiterName: "Anusha Akula",
    email: "anusha.a@martinettechnologies.com",
    role: "Full Stack Developer",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Anusha,

I saw your hiring post on LinkedIn regarding the Full Stack Developer position at Martinette Technologies in Hyderabad, and I would like to submit my application.

I have 2 years of professional software engineering experience developing full-stack web applications, REST APIs, and microservices with React.js, Next.js, Node.js, Express, JavaScript (ES6+), TypeScript, SQL, and Git/CI-CD workflows.

While my primary core stack is centered on React.js, Node.js, Next.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid (3 days WFO) work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Anusha,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer</strong> position at Martinette Technologies in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience developing full-stack web applications, REST APIs, and microservices with <strong>React.js, Next.js, Node.js, Express, JavaScript (ES6+), TypeScript, SQL, and Git/CI-CD workflows</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, Next.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid (3 days WFO) work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Martinette Technologies",
    recruiterName: "Beemari Rishitha siddi",
    email: "rishitha.b@martinettechnologies.com",
    role: "Full Stack Developer",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Rishitha,

I saw your hiring post on LinkedIn regarding the Full Stack Developer position at Martinette Technologies in Hyderabad, and I would like to submit my application.

I have 2 years of professional software development experience building scalable web applications with React.js, Next.js, Node.js, Express, JavaScript, TypeScript, SQL, and REST APIs.

While my primary core stack is centered on React.js, Next.js, Node.js, and modern TypeScript architectures, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid (3 days WFO) work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Rishitha,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer</strong> position at Martinette Technologies in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software development experience building scalable web applications with <strong>React.js, Next.js, Node.js, Express, JavaScript, TypeScript, SQL, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js, Next.js, Node.js, and modern TypeScript architectures, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid (3 days WFO) work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Martinette Technologies",
    recruiterName: "Shireesha Balla",
    email: "shireesha.b@martinettechnologies.com",
    role: "Full Stack Developer",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Shireesha,

I saw your hiring post on LinkedIn regarding the Full Stack Developer position at Martinette Technologies in Hyderabad, and I would like to submit my application.

I have 2 years of professional software engineering experience developing full-stack web applications, REST APIs, and microservices with React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and SQL.

While my primary core stack is centered on React.js, Node.js, Next.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid (3 days WFO) work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Shireesha,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer</strong> position at Martinette Technologies in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience developing full-stack web applications, REST APIs, and microservices with <strong>React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and SQL</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, Next.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid (3 days WFO) work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Clevanoo LLC (IBM Project)",
    recruiterName: "Muhammed Sahil",
    email: "sahil.m@clevanoollc.com",
    role: "Application Developer - Frontend / Full Stack",
    location: "Hyderabad / Bangalore",
    subject: "Application for Application Developer (React / Node.js) – Murali Krishna Popuri",
    plainBody: `Hi Muhammed,

I saw your hiring post on LinkedIn regarding the Application Developer opening for the IBM Project in Hyderabad/Bangalore, and I would like to submit my application.

I have 2 years of professional software development experience working extensively with React.js, Redux, Node.js, JavaScript (ES6+), TypeScript, and unit testing frameworks.

While my primary core stack is centered on React.js, Redux, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release within 7 days). I am based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Muhammed,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Application Developer opening for the IBM Project</strong> in Hyderabad/Bangalore, and I would like to submit my application.</p>

  <p>I have 2 years of professional software development experience working extensively with <strong>React.js, Redux, Node.js, JavaScript (ES6+), TypeScript, and unit testing frameworks</strong>.</p>

  <p>While my primary core stack is centered on React.js, Redux, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release within 7 days). I am based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Million Minds",
    recruiterName: "Shiva Krishna",
    email: "krishnashiva18millionminds@gmail.com",
    role: "Full Stack Developer",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Shiva Krishna,

I saw your hiring post on LinkedIn for the Full Stack Developer role in Hyderabad, and I would like to submit my application.

I have 2 years of professional software engineering experience building responsive applications, microservices, REST APIs, and database integrations with Node.js, React, TypeScript, and modern backend architectures.

While my primary core stack is centered on React, Node.js, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new cloud tools, Docker, and infrastructure environments within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Shiva Krishna,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Full Stack Developer</strong> role in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience building responsive applications, microservices, REST APIs, and database integrations with <strong>Node.js, React, TypeScript, and modern backend architectures</strong>.</p>

  <p>While my primary core stack is centered on React, Node.js, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new cloud tools, Docker, and infrastructure environments within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "MNR Solutions Pvt. Ltd.",
    recruiterName: "Dhanuja Nayak",
    email: "dhanuja@mnrsolutions.co.in",
    role: "Custom Software Engineer / Node.js Developer",
    location: "Hyderabad / Bangalore",
    subject: "Application for Custom Software Engineer (Node.js) – Murali Krishna Popuri",
    plainBody: `Hi Dhanuja,

I saw your hiring post on LinkedIn for the Custom Software Engineer / Application Developer opening at MNR Solutions in Hyderabad/Bangalore, and I would like to submit my application.

I have 2 years of professional experience in full-stack web and backend engineering, developing robust services, APIs, and business logic with Node.js, Express, JavaScript, and database systems.

While my primary core stack is centered on Node.js, React.js, Express, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, enterprise platforms, and libraries within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Dhanuja,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Custom Software Engineer / Application Developer</strong> opening at MNR Solutions in Hyderabad/Bangalore, and I would like to submit my application.</p>

  <p>I have 2 years of professional experience in full-stack web and backend engineering, developing robust services, APIs, and business logic with <strong>Node.js, Express, JavaScript, and database systems</strong>.</p>

  <p>While my primary core stack is centered on Node.js, React.js, Express, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, enterprise platforms, and libraries within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to hearing from you.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "AB2 Consulting",
    recruiterName: "Rama Anbalagan",
    email: "arama@ab2consulting.com",
    role: "Backend Developer (Node.js & Microservices)",
    location: "Hyderabad",
    subject: "Application for Backend Developer (Node.js / Microservices) – Murali Krishna Popuri",
    plainBody: `Hi Rama,

I saw your hiring post on LinkedIn regarding the Backend Developer opening in Hyderabad, and I would like to submit my application.

I have 2 years of professional software engineering experience designing scalable backend architectures, high-performance REST APIs, and microservices with Node.js, Express, JavaScript, and TypeScript.

While my primary core stack is centered on Node.js, Express, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Rama,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Backend Developer</strong> opening in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience designing scalable backend architectures, high-performance REST APIs, and microservices with <strong>Node.js, Express, JavaScript, and TypeScript</strong>.</p>

  <p>While my primary core stack is centered on Node.js, Express, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Radiant Digital Solutions",
    recruiterName: "Sairam Nalajala",
    email: "sairam.nalajala@radiant.digital",
    role: "Full Stack Developer (React & Node.js)",
    location: "Hyderabad & Bangalore",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Sairam,

I saw your hiring post on LinkedIn for the Full Stack Developer role in Hyderabad & Bangalore, and I would like to submit my application.

I have 2 years of professional software engineering experience building responsive frontend interfaces with React.js and high-performance backend microservices with Node.js, Express, REST APIs, and databases.

While my primary core stack is centered on React.js, Node.js, Express, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for hybrid/onsite work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Sairam,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Full Stack Developer</strong> role in Hyderabad & Bangalore, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience building responsive frontend interfaces with <strong>React.js and high-performance backend microservices with Node.js, Express, REST APIs, and databases</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, Express, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for hybrid/onsite work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Radiant Digital",
    recruiterName: "Vijaya Lakshmi Inakollu",
    email: "vijayalakshmi.inakollu@radiant.digital",
    role: "Full Stack Developer (React & Node.js)",
    location: "Hyderabad / Bangalore",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Vijaya Lakshmi,

I saw your hiring post on LinkedIn regarding the Full Stack Developer opening in Hyderabad/Bangalore, and I would like to submit my application.

I have 2 years of professional software engineering experience developing full-stack web applications with React.js, Node.js, Express, RESTful APIs, and database architectures.

While my primary core stack is centered on React.js, Node.js, Express, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release within 15 days). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for hybrid work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Vijaya Lakshmi,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer</strong> opening in Hyderabad/Bangalore, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience developing full-stack web applications with <strong>React.js, Node.js, Express, RESTful APIs, and database architectures</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, Express, TypeScript, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release within 15 days). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for hybrid work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "ThinkBig IT & Consulting Services",
    recruiterName: "Mahitha A",
    email: "recruiter4@thinkbigitacs.com",
    role: "Full Stack / Web UI Developer",
    location: "Hyderabad / Bangalore / Chennai",
    subject: "Application for Full Stack / Web Developer – Murali Krishna Popuri",
    plainBody: `Hi Mahitha,

I saw your hiring post on LinkedIn regarding the Full Stack / Web Developer opening across Hyderabad, Bangalore, and Chennai, and I would like to submit my application.

I have 2 years of professional software engineering experience designing and developing responsive frontend applications and integrating RESTful APIs using React.js, JavaScript (ES6+), TypeScript, Node.js, Express, HTML5, and CSS3.

While my primary core stack is centered on React.js, Node.js, TypeScript, and modern JavaScript architectures, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for hybrid work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Mahitha,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack / Web Developer</strong> opening across Hyderabad, Bangalore, and Chennai, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience designing and developing responsive frontend applications and integrating RESTful APIs using <strong>React.js, JavaScript (ES6+), TypeScript, Node.js, Express, HTML5, and CSS3</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, TypeScript, and modern JavaScript architectures, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for hybrid work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to hearing from you.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Radiansys",
    recruiterName: "Nitin Rajput",
    email: "nitin.rajput@radiansys.com",
    role: "Senior Frontend / Full Stack Developer",
    location: "Hyderabad / Bangalore / Chennai",
    subject: "Application for Full Stack / Frontend Developer – Murali Krishna Popuri",
    plainBody: `Hi Nitin,

I saw your hiring post on LinkedIn for the Frontend / Full Stack Developer opportunity across Hyderabad, Bangalore, and Chennai, and I would like to put forward my application.

I have 2 years of professional software engineering experience developing high-performance web applications, reusable UI components, and RESTful APIs with React.js, Node.js, Express, JavaScript (ES6+), TypeScript, SQL, and Git.

While my primary core stack is centered on React.js, Node.js, TypeScript, and modern JavaScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Nitin,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Frontend / Full Stack Developer</strong> opportunity across Hyderabad, Bangalore, and Chennai, and I would like to put forward my application.</p>

  <p>I have 2 years of professional software engineering experience developing high-performance web applications, reusable UI components, and RESTful APIs with <strong>React.js, Node.js, Express, JavaScript (ES6+), TypeScript, SQL, and Git</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, TypeScript, and modern JavaScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "TechnoGig Solution",
    recruiterName: "Madhuri K",
    email: "madhuri.k@technogigsolution.in",
    role: "Full Stack Developer",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Madhuri,

I saw the hiring post on LinkedIn regarding the Full Stack Developer position in Hyderabad, and I would like to submit my application.

I have 2 years of professional software development experience building scalable web applications with React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and REST APIs.

While my primary core stack is centered on React.js, Next.js, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Madhuri,</p>

  <p>I saw the hiring post on LinkedIn regarding the <strong>Full Stack Developer</strong> position in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software development experience building scalable web applications with <strong>React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js, Next.js, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to hearing from you.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Interec / Accenture Direct Payroll",
    recruiterName: "Ashish Kumar",
    email: "ashish@interec.biz",
    role: "Application Engineer",
    location: "Hyderabad / Bangalore",
    subject: "Application for Application Engineer – Murali Krishna Popuri",
    plainBody: `Hi Ashish,

I saw your hiring post on LinkedIn regarding the Application Engineer opening across Hyderabad and Bangalore, and I would like to submit my profile.

Total IT Experience: 2 Years
Relevant Full Stack Experience: 2 Years
Current Company: YoungMinds Technology Solutions
Current Location: Vijayawada, Andhra Pradesh (Ready to relocate immediately to Hyderabad / Bangalore)
Current CTC: 2.4 LPA
Expected CTC: As per company standards / industry standards
Notice Period: Official LWD Nov 11 (Negotiable for immediate joining)

I have 2 years of professional software engineering experience developing full-stack web applications, REST APIs, and system integrations using React.js, Node.js, JavaScript, and TypeScript.

While my primary core stack is centered on React.js, Node.js, TypeScript, and modern web architectures, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, enterprise platforms, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Ashish,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Application Engineer</strong> opening across Hyderabad and Bangalore, and I would like to submit my profile.</p>

  <p><strong>Profile Details:</strong><br>
  Total IT Experience: 2 Years<br>
  Relevant Full Stack Experience: 2 Years<br>
  Current Company: YoungMinds Technology Solutions<br>
  Current Location: Vijayawada, Andhra Pradesh (Ready to relocate immediately to Hyderabad / Bangalore)<br>
  Current CTC: 2.4 LPA<br>
  Expected CTC: As per company standards / industry standards<br>
  Notice Period: Official LWD Nov 11 (Negotiable for immediate joining)</p>

  <p>I have 2 years of professional software engineering experience developing full-stack web applications, REST APIs, and system integrations using <strong>React.js, Node.js, JavaScript, and TypeScript</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, TypeScript, and modern web architectures, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, enterprise platforms, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Speechicon",
    recruiterName: "Nishanth Rao Potlapalli",
    email: "nishanth.potlapalli@speechicon.ai",
    role: "Developer – Cloud & Integrations",
    location: "Hyderabad",
    subject: "Application for Developer (Node.js / Cloud Integrations) – Murali Krishna Popuri",
    plainBody: `Hi Nishanth,

I saw your hiring post on LinkedIn regarding the Developer opening at Speechicon in Hyderabad, and I would like to submit my application.

I have 2 years of professional software engineering experience developing API integrations, web services, and backend systems using JavaScript, Node.js, and TypeScript.

While my primary core stack is centered on JavaScript, Node.js, Express, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, cloud platforms, and telephony/CRM APIs within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Nishanth,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Developer opening</strong> at Speechicon in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience developing API integrations, web services, and backend systems using <strong>JavaScript, Node.js, and TypeScript</strong>.</p>

  <p>While my primary core stack is centered on JavaScript, Node.js, Express, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, cloud platforms, and telephony/CRM APIs within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Alamance IT Solutions / AYM Infotech",
    recruiterName: "Swetha G",
    email: "gswetha@ayminfotech.com",
    role: "Application Developer (Node.js & APIs)",
    location: "Hyderabad",
    subject: "Application: Application Developer (Node.js / APIs) – Murali Krishna Popuri",
    plainBody: `Hi Swetha,

I saw your hiring post on LinkedIn regarding the Developer opening in Hyderabad, and I would like to submit my application.

I have 2 years of professional software engineering experience developing web services, backend APIs, and data integrations with Node.js, Express, JavaScript, TypeScript, and relational databases.

While my primary core stack is centered on Node.js, React.js, Express, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and enterprise frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available for remote work or immediate relocation to Hyderabad.

I have attached my resume (${path.basename(RESUME_PATH)}) for your review. Thank you for your time and consideration, and I look forward to connecting.

Best regards,

Murali Krishna Popuri
+91 9347796811
${SENDER_EMAIL}`,
    htmlBody: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 20px; line-height: 1.5; color: #333333; }
  </style>
</head>
<body>
  <p>Hi Swetha,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Developer opening</strong> in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience developing web services, backend APIs, and data integrations with <strong>Node.js, Express, JavaScript, TypeScript, and relational databases</strong>.</p>

  <p>While my primary core stack is centered on Node.js, React.js, Express, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and enterprise frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available for remote work or immediate relocation to Hyderabad.</p>

  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to connecting.</p>

  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  }
];

async function main() {
  console.log("============================================================");
  console.log(`LinkedIn Feed Leads Batch Dispatcher (${leads.length} Leads)`);
  console.log("============================================================");

  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP connection verified successfully.\n");

  const history = loadHistory();
  let successCount = 0;
  let skipCount = 0;

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`[${i + 1}/${leads.length}] Checking lead: ${lead.email} (${lead.company})...`);

    if (isAlreadySent(lead.email, history)) {
      console.log(`SKIP: ${lead.email} is already in sent history.`);
      skipCount++;
      continue;
    }

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: lead.email,
      subject: lead.subject,
      text: lead.plainBody,
      html: lead.htmlBody,
      attachments: [
        {
          filename: path.basename(RESUME_PATH),
          path: RESUME_PATH,
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`SUCCESS! Sent to ${lead.email}. Message ID: ${info.messageId}`);
      recordSent(lead.email, lead.company, lead.role, info.messageId);
      successCount++;
    } catch (err) {
      console.error(`FAILED sending to ${lead.email}:`, err.message);
    }

    // 2-second delay between emails to avoid hitting Gmail rate limits
    if (i < leads.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log("\n============================================================");
  console.log(`Execution complete. Sent: ${successCount}, Skipped: ${skipCount}, Total: ${leads.length}`);
  console.log("============================================================");
}

main().catch((err) => {
  console.error("Execution failed:", err);
  process.exit(1);
});
