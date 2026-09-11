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

// Resume updated as instructed by user:
const resumePath = path.join(__dirname, "Murali_Krishna_Popuri_Resume.pdf");

if (!fs.existsSync(resumePath)) {
  console.error("FATAL ERROR: Resume PDF file not found at:", resumePath);
  process.exit(1);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Direct Target HR Applications (Batch 4: 2+ Years Exp Honest Disclosure) ─────
const targetApplications = [
  {
    company: "EliteRecruitments",
    targetEmail: "arpit@eliterecruitments.com",
    role: "Full Stack Developer (React JS, Microservices, REST APIs, AWS, SQL)",
    subject: "Application for Full Stack Developer (React JS, APIs, AWS) - Murali Krishna Popuri",
    body: `Hi Arpit,

I am writing to express my interest in the Full Stack Developer position in Hyderabad / Bangalore.

While your posting seeks 10+ years of experience, I wanted to honestly share my background as a Full-Stack Developer with 2+ years of production experience directly aligned with your core requirements:
- Frontend: React.js, Next.js, TypeScript, JavaScript, HTML5/CSS3, responsive UI design.
- Backend & Microservices: RESTful APIs, Node.js, Express, microservices architecture, and API integration.
- Databases: PostgreSQL, MySQL, SQL Server fundamentals, schema design, and query optimization.
- Cloud & DevOps: AWS services, Docker containers, and Git version control.
- Notice Period: Immediate joiner (currently serving notice period, available to join with zero delay).

I am an agile engineer with a strong work ethic who takes full ownership of deliverables. My resume (Murali_Krishna_Popuri_Resume.pdf) is attached for your review.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Arpit,</p>
        <p>I am writing to express my interest in the <strong>Full Stack Developer</strong> position in Hyderabad / Bangalore.</p>
        <p>While your posting seeks 10+ years of experience, I wanted to honestly share my background as a Full-Stack Developer with <strong>2+ years of production experience</strong> directly aligned with your core requirements:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript, responsive component design.</li>
          <li><strong>Backend & Microservices:</strong> RESTful APIs, Node.js, Express, microservices architecture.</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, SQL schema design, and query optimization.</li>
          <li><strong>Cloud & DevOps:</strong> AWS cloud services, Docker containers, and Git CI/CD.</li>
          <li><strong>Availability:</strong> Immediate joiner (serving notice period, can join immediately).</li>
        </ul>
        <p>My resume (<strong>Murali_Krishna_Popuri_Resume.pdf</strong>) is attached for your review.</p>
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
    company: "Codechavo",
    targetEmail: "sweta.codechavo@gmail.com",
    role: "Software Engineer – Mobile / React Native / Full Stack - Hyderabad",
    subject: "Application for Software Engineer (React / Full Stack) - Murali Krishna Popuri",
    body: `Hi Sweta,

I am writing regarding the Software Engineer (React Native / Full Stack) opening in Hyderabad.

While the requirement mentions 8+ years, I wanted to honestly put forward my profile as a hands-on developer with 2+ years of intensive production experience:
- Frontend & Mobile: React.js, React Native concepts, TypeScript, JavaScript (ES6+), responsive and interactive UI development.
- Backend & APIs: Node.js, Express, RESTful APIs, and messaging architectures.
- Databases: SQL (PostgreSQL, MySQL), data modeling, and query tuning.
- Linux & Tooling: Linux command-line, Git workflows, Agile methodologies, and troubleshooting.
- Availability: Immediate joiner (currently serving notice period, available to join immediately in Hyderabad).

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
        <p>Hi Sweta,</p>
        <p>I am writing regarding the <strong>Software Engineer (React / Full Stack)</strong> opening in Hyderabad.</p>
        <p>While the posting mentions 8+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, React Native fundamentals, TypeScript, JavaScript (ES6+), component design.</li>
          <li><strong>Backend:</strong> Node.js, Express, RESTful APIs, and messaging architectures.</li>
          <li><strong>Databases:</strong> SQL (PostgreSQL, MySQL) data modeling and query optimization.</li>
          <li><strong>DevOps & OS:</strong> Linux command line, Git, Agile, and full-stack troubleshooting.</li>
          <li><strong>Notice Period:</strong> Immediate joiner (0 days notice, open to Hyderabad on-site).</li>
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
    company: "Now100",
    targetEmail: "sumiya.g@now100.com",
    role: "Full Stack Developer (React, REST APIs, SQL, AWS) - Bengaluru",
    subject: "Application for Full Stack Developer - Murali Krishna Popuri",
    body: `Hi Sumiya,

I am writing regarding the Full Stack Developer opening in Bengaluru.

While your requirement mentions 4-10 years, I wanted to honestly put forward my candidacy. I bring 2+ years of intensive production experience matching your core stack:
- Frontend: React.js, Angular fundamentals, JavaScript, HTML5/CSS3, responsive UI development.
- Backend & APIs: RESTful APIs, backend service development, and third-party integrations.
- Databases: SQL (PostgreSQL, MySQL, SQL Server fundamentals).
- Cloud & Infrastructure: AWS Cloud, Git, and automated testing.

Details requested for the F2F drive:
- Total Experience: 2+ Years
- Relevant Experience: 2+ Years (Full Stack / React / REST APIs)
- Current Location: Andhra Pradesh (Ready to attend in-person in Bengaluru)
- Preferred Location: Bengaluru
- Current CTC: Available upon discussion
- Expected CTC: Negotiable based on company standards
- Notice Period: Immediate Joiner (0 days / serving notice period)

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
        <p>Hi Sumiya,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Bengaluru.</p>
        <p>While the posting indicates 4-10 years, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> matching your technology stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, Angular fundamentals, JavaScript, HTML5/CSS3.</li>
          <li><strong>Backend:</strong> RESTful APIs, Node.js/Express, and backend service integrations.</li>
          <li><strong>Databases:</strong> SQL (PostgreSQL, MySQL, SQL Server fundamentals).</li>
          <li><strong>Cloud:</strong> AWS Cloud, Git version control, and CI/CD.</li>
        </ul>
        <p><strong>Candidate Details:</strong></p>
        <ul style="padding-left: 20px;">
          <li><strong>Total Experience:</strong> 2+ Years</li>
          <li><strong>Relevant Experience:</strong> 2+ Years (Full Stack / React / REST APIs)</li>
          <li><strong>Current Location:</strong> Andhra Pradesh (Available to attend F2F in Bengaluru)</li>
          <li><strong>Preferred Location:</strong> Bengaluru</li>
          <li><strong>Notice Period:</strong> Immediate Joiner (0 days)</li>
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
    company: "Alphasis Global",
    targetEmail: "niharika@alphasisglobal.com",
    role: "Full Stack Developer (React JS, Node.js, AWS) - Hyderabad",
    subject: "Application for Full Stack Developer (React JS, Node.js, AWS) - Murali Krishna Popuri",
    body: `Hi Niharika,

I am writing regarding the Full Stack Developer opening in Hyderabad.

While the posting seeks 6+ years of experience, I wanted to honestly share my background. I bring 2+ years of hands-on production experience directly matching your tech stack:
- Frontend: React JS, TypeScript, JavaScript, responsive UI components.
- Backend: Node.js, Express, REST APIs, and microservices architecture.
- Databases: SQL (PostgreSQL, MySQL) and NoSQL (MongoDB).
- Cloud & Containers: AWS (EC2, S3), Docker containers, and Kubernetes fundamentals.
- AI Tools: Hands-on experience integrating AI tools and APIs to enhance application capabilities.
- Notice Period: Immediate joiner (currently serving notice period, available to join immediately in Hyderabad).

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
        <p>Hi Niharika,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Hyderabad.</p>
        <p>While the posting indicates 6+ years, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> directly aligned with your stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React JS, TypeScript, JavaScript, responsive UI components.</li>
          <li><strong>Backend:</strong> Node.js, Express, REST APIs, and microservices architecture.</li>
          <li><strong>Databases:</strong> SQL (PostgreSQL, MySQL) and NoSQL (MongoDB).</li>
          <li><strong>Cloud & Containers:</strong> AWS (EC2, S3), Docker, and Kubernetes fundamentals.</li>
          <li><strong>AI Tools:</strong> Practical experience integrating AI tools and LLM APIs.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 days notice, based in/open to Hyderabad).</li>
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
    company: "UST",
    targetEmail: "kolipakulavmvamsi.ram@ust.com",
    role: "Fullstack Developer (React, MongoDB, AWS/Azure, AI) - Hyderabad",
    subject: "Application for Fullstack Developer (React, MongoDB, AI) - Murali Krishna Popuri",
    body: `Hi Vamsi Ram,

I am writing regarding the Fullstack Developer opening in Hyderabad.

While the requirement notes 7+ years, I wanted to honestly share my profile. I bring 2+ years of intensive full-stack development experience covering your key technical requirements:
- Frontend: React.js, TypeScript, JavaScript, HTML5/CSS3, responsive UI development.
- Backend & APIs: RESTful APIs, Node.js/Express, microservices, and backend logic.
- Databases: MongoDB, PostgreSQL, and SQL database management.
- Cloud & AI: Cloud application deployment (AWS/Azure), and hands-on implementation of AI/LLM integrations.
- Notice Period: Immediate joiner (serving notice period, can join immediately in Hyderabad).

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
        <p>Hi Vamsi Ram,</p>
        <p>I am writing regarding the <strong>Fullstack Developer</strong> opening in Hyderabad.</p>
        <p>While the posting mentions 7+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, TypeScript, JavaScript, component architecture.</li>
          <li><strong>Backend & APIs:</strong> RESTful APIs, Node.js/Express, and backend logic.</li>
          <li><strong>Databases:</strong> MongoDB, PostgreSQL, and SQL data modeling.</li>
          <li><strong>Cloud & AI:</strong> AWS/Azure cloud deployment and hands-on AI/LLM integrations.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 days notice, ready to join in Hyderabad).</li>
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
    company: "SDKM Solutions",
    targetEmail: "anjolin.t@sdkmsolutions.com",
    role: "Full Stack Engineer (React.js, TypeScript, APIs) - Hyderabad",
    subject: "Application for Full Stack Engineer (React.js, TypeScript, APIs) - Murali Krishna Popuri",
    body: `Hi Anjolin,

I am writing regarding the Full Stack Engineer opening in Hyderabad.

While the post mentions 8+ years, I wanted to honestly present my background. I bring 2+ years of hands-on production experience in full-stack architecture:
- Frontend: React.js, TypeScript, JavaScript, and modern component architecture.
- Backend: RESTful APIs, Node.js/Java backend services, and scalable web platforms.
- Databases: PostgreSQL, MySQL, and MongoDB.
- Notice Period: Immediate joiner (0 to 15 days availability, ready for hybrid mode in Hyderabad).

My resume is attached for your evaluation.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6; max-width: 620px;">
        <p>Hi Anjolin,</p>
        <p>I am writing regarding the <strong>Full Stack Engineer</strong> opening in Hyderabad.</p>
        <p>While the posting references 8+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, TypeScript, JavaScript, modern component architecture.</li>
          <li><strong>Backend:</strong> RESTful APIs, Node.js, and scalable web platforms.</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, and MongoDB.</li>
          <li><strong>Notice Period:</strong> Immediate joiner (0 to 15 days notice, open to hybrid in Hyderabad).</li>
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
    company: "Sage IT",
    targetEmail: "pujitha.d@sageit.in",
    role: "Full Stack Developer (with Claude AI Experience) - Hyderabad",
    subject: "Application for Full Stack Developer (with Claude AI experience) - Murali Krishna Popuri",
    body: `Hi Pujitha,

I am writing regarding the Full Stack Developer role with Sage IT in Hyderabad.

While the role indicates 5-10 years, I wanted to honestly share my background. I bring 2+ years of hands-on production experience in full-stack development with direct experience implementing Claude AI:
- Hands-on Claude AI: Integrated Claude AI API in production for context-aware assistance, RAG query pipelines, and automated processing.
- Full Stack: React.js, TypeScript, Node.js, Express, REST APIs, and database architecture.
- Cloud & Tools: Azure cloud exposure, Git, and automated testing tools.
- Work Mode & Notice: Ready to work from Hyderabad, immediate joiner (0 to 15 days notice, comfortable with C2H).

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
        <p>Hi Pujitha,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> role with Sage IT in Hyderabad.</p>
        <p>While the posting mentions 5-10 years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience featuring hands-on Claude AI integration</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Claude AI & GenAI:</strong> Integrated Claude AI API in production for context-aware assistance, RAG query pipelines, and automated processing.</li>
          <li><strong>Full Stack:</strong> React.js, TypeScript, Node.js, Express, REST APIs, and databases.</li>
          <li><strong>Cloud & DevOps:</strong> Azure cloud exposure, Git, and agile development.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 to 15 days notice, comfortable with C2H in Hyderabad).</li>
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
    company: "True Tech Professional",
    targetEmail: "priyanka@truetechpro.io",
    role: "React / React Native Developer (3-4 Years) - Hyderabad",
    subject: "Application for React Developer - Murali Krishna Popuri",
    body: `Hi Priyanka,

I am writing to apply for the React / React Native Developer position in Hyderabad.

I am a Developer with 2+ years of hands-on production experience building responsive, high-performance web and mobile solutions:
- React & UI: React.js, Next.js, React Native fundamentals, TypeScript, JavaScript (ES6+), HTML5/CSS3.
- APIs & Integration: RESTful API integration, state management, and third-party services.
- Version Control & Quality: Git/GitHub, unit testing, debugging, and continuous optimization.
- Availability: Immediate joiner (serving notice period, available to join with zero delay in Hyderabad).

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
        <p>Hi Priyanka,</p>
        <p>I am writing to apply for the <strong>React / React Native Developer</strong> position in Hyderabad.</p>
        <p>I am a Developer with <strong>2+ years of hands-on production experience</strong> building responsive, high-performance applications:</p>
        <ul style="padding-left: 20px;">
          <li><strong>React & UI:</strong> React.js, Next.js, React Native fundamentals, TypeScript, JavaScript (ES6+).</li>
          <li><strong>APIs & Integration:</strong> RESTful API integration, state management, and third-party services.</li>
          <li><strong>Quality & Tools:</strong> Git/GitHub, unit testing, debugging, and mobile optimization.</li>
          <li><strong>Availability:</strong> Immediate joiner (serving notice period, can join immediately in Hyderabad).</li>
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
    company: "Galaxy i Technologies (Jahnavi)",
    targetEmail: "jahnavi@galaxyitech.com",
    role: "Full Stack Developer (React.js, APIs, Kafka) - Hyderabad",
    subject: "Application for Full Stack Developer (React.js, APIs, Kafka) - Murali Krishna Popuri",
    body: `Hi Jahnavi,

I am writing regarding the Full Stack Developer opening in Hyderabad.

While the requirement mentions 8+ years, I wanted to honestly put forward my profile. I bring 2+ years of production experience directly aligned with your tech stack:
- Frontend: React.js, TypeScript, JavaScript, HTML5/CSS3, responsive UI development.
- Backend & Messaging: RESTful APIs, microservices, and Apache Kafka event streaming integration.
- Databases: PostgreSQL, MySQL, and SQL Server fundamentals.
- Cloud & DevOps: AWS services, Docker containers, and Git workflows.

Candidate Details:
- Total Experience: 2+ Years
- Relevant Experience: 2+ Years Full Stack (React.js, REST APIs, Kafka)
- Current CTC: Available upon discussion
- Expected CTC: Negotiable based on company standards
- Notice Period: Immediate Joiner (0 days notice)
- Preferred Location: Hyderabad

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
        <p>Hi Jahnavi,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Hyderabad.</p>
        <p>While the posting indicates 8+ years, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> directly aligned with your tech stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, TypeScript, JavaScript, HTML5/CSS3, responsive component design.</li>
          <li><strong>Backend & Messaging:</strong> RESTful APIs, microservices, and Apache Kafka event streaming.</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, and SQL Server fundamentals.</li>
          <li><strong>Cloud & DevOps:</strong> AWS services, Docker containers, and Git workflows.</li>
        </ul>
        <p><strong>Candidate Details:</strong></p>
        <ul style="padding-left: 20px;">
          <li><strong>Total Experience:</strong> 2+ Years</li>
          <li><strong>Relevant Experience:</strong> 2+ Years (Full Stack / React / Kafka)</li>
          <li><strong>Notice Period:</strong> Immediate Joiner (0 days notice)</li>
          <li><strong>Preferred Location:</strong> Hyderabad</li>
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
    company: "Galaxy i Technologies (Haritha)",
    targetEmail: "haritha1@galaxyitech.com",
    role: "Full Stack Developer (React.js, REST APIs, Kafka) - Adibatla, Hyderabad",
    subject: "Application for Full Stack Developer (React.js, REST APIs, Kafka) - Murali Krishna Popuri",
    body: `Hi Haritha,

I am writing to apply for the Full Stack Developer opening in Adibatla, Hyderabad.

While the posting mentions 8+ years, I wanted to honestly share my background. I bring 2+ years of production experience matching your core non-negotiable skills:
- Frontend: React.js, TypeScript, JavaScript, HTML5/CSS3, responsive UI development.
- Backend & APIs: RESTful APIs, microservices, and Node.js/Express backend integration.
- Messaging: Apache Kafka event streaming and terminal data synchronization.
- Databases: PostgreSQL, MySQL, and SQL query optimization.
- DevOps: Docker, Git, and CI/CD pipelines.
- Availability: Immediate joiner (currently serving notice period, available to join with zero delay).

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
        <p>Hi Haritha,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer</strong> opening in Adibatla, Hyderabad.</p>
        <p>While the posting indicates 8+ years, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> matching your core technical skills:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, TypeScript, JavaScript, HTML5/CSS3, responsive UI development.</li>
          <li><strong>Backend & APIs:</strong> RESTful APIs, microservices, and backend integration.</li>
          <li><strong>Messaging:</strong> Apache Kafka event streaming and real-time synchronization.</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, and SQL query optimization.</li>
          <li><strong>DevOps:</strong> Docker, Git, and CI/CD pipelines.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 days notice).</li>
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
    company: "Digitrix Software",
    targetEmail: "nishi.panchal@digitrixsoftware.com",
    role: "Full Stack Developer (React / Next.js / APIs) - Bengaluru / Hyderabad",
    subject: "Application for Full Stack Developer (React / Next.js / APIs) - Murali Krishna Popuri",
    body: `Hi Nishi,

I am writing regarding the Full Stack Developer opening in Bengaluru / Hyderabad.

While the requirement mentions 6+ years, I wanted to honestly put forward my profile. I bring 2+ years of hands-on production experience in full-stack engineering:
- UI Development: React.js, Next.js, TypeScript, JavaScript (ES6+), responsive design, and state management.
- Backend & APIs: RESTful APIs, microservices, and backend integrations.
- Distributed Systems: Real-time event streaming, Apache Kafka, and database design (PostgreSQL, SQL).
- Notice Period: Immediate joiner (serving notice period, ready for hybrid mode in Bengaluru or Hyderabad).

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
        <p>Hi Nishi,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Bengaluru / Hyderabad.</p>
        <p>While the posting indicates 6+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>UI Development:</strong> React.js, Next.js, TypeScript, JavaScript (ES6+), responsive design.</li>
          <li><strong>Backend & APIs:</strong> RESTful APIs, microservices, and backend integrations.</li>
          <li><strong>Distributed Systems:</strong> Real-time event streaming with Apache Kafka, PostgreSQL, SQL.</li>
          <li><strong>Availability:</strong> Immediate joiner (serving notice period, open to Bengaluru/Hyderabad).</li>
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
    company: "Kaizen Technologies",
    targetEmail: "shirishak@kaizentek.com",
    role: "Full Stack Developer (React, REST APIs, AWS) - Hyderabad",
    subject: "Application for Full Stack Developer (React, REST APIs, AWS) - Murali Krishna Popuri",
    body: `Hi Sirisha,

I am writing regarding the Full Stack Developer opening in Hyderabad.

While the requirement mentions 5+ years, I wanted to honestly share my profile. I bring 2+ years of hands-on full-stack development experience covering your key technical requirements:
- Frontend: React.js, Angular fundamentals, TypeScript, JavaScript, HTML5/CSS3.
- Backend & APIs: RESTful APIs, Spring/Node backend services, microservices integration.
- Cloud & Infrastructure: AWS cloud services, Docker, and Git workflows.
- Notice Period: Immediate joiner (currently serving notice period, available to join immediately in Hyderabad).

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
        <p>Hi Sirisha,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Hyderabad.</p>
        <p>While the posting mentions 5+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, Angular fundamentals, TypeScript, JavaScript, responsive UI.</li>
          <li><strong>Backend:</strong> RESTful APIs, microservices integration, and database operations.</li>
          <li><strong>Cloud:</strong> AWS cloud services, Docker, and Git workflows.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 days notice, open to Hyderabad).</li>
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
    company: "IntelliSoft Technologies",
    targetEmail: "kalyan@intellisofttech.com",
    role: "Full Stack Developer (React, Python, Kafka, RAG) - Bangalore",
    subject: "Application for Full Stack Developer (React, Python, Kafka, RAG) - Murali Krishna Popuri",
    body: `Hi Kalyan,

I am writing regarding the Full Stack Developer opening in Marathahalli, Bangalore.

While your posting requests 8+ years, I wanted to honestly put forward my candidacy. I bring 2+ years of intensive production experience directly aligned with your required skills:
- Frontend: React.js, TypeScript, JavaScript, HTML5/CSS3.
- Backend & Messaging: Python, FastAPI/Express, REST APIs, and Apache Kafka event streaming.
- Distributed Systems & DB: Microservices, Docker, Kubernetes fundamentals, PostgreSQL, MySQL, and MongoDB.
- AI & GenAI: Hands-on experience with LLMs, RAG (Retrieval-Augmented Generation), LangChain, and OpenAI/Claude APIs.
- Location & Notice: Open to Bangalore (hybrid), immediate joiner (0 days notice).

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
        <p>Hi Kalyan,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Marathahalli, Bangalore.</p>
        <p>While the posting mentions 8+ years, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> directly aligned with your stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, TypeScript, JavaScript, HTML5/CSS3.</li>
          <li><strong>Backend & Messaging:</strong> Python, FastAPI/Express, REST APIs, and Apache Kafka event streaming.</li>
          <li><strong>Databases & Containers:</strong> PostgreSQL, MongoDB, Docker, and Kubernetes fundamentals.</li>
          <li><strong>AI & GenAI:</strong> Hands-on implementation of RAG, vector context, LangChain, and LLM APIs.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 days notice, open to Bangalore hybrid).</li>
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
    company: "AARNIKSHA SOLUTIONS",
    targetEmail: "info@aarnikshasolutions.com",
    role: "Full Stack Developer (ReactJS, NextJS, Node.js, SQL) - Bangalore / Hyderabad",
    subject: "Application for Full Stack Developer (ReactJS, NextJS, Node.js, SQL) - Murali Krishna Popuri",
    body: `Hi Arjun,

