/**
 * SEND BATCH 19 DOSSIER TO TEST EMAIL
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

async function sendBatch19Dossier() {
  console.log(`Sending Batch 19 Dossier to ${TARGET_EMAIL}...`);

  const subject = "Batch 19 Dossier: Bengaluru Full Stack & React Outreach (8 Dispatches + Direct Links)";

  const plainText = `Hi Murali,

Here is your Batch 19 Bengaluru Recruiter Outreach Dossier with strict deduplication verification:

1. BENGALURU RECRUITER DISPATCHES (BATCH 19 - RESUME ATTACHED)
----------------------------------------------------------------------
A. Company: Sanki (Bengaluru WFO)
   Email: hrashish0612@gmail.com
   Recruiter: Ashish Sharma (Recruitment Specialist)
   Role: Lead Full Stack Developer (4–6 Years | CTC: ₹15–18 LPA)
   Tech: React.js, Next.js, Node.js, Express.js, TypeScript, MongoDB, PostgreSQL, AWS
   Status: Dispatched with custom pitch and resume attached.

B. Company: AreteMinds Technologies (Bengaluru)
   Email: hr@areteminds.com
   Role: Next.js with TypeScript (Frontend / Full Stack, 3–5 Years)
   Work Model: Monday–Thursday WFO | Friday Remote
   Tech: Next.js, TypeScript, JavaScript (ES6+), Redux, REST APIs, Git
   Status: Dispatched with custom pitch and resume attached.

C. Company: Ides Labs (Bengaluru)
   Email: mounika.d@ideslabs.com
   Recruiter: Mounika Doma (Talent Scout)
   Role: Full Stack Engineer (5–8 Years)
   Tech: Node.js, Express.js, ReactJS, TypeScript, AWS, Microservices, MongoDB
   Status: Dispatched with custom pitch and resume attached.

D. Company: ValueLabs (GTP Bengaluru)
   Email: ananth.kulkarni@valuelabs.com
   Recruiter: Ananth Kulkarni (Phone: 91-807421437)
   Role: Fullstack Developer (Node.js + React)
   Tech: Node.js, React.js, TypeScript, Express.js, MongoDB, REST APIs
   Status: Dispatched with custom pitch and resume attached.

E. Company: Technology Recruitment (Bengaluru)
   Email: tausif.talent@gmail.com
   Recruiter: Md Tausif Alam (WhatsApp: 7549787124)
   Role: Full-Stack Engineer (2+ Years Experience)
   Tech: React.js, JavaScript, REST APIs, SQL, Modern APIs
   Status: Dispatched with custom pitch and resume attached.

F. Company: Cvent (Bengaluru Hybrid)
   Email: kashish.sharma@cvent.com
   Recruiter: Kashish Sharma (Talent Acquisition)
   Role: Fullstack Software Engineer
   Tech: React, Next.js, Node.js, TypeScript, GraphQL, AI-assisted development
   Status: Dispatched with custom pitch and resume attached.

G. Company: Albireo Recruiters (Bengaluru)
   Email: arnapurna@albireorecruiters.in
   Recruiter: Arnapurna P.
   Role: Full Stack Engineer (React / TypeScript / AI Workflows)
   Tech: React, Next.js, Node.js, TypeScript, REST APIs, WebSockets
   Status: Dispatched with custom pitch and resume attached.

H. Company: Teamware Solutions (Bengaluru / Hyderabad)
   Email: bhoomishanmuk5686@gmail.com
   Recruiter: Bhoomika Shanmuk (Technical Recruiter)
   Role: Full Stack Developer
   Tech: React.js, Node.js, TypeScript, REST APIs, PostgreSQL
   Status: Dispatched with custom pitch and resume attached.

2. FILTERED OUT CONTACTS (NO COLD EMAILS SENT)
----------------------------------------------------------------------
- mahesh.b.design@gmail.com (Candidate seeking UI/UX Design & Frontend React role)
- vashishthaharsh97@gmail.com (Fresher candidate seeking AI/Cloud role)
- yogeshwar.yaduwanshi@gmail.com (Candidate seeking .NET roles)
- jobs@giftabled.org (GiftAbled Bengaluru Inclusive Job Fair for PwD)

3. DIRECT CAREER PORTAL APPLY LINKS (BENGALURU)
----------------------------------------------------------------------
- Accelon Consulting: Full Stack Developer (Node.js, React) | Job Code: 9698
  Apply Link: https://www.accelonconsulting.com/careerportal/job-details.php?slug=full-stack-developer-nodejs-react&form_jobcode=9698
- Atlassian: Fullstack Software Engineer II (Bengaluru) | CTC: ₹35–55 LPA
  Apply Link: https://lnkd.in/dutQfkTa
- NTT DATA: Systems Integration Analyst / Full Stack (Bengaluru) | Req ID: 391781
  Apply Link: https://careers.nttdata.com/global/en/job/391781/Systems-Integration-Analyst
- Styli Marketplace (Landmark Group): Frontend Engineer (Web - React, Next.js, Node.js)
  Apply Link: https://lnkd.in/dumjFVZE
- Indcors: Full Stack Developer (MERN / React / Node) | Bengaluru WFO
  Apply Link: https://indcors.com
- Razorpay: Frontend Engineer | Bengaluru On-site
  Apply Link: https://lnkd.in/d2D86uMs
- GE Vernova: Software Engineer | Bengaluru
  Apply Link: https://buff.ly/fvqOoTE

4. DIRECT RECRUITER PHONE / WHATSAPP LEADS
----------------------------------------------------------------------
- Md Tausif Alam (Full Stack Recruiter): +91 7549787124 (WhatsApp)
- Ananth Kulkarni (ValueLabs): +91 807421437

Best regards,
Automated Anti-Spam Mailer Engine`;

  const htmlText = `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 750px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%); color: white; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 22px;">Batch 19 Recruiter Outreach Dossier (Bengaluru)</h1>
    <p style="margin: 6px 0 0; opacity: 0.9; font-size: 14px;">Strict Deduplication Audit &bull; 8 Fresh Recruiter Applications Dispatched &bull; Direct Apply Links</p>
  </div>

  <div style="background: #fff; border: 1px solid #e1e4e8; border-radius: 6px; padding: 18px; margin-bottom: 20px;">
    <h2 style="margin-top: 0; color: #0284c7; font-size: 16px; border-bottom: 2px solid #bae6fd; padding-bottom: 8px;">
      1. Bengaluru Recruiter Dispatches (Batch 19 - Resume Attached)
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
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Sanki</strong> (Bengaluru WFO)</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Ashish Sharma<br>hrashish0612@gmail.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Lead Full Stack Developer (4–6 yrs)<br>React, Next.js, Node, TS &bull; ₹15–18 LPA</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0284c7; font-weight: bold;">Bullseye (Core Stack)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>AreteMinds Technologies</strong></td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">hr@areteminds.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Next.js with TypeScript (3–5 yrs)<br>Bengaluru (Mon-Thu WFO / Fri Remote)</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0284c7; font-weight: bold;">Bullseye (Next/TS)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Ides Labs</strong> (Bengaluru)</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Mounika Doma<br>mounika.d@ideslabs.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Full Stack Engineer (5–8 yrs)<br>Node.js, Express, React, TS, AWS, MongoDB</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0284c7; font-weight: bold;">High (Rule 2 Pitch)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>ValueLabs</strong> (GTP Bengaluru)</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Ananth Kulkarni<br>ananth.kulkarni@valuelabs.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Fullstack Developer (Node + React)<br>Node.js, React, Express, MongoDB</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0284c7; font-weight: bold;">High (Rule 2 Pitch)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Technology Recruitment</strong></td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Md Tausif Alam<br>tausif.talent@gmail.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Full-Stack Engineer (2+ yrs)<br>React.js, REST APIs, SQL, Relocation</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0284c7; font-weight: bold;">Bullseye (2+ yrs match)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Cvent</strong> (Bengaluru Hybrid)</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Kashish Sharma<br>kashish.sharma@cvent.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Fullstack Software Engineer<br>React, Next.js, Node.js, GraphQL</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0284c7; font-weight: bold;">High (Rule 2 Pitch)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Albireo Recruiters</strong></td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Arnapurna P.<br>arnapurna@albireorecruiters.in</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Full Stack Engineer<br>React, Next.js, Node, TS, WebSockets</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0284c7; font-weight: bold;">High (Rule 2 Pitch)</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e1e4e8;"><strong>Teamware Solutions</strong></td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Bhoomika Shanmuk<br>bhoomishanmuk5686@gmail.com</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8;">Full Stack Developer<br>React, Node.js, TypeScript, PostgreSQL</td>
          <td style="padding: 8px; border: 1px solid #e1e4e8; color: #0284c7; font-weight: bold;">High (Rule 2 Pitch)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="background: #fff; border: 1px solid #e1e4e8; border-radius: 6px; padding: 18px; margin-bottom: 20px;">
    <h2 style="margin-top: 0; color: #6f42c1; font-size: 16px; border-bottom: 2px solid #e1d9fc; padding-bottom: 8px;">
      2. Direct High-Priority Career Portal Applications (Bengaluru)
    </h2>
    <ul style="font-size: 13px; color: #24292e; line-height: 1.8;">
      <li>
        <strong>Accelon Consulting &bull; Full Stack Developer (Node.js, React)</strong><br>
        Job Code: 9698 &bull; Bengaluru (Hybrid) &bull; Node.js, React, TypeScript, REST APIs<br>
        Apply Link: <a href="https://www.accelonconsulting.com/careerportal/job-details.php?slug=full-stack-developer-nodejs-react&form_jobcode=9698" style="color: #0366d6; font-weight: bold;">Accelon Career Portal</a>
      </li>
      <li style="margin-top: 8px;">
        <strong>Atlassian &bull; Fullstack Software Engineer II (Bengaluru)</strong><br>
        CTC: ₹35–55 LPA &bull; JavaScript, TypeScript, React, Node.js, REST APIs<br>
        Apply Link: <a href="https://lnkd.in/dutQfkTa" style="color: #0366d6; font-weight: bold;">Atlassian Careers Portal</a>
      </li>
      <li style="margin-top: 8px;">
        <strong>NTT DATA &bull; Systems Integration Analyst / Full Stack (Bengaluru)</strong><br>
        Req ID: 391781 &bull; 0–3 Years Experience &bull; JavaScript, React, Node.js, REST APIs<br>
        Apply Link: <a href="https://careers.nttdata.com/global/en/job/391781/Systems-Integration-Analyst" style="color: #0366d6; font-weight: bold;">NTT DATA Careers</a>
      </li>
      <li style="margin-top: 8px;">
        <strong>Styli Marketplace (Landmark Group) &bull; Frontend Engineer (Web)</strong><br>
        Bengaluru &bull; React, Next.js, Node.js, TypeScript<br>
        Apply Link: <a href="https://lnkd.in/dumjFVZE" style="color: #0366d6; font-weight: bold;">Styli Careers Portal</a>
      </li>
      <li style="margin-top: 8px;">
        <strong>Razorpay &bull; Frontend Engineer (Bengaluru On-site)</strong><br>
        React, JavaScript, HTML/CSS, REST APIs<br>
        Apply Link: <a href="https://lnkd.in/d2D86uMs" style="color: #0366d6; font-weight: bold;">Razorpay Opportunity</a>
      </li>
    </ul>
  </div>

  <div style="background: #fff; border: 1px solid #e1e4e8; border-radius: 6px; padding: 18px; margin-bottom: 20px;">
    <h2 style="margin-top: 0; color: #24292e; font-size: 16px; border-bottom: 2px solid #e1e4e8; padding-bottom: 8px;">
      3. Direct Phone / WhatsApp Leads
    </h2>
    <ul style="font-size: 13px; color: #24292e; line-height: 1.8;">
      <li><strong>Md Tausif Alam</strong> (Full Stack Recruiter): <a href="https://wa.me/917549787124">+91 7549787124</a> (WhatsApp)</li>
      <li><strong>Ananth Kulkarni</strong> (ValueLabs): <a href="tel:+91807421437">+91 807421437</a></li>
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
    console.log(`SUCCESS! Batch 19 Dossier sent to ${TARGET_EMAIL}. Message ID: ${info.messageId}`);
  } catch (err) {
    console.error("ERROR sending Batch 19 Dossier:", err.message);
  }
}

sendBatch19Dossier();
