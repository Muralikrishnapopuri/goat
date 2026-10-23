/**
 * SEND BATCH 13 - FRESH BENGALURU CONTACTS & HIGH-PRIORITY JOBS DOSSIER
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

const contactsData = [
  {
    company: "JobTrip / Deloitte",
    contactPerson: "Recruitment Team",
    phone: "+91 8799798407",
    whatsappLink: "https://wa.me/918799798407",
    email: "career@jobtrip.in",
    role: "Managed Services Engineer II – Fullstack Java / React",
    location: "Bengaluru / Hyderabad",
    experienceBracket: "2 to 4 Years",
    notice: "Immediate Joiners Preferred",
    urgency: "DIRECT PHONE & WHATSAPP RECRUITER CONTACT",
    pitch: `Hi,

I saw your hiring post for the Managed Services Engineer II – Fullstack React role in Bengaluru / Hyderabad.

I bring 2 years of professional software engineering experience at YoungMinds Technology Solutions, where I build RestoSoft (an offline-first POS desktop system in Electron with local LAN real-time synchronization and web platforms).

My core expertise is centered on React.js, TypeScript, JavaScript (ES6+), REST APIs, and relational databases. In building RestoSoft, I mastered Electron.js and local LAN synchronization within a week to deliver production software, and I ramp up on unfamiliar tools and backend services rapidly.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available to relocate immediately to Bengaluru or Hyderabad for onsite or hybrid work.

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
    company: "Ampcus Tech",
    contactPerson: "Vaishnavi Singh (Talent Acquisition Associate)",
    phone: "DM / Email in post",
    whatsappLink: "N/A",
    email: "vaishnavi.singh@ampcustech.com",
    role: "Senior Front-End / UI Developer (Angular / React, TypeScript, JavaScript, REST APIs)",
    location: "Bengaluru (In-Person Interview)",
    experienceBracket: "5+ Years (Immediate Joiners Only)",
    notice: "Immediate Joiners Only (Requested LWD & CTC details)",
    urgency: "IMMEDIATE JOINER MANDATE - DIRECT RECRUITER EMAIL",
    pitch: `Dear Vaishnavi,

I saw your hiring post on LinkedIn regarding the Front-End Developer opening in Bengaluru.

I have strictly 2 years of professional software engineering experience specializing in React.js, TypeScript, JavaScript (ES6+), and REST APIs. I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with real-time LAN synchronization).

I have an exceptionally steep learning curve (mastering Electron.js within a week for RestoSoft). I am an immediate joiner (official LWD of Nov 11, negotiable for immediate early release upon offer) and available in Bengaluru for an in-person interview immediately.

Details requested:
- Current Location: Vijayawada (Ready to relocate immediately to Bengaluru)
- Notice Period: Immediate Joiner (LWD Nov 11, negotiable for immediate release)
- Current CTC: Available upon discussion
- Expected CTC: As per company standards

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Vingo",
    contactPerson: "Tirth Kapadi (Building Vingo)",
    phone: "Direct Founder Email",
    whatsappLink: "N/A",
    email: "careers@justvingo.com",
    role: "Full Stack Engineer (TypeScript, Node.js, React/Next.js, PostgreSQL)",
    location: "Koramangala, Bengaluru (In office)",
    experienceBracket: "Early-stage / Strong Builders",
    notice: "Immediate Joiner",
    urgency: "HIGH VALUE - DIRECT FOUNDER / HIRING TEAM EMAIL (100% STACK MATCH)",
    pitch: `Hi Tirth,

I read your post regarding hiring 2 engineers at Vingo building the P2P marketplace in Koramangala.

Your philosophy—valuing first-principles debugging, ownership, and how someone thinks and builds over resume fluff—resonated strongly with me.

My stack is a direct 1:1 match: TypeScript, Node.js, React, Next.js, and PostgreSQL. At YoungMinds Technology Solutions, I built RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and web platforms. When faced with zero prior Electron experience, I mastered Electron.js and LAN networking within a week to ship a production system handling live merchant transactions.

I am an immediate joiner (official LWD Nov 11, negotiable for immediate release) and ready to work in-office at Koramangala, Bengaluru.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

My resume is attached. I'd love to chat about what you're building.

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "IIRIS Consulting",
    contactPerson: "Manisha Kumari (Assistant Team Leader)",
    phone: "Direct Email",
    whatsappLink: "N/A",
    email: "career@iirisconsulting.com",
    role: "Software Developer (React, Node.js, APIs, SQL, System Integrations)",
    location: "Bengaluru",
    experienceBracket: "4+ Years",
    notice: "Immediate Joiner",
    urgency: "DIRECT RECRUITER INBOX",
    pitch: `Dear Manisha,

I am writing to apply for the Software Developer opening at IIRIS Consulting in Bengaluru.

I have 2 years of professional software engineering experience specializing in React.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), and REST APIs. I currently work as a Full-Stack Developer at YoungMinds Technology Solutions building RestoSoft (an offline-first POS desktop system in Electron with local LAN synchronization).

I have a proven rapid learning curve (shipping RestoSoft in Electron within a week of learning the framework). I am an immediate joiner (official LWD Nov 11, negotiable for immediate release) and ready to relocate immediately to Bengaluru.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
  {
    company: "Cosette Network",
    contactPerson: "Seema Rawat (Talent Acquisition Specialist)",
    phone: "Direct Email",
    whatsappLink: "N/A",
    email: "seema@cosettenetwork.com",
    role: "Full Stack Engineer (React.js, Next.js, TypeScript, Node.js, Express.js, PostgreSQL/MongoDB)",
    location: "Bengaluru (Hybrid)",
    experienceBracket: "5–7 Years",
    notice: "Immediate Joiner",
    urgency: "DIRECT RECRUITER INBOX",
    pitch: `Dear Seema,

I saw your hiring post for the Full Stack Engineer role in Bengaluru (Hybrid) requiring React.js, Next.js, TypeScript, Node.js, and databases.

I bring 2 years of professional software engineering experience at YoungMinds Technology Solutions building RestoSoft (offline-first POS desktop system in Electron with local LAN synchronization and role-based web platforms).

My core stack directly covers React.js, Next.js, Node.js, Express, TypeScript, and SQL/MongoDB. I have a steep learning curve and ramp up on unfamiliar tools rapidly. I am an immediate joiner (official LWD Nov 11, negotiable for immediate release) and available to relocate to Bengaluru immediately.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

Best regards,
Murali Krishna Popuri
+91 9347796811`,
  },
];

const directPortalJobs = [
  {
    company: "Postman",
    role: "Software Engineer – Frontend UI, Git Native",
    jobId: "JR1000052",
    experience: "2–4 Years (Batch 2021/2022/2023/2024)",
    ctc: "₹25–40 LPA",
    location: "Bengaluru · Hybrid",
    stack: "React, TypeScript, Node.js, Electron, Git, Filesystems",
    highlight: "100% PERFECT MATCH with Murali's 2-year RestoSoft production experience in Electron.js + Node.js + React!",
    applyLink: "https://lnkd.in/d7ixy4hH",
    workdayLink: "https://postman.wd108.myworkdayjobs.com/careers/job/Bangalore-India/Software-Engineer---Frontend-UI---Git-Native_JR1000052",
  },
  {
    company: "JioStar",
    role: "Software Development Engineer II – Full Stack",
    jobId: "JR10007",
    experience: "2–4 Years (Batch 2021/2022/2023)",
    ctc: "₹22–35 LPA",
    location: "Bengaluru · Onsite (WeWork)",
    stack: "React, Node.js, JavaScript/TypeScript, REST APIs, Microservices, Databases",
    highlight: "High-paying fullstack role directly matching React + Node.js 2-4 years experience.",
    applyLink: "https://lnkd.in/dW3STUDj",
    workdayLink: "https://jiostar.wd102.myworkdayjobs.com/JioStar/job/Bengaluru-We-Work/Software-Development-Engineer-II-Fullstack_JR10007",
  },
  {
    company: "Nike",
    role: "Software Engineer I, ITC",
    jobId: "R-92757",
    experience: "0–2 Years",
    ctc: "₹12–18 LPA",
    location: "Bengaluru, Karnataka, India",
    stack: "React / Vue.js, AWS, JavaScript, REST APIs, CI/CD, Jest",
    highlight: "Top-tier MNC entry-to-mid level role looking for 0-2 years React developers.",
    applyLink: "https://lnkd.in/gvWhbtPh",
  },
  {
    company: "Joveo",
    role: "Frontend Developer",
    experience: "0–3 Years",
    ctc: "Up to ₹10 LPA",
    location: "Bengaluru, Karnataka",
    stack: "TypeScript, React, Next.js, Node.js, Express.js",
    highlight: "Direct match with Next.js + React + Node.js stack in Bengaluru.",
    applyLink: "https://lnkd.in/dBQgjC3A",
  },
  {
    company: "JioStar",
    role: "Software Development Engineer II – Player (Frontend)",
    experience: "2–4 Years",
    location: "Bengaluru · Onsite",
    stack: "React, Next.js, TypeScript, Shaka Player, HLS.js",
    highlight: "Streaming web UI and playback engineering for high concurrent traffic.",
    applyLink: "https://lnkd.in/djUFu-HM",
  },
  {
    company: "CareerXperts Consulting",
    role: "Software Engineer – JavaScript / TypeScript | React",
    experience: "3–6 Years",
    location: "Bengaluru",
    stack: "React.js, JavaScript & TypeScript, REST APIs, Node.js",
    highlight: "Consulting role open for React / TypeScript fullstack engineers.",
    applyLink: "https://lnkd.in/d5ZNHB6P",
  },
  {
    company: "Emmes Group",
    role: "Associate Software Engineer",
    jobId: "3617",
    experience: "0–1 Year / Freshers",
    location: "Bengaluru",
    stack: "React, Node.js, JavaScript, DBMS",
    highlight: "Clinical trial healthcare software engineering with React and Node.js.",
    applyLink: "https://lnkd.in/g5aSZDRE",
  },
];

async function sendDossier() {
  console.log("Preparing Batch 13 Bengaluru Dossier for test email:", TARGET_EMAIL);

  let contactsHtml = contactsData
    .map(
      (c, i) => `
    <div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 18px; margin-bottom: 20px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eaeef2; padding-bottom: 10px; margin-bottom: 12px;">
        <h3 style="margin: 0; color: #0969da; font-size: 17px;">#${i + 1}. ${c.company} — ${c.role}</h3>
        <span style="background-color: #dafbe1; color: #1a7f37; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 12px; border: 1px solid #aceebb;">${c.urgency}</span>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 12px;">
        <tr>
          <td style="width: 130px; padding: 4px 0; color: #57606a; font-weight: 600;">Contact Person:</td>
          <td style="padding: 4px 0; color: #24292f; font-weight: 600;">${c.contactPerson}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Phone / WhatsApp:</td>
          <td style="padding: 4px 0; color: #24292f;">
            ${c.phone !== "N/A" && c.phone !== "DM / Email in post" && c.phone !== "Direct Founder Email" && c.phone !== "Direct Email"
              ? `<a href="tel:${c.phone}" style="color: #0969da; font-weight: bold; text-decoration: none;">${c.phone}</a> &nbsp;|&nbsp; <a href="${c.whatsappLink}" style="color: #1a7f37; font-weight: bold; text-decoration: none;" target="_blank">Open in WhatsApp</a>`
              : `<span style="color: #6e7781;">${c.phone}</span>`}
          </td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Email:</td>
          <td style="padding: 4px 0;"><a href="mailto:${c.email}" style="color: #0969da; text-decoration: none; font-weight: 600;">${c.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Location:</td>
          <td style="padding: 4px 0; color: #24292f;">${c.location}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Experience Req:</td>
          <td style="padding: 4px 0; color: #24292f;">${c.experienceBracket}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #57606a; font-weight: 600;">Notice / Pivot:</td>
          <td style="padding: 4px 0; color: #cf222e; font-weight: 600;">${c.notice}</td>
        </tr>
      </table>
      <div style="background-color: #f6f8fa; border-left: 3px solid #0969da; padding: 12px 14px; border-radius: 0 4px 4px 0;">
        <div style="font-size: 12px; font-weight: bold; color: #24292f; margin-bottom: 6px;">READY-TO-COPY OUTREACH MESSAGE:</div>
        <pre style="margin: 0; font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; font-size: 12px; white-space: pre-wrap; word-break: break-word; color: #24292f; background: #ffffff; padding: 10px; border: 1px solid #d0d7de; border-radius: 4px;">${c.pitch}</pre>
      </div>
    </div>`
    )
    .join("");

  let jobsHtml = directPortalJobs
    .map(
      (j, i) => `
    <tr style="border-bottom: 1px solid #d0d7de; background-color: ${i % 2 === 0 ? "#ffffff" : "#f6f8fa"};">
      <td style="padding: 10px 12px; font-weight: 700; color: #24292f;">${j.company}</td>
      <td style="padding: 10px 12px; color: #0969da; font-weight: 600;">${j.role}</td>
      <td style="padding: 10px 12px; color: #24292f;">${j.experience}</td>
      <td style="padding: 10px 12px; color: #1a7f37; font-weight: 600;">${j.ctc || "Best in Industry"}</td>
      <td style="padding: 10px 12px; color: #57606a; font-size: 12px;">${j.stack}</td>
      <td style="padding: 10px 12px; font-size: 12px; color: #0969da; font-weight: bold;">
        <a href="${j.applyLink}" target="_blank" style="color: #0969da; text-decoration: underline;">Direct Apply</a>
        ${j.workdayLink ? `<br><a href="${j.workdayLink}" target="_blank" style="color: #6f42c1; text-decoration: underline; font-size: 11px;">Workday Portal</a>` : ""}
      </td>
    </tr>`
    )
    .join("");

  const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Batch 13 — Fresh Bengaluru Recruiter Contacts & High-Priority Jobs</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; background-color: #f6f8fa; margin: 0; padding: 24px;">
  <div style="max-width: 850px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #d0d7de; padding: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
    
    <div style="border-bottom: 2px solid #0969da; padding-bottom: 14px; margin-bottom: 22px;">
      <h1 style="margin: 0 0 6px 0; color: #0969da; font-size: 22px;">Batch 13: Bengaluru Recruiter Leads & High-Priority Jobs</h1>
      <p style="margin: 0; color: #57606a; font-size: 13px;">Curated for Murali Krishna Popuri | 2 Years Full-Stack Experience | Immediate Joiner (Nov 11 LWD / Negotiable)</p>
    </div>

    <div style="background-color: #ddf4ff; border: 1px solid #54aeff; border-radius: 6px; padding: 14px; margin-bottom: 24px; font-size: 13px; color: #0969da;">
      <strong>Top Highlight:</strong> 
      Postman has an active opening for <strong>Software Engineer (Frontend UI, Git Native)</strong> requiring <strong>Electron + React + Node.js (2-4 Years)</strong>. This is an exact 100% match with your 2-year production work on <strong>RestoSoft</strong> (Electron desktop POS)! Apply immediately on Workday!
    </div>

    <h2 style="color: #24292f; font-size: 18px; border-bottom: 1px solid #eaeef2; padding-bottom: 8px; margin-top: 24px; margin-bottom: 16px;">
      Section 1: Recruiter Contacts & Pre-Formatted Outreach Messages
    </h2>
    <p style="font-size: 13px; color: #57606a; margin-top: 0; margin-bottom: 16px;">
      Below are the fresh contacts extracted from the latest 24h Bengaluru LinkedIn feed. Use the pre-crafted outreach messages for WhatsApp, LinkedIn InMail, or direct calls.
    </p>

    ${contactsHtml}

    <h2 style="color: #24292f; font-size: 18px; border-bottom: 1px solid #eaeef2; padding-bottom: 8px; margin-top: 32px; margin-bottom: 16px;">
      Section 2: High-Priority Direct Career Portal Apply Links (0–4 Years Exp)
    </h2>
    <p style="font-size: 13px; color: #57606a; margin-top: 0; margin-bottom: 16px;">
      These roles are hosted on official company Workday/ATS portals. Click to apply directly:
    </p>

    <table style="width: 100%; border-collapse: collapse; font-size: 13px; border: 1px solid #d0d7de; border-radius: 6px; overflow: hidden; margin-bottom: 24px;">
      <thead>
        <tr style="background-color: #f6f8fa; border-bottom: 2px solid #d0d7de; text-align: left;">
          <th style="padding: 10px 12px; color: #24292f;">Company</th>
          <th style="padding: 10px 12px; color: #24292f;">Role</th>
          <th style="padding: 10px 12px; color: #24292f;">Experience</th>
          <th style="padding: 10px 12px; color: #24292f;">CTC</th>
          <th style="padding: 10px 12px; color: #24292f;">Stack</th>
          <th style="padding: 10px 12px; color: #24292f;">Link</th>
        </tr>
      </thead>
      <tbody>
        ${jobsHtml}
      </tbody>
    </table>

    <div style="border-top: 1px solid #eaeef2; padding-top: 14px; margin-top: 28px; font-size: 12px; color: #57606a;">
      <p style="margin: 0 0 6px 0;"><strong>Candidate Profile Summary:</strong></p>
      <p style="margin: 0 0 4px 0;">• Name: Murali Krishna Popuri | Phone: +91 9347796811 | Email: popurimurali16@gmail.com</p>
      <p style="margin: 0 0 4px 0;">• Experience: Strictly 2 years professional software engineering experience (YoungMinds Technology Solutions - RestoSoft)</p>
      <p style="margin: 0 0 4px 0;">• Availability: Immediate Joiner (official LWD Nov 11, negotiable for immediate early release upon offer)</p>
      <p style="margin: 0 0 4px 0;">• Relocation: Immediately available for Bengaluru or Hyderabad</p>
      <p style="margin: 0;">• Permitted Links: Portfolio | LinkedIn | GitHub | Zestchat</p>
    </div>

  </div>
</body>
</html>`;

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    subject: "Batch 13 — Bengaluru Recruiter Contacts, WhatsApp Leads & High-Priority Apply Links",
    text: `Batch 13 Bengaluru Recruiter Contacts & High-Priority Apply Links for Murali Krishna Popuri.

Total Contacts Extracted: ${contactsData.length}
Total Direct Portal Roles: ${directPortalJobs.length}

Top Highlight:
Postman is hiring Software Engineer (Frontend UI, Git Native) requiring Electron + React + Node.js (2-4 Years) in Bengaluru!
Link: https://lnkd.in/d7ixy4hH

Please check HTML view in your email for complete interactive tables and ready-to-copy WhatsApp messages.`,
    html: emailHtml,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Batch 13 Dossier successfully sent to test email!");
  console.log("Message ID:", info.messageId);
}

sendDossier().catch((err) => {
  console.error("Error sending dossier:", err);
  process.exit(1);
});
