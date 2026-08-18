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

const rawTextContent = `LINKEDIN POST SEARCHES: BULK HIRING, DRIVES & WALK-INS
Click these links to view real-time posts from HRs, companies, and agencies about bulk hires and recruitment drives.

=== LINKEDIN SEARCH LINKS FOR RECENT POSTS (SORTED BY DATE) ===

1. Bulk Hiring - Full Stack / React / Node (Hyderabad & Bengaluru)
https://www.linkedin.com/search/results/content/?keywords=%22bulk%20hiring%22%20AND%20%28%22full%20stack%22%20OR%20%22react%22%20OR%20%22node%22%29%20AND%20%28%22hyderabad%22%20OR%20%22bangalore%22%29&sortBy=%22date_posted%22

2. Walk-in & Hiring Drives - Full Stack / React / Node (Hyderabad & Bengaluru)
https://www.linkedin.com/search/results/content/?keywords=%28%22hiring%20drive%22%20OR%20%22walkin%22%20OR%20%22walk-in%22%29%20AND%20%28%22full%20stack%22%20OR%20%22react%22%20OR%20%22node%22%29%20AND%20%28%22hyderabad%22%20OR%20%22bangalore%22%29&sortBy=%22date_posted%22

3. Recruitment / Pool Drives - Full Stack / React / Node
https://www.linkedin.com/search/results/content/?keywords=%28%22pool%20campus%22%20OR%20%22recruitment%20drive%22%29%20AND%20%28%22full%20stack%22%20OR%20%22react%22%20OR%20%22node%22%29&sortBy=%22date_posted%22

4. Placement Institutions / Agency drives
https://www.linkedin.com/search/results/content/?keywords=%22placement%20drive%22%20AND%20%28%22full%20stack%22%20OR%20%22react%22%29&sortBy=%22date_posted%22

Tip: Once you open any of the links above, you can filter by "Date Posted" (e.g., "Past 24 hours" or "Past Week") in LinkedIn to see only the freshest drives.`;

function convertTextToHtml(text) {
  // Replace URLs with clickable anchors
  let html = text.replace(/(https?:\/\/[^\s\)]+)/g, '<a href="$1" target="_blank">$1</a>');
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
  subject: "LinkedIn Bulk Hiring, Walk-in & Pool Drive Post Searches",
  text: rawTextContent,
  html: convertTextToHtml(rawTextContent),
};

async function send() {
  console.log("Sending LinkedIn post search links to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
