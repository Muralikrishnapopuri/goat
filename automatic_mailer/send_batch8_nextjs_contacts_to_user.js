/**
 * SEND BATCH 8 NEXT.JS CONTACTS & 4-YEAR COMBINED PITCH TO USER
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
    name: "Anil Nayak",
    company: "Tata Consultancy Services (TCS)",
    role: "Walk-In Drive: NextJS Full Stack / ReactJS (Bangalore - Saturday 26 Sept 2026, 9 AM - 1 PM)",
    contactMethod: "LinkedIn DM & WhatsApp Group (https://lnkd.in/d22im3mH)",
    email: "LinkedIn Direct Message",
    notes: "TCS Walk-In Drive tomorrow morning in Bangalore for NextJS + NodeJS / ReactJS.",
    message: `Hi Anil,

I saw your post regarding the TCS Walk-In Drive tomorrow in Bangalore for NextJS Full Stack / ReactJS Developer roles.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of full-time enterprise engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core technical expertise includes Next.js, React.js, Node.js, TypeScript, JavaScript (ES6+), and REST API integration with SQL/NoSQL databases.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for the Bangalore walk-in drive and technical rounds.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume PDF is ready to share. Looking forward to your guidance for the drive.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    name: "Alli Chandana Sriphani",
    company: "Recruitment Hub 365",
    role: "Frontend Developer – SDE 2 (React.js, Next.js, TypeScript) | Bengaluru Hybrid",
    contactMethod: "Email: chandana@recruitmenthub365.com / LinkedIn DM",
    email: "chandana@recruitmenthub365.com",
    notes: "Direct personal recruiter for 4-6 YOE Frontend SDE-2 opening. C2H 6 months.",
    message: `Hi Chandana,

I saw your hiring post on LinkedIn for the Frontend Developer (SDE 2) opening in Bengaluru.

I bring 4 years of combined professional and hands-on development experience—including 2 years of enterprise engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

I specialize in React.js, Next.js, TypeScript, JavaScript (ES6+), Redux, and REST API integration with high performance UI architectures.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to join in Bengaluru.

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
    name: "Sanjay Singh Thakur",
    company: "Nilasu Consulting Services Pvt. Ltd.",
    role: "Senior React.js / Next.js Front-End Developer | Hyderabad (Immediate to 15 Days)",
    contactMethod: "Email: Sanjay.Singh@nilasu.com",
    email: "Sanjay.Singh@nilasu.com",
    notes: "Hyderabad location, 5+ YOE bracket, Immediate to 15 days notice.",
    message: `Hi Sanjay,

I saw your hiring post for the Senior React.js / Next.js Developer role in Hyderabad.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of full-time production engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

My core stack centers on React.js, Next.js, Vite, TypeScript, JavaScript (ES6+), and Redux/state management with REST API integration.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for immediate interview rounds in Hyderabad.

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
    name: "Seema Rawat",
    company: "Cosette Network",
    role: "Full Stack Engineer (React.js / Next.js, Node.js, SQL, AWS) | Bangalore (Hybrid)",
    contactMethod: "Email: seema@cosettenetwork.com",
    email: "seema@cosettenetwork.com",
    notes: "5-7 YOE, Bangalore hybrid, Next.js + Node.js + SQL.",
    message: `Hi Seema,

I saw your hiring post on LinkedIn for the Full Stack Engineer role in Bangalore.

I bring 4 years of combined professional and hands-on full-stack development experience—including 2 years of enterprise engineering at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization).

I have extensive hands-on experience across Next.js, React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), PostgreSQL/MySQL, and REST APIs.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available for hybrid work in Bangalore.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Resume PDF attached for your consideration.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
];

async function sendContactsEmail() {
  console.log(`Preparing Next.js contacts summary email to: ${TARGET_EMAIL}`);

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
          <h1>Next.js Recruiter Contacts & 4-Year Pitch Templates</h1>
          <p>Search Feed: Next.js + Hyderabad / Bangalore | Sept 25, 2026</p>
        </div>
        <div class="content">
          <p style="font-size: 14px; margin-top: 0;">Here are the direct recruiter and walk-in contacts extracted from the Next.js search feed, with ready-to-copy outreach messages featuring the 4-year combined experience pitch.</p>

          ${contacts
            .map(
              (c, i) => `
            <div class="card">
              <div class="card-title">${i + 1}. ${c.name} — ${c.company}</div>
              <div class="card-meta">
                <div><strong>Role:</strong> ${c.role}</div>
                <div><strong>Contact / Reach out:</strong> <span style="font-family: monospace; color: #2b6cb0; font-weight: bold;">${c.contactMethod}</span></div>
                <div><strong>Email:</strong> ${c.email}</div>
                <div><strong>Notes:</strong> ${c.notes}</div>
              </div>
              <div style="font-size: 12px; font-weight: 600; color: #4a5568; margin-bottom: 4px;">Ready-to-Copy Outreach Message:</div>
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
Contact: ${c.contactMethod}
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
    subject: "Next.js Recruiter Contacts & 4-Year Pitch Messages (Bangalore / Hyderabad Feed)",
    text: textContent,
    html: htmlContent,
    replyTo: SENDER_EMAIL,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("SUCCESS! Next.js summary email sent.");
    console.log("Message ID:", info.messageId);
  } catch (err) {
    console.error("ERROR sending contacts email:", err.message);
  }
}

sendContactsEmail();