I am writing regarding the Full Stack Developer position (ReactJS / NextJS / Node.js / SQL) at AARNIKSHA SOLUTIONS.

While the requirement mentions 7-11 years, I wanted to honestly put forward my profile. I bring 2+ years of intensive production experience directly centered on your required stack:
- ReactJS & NextJS: Complex state management, responsive UI development, and scalable component design.
- Node.js & APIs: Node.js development, RESTful API design, authentication, and service integration.
- SQL & Databases: Strong SQL and relational database experience (PostgreSQL, SQLite, MySQL), schema design, and query tuning.
- Ownership: Ability to independently own features from development through deployment.
- Notice Period: Immediate joiner (currently serving notice period, available to join with zero delay).

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
        <p>Hi Arjun,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> position (<strong>ReactJS / NextJS / Node.js / SQL</strong>) at AARNIKSHA SOLUTIONS.</p>
        <p>While the posting indicates 7-11 years, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> directly aligned with your stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>ReactJS & NextJS:</strong> Complex state management, responsive UI development, scalable component architecture.</li>
          <li><strong>Node.js & APIs:</strong> Node.js development, RESTful APIs, and third-party service integration.</li>
          <li><strong>SQL & Databases:</strong> PostgreSQL, MySQL, SQLite schema design, and complex query optimization.</li>
          <li><strong>End-to-End Ownership:</strong> Proven ability to independently deliver features from design to deployment.</li>
          <li><strong>Notice Period:</strong> Immediate joiner (0 days notice, open to Bangalore/Hyderabad).</li>
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
    company: "WebPipl",
    targetEmail: "sunayana.nyalapally@webpipl.com",
    role: "Full Stack Developer (React, TypeScript, APIs) - Hyderabad",
    subject: "Application for Full Stack Developer (React, TypeScript, APIs) - Murali Krishna Popuri",
    body: `Hi Sunayana,

I am writing regarding the Full Stack Developer opening in Hyderabad.

While your requirement specifies 6-12 years, I wanted to honestly share my background. I bring 2+ years of hands-on production experience in full-stack development:
- Frontend: React.js, Angular fundamentals, TypeScript, JavaScript (ES6+), HTML5/CSS3.
- Backend & APIs: RESTful APIs, Node.js/Express, and microservices integration.
- Databases: SQL (PostgreSQL, SQL Server fundamentals, MySQL) and database query optimization.
- Notice Period: Immediate joiner (currently serving notice period, available to join immediately in Hyderabad).

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
        <p>Hi Sunayana,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Hyderabad.</p>
        <p>While the posting indicates 6-12 years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, Angular fundamentals, TypeScript, JavaScript, responsive UI design.</li>
          <li><strong>Backend & APIs:</strong> RESTful APIs, Node.js/Express, and backend logic.</li>
          <li><strong>Databases:</strong> SQL (PostgreSQL, SQL Server, MySQL) and query optimization.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 days notice, based in/open to Hyderabad).</li>
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
    company: "Meraki TalentWorks",
    targetEmail: "Dilan@meraki-tw.com",
    role: "Full Stack Developer (React, Node.js, WebSockets, APIs) - Bengaluru",
    subject: "Application for Full Stack Developer (React, Node.js, WebSockets) - Murali Krishna Popuri",
    body: `Hi Dilan,

