#!/usr/bin/env node

/**
 * ============================================================
 *  🎯 Fast ATS Per-Company Resume Generator
 *  Author: Murali Krishna Popuri
 * ============================================================
 *  Rules:
 *   • Strictly 2 years experience (never "2+")
 *   • Immediate Joiner (Official LWD: Nov 11, negotiable)
 *   • Locked Skills ONLY:
 *      Languages & Frameworks: JavaScript (ES6+), TypeScript, React.js, Next.js, Node.js, Express.js, Electron.js, Redux, PHP
 *      Databases: MySQL, PostgreSQL, SQLite, MongoDB, Redis
 *      APIs & Integration: REST APIs, WebSockets, Webhooks, JWT, OAuth2
 *      AI Tooling: OpenAI API, Claude AI API, Agentic AI workflows, LLM-assisted development
 *      Tools & Platforms: Git, GitHub, AWS S3, Postman, VS Code, CLI
 *      Styling: Tailwind CSS, Bootstrap, HTML5, CSS3
 *   • Strict Exclusion: NO Kafka, NO ELK Stack, NO Elasticsearch/Logstash/Kibana/Grafana
 *   • Headless Chrome PDF compilation (< 1.5 seconds)
 * ============================================================
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ─── Command Line Argument Parsing ─────────────────────────────
const args = process.argv.slice(2);
function getArg(flag, defaultVal = "") {
  const idx = args.indexOf(flag);
  if (idx !== -1 && idx + 1 < args.length) {
    return args[idx + 1];
  }
  return defaultVal;
}

const companyName = getArg("--company", "Target Company");
const targetRole = getArg("--role", "Full-Stack Developer");
const requestedSkills = getArg("--skills", "React.js, Node.js, TypeScript, PostgreSQL, REST APIs");
const outputFile = getArg("--out", "");

// Clean company name for filename
const safeComp = companyName.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_");
const outputPdf = outputFile || path.join(__dirname, "dist_resumes", `Murali_Krishna_Popuri_${safeComp}.pdf`);
const tempHtml = path.join(__dirname, "dist_resumes", `temp_${safeComp}.html`);

// ─── Candidate Truth-Base ──────────────────────────────────────
const PROFILE = {
  name: "MURALI KRISHNA POPURI",
  phone: "+91 9347796811",
  email: "popurimurali16@gmail.com",
  location: "Vijayawada, India (Open to Relocation: Hyderabad / Bengaluru)",
  portfolio: "https://murali-portfolio-website.vercel.app",
  github: "https://github.com/Muralikrishnapopuri",
  linkedin: "https://linkedin.com/in/murali-krishna-popuri",
  experienceYears: "2 years",
  noticePeriod: "Immediate Joiner (Official LWD: Nov 11, negotiable for early release)",
};

// ─── Locked Master Skills (Strictly No Kafka, No ELK) ──────────
const LOCKED_SKILLS = {
  languages: [
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Electron.js",
    "Redux",
    "PHP",
  ],
  databases: ["MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis"],
  apis: ["REST APIs", "WebSockets", "Webhooks", "JWT", "OAuth2"],
  ai: ["OpenAI API", "Claude AI API", "Agentic AI workflows", "LLM-assisted development"],
  tools: ["Git", "GitHub", "AWS S3", "Postman", "VS Code", "CLI"],
  styling: ["Tailwind CSS", "Bootstrap", "HTML5", "CSS3"],
};

// ─── Dynamic Keyword Prioritizer ───────────────────────────────
function prioritizeSkills(skillList, jdKeywords) {
  const normJd = jdKeywords.toLowerCase();
  const prioritized = [];
  const rest = [];

  for (const skill of skillList) {
    const normSkill = skill.toLowerCase();
    // Check match without punctuation
    const cleanSkill = normSkill.replace(/[^a-z0-9]/g, "");
    if (
      normJd.includes(normSkill) ||
      (cleanSkill && normJd.includes(cleanSkill))
    ) {
      prioritized.push(skill);
    } else {
      rest.push(skill);
    }
  }
  return [...prioritized, ...rest];
}

const reqLow = requestedSkills.toLowerCase();
const isFrontend = reqLow.includes("react") || reqLow.includes("frontend") || reqLow.includes("ui") || reqLow.includes("next");
const isBackend = reqLow.includes("node") || reqLow.includes("backend") || reqLow.includes("express") || reqLow.includes("database") || reqLow.includes("postgres");

// Determine tailored role title
let displayRole = targetRole;
if (displayRole.toLowerCase() === "developer" || displayRole.toLowerCase() === "software engineer") {
  displayRole = "Full-Stack Developer";
}

// ─── Generate Tailored Summary ─────────────────────────────────
let tailoredSummary = `Results-driven ${displayRole} with 2 years of professional experience building responsive web applications, high-performance desktop systems (Electron), and reliable REST/WebSocket APIs. Proven hands-on expertise in React.js, TypeScript, Node.js, Express, and SQL/NoSQL databases. Immediate joiner with official Last Working Day on Nov 11 (fully negotiable for early release upon offer).`;

if (isFrontend && !isBackend) {
  tailoredSummary = `Results-driven Frontend Developer with 2 years of professional experience engineering responsive, high-speed user interfaces using React.js, Next.js, TypeScript, Redux, and Tailwind CSS. Experienced in state management, client-side performance, and cross-platform desktop UI with Electron. Immediate joiner with official Last Working Day on Nov 11 (negotiable for early release).`;
} else if (isBackend && !isFrontend) {
  tailoredSummary = `Results-driven Backend Developer with 2 years of professional experience architecting robust server-side applications, secure REST APIs, WebSocket channels, and relational database systems using Node.js, Express, PHP, PostgreSQL, MySQL, and Redis. Immediate joiner with official Last Working Day on Nov 11 (negotiable for early release).`;
}

// Re-ordered skills based on JD
const sortedLanguages = prioritizeSkills(LOCKED_SKILLS.languages, requestedSkills).join(", ");
const sortedDatabases = prioritizeSkills(LOCKED_SKILLS.databases, requestedSkills).join(", ");
const sortedApis = prioritizeSkills(LOCKED_SKILLS.apis, requestedSkills).join(", ");
const sortedAi = prioritizeSkills(LOCKED_SKILLS.ai, requestedSkills).join(", ");
const sortedTools = prioritizeSkills(LOCKED_SKILLS.tools, requestedSkills).join(", ");
const sortedStyling = prioritizeSkills(LOCKED_SKILLS.styling, requestedSkills).join(", ");

// ─── Experience Bullets (Strictly Verified, No Kafka/ELK) ───────
const youngMindsBullets = [
  "Built offline-first Windows desktop POS using Electron, React, TypeScript, Node.js, Express, and SQLite — enabling zero-internet continuous operations for billing and order processing.",
  "Designed and implemented local network (LAN) synchronization architecture connecting main cashier server with multiple terminal devices and waiter handhelds in real-time.",
  "Engineered reliable bi-directional cloud data synchronization engine with automated retry mechanisms, offline queueing, and duplicate transaction prevention.",
  "Integrated silent background thermal printing and network ESC/POS communication for instant receipt generation.",
  "Developed 4 role-based web platforms (Admin, Cashier, Waiter, and Digital Menu) using Node.js, Express, PHP, MySQL, and REST APIs, serving 100+ daily orders.",
];

// If frontend heavy, highlight UI first; if backend heavy, highlight server/LAN/sync first
if (isFrontend) {
  youngMindsBullets.sort((a, b) => (a.includes("React") ? -1 : 1));
}

// ─── HTML Resume Template (Strict 1-Page ATS Design) ───────────
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${PROFILE.name} - ${displayRole} Resume</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1a202c;
      line-height: 1.35;
      font-size: 10.5px;
      padding: 0.35in 0.42in;
      background: #ffffff;
      -webkit-font-smoothing: antialiased;
    }
    @page {
      size: letter;
      margin: 0;
    }
    .header {
      text-align: center;
      margin-bottom: 8px;
      border-bottom: 2px solid #1a365d;
      padding-bottom: 5px;
    }
    .name {
      font-size: 21px;
      font-weight: 700;
      color: #1a365d;
      letter-spacing: 0.8px;
      margin-bottom: 2px;
      text-transform: uppercase;
    }
    .title {
      font-size: 12.5px;
      font-weight: 600;
      color: #2b6cb0;
      margin-bottom: 3px;
    }
    .contact {
      font-size: 9.8px;
      color: #4a5568;
      margin-bottom: 2px;
    }
    .links {
      font-size: 9.8px;
      color: #718096;
    }
    .links a {
      color: #0284c7;
      text-decoration: none;
      font-weight: 500;
    }
    .section-title {
      font-size: 11.5px;
      font-weight: 700;
      color: #1a365d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #cbd5e0;
      padding-bottom: 1.5px;
      margin-top: 7px;
      margin-bottom: 4px;
    }
    .summary-text {
      color: #2d3748;
      text-align: justify;
      margin-bottom: 2px;
      line-height: 1.38;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 2px 8px;
      font-size: 10px;
    }
    .skill-cat {
      font-weight: 700;
      color: #2d3748;
      white-space: nowrap;
    }
    .skill-items {
      color: #4a5568;
    }
    .exp-item {
      margin-bottom: 5px;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 10.5px;
      color: #2d3748;
    }
    .exp-company {
      color: #1a365d;
    }
    .exp-role-row {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 2px;
    }
    .exp-tech {
      font-size: 9.5px;
      color: #0284c7;
      font-weight: 600;
      margin-bottom: 2px;
    }
    ul {
      padding-left: 14px;
      margin-top: 1px;
    }
    li {
      margin-bottom: 2px;
      color: #2d3748;
      line-height: 1.34;
    }
    .proj-item {
      margin-bottom: 4px;
    }
    .proj-header {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      font-weight: 700;
    }
    .proj-name {
      color: #1a365d;
    }
    .proj-link {
      color: #0284c7;
      text-decoration: none;
      font-size: 9.5px;
    }
    .edu-row {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
    }
    .cert-list {
      font-size: 10px;
      color: #2d3748;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header">
    <div class="name">${PROFILE.name}</div>
    <div class="title">${displayRole}</div>
    <div class="contact">
      ${PROFILE.location} &nbsp;|&nbsp; ${PROFILE.phone} &nbsp;|&nbsp; 
      <a href="mailto:${PROFILE.email}" style="color:#0284c7; text-decoration:none;">${PROFILE.email}</a>
    </div>
    <div class="links">
      <a href="${PROFILE.portfolio}">Portfolio</a> &nbsp;|&nbsp;
      <a href="${PROFILE.linkedin}">LinkedIn</a> &nbsp;|&nbsp;
      <a href="${PROFILE.github}">GitHub</a> &nbsp;|&nbsp;
      <span>Notice Period: Immediate (LWD: Nov 11, Negotiable)</span>
    </div>
  </div>

  <!-- SUMMARY -->
  <div class="section-title">Professional Summary</div>
  <div class="summary-text">${tailoredSummary}</div>

  <!-- TECHNICAL SKILLS -->
  <div class="section-title">Technical Skills</div>
  <div class="skills-grid">
    <div class="skill-cat">Languages & Frameworks:</div>
    <div class="skill-items">${sortedLanguages}</div>
    <div class="skill-cat">Databases:</div>
    <div class="skill-items">${sortedDatabases}</div>
    <div class="skill-cat">APIs & Integration:</div>
    <div class="skill-items">${sortedApis}</div>
    <div class="skill-cat">AI Tooling:</div>
    <div class="skill-items">${sortedAi}</div>
    <div class="skill-cat">Tools & Platforms:</div>
    <div class="skill-items">${sortedTools}</div>
    <div class="skill-cat">Styling & Markup:</div>
    <div class="skill-items">${sortedStyling}</div>
  </div>

  <!-- PROFESSIONAL EXPERIENCE -->
  <div class="section-title">Professional Experience (2 Years)</div>

  <div class="exp-item">
    <div class="exp-header">
      <span class="exp-company">YoungMinds Technology Solutions Pvt Ltd</span>
      <span>Feb 2025 – Present</span>
    </div>
    <div class="exp-role-row">
      <span>Full-Stack Developer — RestoSoft POS & Web Platform</span>
      <span>Vijayawada, India</span>
    </div>
    <div class="exp-tech">Stack: React.js, TypeScript, Node.js, Express, Electron, PHP, MySQL, SQLite, WebSockets, REST APIs</div>
    <ul>
      ${youngMindsBullets.map((b) => `<li>${b}</li>`).join("\n      ")}
    </ul>
  </div>

  <div class="exp-item">
    <div class="exp-header">
      <span class="exp-company">Codtech IT Solutions Pvt Ltd</span>
      <span>Sep 2024 – Oct 2024</span>
    </div>
    <div class="exp-role-row">
      <span>Full-Stack Developer Intern</span>
      <span>Remote</span>
    </div>
    <div class="exp-tech">Stack: React.js, Node.js, Express.js, MongoDB, REST APIs, Git</div>
    <ul>
      <li>Engineered a responsive e-commerce web platform using React.js and Node.js with secure REST API endpoints.</li>
      <li>Collaborated in an Agile development workflow writing unit tests, reviewing pull requests, and accelerating code delivery with AI tooling.</li>
    </ul>
  </div>

  <div class="exp-item">
    <div class="exp-header">
      <span class="exp-company">Chegg India Pvt Ltd</span>
      <span>Oct 2022 – Jan 2023</span>
    </div>
    <div class="exp-role-row">
      <span>Subject Matter Expert (Computer Science)</span>
      <span>Remote</span>
    </div>
    <ul>
      <li>Resolved 150+ complex computer science and web development problems, providing optimized code implementations and technical explanations.</li>
    </ul>
  </div>

  <!-- PROJECTS -->
  <div class="section-title">Key Projects</div>
  <div class="proj-item">
    <div class="proj-header">
      <span class="proj-name">Zestchat — Real-Time Messaging & AI Platform</span>
      <a class="proj-link" href="https://zestchat.vercel.app">zestchat.vercel.app</a>
    </div>
    <div class="exp-tech">Stack: React.js, Redux, Node.js, Express.js, PostgreSQL, WebSockets, Claude AI / OpenAI API, Node-Cron</div>
    <ul>
      <li>Engineered a full-featured real-time chat application with WebSocket bi-directional messaging, guest session auto-expiry, and connection pooling in PostgreSQL.</li>
      <li>Integrated RAG-based AI assistant using Claude / OpenAI APIs to deliver smart, context-aware query responses.</li>
    </ul>
  </div>

  <div class="proj-item">
    <div class="proj-header">
      <span class="proj-name">Pixel Polish — High-Performance Web Photo Editor</span>
      <a class="proj-link" href="https://pixelpolish.vercel.app">pixelpolish.vercel.app</a>
    </div>
    <div class="exp-tech">Stack: React.js, HTML5 Canvas, Node.js, Express.js, Multer, Cloudinary API</div>
    <ul>
      <li>Developed an in-browser photo editor supporting real-time filters (brightness, contrast, cropping) via HTML5 Canvas in &lt; 50ms.</li>
    </ul>
  </div>

  <!-- EDUCATION & CERTIFICATIONS -->
  <div class="section-title">Education & Certifications</div>
  <div class="edu-row">
    <div><strong>Amrita Sai Institute of Science & Technology</strong> — B.Tech in Computer Science (CGPA: 7.35)</div>
    <div>2019 – 2023</div>
  </div>
  <div class="cert-list" style="margin-top: 2px;">
    • <strong>Foundations of Prompt Engineering</strong> — AWS Training & Certification | <strong>Full Stack Developer Course</strong> — Simplilearn
  </div>

</body>
</html>`;

// ─── Render HTML & Compile PDF ─────────────────────────────────
fs.writeFileSync(tempHtml, htmlContent, "utf-8");

try {
  const chromeCmd = `google-chrome --headless --disable-gpu --no-sandbox --print-to-pdf="${outputPdf}" "${tempHtml}"`;
  execSync(chromeCmd, { stdio: "pipe" });

  // Verify file was written
  if (fs.existsSync(outputPdf)) {
    const stats = fs.statSync(outputPdf);
    console.log(`\n✔ Tailored ATS Resume generated successfully!`);
    console.log(`  🏢 Company:  ${companyName}`);
    console.log(`  💼 Role:     ${displayRole}`);
    console.log(`  📄 PDF Path: ${outputPdf}`);
    console.log(`  📦 Size:     ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    console.error(`✖ PDF generation failed: file not created.`);
    process.exit(1);
  }
} catch (err) {
  console.error(`✖ Error generating PDF via Chrome:`, err.message);
  process.exit(1);
} finally {
  // Clean up temp html
  if (fs.existsSync(tempHtml)) {
    fs.unlinkSync(tempHtml);
  }
}
