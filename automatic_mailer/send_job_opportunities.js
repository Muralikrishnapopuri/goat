const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

if (!GMAIL_APP_PASSWORD) {
  console.error("GMAIL_APP_PASSWORD is not set in .env!");
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

const rawTextContent = `
=============================================================
  IT JOB OPPORTUNITIES — HYDERABAD & BANGALORE (Aug 7, 2026)
=============================================================

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 THIS WEEK'S WALK-IN DRIVES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TCS Walk-In — August 8, 2026 (5-13 yrs exp)
  Hyderabad: TCS Deccan Park, Hitech City Main Rd, Madhapur
  Bangalore: TCS Brigade Bhuwalka Icon, Whitefield Main Rd
  Roles: Enterprise Solutions, SAP EWM, AI
  Apply: https://www.tcs.com/careers

Tech Mahindra Walk-In — Aug 7-14, 2026
  Locations: Hyderabad, Secunderabad, Bangalore
  Apply: https://careers.techmahindra.com/

Sagility Walk-In — Aug 7-10, 2026
  Locations: Bangalore, Hyderabad
  Check: https://www.foundit.in/ → Search "Sagility walk-in"

Cognizant Walk-In — Aug 7, 2026
  Hyderabad: Voice Process Executive
  Apply: https://careers.cognizant.com/


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 COMPANY CAREER PAGES — APPLY DIRECTLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Microsoft        → https://careers.microsoft.com/
Google           → https://careers.google.com/
Amazon           → https://www.amazon.jobs/
Apple            → https://www.apple.com/jobs/in/
Oracle           → https://www.oracle.com/careers/
D. E. Shaw       → https://www.deshawindia.com/
IBM              → https://www.ibm.com/careers
DXC Technology   → https://dxc.com/us/en/careers
SAP              → https://www.sap.com/about/careers.html
NTT DATA         → https://www.nttdata.com/global/en/careers
TCS              → https://www.tcs.com/careers
TCS Freshers     → https://nextstep.tcs.com/
Infosys          → https://career.infosys.com/
Wipro            → https://careers.wipro.com/
Cognizant        → https://careers.cognizant.com/
Tech Mahindra    → https://careers.techmahindra.com/
HCLTech          → https://www.hcltech.com/careers
Accenture        → https://www.accenture.com/in-en/careers


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 JOB PORTALS — SEARCH & APPLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Naukri           → https://www.naukri.com/
LinkedIn Jobs    → https://www.linkedin.com/jobs/
Indeed India      → https://in.indeed.com/
Foundit (Monster)→ https://www.foundit.in/
Hirist           → https://www.hirist.tech/
Instahyre        → https://www.instahyre.com/
CutShort         → https://cutshort.io/
Wellfound        → https://wellfound.com/
Freshersworld    → https://www.freshersworld.com/
WorkIndia        → https://www.workindia.in/
Apna             → https://apna.co/
Shine            → https://www.shine.com/
eLitmus          → https://www.elitmus.com/
AMCAT            → https://www.myamcat.com/
TCS iON          → https://learning.tcs.com/
Built In Hyd     → https://builtinhyderabad.in/
ProductBased     → https://productbased.in/


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 STARTUP PLATFORMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Wellfound (AngelList) → https://wellfound.com/
CutShort              → https://cutshort.io/
Hirist                → https://www.hirist.tech/
ProductBased.in       → https://productbased.in/
Built In Hyderabad    → https://builtinhyderabad.in/


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 RECRUITER FINDER TOOLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hunter.io        → https://hunter.io/
Apollo.io        → https://www.apollo.io/
Snov.io          → https://snov.io/
Kaspr            → https://www.kaspr.io/
Clearout         → https://clearout.io/


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎓 FREE CERTIFICATIONS — DIRECT LINKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

--- ORACLE (FREE Training + FREE Exam — TRENDING!) ---
Oracle MyLearn Hub           → https://mylearn.oracle.com/
OCI Foundations (1Z0-1085)   → https://education.oracle.com/oracle-cloud-infrastructure-2026-foundations-associate/pexam_1Z0-1085-26
OCI AI Foundations (1Z0-1122)→ https://education.oracle.com/oracle-cloud-infrastructure-ai-foundations-associate/pexam_1Z0-1122-26
Agentic AI (1Z0-1157)        → https://education.oracle.com/agentic-ai-foundations-associate/pexam_1Z0-1157-26
Oracle University            → https://education.oracle.com/

--- OTHER FREE CERTS ---
freeCodeCamp (React, Node, JS, Python) → https://www.freecodecamp.org/
HubSpot Academy (Marketing, SEO)      → https://academy.hubspot.com/
Google Skillshop (Ads, Analytics)      → https://skillshop.withgoogle.com/
IBM SkillsBuild (AI, Cloud)            → https://skillsbuild.org/
Simplilearn SkillUp                    → https://www.simplilearn.com/skillup-free-online-courses
Microsoft Learn (Azure, AI)            → https://learn.microsoft.com/
AWS Skill Builder (Cloud, GenAI)       → https://explore.skillbuilder.aws/
Google Cloud Skills Boost              → https://www.cloudskillsboost.google/

--- FREE EXAM VOUCHERS ---
AWS: Use code AIF2CLOUD (50% off AI Practitioner) → Pass it → Get FREE Cloud Practitioner voucher
     → https://aws.amazon.com/certification/

Azure AZ-900: Attend Microsoft Virtual Training Days → Get FREE voucher
     → https://events.microsoft.com/


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 BREAKING NEWS (August 2026)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Microsoft launched 4th cloud region "India South Central" in Hyderabad — massive hiring expected
• 73% of employers plan to hire freshers in H2 2026
• 100,000+ active tech listings across India
• AI/ML architect salaries up 12-18% vs late 2025
• GCC expansion boom in Hyderabad — better pay than traditional IT firms
• In-demand: AI/ML, Cloud (AWS/Azure), Cybersecurity, Full Stack (MERN/Next.js), DevOps


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Updated: August 7, 2026
Always verify on official sites before applying.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

function convertTextToHtml(text) {
  // Replace URLs with clickable anchors
  let html = text.replace(/(https?:\/\/[^\s\)]+)/g, '<a href="$1" target="_blank" style="color: #1a73e8;">$1</a>');
  // Replace section headers (lines with ━)
  html = html.replace(/━+/g, '<hr style="border: 1px solid #e0e0e0; margin: 5px 0;">');
  // Replace newlines with <br/>
  html = html.split('\n').join('<br/>');
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.7; max-width: 700px; margin: 0 auto; padding: 20px; background: #fafafa; border-radius: 8px;">
      <div style="background: linear-gradient(135deg, #1a73e8, #6c5ce7); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">💼 IT Job Opportunities</h1>
        <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Hyderabad & Bangalore — August 7, 2026</p>
      </div>
      <div style="background: white; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
        ${html}
      </div>
      <p style="text-align: center; font-size: 12px; color: #888; margin-top: 15px;">
        Compiled by Murali Krishna Popuri | Always verify on official sites before applying.
      </p>
    </div>
  `;
}

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "popurimuralikrishna04@gmail.com",
  subject: "💼 IT Job Opportunities — Hyderabad & Bangalore (Aug 2026) | Walk-Ins, Career Links, Free Certs",
  text: rawTextContent,
  html: convertTextToHtml(rawTextContent),
};

async function send() {
  console.log("Sending IT job opportunities email to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully:", info.messageId);
}

send().catch((err) => {
  console.error("❌ Error sending email:", err);
  process.exit(1);
});