I am writing to apply for the Full Stack Developer position in Bengaluru (R.T. Nagar).

I am a Full-Stack Developer with 2+ years of professional experience building scalable web applications, directly matching your core requirements:
- Frontend: React.js, TypeScript, JavaScript, HTML5/CSS3, responsive UI development.
- Backend & APIs: Node.js, Express, REST APIs, WebSockets for real-time streaming, and microservices architecture.
- Databases: SQL (PostgreSQL, MySQL, SQL Server) and MongoDB.
- Cloud & DevOps: AWS cloud services, Docker containers, and Git workflows.
- Availability: Immediate joiner (serving notice period, can join immediately / within 15 days in Bengaluru).

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
        <p>Hi Dilan,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer</strong> position in Bengaluru (R.T. Nagar).</p>
        <p>I am a Full-Stack Developer with <strong>2+ years of professional experience</strong> building scalable web applications, directly aligned with your stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, TypeScript, JavaScript, HTML5/CSS3, responsive UI development.</li>
          <li><strong>Backend & APIs:</strong> Node.js, Express, REST APIs, WebSockets for real-time streaming.</li>
          <li><strong>Databases:</strong> SQL (PostgreSQL, MySQL, SQL Server) and MongoDB.</li>
          <li><strong>Cloud & DevOps:</strong> AWS cloud services, Docker containers, and Git workflows.</li>
          <li><strong>Availability:</strong> Immediate joiner (serving notice period, can join within 0-15 days in Bengaluru).</li>
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
    company: "Mallang Salma",
    targetEmail: "sapjobs@mallangsalma.com",
    role: "Full Stack & AI Developer (React, Node, REST APIs) - Bangalore / Hyderabad",
    subject: "Application for Full Stack & AI Developer - Murali Krishna Popuri",
    body: `Hi Mansoor,

I am writing regarding the Full Stack Developer / AI Developer opportunities in Bangalore / Hyderabad.

I bring 2+ years of hands-on production experience in full-stack engineering and AI integrations:
- Frontend: React.js, TypeScript, JavaScript, HTML5/CSS3.
- Backend: RESTful APIs, Node.js, microservices, and database integration (PostgreSQL, MySQL).
- AI & GenAI: Hands-on implementation of Retrieval-Augmented Generation (RAG) and LLM API integrations.
- Availability: Immediate joiner (currently serving notice period, available to join with zero delay).

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
        <p>Hi Mansoor,</p>
        <p>I am writing regarding the <strong>Full Stack Developer / AI Developer</strong> opportunities in Bangalore / Hyderabad.</p>
        <p>I bring <strong>2+ years of hands-on production experience</strong> in full-stack engineering and AI integrations:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, TypeScript, JavaScript, HTML5/CSS3.</li>
          <li><strong>Backend:</strong> RESTful APIs, Node.js, microservices, and databases (PostgreSQL, MySQL).</li>
          <li><strong>AI & GenAI:</strong> Hands-on implementation of RAG pipelines and LLM APIs.</li>
          <li><strong>Availability:</strong> Immediate joiner (serving notice period, open to Bangalore/Hyderabad).</li>
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
    company: "SFTECH / PetaData (Divya Manne)",
    targetEmail: "divyam@petadata.ai",
    role: "Full Stack Developer – AI & Data Integrations - Hyderabad",
    subject: "Application for Full Stack Developer (React, Next.js, Node.js, AI) - Murali Krishna Popuri",
    body: `Hi Divya,

