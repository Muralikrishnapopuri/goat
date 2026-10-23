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
    company: "AMNOVA TECHNOLOGIES",
    recruiterName: "Adarsh Haridas",
    email: "adarsh@amnova.ai",
    role: "Full Stack Engineer (React.js / Next.js / Node.js)",
    location: "Kochi / Hybrid",
    subject: "Application for Full Stack Engineer (React.js / Node.js) – Murali Krishna Popuri",
    plainBody: `Hi Adarsh,

I came across your hiring post on LinkedIn for the Full Stack Engineer role at AMNOVA TECHNOLOGIES, and I am excited to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing scalable web applications, RESTful APIs, and responsive frontends using React.js, Next.js, Node.js, Express.js, JavaScript, TypeScript, SQL/PostgreSQL, and Git.

Here are the details you requested:
- Total & Relevant Experience: 2 Years
- Current Location: Vijayawada, Andhra Pradesh (available to relocate immediately to Kochi / hybrid)
- Notice Period: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Expected CTC: Negotiable as per company standards

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Adarsh,</p>
  <p>I came across your hiring post on LinkedIn for the <strong>Full Stack Engineer</strong> role at <strong>AMNOVA TECHNOLOGIES</strong>, and I am excited to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing scalable web applications, RESTful APIs, and responsive frontends using React.js, Next.js, Node.js, Express.js, JavaScript, TypeScript, SQL/PostgreSQL, and Git.</p>
  <p><strong>Candidate Details:</strong></p>
  <ul>
    <li><strong>Total & Relevant Experience:</strong> 2 Years</li>
    <li><strong>Current Location:</strong> Vijayawada, Andhra Pradesh (ready to relocate immediately to Kochi / hybrid)</li>
    <li><strong>Notice Period:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)</li>
    <li><strong>Expected CTC:</strong> Negotiable as per company standards</li>
  </ul>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
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
    company: "EPAM Systems",
    recruiterName: "Yashika Singh",
    email: "yashika_singh@epam.com",
    role: "Full Stack Developer (Java + React.js)",
    location: "Hyderabad / Bangalore",
    subject: "Application for EPAM Hiring Drive (Java + React.js Developer) – Murali Krishna Popuri",
    plainBody: `Hi Yashika,

I saw your announcement on LinkedIn regarding the EPAM Face-to-Face Hiring Drive for Full Stack Developers (Java + React.js) across Hyderabad and Bangalore, and I would like to submit my profile as an immediate joiner.

I have 2 years of professional software engineering experience developing responsive user interfaces and backend integrations using React.js, Redux, JavaScript, TypeScript, HTML/CSS, RESTful APIs, and microservices architecture.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

Here are my details for the drive:
- Total Experience: 2 Years
- Relevant Experience (React / Frontend / Full Stack): 2 Years
- Current Location: Vijayawada, Andhra Pradesh (ready to attend F2F drive in Hyderabad or Bangalore)
- Notice Period: Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)
- Current & Expected CTC: Negotiable as per EPAM standards

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
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Yashika,</p>
  <p>I saw your announcement on LinkedIn regarding the <strong>EPAM Face-to-Face Hiring Drive</strong> for Full Stack Developers (Java + React.js) across Hyderabad and Bangalore, and I would like to submit my profile as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing responsive user interfaces and backend integrations using React.js, Redux, JavaScript, TypeScript, HTML/CSS, RESTful APIs, and microservices architecture.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p><strong>Candidate Profile Details:</strong></p>
  <ul>
    <li><strong>Total & Relevant Experience:</strong> 2 Years</li>
    <li><strong>Current Location:</strong> Vijayawada, Andhra Pradesh (available for in-person drive in Hyderabad / Bangalore)</li>
    <li><strong>Notice Period:</strong> Immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)</li>
    <li><strong>Current & Expected CTC:</strong> Negotiable as per EPAM standards</li>
  </ul>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
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
    company: "Mango IT Solutions",
    recruiterName: "Iti Jain",
    email: "hr@mangoitsolutions.com",
    role: "Lead MEAN/MERN Stack Developer",
    location: "Indore / Remote",
    subject: "Application for MEAN/MERN Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Iti,

