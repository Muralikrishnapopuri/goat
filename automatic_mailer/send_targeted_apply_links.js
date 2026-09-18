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

function createLinkedInJobUrl(keywords, location, past24h = true) {
  const timeFilter = past24h ? "r86400" : "r604800";
  const params = new URLSearchParams({
    f_AL: "true",       // Easy Apply
    f_WT: "1",          // Onsite Only (No Remote)
    f_E: "2,3",         // Entry level (2) & Associate (3) -> Strictly <= 2-3 yrs
    f_TPR: timeFilter,  // Past 24h or Past Week
    keywords: `${keywords} -senior -lead -architect -principal -manager -intern`,
    location: location,
    sortBy: "DD",       // Most recent first
  });
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

const roles = [
  {
    roleName: "Full Stack Developer",
    keySkills: "React.js, Node.js, Express, TypeScript, SQL, MongoDB",
    hydLinkedIn24h: createLinkedInJobUrl("Full Stack Developer", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("Full Stack Developer", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("Full Stack Developer", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("Full Stack Developer", "Bengaluru, Karnataka, India", false),
    hydNaukri24h: "https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/full-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/full-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    roleName: "React.js Developer",
    keySkills: "React.js, Next.js, Redux, JavaScript (ES6+), TypeScript, Tailwind",
    hydLinkedIn24h: createLinkedInJobUrl("React.js Developer", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("React.js Developer", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("React.js Developer", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("React.js Developer", "Bengaluru, Karnataka, India", false),
    hydNaukri24h: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    roleName: "Node.js Developer",
    keySkills: "Node.js, Express.js, REST APIs, Microservices, SQL, MongoDB",
    hydLinkedIn24h: createLinkedInJobUrl("Node.js Developer", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("Node.js Developer", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("Node.js Developer", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("Node.js Developer", "Bengaluru, Karnataka, India", false),
    hydNaukri24h: "https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    roleName: "MERN Stack Developer",
    keySkills: "MongoDB, Express.js, React.js, Node.js, REST APIs",
    hydLinkedIn24h: createLinkedInJobUrl("MERN Stack Developer", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("MERN Stack Developer", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("MERN Stack Developer", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("MERN Stack Developer", "Bengaluru, Karnataka, India", false),
    hydNaukri24h: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    roleName: "JavaScript Developer",
    keySkills: "JavaScript (ES6+), TypeScript, Web Development, Frontend / Backend, HTML5, CSS3",
    hydLinkedIn24h: createLinkedInJobUrl("JavaScript Developer", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("JavaScript Developer", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("JavaScript Developer", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("JavaScript Developer", "Bengaluru, Karnataka, India", false),
    hydNaukri24h: "https://www.naukri.com/javascript-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/javascript-developer-jobs-in-hyderabad-secunderabad?experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/javascript-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/javascript-developer-jobs-in-bengaluru-bangalore?experience=2&jobAge=7&wfhType=0",
  },
  {
    roleName: "Software Engineer",
    keySkills: "Software Engineering, Full Stack Web, React, Node, REST APIs, Git",
    hydLinkedIn24h: createLinkedInJobUrl("Software Engineer (React OR Node)", "Hyderabad, Telangana, India", true),
    hydLinkedIn7d: createLinkedInJobUrl("Software Engineer (React OR Node)", "Hyderabad, Telangana, India", false),
    blrLinkedIn24h: createLinkedInJobUrl("Software Engineer (React OR Node)", "Bengaluru, Karnataka, India", true),
    blrLinkedIn7d: createLinkedInJobUrl("Software Engineer (React OR Node)", "Bengaluru, Karnataka, India", false),
    hydNaukri24h: "https://www.naukri.com/software-engineer-jobs-in-hyderabad-secunderabad?k=software%20engineer%20react%20node&experience=2&jobAge=1&wfhType=0",
    hydNaukri7d: "https://www.naukri.com/software-engineer-jobs-in-hyderabad-secunderabad?k=software%20engineer%20react%20node&experience=2&jobAge=7&wfhType=0",
    blrNaukri24h: "https://www.naukri.com/software-engineer-jobs-in-bengaluru-bangalore?k=software%20engineer%20react%20node&experience=2&jobAge=1&wfhType=0",
    blrNaukri7d: "https://www.naukri.com/software-engineer-jobs-in-bengaluru-bangalore?k=software%20engineer%20react%20node&experience=2&jobAge=7&wfhType=0",
  },
];

function buildPlainText() {
  return `Murali Krishna Popuri | Direct Role Apply Links (LinkedIn Easy Apply & Naukri)
Roles Covered: Full Stack Developer, React.js, Node.js, MERN Stack, JavaScript, Software Engineer
Experience Filter: Strictly 2-3 Years Below (Entry & Associate Levels)
Work Mode: Onsite Only (No Remote Jobs)
Location Preference: Hyderabad (Primary) & Bengaluru (Secondary)
Resume Attached: Murali_Krishna_Popuri_FullStack_Developer.pdf

================================================================================
1. HYDERABAD - LINKEDIN EASY APPLY (ONSITE ONLY, <= 2-3 YRS) [PREFERRED LOCATION]
================================================================================

${roles.map((r, i) => `
${i + 1}. ${r.roleName}
   Skills: ${r.keySkills}
   - Past 24 Hours: ${r.hydLinkedIn24h}
   - Past 7 Days:   ${r.hydLinkedIn7d}
`).join("\n")}

================================================================================
2. HYDERABAD - NAUKRI DIRECT APPLY (2 YEARS EXP, ONSITE) [PREFERRED LOCATION]
================================================================================

${roles.map((r, i) => `
${i + 1}. ${r.roleName}
   - Past 24 Hours: ${r.hydNaukri24h}
   - Past 7 Days:   ${r.hydNaukri7d}
`).join("\n")}

================================================================================
3. BENGALURU - LINKEDIN EASY APPLY (ONSITE ONLY, <= 2-3 YRS)
================================================================================

${roles.map((r, i) => `
${i + 1}. ${r.roleName}
   - Past 24 Hours: ${r.blrLinkedIn24h}
   - Past 7 Days:   ${r.blrLinkedIn7d}
`).join("\n")}

================================================================================
4. BENGALURU - NAUKRI DIRECT APPLY (2 YEARS EXP, ONSITE)
================================================================================

${roles.map((r, i) => `
${i + 1}. ${r.roleName}
   - Past 24 Hours: ${r.blrNaukri24h}
   - Past 7 Days:   ${r.blrNaukri7d}
`).join("\n")}

--------------------------------------------------------------------------------
Candidate Contact:
Murali Krishna Popuri | +91 9347796811 | popurimurali16@gmail.com
Portfolio: https://murali-portfolio-website.vercel.app
GitHub: https://github.com/Muralikrishnapopuri
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
`;
}

function buildHtml() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Targeted Role Apply Links - LinkedIn & Naukri</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #0f172a;">
  <div style="max-width: 860px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Top Header -->
    <div style="background-color: #0f172a; padding: 24px 30px; border-bottom: 3px solid #0284c7;">
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
        Role-Specific Job Apply Links: LinkedIn &amp; Naukri
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 13px; color: #94a3b8;">
        Full Stack &bull; React &bull; Node &bull; MERN &bull; JavaScript &bull; Software Engineer | Hyderabad &amp; Bengaluru (Onsite Only)
      </p>
    </div>

    <!-- Candidate Parameters Badge -->
    <div style="background-color: #f8fafc; padding: 16px 30px; border-bottom: 1px solid #e2e8f0; font-size: 13px; line-height: 1.6; color: #334155;">
      <div><strong>Target Candidate:</strong> Murali Krishna Popuri (2+ Years Professional Full-Stack Experience)</div>
      <div><strong>Strict Filters:</strong> Onsite Only (No Remote) &bull; Easy Apply &bull; Strictly 2-3 Years Below &bull; Zero Senior/Lead</div>
      <div><strong>Resume Attached:</strong> Murali_Krishna_Popuri_FullStack_Developer.pdf</div>
    </div>

    <div style="padding: 24px 30px;">

      <!-- SECTION 1: HYDERABAD LINKEDIN (PRIMARY) -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 14px 0;">
          1. Hyderabad: LinkedIn Easy Apply Links (Onsite Only, &le; 2-3 Yrs) [Preferred]
        </h2>
        <p style="font-size: 12px; color: #64748b; margin: 0 0 12px 0;">
          Directly opens Easy Apply listings in Hyderabad with senior/lead/architect titles excluded.
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Role / Track</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Key Skills</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 105px;">Past 24h</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 105px;">Past 7d</th>
            </tr>
          </thead>
          <tbody>
            ${roles.map((r) => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 10px; font-weight: 600; color: #1e293b;">${r.roleName}</td>
                <td style="padding: 10px 10px; color: #64748b; font-size: 12px;">${r.keySkills}</td>
                <td style="padding: 10px 10px;">
                  <a href="${r.hydLinkedIn24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">LinkedIn 24h &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${r.hydLinkedIn7d}" target="_blank" style="color: #475569; text-decoration: underline;">LinkedIn 7d &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- SECTION 2: HYDERABAD NAUKRI (PRIMARY) -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 14px 0;">
          2. Hyderabad: Naukri Direct Search Links (2 Years Exp, Work From Office) [Preferred]
        </h2>
        <p style="font-size: 12px; color: #64748b; margin: 0 0 12px 0;">
          Pre-filtered on Naukri for 2 years experience and Work from Office (Onsite).
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Role Designation</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 100px;">Location</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 105px;">Past 24h</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 105px;">Past 7d</th>
            </tr>
          </thead>
          <tbody>
            ${roles.map((r) => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 10px; font-weight: 600; color: #1e293b;">${r.roleName}</td>
                <td style="padding: 10px 10px; color: #64748b;">Hyderabad</td>
                <td style="padding: 10px 10px;">
                  <a href="${r.hydNaukri24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Naukri 24h &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${r.hydNaukri7d}" target="_blank" style="color: #475569; text-decoration: underline;">Naukri 7d &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- SECTION 3: BENGALURU LINKEDIN -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 14px 0;">
          3. Bengaluru: LinkedIn Easy Apply Links (Onsite Only, &le; 2-3 Yrs)
        </h2>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Role / Track</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 105px;">Past 24h</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 105px;">Past 7d</th>
            </tr>
          </thead>
          <tbody>
            ${roles.map((r) => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 10px; font-weight: 600; color: #1e293b;">${r.roleName}</td>
                <td style="padding: 10px 10px;">
                  <a href="${r.blrLinkedIn24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">LinkedIn 24h &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${r.blrLinkedIn7d}" target="_blank" style="color: #475569; text-decoration: underline;">LinkedIn 7d &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- SECTION 4: BENGALURU NAUKRI -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 0 0 14px 0;">
          4. Bengaluru: Naukri Direct Search Links (2 Years Exp, Work From Office)
        </h2>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
              <th style="padding: 9px 10px; color: #475569; font-weight: 600;">Role Designation</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 100px;">Location</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 105px;">Past 24h</th>
              <th style="padding: 9px 10px; color: #475569; font-weight: 600; width: 105px;">Past 7d</th>
            </tr>
          </thead>
          <tbody>
            ${roles.map((r) => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 10px; font-weight: 600; color: #1e293b;">${r.roleName}</td>
                <td style="padding: 10px 10px; color: #64748b;">Bengaluru</td>
                <td style="padding: 10px 10px;">
                  <a href="${r.blrNaukri24h}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Naukri 24h &rarr;</a>
                </td>
                <td style="padding: 10px 10px;">
                  <a href="${r.blrNaukri7d}" target="_blank" style="color: #475569; text-decoration: underline;">Naukri 7d &rarr;</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 30px; font-size: 12px; color: #64748b; line-height: 1.5;">
      <div><strong>Murali Krishna Popuri</strong> | Full-Stack Developer | +91 9347796811 | popurimurali16@gmail.com</div>
      <div style="margin-top: 4px;">
        Portfolio: <a href="https://murali-portfolio-website.vercel.app" style="color: #0284c7;">murali-portfolio-website.vercel.app</a> &bull;
        GitHub: <a href="https://github.com/Muralikrishnapopuri" style="color: #0284c7;">github.com/Muralikrishnapopuri</a> &bull;
        LinkedIn: <a href="https://linkedin.com/in/murali-krishna-popuri" style="color: #0284c7;">linkedin.com/in/murali-krishna-popuri</a>
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
  subject: "Targeted Role Apply Feeds: MERN, React, Node, JS, Software Engineer & Full Stack (LinkedIn & Naukri)",
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
  console.log("SMTP verified.");

  console.log(`Sending role apply links to: ${TARGET_EMAIL}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log("SUCCESS! Email sent.");
  console.log("Message ID:", info.messageId);
}

main().catch((err) => {
  console.error("Failed to send email:", err);
  process.exit(1);
});