I am writing regarding the Full Stack Developer – AI & Data Integrations opening in Hyderabad.

While the requirement mentions 6+ years, I wanted to honestly share my background. I bring 2+ years of intensive production experience directly aligned with your tech stack:
- Core Stack: React.js, Next.js, TypeScript, Node.js, Express, and Python.
- APIs & Microservices: REST and GraphQL APIs, authentication, and platform integrations.
- AI-Assisted Development: Hands-on experience with Claude Code, Cursor, and GitHub Copilot to accelerate development velocity and build agentic workflows.
- Containers & Cloud: Docker, Git, CI/CD, and AWS/Azure cloud environments.
- Notice Period: Immediate joiner (serving notice period, ready for night shift / USA hours in Hyderabad).

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
        <p>Hi Divya,</p>
        <p>I am writing regarding the <strong>Full Stack Developer – AI & Data Integrations</strong> opening in Hyderabad.</p>
        <p>While the posting mentions 6+ years, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> directly aligned with your stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Core Stack:</strong> React.js, Next.js, TypeScript, Node.js, Express, and Python.</li>
          <li><strong>APIs & Integrations:</strong> REST and GraphQL APIs, authentication, and data transformation.</li>
          <li><strong>AI Development:</strong> Daily hands-on experience using Claude Code, Cursor, and Copilot for high-velocity coding.</li>
          <li><strong>Containers & Cloud:</strong> Docker, Git, CI/CD, and AWS/Azure cloud deployment.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 days notice, ready for night shift in Hyderabad).</li>
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
    company: "SFTECH / PetaData (Varshitha)",
    targetEmail: "varshitham@petadata.ai",
    role: "Full Stack Developer – AI & Data Integrations - Hyderabad",
    subject: "Application for Full Stack Developer (TypeScript, React, Node.js, AI) - Murali Krishna Popuri",
    body: `Hi Varshitha,

I am writing to apply for the Full Stack Developer – AI & Data Integrations position in Hyderabad.

While the posting seeks 6+ years, I wanted to honestly put forward my profile. I bring 2+ years of active production experience matching your core technical needs:
- TypeScript, React.js, Next.js, Node.js, and Python backend engineering.
- REST & GraphQL API design, database schemas, and data integrations.
- Extensive use of AI development tools (Claude Code, GitHub Copilot) for building high-quality, production-ready applications.
- Docker containers, Git CI/CD, and cloud platforms (AWS).
- Immediate joiner available for USA time zones / night shift in Hyderabad.

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
        <p>Hi Varshitha,</p>
        <p>I am writing to apply for the <strong>Full Stack Developer – AI & Data Integrations</strong> position in Hyderabad.</p>
        <p>While the posting indicates 6+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Tech Stack:</strong> TypeScript, React.js, Next.js, Node.js, and Python.</li>
          <li><strong>APIs:</strong> REST & GraphQL APIs, data models, and platform integrations.</li>
          <li><strong>AI Tools:</strong> Extensive use of Claude Code, Cursor, and Copilot for rapid development.</li>
          <li><strong>Cloud & DevOps:</strong> Docker, Git, CI/CD, and AWS environments.</li>
          <li><strong>Notice Period:</strong> Immediate joiner (ready for night shift in Hyderabad).</li>
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
    company: "SFTECH / PetaData (Pavan Majeti)",
    targetEmail: "pavanm@petadata.ai",
    role: "Full Stack Developer – AI & Data Integrations - Hyderabad",
    subject: "Application for Full Stack Developer (React, Next.js, Node.js, APIs) - Murali Krishna Popuri",
    body: `Hi Pavan,

