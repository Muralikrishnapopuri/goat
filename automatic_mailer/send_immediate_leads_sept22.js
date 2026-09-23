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

const leads = [
  {
    company: "Empover",
    recruiterName: "Anitha Rallapalli",
    email: "Hr@empover.com",
    role: "Full Stack Developer (React JS + Node JS)",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer (React JS + Node JS) – Murali Krishna Popuri",
    plainBody: `Hi Anitha,

I saw your hiring post on LinkedIn regarding the Full Stack Developer (React JS + Node JS) position in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing full-stack web applications with React.js, Node.js, Express.js, JavaScript, TypeScript, HTML/CSS, MongoDB, SQL, and REST APIs.

While my primary core stack is centered on React.js, Node.js, Express, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Anitha,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer (React JS + Node JS)</strong> position in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience developing full-stack web applications with <strong>React.js, Node.js, Express.js, JavaScript, TypeScript, HTML/CSS, MongoDB, SQL, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, Express, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "DPR Solutions Inc",
    recruiterName: "BL Keerthi Princy",
    email: "Princy@dprsolutionsinc.com",
    role: "MERN Stack Developer (React JS + Node JS)",
    location: "Hyderabad",
    subject: "Application for MERN Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Keerthi,

I saw your hiring post on LinkedIn regarding the MERN Stack Developer (React JS + Node JS) opening in Hyderabad, and I would like to submit my application.

I have 2 years of professional software development experience building scalable web applications with React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), and RESTful APIs.

While my primary core stack is centered on React.js, Node.js, Express, and MongoDB, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am currently serving my notice period with an official Last Working Day of Nov 11, but negotiable for earlier release / immediate joining upon receiving an offer. I am based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid/onsite work.

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
  <p>Hi Keerthi,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>MERN Stack Developer (React JS + Node JS)</strong> opening in Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software development experience building scalable web applications with <strong>React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), and RESTful APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, Express, and MongoDB, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am currently serving my notice period with an official Last Working Day of Nov 11, but negotiable for earlier release / immediate joining upon receiving an offer. I am based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid/onsite work.</p>

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
    company: "Softobiz",
    recruiterName: "Adlin Asha",
    email: "adlin.asha@softobiz.com",
    role: "Full Stack Developer (React, Node & TypeScript)",
    location: "Hyderabad / Mohali / Kochi",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Adlin,

I saw your hiring post on LinkedIn regarding the Full Stack Developer openings across Hyderabad, Mohali, and Kochi, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience building scalable web applications, REST APIs, and microservices with React.js, Node.js, TypeScript, Next.js, and modern databases.

While my primary core stack is centered on React.js, Node.js, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Adlin,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer</strong> openings across Hyderabad, Mohali, and Kochi, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience building scalable web applications, REST APIs, and microservices with <strong>React.js, Node.js, TypeScript, Next.js, and modern databases</strong>.</p>

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
    company: "Trust Tree Infotech",
    recruiterName: "Souradip Chatterjee",
    email: "souradip@ttift.com",
    role: "Full-Stack Developer (React / Node.js)",
    location: "Hyderabad",
    subject: "Application for Full-Stack Developer (React / Node.js) – Murali Krishna Popuri",
    plainBody: `Hi Souradip,

I saw your post on LinkedIn regarding the Full-Stack React / Node.js opening in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience designing and scaling full-stack applications with JavaScript, React.js, Node.js, Express, TypeScript, REST APIs, and databases.

While my primary core stack is centered on React.js, Node.js, Express, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Souradip,</p>

  <p>I saw your post on LinkedIn regarding the <strong>Full-Stack React / Node.js</strong> opening in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience designing and scaling full-stack applications with <strong>JavaScript, React.js, Node.js, Express, TypeScript, REST APIs, and databases</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, Express, and REST APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Uniserv Tech",
    recruiterName: "Gail Heldt",
    email: "gail@uniserv.tech",
    role: "Driver Ops Engineer (Node.js & React)",
    location: "Hyderabad",
    subject: "Driver Ops Engineer (TypeScript / Node / React) – Murali Krishna Popuri",
    plainBody: `Hi Gail,

I saw your hiring post on LinkedIn regarding the Driver Ops Engineer opening in Hyderabad (night shift), and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing full-stack applications with TypeScript, Node.js, React, Express, REST APIs, and databases.

While my primary core stack is centered on TypeScript, Node.js, React, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new cloud services, AWS serverless tools, and GraphQL within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am comfortable with night shift timings and available to relocate immediately to Hyderabad.

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
  <p>Hi Gail,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Driver Ops Engineer</strong> opening in Hyderabad (night shift), and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience developing full-stack applications with <strong>TypeScript, Node.js, React, Express, REST APIs, and databases</strong>.</p>

  <p>While my primary core stack is centered on TypeScript, Node.js, React, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new cloud services, AWS serverless tools, and GraphQL within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am comfortable with night shift timings and available to relocate immediately to Hyderabad.</p>

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
    company: "Pacer Staffing / MWIDM",
    recruiterName: "Sukhdeep Singh",
    email: "sukhdeep.singh@pacerstaffing.com",
    role: "Full Stack Engineer (React.js & Node)",
    location: "Hyderabad / Bengaluru",
    subject: "Application - React / Node Full Stack - 2 Years - Hyderabad - Immediate Joiner",
    plainBody: `Hi Sukhdeep,

I saw your post on LinkedIn regarding enterprise and technical roles across Hyderabad and Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional full-stack development experience building scalable web applications with React.js, Node.js, Express, JavaScript, TypeScript, and RESTful APIs.

While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bengaluru.

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
  <p>Hi Sukhdeep,</p>

  <p>I saw your post on LinkedIn regarding enterprise and technical roles across Hyderabad and Bengaluru, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional full-stack development experience building scalable web applications with <strong>React.js, Node.js, Express, JavaScript, TypeScript, and RESTful APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "RecruiterV",
    recruiterName: "Bharath",
    email: "bharath.zeeinfoservices@gmail.com",
    role: "AI / Full Stack Solutions Engineer (Frontend & Integration)",
    location: "Hyderabad / Bengaluru",
    subject: "Application for AI / Full Stack Solutions Engineer – Murali Krishna Popuri",
    plainBody: `Hi Bharath,

I saw your hiring post on LinkedIn regarding the Solutions Engineer (Frontend & Integration) opening in Hyderabad/Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software development experience working with React, Next.js, Node.js, TypeScript, REST APIs, and integrating modern AI services and developer workflows.

While my primary core stack is centered on React, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new cloud tools, Azure environments, and data frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Bharath,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Solutions Engineer (Frontend & Integration)</strong> opening in Hyderabad/Bengaluru, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software development experience working with <strong>React, Next.js, Node.js, TypeScript, REST APIs, and integrating modern AI services and developer workflows</strong>.</p>

  <p>While my primary core stack is centered on React, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new cloud tools, Azure environments, and data frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Delta System",
    recruiterName: "Bhargav Prajapati",
    email: "bhargav.prajapati@deltassi.com",
    role: "Full Stack Developer (React + Node + AI)",
    location: "Hyderabad / Bangalore",
    subject: "Application for Full Stack Developer – React + Node – Murali Krishna Popuri",
    plainBody: `Hi Bhargav,

I saw your hiring post on LinkedIn for the Full Stack Developer – React + Node + AI position in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing full-stack web applications with React.js, Node.js, Express, MongoDB, JavaScript, TypeScript, and REST APIs.

While my primary core stack is centered on React.js, Node.js, and MongoDB, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid work.

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
  <p>Hi Bhargav,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Full Stack Developer – React + Node + AI</strong> position in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience developing full-stack web applications with <strong>React.js, Node.js, Express, MongoDB, JavaScript, TypeScript, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, and MongoDB, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Delta System",
    recruiterName: "Meet Paresh Patel",
    email: "meet.patel@deltassi.com",
    role: "Front-End Lead / React & Node Developer",
    location: "Hyderabad",
    subject: "Application for React / Node Developer – Murali Krishna Popuri",
    plainBody: `Hi Meet,

I saw your hiring post on LinkedIn regarding the React / Node Developer and Front-End openings in Hyderabad, and I would like to submit my application.

Current CTC: 2.4 LPA
Expected CTC: As per company standards
Notice Period: Official LWD Nov 11 (Negotiable for immediate release)
Current Location: Vijayawada, AP (Available to relocate immediately to Hyderabad for F2F interview and joining)

I have 2 years of professional software engineering experience working with JavaScript, TypeScript, React.js, Node.js, Express.js, MongoDB, and REST APIs.

While my primary core stack is centered on React.js, Node.js, Express, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

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
  <p>Hi Meet,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>React / Node Developer and Front-End openings</strong> in Hyderabad, and I would like to submit my application.</p>

  <p><strong>Candidate Details:</strong><br>
  Current CTC: 2.4 LPA<br>
  Expected CTC: As per company standards<br>
  Notice Period: Official LWD Nov 11 (Negotiable for immediate release)<br>
  Current Location: Vijayawada, AP (Available to relocate immediately to Hyderabad for F2F interview and joining)</p>

  <p>I have 2 years of professional software engineering experience working with <strong>JavaScript, TypeScript, React.js, Node.js, Express.js, MongoDB, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, Express, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

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
    company: "Nineleaps",
    recruiterName: "Hiring Team",
    email: "jobs@nineleaps.com",
    role: "React / Node Developer",
    location: "Bengaluru / Hyderabad",
    subject: "Application for React / Node Developer – Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I saw your hiring post on LinkedIn for the React / Node Developer positions in Bengaluru and Hyderabad, and I would like to submit my application.

I have 2 years of professional software engineering experience building responsive interfaces with React.js and developing scalable backend services and APIs with Node.js, Express, and databases.

While my primary core stack is centered on React.js, Node.js, Express, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Hiring Team,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>React / Node Developer positions</strong> in Bengaluru and Hyderabad, and I would like to submit my application.</p>

  <p>I have 2 years of professional software engineering experience building responsive interfaces with <strong>React.js and developing scalable backend services and APIs with Node.js, Express, and databases</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, Express, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Mako IT Lab",
    recruiterName: "Hiring Team",
    email: "hiring@makoitlab.com",
    role: "Fullstack Developer (React & Node)",
    location: "Hyderabad / Chennai",
    subject: "Application for Fullstack Developer (React & Node) – Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I saw your hiring post on LinkedIn regarding the Fullstack Developer (React & Node) opening, and I would like to submit my application as an immediate joiner.

I have 2 years of professional hands-on development experience building production applications with React.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, and REST APIs.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad.

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
  <p>Hi Hiring Team,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Fullstack Developer (React & Node)</strong> opening, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional hands-on development experience building production applications with <strong>React.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, and REST APIs</strong>.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad.</p>

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
    company: "Kanary Staffing",
    recruiterName: "Yeruva Divya Teja Reddy",
    email: "divya.nxthireindia123@gmail.com",
    role: "Full Stack Developer (React & Node)",
    location: "Hyderabad",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Divya,

I saw your hiring post on LinkedIn for the Full Stack Developer opening in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional full-stack development experience building scalable web applications with React.js, Node.js, JavaScript (ES6+), TypeScript, Express, and REST APIs.

While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work.

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
  <p>Hi Divya,</p>

  <p>I saw your hiring post on LinkedIn for the <strong>Full Stack Developer</strong> opening in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional full-stack development experience building scalable web applications with <strong>React.js, Node.js, JavaScript (ES6+), TypeScript, Express, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "uniquehire",
    recruiterName: "Mahitha Vaka",
    email: "mahitha@uniquehire.co.in",
    role: "Software Engineer (Node.js & React.js)",
    location: "Hyderabad",
    subject: "Application for Software Engineer (Node.js & React.js) – Murali Krishna Popuri",
    plainBody: `Hi Mahitha,

I saw your hiring post on LinkedIn regarding the Software Engineer position in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with Node.js, React.js, TypeScript, JavaScript, RESTful APIs, and database systems.

While my primary core stack is centered on Node.js, React.js, Express, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid work.

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
  <p>Hi Mahitha,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Software Engineer</strong> position in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience working with <strong>Node.js, React.js, TypeScript, JavaScript, RESTful APIs, and database systems</strong>.</p>

  <p>While my primary core stack is centered on Node.js, React.js, Express, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Knack Consulting Services",
    recruiterName: "Tuba Akhter",
    email: "tuba.akhter@knackconsulting.com",
    role: "Fullstack Developer (React & Node)",
    location: "Hyderabad",
    subject: "Application for Fullstack Developer (React & Node) – Murali Krishna Popuri",
    plainBody: `Hi Tuba,

I saw your hiring post on LinkedIn regarding the Fullstack Developer opportunity in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience building scalable full-stack web applications with React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and REST APIs.

While my primary core stack is centered on React.js, Node.js, and Next.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Tuba,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Fullstack Developer</strong> opportunity in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience building scalable full-stack web applications with <strong>React.js, Next.js, Node.js, Express, JavaScript, TypeScript, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, and Next.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Netconnect Global",
    recruiterName: "Abhilasha K",
    email: "abhilasha.k@netconnectglobal.com",
    role: "Full Stack / Frontend Developer (React & Node JS)",
    location: "Bengaluru / Hyderabad",
    subject: "Application for Full Stack Developer (React & Node JS) – Murali Krishna Popuri",
    plainBody: `Hi Abhilasha,

I saw your hiring post on LinkedIn regarding the Full Stack Developer role in Bengaluru / Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience designing, developing, and maintaining full stack applications with React.js, Node.js, Express, JavaScript, TypeScript, and REST APIs.

While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release within 0-15 days). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bengaluru.

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
  <p>Hi Abhilasha,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer</strong> role in Bengaluru / Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience designing, developing, and maintaining full stack applications with <strong>React.js, Node.js, Express, JavaScript, TypeScript, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release within 0-15 days). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bengaluru.</p>

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
    company: "Live Connections",
    recruiterName: "M M Abhishek",
    email: "abhishek.m@livecjobs.com",
    role: "Full Stack / AI Developer (React JS & Node JS)",
    location: "Hyderabad / Bangalore",
    subject: "Application for Full Stack / AI Developer – Murali Krishna Popuri",
    plainBody: `Hi Abhishek,

I saw your hiring post on LinkedIn regarding the Full Stack Developer opening in Hyderabad/Bangalore, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software development experience building web applications and backend services with React JS, Node JS, Express, JavaScript, TypeScript, and REST APIs, alongside leveraging modern AI developer tools.

While my primary core stack is centered on React JS and Node JS, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Abhishek,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer</strong> opening in Hyderabad/Bangalore, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software development experience building web applications and backend services with <strong>React JS, Node JS, Express, JavaScript, TypeScript, and REST APIs, alongside leveraging modern AI developer tools</strong>.</p>

  <p>While my primary core stack is centered on React JS and Node JS, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Ideyalabs / BPMLinks",
    recruiterName: "Abhijith S",
    email: "cvs@staginvs.com",
    role: "Full-Stack / Node.js Developer",
    location: "Hitech City, Hyderabad",
    subject: "Node.js Developer – Hyd – Imm Joiner – Murali Krishna Popuri",
    plainBody: `Hi Abhijith,

