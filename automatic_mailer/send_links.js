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

const rawTextContent = `LATEST JOB OPPORTUNITIES, NAUKRI/LINKEDIN LINKS & RECRUITER POSTS (AUGUST 20, 2026)
Tailored for 2 Years Experience (React.js, Node.js, MERN Stack, PHP, SQL) in Hyderabad & Bengaluru.

=== 1. TODAY'S ACTIVE HIRING COMPANIES & VACANCIES ===

1. Tealvue Software (Hyderabad)
• Role: Full Stack Developer (React.js & Node.js)
• Focus: Cloud SaaS platforms & API architecture

2. Acefluency (Hyderabad)
• Role: Full Stack Engineer (MERN Stack)
• Focus: Scalable web applications & real-time features

3. Neutara Technologies (Bengaluru)
• Role: Full Stack Developer (React / Node / SQL)
• Focus: Web application microservices

4. Arnsoft Technologies (Hyderabad)
• Role: Full Stack Developer (React.js & Node.js)
• Focus: Web applications & database integration

5. Infosys (Hyderabad & Bengaluru)
• Role: Full Stack Developer (React.js / Node.js)
• Focus: Enterprise web solutions


=== 2. LINKEDIN LIVE SEARCH FEEDS (PAST 24 HOURS ONLY) ===

• Full Stack Developer (React/Node) - Hyderabad (Past 24 Hrs, 2 yrs Exp):
https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer%20React%20Node&location=Hyderabad%2C%20Telangana%2C%20India&f_TPR=r86400&f_E=2%2C3

• Full Stack Developer (React/Node) - Bengaluru (Past 24 Hrs, 2 yrs Exp):
https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer%20React%20Node&location=Bengaluru%2C%20Karnataka%2C%20India&f_TPR=r86400&f_E=2%2C3

• MERN / Full Stack Developer - Remote India (Past 24 Hrs):
https://www.linkedin.com/jobs/search/?keywords=MERN%20Full%20Stack%20Developer&location=India&f_WT=2&f_TPR=r86400

• React.js & Node.js Developer - Easy Apply Only (Past 24 Hrs):
https://www.linkedin.com/jobs/search/?keywords=React%20Node.js%20Developer&location=India&f_TPR=r86400&f_AL=true&f_E=2%2C3


=== 3. NAUKRI LIVE SEARCH FEEDS (PAST 24 HOURS ONLY) ===

• Full Stack Developer - Hyderabad (Past 24 Hrs, 2 yrs Exp):
https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&daysToWash=1

• Full Stack Developer - Bengaluru (Past 24 Hrs, 2 yrs Exp):
https://www.naukri.com/full-stack-developer-jobs-in-bengaluru?experience=2&daysToWash=1

• MERN Stack Developer - Hyderabad & Bengaluru (Past 24 Hrs):
https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad-bengaluru?experience=2&daysToWash=1

• React.js & Node.js Developer - Remote / India (Past 24 Hrs):
https://www.naukri.com/react-node-jobs-in-india?experience=2&daysToWash=1


=== 4. LATEST LINKEDIN RECRUITER & HR HIRING POST FEEDS ===

• Recruiter Posts: "Hiring Full Stack Developer" (Hyderabad - Past 24h):
https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=%22hiring%22%20%22full%20stack%20developer%22%20Hyderabad

• Recruiter Posts: "Hiring React Node" (Bengaluru - Past 24h):
https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=%22hiring%22%20%22react%22%20%22node%22%20Bengaluru

• Recruiter Posts: "Hiring MERN Stack" (Past 24h):
https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=%22hiring%22%20%22MERN%20stack%22

• IT Recruiters & Talent Acquisition Profiles in Hyderabad:
https://www.linkedin.com/search/results/people/?keywords=%22Talent%20Acquisition%22%20OR%20%22IT%20Recruiter%22&origin=GLOBAL_SEARCH_HEADER&location=Hyderabad

• IT Recruiters & Talent Acquisition Profiles in Bengaluru:
https://www.linkedin.com/search/results/people/?keywords=%22Talent%20Acquisition%22%20OR%20%22IT%20Recruiter%22&origin=GLOBAL_SEARCH_HEADER&location=Bengaluru`;

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
  subject: "Latest Job Opportunities, LinkedIn/Naukri Links & Recruiter Posts (August 20, 2026)",
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
