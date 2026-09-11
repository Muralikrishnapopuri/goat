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

const textContent = `Murali Krishna Popuri | Targeted Job Search Feeds
Target Profile: Full-Stack Developer (2+ Years Professional Experience)
Stack: React.js, Next.js, Node.js, Express, TypeScript, MERN, SQL, MongoDB, Kafka
Locations: Hyderabad & Bengaluru
Recency: Past 24 Hours
Filter Criteria: Mid-Level / Experienced (Internships & Trainee postings excluded)

--------------------------------------------------------------------------------
1. LINKEDIN TALENT ACQUISITION & HR POSTS (PAST 24 HOURS)
Direct hiring posts from recruiters and hiring managers, sorted by latest:
--------------------------------------------------------------------------------

1. Full Stack / MERN Developer HR Posts (Hyderabad & Bengaluru, Experienced):
https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=hiring%20(%22Full%20Stack%20Developer%22%20OR%20%22MERN%22)%20(Hyderabad%20OR%20Bengaluru)%20(%222%2B%22%20OR%20%222%20years%22%20OR%20%22experienced%22)%20-intern&sortBy=%22date_posted%22

2. React.js / Next.js Developer HR Posts (Hyderabad, 2+ Years):
https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=hiring%20%22React%22%20Hyderabad%20(HR%20OR%20%22Talent%20Acquisition%22)%20-intern&sortBy=%22date_posted%22

3. React.js / Next.js Developer HR Posts (Bengaluru, 2+ Years):
https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=hiring%20%22React%22%20Bengaluru%20(HR%20OR%20%22Talent%20Acquisition%22)%20-intern&sortBy=%22date_posted%22

4. Node.js / Express Backend Developer HR Posts (Hyderabad & Bengaluru):
https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=hiring%20(%22Node.js%22%20OR%20%22Backend%20Developer%22)%20(Hyderabad%20OR%20Bengaluru)%20-intern&sortBy=%22date_posted%22

5. Immediate Joiners / Notice Period Hiring Posts (Hyderabad & Bengaluru, 2+ Yrs):
https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=hiring%20(%22React%22%20OR%20%22Node%22%20OR%20%22Full%20Stack%22)%20%22immediate%20joiner%22%20(Hyderabad%20OR%20Bengaluru)%20-intern&sortBy=%22date_posted%22

6. Recruiter Posts Requesting Direct CV / Email (Hyderabad & Bengaluru):
https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=(%22share%20resume%22%20OR%20%22send%20cv%22%20OR%20%22drop%20cv%22)%20(%22React%22%20OR%20%22Node%22%20OR%20%22Full%20Stack%22)%20(Hyderabad%20OR%20Bengaluru)%20-intern&sortBy=%22date_posted%22

7. Recruiter Posts with Google Form / Candidate Application Sheets:
https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=(%22forms.gle%22%20OR%20%22docs.google.com%2Fforms%22)%20(%22React%22%20OR%20%22Node%22%20OR%20%22Full%20Stack%22)%20(Hyderabad%20OR%20Bengaluru)%20-intern&sortBy=%22date_posted%22


--------------------------------------------------------------------------------
2. LINKEDIN EASY APPLY JOBS (PAST 24 HOURS, 2+ YRS EXPERIENCE)
Filtered for Easy Apply, Mid-Level / Associate, excluding internships:
--------------------------------------------------------------------------------

1. Full Stack Developer - Hyderabad (Past 24h, Easy Apply, Experienced):
https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Full%20Stack%20Developer%20-intern&location=Hyderabad%2C%20Telangana%2C%20India

2. Full Stack Developer - Bengaluru (Past 24h, Easy Apply, Experienced):
https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Full%20Stack%20Developer%20-intern&location=Bengaluru%2C%20Karnataka%2C%20India

3. React.js Developer - Hyderabad (Past 24h, Easy Apply):
https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=React.js%20Developer%20-intern&location=Hyderabad%2C%20Telangana%2C%20India

4. React.js Developer - Bengaluru (Past 24h, Easy Apply):
https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=React.js%20Developer%20-intern&location=Bengaluru%2C%20Karnataka%2C%20India

5. Node.js Developer - Hyderabad (Past 24h, Easy Apply):
https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Node.js%20Developer%20-intern&location=Hyderabad%2C%20Telangana%2C%20India

6. Node.js Developer - Bengaluru (Past 24h, Easy Apply):
https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Node.js%20Developer%20-intern&location=Bengaluru%2C%20Karnataka%2C%20India

7. MERN Stack Developer - Hyderabad (Past 24h, Easy Apply):
https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=MERN%20Stack%20Developer%20-intern&location=Hyderabad%2C%20Telangana%2C%20India

8. MERN Stack Developer - Bengaluru (Past 24h, Easy Apply):
https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=MERN%20Stack%20Developer%20-intern&location=Bengaluru%2C%20Karnataka%2C%20India

9. Frontend Developer (React / Next.js) - Hyderabad & Bengaluru (Past 24h, Easy Apply):
https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Frontend%20Developer%20React%20-intern&location=Bengaluru%2C%20Karnataka%2C%20India

10. Software Engineer (React / TypeScript / Node) - Hyderabad (Past 24h, Easy Apply):
https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Software%20Engineer%20React%20Node%20-intern&location=Hyderabad%2C%20Telangana%2C%20India


--------------------------------------------------------------------------------
3. NAUKRI SEARCH FEEDS (PAST 24 HOURS, 2 YEARS EXPERIENCE)
Directly filtered by jobAge=1 and 2 years experience (Internships excluded):
--------------------------------------------------------------------------------

1. Full Stack Developer (React + Node) - Hyderabad:
https://www.naukri.com/full-stack-developer-react-node-jobs-in-hyderabad-secunderabad?jobAge=1&experience=2

2. Full Stack Developer (React + Node) - Bengaluru:
https://www.naukri.com/full-stack-developer-react-node-jobs-in-bengaluru-bangalore?jobAge=1&experience=2

3. React.js Developer - Hyderabad:
https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?jobAge=1&experience=2

4. React.js Developer - Bengaluru:
https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?jobAge=1&experience=2

5. Node.js Developer - Hyderabad:
https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?jobAge=1&experience=2

6. Node.js Developer - Bengaluru:
https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?jobAge=1&experience=2

7. MERN Stack Developer - Hyderabad:
https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?jobAge=1&experience=2

8. MERN Stack Developer - Bengaluru:
https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?jobAge=1&experience=2
`;