I saw your hiring post on LinkedIn regarding the Full-Stack / Node.js Developer opening at Hitech City, Hyderabad, and I would like to put forward my application as an immediate joiner.

I have 2 years of professional software development experience building backend APIs and web applications with Node.js, Express, TypeScript, React.js, and databases.

While my primary core stack is centered on Node.js, Express, React, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release within 15 days). I am based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work.

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
  <p>Hi Abhijith,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full-Stack / Node.js Developer</strong> opening at Hitech City, Hyderabad, and I would like to put forward my application as an immediate joiner.</p>

  <p>I have 2 years of professional software development experience building backend APIs and web applications with <strong>Node.js, Express, TypeScript, React.js, and databases</strong>.</p>

  <p>While my primary core stack is centered on Node.js, Express, React, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release within 15 days). I am based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work.</p>

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
    company: "Synergy Innovation",
    recruiterName: "Kshitij Yadav",
    email: "kshitij.synergyhr@gmail.com",
    role: "Full Stack / AI Developer (React JS & Node JS)",
    location: "Hyderabad / Pune / Bangalore",
    subject: "Application for Full Stack / AI Developer – Murali Krishna Popuri",
    plainBody: `Hi Kshitij,

I saw your hiring post on LinkedIn regarding the Full Stack / AI Developer opening in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with React.js, Node.js, Express, JavaScript, TypeScript, REST APIs, and integrating modern AI services.

While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad.

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
  <p>Hi Kshitij,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack / AI Developer</strong> opening in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience working with <strong>React.js, Node.js, Express, JavaScript, TypeScript, REST APIs, and integrating modern AI services</strong>.</p>

  <p>While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>

  <p>Here are links to my work:</p>
  <ul>
    <li>Portfolio: <a href="https://murali-portfolio-website.vercel.app">murali-portfolio-website.vercel.app</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri">linkedin.com/in/murali-krishna-popuri</a></li>
    <li>GitHub: <a href="https://github.com/Muralikrishnapopuri">github.com/Muralikrishnapopuri</a></li>
    <li>Zestchat (Sample web app for WebSockets): <a href="https://zestchat.vercel.app">zestchat.vercel.app</a></li>
  </ul>

  <p><strong>Availability &amp; Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad.</p>

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
    company: "Stack Hire Hub / Webpipl",
    recruiterName: "Pavan Kumar",
    email: "pavankumar.guttula@webpipl.com",
    role: "Full Stack / React JS Developer",
    location: "Hyderabad",
    subject: "Application for React JS & Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Pavan,

I saw your hiring post on LinkedIn regarding the React JS / Full Stack Developer opening in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with React.js, Node.js, Express, JavaScript, TypeScript, SQL databases, and REST APIs.

While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Pavan,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>React JS / Full Stack Developer</strong> opening in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience working with <strong>React.js, Node.js, Express, JavaScript, TypeScript, SQL databases, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "FirstMeridian Global",
    recruiterName: "Mohit K",
    email: "mohit.kumar@firstmeridianglobal.com",
    role: "Full Stack Developer (Node JS, React JS)",
    location: "Hyderabad / Bangalore / Chennai",
    subject: "Application for Full Stack Developer (Node JS & React JS) – Murali Krishna Popuri",
    plainBody: `Hi Mohit,

