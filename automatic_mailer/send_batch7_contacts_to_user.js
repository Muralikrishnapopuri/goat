/**
 * SEND BATCH 7 CONTACTS & 4-YEAR COMBINED PITCH MESSAGES TO USER
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

const contacts = [
  {
    name: "Priya Rajakumar",
    company: "HireLink Pvt. Ltd.",
    role: "Walk-In Drive: Full Stack Developer (Bangalore - Ecospace Bellandur)",
    phone: "+91 9980249958",
    email: "tech@hirelinkpro.com",
    notes: "Walk-In Drive tomorrow (Saturday, 26th Sept). Ecospace, Bellandur, Bangalore. Immediate joiners.",
    message: `Hi Priya,

I saw your LinkedIn post regarding the Walk-In Drive for Full Stack Developer in Bangalore (Ecospace Bellandur).

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of full-time production engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core expertise spans React.js, TypeScript, JavaScript (ES6+), Node.js, and REST APIs, alongside experience with microservices architecture, databases (SQL/NoSQL), and cloud deployments.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for the Bangalore walk-in drive and technical rounds.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is ready to share. Looking forward to connecting.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Vishnu Prasad K.S",
    company: "Meghnify HR Solution Private Limited",
    role: "Java + React Full Stack Developer (Hyderabad / Bangalore)",
    phone: "+91 9080982428",
    email: "WhatsApp CV submission requested (9080982428)",
    notes: "WhatsApp direct CV submission requested. Immediate joiners to 30 days.",
    message: `Hi Vishnu,

I saw your hiring post on LinkedIn for the Full Stack Developer (React frontend) opportunity in Hyderabad/Bangalore.

I bring 4 years of combined professional and hands-on full-stack engineering experience—including 2 years of production development at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

I specialize in React.js (Hooks, Redux), TypeScript, JavaScript (ES6+), REST APIs, and database integration (SQL/NoSQL).

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for virtual interviews immediately.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

I would love to share my resume PDF for your review.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "PEIT CONSULTANTS (Nitin K)",
    company: "PEIT CONSULTANTS PVT LTD",
    role: "Full Stack / Java + React Developer (Hyderabad Hybrid, 3.5+ Years)",
    phone: "+91 9866514276 / +91 8125690271",
    email: "info@peit.in",
    notes: "Direct phone numbers provided in post. Immediate joiners preferred.",
    message: `Hi Nitin / PEIT Team,

I saw your hiring post on LinkedIn for the Full Stack Developer opening in Hyderabad (Hybrid).

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of enterprise engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core stack includes React.js, JavaScript (ES6+), TypeScript, REST APIs, SQL, and modern web architectures.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for immediate discussion and interview rounds in Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Resume PDF attached. Looking forward to your response.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
];

async function sendContactsEmail() {
  console.log(`Preparing contacts summary email to: ${TARGET_EMAIL}`);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; background-color: #f7fafc; padding: 20px; }
        .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: #1a365d; color: #ffffff; padding: 24px 30px; }
        .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 600; color: #ffffff; }
        .header p { margin: 0; font-size: 13px; color: #cbd5e0; }
        .content { padding: 24px 30px; }
        .card { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #2b6cb0; border-radius: 6px; padding: 18px; margin-bottom: 24px; }
        .card-title { font-size: 16px; font-weight: 700; color: #1a202c; margin: 0 0 6px 0; }
        .card-meta { font-size: 13px; color: #4a5568; margin-bottom: 12px; }
        .card-meta strong { color: #2d3748; }
        .msg-box { background: #ffffff; border: 1px dashed #cbd5e0; border-radius: 4px; padding: 14px; font-family: monospace; font-size: 12.5px; white-space: pre-wrap; color: #1a202c; }
        .footer { padding: 16px 30px; font-size: 12px; color: #718096; background: #edf2f7; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Direct Recruiter Contacts & 4-Year Pitch Templates</h1>
          <p>Immediate Joiner & React Search Feed (Hyderabad / Bangalore) | Sept 25, 2026</p>
        </div>
        <div class="content">
          <p style="font-size: 14px; margin-top: 0;">Below are the direct recruiter phone and WhatsApp contacts extracted from the latest LinkedIn feed dump, paired with tailored ready-to-copy WhatsApp/SMS outreach messages featuring the 4-year combined experience pitch.</p>

          ${contacts
            .map(
              (c, i) => `
            <div class="card">
              <div class="card-title">${i + 1}. ${c.name} — ${c.company}</div>
              <div class="card-meta">
                <div><strong>Role:</strong> ${c.role}</div>
                <div><strong>Phone / WhatsApp:</strong> <span style="font-family: monospace; color: #2b6cb0; font-weight: bold;">${c.phone}</span></div>
                <div><strong>Email:</strong> ${c.email}</div>
                <div><strong>Notes:</strong> ${c.notes}</div>
              </div>
              <div style="font-size: 12px; font-weight: 600; color: #4a5568; margin-bottom: 4px;">Ready-to-Copy WhatsApp / SMS Message:</div>
              <div class="msg-box">${c.message}</div>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="footer">
          Candidate: Murali Krishna Popuri | popurimurali16@gmail.com | +91 9347796811
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = contacts
    .map(
      (c, i) =>
        `CONTACT ${i + 1}: ${c.name} (${c.company})
Role: ${c.role}
Phone: ${c.phone}
Email: ${c.email}
Notes: ${c.notes}

READY-TO-COPY MESSAGE:
----------------------------------------
${c.message}
----------------------------------------
`
    )
    .join("\n\n");

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    subject: "Direct Recruiter WhatsApp Contacts & 4-Year Pitch Messages (Immediate Joiner Feed)",
    text: textContent,
    html: htmlContent,
    replyTo: SENDER_EMAIL,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("SUCCESS! Summary email sent.");
    console.log("Message ID:", info.messageId);
  } catch (err) {
    console.error("ERROR sending contacts email:", err.message);
  }
}

sendContactsEmail();
