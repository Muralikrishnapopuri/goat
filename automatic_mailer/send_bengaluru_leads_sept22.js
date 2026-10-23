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
    company: "Tecrome Technologies",
    recruiterName: "Hiring Team",
    email: "info@tecrome.com",
    role: "Software Developer / Full-Stack Developer",
    location: "Bengaluru",
    subject: "Application for Software Developer / Full-Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I saw your opening on LinkedIn for the Software Developer / Full-Stack Developer role at Tecrome Technologies in Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience building modern web applications, business software, and REST APIs using React.js, Next.js, Node.js, JavaScript, TypeScript, SQL, and Git.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Hiring Team,</p>
  <p>I saw your opening on LinkedIn for the <strong>Software Developer / Full-Stack Developer</strong> role at <strong>Tecrome Technologies</strong> in Bengaluru, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience building modern web applications, business software, and REST APIs using React.js, Next.js, Node.js, JavaScript, TypeScript, SQL, and Git.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite work.</p>
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
    company: "Audax",
    recruiterName: "K Umasankar Patro",
    email: "umasankar.patro@audax.io",
    role: "Senior Software Engineer (Web)",
    location: "Bengaluru",
    subject: "Referral – Senior Software Engineer (Web) – Murali Krishna Popuri",
    plainBody: `Hi Umasankar,

I came across your referral post on LinkedIn for the Senior Software Engineer (Web) position in Bengaluru, and I would love to be considered for referral.

I have 2 years of professional software development experience specializing in React.js, JavaScript, TypeScript, HTML/CSS, state management (Redux), REST APIs, Node.js, and modern frontend tooling.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite/hybrid work.

I have attached my resume (${path.basename(RESUME_PATH)}) for your referral review. Thank you for your time and support, and I look forward to connecting.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Umasankar,</p>
  <p>I came across your referral post on LinkedIn for the <strong>Senior Software Engineer (Web)</strong> position in Bengaluru, and I would love to be considered for referral.</p>
  <p>I have 2 years of professional software development experience specializing in React.js, JavaScript, TypeScript, HTML/CSS, state management (Redux), REST APIs, Node.js, and modern frontend tooling.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite/hybrid work.</p>
  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your referral review. Thank you for your time and support, and I look forward to connecting.</p>
  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>
  </div>
</body>
</html>`
  },
  {
    company: "Aliqan Technologies",
    recruiterName: "Jiya Dass",
    email: "jiya@aliqan.com",
    role: "Senior Cross-Platform Mobile App Developer",
    location: "Bengaluru",
    subject: "Application for Senior Cross-Platform Mobile App Developer – Murali Krishna Popuri",
    plainBody: `Hi Jiya,

I saw your hiring post on LinkedIn for the Senior Cross-Platform Mobile App Developer role in Bengaluru at Aliqan Technologies, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with JavaScript, TypeScript, React.js, React Native concepts, REST APIs, state management, and modern component architecture.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for hybrid work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Jiya,</p>
  <p>I saw your hiring post on LinkedIn for the <strong>Senior Cross-Platform Mobile App Developer</strong> role in Bengaluru at <strong>Aliqan Technologies</strong>, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience working with JavaScript, TypeScript, React.js, React Native concepts, REST APIs, state management, and modern component architecture.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for hybrid work.</p>
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
    company: "Aliqan Technologies",
    recruiterName: "Krati Vashishtha",
    email: "krati@aliqan.com",
    role: "Senior Cross-Platform Mobile App Developer",
    location: "Bengaluru",
    subject: "Application for Senior Mobile App Developer – Murali Krishna Popuri",
    plainBody: `Hi Krati,

I saw your hiring post on LinkedIn for the Senior Cross-Platform Mobile App Developer position in Bengaluru at Aliqan Technologies, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software development experience working with JavaScript, TypeScript, React.js, React Native concepts, REST APIs, and responsive application development.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for hybrid work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Krati,</p>
  <p>I saw your hiring post on LinkedIn for the <strong>Senior Cross-Platform Mobile App Developer</strong> position in Bengaluru at <strong>Aliqan Technologies</strong>, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software development experience working with JavaScript, TypeScript, React.js, React Native concepts, REST APIs, and responsive application development.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for hybrid work.</p>
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
    company: "Prorsum Technologies",
    recruiterName: "Kadali Bhavana Satya",
    email: "Bhavana@prorsum-tech.com",
    role: "Commerce Developer / Full Stack Engineer",
    location: "Bengaluru",
    subject: "Application for Commerce Developer / Full Stack Engineer – Murali Krishna Popuri",
    plainBody: `Hi Bhavana,

I saw your hiring post on LinkedIn regarding developer opportunities in Bengaluru at Prorsum Technologies, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working on full-stack systems, building robust APIs, integrating databases, and developing responsive user interfaces using React.js, Node.js, JavaScript, TypeScript, and SQL.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for hybrid/onsite work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Bhavana,</p>
  <p>I saw your hiring post on LinkedIn regarding developer opportunities in Bengaluru at <strong>Prorsum Technologies</strong>, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience working on full-stack systems, building robust APIs, integrating databases, and developing responsive user interfaces using React.js, Node.js, JavaScript, TypeScript, and SQL.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for hybrid/onsite work.</p>
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
    company: "Pratyin",
    recruiterName: "Shruti Kanthi",
    email: "shruti.kanthi@pratyin.com",
    role: "Java + React Developer / Full Stack Engineer",
    location: "Bengaluru",
    subject: "Application for Java + React Developer – Murali Krishna Popuri",
    plainBody: `Hi Shruti,

I saw your hiring drive announcement on LinkedIn for the Java + React Developer opportunity in Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing responsive user interfaces and backend integrations using React.js, JavaScript, TypeScript, HTML/CSS, REST APIs, and Node.js.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for the hiring drive and in-person interviews.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Shruti,</p>
  <p>I saw your hiring drive announcement on LinkedIn for the <strong>Java + React Developer</strong> opportunity in Bengaluru, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing responsive user interfaces and backend integrations using React.js, JavaScript, TypeScript, HTML/CSS, REST APIs, and Node.js.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for the hiring drive and in-person interviews.</p>
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
    company: "The IT Talent",
    recruiterName: "Anas Shaikh",
    email: "anas.shaikh@theittalent.com",
    role: "Mobile Application Developer",
    location: "Bengaluru",
    subject: "Application for Mobile Application Developer – Murali Krishna Popuri",
    plainBody: `Hi Anas,

I saw your hiring post on LinkedIn for the Mobile Application Developer role in Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with JavaScript, TypeScript, React.js, component architecture, and REST API integration.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for hybrid work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Anas,</p>
  <p>I saw your hiring post on LinkedIn for the <strong>Mobile Application Developer</strong> role in Bengaluru, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience working with JavaScript, TypeScript, React.js, component architecture, and REST API integration.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for hybrid work.</p>
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
    company: "Vinsari LLC",
    recruiterName: "Satish Gogineni",
    email: "bob@vinsari.com",
    role: ".NET Full Stack Lead / Developer",
    location: "Bengaluru",
    subject: "Application for Full Stack Lead / Developer (.NET / React) – Murali Krishna Popuri",
    plainBody: `Hi Satish,

I saw your hiring announcement on LinkedIn regarding the Full Stack positions in Bengaluru with Vinsari LLC, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing robust web applications with React.js, TypeScript, JavaScript, SQL, REST APIs, and microservices architecture.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite work and in-person interviews.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Satish,</p>
  <p>I saw your hiring announcement on LinkedIn regarding the Full Stack positions in Bengaluru with <strong>Vinsari LLC</strong>, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing robust web applications with React.js, TypeScript, JavaScript, SQL, REST APIs, and microservices architecture.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite work and in-person interviews.</p>
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
    company: "Vinsari LLC",
    recruiterName: "Sujata Poojari",
    email: "sujatap@vinsari.com",
    role: ".NET Full Stack Lead / Developer",
    location: "Bengaluru",
    subject: "Application for Full Stack Lead / Developer (.NET / React) – Murali Krishna Popuri",
    plainBody: `Hi Sujata,

I saw your hiring post on LinkedIn regarding the Full Stack openings in Bengaluru with Vinsari LLC, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing enterprise web applications with React.js, TypeScript, JavaScript, SQL, REST APIs, and microservices architecture.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite work and in-person interviews.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Sujata,</p>
  <p>I saw your hiring post on LinkedIn regarding the Full Stack openings in Bengaluru with <strong>Vinsari LLC</strong>, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing enterprise web applications with React.js, TypeScript, JavaScript, SQL, REST APIs, and microservices architecture.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite work and in-person interviews.</p>
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
    company: "SNB Global",
    recruiterName: "Supriya Chormare",
    email: "snb.globalcareers@gmail.com",
    role: "Application Developer – React & Node.js",
    location: "Bengaluru",
    subject: "App Developer – React Node – Bengaluru – Murali Krishna Popuri",
    plainBody: `Hi Supriya,

I saw your hiring post on LinkedIn for the Application Developer – React & Node.js role in Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing full-stack web applications with React.js, Node.js, Express.js, JavaScript, TypeScript, Redux, REST APIs, and database modeling.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Supriya,</p>
  <p>I saw your hiring post on LinkedIn for the <strong>Application Developer – React & Node.js</strong> role in Bengaluru, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing full-stack web applications with React.js, Node.js, Express.js, JavaScript, TypeScript, Redux, REST APIs, and database modeling.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite work.</p>
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
    company: "TalentXO / Traderz.com",
    recruiterName: "Sneha M J",
    email: "sonalipatilitrecruiter@gmail.com",
    role: "Sr. Full Stack Developer (Node.js / MongoDB)",
    location: "Bengaluru",
    subject: "Application for Sr. Full Stack Developer (Node.js / MongoDB) – Murali Krishna Popuri",
    plainBody: `Hi Sneha,

I saw your hiring post on LinkedIn regarding the Sr. Full Stack Developer position in Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software development experience working with Node.js, Express.js, MongoDB (schema design, queries, Mongoose), REST APIs, JavaScript, TypeScript, and modern frontend frameworks.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for in-office work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Sneha,</p>
  <p>I saw your hiring post on LinkedIn regarding the <strong>Sr. Full Stack Developer</strong> position in Bengaluru, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software development experience working with Node.js, Express.js, MongoDB (schema design, queries, Mongoose), REST APIs, JavaScript, TypeScript, and modern frontend frameworks.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for in-office work.</p>
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
    company: "TalentXO",
    recruiterName: "Shivi V",
    email: "hrrecruitertalentxo@gmail.com",
    role: "Sr. Full Stack Developer",
    location: "Bengaluru",
    subject: "Sr. Full Stack Developer – Bengaluru – Murali Krishna Popuri",
    plainBody: `Hi Shivi,

I saw your hiring post on LinkedIn regarding the Sr. Full Stack Developer role in Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with Node.js, Express.js, MongoDB, REST APIs, JavaScript, TypeScript, and modern component frameworks.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for in-office work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Shivi,</p>
  <p>I saw your hiring post on LinkedIn regarding the <strong>Sr. Full Stack Developer</strong> role in Bengaluru, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience working with Node.js, Express.js, MongoDB, REST APIs, JavaScript, TypeScript, and modern component frameworks.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for in-office work.</p>
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
    company: "Covetus",
    recruiterName: "Varsha Soni",
    email: "varsha.soni@covetus.com",
    role: "Cloud Integration & Node.js Developer",
    location: "Bengaluru",
    subject: "Application for Cloud Integration & Node.js Developer – Murali Krishna Popuri",
    plainBody: `Hi Varsha,

I saw your hiring post on LinkedIn for developer opportunities in Bengaluru at Covetus, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing robust Node.js services, REST APIs, and database integrations using JavaScript and TypeScript.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Varsha,</p>
  <p>I saw your hiring post on LinkedIn for developer opportunities in Bengaluru at <strong>Covetus</strong>, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing robust Node.js services, REST APIs, and database integrations using JavaScript and TypeScript.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for work.</p>
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
    company: "Spekond Technologies",
    recruiterName: "Hiring Team",
    email: "reach@spekond.com",
    role: "UI Developer (Node.js / JavaScript)",
    location: "Bengaluru",
    subject: "Application for UI Developer (Node.js / JavaScript) – Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I saw your hiring post on LinkedIn regarding the UI Developer position in Bengaluru at Spekond Technologies, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience building responsive, pixel-perfect user interfaces, integrating backend REST APIs, and writing clean JavaScript and TypeScript.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Hiring Team,</p>
  <p>I saw your hiring post on LinkedIn regarding the <strong>UI Developer</strong> position in Bengaluru at <strong>Spekond Technologies</strong>, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience building responsive, pixel-perfect user interfaces, integrating backend REST APIs, and writing clean JavaScript and TypeScript.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for onsite work.</p>
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
    company: "Acesoft Labs",
    recruiterName: "Kajal Singh",
    email: "Kajal@acesoftlabs.com",
    role: "Node js Backend Developer",
    location: "Bengaluru",
    subject: "Application for Node js Backend Developer – Murali Krishna Popuri",
    plainBody: `Hi Kajal,

I saw your hiring post on LinkedIn for the Node js Backend Developer role in Bengaluru at Acesoft Labs, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing scalable backend services with Node.js, Express.js, TypeScript, SQL databases, and RESTful APIs.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for work from office.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Kajal,</p>
  <p>I saw your hiring post on LinkedIn for the <strong>Node js Backend Developer</strong> role in Bengaluru at <strong>Acesoft Labs</strong>, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing scalable backend services with Node.js, Express.js, TypeScript, SQL databases, and RESTful APIs.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for work from office.</p>
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
    company: "Naukariwaala Consultants",
    recruiterName: "Hiring Team",
    email: "hiring@naukariwaala.com",
    role: "Senior Full Stack Developer – Vue.js, Node.js, MongoDB",
    location: "Bengaluru",
    subject: "Senior Full Stack Developer – Vue.js, Node.js, MongoDB – Murali Krishna Popuri",
    plainBody: `Hi Hiring Team,

I saw your hiring post on LinkedIn regarding the Senior Full Stack Developer – Vue.js, Node.js, MongoDB role in Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with Node.js, Express.js, MongoDB, REST APIs, JavaScript, TypeScript, and modern component frameworks.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for in-office work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Hiring Team,</p>
  <p>I saw your hiring post on LinkedIn regarding the <strong>Senior Full Stack Developer – Vue.js, Node.js, MongoDB</strong> role in Bengaluru, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience working with Node.js, Express.js, MongoDB, REST APIs, JavaScript, TypeScript, and modern component frameworks.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for in-office work.</p>
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
    company: "TalentXO",
    recruiterName: "Nourhan Abo Shma",
    email: "nourhanaboshma@zohomail.in",
    role: "Senior Full Stack Developer (Node.js / MongoDB)",
    location: "Bengaluru",
    subject: "Application for Senior Full Stack Developer (Node.js / MongoDB) – Murali Krishna Popuri",
    plainBody: `Hi Nourhan,

I saw your hiring post on LinkedIn regarding the Senior Full Stack Developer position in Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with Node.js, Express.js, MongoDB, REST APIs, JavaScript, TypeScript, and modern component development.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for in-office work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Nourhan,</p>
  <p>I saw your hiring post on LinkedIn regarding the <strong>Senior Full Stack Developer</strong> position in Bengaluru, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience working with Node.js, Express.js, MongoDB, REST APIs, JavaScript, TypeScript, and modern component development.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for in-office work.</p>
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
    company: "TalentXO",
    recruiterName: "Mohammad Sana",
    email: "mohammadsanahr@gmail.com",
    role: "Sr. Full Stack Developer",
    location: "Bengaluru",
    subject: "Application for Sr. Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Mohammad,

I saw your hiring post on LinkedIn regarding the Sr. Full Stack Developer position in Bengaluru, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience working with Node.js, Express.js, MongoDB, REST APIs, JavaScript, TypeScript, and modern component architecture.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for in-office work.

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Mohammad,</p>
  <p>I saw your hiring post on LinkedIn regarding the <strong>Sr. Full Stack Developer</strong> position in Bengaluru, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience working with Node.js, Express.js, MongoDB, REST APIs, JavaScript, TypeScript, and modern component architecture.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bengaluru for in-office work.</p>
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
  console.log(`Bengaluru React / Node Leads Batch Dispatcher (${leads.length} Leads)`);
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