I am writing regarding the Full Stack Developer – AI & Data Integrations role in Hyderabad.

While the post mentions 6+ years, I wanted to honestly share my profile. I bring 2+ years of intensive production experience directly centered on your required stack:
- Frontend: React.js, Next.js, TypeScript, JavaScript (ES6+).
- Backend: Node.js, Express, Python, REST APIs, and GraphQL.
- AI-Assisted Coding: Proficient with Claude Code, Cursor, and GitHub Copilot for high-velocity development.
- DevOps: Docker, Git, CI/CD, and AWS/Azure cloud deployment.
- Availability: Immediate joiner (ready for night shift in Hyderabad).

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
        <p>Hi Pavan,</p>
        <p>I am writing regarding the <strong>Full Stack Developer – AI & Data Integrations</strong> role in Hyderabad.</p>
        <p>While the posting indicates 6+ years, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> matching your required tech stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript (ES6+).</li>
          <li><strong>Backend:</strong> Node.js, Express, Python, REST APIs, and GraphQL.</li>
          <li><strong>AI Tools:</strong> Proficient with Claude Code, Cursor, and GitHub Copilot.</li>
          <li><strong>DevOps:</strong> Docker, Git, CI/CD, and AWS/Azure cloud platforms.</li>
          <li><strong>Notice Period:</strong> Immediate joiner (ready for night shift in Hyderabad).</li>
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
    company: "Harp India",
    targetEmail: "tashvita.ingale@harp-india.com",
    role: "Full Stack Developer (ReactJS, MongoDB, APIs) - Bangalore / Hyderabad",
    subject: "Application for Full Stack Developer (ReactJS, MongoDB, APIs) - Murali Krishna Popuri",
    body: `Hi Tashvita,

I am writing regarding the Full Stack Developer opening in Bangalore / Hyderabad.

While the requirement mentions 8+ years, I wanted to honestly present my background. I bring 2+ years of hands-on production experience covering your key technical requirements:
- Frontend: ReactJS, TypeScript, JavaScript, HTML5/CSS3, responsive UI development.
- Backend & APIs: RESTful APIs, Node.js/Express, microservices, and third-party integrations.
- Databases: MongoDB, PostgreSQL, and SQL data modeling.
- Cloud & AI: Azure fundamentals, Git CI/CD, and AI-assisted development tools (Copilot, Claude).

Candidate Details:
- Total IT Experience: 2+ Years
- Relevant Experience: 2+ Years Full-Stack Development
- Notice Period / Availability: Immediate Joiner (0 days notice)
- Current Location: Andhra Pradesh (Open to Bangalore / Hyderabad hybrid)
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
        <p>Hi Tashvita,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Bangalore / Hyderabad.</p>
        <p>While the posting indicates 8+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> ReactJS, TypeScript, JavaScript, responsive UI engineering.</li>
          <li><strong>Backend:</strong> RESTful APIs, Node.js/Express, and microservices.</li>
          <li><strong>Databases:</strong> MongoDB, PostgreSQL, and SQL query optimization.</li>
          <li><strong>AI Tools:</strong> Active hands-on experience using AI-assisted development tools.</li>
        </ul>
        <p><strong>Candidate Details:</strong></p>
        <ul style="padding-left: 20px;">
          <li><strong>Total IT Experience:</strong> 2+ Years</li>
          <li><strong>Relevant Experience:</strong> 2+ Years Full Stack</li>
          <li><strong>Notice Period:</strong> Immediate Joiner (0 days)</li>
          <li><strong>Preferred Location:</strong> Hyderabad / Bangalore</li>
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
    company: "Citadel Inc",
    targetEmail: "chandra@citadelinc.com",
    role: "UI React Developer - Hyderabad",
    subject: "Application for UI React Developer - Murali Krishna Popuri",
    body: `Hi Chandra,