I saw your hiring post on LinkedIn for the MEAN/MERN Stack Developer opportunity at Mango IT Solutions, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing full-stack web applications with React.js, Node.js, Next.js, Express.js, JavaScript, TypeScript, MongoDB, MySQL, and real-time WebSockets.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available for remote work or relocation.

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
  <p>Hi Iti,</p>
  <p>I saw your hiring post on LinkedIn for the <strong>MEAN/MERN Stack Developer</strong> opportunity at <strong>Mango IT Solutions</strong>, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing full-stack web applications with React.js, Node.js, Next.js, Express.js, JavaScript, TypeScript, MongoDB, MySQL, and real-time WebSockets.</p>
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
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available for remote work or relocation.</p>
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
    company: "Volto Consulting",
    recruiterName: "Shyni Sathiya",
    email: "shyni.s@voltoconsulting.com",
    role: "Java Full Stack Developer (React / Angular)",
    location: "Bangalore / Hyderabad",
    subject: "Application for Full Stack Developer (React / Node / Web) – Murali Krishna Popuri",
    plainBody: `Hi Shyni,

I saw your hiring post on LinkedIn regarding Full Stack Developer positions in Bangalore and Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software development experience working with React.js, Node.js, Express.js, JavaScript, TypeScript, SQL databases, and secure RESTful APIs.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bangalore or Hyderabad for onsite work.

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
  <p>Hi Shyni,</p>
  <p>I saw your hiring post on LinkedIn regarding <strong>Full Stack Developer</strong> positions in Bangalore and Hyderabad, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software development experience working with React.js, Node.js, Express.js, JavaScript, TypeScript, SQL databases, and secure RESTful APIs.</p>
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
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bangalore or Hyderabad for onsite work.</p>
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
    company: "COSTAFF Global",
    recruiterName: "Gangadhara Parlapadu",
    email: "p.gangadhara@costaffglobal.in",
    role: "Full Stack / Python-Node Developer",
    location: "Bangalore",
    subject: "Application: Python-Node / Full Stack Developer – Bangalore – Murali Krishna Popuri",
    plainBody: `Hi Gangadhara,

I saw your hiring post on LinkedIn regarding urgent developer opportunities in Bangalore, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing robust web applications with Node.js, Express.js, React.js, JavaScript, TypeScript, REST APIs, SQL, and MongoDB.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bangalore for onsite work and in-person interviews.

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
  <p>Hi Gangadhara,</p>
  <p>I saw your hiring post on LinkedIn regarding urgent developer opportunities in Bangalore, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing robust web applications with Node.js, Express.js, React.js, JavaScript, TypeScript, REST APIs, SQL, and MongoDB.</p>
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
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Bangalore for onsite work and in-person interviews.</p>
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
    company: "Combo Square",
    recruiterName: "Ahamad Thowfeek B",
    email: "combosquareofficials@gmail.com",
    role: "Full Stack Developer",
    location: "Nagercoil / Remote",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    plainBody: `Hi Ahamad,

I saw your hiring post on LinkedIn regarding Full Stack Developer positions at Combo Square, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing full-stack applications using React.js, Node.js, Express.js, JavaScript, TypeScript, SQL databases, and REST APIs.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available for remote work or relocation.

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
  <p>Hi Ahamad,</p>
  <p>I saw your hiring post on LinkedIn regarding <strong>Full Stack Developer</strong> positions at <strong>Combo Square</strong>, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing full-stack applications using React.js, Node.js, Express.js, JavaScript, TypeScript, SQL databases, and REST APIs.</p>
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
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available for remote work or relocation.</p>
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
    company: "Placemein Jobs",
    recruiterName: "Nikhila A",
    email: "Nikhila.a@placemein.com",
    role: "Full Stack & AI Engineer",
    location: "Hyderabad",
    subject: "Application for Full Stack & AI Backend Developer – Murali Krishna Popuri",
    plainBody: `Hi Nikhila,

I saw your hiring post on LinkedIn regarding developer opportunities in Hyderabad, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing scalable web applications and backend services with Node.js, Express.js, React.js, JavaScript, TypeScript, and SQL databases.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for WFO.

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
  <p>Hi Nikhila,</p>
  <p>I saw your hiring post on LinkedIn regarding developer opportunities in Hyderabad, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing scalable web applications and backend services with Node.js, Express.js, React.js, JavaScript, TypeScript, and SQL databases.</p>
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
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad for WFO.</p>
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
    company: "Green-buds Info Technology / Brillio",
    recruiterName: "Gowtham Kumar",
    email: "bsgowthamkumar@greenbudstechnology.com",
    role: "Production Full Stack / Backend Engineer",
    location: "Hyderabad / Bangalore",
    subject: "Application for Full Stack / Backend Developer – Murali Krishna Popuri",
    plainBody: `Hi Gowtham,

I saw your hiring post on LinkedIn regarding developer opportunities in Hyderabad and Bangalore, and I would like to submit my application as an immediate joiner.

I have 2 years of professional software engineering experience developing full-stack web applications, REST APIs, and backend services with Node.js, Express.js, React.js, JavaScript, TypeScript, and SQL databases.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for onsite work.

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
  <p>Hi Gowtham,</p>
  <p>I saw your hiring post on LinkedIn regarding developer opportunities in Hyderabad and Bangalore, and I would like to submit my application as an immediate joiner.</p>
  <p>I have 2 years of professional software engineering experience developing full-stack web applications, REST APIs, and backend services with Node.js, Express.js, React.js, JavaScript, TypeScript, and SQL databases.</p>
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
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bangalore for onsite work.</p>
  <p>I have attached my resume (<strong>${path.basename(RESUME_PATH)}</strong>) for your review. Thank you for your time and consideration, and I look forward to hearing from you.</p>
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
  console.log(`Feed Leads Batch Dispatcher (${leads.length} Leads)`);
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
