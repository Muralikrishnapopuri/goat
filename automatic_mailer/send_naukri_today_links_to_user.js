/**
 * SEND TODAY'S CURATED NAUKRI LINKS TO USER EMAIL
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

const naukriCategories = [
  {
    role: "Full Stack Developer (React.js + Node.js)",
    skills: "React.js, Node.js, Express, TypeScript, SQL, MongoDB",
    hyd24h: "https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?k=full%20stack%20developer%20react%20node&experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?k=full%20stack%20developer%20react%20node&experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?k=full%20stack%20developer%20react%20node&experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?k=full%20stack%20developer%20react%20node&experience=2&jobAge=7",
  },
  {
    role: "React.js / Next.js Frontend Developer",
    skills: "React.js, Next.js, TypeScript, JavaScript (ES6+), Redux, Tailwind",
    hyd24h: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7",
  },
  {
    role: "Node.js / Express Backend Developer",
    skills: "Node.js, Express.js, REST APIs, WebSockets, PostgreSQL, MySQL, MongoDB",
    hyd24h: "https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7",
  },
  {
    role: "MERN Stack Developer",
    skills: "MongoDB, Express.js, React.js, Node.js, REST APIs",
    hyd24h: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7",
  },
  {
    role: "Immediate Joiner (React / Node / Full Stack)",
    skills: "Immediate Joiner / Short Notice Period (0-15 Days)",
    hyd24h: "https://www.naukri.com/immediate-joiner-react-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1",
    hyd7d: "https://www.naukri.com/immediate-joiner-react-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7",
    blr24h: "https://www.naukri.com/immediate-joiner-react-jobs-in-bengaluru-bangalore?experience=2&jobAge=1",
    blr7d: "https://www.naukri.com/immediate-joiner-react-jobs-in-bengaluru-bangalore?experience=2&jobAge=7",
  },
  {
    role: "Walk-in & In-Person Drives (Hyderabad / Bengaluru)",
    skills: "Walk-in, Face-to-Face Drives (React / Node / Full Stack)",
    hyd24h: "https://www.naukri.com/walkin-jobs-in-hyderabad-secunderabad?k=react%20node&experience=2",
    hyd7d: "https://www.naukri.com/walkin-jobs-in-hyderabad-secunderabad?k=react%20node&experience=2",
    blr24h: "https://www.naukri.com/walkin-jobs-in-bengaluru-bangalore?k=react%20node&experience=2",
    blr7d: "https://www.naukri.com/walkin-jobs-in-bengaluru-bangalore?k=react%20node&experience=2",
  },
];

async function sendNaukriEmail() {
  console.log(`Sending Naukri Curated Links to ${TARGET_EMAIL}...`);

  const subject = "Curated Naukri Job Links — Hyderabad & Bengaluru (Strictly 2 Yrs Exp & Core Stack)";

  const plainText = `Hi Murali,

Here are your curated, direct Naukri links filtered strictly for your 2 years of experience and core tech stack (React, Node, Express, TypeScript, Next.js, MERN):

1. HYDERABAD NAUKRI LINKS (2 YRS EXP)
--------------------------------------------------------------------------------
- Full Stack Developer (React + Node):
  * Past 24h: https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?k=full%20stack%20developer%20react%20node&experience=2&jobAge=1
  * Past 7d: https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?k=full%20stack%20developer%20react%20node&experience=2&jobAge=7

- React.js / Next.js Developer:
  * Past 24h: https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1
  * Past 7d: https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7

- Node.js Backend Developer:
  * Past 24h: https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1
  * Past 7d: https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7

- MERN Stack Developer:
  * Past 24h: https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1
  * Past 7d: https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7

- Immediate Joiners (Hyderabad):
  * Link: https://www.naukri.com/immediate-joiner-react-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1

- Walk-in Drives (Hyderabad):
  * Link: https://www.naukri.com/walkin-jobs-in-hyderabad-secunderabad?k=react%20node&experience=2

--------------------------------------------------------------------------------
2. BENGALURU NAUKRI LINKS (2 YRS EXP)
--------------------------------------------------------------------------------
- Full Stack Developer (React + Node):
  * Past 24h: https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?k=full%20stack%20developer%20react%20node&experience=2&jobAge=1
  * Past 7d: https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?k=full%20stack%20developer%20react%20node&experience=2&jobAge=7

- React.js / Next.js Developer:
  * Past 24h: https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1
  * Past 7d: https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7

- Node.js Backend Developer:
  * Past 24h: https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1
  * Past 7d: https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7

- MERN Stack Developer:
  * Past 24h: https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1
  * Past 7d: https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7

- Immediate Joiners (Bengaluru):
  * Link: https://www.naukri.com/immediate-joiner-react-jobs-in-bengaluru-bangalore?experience=2&jobAge=1

- Walk-in Drives (Bengaluru):
  * Link: https://www.naukri.com/walkin-jobs-in-bengaluru-bangalore?k=react%20node&experience=2

Best regards,
Murali Outreach Engine`;

  const htmlText = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 720px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e3a8a, #0f172a); color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
    <h2 style="margin: 0 0 8px 0; color: #60a5fa;">Curated Naukri Direct Search & Apply Links</h2>
    <p style="margin: 0; color: #cbd5e1; font-size: 14px;">Strictly filtered for 2 Years Experience & Core Stack (React.js, Next.js, Node.js, Express, TypeScript, SQL)</p>
  </div>

  <h3 style="color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">1. Hyderabad Job Search Links (2 Years Experience)</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
    <thead>
      <tr style="background: #f1f5f9; text-align: left;">
        <th style="padding: 10px; border: 1px solid #cbd5e1;">Specialization</th>
        <th style="padding: 10px; border: 1px solid #cbd5e1;">Past 24 Hours</th>
        <th style="padding: 10px; border: 1px solid #cbd5e1;">Past 7 Days</th>
      </tr>
    </thead>
    <tbody>
      ${naukriCategories
        .map(
          (c) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">
            <strong>${c.role}</strong><br>
            <span style="font-size: 11px; color: #64748b;">${c.skills}</span>
          </td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">
            <a href="${c.hyd24h}" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 4px 10px; text-decoration: none; border-radius: 4px; font-weight: 500;">View Today's (24h)</a>
          </td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">
            <a href="${c.hyd7d}" style="display: inline-block; background: #f1f5f9; color: #1e40af; border: 1px solid #93c5fd; padding: 4px 10px; text-decoration: none; border-radius: 4px;">View 7 Days</a>
          </td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <h3 style="color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">2. Bengaluru Job Search Links (2 Years Experience)</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
    <thead>
      <tr style="background: #f1f5f9; text-align: left;">
        <th style="padding: 10px; border: 1px solid #cbd5e1;">Specialization</th>
        <th style="padding: 10px; border: 1px solid #cbd5e1;">Past 24 Hours</th>
        <th style="padding: 10px; border: 1px solid #cbd5e1;">Past 7 Days</th>
      </tr>
    </thead>
    <tbody>
      ${naukriCategories
        .map(
          (c) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">
            <strong>${c.role}</strong><br>
            <span style="font-size: 11px; color: #64748b;">${c.skills}</span>
          </td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">
            <a href="${c.blr24h}" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 4px 10px; text-decoration: none; border-radius: 4px; font-weight: 500;">View Today's (24h)</a>
          </td>
          <td style="padding: 10px; border: 1px solid #cbd5e1;">
            <a href="${c.blr7d}" style="display: inline-block; background: #f1f5f9; color: #1e40af; border: 1px solid #93c5fd; padding: 4px 10px; text-decoration: none; border-radius: 4px;">View 7 Days</a>
          </td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; font-size: 13px; color: #475569;">
    <strong>Pro-Tip for Fast Shortlisting on Naukri:</strong>
    <p style="margin: 6px 0 0 0;">Make sure your Naukri profile headline explicitly mentions: <em>"Full-Stack Developer | React.js, Next.js, Node.js, Express, TypeScript, SQL | Immediate Joiner (Official LWD Nov 11)"</em>. Recruiters filtering for 2 years experience and immediate availability will find your profile at the top of their search results.</p>
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
    console.log(`Naukri Links successfully delivered to ${TARGET_EMAIL}! Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`Failed to send Naukri email to ${TARGET_EMAIL}:`, err.message);
  }
}

sendNaukriEmail();