function buildHtml() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Active Job Search Feeds</title>
  </head>
  <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a;">
    <div style="max-width: 760px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
      
      <!-- Top Bar -->
      <div style="background-color: #1e293b; padding: 20px 24px;">
        <h1 style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff; letter-spacing: 0.3px;">
          Job Search Feeds: Full-Stack Developer (2+ Years Experience)
        </h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">
          Hyderabad &amp; Bengaluru | Past 24 Hours Active Hiring | Non-Intern Level
        </p>
      </div>

      <!-- Candidate Profile Context Summary -->
      <div style="background-color: #f1f5f9; padding: 14px 24px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #334155; line-height: 1.5;">
        <strong>Target Stack:</strong> React.js, Next.js, Node.js, Express, TypeScript, MERN, SQL, MongoDB, Kafka<br/>
        <strong>Status:</strong> Immediate Joiner / Serving Notice Period | 2+ Years Professional Experience
      </div>

      <div style="padding: 24px;">

        <!-- Section 1 -->
        <h2 style="font-size: 15px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 14px 0; padding-bottom: 6px; border-bottom: 2px solid #0284c7;">
          1. LinkedIn Recruiter &amp; Talent Acquisition Posts (Past 24 Hours)
        </h2>
        <p style="font-size: 13px; color: #64748b; margin-top: 0; margin-bottom: 14px;">
          Sorted by date posted with direct recruiter outreach keywords (excluding internships):
        </p>

        <div style="margin-bottom: 20px;">
          <p style="margin: 6px 0 2px 0; font-size: 14px; font-weight: 600; color: #1e293b;">
            Full Stack &amp; MERN Developer Posts (Hyderabad &amp; Bengaluru, 2+ Yrs)
          </p>
          <a href="https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=hiring%20(%22Full%20Stack%20Developer%22%20OR%20%22MERN%22)%20(Hyderabad%20OR%20Bengaluru)%20(%222%2B%22%20OR%20%222%20years%22%20OR%20%22experienced%22)%20-intern&sortBy=%22date_posted%22" target="_blank" style="font-size: 12px; color: #0284c7; text-decoration: underline; word-break: break-all;">
            Open LinkedIn Search &rarr;
          </a>
        </div>

        <div style="margin-bottom: 20px;">
          <p style="margin: 6px 0 2px 0; font-size: 14px; font-weight: 600; color: #1e293b;">
            React.js / Next.js Developer HR Posts (Hyderabad, 2+ Years)
          </p>
          <a href="https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=hiring%20%22React%22%20Hyderabad%20(HR%20OR%20%22Talent%20Acquisition%22)%20-intern&sortBy=%22date_posted%22" target="_blank" style="font-size: 12px; color: #0284c7; text-decoration: underline; word-break: break-all;">
            Open LinkedIn Search &rarr;
          </a>
        </div>

        <div style="margin-bottom: 20px;">
          <p style="margin: 6px 0 2px 0; font-size: 14px; font-weight: 600; color: #1e293b;">
            React.js / Next.js Developer HR Posts (Bengaluru, 2+ Years)
          </p>
          <a href="https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=hiring%20%22React%22%20Bengaluru%20(HR%20OR%20%22Talent%20Acquisition%22)%20-intern&sortBy=%22date_posted%22" target="_blank" style="font-size: 12px; color: #0284c7; text-decoration: underline; word-break: break-all;">
            Open LinkedIn Search &rarr;
          </a>
        </div>

        <div style="margin-bottom: 20px;">
          <p style="margin: 6px 0 2px 0; font-size: 14px; font-weight: 600; color: #1e293b;">
            Node.js / Express Backend Developer HR Posts (Hyderabad &amp; Bengaluru)
          </p>
          <a href="https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=hiring%20(%22Node.js%22%20OR%20%22Backend%20Developer%22)%20(Hyderabad%20OR%20Bengaluru)%20-intern&sortBy=%22date_posted%22" target="_blank" style="font-size: 12px; color: #0284c7; text-decoration: underline; word-break: break-all;">
            Open LinkedIn Search &rarr;
          </a>
        </div>

        <div style="margin-bottom: 20px;">
          <p style="margin: 6px 0 2px 0; font-size: 14px; font-weight: 600; color: #1e293b;">
            Immediate Joiners &amp; Notice Period Developer Hiring (Hyderabad &amp; Bengaluru)
          </p>
          <a href="https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=hiring%20(%22React%22%20OR%20%22Node%22%20OR%20%22Full%20Stack%22)%20%22immediate%20joiner%22%20(Hyderabad%20OR%20Bengaluru)%20-intern&sortBy=%22date_posted%22" target="_blank" style="font-size: 12px; color: #0284c7; text-decoration: underline; word-break: break-all;">
            Open LinkedIn Search &rarr;
          </a>
        </div>

        <div style="margin-bottom: 20px;">
          <p style="margin: 6px 0 2px 0; font-size: 14px; font-weight: 600; color: #1e293b;">
            Recruiter Posts Requesting Direct CV / Email (Hyderabad &amp; Bengaluru)
          </p>
          <a href="https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=(%22share%20resume%22%20OR%20%22send%20cv%22%20OR%20%22drop%20cv%22)%20(%22React%22%20OR%20%22Node%22%20OR%20%22Full%20Stack%22)%20(Hyderabad%20OR%20Bengaluru)%20-intern&sortBy=%22date_posted%22" target="_blank" style="font-size: 12px; color: #0284c7; text-decoration: underline; word-break: break-all;">
            Open LinkedIn Search &rarr;
          </a>
        </div>

        <div style="margin-bottom: 26px;">
          <p style="margin: 6px 0 2px 0; font-size: 14px; font-weight: 600; color: #1e293b;">
            Recruiter Posts with Google Forms / Candidate Intake Sheets
          </p>
          <a href="https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=(%22forms.gle%22%20OR%20%22docs.google.com%2Fforms%22)%20(%22React%22%20OR%20%22Node%22%20OR%20%22Full%20Stack%22)%20(Hyderabad%20OR%20Bengaluru)%20-intern&sortBy=%22date_posted%22" target="_blank" style="font-size: 12px; color: #0284c7; text-decoration: underline; word-break: break-all;">
            Open LinkedIn Search &rarr;
          </a>
        </div>

        <!-- Section 2 -->
        <h2 style="font-size: 15px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; margin: 28px 0 14px 0; padding-bottom: 6px; border-bottom: 2px solid #0284c7;">
          2. LinkedIn Easy Apply Job Listings (Past 24 Hours, 2+ Years Exp)
        </h2>
        <p style="font-size: 13px; color: #64748b; margin-top: 0; margin-bottom: 14px;">
          Pre-filtered for Easy Apply, Mid-Level/Associate experience level, non-intern roles:
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
          <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; text-align: left;">
            <th style="padding: 10px 8px; color: #475569;">Target Role</th>
            <th style="padding: 10px 8px; color: #475569;">Location</th>
            <th style="padding: 10px 8px; color: #475569;">Direct Filter Link</th>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">Full Stack Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Hyderabad</td>
            <td style="padding: 10px 8px;"><a href="https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Full%20Stack%20Developer%20-intern&location=Hyderabad%2C%20Telangana%2C%20India" target="_blank" style="color: #0284c7; text-decoration: underline;">View Jobs &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">Full Stack Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Bengaluru</td>
            <td style="padding: 10px 8px;"><a href="https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Full%20Stack%20Developer%20-intern&location=Bengaluru%2C%20Karnataka%2C%20India" target="_blank" style="color: #0284c7; text-decoration: underline;">View Jobs &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">React.js Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Hyderabad</td>
            <td style="padding: 10px 8px;"><a href="https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=React.js%20Developer%20-intern&location=Hyderabad%2C%20Telangana%2C%20India" target="_blank" style="color: #0284c7; text-decoration: underline;">View Jobs &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">React.js Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Bengaluru</td>
            <td style="padding: 10px 8px;"><a href="https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=React.js%20Developer%20-intern&location=Bengaluru%2C%20Karnataka%2C%20India" target="_blank" style="color: #0284c7; text-decoration: underline;">View Jobs &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">Node.js Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Hyderabad</td>
            <td style="padding: 10px 8px;"><a href="https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Node.js%20Developer%20-intern&location=Hyderabad%2C%20Telangana%2C%20India" target="_blank" style="color: #0284c7; text-decoration: underline;">View Jobs &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">Node.js Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Bengaluru</td>
            <td style="padding: 10px 8px;"><a href="https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Node.js%20Developer%20-intern&location=Bengaluru%2C%20Karnataka%2C%20India" target="_blank" style="color: #0284c7; text-decoration: underline;">View Jobs &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">MERN Stack Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Hyderabad</td>
            <td style="padding: 10px 8px;"><a href="https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=MERN%20Stack%20Developer%20-intern&location=Hyderabad%2C%20Telangana%2C%20India" target="_blank" style="color: #0284c7; text-decoration: underline;">View Jobs &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">MERN Stack Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Bengaluru</td>
            <td style="padding: 10px 8px;"><a href="https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=MERN%20Stack%20Developer%20-intern&location=Bengaluru%2C%20Karnataka%2C%20India" target="_blank" style="color: #0284c7; text-decoration: underline;">View Jobs &rarr;</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; font-weight: 600;">Software Engineer (React/Node)</td>
            <td style="padding: 10px 8px; color: #64748b;">Hyderabad</td>
            <td style="padding: 10px 8px;"><a href="https://www.linkedin.com/jobs/search/?f_AL=true&f_E=2%2C3&f_TPR=r86400&keywords=Software%20Engineer%20React%20Node%20-intern&location=Hyderabad%2C%20Telangana%2C%20India" target="_blank" style="color: #0284c7; text-decoration: underline;">View Jobs &rarr;</a></td>
          </tr>
        </table>

        <!-- Section 3 -->
        <h2 style="font-size: 15px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; margin: 28px 0 14px 0; padding-bottom: 6px; border-bottom: 2px solid #0284c7;">
          3. Naukri Search Feeds (Past 24 Hours, 2 Years Experience)
        </h2>
        <p style="font-size: 13px; color: #64748b; margin-top: 0; margin-bottom: 14px;">
          Directly filtered by jobAge=1 and 2 years minimum experience (excludes interns):
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
          <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; text-align: left;">
            <th style="padding: 10px 8px; color: #475569;">Technology</th>
            <th style="padding: 10px 8px; color: #475569;">Location</th>
            <th style="padding: 10px 8px; color: #475569;">Direct Filter Link</th>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">Full Stack (React + Node)</td>
            <td style="padding: 10px 8px; color: #64748b;">Hyderabad</td>
            <td style="padding: 10px 8px;"><a href="https://www.naukri.com/full-stack-developer-react-node-jobs-in-hyderabad-secunderabad?jobAge=1&experience=2" target="_blank" style="color: #0284c7; text-decoration: underline;">Open on Naukri &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">Full Stack (React + Node)</td>
            <td style="padding: 10px 8px; color: #64748b;">Bengaluru</td>
            <td style="padding: 10px 8px;"><a href="https://www.naukri.com/full-stack-developer-react-node-jobs-in-bengaluru-bangalore?jobAge=1&experience=2" target="_blank" style="color: #0284c7; text-decoration: underline;">Open on Naukri &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">React.js Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Hyderabad</td>
            <td style="padding: 10px 8px;"><a href="https://www.naukri.com/react-js-developer-jobs-in-hyderabad-secunderabad?jobAge=1&experience=2" target="_blank" style="color: #0284c7; text-decoration: underline;">Open on Naukri &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">React.js Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Bengaluru</td>
            <td style="padding: 10px 8px;"><a href="https://www.naukri.com/react-js-developer-jobs-in-bengaluru-bangalore?jobAge=1&experience=2" target="_blank" style="color: #0284c7; text-decoration: underline;">Open on Naukri &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">Node.js Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Hyderabad</td>
            <td style="padding: 10px 8px;"><a href="https://www.naukri.com/node-js-developer-jobs-in-hyderabad-secunderabad?jobAge=1&experience=2" target="_blank" style="color: #0284c7; text-decoration: underline;">Open on Naukri &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">Node.js Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Bengaluru</td>
            <td style="padding: 10px 8px;"><a href="https://www.naukri.com/node-js-developer-jobs-in-bengaluru-bangalore?jobAge=1&experience=2" target="_blank" style="color: #0284c7; text-decoration: underline;">Open on Naukri &rarr;</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 600;">MERN Stack Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Hyderabad</td>
            <td style="padding: 10px 8px;"><a href="https://www.naukri.com/mern-stack-developer-jobs-in-hyderabad-secunderabad?jobAge=1&experience=2" target="_blank" style="color: #0284c7; text-decoration: underline;">Open on Naukri &rarr;</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; font-weight: 600;">MERN Stack Developer</td>
            <td style="padding: 10px 8px; color: #64748b;">Bengaluru</td>
            <td style="padding: 10px 8px;"><a href="https://www.naukri.com/mern-stack-developer-jobs-in-bengaluru-bangalore?jobAge=1&experience=2" target="_blank" style="color: #0284c7; text-decoration: underline;">Open on Naukri &rarr;</a></td>
          </tr>
        </table>

      </div>

      <!-- Footer -->
      <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px 24px; font-size: 12px; color: #64748b;">
        Generated for Murali Krishna Popuri | Direct outreach dispatch system
      </div>
    </div>
  </body>
  </html>
  `;
}

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "popurimuralikrishna04@gmail.com",
  subject: "Job Search Feeds: Full-Stack Developer (2+ Yrs) - Hyderabad & Bengaluru (Past 24h)",
  text: textContent,
  html: buildHtml(),
};

async function main() {
  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP connection verified.");

  console.log("Sending updated human-styled search feeds to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("SUCCESS! Email sent successfully. Message ID:", info.messageId);
}

main().catch((err) => {
  console.error("Failed to send email:", err);
  process.exit(1);
});