I am writing to apply for the UI React Developer opening in Hyderabad.

While your posting seeks a 10+ years senior developer, I wanted to honestly share my profile. I bring 2+ years of intensive production experience directly focused on modern frontend and React architecture:
- React.js & Modern Tooling: Strong expertise in React.js, TypeScript, JavaScript, HTML5 & CSS3, Vite, npm, and Node.js.
- UI Frameworks & Components: Designing reusable component libraries, responsive layouts, and state management.
- APIs & Databases: REST API integration, authentication, and SQL query modeling.
- Quality & Build: Modern bundlers (Vite/Webpack), Git workflows, CI/CD pipelines, and high code quality standards.
- Notice Period: Immediate joiner (currently serving notice period, available to join with short notice in Hyderabad).

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
        <p>Hi Chandra,</p>
        <p>I am writing to apply for the <strong>UI React Developer</strong> opening in Hyderabad.</p>
        <p>While the posting seeks senior experience, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong> directly centered on React and modern frontend architecture:</p>
        <ul style="padding-left: 20px;">
          <li><strong>React & Modern Tooling:</strong> React.js, TypeScript, JavaScript, HTML5/CSS3, Vite, npm, and Node.js.</li>
          <li><strong>Components & Systems:</strong> Reusable component architecture, responsive design, and state management.</li>
          <li><strong>APIs & Databases:</strong> REST API integration, authentication, and SQL queries.</li>
          <li><strong>Notice Period:</strong> Immediate joiner (available to join with short notice in Hyderabad).</li>
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
    company: "SMI Technology LLC",
    targetEmail: "Pradeepa@smimiddleeast.com",
    role: "Full Stack Developer (React, APIs, Kafka) - Bengaluru",
    subject: "Application for Full Stack Developer (React, JavaScript, APIs, Kafka) - Murali Krishna Popuri",
    body: `Hi Pradeepa,

I am writing regarding the Full Stack Developer opening in Bengaluru.

While the requirement mentions 10+ years, I wanted to honestly put forward my candidacy. I bring 2+ years of production experience covering your core technical skills:
- Frontend: React.js, JavaScript, HTML5, CSS3, responsive UI development.
- Backend & APIs: RESTful APIs, Node.js/Express, microservices, and database integration.
- Databases: PostgreSQL, MySQL, and MongoDB.
- Messaging: Hands-on experience with Apache Kafka event streaming.
- DevOps: Docker, Git, CI/CD, and release automation.
- Notice Period: Immediate joiner (0 to 15 days notice, open to Bengaluru).

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
        <p>Hi Pradeepa,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Bengaluru.</p>
        <p>While the posting mentions 10+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, JavaScript, HTML5/CSS3, responsive UI development.</li>
          <li><strong>Backend & APIs:</strong> RESTful APIs, microservices, and third-party integrations.</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, and MongoDB.</li>
          <li><strong>Messaging:</strong> Apache Kafka event streaming.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 to 15 days notice, open to Bengaluru).</li>
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
    company: "Exelon Consulting",
    targetEmail: "prajakta@exelonconsulting.com",
    role: "Full Stack Developer (React.js, REST APIs, SQL) - Bangalore / Hyderabad",
    subject: "Application for Full Stack Developer (React.js, REST APIs, SQL) - Murali Krishna Popuri",
    body: `Hi Prajakta,

I am writing regarding the Full Stack Developer opening in Bangalore / Hyderabad.

