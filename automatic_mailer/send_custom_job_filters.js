const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const SENDER_EMAIL = process.env.SENDER_EMAIL || "popurimurali16@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TARGET_EMAIL = "popurimuralikrishna04@gmail.com";
const RESUME_PATH = path.join(__dirname, "Murali_Krishna_Popuri_FullStack_Developer.pdf");

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

// Search Queries & URLs Generator
function createLinkedInJobUrl(keywords, location, past24h = true) {
  const timeFilter = past24h ? "r86400" : "r604800";
  const params = new URLSearchParams({
    f_AL: "true",       // Easy Apply
    f_WT: "1",          // Onsite Only (1 = Onsite, 2 = Remote, 3 = Hybrid)
    f_E: "2,3",         // Entry level (2) & Associate (3) -> Strictly <= 2-3 yrs
    f_TPR: timeFilter,  // Past 24h or Past Week
    keywords: `${keywords} -senior -lead -architect -principal -manager -intern`,
    location: location,
    sortBy: "DD",       // Most recent first
  });
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

function createLinkedInPostUrl(query, past24h = true) {
  const datePosted = past24h ? '"past-24h"' : '"past-week"';
  return `https://www.linkedin.com/search/results/content/?datePosted=${encodeURIComponent(datePosted)}&keywords=${encodeURIComponent(query)}&sortBy=${encodeURIComponent('"date_posted"')}`;
}

// Hyderabad Easy Apply Links (Onsite Only, <= 2-3 Yrs) - Primary Preference
const hydJobs = [
  {
    role: "Full Stack Developer (React / Node / TypeScript)",
    url24h: createLinkedInJobUrl("Full Stack Developer", "Hyderabad, Telangana, India", true),
    url7d: createLinkedInJobUrl("Full Stack Developer", "Hyderabad, Telangana, India", false),
  },
  {
    role: "React.js / Next.js Developer",
    url24h: createLinkedInJobUrl("React.js Developer", "Hyderabad, Telangana, India", true),
    url7d: createLinkedInJobUrl("React.js Developer", "Hyderabad, Telangana, India", false),
  },
  {
    role: "Node.js / Express Backend Developer",
    url24h: createLinkedInJobUrl("Node.js Developer", "Hyderabad, Telangana, India", true),
    url7d: createLinkedInJobUrl("Node.js Developer", "Hyderabad, Telangana, India", false),
  },
  {
    role: "MERN Stack Developer",
    url24h: createLinkedInJobUrl("MERN Stack Developer", "Hyderabad, Telangana, India", true),
    url7d: createLinkedInJobUrl("MERN Stack Developer", "Hyderabad, Telangana, India", false),
  },
  {
    role: "Frontend Developer (React / TypeScript)",
    url24h: createLinkedInJobUrl("Frontend Developer React", "Hyderabad, Telangana, India", true),
    url7d: createLinkedInJobUrl("Frontend Developer React", "Hyderabad, Telangana, India", false),
  },
  {
    role: "Software Engineer (React / Node / Web)",
    url24h: createLinkedInJobUrl("Software Engineer (React OR Node)", "Hyderabad, Telangana, India", true),
    url7d: createLinkedInJobUrl("Software Engineer (React OR Node)", "Hyderabad, Telangana, India", false),
  },
];

// Bengaluru Easy Apply Links (Onsite Only, <= 2-3 Yrs) - Secondary
const blrJobs = [
  {
    role: "Full Stack Developer (React / Node / TypeScript)",
    url24h: createLinkedInJobUrl("Full Stack Developer", "Bengaluru, Karnataka, India", true),
    url7d: createLinkedInJobUrl("Full Stack Developer", "Bengaluru, Karnataka, India", false),
  },
  {
    role: "React.js / Frontend Developer",
    url24h: createLinkedInJobUrl("React.js Developer", "Bengaluru, Karnataka, India", true),
    url7d: createLinkedInJobUrl("React.js Developer", "Bengaluru, Karnataka, India", false),
  },
  {
    role: "Node.js / Backend Developer",
    url24h: createLinkedInJobUrl("Node.js Developer", "Bengaluru, Karnataka, India", true),
    url7d: createLinkedInJobUrl("Node.js Developer", "Bengaluru, Karnataka, India", false),
  },
  {
    role: "MERN Stack Developer",
    url24h: createLinkedInJobUrl("MERN Stack Developer", "Bengaluru, Karnataka, India", true),
    url7d: createLinkedInJobUrl("MERN Stack Developer", "Bengaluru, Karnataka, India", false),
  },
];

// LinkedIn Recruiter Hiring Posts (Strictly Exact Matched Roles, No Extra Experience)
const linkedinPosts = [
  {
    title: "Hyderabad: Full Stack & MERN Recruiter Hiring Posts (2 Yrs / Immediate Joiners)",
    query: 'hiring ("Full Stack" OR "MERN") Hyderabad ("2 years" OR "2+ years" OR "immediate joiner" OR "immediate joiners") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern',
    url24h: createLinkedInPostUrl('hiring ("Full Stack" OR "MERN") Hyderabad ("2 years" OR "2+ years" OR "immediate joiner" OR "immediate joiners") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern', true),
    url7d: createLinkedInPostUrl('hiring ("Full Stack" OR "MERN") Hyderabad ("2 years" OR "2+ years" OR "immediate joiner" OR "immediate joiners") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern', false),
  },
  {
    title: "Hyderabad: React.js Developer Recruiter Posts (2 Yrs / Immediate Joiners)",
    query: 'hiring "React" Hyderabad ("2 years" OR "2+ years" OR "immediate joiner" OR "urgent requirement") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern',
    url24h: createLinkedInPostUrl('hiring "React" Hyderabad ("2 years" OR "2+ years" OR "immediate joiner" OR "urgent requirement") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern', true),
    url7d: createLinkedInPostUrl('hiring "React" Hyderabad ("2 years" OR "2+ years" OR "immediate joiner" OR "urgent requirement") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern', false),
  },
  {
    title: "Hyderabad: Node.js / Backend Developer Recruiter Posts (2 Yrs / Immediate Joiners)",
    query: 'hiring ("Node.js" OR "Node" OR "Backend Developer") Hyderabad ("2 years" OR "2+ years" OR "immediate joiner") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern',
    url24h: createLinkedInPostUrl('hiring ("Node.js" OR "Node" OR "Backend Developer") Hyderabad ("2 years" OR "2+ years" OR "immediate joiner") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern', true),
    url7d: createLinkedInPostUrl('hiring ("Node.js" OR "Node" OR "Backend Developer") Hyderabad ("2 years" OR "2+ years" OR "immediate joiner") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern', false),
  },
  {
    title: "Hyderabad: Recruiter Direct Email / Resume Drop Posts (Full Stack / React / Node)",
    query: '("share resume" OR "send cv" OR "drop cv" OR "share profile") ("Full Stack" OR "React" OR "Node") Hyderabad -senior -lead -architect -principal -"5+ years" -intern',
    url24h: createLinkedInPostUrl('("share resume" OR "send cv" OR "drop cv" OR "share profile") ("Full Stack" OR "React" OR "Node") Hyderabad -senior -lead -architect -principal -"5+ years" -intern', true),
    url7d: createLinkedInPostUrl('("share resume" OR "send cv" OR "drop cv" OR "share profile") ("Full Stack" OR "React" OR "Node") Hyderabad -senior -lead -architect -principal -"5+ years" -intern', false),
  },
  {
    title: "Hyderabad & Bengaluru: Recruiter Google Form / Application Sheet Posts",
    query: '("forms.gle" OR "docs.google.com/forms") ("React" OR "Node" OR "Full Stack") (Hyderabad OR Bengaluru) -senior -lead -architect -intern',
    url24h: createLinkedInPostUrl('("forms.gle" OR "docs.google.com/forms") ("React" OR "Node" OR "Full Stack") (Hyderabad OR Bengaluru) -senior -lead -architect -intern', true),
    url7d: createLinkedInPostUrl('("forms.gle" OR "docs.google.com/forms") ("React" OR "Node" OR "Full Stack") (Hyderabad OR Bengaluru) -senior -lead -architect -intern', false),
  },
  {
    title: "Bengaluru: Full Stack & React Recruiter Hiring Posts (2 Yrs, No Senior)",
    query: 'hiring ("Full Stack" OR "React" OR "MERN") Bengaluru ("2 years" OR "2+ years" OR "immediate joiner") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern',
    url24h: createLinkedInPostUrl('hiring ("Full Stack" OR "React" OR "MERN") Bengaluru ("2 years" OR "2+ years" OR "immediate joiner") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern', true),
    url7d: createLinkedInPostUrl('hiring ("Full Stack" OR "React" OR "MERN") Bengaluru ("2 years" OR "2+ years" OR "immediate joiner") -senior -lead -architect -principal -"5+ years" -"8+ years" -intern', false),
  },
];

// Naukri Search Filter Links (2 Years Experience, Onsite / Work from Office, Hyd & Blr)
const naukriLinks = [
  {
    role: "Full Stack Developer (React + Node) - Hyderabad",
    location: "Hyderabad",
    url24h: "https://www.naukri.com/full-stack-developer-react-node-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    url7d: "https://www.naukri.com/full-stack-developer-react-node-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
  },
  {
    role: "React.js Developer - Hyderabad",
    location: "Hyderabad",
    url24h: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    url7d: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
  },
  {
    role: "Node.js Developer - Hyderabad",
    location: "Hyderabad",
    url24h: "https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    url7d: "https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
  },
  {
    role: "MERN Stack Developer - Hyderabad",
    location: "Hyderabad",
    url24h: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    url7d: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
  },
  {
    role: "Frontend Developer (React / TypeScript) - Hyderabad",
    location: "Hyderabad",
    url24h: "https://www.naukri.com/frontend-developer-react-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    url7d: "https://www.naukri.com/frontend-developer-react-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
  },
  {
    role: "Full Stack Developer (React + Node) - Bengaluru",
    location: "Bengaluru",
    url24h: "https://www.naukri.com/full-stack-developer-react-node-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    url7d: "https://www.naukri.com/full-stack-developer-react-node-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    role: "React.js Developer - Bengaluru",
    location: "Bengaluru",
    url24h: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    url7d: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    role: "Node.js Developer - Bengaluru",
    location: "Bengaluru",
    url24h: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    url7d: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    role: "MERN Stack Developer - Bengaluru",
    location: "Bengaluru",
    url24h: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    url7d: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
];

// Build Plaintext
function buildPlainText() {
  return `Murali Krishna Popuri | Targeted Job Search Feeds
Resume Matched: Murali_Krishna_Popuri_FullStack_Developer.pdf
Experience Level: Strictly 2 to 3 Years Below (Entry Level & Associate)
Work Mode: Onsite Only (No Remote Jobs)
Location Preference: Hyderabad (Primary) & Bengaluru (Secondary)
Stack: React.js, Next.js, Node.js, Express, TypeScript, JavaScript (ES6+), MERN, SQL, MongoDB, Redis

================================================================================
SECTION 1: LINKEDIN EASY APPLY JOBS - HYDERABAD (ONSITE ONLY, <= 2-3 YRS)
[PRIMARY PREFERENCE - HYDERABAD]
Filters Applied: Easy Apply (f_AL=true) | On-site Only (f_WT=1) | Entry/Associate (f_E=2,3) | No Senior/Lead/Architect
================================================================================

${hydJobs.map((j, i) => `${i + 1}. ${j.role}
   - Past 24 Hours: ${j.url24h}
   - Past 7 Days:   ${j.url7d}`).join("\n\n")}

================================================================================
SECTION 2: LINKEDIN EASY APPLY JOBS - BENGALURU (ONSITE ONLY, <= 2-3 YRS)
================================================================================

${blrJobs.map((j, i) => `${i + 1}. ${j.role}
   - Past 24 Hours: ${j.url24h}
   - Past 7 Days:   ${j.url7d}`).join("\n\n")}

================================================================================
SECTION 3: LINKEDIN TALENT ACQUISITION & HR POSTS (EXACT MATCHED, NO EXTRA EXP)
Posts from recruiters and founders filtered for 2-3 yrs / immediate joiners with senior/lead excluded
================================================================================

${linkedinPosts.map((p, i) => `${i + 1}. ${p.title}
   - Past 24 Hours: ${p.url24h}
   - Past 7 Days:   ${p.url7d}`).join("\n\n")}

================================================================================
SECTION 4: NAUKRI PERFECT SEARCH FILTERS (2 YEARS EXP, ONSITE, HYD & BLR)
Filtered strictly for 2 Years Experience and Work From Office
================================================================================

${naukriLinks.map((n, i) => `${i + 1}. ${n.role} [${n.location}]
   - Past 24 Hours: ${n.url24h}
   - Past 7 Days:   ${n.url7d}`).join("\n\n")}

--------------------------------------------------------------------------------
Candidate Contact & Portfolio:
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
Phone: +91 9347796811
`;
}

// Build HTML Body
function buildHtml() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Curated Job Search Feeds - Murali Krishna Popuri</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #0f172a;">
  <div style="max-width: 800px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Header -->
    <div style="background-color: #0f172a; padding: 24px 28px; border-bottom: 3px solid #0284c7;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 0.2px;">
        Curated Job Search Feeds: Full-Stack Developer
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 13px; color: #94a3b8; line-height: 1.4;">
        Tailored for: Murali Krishna Popuri | Strictly 2 to 3 Years Below | Onsite Only | Hyderabad Preferred
      </p>
    </div>

    <!-- Candidate Profile Summary Card -->
    <div style="background-color: #f8fafc; padding: 16px 28px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #334155; line-height: 1.6;">
      <div style="margin-bottom: 6px;">
        <strong style="color: #0f172a;">Resume File:</strong> Murali_Krishna_Popuri_FullStack_Developer.pdf (Attached)
      </div>
      <div style="margin-bottom: 6px;">
        <strong style="color: #0f172a;">Technical Stack:</strong> React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript (ES6+), MERN, MySQL, PostgreSQL, SQLite, MongoDB, Redis, REST APIs, WebSockets
      </div>
      <div>
        <strong style="color: #0f172a;">Strict Filters Applied:</strong>
        <span style="background-color: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: 11px; margin-right: 4px;">Onsite Only (f_WT=1)</span>
        <span style="background-color: #dcfce7; color: #15803d; padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: 11px; margin-right: 4px;">Easy Apply (f_AL=true)</span>
        <span style="background-color: #fef3c7; color: #b45309; padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: 11px; margin-right: 4px;">2-3 Yrs Max (f_E=2,3)</span>
        <span style="background-color: #fee2e2; color: #b91c1c; padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: 11px;">Zero Senior/Lead Excluded</span>
      </div>
    </div>

    <div style="padding: 24px 28px;">

      <!-- Section 1: Hyderabad Easy Apply (Primary) -->
      <div style="margin-bottom: 30px;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 14px;">
          <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
            1. LinkedIn Easy Apply Jobs - Hyderabad [Preferred Location]
          </h2>
        </div>
        <p style="font-size: 12px; color: #64748b; margin: 0 0 14px 0;">
          Strictly Onsite Only (No Remote), Easy Apply enabled, Entry &amp; Associate level (2-3 years below), senior/lead/architect titles excluded.
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 8px 10px; color: #475569; font-weight: 600;">Target Role</th>
              <th style="padding: 8px 10px; color: #475569; font-weight: 600; width: 110px;">Past 24 Hours</th>
              <th style="padding: 8px 10px; color: #475569; font-weight: 600; width: 110px;">Past 7 Days</th>
            </tr>
          </thead>
          <tbody>
            ${hydJobs.map((j) => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 10px; font-weight: 600; color: #1e293b;">${j.role}</td>
                <td style="padding: 10px 10px;">
                  <a href="${j.url24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">View 24h &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${j.url7d}" target="_blank" style="color: #475569; text-decoration: underline;">View 7d &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Section 2: Bengaluru Easy Apply -->
      <div style="margin-bottom: 30px;">
        <div style="border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 14px;">
          <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
            2. LinkedIn Easy Apply Jobs - Bengaluru [Onsite Only]
          </h2>
        </div>
        <p style="font-size: 12px; color: #64748b; margin: 0 0 14px 0;">
          Strictly Onsite Only, Easy Apply, 2 to 3 years below, senior/lead/architect titles excluded.
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 8px 10px; color: #475569; font-weight: 600;">Target Role</th>
              <th style="padding: 8px 10px; color: #475569; font-weight: 600; width: 110px;">Past 24 Hours</th>
              <th style="padding: 8px 10px; color: #475569; font-weight: 600; width: 110px;">Past 7 Days</th>
            </tr>
          </thead>
          <tbody>
            ${blrJobs.map((j) => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 10px; font-weight: 600; color: #1e293b;">${j.role}</td>
                <td style="padding: 10px 10px;">
                  <a href="${j.url24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">View 24h &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${j.url7d}" target="_blank" style="color: #475569; text-decoration: underline;">View 7d &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Section 3: LinkedIn Hiring Posts (Content Feeds) -->
      <div style="margin-bottom: 30px;">
        <div style="border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 14px;">
          <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
            3. LinkedIn Recruiter &amp; HR Hiring Posts [Exact Matched, No Senior Exp]
          </h2>
        </div>
        <p style="font-size: 12px; color: #64748b; margin: 0 0 14px 0;">
          Direct talent acquisition and recruiter posts sorted by most recent. Strict boolean exclusions remove posts asking for 5+, 8+ years or senior/architect candidates.
        </p>

        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px;">
          ${linkedinPosts.map((p, idx) => `
            <div style="padding: 12px 16px; ${idx < linkedinPosts.length - 1 ? 'border-bottom: 1px solid #e2e8f0;' : ''}">
              <div style="font-size: 14px; font-weight: 600; color: #1e293b; margin-bottom: 4px;">
                ${p.title}
              </div>
              <div style="font-size: 11px; color: #64748b; margin-bottom: 8px; font-family: monospace; background-color: #f8fafc; padding: 4px 6px; border-radius: 3px; word-break: break-all;">
                ${p.query}
              </div>
              <div style="font-size: 12px;">
                <a href="${p.url24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600; margin-right: 14px;">
                  Open Past 24h Posts &rarr;
                </a>
                <a href="${p.url7d}" target="_blank" style="color: #64748b; text-decoration: underline;">
                  Open Past 7 Days &rarr;
                </a>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Section 4: Naukri Perfect Search Filters -->
      <div style="margin-bottom: 20px;">
        <div style="border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 14px;">
          <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
            4. Naukri Perfect Search Filters [2 Years Experience, Onsite]
          </h2>
        </div>
        <p style="font-size: 12px; color: #64748b; margin: 0 0 14px 0;">
          Directly filtered for 2 years experience and Work from Office (Onsite). Hyderabad roles listed first.
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 8px 10px; color: #475569; font-weight: 600;">Role Designation</th>
              <th style="padding: 8px 10px; color: #475569; font-weight: 600; width: 90px;">City</th>
              <th style="padding: 8px 10px; color: #475569; font-weight: 600; width: 95px;">Past 24h</th>
              <th style="padding: 8px 10px; color: #475569; font-weight: 600; width: 95px;">Past 7d</th>
            </tr>
          </thead>
          <tbody>
            ${naukriLinks.map((n) => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 9px 10px; font-weight: 600; color: #1e293b;">${n.role}</td>
                <td style="padding: 9px 10px; color: #64748b;">${n.location}</td>
                <td style="padding: 9px 10px;">
                  <a href="${n.url24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Naukri 24h &rarr;</a>
                </td>
                <td style="padding: 9px 10px;">
                  <a href="${n.url7d}" target="_blank" style="color: #475569; text-decoration: underline;">Naukri 7d &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 28px; font-size: 12px; color: #64748b; line-height: 1.5;">
      <div style="margin-bottom: 4px;">
        <strong>Murali Krishna Popuri</strong> | Full-Stack Developer | +91 9347796811 | popurimurali16@gmail.com
      </div>
      <div>
        Portfolio: <a href="https://murali-portfolio-website.vercel.app" target="_blank" style="color: #0284c7;">murali-portfolio-website.vercel.app</a> &bull;
        GitHub: <a href="https://github.com/Muralikrishnapopuri" target="_blank" style="color: #0284c7;">github.com/Muralikrishnapopuri</a> &bull;
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
      </div>
    </div>

  </div>
</body>
</html>
  `;
}

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: TARGET_EMAIL,
  subject: "Curated Job Search Feeds: Full-Stack Developer (2-3 Yrs Max) | Hyderabad & Bengaluru (Onsite Only)",
  text: buildPlainText(),
  html: buildHtml(),
  attachments: fs.existsSync(RESUME_PATH) ? [
    {
      filename: "Murali_Krishna_Popuri_FullStack_Developer.pdf",
      path: RESUME_PATH,
    }
  ] : []
};

async function main() {
  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP connection verified successfully.");

  console.log(`Sending job search filters email to: ${TARGET_EMAIL}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log("SUCCESS! Email sent successfully.");
  console.log("Message ID:", info.messageId);
}

main().catch((err) => {
  console.error("Failed to send email:", err);
  process.exit(1);
});
