/**
 * SEND BATCH 12 - FRESH HYDERABAD WHATSAPP/PHONE CONTACTS TO USER
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
    company: "Programming.com",
    contactPerson: "Shweta Rai (Recruitment Team Leader)",
    phone: "+91 7499726447",
    altPhone: "+91 9763840595",
    email: "shweta.rai@programming.com",
    role: "Full Stack Developer / Senior Software Engineer (Node.js, React.js, TypeScript, REST APIs, Microservices, CI/CD)",
    location: "Hyderabad (Shift: 6:30 PM - 3:30 AM IST US aligned)",
    experienceBracket: "6 to 8 Years",
    notice: "Immediate Joiners Preferred",
    urgency: "HIGH VALUE - DIRECT RECRUITMENT TEAM LEADER WHATSAPP",
    pitch: `Hi Shweta,

I saw your hiring post on LinkedIn regarding Full Stack / React.js & Node.js Developer openings at Programming.com in Hyderabad.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of enterprise engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization and role-based web platforms).

My core technical expertise spans React.js, TypeScript, Node.js, Express, REST APIs, microservices, and databases (SQL/NoSQL). In building RestoSoft, I mastered Electron.js and local LAN synchronization within a week to deliver production software, and I ramp up on unfamiliar tools and cloud architectures rapidly.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and comfortable with US-aligned shifts in Hyderabad. If you are also considering fast-learning developers or have upcoming openings on your team, I would love the opportunity to connect.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is ready to share. Looking forward to your response.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Techno Facts Solutions Pvt Ltd",
    contactPerson: "Anudeepthi Raj (Senior HR Specialist)",
    phone: "+91 6304703084",
    email: "anudeepthi.vadde@techno-facts.com",
    role: "Front-End Developer (React, JavaScript/TypeScript, Redux, REST APIs, Azure AD)",
    location: "Hyderabad – Hybrid",
    experienceBracket: "8+ Years (Immediate Joiners Only)",
    notice: "Immediate Joiners Only",
    urgency: "DIRECT RECRUITER PHONE & WHATSAPP",
    pitch: `Hi Anudeepthi,

I saw your hiring post for the Front-End Developer opening in Hyderabad (Hybrid) requiring strong React, TypeScript, Redux, and REST API integrations.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of full-time software engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core expertise is centered on React.js, TypeScript, JavaScript (ES6+), Redux Toolkit, REST APIs, and responsive UI design. I have an exceptionally steep learning curve (for example, mastering Electron.js within a week to ship RestoSoft).

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available in Hyderabad. If you have any active or upcoming roles on your team where my background would add value, please let me know.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is attached.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "CIEL HR",
    contactPerson: "Aishwarya R. (Assistant Manager - Talent Acquisition)",
    phone: "+91 9390167091",
    email: "aishwarya.rani@cielhr.com",
    role: "Senior Full-Stack Developer (MERN Stack: React, Node.js, TypeScript, MongoDB, SQL, Microservices)",
    location: "Hyderabad (Product-Based Healthcare Solution)",
    experienceBracket: "3 to 5 Years",
    notice: "Immediate Joiners Preferred",
    urgency: "EXCELLENT 3-5 YEARS MATCH FOR MERN / PRODUCT COMPANY",
    pitch: `Hi Aishwarya,

I saw your hiring announcement regarding the Full-Stack Developer (MERN Stack) role in Hyderabad for product engineering.

I bring 4 years of combined professional and hands-on full-stack engineering experience—including 2 years of production development at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core technical stack includes React.js, Node.js, TypeScript, JavaScript (ES6+), REST APIs, MongoDB, and SQL. I have an exceptionally fast learning curve—mastering Electron.js in less than a week for RestoSoft.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available in Hyderabad. I would love to be considered for this MERN opportunity.

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
    company: "Vmanico / Tech Hiring Team",
    contactPerson: "Raj HR (Operations / IT Recruiter)",
    phone: "+91 9052509995",
    email: "Direct Call / WhatsApp to schedule",
    role: "Full Stack Developer (React / JavaScript, Node.js / Express, REST APIs, SQL)",
    location: "Hyderabad – Hitech City (Work from Office)",
    experienceBracket: "Immediate Entry/Mid Vacancies",
    notice: "Interviews Tuesday & Wednesday Only",
    urgency: "DIRECT CALL TO SCHEDULE INTERVIEW IN HITECH CITY",
    pitch: `Hi Raj,

I saw your hiring post regarding the 5 Full Stack Developer openings at your Hitech City, Hyderabad office (interviews on Tuesday & Wednesday).

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of full-time engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My technical expertise spans React.js, Node.js, Express.js, TypeScript, REST APIs, and SQL databases.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release) and available to attend the in-person interview at your Hitech City office this Tuesday/Wednesday. Could you please schedule a slot for me?

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is attached.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "PoloSoft Technologies",
    contactPerson: "Laxmipriya Pradhan (HR)",
    phone: "+91 9938037974",
    email: "hr@polosoftech.com",
    role: "Developer – Front End (React) & Full Stack (2–5 Years)",
    location: "Hyderabad & Bhubaneswar (Full-Time)",
    experienceBracket: "2 to 5 Years",
    notice: "Immediate to 30 Days",
    urgency: "DIRECT 2-5 YEARS MATCH & ACTIVE WHATSAPP",
    pitch: `Hi Laxmipriya,

I saw your hiring post regarding Developer – Front End (React) and Full Stack roles (2-5 Years) at PoloSoft Technologies in Hyderabad.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of enterprise engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core skills are React.js, TypeScript, JavaScript (ES6+), Node.js, REST APIs, and SQL/NoSQL databases.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer) and available for the Hyderabad location.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is attached for your review.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
];

function buildHtml() {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
    .container { max-width: 820px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #1e3a8a, #0284c7); color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 700; }
    .header p { margin: 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 24px; }
    .alert-box { background: #eff6ff; border-left: 4px solid #0284c7; padding: 14px 18px; margin-bottom: 24px; border-radius: 4px; font-size: 13px; }
    .card { border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 24px; overflow: hidden; background: #ffffff; }
    .card-header { background: #f1f5f9; padding: 14px 18px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .card-title { font-weight: 700; font-size: 16px; color: #0f172a; }
    .card-body { padding: 18px; }
    .meta-row { margin-bottom: 8px; font-size: 14px; }
    .meta-label { font-weight: 600; color: #475569; display: inline-block; width: 140px; }
    .pitch-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; font-family: monospace; font-size: 13px; white-space: pre-wrap; margin-top: 12px; color: #334155; }
    .btn-wa { display: inline-block; background-color: #25d366; color: white !important; font-weight: bold; text-decoration: none; padding: 8px 14px; border-radius: 6px; font-size: 13px; margin-top: 8px; margin-right: 8px; }
    .footer { text-align: center; padding: 18px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; background: #f8fafc; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Batch 12: Fresh Hyderabad Direct WhatsApp & Phone Contacts (Sept 26)</h1>
      <p>Targeting: React.js, Node.js, MERN, Full-Stack | Filtered for Murali Krishna Popuri</p>
    </div>
    <div class="content">
      <div class="alert-box">
        <strong>ACTION GUIDE FOR HYDERABAD ROLES:</strong><br>
        1. <strong>Top Recruiter Leads:</strong> Direct WhatsApp numbers for Shweta Rai (Programming.com), Anudeepthi Raj (Techno Facts), Aishwarya R (CIEL HR), and Laxmipriya Pradhan (PoloSoft).<br>
        2. <strong>Hitech City In-Person Drive:</strong> Raj HR (+91 9052509995) is scheduling in-person interviews for Tuesday/Wednesday at Hitech City.<br>
        3. <strong>Pre-Crafted Pitches:</strong> Click the green WhatsApp button to launch WhatsApp directly with your personalized 4-year experience angle and RestoSoft fast-learning proof.
      </div>

      ${contacts
        .map(
          (c, idx) => `
      <div class="card">
        <div class="card-header">
          <span class="card-title">${idx + 1}. ${c.company}</span>
          <span style="font-size:12px; font-weight:bold; color:#0284c7;">${c.urgency.split("-")[0].trim()}</span>
        </div>
        <div class="card-body">
          <div class="meta-row"><span class="meta-label">Recruiter:</span> ${c.contactPerson}</div>
          <div class="meta-row"><span class="meta-label">Phone / WhatsApp:</span> <strong>${c.phone}</strong> ${c.altPhone ? `| Alt: <strong>${c.altPhone}</strong>` : ""}</div>
          <div class="meta-row"><span class="meta-label">Email:</span> ${c.email}</div>
          <div class="meta-row"><span class="meta-label">Role:</span> ${c.role}</div>
          <div class="meta-row"><span class="meta-label">Location:</span> ${c.location}</div>
          <div class="meta-row"><span class="meta-label">Experience Bracket:</span> ${c.experienceBracket}</div>
          <div class="meta-row"><span class="meta-label">Notice Period:</span> ${c.notice}</div>

          ${
            c.phone.includes("+91")
              ? `<a class="btn-wa" href="https://api.whatsapp.com/send?phone=${c.phone.replace(/[^0-9]/g, "")}&text=${encodeURIComponent(
                  c.pitch
                )}" target="_blank">Direct Open WhatsApp Chat</a>`
              : ""
          }

          <div style="margin-top: 14px; font-weight: 600; font-size: 13px; color: #475569;">Ready-to-Copy WhatsApp / SMS Pitch:</div>
          <div class="pitch-box">${c.pitch}</div>
        </div>
      </div>
      `
        )
        .join("")}
    </div>
    <div class="footer">
      Murali Krishna Popuri Outreach Engine | Automatically generated on September 26, 2026.
    </div>
  </div>
</body>
</html>
  `;
}

async function sendContactsDossier() {
  console.log(`Sending Batch 12 WhatsApp contacts to ${TARGET_EMAIL}...`);
  const html = buildHtml();
  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    replyTo: SENDER_EMAIL,
    subject: `Batch 12: Fresh Hyderabad Direct WhatsApp Contacts & In-Person Drives (Sept 26)`,
    html: html,
    text: `Batch 12: Fresh Hyderabad WhatsApp Contacts & In-Person Drives\n\nTotal Contacts Discovered: ${contacts.length}\n\nPlease check the HTML version of this email to access 1-click WhatsApp buttons and ready-to-copy pitches.`,
    headers: {
      "X-Mailer": "Apple Mail (2.3654.120.0.1)",
      Importance: "Normal",
      "X-Priority": "3",
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Batch 12 contacts dossier sent to ${TARGET_EMAIL}! Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending contacts dossier:", error);
    process.exit(1);
  }
}

sendContactsDossier();
