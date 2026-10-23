/**
 * SEND BENGALURU WALK-IN DRIVES (SATURDAY 26TH SEPT) & CONTACTS TO USER
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

const walkins = [
  {
    company: "WinTech Inc",
    contactPerson: "Nivetha Lakshmi K (HR Lead)",
    phone: "+91 8925613146",
    email: "hrwintech01@gmail.com",
    role: "Java / Full Stack Developer (React JS, Angular, Spring Boot, SQL, AWS)",
    timing: "Saturday, 26th September 2026 | 9:00 AM – 3:00 PM",
    venue: "Bangalore (Contact 8925613146 directly for venue address)",
    experienceBracket: "5 to 9 Years",
    notice: "Immediate Joining",
    message: `Hi Nivetha,

I saw your LinkedIn post regarding the Walk-In Interview Drive tomorrow (Saturday, 26th Sept) in Bangalore for Java / Full Stack Developer (React JS).

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of enterprise engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core technical expertise spans React.js, TypeScript, JavaScript (ES6+), REST APIs, SQL/NoSQL databases, and cloud services.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to attend the walk-in interview tomorrow in Bangalore. Could you please share the venue details?

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
    company: "HireLink Pvt. Ltd.",
    contactPerson: "Priya Rajakumar (Recruiter)",
    phone: "+91 9980249958",
    email: "tech@hirelinkpro.com",
    role: "Full Stack Developer (React JS / Node.js / Java / Cloud)",
    timing: "Saturday, 26th September 2026 | Morning onwards",
    venue: "Ecospace, Outer Ring Road, Adarsh Palm Retreat Villas, Bellandur, Bengaluru – 560103",
    experienceBracket: "6+ Years (Accepting candidates with strong full stack expertise)",
    notice: "Immediate Joiners or < 15 days",
    message: `Hi Priya,

I saw your LinkedIn post regarding the Walk-In Drive for Full Stack Developer in Bangalore tomorrow (Saturday, 26th Sept) at Ecospace Bellandur.

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
    company: "Tata Consultancy Services (TCS BFSI Drive)",
    contactPerson: "TCS Talent Acquisition / INTAC / Rajat Abhinav Ekka",
    phone: "Registration via iBegin / Walk-in Directly",
    email: "Apply on ibegin.tcsapps.com",
    role: "Java Full Stack Developer / React JS Developer / Automation Testing",
    timing: "Saturday, 26th September 2026 | 9:30 AM – 12:00 PM",
    venue: `Venue 1 (Electronic City): TCS Ltd, Think Campus 42, 45-P, Hosur Rd, Phase 2, Electronic City, Bengaluru – 560100
Venue 2 (Yeshwanthpur): TCS Ltd, Yeshwanth Towers / Sattva Knowledge Point, Yeshwanthpur Industrial Suburb, Bengaluru – 560022`,
    experienceBracket: "4–8 Years",
    notice: "Immediate / 30 Days",
    message: `DOCUMENTS TO CARRY TO TCS WALK-IN:
1. Updated Hard Copy of Resume
2. Original Government ID Proof + 1 Photocopy (Aadhaar / PAN Card / Passport)
3. 2 Passport-Size Photographs
4. Registration Link: https://ibegin.tcsapps.com/candidate/

Pitch to HR at registration desk:
"I am Murali Krishna Popuri, attending for the Full Stack / React JS Developer position. I have 4 years of combined professional and hands-on full-stack development experience, with 2 years of production engineering at YoungMinds building RestoSoft (offline-first React/Electron POS with local sync). I am an immediate joiner available to join in Bengaluru."`,
  },
  {
    company: "Xponentium India (Same-Day Offer Drive)",
    contactPerson: "Kirti Vatsa & Yogita Paliwal (Talent Acquisition)",
    phone: "Direct Walk-in / Contact via LinkedIn",
    email: "kirti.vatsa@xponentiums.com / yogita.paliwal@xponentiums.com",
    role: "Full Stack Developer (Java, Spring Boot, React & GenAI) | Same-Day Offer",
    timing: "Saturday, 26th September 2026 | Morning onwards",
    venue: "BCIT (Bhartiya City Information Technology), Thanisandra, Bangalore",
    experienceBracket: "5–8 Years",
    notice: "Immediate Joiner",
    message: `Hi Kirti / Yogita,

I am writing regarding the Walk-In Drive tomorrow (Saturday, 26th Sept) at Bhartiya City (BCIT, Thanisandra) for the Full Stack Developer role.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of enterprise engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

I have strong expertise with React.js, TypeScript, JavaScript (ES6+), REST APIs, SQL/NoSQL databases, and modern API integrations.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to attend all interview rounds tomorrow at BCIT Thanisandra.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Resume attached for reference.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
];

async function sendDossier() {
  console.log(`Sending Bengaluru Walk-In Drives dossier to: ${TARGET_EMAIL}`);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; background-color: #f7fafc; padding: 20px; }
        .container { max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: #1a365d; color: #ffffff; padding: 24px 30px; }
        .header h1 { margin: 0 0 6px 0; font-size: 21px; font-weight: 700; color: #ffffff; }
        .header p { margin: 0; font-size: 13.5px; color: #cbd5e0; }
        .content { padding: 24px 30px; }
        .card { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 5px solid #2b6cb0; border-radius: 6px; padding: 18px; margin-bottom: 24px; }
        .card-title { font-size: 17px; font-weight: 700; color: #1a202c; margin: 0 0 8px 0; }
        .card-meta { font-size: 13px; color: #4a5568; margin-bottom: 12px; }
        .card-meta div { margin-bottom: 4px; }
        .card-meta strong { color: #2d3748; }
        .badge { display: inline-block; background: #ebf8ff; color: #2b6cb0; font-weight: bold; font-size: 11px; padding: 2px 8px; border-radius: 4px; border: 1px solid #bee3f8; }
        .msg-box { background: #ffffff; border: 1px dashed #cbd5e0; border-radius: 4px; padding: 14px; font-family: monospace; font-size: 12.5px; white-space: pre-wrap; color: #1a202c; }
        .footer { padding: 16px 30px; font-size: 12px; color: #718096; background: #edf2f7; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bengaluru Walk-In Drives — Saturday, 26th September 2026</h1>
          <p>Complete Venues, Timings, Direct Recruiter Phone Numbers & Pitch Messages</p>
        </div>
        <div class="content">
          <p style="font-size: 14px; margin-top: 0;">Below are the 4 major active Walk-In Drives taking place in <strong>Bengaluru tomorrow (Saturday, 26th September 2026)</strong> for React / Full Stack Developer roles, extracted directly from the latest recruiter postings.</p>

          ${walkins
            .map(
              (w, i) => `
            <div class="card">
              <div class="card-title">${i + 1}. ${w.company} <span class="badge">${w.role.split("|")[0]}</span></div>
              <div class="card-meta">
                <div><strong>Timing:</strong> ${w.timing}</div>
                <div><strong>Venue / Location:</strong> ${w.venue}</div>
                <div><strong>Contact Person:</strong> ${w.contactPerson}</div>
                <div><strong>Phone / WhatsApp:</strong> <span style="font-family: monospace; color: #2b6cb0; font-weight: bold; font-size: 14px;">${w.phone}</span></div>
                <div><strong>Email:</strong> ${w.email}</div>
                <div><strong>Experience Bracket:</strong> ${w.experienceBracket} | <strong>Notice:</strong> ${w.notice}</div>
              </div>
              <div style="font-size: 12px; font-weight: 600; color: #4a5568; margin-bottom: 4px;">Outreach Message / Checklist:</div>
              <div class="msg-box">${w.message}</div>
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

  const textContent = walkins
    .map(
      (w, i) =>
        `WALK-IN DRIVE ${i + 1}: ${w.company}
Role: ${w.role}
Timing: ${w.timing}
Venue: ${w.venue}
Contact: ${w.contactPerson} (${w.phone})
Email: ${w.email}
Notice: ${w.notice}

MESSAGE / CHECKLIST:
----------------------------------------
${w.message}
----------------------------------------
`
    )
    .join("\n\n");

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    subject: "Bengaluru Walk-In Drives Dossier (Saturday 26 Sept) - Venues, Contacts & Pitch Messages",
    text: textContent,
    html: htmlContent,
    replyTo: SENDER_EMAIL,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("SUCCESS! Bengaluru walk-ins dossier sent to user.");
    console.log("Message ID:", info.messageId);
  } catch (err) {
    console.error("ERROR sending walk-ins email:", err.message);
  }
}

sendDossier();
