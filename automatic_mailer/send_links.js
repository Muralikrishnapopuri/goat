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

const rawTextContent = `JOB SEARCH LINKS — Full Stack Developer (1-3 yrs) — Hyderabad | Bengaluru | Vizag
Updated: Aug 4, 2026

=== DIRECT / VERIFIED OPENINGS ===
Virinchi - React JS Developer (2-3 Yrs) - Hyderabad
https://companies.naukri.com/virinchi-jobs/jobs

Virinchi - React Native Developer (2-3 Yrs) - Hyderabad
https://companies.naukri.com/virinchi-jobs/jobs

Virinchi - PHP Developer (2-4 Yrs) - Hyderabad
https://companies.naukri.com/virinchi-jobs/jobs

Dcoder - Full Stack Developer Node.js/React.js (1-5 Yrs) - Bengaluru
Apply by email: careers@dcoder.tech
https://jobs.techstars.com/companies/dcoder/jobs/71360764-full-stack-developer-nodejs

=== LIVE SEARCH LINKS (filter Experience: 1-3 yrs, sort by Date Posted) ===
Naukri - Full Stack Developer - Hyderabad/Secunderabad
https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad

Naukri - Full Stack Developer - Bangalore
https://www.naukri.com/full-stack-developer-jobs-in-bangalore

Naukri - React Developer - Hyderabad/Secunderabad
https://www.naukri.com/react-developer-jobs-in-hyderabad-secunderabad

Naukri - Node.js Developer - Hyderabad/Secunderabad
https://www.naukri.com/nodejs-jobs-in-hyderabad-secunderabad

LinkedIn - Full Stack Developer - Hyderabad (posted last 24h, newest first)
https://in.linkedin.com/jobs/search/?keywords=full%20stack%20developer&location=Hyderabad&f_TPR=r86400&sortBy=DD&f_E=2,3

LinkedIn - Full Stack Developer - Bengaluru (posted last 24h, newest first)
https://in.linkedin.com/jobs/search/?keywords=full%20stack%20developer&location=Bengaluru&f_TPR=r86400&sortBy=DD&f_E=2,3

Glassdoor - React.js Developer - Hyderabad
https://www.glassdoor.com/Job/hyderabad-reactjs-developer-jobs-SRCH_IL.0,9_IC2865319_KO10,27.htm

Wellfound - Full Stack Developer - Hyderabad
https://wellfound.com/role/l/full-stack-developer/hyderabad

Cutshort - Full Stack Developer - Hyderabad
https://cutshort.io/jobs/fullstack-developer-jobs-in-hyderabad

=== SET UP DAILY ALERTS (1-3 yrs filter saved) ===
LinkedIn: Search "Full Stack Developer" + city -> apply Experience Level filter (Associate/Mid-Senior) -> Create job alert -> Daily
Naukri: Search + city -> set Experience filter to 1-3 -> click bell icon -> Create Alert`;

function convertTextToHtml(text) {
  // Replace URLs with clickable anchors
  let html = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
  // Replace newlines with <br/>
  html = html.split('\n').join('<br/>');
  return `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 650px; margin: 0 auto; padding: 10px;">
      ${html}
    </div>
  `;
}

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "popurimuralikrishna04@gmail.com",
  subject: "JOB SEARCH LINKS — Full Stack Developer (1-3 yrs) — Hyderabad | Bengaluru | Vizag",
  text: rawTextContent,
  html: convertTextToHtml(rawTextContent),
};

async function send() {
  console.log("Sending job search links list to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
