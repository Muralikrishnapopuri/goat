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

const resumePath = path.join(__dirname, "MURALI-KRISHNA.pdf");

if (!fs.existsSync(resumePath)) {
  console.error("FATAL ERROR: Resume PDF file not found at:", resumePath);
  process.exit(1);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Target Recruiter Applications (Tailored for 2+ Years Exp, Honest Experience Disclosure) ─────
const targetApplications = [
  {
    company: "NiSource Tech (CareerConnect)",
    targetEmail: "krishnaveni.s@nisourcetech.com",
    role: "Full Stack Developer - React + Node.js (2-3 Years)",
    subject: "Application for Full Stack Developer (React + Node.js) - Murali Krishna Popuri",
    body: `Hi Krishnaveni,

I am writing to express my strong interest in the Full Stack Developer (React + Node.js) role in Bengaluru.

I bring 2+ years of hands-on production experience building end-to-end web applications with React.js, Node.js, Express, JavaScript/TypeScript (ES6+), RESTful APIs, and database operations (PostgreSQL, MongoDB, SQL). In my work at YoungMinds Technology Solutions, I engineered real-time client-server communication, database schemas, and background event services with high reliability.

Key highlights of my background:
- Frontend: React.js, Next.js, TypeScript, state management, responsive UI development.
- Backend: Node.js, Express, REST API design, authentication, and third-party integrations.
- Databases: PostgreSQL, MySQL, MongoDB, and Redis caching.
- Availability: Immediate joiner (serving notice period, available to join with zero delay).
- Location: Open to Bengaluru (hybrid/on-site).

My resume (Murali_Krishna_Popuri_Full_Stack_Dev.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Krishnaveni,</p>
        <p>I am writing to express my strong interest in the <strong>Full Stack Developer (React + Node.js)</strong> role in Bengaluru.</p>
        <p>I bring <strong>2+ years of hands-on production experience</strong> building end-to-end web applications with <strong>React.js, Node.js, Express, JavaScript/TypeScript (ES6+), RESTful APIs, and database operations (PostgreSQL, MongoDB, SQL)</strong>. In my work at YoungMinds Technology Solutions, I engineered real-time client-server communication, database schemas, and background event services with high reliability.</p>
        <p><strong>Key highlights of my background:</strong></p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, Next.js, TypeScript, state management, responsive UI development.</li>
          <li><strong>Backend:</strong> Node.js, Express, REST API design, authentication, and third-party integrations.</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, and Redis caching.</li>
          <li><strong>Availability:</strong> Immediate joiner (serving notice period, available to join with zero delay).</li>
          <li><strong>Location:</strong> Open to Bengaluru (hybrid/on-site).</li>
        </ul>
        <p>My resume (<strong>Murali_Krishna_Popuri_Full_Stack_Dev.pdf</strong>) is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Kiash Solutions LLP",
    targetEmail: "chetan@kiashsolutions.com",
    role: "React / Node.js Developer (Job ID: 244730)",
    subject: "Application for 244730: React / Node.js Developer - Hyderabad - Murali Krishna Popuri",
    body: `Hi Chetan,

I am applying for the React / Node.js Developer position in Hyderabad (Job ID: 244730).

I am a Full-Stack Developer with 2+ years of experience building modern web applications using React.js, Node.js, Express, TypeScript, and SQL/NoSQL databases. In my previous role at YoungMinds Technology Solutions, I built responsive frontend interfaces in React and robust backend microservices handling high concurrency and real-time event streaming.

Key details:
- Job ID: 244730 (React / Node.js Developer - Hyderabad)
- Relevant Experience: 2+ years
- Primary Skills: React.js, Node.js, Express, TypeScript, REST APIs, PostgreSQL, MongoDB
- Notice Period: Immediate joiner (available to join immediately)
- Location: Open to Hyderabad (on-site / hybrid)

Please find my resume attached for your consideration.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Chetan,</p>
        <p>I am applying for the <strong>React / Node.js Developer</strong> position in Hyderabad (<strong>Job ID: 244730</strong>).</p>
        <p>I am a Full-Stack Developer with <strong>2+ years of experience</strong> building modern web applications using <strong>React.js, Node.js, Express, TypeScript, and SQL/NoSQL databases</strong>. In my previous role at YoungMinds Technology Solutions, I built responsive frontend interfaces in React and robust backend microservices handling high concurrency and real-time event streaming.</p>
        <p><strong>Candidate Details:</strong></p>
        <ul style="padding-left: 20px;">
          <li><strong>Role & Job ID:</strong> 244730 - React / Node.js Developer</li>
          <li><strong>Relevant Experience:</strong> 2+ years</li>
          <li><strong>Primary Skills:</strong> React.js, Node.js, Express, TypeScript, REST APIs, PostgreSQL, MongoDB</li>
          <li><strong>Notice Period:</strong> Immediate joiner (available to join immediately)</li>
          <li><strong>Location:</strong> Open to Hyderabad (on-site / hybrid)</li>
        </ul>
        <p>Please find my resume attached for your consideration.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Programming.com",
    targetEmail: "shweta.rai@programming.com",
    role: "Senior Software Engineer (Node.js, React.js, TypeScript, AWS, Event-Driven)",
    subject: "Application for Software Engineer (Node.js, React.js, TypeScript) - Murali Krishna Popuri",
    body: `Hi Shweta,

I am writing regarding the Software Engineer openings at Programming.com in Hyderabad focusing on Node.js, React.js, TypeScript, AWS, and event-driven architecture.

While I understand you are seeking 6+ years of experience for senior mandates, I wanted to honestly share my profile. I bring 2+ years of intensive, production-grade full-stack development experience with the exact core technical stack:
- Backend: Node.js, Express, TypeScript, REST APIs, event-driven streaming with Apache Kafka.
- Frontend: React.js, Next.js, TypeScript, component architecture, state management.
- Data & Cloud: PostgreSQL, SQLite, MongoDB, Redis, Docker, and AWS deployments.
- High Ownership: Built offline-first synchronized enterprise POS and real-time data sync systems with zero-loss delivery.
- Availability: Immediate joiner with zero notice period.

I am a quick learner who adapts rapidly to complex enterprise codebases and can add immediate velocity to your engineering team.

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811 / +91 7499726447
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Shweta,</p>
        <p>I am writing regarding the <strong>Software Engineer</strong> openings at Programming.com in Hyderabad focusing on <strong>Node.js, React.js, TypeScript, AWS, and event-driven architecture</strong>.</p>
        <p>While I understand your posting mentions 6+ years of experience, I wanted to honestly share my background. I bring <strong>2+ years of intensive, production-grade full-stack experience</strong> directly aligned with your core requirements:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Backend:</strong> Node.js, Express, TypeScript, REST APIs, and event-driven streaming with Apache Kafka.</li>
          <li><strong>Frontend:</strong> React.js, Next.js, TypeScript, reusable component architecture, state management.</li>
          <li><strong>Data & Cloud:</strong> PostgreSQL, SQLite, MongoDB, Redis, Docker, and AWS environments.</li>
          <li><strong>Architecture:</strong> Built offline-first synchronized enterprise systems with real-time bidirectional syncing.</li>
          <li><strong>Availability:</strong> Immediate joiner (serving notice period, can join immediately).</li>
        </ul>
        <p>I am a fast learner with strong engineering fundamentals who takes end-to-end ownership. My resume is attached for your evaluation.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "MeeGen Solutions LLP",
    targetEmail: "chitra@meegen.in",
    role: "Full Stack Developer - UI Development (Python + React/Angular + REST APIs)",
    subject: "Application for Full Stack Developer - UI Development - Murali Krishna Popuri",
    body: `Hi Chitra,

I am writing to apply for the Full Stack Developer - UI Development role in Hyderabad for your MNC client.

While the requirement indicates 3-6 years, I would like to honestly present my 2+ years of professional full-stack development experience with strong hands-on expertise across both modern UI and backend APIs:
- Frontend UI: React.js, Next.js, Angular, TypeScript, JavaScript, HTML5/CSS3, responsive web architecture.
- Backend & APIs: RESTful API design, FastAPI/Express/Node.js, microservices, and database integration.
- Containers & Tools: Docker, Kubernetes basics, Git, CI/CD pipelines, Jest/unit testing.
- Databases: PostgreSQL, MySQL, and MongoDB.

I am based in/open to Hyderabad, serving my notice period, and can join immediately.

Required Information:
- Current Location: Andhra Pradesh / Open to Hyderabad
- Notice Period: Immediate Joiner (0 days)
- Total Experience: 2+ Years Full-Stack Development

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Chitra,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer - UI Development</strong> role in Hyderabad for your MNC client.</p>
        <p>While the posting references 3-6 years of experience, I would like to honestly share my <strong>2+ years of professional full-stack development experience</strong> with deep hands-on expertise across modern UI and backend APIs:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend UI:</strong> React.js, Next.js, Angular, TypeScript, JavaScript, HTML5/CSS3, responsive UI design.</li>
          <li><strong>Backend & APIs:</strong> RESTful API development, FastAPI, Node.js/Express, authentication, and microservices.</li>
          <li><strong>Containers & DevOps:</strong> Docker, Kubernetes fundamentals, Git version control, CI/CD workflows.</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, and MongoDB.</li>
        </ul>
        <p><strong>Candidate Details:</strong></p>
        <ul style="padding-left: 20px;">
          <li><strong>Current Location:</strong> Andhra Pradesh (Open to relocate to Hyderabad immediately)</li>
          <li><strong>Notice Period:</strong> Immediate Joiner (0 days)</li>
          <li><strong>Total Experience:</strong> 2+ Years Full-Stack Development</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "DPR Solutions Inc",
    targetEmail: "Manjusha@dprsolutionsinc.com",
    role: "Python Full Stack Developer (Python + React + AI)",
    subject: "Application for Python Full Stack Developer (Python + React + AI) - Murali Krishna Popuri",
    body: `Hi Manjusha,

I am writing to apply for the Python Full Stack Developer (Python + React + AI) position in Bengaluru.

While your posting requests 6+ years, I wanted to honestly share my background as a Full-Stack Developer with 2+ years of intensive production experience directly aligned with your core requirements:
- React.js & Frontend: Building scalable, component-driven UI applications with TypeScript, JavaScript, and modern state management.
- Python & Backend: Developing REST APIs, data parsing, and backend services with Python/Node.js.
- AI & GenAI: Hands-on implementation of Retrieval-Augmented Generation (RAG), vector context handling, and LLM APIs (Claude AI, OpenAI).
- Availability: Immediate joiner (can join within 0 to 15 days, fully aligned with your C2H mandate).
- Location: Open to Bengaluru.

I am an energetic engineer capable of delivering production code rapidly. My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Manjusha,</p>
        <p>I am writing to apply for the <strong>Python Full Stack Developer (Python + React + AI)</strong> position in Bengaluru.</p>
        <p>While your posting mentions 6+ years of experience, I wanted to honestly share my background as a Full-Stack Developer with <strong>2+ years of intensive production experience</strong> directly aligned with your tech stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>React.js & Frontend:</strong> Scalable, component-driven UI applications with TypeScript, JavaScript, and responsive design.</li>
          <li><strong>Python & Backend:</strong> REST APIs, backend services, and database integration using Python and Node.js.</li>
          <li><strong>AI & GenAI:</strong> Hands-on implementation of Retrieval-Augmented Generation (RAG), embeddings, and LLM APIs (Claude AI, OpenAI).</li>
          <li><strong>Availability:</strong> Immediate joiner (available to join within 0 to 15 days, comfortable with C2H).</li>
          <li><strong>Location:</strong> Open to Bengaluru (on-site / hybrid).</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Mobikode",
    targetEmail: "asmita.dhopte@mobikode.com",
    role: "Full Stack React, Python, TypeScript, AI/ML / GenAI",
    subject: "Application for Full Stack React / Python / TypeScript / GenAI - Murali Krishna Popuri",
    body: `Hi Asmita,

I am writing regarding the Full Stack (React, Python, TypeScript, AI/GenAI) opening.

While your post specifies 5+ years, I wanted to honestly put forward my candidacy. I bring 2+ years of active production experience in the core stack:
- Hands-on React / React.js and TypeScript frontend engineering.
- Python & Node.js backend development, REST API design, and database modeling (PostgreSQL, MongoDB).
- Practical implementation of AI/ML, Generative AI (RAG architecture and LLM API integrations).
- Location & Notice: Currently based in Andhra Pradesh, open to Remote / Hyderabad / Bangalore, available to join immediately (0-15 days notice).

I am an agile engineer who takes deep ownership of features and delivers clean, reliable code.

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Asmita,</p>
        <p>I am writing regarding the <strong>Full Stack (React, Python, TypeScript, AI/GenAI)</strong> opening.</p>
        <p>While your post notes 5+ years of experience, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> directly centered on your required stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, TypeScript, JavaScript, responsive UI development.</li>
          <li><strong>Backend:</strong> Python & Node.js backend development, REST API design, and databases (PostgreSQL, MongoDB).</li>
          <li><strong>AI / GenAI:</strong> Hands-on experience with Retrieval-Augmented Generation (RAG) and LLM integrations.</li>
          <li><strong>Availability:</strong> Immediate joiner (0-15 days notice), open to Remote, Hyderabad, or Bangalore.</li>
        </ul>
        <p>My resume is attached for your consideration.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Infojini Consulting",
    targetEmail: "kanchan.manral@infojiniconsulting.com",
    role: "Fullstack Developer (React JS, Postgres, APIs, AWS, Python) - Hyderabad",
    subject: "Application for Fullstack Developer (React JS, Postgres, AWS) - Murali Krishna Popuri",
    body: `Hi Kanchan,

I am writing to apply for the Fullstack Developer position in Hyderabad.

While the role notes 3-6 years of experience, I would like to honestly share my 2+ years of production experience matching your core stack:
- Modern Web Technologies: React.js, TypeScript, JavaScript, HTML5/CSS3.
- Backend & Microservices: RESTful API design, Python and Node.js microservices.
- Databases: PostgreSQL, Oracle/SQL concepts, data modeling.
- Cloud & CI/CD: AWS experience, Docker containers, Git workflows.
- Location & Availability: Available for in-person interviews and immediate joining in Hyderabad.

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Kanchan,</p>
        <p>I am writing to apply for the <strong>Fullstack Developer</strong> position in Hyderabad.</p>
        <p>While the posting indicates 3-6 years of experience, I would like to honestly present my <strong>2+ years of professional full-stack development experience</strong> matching your technology stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>UI Development:</strong> React.js, TypeScript, JavaScript, responsive web design.</li>
          <li><strong>Backend:</strong> REST API development, Python and Node.js microservices.</li>
          <li><strong>Databases:</strong> PostgreSQL, SQL query optimization, data architecture.</li>
          <li><strong>Cloud & Tools:</strong> AWS cloud services, Docker, Git, and automated testing tools (Postman).</li>
          <li><strong>Notice Period:</strong> Immediate joiner, available for in-person discussions in Hyderabad.</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "RARR Technologies",
    targetEmail: "ashu.sharma@rarrtech.com",
    role: "Kafka & Application Support / Backend Systems Engineer",
    subject: "Application for Kafka & Application Production Support Engineer - Murali Krishna Popuri",
    body: `Hi Ashu,

I am writing regarding the Kafka Administrator / Application Production Support opening in Hyderabad/Bangalore.

While the posting mentions 3-8 years, I wanted to honestly highlight my 2+ years of hands-on technical experience with event streaming and backend infrastructure:
- Apache Kafka: Experience integrating Kafka message brokers for real-time event streaming and synchronization between distributed terminals.
- Databases & SQL: Solid PostgreSQL and SQL query skills for data-level investigation and verification.
- Application Log Analysis: Strong ability to interpret React and Node/Spring application logs, diagnose errors, and document root causes.
- Linux & Scripting: Linux command-line diagnostics, bash/shell scripting, and Python scripting for operational checks.
- Availability: Immediate joiner, willing to work in Hyderabad or Bangalore.

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Ashu,</p>
        <p>I am writing regarding the <strong>Kafka Administrator / Application Production Support</strong> position in Hyderabad/Bangalore.</p>
        <p>While your post notes 3-8 years of experience, I wanted to honestly share my <strong>2+ years of hands-on production experience</strong> with distributed event systems and application debugging:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Event Streaming:</strong> Integrated Apache Kafka for real-time event streaming and synchronization across distributed clients.</li>
          <li><strong>Databases:</strong> Solid PostgreSQL/SQL skills for data investigation, queries, and performance troubleshooting.</li>
          <li><strong>Log Analysis:</strong> Practical experience analyzing React frontend and backend application logs to isolate failures.</li>
          <li><strong>Linux & Scripting:</strong> Linux CLI analysis, Unix tools, and Python scripting for rapid checks.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 days notice), open to Hyderabad/Bangalore.</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Visionyle",
    targetEmail: "valliammai@visionyle.com",
    role: "Full Stack AI Developer / AI Engineer",
    subject: "Application for AI Engineer / Full Stack AI Developer - Murali Krishna Popuri",
    body: `Hi Valliammai,

I am writing regarding the AI Engineer / Full Stack AI Developer position in Hyderabad/Bangalore.

While I understand the posting indicates 8+ years, I wanted to honestly put forward my profile as a hands-on developer with 2+ years of intensive experience in modern full-stack development and practical AI/ML implementation:
- Full-Stack Skills: React.js, TypeScript, JavaScript, Python, and Node.js.
- REST API & Microservices: Designing scalable REST APIs, authentication, and database schemas.
- AI & GenAI: Hands-on implementation of Retrieval-Augmented Generation (RAG), embeddings, and LLM APIs (Claude AI, OpenAI).
- Databases & Containers: PostgreSQL, MongoDB, Docker containerization.
- Notice Period: Immediate joiner (0 days notice, serving notice period).

I am confident I can contribute rapidly to designing and deploying resilient AI workloads. My resume is attached for your consideration.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Valliammai,</p>
        <p>I am writing regarding the <strong>AI Engineer / Full Stack AI Developer</strong> position in Hyderabad/Bangalore.</p>
        <p>While the posting indicates 8+ years of experience, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong> combining full-stack web engineering and hands-on AI/GenAI integrations:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Tech Stack:</strong> React.js, TypeScript, JavaScript, Python, Node.js, and REST APIs.</li>
          <li><strong>AI & GenAI:</strong> Hands-on implementation of Retrieval-Augmented Generation (RAG), prompt architecture, and LLM API integrations.</li>
          <li><strong>Databases & Infrastructure:</strong> PostgreSQL, MongoDB, Docker containers, and Git version control.</li>
          <li><strong>Availability:</strong> Immediate joiner (less than 30 days / immediate availability).</li>
        </ul>
        <p>My resume is attached for your consideration.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Stag Innovations",
    targetEmail: "resumes@staginvs.com",
    role: "Full Stack Developer (React / Angular, Microservices, AWS) - Hyderabad",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Navya,

I am writing regarding the Full Stack Developer opening in Hyderabad.

While the post mentions senior leadership, I wanted to honestly present my background as a hands-on Full-Stack Developer with 2+ years of intensive production experience:
- Frontend: React.js, Next.js, Angular, TypeScript, and responsive UI engineering.
- Backend: RESTful APIs, Node.js/Express, microservices, and event processing.
- Cloud & Infrastructure: AWS services, Docker, Git workflows, and CI/CD pipelines.
- Notice Period: Immediate joiner (serving notice period, can join immediately in Hyderabad).

I take high ownership of deliverables and deliver clean, maintainable code. My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Navya,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Hyderabad.</p>
        <p>While the posting references senior experience, I wanted to honestly share my background as a hands-on Full-Stack Developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, Next.js, Angular, TypeScript, and responsive UI engineering.</li>
          <li><strong>Backend:</strong> RESTful APIs, Node.js, microservices architecture, and event processing.</li>
          <li><strong>Cloud & DevOps:</strong> AWS cloud environments, Docker containers, and Git workflows.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 days notice), open to working from Hyderabad office.</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Future Links",
    targetEmail: "anshu.k@future-links.in",
    role: "Full Stack Developer (React/Angular, REST APIs, SQL, AI) - Hyderabad/Bengaluru",
    subject: "Application for Full Stack Developer (React / REST APIs / AI) - Murali Krishna Popuri",
    body: `Hi Anshu,

I am writing regarding the Full Stack Developer opening in Hyderabad/Bangalore.

While your requirement specifies 8-12 years, I wanted to honestly put forward my candidacy. I bring 2+ years of hands-on production experience matching your core technical needs:
- Frontend: React.js, Angular, TypeScript, and modern component architecture.
- Backend & APIs: RESTful APIs, microservices integration, and backend services.
- AI Knowledge: Hands-on implementation of AI/LLM integrations, RAG architecture, and Claude AI API.
- Database: SQL (PostgreSQL, MySQL, SQL Server fundamentals).
- Notice Period: Immediate joiner (currently serving notice period, available to join immediately).

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Anshu,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Hyderabad/Bangalore.</p>
        <p>While your posting notes 8-12 years of experience, I wanted to honestly share my background. I bring <strong>2+ years of hands-on production experience</strong> aligned with your core requirements:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, Angular, TypeScript, and responsive UI design.</li>
          <li><strong>Backend & APIs:</strong> RESTful APIs, microservices integration, and database operations.</li>
          <li><strong>AI Knowledge:</strong> Hands-on implementation of AI/LLM integrations, RAG workflows, and Claude AI APIs.</li>
          <li><strong>Database:</strong> SQL (PostgreSQL, MySQL, SQL Server fundamentals).</li>
          <li><strong>Availability:</strong> Immediate joiner (available to join with zero delay).</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Tanisha Systems",
    targetEmail: "akumar@tanishasystems.com",
    role: "Developer / Full Stack with Claude AI Experience - Hyderabad",
    subject: "Application for Full Stack Developer (with Claude AI experience) - Murali Krishna Popuri",
    body: `Hi Ashish,

I am writing regarding the Developer opening in Hyderabad requiring Full Stack development and hands-on experience with Claude (AI).

While your post mentions 7-12 years, I wanted to honestly share my background. I bring 2+ years of professional full-stack development experience with direct, hands-on production experience implementing Claude AI:
- Claude AI & GenAI: Integrated Claude AI API in production for context-aware assistance, RAG query pipelines, and automated processing.
- Full Stack Engineering: React.js, TypeScript, Node.js, Express, REST APIs, and database architecture.
- Cloud & Infrastructure: Azure cloud exposure, Git version control, and CI/CD workflows.
- Notice Period: Immediate joiner (0 to 10 days availability).

I am based in/open to Hyderabad and ready to contribute immediately. My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Ashish,</p>
        <p>I am writing regarding the <strong>Developer</strong> opening in Hyderabad requiring Full Stack skills and <strong>hands-on experience with Claude (AI)</strong>.</p>
        <p>While the posting mentions 7-12 years, I wanted to honestly present my <strong>2+ years of professional full-stack development experience</strong> featuring direct, hands-on experience with Claude AI:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Claude AI & GenAI:</strong> Integrated Claude AI API in production for context-aware query responses, RAG architecture, and agentic workflows.</li>
          <li><strong>Full Stack:</strong> React.js, TypeScript, Node.js, Express, REST APIs, and SQL databases.</li>
          <li><strong>Cloud & DevOps:</strong> Azure cloud exposure, Git, and automated testing.</li>
          <li><strong>Notice Period:</strong> Immediate joiner (0 to 10 days availability).</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "EITS",
    targetEmail: "manju.eits@gmail.com",
    role: "Java Full Stack Developer - GenAI - Bangalore / Hyderabad",
    subject: "Application for Full Stack Developer - GenAI - Murali Krishna Popuri",
    body: `Hi Manjuladevi,

I am writing to apply for the Full Stack Developer - GenAI role in Bangalore / Hyderabad.

While the post mentions 5+ years, I wanted to honestly share my background. I bring 2+ years of hands-on production experience in full-stack development combined with active Generative AI engineering:
- Frontend & Backend: React.js, TypeScript, Node.js, REST APIs, and robust application architecture.
- Generative AI: Practical implementation of RAG (Retrieval-Augmented Generation) and LLM APIs.
- Databases: Hands-on with MongoDB and RDBMS (PostgreSQL, MySQL).
- Notice Period: Immediate joiner (serving notice period, can join immediately).

Candidate Details:
- Total Experience: 2+ Years
- Relevant Experience: 2+ Years Full Stack + GenAI
- Notice Period: Immediate Joiner (0 days)
- Preferred Location: Hyderabad / Bangalore

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Manjuladevi,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer - GenAI</strong> role in Bangalore / Hyderabad.</p>
        <p>While the posting specifies 5+ years of experience, I wanted to honestly share my background as a developer with <strong>2+ years of intensive production experience</strong> combining full-stack development and Generative AI:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend & Backend:</strong> React.js, TypeScript, Node.js, Express, REST APIs, and microservices.</li>
          <li><strong>Generative AI:</strong> Hands-on implementation of RAG pipelines, embeddings, and LLM APIs.</li>
          <li><strong>Databases:</strong> MongoDB and RDBMS (PostgreSQL, MySQL).</li>
          <li><strong>Notice Period:</strong> Immediate joiner (0 days).</li>
          <li><strong>Preferred Location:</strong> Hyderabad / Bangalore.</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Sampradaa Software Technologies",
    targetEmail: "sonika@sampradaa.in",
    role: "Python Full-Stack Developer - Hyderabad",
    subject: "Application for Python Full-Stack Developer - Murali Krishna Popuri",
    body: `Hi Sonika,

I am writing regarding the Python Full-Stack Developer position in Hyderabad.

While the posting mentions 8-15 years, I would like to honestly put forward my candidacy. I bring 2+ years of production experience with Python backend development, modern frontend engineering, and RESTful API integrations:
- Python & Backend: Python development, FastAPI, REST APIs, and backend service integration.
- Frontend: Angular and React.js, TypeScript, HTML5/CSS3.
- Architecture: Microservices, BFF concepts, API testing, and logging diagnostics.
- Containers: Docker containerization, Git version control, and CI/CD pipelines.
- Availability: Immediate joiner, available for face-to-face discussions in Hyderabad.

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Sonika,</p>
        <p>I am writing regarding the <strong>Python Full-Stack Developer</strong> position in Hyderabad.</p>
        <p>While the posting indicates 8-15 years, I would like to honestly present my <strong>2+ years of production experience</strong> covering Python backend development, modern UI, and RESTful APIs:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Backend:</strong> Python development, FastAPI, REST APIs, and backend integration.</li>
          <li><strong>Frontend:</strong> Angular and React.js, TypeScript, responsive interfaces.</li>
          <li><strong>Architecture:</strong> Microservices, API testing, and logging diagnostics across databases and servers.</li>
          <li><strong>Containers & Tools:</strong> Docker, Git version control, and CI/CD pipelines.</li>
          <li><strong>Availability:</strong> Immediate joiner, available for F2F discussions in Hyderabad.</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "MCGBS",
    targetEmail: "chaithra@mcgbs.com",
    role: "Senior Fullstack Developer (TypeScript, APIs, MongoDB) - Hyderabad",
    subject: "Application for Fullstack Developer (TypeScript, APIs, MongoDB) - Murali Krishna Popuri",
    body: `Hi Chaithra,

I am writing regarding the Senior Fullstack Developer role in Hyderabad.

While the role requests 10+ years, I wanted to honestly share my profile. I bring 2+ years of intensive production experience working with your core technologies:
- Frontend: Angular and React.js, TypeScript, component styling, and state management.
- Backend & APIs: RESTful Web APIs, Node.js/Express, microservices, and end-to-end troubleshooting.
- Storage & Data: MongoDB, SQLite, and PostgreSQL database management.
- Notice Period: Immediate joiner (0 to 15 days, available to join with zero delay in Hyderabad).

My resume is attached for your consideration.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Chaithra,</p>
        <p>I am writing regarding the <strong>Fullstack Developer</strong> role in Hyderabad.</p>
        <p>While the posting indicates 10+ years of experience, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> matching your core requirements:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> Angular, React.js, TypeScript, and modern component development.</li>
          <li><strong>Backend:</strong> RESTful Web APIs, backend services, and end-to-end troubleshooting.</li>
          <li><strong>Data & Storage:</strong> MongoDB, SQLite, and PostgreSQL.</li>
          <li><strong>Notice Period:</strong> Immediate joiner (0 to 15 days, ready to join on-site in Hyderabad).</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Tekskills Inc",
    targetEmail: "manjunath.s@tekskills.in",
    role: "Full Stack Engineer (React, Microservices, REST APIs, AWS) - Hyderabad / Bangalore",
    subject: "Application for Full Stack Engineer (React, APIs, AWS) - Murali Krishna Popuri",
    body: `Hi Manjunath,

I am writing regarding the Full Stack opportunity in Hyderabad / Bangalore.

While your posting seeks a 12+ years lead, I wanted to honestly present my profile as an individual contributor. I bring 2+ years of hands-on full-stack development experience covering your key technical requirements:
- Frontend: React.js, JavaScript (ES6+), HTML5/CSS3, component design.
- Backend & Microservices: REST APIs, microservices integration, and backend services.
- Databases: PostgreSQL, MySQL, and MongoDB.
- Cloud & DevOps: AWS services, Docker containers, and Git workflows.
- Notice Period: Immediate joiner (serving notice period, can join immediately, comfortable with C2H and F2F interviews).

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Manjunath,</p>
        <p>I am writing regarding the <strong>Full Stack</strong> opportunity in Hyderabad / Bangalore.</p>
        <p>While the posting seeks a senior lead, I wanted to honestly share my background as a hands-on developer with <strong>2+ years of production experience</strong> covering your core requirements:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, JavaScript (ES6+), HTML5/CSS3, responsive UI development.</li>
          <li><strong>Backend:</strong> REST APIs, microservices integration, and scalable services.</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, and MongoDB.</li>
          <li><strong>DevOps & Cloud:</strong> AWS cloud, Docker containers, and Git CI/CD.</li>
          <li><strong>Availability:</strong> Immediate joiner (available for F2F interview, open to C2H).</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "People Prime Worldwide",
    targetEmail: "sowmya.b@people-prime.com",
    role: "Full Stack Developer (HTML, CSS, JavaScript, APIs) - Hyderabad/Bangalore",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Sowmya,

I am writing to apply for the Full Stack Developer opening in Bangalore/Hyderabad.

While the role specifies 6+ years, I wanted to honestly put forward my profile. I bring 2+ years of hands-on production experience in end-to-end web engineering:
- Frontend: HTML5, CSS3, JavaScript, TypeScript, React.js, and responsive interfaces.
- Backend: RESTful APIs, Node.js/Express, server-side data flows, and database management.
- Availability: Immediate joiner (serving notice period, can join immediately, comfortable with C2H).
- Locations: Open to Hyderabad or Bangalore (Hybrid).

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Sowmya,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer</strong> opening in Bangalore/Hyderabad.</p>
        <p>While the posting mentions 6+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript, TypeScript, React.js, responsive web design.</li>
          <li><strong>Backend:</strong> RESTful APIs, Node.js/Express, and database integration.</li>
          <li><strong>Availability:</strong> Immediate joiner (available to join with zero delay, open to C2H).</li>
          <li><strong>Location:</strong> Open to Hyderabad or Bangalore.</li>
        </ul>
        <p>My resume is attached for your consideration.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "Varthak Technologies",
    targetEmail: "recruit@varthak.io",
    role: "Functional / Full-Stack Developer - Bengaluru",
    subject: "Application for Developer / Automation Engineer - Murali Krishna Popuri",
    body: `Hi Hiring Team at Varthak Technologies,

I am writing regarding the Developer opening at Varthak Technologies in Bengaluru.

I am a Full-Stack Developer with 2+ years of hands-on experience building web applications, workflows, REST API integrations, and database schemas. I have experience building end-to-end client solutions, automated business workflows, and integrating third-party services.

Key details:
- Experience: 2+ years of professional development experience
- Technical Skills: JavaScript/TypeScript, React.js, Node.js, REST APIs, SQL/NoSQL databases, workflow automation
- Availability: Immediate joiner (serving notice period, can join immediately)
- Work Mode: Ready for on-site role in Bengaluru

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Hiring Team at Varthak Technologies,</p>
        <p>I am writing regarding the <strong>Developer</strong> opening at Varthak Technologies in Bengaluru.</p>
        <p>I am a Full-Stack Developer with <strong>2+ years of hands-on experience</strong> building web applications, workflows, REST API integrations, and database schemas. I have experience building end-to-end client solutions, automated business workflows, and integrating third-party services.</p>
        <ul style="padding-left: 20px;">
          <li><strong>Experience:</strong> 2+ years of professional development experience</li>
          <li><strong>Technical Skills:</strong> JavaScript/TypeScript, React.js, Node.js, REST APIs, SQL/NoSQL databases, workflow automation</li>
          <li><strong>Availability:</strong> Immediate joiner (serving notice period, can join immediately)</li>
          <li><strong>Work Mode:</strong> Ready for on-site role in Bengaluru</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
  {
    company: "MSPC Services Pvt Ltd",
    targetEmail: "sumitha@spc-services.net",
    role: "Full Stack Consultant - Bengaluru / Hyderabad",
    subject: "Application for Full Stack Consultant - Murali Krishna Popuri",
    body: `Hi Sumitha,

I am writing regarding the Full Stack opportunities with MSPC Services in Bengaluru / Hyderabad.

While your posting mentions senior roles, I wanted to honestly share my background. I bring 2+ years of intensive full-stack development experience working with modern web architectures, REST APIs, and database engineering:
- Frontend: React.js, TypeScript, JavaScript (ES6+), HTML5/CSS3.
- Backend: REST APIs, Node.js/Express, microservices, and database query optimization (PostgreSQL, SQL, MySQL).
- Notice Period: Immediate joiner (serving notice period, available to join with zero delay).
- Locations: Open to Bengaluru or Hyderabad (Hybrid/On-site).

My resume is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Sumitha,</p>
        <p>I am writing regarding the <strong>Full Stack</strong> opportunities with MSPC Services in Bengaluru / Hyderabad.</p>
        <p>While the posting mentions senior roles, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong> in modern web architectures and database engineering:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, TypeScript, JavaScript (ES6+), HTML5/CSS3.</li>
          <li><strong>Backend:</strong> REST APIs, Node.js/Express, and database query optimization (PostgreSQL, SQL, MySQL).</li>
          <li><strong>Notice Period:</strong> Immediate joiner (serving notice period, available to join immediately).</li>
          <li><strong>Location:</strong> Open to Bengaluru or Hyderabad.</li>
        </ul>
        <p>My resume is attached for your review.</p>
        <p style="margin-top: 16px;">
          <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a><br/>
          <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a><br/>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
        </p>
        <p style="margin-top: 16px;">
          Best regards,<br/>
          <strong>Murali Krishna Popuri</strong><br/>
          Phone: +91 9347796811<br/>
          Email: popurimurali16@gmail.com
        </p>
      </div>
    `,
  },
];

// ─── Recruiter Phone & WhatsApp Contacts Extracted from Feed ─────
const whatsappContacts = [
  {
    company: "Luxmorai Technologies Pvt Ltd",
    recruiter: "Lathika Adhira (HR Executive / Talent Acquisition)",
    phone: "+91 90474 71443",
    role: "Full Stack Developer / Python / React / Node.js (Chennai / Bengaluru / Remote)",
    note: "Recruiter specifically requested: 'share your resume through WhatsApp'",
    message: `Hi Lathika, I saw your post regarding Full Stack / Python / React / Node openings at Luxmorai Technologies. I am a Full-Stack Developer with 2+ years of hands-on experience in React.js, Node.js, Python, TypeScript, and SQL databases. I am an immediate joiner with zero notice period. Please find my resume attached for your consideration.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri (+91 9347796811)`,
  },
  {
    company: "Programming.com",
    recruiter: "Shweta Rai (Recruitment Team Leader)",
    phone: "+91 7499726447 / +91 9763840595",
    role: "Senior Software Engineer (Node.js, React.js, TypeScript, AWS, Event-Driven Architecture) - Hyderabad",
    note: "Recruiter provided two direct contact numbers in post",
    message: `Hi Shweta, I saw your post for Senior Software Engineer (Node.js, React.js, TypeScript, AWS, Event-Driven Architecture) at Programming.com in Hyderabad. While your posting requests senior experience, I bring 2+ years of intensive, production-grade full-stack experience building event-driven microservices with Kafka, Node.js, TypeScript, React.js, and AWS. I can join immediately with zero notice period.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri (+91 9347796811)`,
  },
  {
    company: "Stag Innovations",
    recruiter: "Navya Sri (Human Resources)",
    phone: "+91 7842308297",
    role: "Full Stack Developer (React / Angular, Microservices, AWS) - Hyderabad",
    note: "Recruiter listed WhatsApp: 7842308297 for direct applications",
    message: `Hi Navya, I noticed your post regarding Full Stack openings in Hyderabad (React, Microservices, AWS). I am a Full-Stack Developer with 2+ years of hands-on experience building React frontend applications and Node/Express microservices with AWS and SQL/NoSQL databases. I am an immediate joiner available in Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri (+91 9347796811)`,
  },
  {
    company: "Tanisha Systems",
    recruiter: "Ashish Kumar (Talent Acquisition / HR)",
    phone: "+91 96506 99335",
    role: "Full Stack Developer with Claude AI Experience - Hyderabad",
    note: "Recruiter listed direct phone number: +91 96506 99335",
    message: `Hi Ashish, I saw your opening for Full Stack Developer with Claude AI experience in Hyderabad. I am a Full-Stack Developer with 2+ years of experience building web applications with React, Node.js, REST APIs, and hands-on integration of Claude AI and LLM APIs in production. I am an immediate joiner based in Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri (+91 9347796811)`,
  },
  {
    company: "MSPC Services Pvt Ltd",
    recruiter: "Sumitha Rachakonda (Talent Acquisition)",
    phone: "+91 9618991222",
    role: "Full Stack Consultant - Bengaluru / Hyderabad",
    note: "Recruiter listed: 'Apply/Refer: sumitha@spc-services.net or WA to +919618991222'",
    message: `Hi Sumitha, I came across your post regarding Full Stack opportunities in Bengaluru and Hyderabad. I am a Full-Stack Developer with 2+ years of experience working with React, Node.js, SQL databases, and REST APIs. I am an immediate joiner serving notice period and available for roles in Hyderabad or Bengaluru.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri (+91 9347796811)`,
  },
  {
    company: "PRIMUS Global Technologies Pvt Ltd",
    recruiter: "Rajesh Kondamudi (Talent Acquisition Specialist)",
    phone: "+91 9701005708",
    role: "Full Stack Developer (React / Angular & Backend) - Hyderabad",
    note: "Recruiter listed direct phone number: +91 9701005708",
    message: `Hi Rajesh, I came across your posting for Full-Stack Developer opportunities in Hyderabad. I am a Full-Stack Developer with 2+ years of hands-on experience in React.js, TypeScript, REST APIs, and backend services. I am an immediate joiner with zero notice period.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri (+91 9347796811)`,
  },
];

const whatsappSummaryText = `RECRUITER PHONE & WHATSAPP CONTACTS (BATCH 3)
Generated strictly for Murali Krishna Popuri (${USER_NOTIFICATION_EMAIL})
Resume Sent to HRs: MURALI-KRISHNA.pdf

================================================================================
DIRECT WHATSAPP CONTACTS & READY-TO-COPY MESSAGES
================================================================================

${whatsappContacts
  .map(
    (c, idx) => `[${idx + 1}] ${c.company}
Recruiter: ${c.recruiter}
Phone / WhatsApp: ${c.phone}
Role: ${c.role}
Note: ${c.note}

Ready-to-Copy WhatsApp Message:
--------------------------------------------------
${c.message}
--------------------------------------------------
`
  )
  .join("\n\n")}

================================================================================
ALL HR APPLICATION EMAILS DISPATCHED IN THIS BATCH (WITH MURALI-KRISHNA.pdf)
================================================================================
${targetApplications
  .map(
    (a, idx) => `[${idx + 1}] ${a.company}
Email: ${a.targetEmail}
Role: ${a.role}
Subject: ${a.subject}`
  )
  .join("\n\n")}
`;

function buildHtmlSummary() {
  const contactCards = whatsappContacts
    .map(
      (c, idx) => `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div style="font-size: 16px; font-weight: bold; color: #0f172a; margin-bottom: 4px;">
          ${idx + 1}. ${c.company}
        </div>
        <div style="font-size: 13px; color: #475569; margin-bottom: 8px;">
          <strong>Recruiter:</strong> ${c.recruiter}<br/>
          <strong>Phone / WhatsApp:</strong> <a href="tel:${c.phone.replace(/[^0-9+]/g, "")}" style="color: #0284c7; font-weight: bold; text-decoration: none;">${c.phone}</a><br/>
          <strong>Role:</strong> ${c.role}<br/>
          <strong>Recruiter Note:</strong> <em>${c.note}</em>
        </div>
        <div style="margin-top: 10px;">
          <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #059669; letter-spacing: 0.5px; margin-bottom: 6px;">
            Ready-to-Copy WhatsApp Message:
          </div>
          <pre style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 13px; color: #0f172a; white-space: pre-wrap; word-break: break-word; margin: 0;">${c.message}</pre>
        </div>
      </div>
    `
    )
    .join("");

  const emailRows = targetApplications
    .map(
      (a, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 12px; font-size: 13px; color: #334155; font-weight: bold;">${idx + 1}</td>
        <td style="padding: 10px 12px; font-size: 13px; color: #0f172a; font-weight: 600;">${a.company}</td>
        <td style="padding: 10px 12px; font-size: 13px; color: #0284c7;">${a.targetEmail}</td>
        <td style="padding: 10px 12px; font-size: 13px; color: #334155;">${a.role}</td>
      </tr>
    `
    )
    .join("");

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 780px; margin: 0 auto; background: #f8fafc; padding: 24px; border-radius: 12px;">
      <div style="background: #0f172a; color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <h2 style="margin: 0 0 6px 0; font-size: 20px; color: #ffffff;">Recruiter WhatsApp Numbers & Outreach Summary (Batch 3)</h2>
        <p style="margin: 0; font-size: 13px; color: #94a3b8;">
          Candidate: <strong>Murali Krishna Popuri</strong> | Resume Attached: <strong>MURALI-KRISHNA.pdf</strong>
        </p>
      </div>

      <h3 style="font-size: 16px; color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 6px; margin-top: 24px; margin-bottom: 16px;">
        Recruiter Phone & WhatsApp Contacts (Ready-to-Copy Messages)
      </h3>
      ${contactCards}

      <h3 style="font-size: 16px; color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 6px; margin-top: 32px; margin-bottom: 16px;">
        Target Applications Sent via Email in Batch 3 (${targetApplications.length} Companies)
      </h3>
      <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
        <thead>
          <tr style="background: #f1f5f9; text-align: left;">
            <th style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase;">#</th>
            <th style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase;">Company</th>
            <th style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase;">Recruiter Email</th>
            <th style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase;">Target Role</th>
          </tr>
        </thead>
        <tbody>
          ${emailRows}
        </tbody>
      </table>

      <div style="margin-top: 24px; padding: 14px; background: #e0f2fe; border: 1px solid #bae6fd; border-radius: 6px; font-size: 13px; color: #0369a1;">
        <strong>Instructions for WhatsApp Outreach:</strong><br/>
        1. Open WhatsApp on your phone.<br/>
        2. Click the recruiter phone numbers above to start a chat.<br/>
        3. Copy and paste the customized message provided for each recruiter.<br/>
        4. Attach <code>MURALI-KRISHNA.pdf</code> directly in WhatsApp for instant review.
      </div>
    </div>
  `;
}

// ─── Execution Logic ─────────────────────────────────────────────────────────
async function runBatch() {
  console.log("================================================================================");
  console.log("STARTING TARGET RECRUITER OUTREACH - BATCH 3");
  console.log(`Sender: ${SENDER_EMAIL}`);
  console.log(`Resume: ${resumePath}`);
  console.log(`Total Target Applications: ${targetApplications.length}`);
  console.log(`Total WhatsApp Contacts: ${whatsappContacts.length}`);
  console.log("================================================================================\n");

  // Deduplication check
  const seenEmails = new Set();
  const dedupedApps = [];
  for (const app of targetApplications) {
    const key = app.targetEmail.toLowerCase().trim();
    if (seenEmails.has(key)) {
      console.log(`Skipping duplicate email: ${app.targetEmail}`);
    } else {
      seenEmails.add(key);
      dedupedApps.push(app);
    }
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < dedupedApps.length; i++) {
    const app = dedupedApps[i];
    console.log(`\n[${i + 1}/${dedupedApps.length}] Sending to ${app.company} -> ${app.targetEmail}...`);

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: app.targetEmail,
      subject: app.subject,
      text: app.body,
      html: app.html,
      attachments: [
        {
          filename: "Murali_Krishna_Popuri_Full_Stack_Dev.pdf",
          path: resumePath,
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`SUCCESS: Sent to ${app.targetEmail} (Message ID: ${info.messageId})`);
      successCount++;
    } catch (err) {
      console.error(`FAILED to send to ${app.targetEmail}: ${err.message}`);
      failCount++;
    }

    // 3-second throttle between emails
    if (i < dedupedApps.length - 1) {
      console.log("Waiting 3s before next send...");
      await delay(3000);
    }
  }

  console.log("\n================================================================================");
  console.log(`OUTREACH SUMMARY: ${successCount} Sent Successfully, ${failCount} Failed.`);
  console.log("================================================================================");

  console.log("\n================================================================================");
  console.log(`STEP 2: SENDING WHATSAPP SUMMARY TO: ${USER_NOTIFICATION_EMAIL}`);
  console.log("================================================================================");

  const summaryMailOptions = {
    from: `"Murali Outreach System" <${SENDER_EMAIL}>`,
    to: USER_NOTIFICATION_EMAIL,
    subject: "Recruiter WhatsApp Contacts & Ready-to-Copy Messages (Batch 3)",
    text: whatsappSummaryText,
    html: buildHtmlSummary(),
  };

  try {
    const summaryInfo = await transporter.sendMail(summaryMailOptions);
    console.log(`SUCCESS: Summary email sent to ${USER_NOTIFICATION_EMAIL} (Message ID: ${summaryInfo.messageId})`);
  } catch (err) {
    console.error(`FAILED to send summary to ${USER_NOTIFICATION_EMAIL}: ${err.message}`);
  }

  console.log("\nAll batch 3 tasks completed successfully.");
}

runBatch().catch((err) => {
  console.error("Fatal error in batch execution:", err);
  process.exit(1);
});
