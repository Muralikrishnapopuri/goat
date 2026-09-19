#!/usr/bin/env node

/**
 * ============================================================
 *  🚀 Batch Tailored Resume & Portal Guide Generator
 *  Author: Murali Krishna Popuri
 * ============================================================
 *  Features:
 *   • Generates ATS tailored resumes for top Hyderabad/Bengaluru companies
 *   • Saves PDFs to dist_resumes/
 *   • Creates MANUAL_APPLY_PORTAL_GUIDE.md with direct career links & PDF paths
 *   • Strictly adheres to: 2 years experience, locked skills (no Kafka/ELK), LWD Nov 11
 * ============================================================
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const distDir = path.join(__dirname, "dist_resumes");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Master list of top Hyderabad / Bengaluru tech companies with career links
const TOP_PORTAL_COMPANIES = [
  {
    company: "Zenoti",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, PostgreSQL, REST APIs",
    careerUrl: "https://zenoti.com/careers",
    linkedinUrl: "https://linkedin.com/company/zenoti/jobs",
    notes: "Hyderabad product unicorn (Salon & Spa cloud ERP). High demand for React & Node."
  },
  {
    company: "HighRadius",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, MySQL, REST APIs",
    careerUrl: "https://highradius.com/careers",
    linkedinUrl: "https://linkedin.com/company/highradius/jobs",
    notes: "Hyderabad Fintech SaaS unicorn (Autonomous Finance). React + Node/Java stack."
  },
  {
    company: "Darwinbox",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, PHP, MySQL, TypeScript",
    careerUrl: "https://darwinbox.com/careers",
    linkedinUrl: "https://linkedin.com/company/darwinbox/jobs",
    notes: "Hyderabad HR-tech unicorn. Extensive Node.js, React, and PHP/MySQL stacks."
  },
  {
    company: "ServiceNow",
    role: "Software Engineer - Full Stack",
    skills: "JavaScript (ES6+), React.js, Node.js, REST APIs, TypeScript",
    careerUrl: "https://servicenow.com/careers.html",
    linkedinUrl: "https://linkedin.com/company/servicenow/jobs",
    notes: "Massive Hyderabad R&D Center in Knowledge City. Platform web apps."
  },
  {
    company: "Salesforce",
    role: "Full-Stack Developer",
    skills: "React.js, TypeScript, Node.js, REST APIs, WebSockets",
    careerUrl: "https://salesforce.com/company/careers",
    linkedinUrl: "https://linkedin.com/company/salesforce/jobs",
    notes: "Major Hyderabad Centre of Excellence (CoE) in Divyasree Orion."
  },
  {
    company: "Broadridge",
    role: "Full-Stack Developer",
    skills: "React.js, TypeScript, Node.js, SQL, Express.js",
    careerUrl: "https://broadridge.com/careers",
    linkedinUrl: "https://linkedin.com/company/broadridge/jobs",
    notes: "Large Hyderabad tech campus in Hitec City. Fintech infrastructure."
  },
  {
    company: "FactSet",
    role: "Software Engineer",
    skills: "React.js, Node.js, TypeScript, PostgreSQL, REST APIs",
    careerUrl: "https://factset.com/careers",
    linkedinUrl: "https://linkedin.com/company/factset/jobs",
    notes: "Hyderabad campus in Divyasree Orion. Financial analytics web applications."
  },
  {
    company: "ADP",
    role: "Application Developer",
    skills: "React.js, Node.js, JavaScript (ES6+), MySQL, REST APIs",
    careerUrl: "https://adp.com/careers",
    linkedinUrl: "https://linkedin.com/company/adp/jobs",
    notes: "Massive Hyderabad presence in Somajiguda / Hitec City."
  },
  {
    company: "PayPal",
    role: "Software Engineer",
    skills: "React.js, Node.js, TypeScript, PostgreSQL, REST APIs",
    careerUrl: "https://paypal.com/careers",
    linkedinUrl: "https://linkedin.com/company/paypal/jobs",
    notes: "Major India tech centers in Hyderabad & Bangalore."
  },
  {
    company: "Qualcomm",
    role: "Software Engineer (Web/Full Stack)",
    skills: "React.js, TypeScript, Node.js, REST APIs, Electron.js",
    careerUrl: "https://qualcomm.com/company/careers",
    linkedinUrl: "https://linkedin.com/company/qualcomm/jobs",
    notes: "Hyderabad engineering campus (largest outside US). Developer tools & web apps."
  },
  {
    company: "CBRE",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, PostgreSQL, REST APIs",
    careerUrl: "https://careers.cbre.com",
    linkedinUrl: "https://linkedin.com/company/cbre/jobs",
    notes: "Hyderabad Digital & Technology Centre."
  },
  {
    company: "DTCC",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, SQL, REST APIs",
    careerUrl: "https://dtcc.com/careers",
    linkedinUrl: "https://linkedin.com/company/dtcc/jobs",
    notes: "Hyderabad financial market infrastructure center."
  },
  {
    company: "Cyient",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, Express, MongoDB, TypeScript",
    careerUrl: "https://careers.cyient.com/cyient",
    linkedinUrl: "https://linkedin.com/company/cyient/jobs",
    notes: "Headquartered in Hyderabad (Madhapur / Uppal campuses)."
  },
  {
    company: "Virtusa",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, Express, PostgreSQL, TypeScript",
    careerUrl: "https://virtusa.com/careers",
    linkedinUrl: "https://linkedin.com/company/virtusa/jobs",
    notes: "Huge Hyderabad presence in Nanakramguda & Financial District."
  },
  {
    company: "AdOnMo",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, PostgreSQL, WebSockets",
    careerUrl: "https://adonmo.com/careers",
    linkedinUrl: "https://linkedin.com/company/adonmo/jobs",
    notes: "Hyderabad ad-tech startup (backed by Zomato). Screen sync and web dashboards."
  },
  {
    company: "WhistleDrive",
    role: "Full-Stack Developer",
    skills: "Node.js, Express, React.js, MySQL, REST APIs",
    careerUrl: "https://whistledrive.com/careers",
    linkedinUrl: "https://linkedin.com/company/whistledrive/jobs",
    notes: "Hyderabad urban mobility tech company."
  },
  {
    company: "BlueSemi",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, WebSockets, REST APIs",
    careerUrl: "https://bluesemi.io/careers",
    linkedinUrl: "https://linkedin.com/company/eyvabybluesemi/jobs",
    notes: "T-Hub Hyderabad IoT & health-tech hardware/software ecosystem."
  },
  {
    company: "BrowserStack",
    role: "Software Engineer (Full Stack)",
    skills: "React.js, Node.js, TypeScript, PostgreSQL, WebSockets",
    careerUrl: "https://browserstack.com/careers",
    linkedinUrl: "https://linkedin.com/company/browserstack/jobs",
    notes: "Top developer infrastructure company. Heavy browser/web tech."
  },
  {
    company: "Freshworks",
    role: "Frontend / Full Stack Developer",
    skills: "React.js, JavaScript (ES6+), TypeScript, Node.js, REST APIs",
    careerUrl: "https://freshworks.com/careers",
    linkedinUrl: "https://linkedin.com/company/freshworks-inc/jobs",
    notes: "SaaS unicorn with large India product engineering hubs."
  },
  {
    company: "Razorpay",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, MySQL, REST APIs",
    careerUrl: "https://razorpay.com/careers",
    linkedinUrl: "https://linkedin.com/company/razorpay/jobs",
    notes: "Fintech leader. Payments, checkout UX, and merchant APIs."
  },
  {
    company: "Zoho",
    role: "Software Developer",
    skills: "JavaScript (ES6+), React.js, Node.js, MySQL, REST APIs",
    careerUrl: "https://zoho.com/careers",
    linkedinUrl: "https://linkedin.com/company/zoho/jobs",
    notes: "Major Indian product giant with SaaS web ecosystems."
  },
  {
    company: "Zscaler",
    role: "Software Engineer",
    skills: "React.js, Node.js, TypeScript, PostgreSQL, REST APIs",
    careerUrl: "https://zscaler.com/careers",
    linkedinUrl: "https://linkedin.com/company/zscaler/jobs",
    notes: "Leading cloud cybersecurity product company with major India R&D."
  },
  {
    company: "Zeta",
    role: "Frontend / Full-Stack Engineer",
    skills: "React.js, TypeScript, Node.js, PostgreSQL, Redux",
    careerUrl: "https://zeta.com/careers",
    linkedinUrl: "https://linkedin.com/company/zeta/jobs",
    notes: "Banking tech unicorn (Fintech). Modern React and Node stack."
  },
  {
    company: "Acko",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, MongoDB, REST APIs",
    careerUrl: "https://acko.com/careers",
    linkedinUrl: "https://linkedin.com/company/acko-insurance/jobs",
    notes: "Insurtech unicorn. High-converting consumer web platforms."
  },
  {
    company: "Optum",
    role: "Software Engineer",
    skills: "React.js, TypeScript, Node.js, PostgreSQL, REST APIs",
    careerUrl: "https://optum.com/careers",
    linkedinUrl: "https://linkedin.com/company/optum/jobs",
    notes: "UnitedHealth Group's massive technology campus in Hyderabad (Hitec City)."
  },
  {
    company: "Persistent Systems",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, PostgreSQL, REST APIs",
    careerUrl: "https://persistent.com/careers",
    linkedinUrl: "https://linkedin.com/company/persistent-systems/jobs",
    notes: "Hyderabad product engineering center in Financial District."
  },
  {
    company: "Deloitte",
    role: "Full-Stack Developer (Analyst / Consultant)",
    skills: "React.js, Node.js, TypeScript, SQL, REST APIs",
    careerUrl: "https://deloitte.com/global/en/careers.html",
    linkedinUrl: "https://linkedin.com/company/deloitte/jobs",
    notes: "Deloitte USI Headquarters in Hyderabad (Hitec City)."
  },
  {
    company: "Capgemini",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, MySQL, REST APIs",
    careerUrl: "https://careers.capgemini.com",
    linkedinUrl: "https://linkedin.com/company/capgemini/jobs",
    notes: "Large Hyderabad campus in Gachibowli."
  },
  {
    company: "Cognizant",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, MongoDB, REST APIs",
    careerUrl: "https://talent.cognizant.com",
    linkedinUrl: "https://linkedin.com/company/cognizant/jobs",
    notes: "Multiple campuses in Hyderabad (Gachibowli, Raidurg)."
  },
  {
    company: "TCS",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, TypeScript, SQL, REST APIs",
    careerUrl: "https://tcs.com/careers",
    linkedinUrl: "https://linkedin.com/company/tata-consultancy-services/jobs",
    notes: "Major Hyderabad Synergy Park & Adibatla campuses."
  },
  {
    company: "Infosys",
    role: "Full-Stack Specialist Programmer",
    skills: "React.js, Node.js, TypeScript, MySQL, REST APIs",
    careerUrl: "https://infosys.com/careers.html",
    linkedinUrl: "https://linkedin.com/company/infosys/jobs",
    notes: "Hyderabad Pocharam & Gachibowli campuses."
  },
  {
    company: "Wipro",
    role: "Full-Stack Developer",
    skills: "React.js, Node.js, Express, MongoDB, REST APIs",
    careerUrl: "https://careers.wipro.com",
    linkedinUrl: "https://linkedin.com/company/wipro/jobs",
    notes: "Gachibowli Hyderabad campus."
  }
];

console.log(`\n============================================================`);
console.log(`🚀 Generating Tailored Resumes for ${TOP_PORTAL_COMPANIES.length} Top Tech Companies`);
console.log(`============================================================\n`);

const results = [];

for (let i = 0; i < TOP_PORTAL_COMPANIES.length; i++) {
  const item = TOP_PORTAL_COMPANIES[i];
  const safeComp = item.company.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_");
  const expectedPdf = path.join(distDir, `Murali_Krishna_Popuri_${safeComp}.pdf`);

  process.stdout.write(`[${i + 1}/${TOP_PORTAL_COMPANIES.length}] Generating for ${item.company}... `);

  try {
    const cmd = `node "${path.join(__dirname, "generate_tailored_resume.js")}" --company "${item.company}" --role "${item.role}" --skills "${item.skills}"`;
    execSync(cmd, { stdio: "pipe" });

    if (fs.existsSync(expectedPdf)) {
      const stats = fs.statSync(expectedPdf);
      console.log(`✔ (${(stats.size / 1024).toFixed(1)} KB)`);
      results.push({
        ...item,
        pdfPath: expectedPdf,
        pdfFileName: path.basename(expectedPdf),
        sizeKb: (stats.size / 1024).toFixed(1)
      });
    } else {
      console.log(`✖ (file missing)`);
    }
  } catch (err) {
    console.log(`✖ (${err.message})`);
  }
}

console.log(`\n✔ Completed! Generated ${results.length} resumes in dist_resumes/\n`);

// ── Build MANUAL_APPLY_PORTAL_GUIDE.md ──
let mdContent = `# 📋 Manual Job Application Portal & Resume Match Guide
**Candidate Profile:** Murali Krishna Popuri  
**Experience:** Strictly 2 Years  
**Notice Period:** Immediate Joiner (Official LWD: Nov 11, Negotiable for early release)  
**Total Curated Portals:** ${results.length} Top Hyderabad & Tier-1 Tech Companies  
**All Resumes Stored In:** \`dist_resumes/\`  

---

## ⚡ How to Apply in 60 Seconds per Portal
1. **Open Bookmarklet**: Click \`⚡ Auto-Fill Apply\` on your browser bar when the career portal form opens (Workday, Greenhouse, Lever, etc.).
2. **Auto-Fill**: It instantly enters your Name, Email, Phone (+91 9347796811), City, 2 Yrs Exp, LWD Nov 11, Portfolio, GitHub, and LinkedIn.
3. **Attach Matching Resume**: Upload the pre-generated company PDF linked below.
4. **Hit Submit!**

---

## 🏢 Curated Company Directory & Matching Resumes

| # | Company | Target Role | Direct Career Portal | Tailored ATS Resume PDF | Quick Context / Tech Focus |
|---|---|---|---|---|---|
`;

results.forEach((r, idx) => {
  mdContent += `| ${idx + 1} | **${r.company}** | ${r.role} | [🔗 Apply on Career Page](${r.careerUrl}) | [\`${r.pdfFileName}\`](file://${r.pdfPath}) | ${r.notes} |\n`;
});

mdContent += `
---

## 🔍 Specific Hyderabad Role Search Shortcuts (Past 24 Hours)
* [LinkedIn: React.js / Frontend in Hyderabad (Past 24h)](https://www.linkedin.com/search/results/content/?keywords=%22React.js%22%20AND%20%22Hyderabad%22%20AND%20%22hiring%22&sortBy=%22date_posted%22)
* [LinkedIn: Full-Stack Developer in Hyderabad (Past 24h)](https://www.linkedin.com/search/results/content/?keywords=%22Full%20Stack%20Developer%22%20AND%20%22Hyderabad%22%20AND%20%28%22hiring%22%20OR%20%22email%22%29&sortBy=%22date_posted%22)
* [LinkedIn: Node.js Developer in Hyderabad (Past 24h)](https://www.linkedin.com/search/results/content/?keywords=%22Node.js%22%20AND%20%22Hyderabad%22%20AND%20%22hiring%22&sortBy=%22date_posted%22)
`;

const guideFile = path.join(__dirname, "MANUAL_APPLY_PORTAL_GUIDE.md");
fs.writeFileSync(guideFile, mdContent, "utf-8");

console.log(`📄 Application guide generated at: ${guideFile}\n`);
