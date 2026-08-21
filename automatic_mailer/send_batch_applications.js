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

const targetRecruiters = [
  { email: "sakshi@theglobalskills.com", company: "The Global Skills", name: "Sakshi" },
  { email: "sankaranarayanan.rajagopalan@concentrix.com", company: "Concentrix", name: "Sankaranarayanan Rajagopalan" },
  { email: "mokshitha@skillrecruit.com", company: "Skill Recruit", name: "Mokshitha" },
  { email: "saraswathy.p@voltoconsulting.com", company: "Volto Consulting", name: "Saraswathy P" },
  { email: "ittis@sysmind.com", company: "SysMind", name: "Ittis" },
  { email: "altaf@firstcalli.com", company: "First Call Information", name: "Altaf" },
  { email: "Dheeraj.p@systechcorp.in", company: "Systech Corp", name: "Dheeraj P" },
  { email: "savithe@aimolusstaffing.com", company: "Aimolus Staffing", name: "Savithe" },
  { email: "dewansh@adlerqa.in", company: "Adler QA", name: "Dewansh" },
  { email: "suryageetey.epochfolio@gmail.com", company: "Epoch Folio", name: "Suryageetey" },
  { email: "deepika.pilwan@appzime.in", company: "Appzime", name: "Deepika Pilwan" }
];

const resumeFile = fs.existsSync(path.join(__dirname, "MURALI-KRISHNA_.pdf"))
  ? "MURALI-KRISHNA_.pdf"
  : fs.existsSync(path.join(__dirname, "MURALI-KRISHNA_Aug20.pdf"))
  ? "MURALI-KRISHNA_Aug20.pdf"
  : "MURALI-KRISHNA_Aug17.pdf";

async function sendBatch() {
  console.log(`Starting batch dispatch to ${targetRecruiters.length} recruiters using resume ${resumeFile}...`);
  const results = [];

  for (let i = 0; i < targetRecruiters.length; i++) {
    const target = targetRecruiters[i];
    console.log(`[${i + 1}/${targetRecruiters.length}] Preparing email for ${target.name} (${target.email})...`);

    const subject = "Full-Stack Developer Application — Murali Krishna Popuri";

    const body = `Hi ${target.name},

I hope you're having a great day!

I am reaching out with high enthusiasm to apply for Full-Stack Developer opportunities at ${target.company}. With 2 years of hands-on experience engineering scalable web applications and real-time backend systems, I am excited about the prospect of delivering high-impact code for your team!

Here is a quick snapshot of what I bring to the table:
⚡ Tech Stack: React.js, Next.js, Node.js, Express, TypeScript, PHP, PostgreSQL, MySQL, MongoDB & AWS (S3).
⚡ Key Achievement: Engineered an offline-first POS platform (RestoSoft) with zero-latency LAN synchronization and a bi-directional cloud data sync engine.
⚡ Availability: Completed initial company bond; notice period is 30 Days (Negotiable to 1 or 2 weeks).

Check out my work:
🌐 Portfolio: https://murali-portfolio-website.vercel.app
💻 GitHub: https://github.com/Muralikrishnapopuri
🔗 LinkedIn: https://linkedin.com/in/murali-krishna-popuri

My resume is attached for your review. I would love to connect for a quick 10-minute chat to discuss how I can add immediate value to your upcoming projects!

Best regards,

Murali Krishna Popuri
Full-Stack Developer
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 650px;">
        <p>Hi ${target.name},</p>
        <p>I hope you're having a great day!</p>
        <p>I am reaching out with high enthusiasm to apply for <strong>Full-Stack Developer</strong> opportunities at <strong>${target.company}</strong>. With 2 years of hands-on experience engineering scalable web applications and real-time backend systems, I am excited about the prospect of delivering high-impact code for your team!</p>
        
        <p><strong>Here is a quick snapshot of what I bring to the table:</strong></p>
        <ul style="list-style-type: none; padding-left: 0;">
          <li style="margin-bottom: 8px;">⚡ <strong>Tech Stack:</strong> React.js, Next.js, Node.js, Express, TypeScript, PHP, PostgreSQL, MySQL, MongoDB &amp; AWS (S3).</li>
          <li style="margin-bottom: 8px;">⚡ <strong>Key Achievement:</strong> Engineered an offline-first POS platform (RestoSoft) with zero-latency LAN synchronization and a bi-directional cloud data sync engine.</li>
          <li style="margin-bottom: 8px;">⚡ <strong>Availability:</strong> Completed initial company bond; notice period is <strong>30 Days (Negotiable to 1 or 2 weeks)</strong>.</li>
        </ul>

        <p><strong>Check out my work:</strong></p>
        <ul>
          <li>🌐 <strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank">murali-portfolio-website.vercel.app</a></li>
          <li>💻 <strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank">github.com/Muralikrishnapopuri</a></li>
          <li>🔗 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank">linkedin.com/in/murali-krishna-popuri</a></li>
        </ul>

        <p>My resume is attached for your review. I would love to connect for a quick 10-minute chat to discuss how I can add immediate value to your upcoming projects!</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Murali Krishna Popuri</strong><br/>
        Full-Stack Developer<br/>
        Phone: +91 9347796811<br/>
        Email: popurimurali16@gmail.com</p>
      </div>
    `;

    const mailOptions = {
      from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
      to: target.email,
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

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ [${i + 1}/${targetRecruiters.length}] Sent to ${target.email} | MessageID: ${info.messageId}`);
      results.push({ email: target.email, status: "SUCCESS", messageId: info.messageId });
    } catch (err) {
      console.error(`❌ [${i + 1}/${targetRecruiters.length}] Failed sending to ${target.email}:`, err.message);
      results.push({ email: target.email, status: "FAILED", error: err.message });
    }

    await new Promise((res) => setTimeout(res, 1200));
  }

  console.log("\n=================== BATCH DISPATCH SUMMARY ===================");
  console.table(results);
}

sendBatch();
