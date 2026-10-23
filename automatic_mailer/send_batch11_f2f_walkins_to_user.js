/**
 * SEND BATCH 11 - FRESH BENGALURU WALK-INS & DIRECT WHATSAPP/PHONE CONTACTS TO USER
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

const freshWalkInsAndContacts = [
  {
    company: "Vienna Consultancy (MNC Aviation Client)",
    contactPerson: "Saranya R (Talent Acquisition)",
    phone: "Check in person / Email direct",
    email: "saranya@viennaconsultancy.com",
    role: "Frontend Developer (React.js, TypeScript, JavaScript, REST APIs, Docker, AWS/Azure)",
    timing: "Saturday, 26th September 2026 | Full Day Face-to-Face Drive",
    venue: "114/5, North, BHIVE Coworking Space, Old Madras Rd, Halasuru, Hoysala Nagar, Ward Number 80, Bengaluru, Karnataka – 560008",
    experienceBracket: "6 to 8 Years (Steep learning curve pitch applied)",
    notice: "Immediate to 30 Days",
    urgency: "HIGH PRIORITY - EXACT PHYSICAL VENUE IN INDIRANAGAR/HALASURU TOMORROW",
    message: `Hi Saranya,

I saw your LinkedIn announcement regarding the Face-to-Face Walk-In Drive tomorrow (Saturday, 26th September) at BHIVE Coworking Halasuru for the Frontend Developer role (MNC Aviation client).

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of full-time enterprise software engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core technical expertise is centered on React.js, TypeScript, JavaScript (ES6+), REST APIs, Docker, and cloud deployments. I have an exceptionally steep learning curve and ramp up on unfamiliar production tools within days.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and will be attending the walk-in drive tomorrow at BHIVE Halasuru with my updated resume copies.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Looking forward to meeting you tomorrow.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Vipany Global (Product-Based Client)",
    contactPerson: "Maheswari Arepalli (Talent Acquisition Executive)",
    phone: "+91 7331127020",
    email: "maheswariarepalli87122@gmail.com",
    role: "Full Stack Java / React Developer (React, TypeScript, JavaScript, REST APIs, SQL)",
    timing: "F2F Drive in Bangalore — All Rounds Completed in ONE DAY",
    venue: "Bangalore (Connect on WhatsApp/Call 7331127020 for interview slot & venue)",
    experienceBracket: "4 to 7 Years (Budget up to 16 LPA)",
    notice: "Immediate Joiner",
    urgency: "ONE-DAY SELECTION PROCESS FOR PRODUCT-BASED COMPANY",
    message: `Hi Maheswari,

I saw your post regarding the urgent Face-to-Face hiring drive for Full Stack Developers with the product-based client in Bangalore where all rounds are completed in one day.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of production software engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core expertise spans React.js, TypeScript, JavaScript (ES6+), REST APIs, SQL/NoSQL databases, and microservices architecture. I am fully prepared to explain system architecture, component design, and end-to-end technical implementations in depth.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for the F2F interview in Bangalore.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is ready to share. Could you please let me know the venue and slot details?

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "ABC First",
    contactPerson: "Kalyani / Savita Hegde / Balaji Gowda / Srividya A",
    phone: "+91 9036943429 / +91 9741685299 / +91 9035891493 / +91 9986723892",
    email: "kalyani@abcfirst.in, Savita.hegde@abcfirst.in, srividya@abcfirst.in",
    role: "Java + React / Java Full Stack Developer (React JS, TypeScript, Microservices, SQL)",
    timing: "Saturday, 26th September 2026 | F2F Drive Bangalore",
    venue: "Bangalore (Contact recruiters directly via WhatsApp for reporting venue)",
    experienceBracket: "6+ Years (Up to 22.5 LPA / 31.5 LPA)",
    notice: "Immediate to 90 Days",
    urgency: "SATURDAY 26TH SEPT DRIVE - MULTIPLE RECRUITERS CONTACTABLE ON WHATSAPP",
    message: `Hi Kalyani,

I saw your post regarding the Face-to-Face Hiring Drive in Bangalore tomorrow (Saturday, 26th September) for Java + React / Full Stack Developers.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of enterprise engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core technical expertise spans React.js, TypeScript, JavaScript (ES6+), RESTful APIs, and database engineering (SQL/NoSQL). While my foundation is in modern JavaScript/TypeScript architectures, I adapt rapidly to enterprise frameworks and microservices.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to attend the F2F drive tomorrow in Bangalore.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is ready to share. Looking forward to your response with venue details.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Independent Technical Recruiter",
    contactPerson: "Nath Reddy",
    phone: "+91 8520098850",
    email: "sapficoschool@gmail.com",
    role: "Java Full Stack Developer (React, TypeScript, JavaScript, REST APIs, Microservices)",
    timing: "Immediate Scheduling / F2F Interview Bengaluru",
    venue: "Bengaluru (Connect via WhatsApp 8520098850 for F2F interview location)",
    experienceBracket: "5 to 6 Years",
    notice: "Immediate to 15 Days",
    urgency: "DIRECT WHATSAPP & IMMEDIATE HIRING",
    message: `Hi Nath,

I saw your LinkedIn update regarding immediate hiring for Full Stack Developers with React JS expertise in Bengaluru (Face-to-Face interview).

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of full-time engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core expertise spans React.js, TypeScript, JavaScript (ES6+), REST APIs, SQL/MongoDB, and containerized deployments.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for the F2F interview in Bengaluru.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is attached. Please let me know how to proceed.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Cornexvora Private Limited",
    contactPerson: "P. Piramu (Talent Acquisition Specialist)",
    phone: "+91 9315414836",
    email: "piramukrishnan1982@gmail.com",
    role: "Full-Stack Developer (Node.js, Enterprise Applications, REST APIs, SQL)",
    timing: "Saturday, 26th September 2026 | Walk-in Bangalore",
    venue: "Bangalore (WhatsApp/Call 9315414836 for exact venue address)",
    experienceBracket: "6 to 9 Years",
    notice: "Immediate to 30 Days",
    urgency: "WALK-IN INTERVIEW SATURDAY 26TH SEPT",
    message: `Hi Piramu,

I saw your LinkedIn announcement regarding the Walk-In Interview on Saturday, 26th September in Bangalore for Full-Stack / Node.js enterprise application developers.

I bring 4 years of combined professional and hands-on full-stack engineering experience—including 2 years of full-time development at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core technical strengths include Node.js, Express.js, TypeScript, JavaScript, REST APIs, and relational databases.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for the walk-in interview tomorrow in Bangalore.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is ready to share. Could you please share the venue details?

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Manning Consulting",
    contactPerson: "Priyanka Jaiswal (Talent Acquisition)",
    phone: "+91 9366772439",
    email: "Priyanka@manningconsulting.in",
    role: "Full Stack Developer (Microservices, REST APIs, TypeScript, Git, SQL)",
    timing: "Direct Screening / Walk-In Bangalore (Up to 11.5 LPA)",
    venue: "Bangalore (Work from Office | Call/WhatsApp 9366772439)",
    experienceBracket: "6+ Years (Package up to 11.5 LPA)",
    notice: "Immediate Joiner",
    urgency: "DIRECT RECRUITER WHATSAPP & PHONE",
    message: `Hi Priyanka,

I saw your hiring post regarding the Full Stack Developer opening in Bangalore.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of production software engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core technical skills include React.js, Node.js, TypeScript, JavaScript (ES6+), REST APIs, SQL databases, and microservices architecture.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and comfortable with 100% on-site work in Bangalore.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is ready. Would love to discuss this opportunity with you.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "ApexGrid Technologies",
    contactPerson: "Jay Kulkarni / Prathamesh Jadhav",
    phone: "+91 7385122872",
    email: "DM / WhatsApp CV",
    role: "Full Stack Developer (2-4 Years | Bangalore, React / SQL Server)",
    timing: "Immediate Screening",
    venue: "Bangalore",
    experienceBracket: "2 to 4 Years",
    notice: "Immediate Joiners",
    urgency: "NOTE: Profile mentions charges may apply, proceed with caution and never pay money upfront",
    message: `Hi,

I saw your post regarding the Full Stack Developer opening (2-4 Years) in Bangalore with React and SQL Server.

I bring 4 years of combined professional and hands-on full-stack experience—including 2 years of full-time engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core stack includes React.js, TypeScript, Node.js, REST APIs, and SQL databases.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release) and based in Bangalore/ready for immediate on-site joining.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is attached.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
];

function buildHtmlDossier() {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #1e3a8a, #2563eb); color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 700; }
    .header p { margin: 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 24px; }
    .alert-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px 18px; margin-bottom: 24px; border-radius: 4px; font-size: 14px; }
    .card { border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 24px; overflow: hidden; background: #ffffff; }
    .card-header { background: #f1f5f9; padding: 14px 18px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .card-title { font-weight: 700; font-size: 16px; color: #0f172a; }
    .card-body { padding: 18px; }
    .meta-row { margin-bottom: 8px; font-size: 14px; }
    .meta-label { font-weight: 600; color: #475569; display: inline-block; width: 140px; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .badge-urgent { background: #fee2e2; color: #991b1b; }
    .badge-f2f { background: #dbeafe; color: #1e40af; }
    .pitch-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; font-family: monospace; font-size: 13px; white-space: pre-wrap; margin-top: 12px; color: #334155; }
    .footer { text-align: center; padding: 18px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; background: #f8fafc; }
    .btn-wa { display: inline-block; background-color: #25d366; color: white !important; font-weight: bold; text-decoration: none; padding: 8px 14px; border-radius: 6px; font-size: 13px; margin-top: 8px; margin-right: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Batch 11: Fresh Bengaluru F2F Walk-In Drives & Direct WhatsApp Contacts</h1>
      <p>Target Date: Saturday, 26th September 2026 | Filtered for Murali Krishna Popuri</p>
    </div>
    <div class="content">
      <div class="alert-box">
        <strong>ACTION GUIDE FOR TOMORROW (SATURDAY 26TH SEPT):</strong><br>
        1. <strong>Top Physical Walk-in:</strong> Vienna Consultancy (Saranya R) has an in-person F2F drive at <strong>BHIVE Coworking Halasuru / Indiranagar</strong> for Frontend React/TypeScript developers.<br>
        2. <strong>One-Day Product Drive:</strong> Vipany Global (Maheswari Arepalli, 7331127020) is conducting a 1-day F2F process for a product company.<br>
        3. <strong>Immediate WhatsApp Reach-outs:</strong> Reach out directly using the customized 4-year experience templates below.
      </div>

      ${freshWalkInsAndContacts
        .map(
          (c, idx) => `
      <div class="card">
        <div class="card-header">
          <span class="card-title">${idx + 1}. ${c.company}</span>
          <span class="badge ${c.urgency.includes("HIGH") ? "badge-urgent" : "badge-f2f"}">${c.role.split("(")[0].trim()}</span>
        </div>
        <div class="card-body">
          <div class="meta-row"><span class="meta-label">Recruiter:</span> ${c.contactPerson}</div>
          <div class="meta-row"><span class="meta-label">Phone / WhatsApp:</span> <strong>${c.phone}</strong></div>
          <div class="meta-row"><span class="meta-label">Email:</span> ${c.email}</div>
          <div class="meta-row"><span class="meta-label">Role & Skills:</span> ${c.role}</div>
          <div class="meta-row"><span class="meta-label">Date & Timing:</span> <strong>${c.timing}</strong></div>
          <div class="meta-row"><span class="meta-label">Venue / Mode:</span> ${c.venue}</div>
          <div class="meta-row"><span class="meta-label">Experience Bracket:</span> ${c.experienceBracket}</div>
          <div class="meta-row"><span class="meta-label">Notice Period:</span> ${c.notice}</div>

          ${
            c.phone.includes("+91")
              ? `<a class="btn-wa" href="https://api.whatsapp.com/send?phone=${c.phone.replace(/[^0-9]/g, "")}&text=${encodeURIComponent(
                  c.message
                )}" target="_blank">Direct Open WhatsApp Chat</a>`
              : ""
          }

          <div style="margin-top: 14px; font-weight: 600; font-size: 13px; color: #475569;">Ready-to-Copy WhatsApp / SMS Pitch:</div>
          <div class="pitch-box">${c.message}</div>
        </div>
      </div>
      `
        )
        .join("")}
    </div>
    <div class="footer">
      Murali Krishna Popuri Outreach System | Generated automatically for real-time walk-in execution.
    </div>
  </div>
</body>
</html>
  `;
}

async function sendDossier() {
  console.log(`Preparing to send Batch 11 dossier to ${TARGET_EMAIL}...`);
  const htmlContent = buildHtmlDossier();

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    replyTo: SENDER_EMAIL,
    subject: `Batch 11: Fresh Bengaluru F2F Walk-In Drives & Direct WhatsApp Contacts (Saturday 26th Sept)`,
    html: htmlContent,
    text: `Batch 11: Fresh Bengaluru F2F Walk-In Drives & WhatsApp Contacts\n\nTotal Contacts Discovered: ${freshWalkInsAndContacts.length}\n\nPlease check the HTML version of this email to access 1-click WhatsApp buttons and ready-to-copy pitch templates.`,
    headers: {
      "X-Mailer": "Apple Mail (2.3654.120.0.1)",
      Importance: "Normal",
      "X-Priority": "3",
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Dossier successfully sent to ${TARGET_EMAIL}! Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending dossier email:", error);
    process.exit(1);
  }
}

sendDossier();
