/**
 * SEND BATCH 9 HYDERABAD REACT RECRUITERS & REFERRAL LEADS TO USER
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

const cards = [
  {
    name: "Meghana Jadhav",
    company: "Test Yantra (Hyderabad Client Location)",
    role: "React JS Developer | 100% WFO Hyderabad | L1: 25th Sept & L2: 29th Sept",
    contact: "WhatsApp: 81055 08290 (No Calls, WhatsApp Only) | Email: Meghana.j@testyantra.com",
    notes: "Direct WhatsApp submission. L1 telephonic today, L2 F2F on Sept 29.",
    message: `Hi Meghana,

I saw your hiring post on LinkedIn for the React JS Developer opening in Hyderabad (Test Yantra client location).

I bring 4 years of combined professional and hands-on full-stack development experience (specializing in React.js, TypeScript, Redux, and REST APIs), including 2 years of enterprise production engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system with local LAN real-time synchronization).

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and comfortable with 100% Work from Office in Hyderabad. Available for L1/L2 interview rounds.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is ready to share.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Siddharth G.",
    company: "Artech L.L.C.",
    role: "React JS + TypeScript Developer | Walk-In Drive Hyderabad (29 September 2026)",
    contact: "Phone / WhatsApp: +91 8265998498 | Email: siddharth.gupta@artech.com",
    notes: "Walk-In Drive scheduled for Tuesday, 29 Sept in Hyderabad. 4-6 Years bracket.",
    message: `Hi Siddharth,

I saw your post regarding the React JS + TypeScript Developer walk-in drive in Hyderabad scheduled for 29 September 2026.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of production engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

I have extensive hands-on experience with React.js, TypeScript, JavaScript (ES6+), component architecture, and REST API integration.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for the drive and technical rounds in Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Looking forward to connecting with you.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Queentina Baskalin",
    company: "VR Della IT Services",
    role: "React JS Developer | Micro Frontend (MFE) & Webpack Module Federation | Hyderabad",
    contact: "Email: queentina@vrdella.com",
    notes: "On-site Hyderabad role focusing on ReactJS, MFE, Webpack Module Federation, and Redux.",
    message: `Hi Queentina,

I saw your hiring post for the React JS Developer opening in Hyderabad.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of enterprise engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

I specialize in React.js, TypeScript, JavaScript (ES6+), Redux, component modularity, dynamic caching, and REST API integration.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for on-site interviews in Hyderabad.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Resume PDF attached for your review.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Avinash Kumar Patel / Soumi Dey",
    company: "Wipro (Employee Referral)",
    role: "Python + React Developer (Job Code: 192439) | Full Stack (Band B3/C1)",
    contact: "Direct LinkedIn DM to Avinash / Soumi",
    notes: "Provide First Name, Last Name, Email, Phone, 4 YOE, and Job Code: 192439.",
    message: `Hi Avinash,

I came across your Wipro employee referral post on LinkedIn and would love to be referred for the Python + React Developer position (Job Code: 192439).

Here are my details for the referral:
1. First Name: Murali Krishna
2. Last Name: Popuri
3. Email ID: popurimurali16@gmail.com
4. Phone Number: +91 9347796811
5. Years of Experience: 4 Years (Combined professional & hands-on full-stack development)
6. Job Code: 192439 (Python + React Developer)
7. Notice Period: Immediate Joiner (Official LWD Nov 11, negotiable for immediate release)

Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri

My resume PDF is ready to share. Thank you so much for your support!`,
  },
];

async function sendEmail() {
  console.log(`Preparing Hyderabad React opportunities email to: ${TARGET_EMAIL}`);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; background-color: #f7fafc; padding: 20px; }
        .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: #2c5282; color: #ffffff; padding: 24px 30px; }
        .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 600; color: #ffffff; }
        .header p { margin: 0; font-size: 13px; color: #bee3f8; }
        .content { padding: 24px 30px; }
        .card { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #3182ce; border-radius: 6px; padding: 18px; margin-bottom: 24px; }
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
          <h1>Hyderabad React Opportunities & Outreach Templates</h1>
          <p>Search Feed: React + Hyderabad Hiring | Sept 25, 2026</p>
        </div>
        <div class="content">
          <p style="font-size: 14px; margin-top: 0;">Below are the highlighted recruiter, WhatsApp, and internal employee referral leads from the Hyderabad React search feed, along with ready-to-copy 4-year experience pitch messages.</p>

          ${cards
            .map(
              (c, i) => `
            <div class="card">
              <div class="card-title">${i + 1}. ${c.name} — ${c.company}</div>
              <div class="card-meta">
                <div><strong>Role:</strong> ${c.role}</div>
                <div><strong>Contact:</strong> <span style="font-family: monospace; color: #2b6cb0; font-weight: bold;">${c.contact}</span></div>
                <div><strong>Notes:</strong> ${c.notes}</div>
              </div>
              <div style="font-size: 12px; font-weight: 600; color: #4a5568; margin-bottom: 4px;">Ready-to-Copy Message:</div>
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

  const textContent = cards
    .map(
      (c, i) =>
        `OPPORTUNITY ${i + 1}: ${c.name} (${c.company})
Role: ${c.role}
Contact: ${c.contact}
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
    subject: "Hyderabad React Recruiter Contacts & Referral Leads (Ready-to-Copy)",
    text: textContent,
    html: htmlContent,
    replyTo: SENDER_EMAIL,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("SUCCESS! Hyderabad summary email sent.");
    console.log("Message ID:", info.messageId);
  } catch (err) {
    console.error("ERROR sending email:", err.message);
  }
}

sendEmail();