While your posting seeks 10+ years of experience, I wanted to honestly share my background as a developer with 2+ years of production experience directly matching your core requirements:
- React.js: Strong, hands-on experience building modern, responsive React.js web interfaces with TypeScript.
- Backend & APIs: RESTful APIs, microservices, and backend logic.
- Databases: SQL (PostgreSQL, MySQL) and NoSQL (MongoDB).
- DevOps & Cloud: Docker containers, Git CI/CD, and AWS cloud environments.
- Notice Period: Immediate joiner (currently serving notice period, available to join with zero delay).

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
        <p>Hi Prajakta,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Bangalore / Hyderabad.</p>
        <p>While the posting indicates 10+ years, I wanted to honestly share my background. I bring <strong>2+ years of production experience</strong> matching your required tech stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>React.js:</strong> Strong hands-on experience building modern React.js web applications with TypeScript.</li>
          <li><strong>Backend:</strong> RESTful APIs, microservices, and database integration.</li>
          <li><strong>Databases:</strong> SQL (PostgreSQL, MySQL) and NoSQL (MongoDB).</li>
          <li><strong>DevOps:</strong> Docker, Git, CI/CD, and AWS cloud services.</li>
          <li><strong>Availability:</strong> Immediate joiner (serving notice period, can join immediately).</li>
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
    company: "ICS Global Soft",
    targetEmail: "geethika@icsglobalsoft.com",
    role: "Full Stack Developer (Node.js, TypeScript, Kafka, REST APIs) - Hyderabad",
    subject: "Application for Full Stack Developer (Node.js, TypeScript, Kafka, REST APIs) - Murali Krishna Popuri",
    body: `Hi Geethika,

I am writing regarding the Full Stack Developer opening in Hyderabad.

While the requirement mentions 8+ years, I wanted to honestly put forward my profile. I bring 2+ years of intensive production experience directly aligned with your tech stack:
- Backend: Node.js, Express, TypeScript, JavaScript (ES6+), and RESTful APIs.
- Event Streaming: Hands-on Apache Kafka integration for real-time event-driven data flows.
- Microservices & DevOps: Microservices architecture, Docker containers, Kubernetes fundamentals, and Git CI/CD.
- Databases: PostgreSQL, SQLite, and MongoDB.
- Frontend: React.js, Vue fundamentals, and modern UI engineering.
- Notice Period: Immediate joiner (currently serving notice period, available to join immediately in Hyderabad).

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
        <p>Hi Geethika,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Hyderabad.</p>
        <p>While the posting mentions 8+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong> directly aligned with your core stack:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Backend:</strong> Node.js, Express, TypeScript, JavaScript (ES6+), and RESTful APIs.</li>
          <li><strong>Event Streaming:</strong> Practical Apache Kafka event streaming for real-time synchronization.</li>
          <li><strong>Microservices & DevOps:</strong> Microservices architecture, Docker containers, and Git CI/CD.</li>
          <li><strong>Databases:</strong> PostgreSQL, SQLite, and MongoDB.</li>
          <li><strong>Frontend:</strong> React.js, Vue fundamentals, and modern component design.</li>
          <li><strong>Availability:</strong> Immediate joiner (0 days notice, open to Hyderabad).</li>
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
    company: "Linkage IT (Talent Team)",
    targetEmail: "talent@linkageit.com",
    role: "Full Stack Developer (React, Kafka, SQL, AI) - Hyderabad / Bangalore",
    subject: "Application for Full Stack Developer (React, Kafka, SQL, AI) - Murali Krishna Popuri",
    body: `Hi Hiring Team at Linkage IT,

I am writing regarding the Full Stack Developer opening in Hyderabad / Bangalore.

While the requirement mentions 8+ years, I wanted to honestly present my background. I bring 2+ years of production experience matching your core technical stack:
- Frontend: React.js, TypeScript, JavaScript, responsive UI design.
- Backend & Messaging: RESTful APIs, Node.js, and Apache Kafka event streaming.
- Databases: SQL (PostgreSQL, MySQL), data modeling, and performance tuning.
- AI Knowledge: Hands-on implementation of RAG architecture, LLM APIs, and agentic workflows.
- Notice Period: Immediate joiner (currently serving notice period, available to join with zero delay).

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
        <p>Hi Hiring Team at Linkage IT,</p>
        <p>I am writing regarding the <strong>Full Stack Developer</strong> opening in Hyderabad / Bangalore.</p>
        <p>While the posting mentions 8+ years, I wanted to honestly share my background as a developer with <strong>2+ years of production experience</strong>:</p>
        <ul style="padding-left: 20px;">
          <li><strong>Frontend:</strong> React.js, TypeScript, JavaScript, responsive UI design.</li>
          <li><strong>Backend & Messaging:</strong> RESTful APIs, Node.js, and Apache Kafka event streaming.</li>
          <li><strong>Databases:</strong> SQL (PostgreSQL, MySQL) and query optimization.</li>
          <li><strong>AI Knowledge:</strong> Hands-on implementation of RAG architecture and LLM APIs.</li>
          <li><strong>Availability:</strong> Immediate joiner (serving notice period, can join immediately).</li>
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
// STRICT RULE: No mention of email inside the WhatsApp message content!
// Must include Portfolio, GitHub, and LinkedIn links.
const whatsappContacts = [
  {
    company: "Luxmorai Technologies Pvt Ltd",
    recruiter: "Lathika Adhira (HR Executive / Talent Acquisition)",
    phone: "+91 90474 71443",
    role: "Full Stack Developer / Python / React / Node.js (Chennai / Bengaluru / Remote)",
    note: "Recruiter note: 'share your resume through WhatsApp.'",
    message: `Hi Lathika,

I came across your post regarding the Full Stack Developer opening at Luxmorai Technologies.

I am a Full-Stack Developer with 2+ years of hands-on experience building end-to-end web applications with React.js, Node.js, Express, Python, TypeScript, and SQL databases. I am an immediate joiner (serving notice period, available with zero delay).

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would be glad to share my resume (Murali_Krishna_Popuri_Resume.pdf) right here on WhatsApp for your review.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811`,
  },
  {
    company: "AARNIKSHA SOLUTIONS",
    recruiter: "Arjun L. (Talent Acquisition)",
    phone: "+91 9391720155",
    role: "Full Stack Developer – ReactJS / NextJS / Node.js / SQL (Bangalore / Hyderabad)",
    note: "Recruiter provided direct contact: 9391720155",
    message: `Hi Arjun,

I am reaching out regarding the Full Stack Developer opening (ReactJS, NextJS, Node.js, SQL) at Aarniksha Solutions.

While your posting requests senior experience, I bring 2+ years of intensive production experience developing full-stack web applications with React.js, Next.js, Node.js, TypeScript, and relational SQL databases. I take end-to-end ownership from design to deployment and can join immediately with zero notice period.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would be happy to share my resume (Murali_Krishna_Popuri_Resume.pdf) with you right here on WhatsApp.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811`,
  },
  {
    company: "Mallang Salma",
    recruiter: "Mansoor MS (Recruitment / Hiring)",
    phone: "+91 9550185379",
    role: "Full Stack Developer / AI Developer / API Integration (Bangalore / Hyderabad)",
    note: "Recruiter requested: WhatsApp: +919550185379",
    message: `Hi Mansoor,

I noticed your posting regarding Full Stack Developer and AI Developer openings in Bangalore and Hyderabad.

I am a Full-Stack Developer with 2+ years of hands-on production experience in React.js, Node.js, REST APIs, SQL/NoSQL databases, and Generative AI integrations (RAG and LLM APIs). I am an immediate joiner available for roles in Hyderabad or Bangalore.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would be glad to share my resume (Murali_Krishna_Popuri_Resume.pdf) directly here on WhatsApp.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811`,
  },
  {
    company: "Skill2Hire Technologies",
    recruiter: "Bhanu Prakash (Founder & CEO)",
    phone: "+91 7349783555",
    role: "Senior AI/ML & Full Stack Engineer (Hyderabad)",
    note: "Recruiter provided direct WhatsApp: 7349783555",
    message: `Hi Bhanu Prakash,

I saw your posting for the AI/ML & Full Stack Engineer role in Hyderabad.

While the role notes 4-6 years, I bring 2+ years of intensive production experience in full-stack engineering (React.js, Node.js, TypeScript, Python) and practical GenAI implementations including RAG architecture, vector databases, and LLM APIs. I am an immediate joiner based in/open to Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would be pleased to share my resume (Murali_Krishna_Popuri_Resume.pdf) right here on WhatsApp.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811`,
  },
  {
    company: "Tanisha Systems",
    recruiter: "Ashish Kumar (Talent Acquisition)",
    phone: "+91 96506 99335",
    role: "Full Stack Developer with Claude AI Experience (Hyderabad)",
    note: "Recruiter listed direct phone number: +91 96506 99335",
    message: `Hi Ashish,

I saw your opening for Full Stack Developer with Claude AI experience in Hyderabad.

I am a Full-Stack Developer with 2+ years of production experience building web applications with React, Node.js, REST APIs, and direct hands-on implementation of Claude AI and LLM APIs in production. I am an immediate joiner based in Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

I would be happy to share my resume (Murali_Krishna_Popuri_Resume.pdf) right here on WhatsApp.

Best regards,
Murali Krishna Popuri
Phone: +91 9347796811`,
  },
];