I saw your hiring post on LinkedIn regarding the Full Stack Developer (Node JS, React JS) opening across Hyderabad, Bangalore, and Chennai, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software development experience building scalable applications with Node.js, React.js, Express, JavaScript, TypeScript, SQL, and REST APIs.

While my primary core stack is centered on Node.js and React.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Mohit,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer (Node JS, React JS)</strong> opening across Hyderabad, Bangalore, and Chennai, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software development experience building scalable applications with <strong>Node.js, React.js, Express, JavaScript, TypeScript, SQL, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on Node.js and React.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Prophecy Technologies",
    recruiterName: "Devakar Balachandran",
    email: "devakar@prophecytechs.com",
    role: "Node JS & React Developer",
    location: "Hyderabad / Bangalore",
    subject: "Application for Node JS / React Developer – Murali Krishna Popuri",
    plainBody: `Hi Devakar,

I saw your hiring post on LinkedIn regarding the Node JS & React Developer openings in Hyderabad and Bangalore, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software development experience working with Node.js, React.js, Express, JavaScript, TypeScript, and REST APIs.

While my primary core stack is centered on Node.js and React.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Devakar,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Node JS & React Developer openings</strong> in Hyderabad and Bangalore, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software development experience working with <strong>Node.js, React.js, Express, JavaScript, TypeScript, and REST APIs</strong>.</p>

  <p>While my primary core stack is centered on Node.js and React.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "HCLTech",
    recruiterName: "Gunjan Tiwari",
    email: "gunjan.tiwari@hcltech.com",
    role: "Web & Automation Specialist (React / Node.js)",
    location: "Hyderabad",
    subject: "Application for Web & Developer Role – Murali Krishna Popuri",
    plainBody: `Hi Gunjan,

