/**
 * SEND BATCH 18 DOSSIER TO TEST EMAIL
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

async function sendBatch18Dossier() {
  console.log(`Sending Batch 18 Dossier to ${TARGET_EMAIL}...`);

  const subject = "Batch 18 Dossier: Deduplication Audit (3 Duplicates Blocked) & Fresh Dispatches";

  const plainText = `Hi Murali,

Here is your Batch 18 Recruiter Outreach Dossier with strict deduplication verification:

1. DEDUPLICATION AUDIT (3 DUPLICATE EMAILS STRICTLY SKIPPED)
----------------------------------------------------------------------
The following 3 recruiters from your feed were already contacted in previous batches and have been STRICTLY SKIPPED to prevent duplicate emails:
- Shalima@apptad.com (Apptad - previously contacted on 2026-09-26)
- Shireesha.b@martinettechnologies.com (Martinet Technologies - previously contacted on 2026-09-22)
- rishitha.b@martinettechnologies.com (Martinet Technologies - previously contacted on 2026-09-22)

Job Seekers / Bench Sales Vendors Filtered Out (No Application Needed):
- anupamkush9@gmail.com (Job Seeker)
- charipallithirumalesh@gmail.com (Job Seeker)
- satputeshankar1997@gmail.com (Job Seeker)
- yogeshwar.yaduwanshi@gmail.com (Job Seeker)
- thomasd@koyaconsult.com (Bench Sales C2C Vendor)

2. FRESH HIGH-MATCH RECRUITER DISPATCHES (RESUME ATTACHED)
----------------------------------------------------------------------
A. Company: OctavoLab (Hyderabad)
   Email: connect@octavolab.com
   Role: Full Stack Engineer (2-4 Years experience bracket - direct fit!)
   Tech: React, TypeScript, Node.js, PostgreSQL, Tailwind
   Status: Dispatched with custom pitch and resume attached.

B. Company: Abilio IT (Hyderabad)
   Email: aravind.m@abilioit.com
   Recruiter: Msv Aravind (Talent Acquisition Specialist)
   Role: AI Full Stack Engineer (2-6 Years experience bracket - direct fit!)
   Tech: MERN Stack (MongoDB, Express, React, Node), Redux, AWS, Antigravity IDE & AI tooling
   Status: Dispatched with custom pitch and resume attached.

C. Company: Satus Smart Solutions (Hyderabad)
   Email: mpraveen@satussmart.com
   Recruiter: Praveen M. (Talent Acquisition)
   Role: Sr. Full Stack (MERN) Developer (3-7 Years)
   Tech: React.js, Node.js, Express.js, MongoDB, REST APIs, React Native
   Status: Dispatched with Rule 2 fast-learning pitch and resume attached.

D. Company: Executive Recruitment (Hyderabad / Hybrid)
   Email: officialuserecruitment@gmail.com
   Recruiter: Santha Suvami Parida
   Role: MERN Stack / Fullstack Developer with React & Node
   Tech: React.js, Node.js, Express.js, MongoDB, REST APIs
   Status: Dispatched with custom pitch and resume attached.

E. Company: Programming.com (Hyderabad / Bangalore)
   Email: siya.thakur@programming.com
   Recruiter: Siya Thakur (Phone: 8626871341)
   Role: Full Stack Engineer (React / Node / AWS)
   Tech: TypeScript, Node.js, React, AWS, Serverless, AI-assisted development
   Status: Dispatched with custom pitch and resume attached.

F. Company: Programming.com (Hyderabad WFO)
   Email: jaisika.batra@programming.com
   Recruiter: Jaisika Batra
   Role: Full Stack Engineer (Network Tech)
   Tech: AWS, TypeScript, Node.js, React, REST/GraphQL
   Status: Dispatched with custom pitch and resume attached.

G. Company: UHV Software Solutions (Hyderabad - Hybrid)
   Email: info@uhvsoftwaresolutions.com
   Recruiter: Kavva sahasra Reddy
   Role: Full Stack Engineer
   Tech: React.js, Next.js, TypeScript, REST APIs, PostgreSQL/MySQL, AWS
   Status: Dispatched with requested details and resume attached.

H. Company: PETADATA / SFTECH (Hyderabad)
   Email: varshithamm@petadata.ai
   Recruiter: Medisetti Varshitha
   Role: Full Stack Developer
   Tech: React, Next.js, Node.js, TypeScript, REST/GraphQL APIs, AWS
   Status: Dispatched with custom pitch and resume attached.

3. DIRECT PHONE / WHATSAPP RECRUITER LEADS
----------------------------------------------------------------------
- Siya Thakur (Programming.com): 8626871341
- Revathi R / Jamshida H (VY Systems): 63850 76144 (jamshida.h@vysystems.com)
- ApexGrid / KarmaDisha (Walk-in / Portal): +91 73851 22872 (Madhapur, Hyderabad)

4. DIRECT CAREER PORTAL APPLY LINKS
----------------------------------------------------------------------
- FedEx: Full Stack Developer I (Hyderabad, 1–3 Years, ₹14–24 LPA)
  Link: https://careers.fedex.com/full-stack-developer-i/job/P25-329771-1
- GHX: Software Engineer II (Hyderabad Onsite, 2–3 Years)
  Link: https://buff.ly/ECgqFjE
- Akkodis: Software Developer (PHP + React, Hyderabad)
  Link: https://lnkd.in/dTZ_a47Y
- GE Vernova: Software Engineer (Bengaluru, Java/React)
  Link: https://buff.ly/fvqOoTE

Best regards,
Automated Anti-Spam Mailer Engine`;

  const htmlText = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 750px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 22px;">Batch 18 Recruiter Outreach Dossier</h1>
    <p style="margin: 6px 0 0; opacity: 0.9; font-size: 14px;">Strict Deduplication Audit &bull; 8 Fresh Recruiter Applications Dispatched &bull; Direct Apply Links</p>
  </div>

  <div style="background: #fff; border: 1px solid #e1e4e8; border-radius: 6px; padding: 18px; margin-bottom: 20px;">
    <h2 style="margin-top: 0; color: #d73a49; font-size: 16px; border-bottom: 2px solid #ffdce0; padding-bottom: 8px;">
      1. Deduplication Audit (3 Duplicates Strictly Skipped)
    </h2>
    <p style="font-size: 13px; color: #586069;">The following recruiters were detected from your feed but were already contacted in previous batches. They were <strong>strictly skipped</strong> to guarantee zero spamming:</p>
    <ul style="font-size: 13px; color: #24292e;">
      <li><strong>Shalima@apptad.com</strong> (Apptad - previously contacted on Sept 26)</li>
      <li><strong>Shireesha.b@martinettechnologies.com</strong> (Martinet Tech - previously contacted on Sept 22)</li>
      <li><strong>rishitha.b@martinettechnologies.com</strong> (Martinet Tech - previously contacted on Sept 22)</li>
    </ul>
    <p style="font-size: 13px; color: #586069;">Job seekers / bench sales filtered out (no emails sent): <em>anupamkush9@gmail.com, charipallithirumalesh@gmail.com, satputeshankar1997@gmail.com, yogeshwar.yaduwanshi@gmail.com, thomasd@koyaconsult.com</em></p>
  </div>

  <div style="background: #fff; border: 1px solid #e1e4e8; border-radius: 6px; padding: 18px; margin-bottom: 20px;">
    <h2 style="margin-top: 0; color: #28a745; font-size: 16px; border-bottom: 2px solid #dcffe4; padding-bottom: 8px;">
      2. Fresh Recruiter Dispatches (Batch 18 - Resume PDF Attached)
    </h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <thead>
        <tr style="background: #f6f8fa; text-align: left;">
          <th style="padding: 8px; border: 1px solid #e1e4e8;">Company</th>
          <th style="padding: 8px; border: 1px solid #e1e4e8;">Recruiter / Email</th>
          <th style="padding: 8px; border: 1px solid #e1e4e8;">Role & Stack</th>
          <th style="padding: 8px; border: 1px solid #e1e4e8;">Match Quality</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>OctavoLab</strong> (Hyderabad)</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">connect@octavolab.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Full Stack Engineer (2-4 yrs)<br>React, TS, Node, PostgreSQL</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #28a745; font-weight: bold;">Bullseye (2 yrs exact)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Abilio IT</strong> (Hyderabad)</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Msv Aravind<br>aravind.m@abilioit.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">AI Full Stack Engineer (2-6 yrs)<br>MERN + Antigravity IDE exposure</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #28a745; font-weight: bold;">Bullseye (MERN + AI)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Satus Smart Solutions</strong></td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Praveen M.<br>mpraveen@satussmart.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Sr. Full Stack (MERN) Developer<br>React, Node, Express, MongoDB</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0366d6; font-weight: bold;">High (Rule 2 Pitch)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Executive Recruitment</strong></td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Santha Suvami Parida<br>officialuserecruitment@gmail.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">MERN Full Stack Developer<br>React & Node.js, Hyderabad</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0366d6; font-weight: bold;">High (MERN Core)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Programming.com</strong></td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Siya Thakur<br>siya.thakur@programming.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Full Stack Engineer<br>TypeScript, Node, React, AWS</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0366d6; font-weight: bold;">High (Immediate Joiner)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Programming.com</strong></td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Jaisika Batra<br>jaisika.batra@programming.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Full Stack Engineer (Network Tech)<br>AWS, TS, Node, React</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0366d6; font-weight: bold;">High (Rule 2 Pitch)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>UHV Software Solutions</strong></td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Kavva sahasra Reddy<br>info@uhvsoftwaresolutions.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Full Stack Engineer<br>React, Next.js, TS, REST APIs, SQL</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0366d6; font-weight: bold;">High (Hyderabad Hybrid)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>PETADATA / SFTECH</strong></td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Medisetti Varshitha<br>varshithamm@petadata.ai</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Full Stack Developer<br>React, Next.js, Node, TS, APIs</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0366d6; font-weight: bold;">High (Rule 2 Pitch)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="background: #fff; border: 1px solid #e1e4e8; border-radius: 6px; padding: 18px; margin-bottom: 20px;">
    <h2 style="margin-top: 0; color: #0366d6; font-size: 16px; border-bottom: 2px solid #dbedff; padding-bottom: 8px;">
      3. Direct Phone / WhatsApp Recruiter Leads
    </h2>
    <ul style="font-size: 13px; color: #24292e; line-height: 1.8;">
      <li><strong>Siya Thakur</strong> (Programming.com): <a href="tel:+918626871341">+91 8626871341</a> (Full Stack Developer)</li>
      <li><strong>Jamshida H / Revathi R</strong> (VY Systems): <a href="tel:+916385076144">+91 63850 76144</a> (Full Stack GenAI)</li>
      <li><strong>KarmaDisha / ApexGrid</strong>: <a href="https://wa.me/917385122872">+91 73851 22872</a> (Direct WhatsApp - IT Developers, Madhapur, Hyderabad)</li>
    </ul>
  </div>

  <div style="background: #fff; border: 1px solid #e1e4e8; border-radius: 6px; padding: 18px; margin-bottom: 20px;">
    <h2 style="margin-top: 0; color: #6f42c1; font-size: 16px; border-bottom: 2px solid #f1e05a; padding-bottom: 8px;">
      4. Direct High-Priority Career Portal Applications
    </h2>
    <ul style="font-size: 13px; color: #24292e; line-height: 1.8;">
      <li>
        <strong>FedEx &bull; Full Stack Developer I (Hyderabad On-site)</strong><br>
        Experience: 1–3 Years | CTC: ₹14–24 LPA | React, Node/JS, REST APIs, SQL<br>
        Apply Link: <a href="https://careers.fedex.com/full-stack-developer-i/job/P25-329771-1" style="color: #0366d6; font-weight: bold;">https://careers.fedex.com/full-stack-developer-i/job/P25-329771-1</a>
      </li>
      <li style="margin-top: 8px;">
        <strong>GHX &bull; Software Engineer II (Hyderabad Onsite)</strong><br>
        Experience: 2–3 Years | Full Stack Development<br>
        Apply Link: <a href="https://buff.ly/ECgqFjE" style="color: #0366d6; font-weight: bold;">https://buff.ly/ECgqFjE</a>
      </li>
      <li style="margin-top: 8px;">
        <strong>Akkodis &bull; Software Developer (Hyderabad)</strong><br>
        React, JavaScript, HTML/CSS, Git, Docker<br>
        Apply Link: <a href="https://lnkd.in/dTZ_a47Y" style="color: #0366d6; font-weight: bold;">https://lnkd.in/dTZ_a47Y</a>
      </li>
    </ul>
  </div>

  <p style="font-size: 12px; color: #586069; text-align: center; margin-top: 24px;">
    Sent via Murali's Automated Anti-Spam Mailer Engine &bull; Strictly following AGENTS.md rules.
  </p>
</body>
</html>`;

  const mailOptions = {
    from: `"Automated Mailer Engine" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    replyTo: SENDER_EMAIL,
    subject,
    text: plainText,
    html: htmlText,
    headers: {
      "X-Mailer": "Apple Mail (2.3654.120.0.1)",
      Importance: "Normal",
      "X-Priority": "3",
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`SUCCESS! Batch 18 Dossier sent to ${TARGET_EMAIL}. Message ID: ${info.messageId}`);
  } catch (err) {
    console.error("ERROR sending Batch 18 Dossier:", err.message);
  }
}

sendBatch18Dossier();
