/**
 * SEND BATCH 16 DOSSIER TO TEST EMAIL
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

async function sendBatch16Dossier() {
  console.log(`Sending Batch 16 Dossier to ${TARGET_EMAIL}...`);

  const subject = "Batch 16 Dossier: Fresh Recruiter Dispatches, Direct Apply Links & Walk-in Drives";

  const plainText = `Hi Murali,

Here is your Batch 16 Recruiter Outreach Dossier and Curated Apply Links:

1. RECRUITER APPLICATIONS DISPATCHED (WITH RESUME ATTACHED)
----------------------------------------------------------------------
A. Company: Artixio
   Recipient: careers@artixio.com
   Role: Full-Stack Developer (TypeScript, React, Next.js, Node.js, PostgreSQL/SQL)
   Status: Dispatched with custom pitch detailing RestoSoft offline-first LAN sync architecture and zero-data-loss algorithms.

B. Company: Apptad Inc
   Recipient: rutuja.bhosale@apptadinc.com (Rutuja Bhosale, Recruitment Specialist)
   Role: Frontend Engineer – React / Next.js (Pune / Hybrid / Remote)
   Status: Dispatched with steep learning curve pitch and RestoSoft complex enterprise UI experience.

2. DIRECT RECRUITER PHONE LEADS
----------------------------------------------------------------------
A. Recruiter: Burri Ruchitha (Magneq Software, Hyderabad)
   Phone: +91 8790713728
   Status: Followed up on WhatsApp at 2:18 PM. Keep notifications active for her response.

B. Recruiter: Priya (Fortune 500 Client Hiring)
   Phone: +91 9606435268
   Roles: Technical / IT Systems (Bangalore / Hyderabad / Chennai)

3. TOP CURATED DIRECT & EASY APPLY ROLES (MATCHING YOUR CORE STACK)
----------------------------------------------------------------------
1. Postman (Bangalore / Hybrid) – Git-Native Frontend UI Engineer (Electron + React)
   Link: https://lnkd.in/d7ixy4hH (Job ID: JR1000052)
   Match: 100% direct fit with your RestoSoft Electron + React production codebase!

2. EXL (Gurugram) – Full Stack Web Developer (React / Node.js)
   Link: https://www.linkedin.com/jobs/view/4446577561/

3. TM Systems (Ahmedabad / Hybrid) – Full-Stack Developer (React + NodeJS + PostgreSQL)
   Link: https://www.linkedin.com/jobs/view/4469307095/

4. Raglic – Full-Stack Developer (Next.js & Node.js)
   Link: https://www.linkedin.com/jobs/view/4471140745/

5. Egotechworld – Web App Developer (Remote)
   Link: https://www.linkedin.com/jobs/view/4469431800/

4. UPCOMING HYDERABAD WALK-IN & F2F INTERVIEW REMINDER
----------------------------------------------------------------------
- Artech L.L.C. (Monday, 29 September 2026): React.js + TypeScript Developer.
  Recruiter: Siddharth G. (+91 8265998498 | siddharth.gupta@artech.com)
- Test Yantra (Tuesday, 30 September 2026): API / Full Stack Quality Engineer.
  Contact: Meghana Jadhav (WhatsApp: +91 81055 08290)
- Vmanico (Every Tuesday & Wednesday): Hitech City Full Stack (React / Node.js).
  Recruiter: Raj HR (+91 9052509995)

Best regards,
Outreach Engine`;

  const htmlText = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1f2937, #111827); color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
    <h2 style="margin: 0 0 8px 0; color: #60a5fa;">Batch 16 Recruiter Outreach Dossier</h2>
    <p style="margin: 0; color: #d1d5db; font-size: 14px;">Real-time dispatch confirmations, direct recruiter leads & curated high-match applications.</p>
  </div>

  <h3 style="color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">1. Fresh Recruiter Dispatches (Resume Attached)</h3>
  
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 14px;">
    <div style="display: flex; justify-content: space-between; align-items: baseline;">
      <h4 style="margin: 0; color: #0f172a;">Artixio — Full-Stack Developer</h4>
      <span style="background: #dcfce7; color: #166534; font-size: 11px; font-weight: bold; padding: 2px 8px; border-radius: 9999px;">SENT</span>
    </div>
    <p style="margin: 6px 0; font-size: 13px; color: #475569;"><strong>Email:</strong> <a href="mailto:careers@artixio.com">careers@artixio.com</a> | <strong>Tech:</strong> React, Next.js, Node.js, TypeScript, SQL</p>
    <p style="margin: 0; font-size: 13px; color: #334155;"><em>Tailored note included detailing RestoSoft's offline-first LAN sync architecture, WebSockets, SQLite conflict resolution, and Zestchat.</em></p>
  </div>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 20px;">
    <div style="display: flex; justify-content: space-between; align-items: baseline;">
      <h4 style="margin: 0; color: #0f172a;">Apptad Inc — Frontend Engineer (React / Next.js)</h4>
      <span style="background: #dcfce7; color: #166534; font-size: 11px; font-weight: bold; padding: 2px 8px; border-radius: 9999px;">SENT</span>
    </div>
    <p style="margin: 6px 0; font-size: 13px; color: #475569;"><strong>Recruiter:</strong> Rutuja Bhosale (<a href="mailto:rutuja.bhosale@apptadinc.com">rutuja.bhosale@apptadinc.com</a>) | <strong>Location:</strong> Pune / Hybrid / Remote</p>
    <p style="margin: 0; font-size: 13px; color: #334155;"><em>Included steep learning curve pitch, enterprise SaaS UI architecture, and complex tabular data handling from RestoSoft.</em></p>
  </div>

  <h3 style="color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">2. Direct Recruiter Contacts</h3>
  <ul style="padding-left: 20px; font-size: 14px;">
    <li style="margin-bottom: 10px;">
      <strong>Burri Ruchitha</strong> (HR Specialist, Magneq Software - Hyderabad)<br>
      WhatsApp / Phone: <a href="https://wa.me/918790713728">+91 8790713728</a><br>
      <span style="color: #059669; font-weight: 600;">Status: Texted on WhatsApp at 2:18 PM. Keep eyes open for her reply!</span>
    </li>
    <li style="margin-bottom: 10px;">
      <strong>Priya</strong> (Fortune 500 IT Hiring Partner)<br>
      Phone: <a href="tel:+919606435268">+91 9606435268</a> (Bangalore / Hyderabad)
    </li>
  </ul>

  <h3 style="color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">3. Curated Direct Apply Roles (Exact Stack Matches)</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
    <thead>
      <tr style="background: #f1f5f9; text-align: left;">
        <th style="padding: 8px; border: 1px solid #cbd5e1;">Role & Company</th>
        <th style="padding: 8px; border: 1px solid #cbd5e1;">Core Match</th>
        <th style="padding: 8px; border: 1px solid #cbd5e1;">Apply Link</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Postman</strong><br>Git-Native UI Engineer</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; color: #0284c7; font-weight: bold;">100% Match (Electron + React)</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><a href="https://lnkd.in/d7ixy4hH" style="color: #2563eb; font-weight: bold;">Postman Portal</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>EXL</strong><br>Full Stack Web Developer</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">React.js + Node.js</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><a href="https://www.linkedin.com/jobs/view/4446577561/" style="color: #2563eb; font-weight: bold;">Apply on LinkedIn</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>TM Systems</strong><br>Full-Stack Developer</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">React + Node + PostgreSQL</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><a href="https://www.linkedin.com/jobs/view/4469307095/" style="color: #2563eb; font-weight: bold;">Apply on LinkedIn</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Raglic</strong><br>Full-Stack Developer</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">Next.js & Node.js</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><a href="https://www.linkedin.com/jobs/view/4471140745/" style="color: #2563eb; font-weight: bold;">Apply on LinkedIn</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Egotechworld</strong><br>Web App Developer</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;">Full Stack (Remote)</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1;"><a href="https://www.linkedin.com/jobs/view/4469431800/" style="color: #2563eb; font-weight: bold;">Apply on LinkedIn</a></td>
      </tr>
    </tbody>
  </table>

  <h3 style="color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">4. Upcoming Walk-In Drives (Hyderabad)</h3>
  <ul style="padding-left: 20px; font-size: 13px;">
    <li><strong>Artech L.L.C. (Mon, 29 Sept):</strong> React JS + TypeScript Developer. Recruiter: Siddharth G. (<code>+91 8265998498</code> / <code>siddharth.gupta@artech.com</code>)</li>
    <li><strong>Test Yantra (Tue, 30 Sept):</strong> API / Quality Engineer (5.5–7.5 LPA). Recruiter: Meghana Jadhav (WhatsApp: <code>+91 81055 08290</code>)</li>
    <li><strong>Vmanico (Every Tue & Wed):</strong> Hitech City Full Stack (5 Openings). Recruiter: Raj HR (<code>+91 9052509995</code>)</li>
  </ul>
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
    console.log(`Dossier delivered to ${TARGET_EMAIL}! Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`Failed to send dossier to ${TARGET_EMAIL}:`, err.message);
  }
}

sendBatch16Dossier();