I saw your hiring post on LinkedIn regarding the opening in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with JavaScript, React.js, Node.js, Express, SQL, and automation workflows.

While my primary core stack is centered on React.js, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for onsite work.

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
  <p>Hi Gunjan,</p>

  <p>I saw your hiring post on LinkedIn regarding the opening in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience working with <strong>JavaScript, React.js, Node.js, Express, SQL, and automation workflows</strong>.</p>

  <p>While my primary core stack is centered on React.js, Node.js, and TypeScript, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Burgeon IT Services",
    recruiterName: "Sreekanth B",
    email: "sreekanth@burgeonits.net",
    role: "Full Stack Developer (React & Node JS)",
    location: "Hyderabad / Pune",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Sreekanth,

I saw your hiring post on LinkedIn regarding the Full Stack Developer opening in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with React.js, Node.js, Express, JavaScript, TypeScript, REST APIs, and databases.

While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for hybrid work.

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
  <p>Hi Sreekanth,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Full Stack Developer</strong> opening in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience working with <strong>React.js, Node.js, Express, JavaScript, TypeScript, REST APIs, and databases</strong>.</p>

  <p>While my primary core stack is centered on React.js and Node.js, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Enterprise IT Solution",
    recruiterName: "Kavi Sri",
    email: "Kavisri@enterpriseits.com",
    role: "Digital Developer (React JS & Node JS)",
    location: "Hyderabad / Bangalore / Chennai",
    subject: "Application for Digital Developer (React JS & Node JS) – Murali Krishna Popuri",
    plainBody: `Hi Kavi Sri,

I saw your hiring post on LinkedIn regarding the Digital Developer position in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with JavaScript, React JS, Node JS, HTML5, CSS, and RESTful APIs.

While my primary core stack is centered on React JS and Node JS, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Kavi Sri,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Digital Developer</strong> position in Hyderabad, and I would like to submit my application as an immediate joiner.</p>

  <p>I have 2 years of professional software engineering experience working with <strong>JavaScript, React JS, Node JS, HTML5, CSS, and RESTful APIs</strong>.</p>

  <p>While my primary core stack is centered on React JS and Node JS, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
    company: "Briskwin IT",
    recruiterName: "Swetapadma Pani",
    email: "swetapadma@briskwinit.com",
    role: "Digital Platform Developer (React JS & Node JS)",
    location: "Hyderabad / Bangalore / Chennai",
    subject: "Application for Digital Platform Developer – Murali Krishna Popuri",
    plainBody: `Hi Swetapadma,