const whatsappSummaryText = `RECRUITER PHONE & WHATSAPP CONTACTS (BATCH 4)
Generated strictly for Murali Krishna Popuri (${USER_NOTIFICATION_EMAIL})
Resume Sent to HRs: Murali_Krishna_Popuri_Resume.pdf

================================================================================
DIRECT WHATSAPP CONTACTS & READY-TO-COPY MESSAGES (NO EMAIL MENTION)
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
ALL HR APPLICATION EMAILS DISPATCHED IN THIS BATCH (WITH Murali_Krishna_Popuri_Resume.pdf)
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
            Ready-to-Copy WhatsApp Message (No email mention, links included):
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
        <h2 style="margin: 0 0 6px 0; font-size: 20px; color: #ffffff;">Recruiter WhatsApp Numbers & Outreach Summary (Batch 4)</h2>
        <p style="margin: 0; font-size: 13px; color: #94a3b8;">
          Candidate: <strong>Murali Krishna Popuri</strong> | Resume Attached: <strong>Murali_Krishna_Popuri_Resume.pdf</strong>
        </p>
      </div>

      <h3 style="font-size: 16px; color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 6px; margin-top: 24px; margin-bottom: 16px;">
        Recruiter Phone & WhatsApp Contacts (Ready-to-Copy Messages)
      </h3>
      ${contactCards}

      <h3 style="font-size: 16px; color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 6px; margin-top: 32px; margin-bottom: 16px;">
        Target Applications Sent via Email in Batch 4 (${targetApplications.length} Companies)
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
        1. Open WhatsApp on your mobile device.<br/>
        2. Tap the recruiter phone number to open chat directly.<br/>
        3. Copy and paste the customized ready-to-copy message above.<br/>
        4. Send your PDF resume directly on WhatsApp as a document.
      </div>
    </div>
  `;
}

// ─── Execution Logic ─────────────────────────────────────────────────────────
async function runBatch() {
  console.log("================================================================================");
  console.log("STARTING TARGET RECRUITER OUTREACH - BATCH 4");
  console.log(`Sender: ${SENDER_EMAIL}`);
  console.log(`Resume: ${resumePath}`);
  console.log(`Total Target Applications: ${targetApplications.length}`);
  console.log(`Total WhatsApp Contacts: ${whatsappContacts.length}`);
  console.log("================================================================================\n");

  // Deduplication check against previously sent batches
  const pastFiles = [
    'send_parsed_batch_sept11.js',
    'send_parsed_batch_sept11_part2.js',
    'send_parsed_batch_sept11_part3.js'
  ];
  const allPastSent = new Set();
  pastFiles.forEach(f => {
    const fullPath = path.join(__dirname, f);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/targetEmail:\s*['\"][^'\"]+['\"]/g);
      if (matches) {
        matches.forEach(m => {
          allPastSent.add(m.replace(/targetEmail:\s*['\"]/, '').replace(/['\"]/, '').toLowerCase().trim());
        });
      }
    }
  });

  const seenEmails = new Set();
  const dedupedApps = [];
  for (const app of targetApplications) {
    const key = app.targetEmail.toLowerCase().trim();
    if (allPastSent.has(key)) {
      console.log(`Skipping already-emailed address from past batches: ${app.targetEmail}`);
    } else if (seenEmails.has(key)) {
      console.log(`Skipping duplicate email within batch: ${app.targetEmail}`);
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
          filename: "Murali_Krishna_Popuri_Resume.pdf",
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
    subject: "Recruiter WhatsApp Contacts & Ready-to-Copy Messages (Batch 4)",
    text: whatsappSummaryText,
    html: buildHtmlSummary(),
  };

  try {
    const summaryInfo = await transporter.sendMail(summaryMailOptions);
    console.log(`SUCCESS: Summary email sent to ${USER_NOTIFICATION_EMAIL} (Message ID: ${summaryInfo.messageId})`);
  } catch (err) {
    console.error(`FAILED to send summary to ${USER_NOTIFICATION_EMAIL}: ${err.message}`);
  }

  console.log("\nAll batch 4 tasks completed successfully.");
}

runBatch().catch((err) => {
  console.error("Fatal error in batch execution:", err);
  process.exit(1);
});
