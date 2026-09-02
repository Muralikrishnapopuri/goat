const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TEST_EMAIL = "popurimuralikrishna04@gmail.com";

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

const resumePath = path.join(__dirname, "MURALI-KRISHNA_.pdf");

const applicationsBatch3 = [
  {
    company: "Educohire",
    targetEmail: "neha@educohire.com",
    role: "Full Stack App Developer (React JS + PHP)",
    location: "Nalagandla, Hyderabad",
    subject: "Application for Full Stack App Developer (React JS + PHP) – Murali Krishna Popuri",
    body: `Hi Neha,

I came across your posting for the Full Stack App Developer (React JS + PHP) position in Nalagandla, Hyderabad, and wanted to apply.

I am a Full-Stack Developer with 2+ years of hands-on experience building web applications using React.js on the frontend and PHP / Node.js on the backend with MySQL and RESTful APIs. In my recent role at YoungMinds Technology Solutions, I built responsive frontend UIs and robust backend APIs while managing relational databases.

I am based in Hyderabad, available to work on-site/hybrid, and currently serving my notice period as an immediate joiner.

I have attached my updated resume for your review. I would love the opportunity to discuss how my technical skills match your team's requirements.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Neha,</p>
        <p>I came across your posting for the <strong>Full Stack App Developer (React JS + PHP)</strong> position in Nalagandla, Hyderabad, and wanted to apply.</p>
        <p>I am a Full-Stack Developer with 2+ years of hands-on experience building web applications using <strong>React.js</strong> on the frontend and <strong>PHP / Node.js</strong> on the backend with <strong>MySQL and RESTful APIs</strong>. In my recent role at YoungMinds Technology Solutions, I built responsive UIs and robust backend services while managing database integrations.</p>
        <p>I am based in Hyderabad, available to work on-site/hybrid, and currently serving my notice period as an immediate joiner.</p>
        <p>I have attached my updated resume for your review. I would love the opportunity to discuss how my technical skills match your team's requirements.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  },
  {
    company: "EBG Group",
    targetEmail: "kranthi@theebg.com",
    role: "Full Stack Developer (React / Node / JavaScript / SQL)",
    location: "Hitech City, Hyderabad (Work from Office)",
    subject: "Application for Full Stack Developer – Murali Krishna Popuri",
    body: `Hi Kranthi,

I noticed your job posting for a Full Stack Developer at EBG Group in Knowledge City, Hitech City, Hyderabad, and am writing to express my strong interest.

I am a Full-Stack Developer with 2+ years of experience engineering scalable web applications using JavaScript, React.js, Node.js, Express, and MySQL/PostgreSQL. In my previous work, I have designed responsive UIs, integrated RESTful APIs, and handled database optimizations.

I am based in Hyderabad, comfortable with 6 days Work from Office, and currently serving my notice period as an immediate joiner.

My updated resume is attached. I look forward to speaking with you about how I can contribute to EBG Group.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Kranthi,</p>
        <p>I noticed your job posting for a <strong>Full Stack Developer</strong> at EBG Group in Knowledge City, Hitech City, Hyderabad, and am writing to express my strong interest.</p>
        <p>I am a Full-Stack Developer with 2+ years of experience engineering scalable web applications using <strong>JavaScript, React.js, Node.js, Express, and MySQL/PostgreSQL</strong>. In my previous work, I have designed responsive UIs, integrated RESTful APIs, and handled database optimizations.</p>
        <p>I am based in Hyderabad, comfortable with 6 days Work from Office, and currently serving my notice period as an immediate joiner.</p>
        <p>My updated resume is attached. I look forward to speaking with you about how I can contribute to EBG Group.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  },
  {
    company: "Lead Gen IT Solutions",
    targetEmail: "leadgenitsolutions8@gmail.com",
    role: "Web Developer (JavaScript, PHP, MySQL)",
    location: "Banjara Hills, Hyderabad",
    subject: "Application for Web Developer – Murali Krishna Popuri",
    body: `Hi Hiring Manager,

I am writing to apply for the Web Developer position at Lead Gen IT Solutions in Banjara Hills, Hyderabad.

I have 2+ years of full-stack and web development experience working with HTML5, CSS3, JavaScript, PHP, MySQL, and REST API integrations. I specialize in building responsive, high-performing web platforms and cross-browser interfaces.

I am based in Hyderabad and can join immediately as I am currently serving my notice period.

Please find my resume attached for your consideration. I look forward to the possibility of discussing this role further.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Hiring Manager,</p>
        <p>I am writing to apply for the <strong>Web Developer</strong> position at Lead Gen IT Solutions in Banjara Hills, Hyderabad.</p>
        <p>I have 2+ years of full-stack and web development experience working with <strong>HTML5, CSS3, JavaScript, PHP, MySQL, and REST API integrations</strong>. I specialize in building responsive, high-performing web platforms and cross-browser interfaces.</p>
        <p>I am based in Hyderabad and can join immediately as I am currently serving my notice period.</p>
        <p>Please find my resume attached for your consideration. I look forward to the possibility of discussing this role further.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  },
  {
    company: "Proximsoft",
    targetEmail: "careers@proximsoft.com",
    role: "Website Developer (React, JavaScript, PHP, MySQL)",
    location: "Hyderabad (Work From Office)",
    subject: "Application for Website Developer – Murali Krishna Popuri",
    body: `Hi Hiring Team,

I came across your opening for a Website Developer at Proximsoft in Hyderabad and would like to present my candidacy.

With 2+ years of development experience, I have built and maintained web platforms using React.js, JavaScript, HTML5, CSS3, PHP, and MySQL. My background includes building custom landing pages, API integrations, and optimizing website speed and performance.

I am located in Hyderabad, available for full-time work from office, and currently serving my notice period as an immediate joiner.

I have attached my resume and links to my portfolio for your review.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Hiring Team,</p>
        <p>I came across your opening for a <strong>Website Developer</strong> at Proximsoft in Hyderabad and would like to present my candidacy.</p>
        <p>With 2+ years of development experience, I have built and maintained web platforms using <strong>React.js, JavaScript, HTML5, CSS3, PHP, and MySQL</strong>. My background includes building custom landing pages, API integrations, and optimizing website speed and performance.</p>
        <p>I am located in Hyderabad, available for full-time work from office, and currently serving my notice period as an immediate joiner.</p>
        <p>I have attached my resume and links to my portfolio for your review.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  },
  {
    company: "Better Future Solutions",
    targetEmail: "durga.j@betterfuturesolutions.com",
    role: "Senior Software Engineer – PHP Developer",
    location: "Hyderabad (Hybrid)",
    subject: "Application for PHP Developer / Software Engineer – Murali Krishna Popuri",
    body: `Hi Lakshmi,

I am writing to apply for the PHP Developer / Software Engineer position in Hyderabad.

I am a Full-Stack & Backend Developer with experience building web applications using PHP, MySQL, JavaScript, HTML, CSS, and REST API integrations. I take pride in writing clean, maintainable code and building efficient database queries.

I am located in Hyderabad, open to hybrid working, and currently serving my notice period as an immediate joiner.

My updated CV is attached to this email. I would welcome the opportunity to discuss how my background aligns with your requirements.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Lakshmi,</p>
        <p>I am writing to apply for the <strong>PHP Developer / Software Engineer</strong> position in Hyderabad.</p>
        <p>I am a Full-Stack & Backend Developer with experience building web applications using <strong>PHP, MySQL, JavaScript, HTML, CSS, and REST API integrations</strong>. I take pride in writing clean, maintainable code and building efficient database queries.</p>
        <p>I am located in Hyderabad, open to hybrid working, and currently serving my notice period as an immediate joiner.</p>
        <p>My updated CV is attached to this email. I would welcome the opportunity to discuss how my background aligns with your requirements.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  },
  {
    company: "BM Cloud Consultancy",
    targetEmail: "career.bmcloud@gmail.com",
    role: "Full Stack / Web Developer (React & Web Technologies)",
    location: "Hyderabad (Work from Office)",
    subject: "Application for Full Stack / Web Developer – Murali Krishna Popuri",
    body: `Hi Sahil,

I came across your recruitment post for Full Stack and Web Development roles in Hyderabad and would like to apply.

I have 2+ years of hands-on experience developing web applications using React.js, JavaScript, Node.js, Express, and REST APIs, along with relational databases (MySQL/PostgreSQL). I take complete ownership of frontend user interfaces and backend integration.

I live in Hyderabad, prefer Work from Office, and am an immediate joiner currently serving my notice period.

Please find my resume attached. I would love to connect and share more about my project experience.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Sahil,</p>
        <p>I came across your recruitment post for <strong>Full Stack and Web Development</strong> roles in Hyderabad and would like to apply.</p>
        <p>I have 2+ years of hands-on experience developing web applications using <strong>React.js, JavaScript, Node.js, Express, and REST APIs</strong>, along with relational databases (MySQL/PostgreSQL). I take complete ownership of frontend user interfaces and backend integration.</p>
        <p>I live in Hyderabad, prefer Work from Office, and am an immediate joiner currently serving my notice period.</p>
        <p>Please find my resume attached. I would love to connect and share more about my project experience.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  },
  {
    company: "TSCG Technologies",
    targetEmail: "tscgtechnologies2@gmail.com",
    role: "Application – WordPress & E-commerce Developer",
    location: "Hyderabad",
    subject: "Application – WordPress & E-commerce Developer – Murali Krishna Popuri",
    body: `Hi Hiring Manager,

I am applying for the WordPress & E-commerce Developer role at TSCG Technologies in Hyderabad.

I have 2+ years of web development experience working with HTML, CSS, JavaScript, PHP, WordPress, and WooCommerce. I have built responsive websites, customized themes, and integrated payment gateway APIs and web forms.

I am based in Hyderabad and available to join immediately.

My resume is attached for your review. I look forward to speaking with your team.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Hiring Manager,</p>
        <p>I am applying for the <strong>WordPress & E-commerce Developer</strong> role at TSCG Technologies in Hyderabad.</p>
        <p>I have 2+ years of web development experience working with <strong>HTML, CSS, JavaScript, PHP, WordPress, and WooCommerce</strong>. I have built responsive websites, customized themes, and integrated payment gateway APIs and web forms.</p>
        <p>I am based in Hyderabad and available to join immediately.</p>
        <p>My resume is attached for your review. I look forward to speaking with your team.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  },
  {
    company: "Rayhawks Technology",
    targetEmail: "hiringteam@rayhawks.com",
    role: "Software Analyst / Backend Developer",
    location: "Hyderabad (Hybrid)",
    subject: "Application for Software Analyst / Backend Developer – Murali Krishna Popuri",
    body: `Hi Hiring Team,

I came across your job posting for a Backend Developer / Software Analyst in Hyderabad and wanted to share my application.

I am a Developer with 2+ years of experience building REST APIs, microservices, and backend services using JavaScript/Node.js and Python, with PostgreSQL and MySQL database management. I also actively utilize AI-assisted developer tools like Claude Code and GitHub Copilot to optimize coding workflows.

I am based in Hyderabad, comfortable with hybrid work, and currently serving my notice period as an immediate joiner.

My updated resume is attached. I look forward to discussing how my skills fit Rayhawks Technology.

Best regards,

Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 620px;">
        <p>Hi Hiring Team,</p>
        <p>I came across your job posting for a <strong>Backend Developer / Software Analyst</strong> in Hyderabad and wanted to share my application.</p>
        <p>I am a Developer with 2+ years of experience building REST APIs, microservices, and backend services using <strong>JavaScript/Node.js and Python</strong>, with <strong>PostgreSQL and MySQL</strong> database management. I also actively utilize AI-assisted developer tools like Claude Code and GitHub Copilot to optimize coding workflows.</p>
        <p>I am based in Hyderabad, comfortable with hybrid work, and currently serving my notice period as an immediate joiner.</p>
        <p>My updated resume is attached. I look forward to discussing how my skills fit Rayhawks Technology.</p>
        <br/>
        <p>Best regards,<br/>
        <strong>Murali Krishna Popuri</strong><br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com<br/>
        🌐 <a href="https://murali-portfolio-website.vercel.app">Portfolio</a> | 💻 <a href="https://github.com/Muralikrishnapopuri">GitHub</a> | 🔗 <a href="https://linkedin.com/in/murali-krishna-popuri">LinkedIn</a></p>
      </div>
    `
  }
];

async function run() {
  console.log(`Starting Batch 3 Outreach for ${applicationsBatch3.length} matched companies...`);

  for (let i = 0; i < applicationsBatch3.length; i++) {
    const app = applicationsBatch3[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`[${i + 1}/${applicationsBatch3.length}] Sending application for ${app.company}...`);
    console.log(`Target Email: ${app.targetEmail}`);
    console.log(`Subject: ${app.subject}`);

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: app.targetEmail,
      subject: app.subject,
      text: app.body,
      html: app.html,
      attachments: fs.existsSync(resumePath) ? [{ filename: "MURALI-KRISHNA_.pdf", path: resumePath }] : [],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Sent successfully directly to target HR: ${app.targetEmail}! MessageId: ${info.messageId}`);
    } catch (err) {
      console.error(`❌ Failed to send email to ${app.targetEmail}:`, err.message);
    }
  }

  console.log(`\nAll Batch 3 applications dispatched successfully!`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
