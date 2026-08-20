const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
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

const subject = "Re: Candidate Information Response — Murali Krishna Popuri";

const body = `Hi Team,

Thank you for reaching out. Here are my details as requested:

Candidate Information
1. Full Name: Murali Krishna Popuri
2. Mobile Number: +91 9347796811
3. Email Address: popurimurali16@gmail.com
4. LinkedIn Profile: https://linkedin.com/in/murali-krishna-popuri
5. Current Location: Vijayawada / Hyderabad
6. Preferred Location: Hyderabad / Bengaluru
7. Open to PAN India / Remote?: Yes

Professional Details
8. Current Company: Young Minds Technologies and Solutions
9. Current Designation: Full-Stack Developer
10. Total IT Experience: 2 Years
11. Relevant Experience: 2 Years (React, Node.js, PHP, SQL, TypeScript)
12. Primary Technology / Skill: Full-Stack (React.js, Node.js, TypeScript)
13. Secondary Skills: PHP, PostgreSQL, MySQL, SQLite, MongoDB, Electron.js, Redux, Tailwind, AWS
14. Highest Qualification: B.Tech
15. Graduation Year: 2023

Compensation Details
16. Current CTC: 1.8 LPA (₹15,000 / month)
17. Expected CTC: 3.6 LPA (₹30,000 / month)
18. Notice Period: 1 Month left (Negotiable - bond completed)
19. Earliest Joining Date: Within 2 weeks (Negotiable)

Availability
20. Are you currently serving notice?: Yes (Bond completed)
21. Are you an Immediate Joiner?: Negotiable (Within 2 weeks)
22. Are you currently holding any offer?: No
23. If yes, Offer CTC: N/A
24. Interview Availability: Flexible / Immediate

Recruitment Confirmation
25. Are you actively looking for a job?: Yes
26. Are you comfortable with your profile being shared with relevant hiring companies?: Yes
27. Have you already been submitted/interviewed for the same opportunity through another recruiter?: No

My portfolio link: https://murali-portfolio-website.vercel.app and GitHub: https://github.com/Muralikrishnapopuri.

I have attached my updated resume. Looking forward to hearing from you.

Thanks,
Murali Krishna Popuri
+91 9347796811`;

const htmlBody = `
  <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 650px;">
    <p>Hi Team,</p>
    <p>Thank you for reaching out. Here are my details as requested:</p>

    <p><strong>Candidate Information</strong><br/>
    1. Full Name: Murali Krishna Popuri<br/>
    2. Mobile Number: +91 9347796811<br/>
    3. Email Address: popurimurali16@gmail.com<br/>
    4. LinkedIn Profile: <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank">linkedin.com/in/murali-krishna-popuri</a><br/>
    5. Current Location: Vijayawada / Hyderabad<br/>
    6. Preferred Location: Hyderabad / Bengaluru<br/>
    7. Open to PAN India / Remote?: Yes</p>

    <p><strong>Professional Details</strong><br/>
    8. Current Company: Young Minds Technologies and Solutions<br/>
    9. Current Designation: Full-Stack Developer<br/>
    10. Total IT Experience: 2 Years<br/>
    11. Relevant Experience: 2 Years (React, Node.js, PHP, SQL, TypeScript)<br/>
    12. Primary Technology / Skill: Full-Stack (React.js, Node.js, TypeScript)<br/>
    13. Secondary Skills: PHP, PostgreSQL, MySQL, SQLite, MongoDB, Electron.js, Redux, Tailwind, AWS<br/>
    14. Highest Qualification: B.Tech<br/>
    15. Graduation Year: 2023</p>

    <p><strong>Compensation Details</strong><br/>
    16. Current CTC: 1.8 LPA (₹15,000 / month)<br/>
    17. Expected CTC: 3.6 LPA (₹30,000 / month)<br/>
    18. Notice Period: 1 Month left (Negotiable - bond completed)<br/>
    19. Earliest Joining Date: Within 2 weeks (Negotiable)</p>

    <p><strong>Availability</strong><br/>
    20. Are you currently serving notice?: Yes (Bond completed)<br/>
    21. Are you an Immediate Joiner?: Negotiable (Within 2 weeks)<br/>
    22. Are you currently holding any offer?: No<br/>
    23. If yes, Offer CTC: N/A<br/>
    24. Interview Availability: Flexible / Immediate</p>

    <p><strong>Recruitment Confirmation</strong><br/>
    25. Are you actively looking for a job?: Yes<br/>
    26. Are you comfortable with your profile being shared with relevant hiring companies?: Yes<br/>
    27. Have you already been submitted/interviewed for the same opportunity through another recruiter?: No</p>

    <p>My portfolio link: <a href="https://murali-portfolio-website.vercel.app" target="_blank">murali-portfolio-website.vercel.app</a> and GitHub: <a href="https://github.com/Muralikrishnapopuri" target="_blank">github.com/Muralikrishnapopuri</a>.</p>

    <p>I have attached my updated resume. Looking forward to hearing from you.</p>

    <br/>
    <p>Thanks,<br/>
    <strong>Murali Krishna Popuri</strong><br/>
    +91 9347796811</p>
  </div>
`;

const resumeFile = fs.existsSync(path.join(__dirname, "MURALI-KRISHNA_Aug20.pdf"))
  ? "MURALI-KRISHNA_Aug20.pdf"
  : "MURALI-KRISHNA_Aug17.pdf";

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "dltalenttechnology@gmail.com",
  subject: subject,
  text: body,
  html: htmlBody,
  attachments: [
    {
      filename: resumeFile,
      path: path.join(__dirname, resumeFile),
    }
  ]
};

async function send() {
  console.log("Sending official response email to dltalenttechnology@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
