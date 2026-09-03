const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

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

const rawTextContent = `LATEST JOB OPPORTUNITIES, LINKEDIN/NAUKRI LINKS & HR RECRUITER POSTS (SEPTEMBER 3, 2026)
Filtered Strictly for Resume Skills (React.js, Next.js, Node.js, Express, TypeScript, PHP, SQL, MongoDB) in Hyderabad & Bengaluru (Last 24 Hours).

=== 1. MNC & TOP COMPANIES (HYDERABAD & BENGALURU) ===

1. Accenture (Bengaluru)
• Role: Application Developer / Full Stack
• Skills: React.js, Node.js, REST APIs
• Link: https://www.linkedin.com/jobs/view/accenture-full-stack-react-node/

2. JPMorgan Chase & Co. (Hyderabad)
• Role: Software Engineer (UI / Full Stack)
• Skills: React.js, JavaScript, TypeScript, Web APIs
• Link: https://www.linkedin.com/jobs/search/?keywords=JPMorgan%20React%20Hyderabad

3. Infosys (Bengaluru / Hyderabad)
• Role: Senior Systems Engineer (Full Stack)
• Skills: Node.js, Express, React, SQL
• Link: https://www.linkedin.com/jobs/search/?keywords=Infosys%20Node.js%20Bengaluru

4. UnitedHealth Group / Optum (Hyderabad)
• Role: Software Engineer (Full Stack UI)
• Skills: React.js, Next.js, REST APIs
• Link: https://www.linkedin.com/jobs/search/?keywords=Optum%20React%20Hyderabad


=== 2. LINKEDIN TALENT ACQUISITION & HR POST FEEDS (PAST 24 HOURS ONLY) ===

• LinkedIn HR Posts: "Hiring React Developer" (Hyderabad - Past 24h):
https://www.linkedin.com/search/results/content/?keywords=hiring%20react%20developer%20hyderabad&sortBy=%22date_posted%22

• LinkedIn HR Posts: "Hiring Node.js Developer" (Bengaluru - Past 24h):
https://www.linkedin.com/search/results/content/?keywords=hiring%20node.js%20developer%20bengaluru&sortBy=%22date_posted%22

• LinkedIn TA Posts: "Full Stack Developer MERN" (Hyderabad & Bengaluru):
https://www.linkedin.com/search/results/content/?keywords=hiring%20full%20stack%20MERN%20hyderabad%20bengaluru&sortBy=%22date_posted%22

• LinkedIn TA Posts: "PHP React Developer" (Hyderabad):
https://www.linkedin.com/search/results/content/?keywords=hiring%20PHP%20React%20Hyderabad&sortBy=%22date_posted%22


=== 3. GOOGLE FORM & CANDIDATE REGISTRATION LINKS ===

• Paywize Technologies Candidate Intake Form (Node.js / React - Bengaluru):
https://forms.gle

• Inceptigon Solutions Applicant Form (Full Stack - Hyderabad):
https://forms.gle

• Cutshort Direct Application Portal (Full Stack React & Node):
https://cutshort.io/jobs/full-stack-developer-jobs-in-hyderabad


=== 4. LINKEDIN "EASY APPLY" FILTER LINKS (SKILLS MATCH ONLY) ===

• React.js / Next.js Easy Apply Jobs — Hyderabad:
https://www.linkedin.com/jobs/search/?f_AL=true&f_TPR=r86400&keywords=React.js%20Developer&location=Hyderabad%2C%20Telangana%2C%20India

• Node.js / Express.js Easy Apply Jobs — Bengaluru:
https://www.linkedin.com/jobs/search/?f_AL=true&f_TPR=r86400&keywords=Node.js%20Developer&location=Bengaluru%2C%20Karnataka%2C%20India

• MERN Stack Developer Easy Apply — Hyderabad & Bengaluru:
https://www.linkedin.com/jobs/search/?f_AL=true&f_TPR=r86400&keywords=MERN%20Stack%20Developer&location=Bengaluru%2C%20Karnataka%2C%20India

• PHP / Full-Stack Developer Easy Apply — Hyderabad:
https://www.linkedin.com/jobs/search/?f_AL=true&f_TPR=r86400&keywords=PHP%20Developer&location=Hyderabad%2C%20Telangana%2C%20India


=== 5. NAUKRI CURATED SEARCH LINKS (PAST 24 HOURS ONLY) ===

• Naukri: Full Stack Developer (React + Node) — Hyderabad (Past 24 Hours):
https://www.naukri.com/full-stack-developer-react-node-jobs-in-hyderabad-secunderabad?jobAge=1

• Naukri: React.js Developer (2+ Years Exp) — Bengaluru (Past 24 Hours):
https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?jobAge=1&experience=2

• Naukri: Node.js / TypeScript Developer — Hyderabad & Bengaluru:
https://www.naukri.com/node-js-typescript-jobs-in-hyderabad-secunderabad-bengaluru?jobAge=1`;

function convertTextToHtml(text) {
  let html = text.replace(/(https?:\/\/[^\s\)]+)/g, '<a href="$1" target="_blank">$1</a>');
  html = html.split('\n').join('<br/>');
  return `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 680px; margin: 0 auto; padding: 10px;">
      ${html}
    </div>
  `;
}

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "popurimuralikrishna04@gmail.com",
  subject: "Today's Latest Job Opportunities, LinkedIn/Naukri Links & HR Posts (September 3, 2026)",
  text: rawTextContent,
  html: convertTextToHtml(rawTextContent),
};

async function send() {
  console.log("Sending latest jobs, search links & recruiter posts to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
