/**
 * SEND BATCH 17 DOSSIER TO TEST EMAIL
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

async function sendBatch17Dossier() {
  console.log(`Sending Batch 17 Dossier to ${TARGET_EMAIL}...`);

  const subject = "Batch 17 Dossier: Deduplication Audit (13 Duplicates Blocked) & Fresh Dispatches";

  const plainText = `Hi Murali,

Here is your Batch 17 Recruiter Outreach Dossier with strict deduplication verification:

1. DEDUPLICATION AUDIT (13 DUPLICATE EMAILS STRICTLY SKIPPED)
----------------------------------------------------------------------
The following 13 recruiters from your feed were already contacted in previous batches and have been STRICTLY SKIPPED to prevent duplicate emails:
- shweta.rai@programming.com (Programming.com)
- anudeepthi.vadde@techno-facts.com (Techno Facts)
- sowmya@nilasu.com (Nilasu)
- swetapadma@briskwinit.com (Briskwin IT)
- anusha.a@martinettechnologies.com (Martinet Technologies)
- rishitha.b@martinettechnologies.com (Martinet Technologies)
- careers@innomaxsol.com (Innomax)
- aishwarya.rani@cielhr.com (CIEL HR)
- divyam@petadata.ai (PetaData / SFTECH)
- pavanm@petadata.ai (PetaData / SFTECH)
- venkateshbabu.k@techno-facts.com (Techno Facts)
- shalima@apptad.com (Apptad)
- krishnashiva18millionminds@gmail.com (Million Minds)

2. FRESH HIGH-MATCH RECRUITER DISPATCHES (RESUME ATTACHED)
----------------------------------------------------------------------
A. Company: Vancor AI LLC (Hyderabad)
   Email: careers@vancor.ai
   Role: MERN Full Stack Developer (React.js, Node.js, Express.js, MongoDB, TypeScript)
   Status: 100% Direct Match - Dispatched with custom pitch and resume attached.

B. Company: Techno-Facts Solutions (Hyderabad)
   Email: umamaheswari.s@techno-facts.com (Umashree Saragalla - 8296412546)
   Role: Front End Developer (React.js, TypeScript, Redux)
   Status: Dispatched with steep learning curve pitch and RestoSoft UI context.

C. Company: TekPillar (Bangalore / Hyderabad)
   Email: srushti.j@tekpillar.com (Srushti Jivani - +91 90812 92808)
   Role: Full Stack Engineer (React 18, TypeScript, REST APIs, Microservices)
   Status: Dispatched with steep learning curve pitch and resume attached.

3. TOP DIRECT APPLY & RECRUITER PHONE LEADS
----------------------------------------------------------------------
- Plane (Hyderabad Team): Engineering Roles (Backend Node.js, Frontend React)
  Apply: https://plane.so/careers | GitHub: https://github.com/makeplane/plane
- MailerMen (Hyderabad Hybrid): Backend Developer (Node.js, Express, REST APIs)
  Apply: https://lnkd.in/dgmF2t2Z
- Srushti Jivani (TekPillar): +91 90812 92808 (WhatsApp / Call)
- Umashree Saragalla (Techno-Facts): 8296412546 (Call)
- Raj HR (Vmanico - Hitech City Walk-in): 9052509995

Best regards,
Outreach Engine`;

  const htmlText = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 720px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #059669, #065f46); color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
    <h2 style="margin: 0 0 8px 0; color: #ffffff;">Batch 17: Anti-Duplication Audit & Fresh Dispatches</h2>
    <p style="margin: 0; color: #d1fae5; font-size: 14px;">13 Duplicates Blocked • 3 Clean Applications Sent • Direct Apply & WhatsApp Leads</p>
  </div>

  <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 14px; margin-bottom: 20px;">
    <h4 style="margin: 0 0 8px 0; color: #991b1b;">🛡️ Anti-Spam Safety: 13 Duplicate Recruiters Successfully Blocked</h4>
    <p style="margin: 0 0 6px 0; font-size: 12px; color: #7f1d1d;">The following recruiters from your feed were already sent an email earlier and were <strong>automatically skipped</strong> to protect your account reputation:</p>
    <div style="font-size: 12px; color: #4b5563; line-height: 1.5;">
      <code>shweta.rai@programming.com</code>, <code>anudeepthi.vadde@techno-facts.com</code>, <code>sowmya@nilasu.com</code>, <code>swetapadma@briskwinit.com</code>, <code>anusha.a@martinettechnologies.com</code>, <code>rishitha.b@martinettechnologies.com</code>, <code>careers@innomaxsol.com</code>, <code>aishwarya.rani@cielhr.com</code>, <code>divyam@petadata.ai</code>, <code>pavanm@petadata.ai</code>, <code>venkateshbabu.k@techno-facts.com</code>, <code>shalima@apptad.com</code>, <code>krishnashiva18millionminds@gmail.com</code>
    </div>
  </div>

  <h3 style="color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Fresh Recruiter Dispatches (Resume Attached)</h3>
  
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 12px;">
    <h4 style="margin: 0; color: #0f172a;">1. Vancor AI LLC — MERN Full Stack Developer (Hyderabad)</h4>
    <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Email:</strong> <a href="mailto:careers@vancor.ai">careers@vancor.ai</a> | <strong>Tech:</strong> React.js, Node.js, Express, MongoDB, TypeScript</p>
    <p style="margin: 0; font-size: 13px; color: #166534; font-weight: 500;">✓ 100% Direct Match with your 2 years MERN production experience.</p>
  </div>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 12px;">
    <h4 style="margin: 0; color: #0f172a;">2. Techno-Facts — Front End Developer React (Hyderabad Hybrid)</h4>
    <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Recruiter:</strong> Umashree Saragalla (<a href="mailto:umamaheswari.s@techno-facts.com">umamaheswari.s@techno-facts.com</a> / Call: 8296412546)</p>
    <p style="margin: 0; font-size: 13px; color: #334155;"><em>Dispatched with fast learning curve pitch and RestoSoft complex UI engineering context.</em></p>
  </div>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 20px;">
    <h4 style="margin: 0; color: #0f172a;">3. TekPillar — Full Stack Engineer (Bangalore / Hyderabad)</h4>
    <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Recruiter:</strong> Srushti Jivani (<a href="mailto:srushti.j@tekpillar.com">srushti.j@tekpillar.com</a> / Call & WhatsApp: +91 90812 92808)</p>
    <p style="margin: 0; font-size: 13px; color: #334155;"><em>Dispatched with React 18, TypeScript, REST APIs, and microservices pitch.</em></p>
  </div>

  <h3 style="color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Hot Direct Apply & Recruiter Phone Leads</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
    <thead>
      <tr style="background: #f1f5f9; text-align: left;">
        <th style="padding: 8px; border: 1px solid #cbd5e1;">Opportunity / Recruiter</th>
        <th style="padding: 8px; border: 1px solid #cbd5e1;">Role & Location</th>
        <th style="padding: 8px; border: 1px solid #cbd5e1;">Contact / Link</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Plane</strong><br>(Avinash A.)</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">Backend (Node.js) & Frontend (React)<br>Hyderabad Team</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><a href="https://plane.so/careers" style="color: #2563eb; font-weight: bold;">plane.so/careers</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>MailerMen</strong><br>(Fazil Raza)</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">Backend Developer (Node.js + REST APIs)<br>Hyderabad (₹4.6L–₹4.9L)</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><a href="https://lnkd.in/dgmF2t2Z" style="color: #2563eb; font-weight: bold;">Apply Link</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Srushti Jivani</strong><br>(TekPillar)</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">Senior Full Stack (React / TypeScript)<br>Bangalore / Hyderabad</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><a href="https://wa.me/919081292808" style="color: #059669; font-weight: bold;">+91 90812 92808</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Umashree Saragalla</strong><br>(Techno-Facts)</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">Front End Developer (React.js)<br>Hyderabad (Hybrid)</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>8296412546</strong> (Direct Call)</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Raj HR</strong><br>(Vmanico)</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">Full Stack (Node/React - 5 Vacancies)<br>Hitech City (Tue/Wed Walk-In)</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>9052509995</strong> (Call to Schedule)</td>
      </tr>
    </tbody>
  </table>
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
    console.log(`Delivered Batch 17 Dossier to ${TARGET_EMAIL}! Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`Failed to send dossier to ${TARGET_EMAIL}:`, err.message);
  }
}

sendBatch17Dossier();
