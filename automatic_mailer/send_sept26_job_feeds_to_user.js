/**
 * SEND TODAY'S (SEPT 26) LATEST LINKEDIN POSTS, EASY APPLY & NAUKRI FEEDS TO USER
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

function createLinkedInJobUrl(keywords, location, past24h = true, onsiteOnly = false) {
  const timeFilter = past24h ? "r86400" : "r604800";
  const params = new URLSearchParams({
    f_AL: "true",       // Easy Apply
    f_E: "2,3",         // Entry level (2) & Associate (3) -> 1-3 yrs
    f_TPR: timeFilter,  // Past 24h
    keywords: `${keywords} -intern -trainee`,
    location: location,
    sortBy: "DD",       // Most recent first
  });
  if (onsiteOnly) {
    params.set("f_WT", "1,3"); // 1 = Onsite, 3 = Hybrid
  }
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

function createLinkedInPostUrl(query) {
  return `https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=${encodeURIComponent(
    query
  )}&sortBy=%22date_posted%22`;
}

// 1. LinkedIn Recruiter Post Feeds (Past 24h, High-Yield)
const linkedinPostFeeds = [
  {
    title: "React.js / Next.js Hiring Posts (Hyderabad - Past 24h)",
    url: createLinkedInPostUrl('("React" OR "Next.js") Hyderabad ("hiring" OR "share resume" OR "send cv" OR "immediate joiner") -intern'),
    desc: "Direct recruiter posts for React/Next.js in Hyderabad with email addresses or phone numbers."
  },
  {
    title: "React.js / Next.js Hiring Posts (Bengaluru - Past 24h)",
    url: createLinkedInPostUrl('("React" OR "Next.js") Bengaluru ("hiring" OR "share resume" OR "send cv" OR "immediate joiner") -intern'),
    desc: "Direct recruiter posts for React/Next.js in Bengaluru with email addresses or phone numbers."
  },
  {
    title: "Full Stack (React + Node) Hiring Posts (Hyderabad - Past 24h)",
    url: createLinkedInPostUrl('("Full Stack" OR "MERN") Hyderabad ("React" OR "Node") ("hiring" OR "share resume") -intern'),
    desc: "Full-Stack developer posts in Hyderabad requesting CV submissions."
  },
  {
    title: "Full Stack (React + Node) Hiring Posts (Bengaluru - Past 24h)",
    url: createLinkedInPostUrl('("Full Stack" OR "MERN") Bengaluru ("React" OR "Node") ("hiring" OR "share resume") -intern'),
    desc: "Full-Stack developer posts in Bengaluru requesting CV submissions."
  },
  {
    title: "Immediate Joiner Hiring Posts (Hyderabad & Bengaluru - Past 24h)",
    url: createLinkedInPostUrl('("immediate joiner" OR "immediate joiners") ("React" OR "Node" OR "Full Stack") (Hyderabad OR Bengaluru) -intern'),
    desc: "Urgent recruitment requirements explicitly targeting immediate joiners."
  },
  {
    title: "Walk-In & Face-to-Face Interview Drives (Bengaluru - Past 24h)",
    url: createLinkedInPostUrl('("walk-in" OR "walk in" OR "F2F" OR "face to face") ("React" OR "Full Stack") Bengaluru -intern'),
    desc: "Today and upcoming physical walk-in drives and in-person interviews in Bengaluru."
  },
  {
    title: "Walk-In & Face-to-Face Interview Drives (Hyderabad - Past 24h)",
    url: createLinkedInPostUrl('("walk-in" OR "walk in" OR "F2F" OR "face to face") ("React" OR "Full Stack") Hyderabad -intern'),
    desc: "Physical walk-in drives and in-person interviews in Hyderabad."
  }
];

// 2. LinkedIn Easy Apply Direct Jobs (Past 24h, 1-Click Apply)
const linkedinEasyApplyJobs = [
  {
    role: "Full Stack Developer - Hyderabad (Past 24h, Easy Apply)",
    url: createLinkedInJobUrl("Full Stack Developer", "Hyderabad, Telangana, India", true, true),
    desc: "Onsite & Hybrid Full Stack roles in Hyderabad with 1-click Easy Apply."
  },
  {
    role: "Full Stack Developer - Bengaluru (Past 24h, Easy Apply)",
    url: createLinkedInJobUrl("Full Stack Developer", "Bengaluru, Karnataka, India", true, true),
    desc: "Onsite & Hybrid Full Stack roles in Bengaluru with 1-click Easy Apply."
  },
  {
    role: "React.js Developer - Hyderabad (Past 24h, Easy Apply)",
    url: createLinkedInJobUrl("React.js Developer", "Hyderabad, Telangana, India", true, true),
    desc: "React.js frontend openings in Hyderabad."
  },
  {
    role: "React.js Developer - Bengaluru (Past 24h, Easy Apply)",
    url: createLinkedInJobUrl("React.js Developer", "Bengaluru, Karnataka, India", true, true),
    desc: "React.js frontend openings in Bengaluru."
  },
  {
    role: "Node.js / Express Developer - Hyderabad (Past 24h, Easy Apply)",
    url: createLinkedInJobUrl("Node.js Developer", "Hyderabad, Telangana, India", true, true),
    desc: "Node.js backend and API engineer openings in Hyderabad."
  },
  {
    role: "Node.js / Express Developer - Bengaluru (Past 24h, Easy Apply)",
    url: createLinkedInJobUrl("Node.js Developer", "Bengaluru, Karnataka, India", true, true),
    desc: "Node.js backend and API engineer openings in Bengaluru."
  },
  {
    role: "MERN Stack Developer - Hyderabad & Bengaluru (Past 24h, Easy Apply)",
    url: createLinkedInJobUrl("MERN Stack Developer", "India", true, true),
    desc: "Direct MERN openings across top tech hubs."
  }
];

// 3. Naukri Curated Feeds (Past 24h, 2 Years Experience)
const naukriFeeds = [
  {
    role: "Full Stack Developer (React + Node) - Hyderabad (Last 24h)",
    url: "https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?k=full%20stack%20developer%20react%20node&experience=2&jobAge=1&wfhType=0",
    desc: "Onsite/Hybrid roles in Hyderabad for 2 years experience."
  },
  {
    role: "Full Stack Developer (React + Node) - Bengaluru (Last 24h)",
    url: "https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?k=full%20stack%20developer%20react%20node&experience=2&jobAge=1&wfhType=0",
    desc: "Onsite/Hybrid roles in Bengaluru for 2 years experience."
  },
  {
    role: "React.js Developer - Hyderabad (Last 24h)",
    url: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    desc: "Dedicated React.js frontend openings in Hyderabad."
  },
  {
    role: "React.js Developer - Bengaluru (Last 24h)",
    url: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    desc: "Dedicated React.js frontend openings in Bengaluru."
  },
  {
    role: "Node.js Developer - Hyderabad & Bengaluru (Last 24h)",
    url: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    desc: "Node.js and backend engineering roles."
  },
  {
    role: "MERN Stack Developer - Hyderabad (Last 24h)",
    url: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    desc: "MERN stack roles in Hyderabad."
  },
  {
    role: "MERN Stack Developer - Bengaluru (Last 24h)",
    url: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    desc: "MERN stack roles in Bengaluru."
  }
];

function buildHtml() {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
    .container { max-width: 820px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0f172a, #1e3a8a); color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 700; }
    .header p { margin: 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 24px; }
    .section-title { font-size: 17px; font-weight: 700; color: #0f172a; margin-top: 24px; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
    .link-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin-bottom: 12px; }
    .link-title { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
    .link-title a { color: #2563eb; text-decoration: none; }
    .link-title a:hover { text-decoration: underline; }
    .link-desc { font-size: 13px; color: #64748b; margin-bottom: 6px; }
    .btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-top: 4px; }
    .alert-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px 18px; margin-bottom: 24px; border-radius: 4px; font-size: 13px; }
    .footer { text-align: center; padding: 18px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; background: #f8fafc; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Murali Krishna Popuri | High-Priority Job Feeds & Easy Apply (Sept 26)</h1>
      <p>Targeting: React.js, Next.js, Node.js, TypeScript, Full Stack | Hyderabad & Bengaluru</p>
    </div>
    <div class="content">
      <div class="alert-box">
        <strong>WORKFLOW REMINDER:</strong><br>
        1. Click on the <strong>LinkedIn Recruiter Post Feeds</strong> below to see raw hiring posts with emails and phone numbers.<br>
        2. Whenever you find posts with email addresses or WhatsApp contacts, copy and paste the post text into the chat — the system will instantly formulate personalized human-written emails (per Email_template.pdf), attach your resume, and dispatch them with anti-spam compliance.<br>
        3. Use the <strong>LinkedIn Easy Apply</strong> and <strong>Naukri</strong> direct feeds for quick 1-click submissions.
      </div>

      <div class="section-title">1. LinkedIn Recruiter Post Feeds (Past 24 Hours)</div>
      ${linkedinPostFeeds.map(f => `
        <div class="link-card">
          <div class="link-title"><a href="${f.url}" target="_blank">${f.title}</a></div>
          <div class="link-desc">${f.desc}</div>
          <a class="btn" href="${f.url}" target="_blank">Open Live Post Feed &rarr;</a>
        </div>
      `).join('')}

      <div class="section-title">2. LinkedIn Easy Apply Jobs (Past 24 Hours, 1-Click Apply)</div>
      ${linkedinEasyApplyJobs.map(f => `
        <div class="link-card">
          <div class="link-title"><a href="${f.url}" target="_blank">${f.role}</a></div>
          <div class="link-desc">${f.desc}</div>
          <a class="btn" href="${f.url}" target="_blank">Open Easy Apply Listings &rarr;</a>
        </div>
      `).join('')}

      <div class="section-title">3. Naukri Curated Feeds (Past 24 Hours, 2 Years Experience)</div>
      ${naukriFeeds.map(f => `
        <div class="link-card">
          <div class="link-title"><a href="${f.url}" target="_blank">${f.role}</a></div>
          <div class="link-desc">${f.desc}</div>
          <a class="btn" href="${f.url}" target="_blank">Open Naukri Jobs &rarr;</a>
        </div>
      `).join('')}
    </div>
    <div class="footer">
      Murali Krishna Popuri Job Outreach System | Generated automatically on September 26, 2026.
    </div>
  </div>
</body>
</html>
  `;
}

async function sendFeedsEmail() {
  console.log(`Sending job feeds to ${TARGET_EMAIL}...`);
  const html = buildHtml();
  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    replyTo: SENDER_EMAIL,
    subject: `Murali Krishna Popuri | High-Priority Job Feeds & Easy Apply (Sept 26)`,
    html: html,
    text: `Murali Krishna Popuri | High-Priority Job Feeds & Easy Apply (Sept 26)\n\nPlease check the HTML version of this email to access all clickable direct links for LinkedIn Recruiter Posts, LinkedIn Easy Apply, and Naukri.`,
    headers: {
      "X-Mailer": "Apple Mail (2.3654.120.0.1)",
      Importance: "Normal",
      "X-Priority": "3",
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Job feeds email successfully sent to ${TARGET_EMAIL}! Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending job feeds email:", error);
    process.exit(1);
  }
}

sendFeedsEmail();
