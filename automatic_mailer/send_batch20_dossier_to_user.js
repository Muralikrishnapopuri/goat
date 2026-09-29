/**
 * SEND BATCH 20 DOSSIER TO TEST EMAIL
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

async function sendBatch20Dossier() {
  console.log(`Sending Batch 20 Dossier to ${TARGET_EMAIL}...`);

  const subject = "Batch 20 Dossier: Fresh Outreach Dispatches (100% Human-Typed Format)";

  const plainText = `Hi Murali,

Here is your Batch 20 Recruiter Outreach Dossier:

PRE-DISPATCH RULES VERIFICATION (AGENTS.MD):
- Experience: Strictly 2 years professional software engineering experience
- Availability: Immediate Joiner (official LWD Nov 11, negotiable for immediate release)
- Relocation: Available immediately for Hyderabad or Bengaluru
- Format: 100% Natural Human-Typed Appearance (Strictly Zero CSS Styling)
- Mandatory RestoSoft: Exactly 2 lines context included
- Permitted Links: Strictly 4 links (Portfolio, LinkedIn, GitHub, Zestchat)
- Resume PDF: Attached to all dispatches
- Zero Emojis: Strictly enforced

BATCH 20 RECRUITER DISPATCHES (9 LEADS):
1. Recruise India Consulting (wilma@recruiseglobal.com) - Full Stack Engineer (React/Node)
2. Posterity GCC (pratiksha@posterity.in) - Full Stack Developer (React/APIs)
3. Cognizant Referral (belgincts@gmail.com) - Full Stack Developer (Job ID: 68620791)
4. Software Services (fayazshaik5623@gmail.com) - Full Stack Developer (React.js/APIs)
5. Net2Source (Khan.Rija@net2source.co.in) - Full Stack Developer (React/TS)
6. Cygnus Professionals (Swetha@cygnuspro.com) - Full Stack Developer (React/Node)
7. Apptad Inc (anjali.kashyap@apptadinc.com) - Full Stack Developer (React/AWS)
8. TSCS Global (jasmitha.p@tscs.global) - Full Stack Engineer (React/TS)
9. Cosette Network (bhavna@cosettenetwork.com) - Frontend / Full Stack (React/Next/TS)

All emails dispatched using the 100% human-typed clean format with anti-spam jitter delay.

Best regards,
Automated Anti-Spam Mailer Engine`;

  const htmlText = `<p>Hi Murali,</p>
<p>Here is your Batch 20 Recruiter Outreach Dossier:</p>
<p><strong>PRE-DISPATCH RULES VERIFICATION (AGENTS.MD):</strong><br>
- Experience: Strictly 2 years professional software engineering experience<br>
- Availability: Immediate Joiner (official LWD Nov 11, negotiable for immediate release)<br>
- Relocation: Available immediately for Hyderabad or Bengaluru<br>
- Format: 100% Natural Human-Typed Appearance (Strictly Zero CSS Styling)<br>
- Mandatory RestoSoft: Exactly 2 lines context included<br>
- Permitted Links: Strictly 4 links (Portfolio, LinkedIn, GitHub, Zestchat)<br>
- Resume PDF: Attached to all dispatches<br>
- Zero Emojis: Strictly enforced</p>
<p><strong>BATCH 20 RECRUITER DISPATCHES (9 LEADS):</strong><br>
1. Recruise India Consulting (wilma@recruiseglobal.com) - Full Stack Engineer (React/Node)<br>
2. Posterity GCC (pratiksha@posterity.in) - Full Stack Developer (React/APIs)<br>
3. Cognizant Referral (belgincts@gmail.com) - Full Stack Developer (Job ID: 68620791)<br>
4. Software Services (fayazshaik5623@gmail.com) - Full Stack Developer (React.js/APIs)<br>
5. Net2Source (Khan.Rija@net2source.co.in) - Full Stack Developer (React/TS)<br>
6. Cygnus Professionals (Swetha@cygnuspro.com) - Full Stack Developer (React/Node)<br>
7. Apptad Inc (anjali.kashyap@apptadinc.com) - Full Stack Developer (React/AWS)<br>
8. TSCS Global (jasmitha.p@tscs.global) - Full Stack Engineer (React/TS)<br>
9. Cosette Network (bhavna@cosettenetwork.com) - Frontend / Full Stack (React/Next/TS)</p>
<p>All emails dispatched using the 100% human-typed clean format with anti-spam jitter delay.</p>
<p>Best regards,<br>
Automated Anti-Spam Mailer Engine</p>`;

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
    console.log(`SUCCESS! Batch 20 Dossier sent to ${TARGET_EMAIL}. Message ID: ${info.messageId}`);
  } catch (err) {
    console.error("ERROR sending Batch 20 Dossier:", err.message);
  }
}

sendBatch20Dossier();