I saw your hiring post on LinkedIn regarding the Digital Platform Developer opening in Hyderabad, and I would like to submit my profile.

Total Experience: 2 Years
Relevant Experience: 2 Years
Notice Period / LWD: Official LWD Nov 11 (Negotiable for immediate release)
Current CTC: 2.4 LPA
Expected CTC: As per industry standards
Current Location: Vijayawada, AP (Available to relocate immediately to Hyderabad / Bangalore)
Preferred Location: Hyderabad

I have 2 years of professional software engineering experience working with JavaScript, React JS, Node JS, HTML5, CSS, and RESTful APIs.

While my primary core stack is centered on React JS and Node JS, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

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
  <p>Hi Swetapadma,</p>

  <p>I saw your hiring post on LinkedIn regarding the <strong>Digital Platform Developer</strong> opening in Hyderabad, and I would like to submit my profile.</p>

  <p><strong>Candidate Details:</strong><br>
  Total Experience: 2 Years<br>
  Relevant Experience: 2 Years<br>
  Notice Period / LWD: Official LWD Nov 11 (Negotiable for immediate release)<br>
  Current CTC: 2.4 LPA<br>
  Expected CTC: As per industry standards<br>
  Current Location: Vijayawada, AP (Available to relocate immediately to Hyderabad / Bangalore)<br>
  Preferred Location: Hyderabad</p>

  <p>I have 2 years of professional software engineering experience working with <strong>JavaScript, React JS, Node JS, HTML5, CSS, and RESTful APIs</strong>.</p>

  <p>While my primary core stack is centered on React JS and Node JS, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>

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
  }
];

async function main() {
  console.log("============================================================");
  console.log(`Immediate Joiner React/Node Leads Batch Dispatcher (${leads.length} Leads)`);
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
