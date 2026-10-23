/**
 * SEND TODAY'S CURATED LINKEDIN POST SEARCH LINKS TO USER EMAIL
 * Target: popurimuralikrishna04@gmail.com
 */

const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TARGET_EMAIL = "popurimuralikrishna04@gmail.com";

if (!GMAIL_APP_PASSWORD) {
  console.error("FATAL: GMAIL_APP_PASSWORD is not set in .env!");
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

const searchLinks = [
  {
    role: "Frontend Developer (React / Next.js / TypeScript)",
    hyd: "https://www.linkedin.com/search/results/content/?keywords=%28%22Frontend%22+OR+%22React%22+OR+%22Next.js%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22+OR+%22immediate+joiner%22%29+Hyderabad+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
    blr: "https://www.linkedin.com/search/results/content/?keywords=%28%22Frontend%22+OR+%22React%22+OR+%22Next.js%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22+OR+%22immediate+joiner%22%29+Bengaluru+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
  },
  {
    role: "Backend Developer (Node.js / Express)",
    hyd: "https://www.linkedin.com/search/results/content/?keywords=%28%22Backend+Developer%22+OR+%22Node.js%22+OR+%22Node%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22+OR+%22immediate+joiner%22%29+Hyderabad+-intern+-trainer+-Java&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
    blr: "https://www.linkedin.com/search/results/content/?keywords=%28%22Backend+Developer%22+OR+%22Node.js%22+OR+%22Node%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22+OR+%22immediate+joiner%22%29+Bengaluru+-intern+-trainer+-Java&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
  },
  {
    role: "Full Stack Developer (React + Node)",
    hyd: "https://www.linkedin.com/search/results/content/?keywords=%28%22Full+Stack%22+OR+%22FullStack%22%29+%28%22React%22+OR+%22Node%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22%29+Hyderabad+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
    blr: "https://www.linkedin.com/search/results/content/?keywords=%28%22Full+Stack%22+OR+%22FullStack%22%29+%28%22React%22+OR+%22Node%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22%29+Bengaluru+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
  },
  {
    role: "MERN Stack Developer",
    hyd: "https://www.linkedin.com/search/results/content/?keywords=%22MERN%22+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22+OR+%22immediate+joiner%22%29+Hyderabad+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
    blr: "https://www.linkedin.com/search/results/content/?keywords=%22MERN%22+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22+OR+%22immediate+joiner%22%29+Bengaluru+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
  },
  {
    role: "JavaScript / TypeScript Developer",
    hyd: "https://www.linkedin.com/search/results/content/?keywords=%28%22JavaScript+Developer%22+OR+%22TypeScript+Developer%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22%29+Hyderabad+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
    blr: "https://www.linkedin.com/search/results/content/?keywords=%28%22JavaScript+Developer%22+OR+%22TypeScript+Developer%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22%29+Bengaluru+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
  },
  {
    role: "Node.js Developer",
    hyd: "https://www.linkedin.com/search/results/content/?keywords=%28%22Node.js+Developer%22+OR+%22Node+Developer%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22%29+Hyderabad+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
    blr: "https://www.linkedin.com/search/results/content/?keywords=%28%22Node.js+Developer%22+OR+%22Node+Developer%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22%29+Bengaluru+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
  },
  {
    role: "Software Engineer (React / Node / Web)",
    hyd: "https://www.linkedin.com/search/results/content/?keywords=%28%22Software+Engineer%22+OR+%22SDE%22%29+%28%22React%22+OR+%22Node%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22%29+Hyderabad+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
    blr: "https://www.linkedin.com/search/results/content/?keywords=%28%22Software+Engineer%22+OR+%22SDE%22%29+%28%22React%22+OR+%22Node%22%29+%28%22hiring%22+OR+%22share+resume%22+OR+%22send+cv%22%29+Bengaluru+-intern+-trainer&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
  },
  {
    role: "Immediate Joiner Posts (Today Only)",
    hyd: "https://www.linkedin.com/search/results/content/?keywords=%28%22immediate+joiner%22+OR+%22immediate+joiners%22%29+%28%22React%22+OR+%22Node%22+OR+%22Full+Stack%22%29+Hyderabad+-intern&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
    blr: "https://www.linkedin.com/search/results/content/?keywords=%28%22immediate+joiner%22+OR+%22immediate+joiners%22%29+%28%22React%22+OR+%22Node%22+OR+%22Full+Stack%22%29+Bengaluru+-intern&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
  },
  {
    role: "Walk-in & Face-to-Face Drives (Today)",
    hyd: "https://www.linkedin.com/search/results/content/?keywords=%28%22walk-in%22+OR+%22walk+in%22+OR+%22F2F%22+OR+%22face+to+face%22%29+%28%22React%22+OR+%22Full+Stack%22+OR+%22Node%22%29+Hyderabad+-intern&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
    blr: "https://www.linkedin.com/search/results/content/?keywords=%28%22walk-in%22+OR+%22walk+in%22+OR+%22F2F%22+OR+%22face+to+face%22%29+%28%22React%22+OR+%22Full+Stack%22+OR+%22Node%22%29+Bengaluru+-intern&sortBy=%22date_posted%22&datePosted=%22past-24h%22",
  },
];

async function sendEmail() {
  console.log(`Sending LinkedIn Search Links to ${TARGET_EMAIL}...`);

  const subject = "Today's Live LinkedIn Hiring Post Links — Hyderabad & Bengaluru (Past 24 Hours)";

  const plainText = `Hi Murali,

Here are the direct LinkedIn Post Search Links filtered for TODAY ONLY (Past 24 Hours) across all your core skills:

${searchLinks
  .map(
    (item, index) => `${index + 1}. ${item.role}
   - Hyderabad (Past 24h): ${item.hyd}
   - Bengaluru (Past 24h): ${item.blr}
`
  )
  .join("\n")}

ANTI-SPAM DEDUPLICATION GUARANTEE:
Whenever you copy and paste post dumps from these links, the automated dispatch engine strictly validates each recruiter against sent_history.json. Any recruiter who has already received an email is automatically SKIPPED.

Best regards,
Outreach Engine`;

  const htmlText = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 740px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0a66c2, #004182); color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
    <h2 style="margin: 0 0 8px 0; color: #ffffff;">Today's Live LinkedIn Post Searches (Past 24h)</h2>
    <p style="margin: 0; color: #e2e8f0; font-size: 14px;">Instant 1-click links sorted by date posted for Hyderabad & Bengaluru. Zero spam deduplication active.</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
    <thead>
      <tr style="background: #f1f5f9; text-align: left;">
        <th style="padding: 10px; border: 1px solid #cbd5e1;">Target Role / Domain</th>
        <th style="padding: 10px; border: 1px solid #cbd5e1;">Hyderabad (Today)</th>
        <th style="padding: 10px; border: 1px solid #cbd5e1;">Bengaluru (Today)</th>
      </tr>
    </thead>
    <tbody>
      ${searchLinks
        .map(
          (c) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>${c.role}</strong></td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">
            <a href="${c.hyd}" style="display: inline-block; background: #0a66c2; color: #ffffff; padding: 5px 10px; text-decoration: none; border-radius: 4px; font-weight: 500;">Hyderabad Posts</a>
          </td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">
            <a href="${c.blr}" style="display: inline-block; background: #0a66c2; color: #ffffff; padding: 5px 10px; text-decoration: none; border-radius: 4px; font-weight: 500;">Bengaluru Posts</a>
          </td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 14px; font-size: 13px; color: #065f46;">
    <strong>Anti-Spam & Deduplication Guarantee:</strong>
    <p style="margin: 6px 0 0 0;">As soon as you paste results from any of these links into the chat, the engine checks every extracted recruiter email against <code>sent_history.json</code>. Any recruiter already contacted is immediately skipped so that <strong>no recruiter ever receives a duplicate email</strong>.</p>
  </div>
</body>
</html>`;

  try {
    const info = await transporter.sendMail({
      from: `"Murali Outreach Agent" <${SENDER_EMAIL}>`,
      to: TARGET_EMAIL,
      subject: subject,
      text: plainText,
      html: htmlText,
      headers: {
        "X-Mailer": "Apple Mail (2.3654.120.0.1)",
        Importance: "Normal",
        "X-Priority": "3",
      },
    });
    console.log(`Delivered search links to ${TARGET_EMAIL}! Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`Failed to send email to ${TARGET_EMAIL}:`, err.message);
  }
}

sendEmail();
