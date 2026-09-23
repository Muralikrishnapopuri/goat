const { sendSingleEmail, isAlreadySent } = require("./safe_mailer");
const path = require("path");

const recipientEmail = "hello@winsenlabs.com";
const company = "Winsen Labs";
const role = "Full-Stack Developer (React.js / Node.js)";
const subject = "Inquiry: Full-Stack Developer Opportunities – Murali Krishna Popuri";

const plainBody = `Hi Winsen Labs Team,

I hope this email finds you well. I am reaching out to inquire about current or upcoming opportunities for Full-Stack Developer (React.js / Node.js) roles at Winsen Labs.

I have 2 years of professional software engineering experience developing scalable web applications, responsive user interfaces, and robust backend services using React.js, Next.js, Node.js, Express.js, JavaScript, TypeScript, SQL databases, and MongoDB.

While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

Here are links to my work:
- Portfolio: https://murali-portfolio-website.vercel.app
- LinkedIn: https://linkedin.com/in/murali-krishna-popuri
- GitHub: https://github.com/Muralikrishnapopuri
- Zestchat (Sample web app for WebSockets): https://zestchat.vercel.app

Availability & Location:
I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bengaluru for onsite/hybrid work.

I have attached my resume (Murali_Krishna_Popuri_FullStack_Developer.pdf) for your review. If you have any suitable openings or keep a pipeline for talented engineers, I would welcome the opportunity to discuss how I can contribute to Winsen Labs.

Thank you for your time and consideration, and I look forward to hearing from you.

Best regards,

Murali Krishna Popuri
+91 9347796811
popurimurali16@gmail.com`;

const htmlBody = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; line-height: 1.6; font-size: 14px; margin: 0; padding: 0; }
    p { margin: 0 0 14px 0; }
    ul { margin: 0 0 14px 0; padding-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .sign { margin-top: 18px; border-top: 1px solid #e1e4e8; padding-top: 12px; }
  </style>
</head>
<body>
  <p>Hi Winsen Labs Team,</p>
  <p>I hope this email finds you well. I am reaching out to inquire about current or upcoming opportunities for <strong>Full-Stack Developer (React.js / Node.js)</strong> roles at Winsen Labs.</p>
  <p>I have 2 years of professional software engineering experience developing scalable web applications, responsive user interfaces, and robust backend services using React.js, Next.js, Node.js, Express.js, JavaScript, TypeScript, SQL databases, and MongoDB.</p>
  <p>While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview.</p>
  <p>I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.</p>
  <p>Here are links to my work:</p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app">https://murali-portfolio-website.vercel.app</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri">https://linkedin.com/in/murali-krishna-popuri</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri">https://github.com/Muralikrishnapopuri</a></li>
    <li><strong>Zestchat (Sample web app for WebSockets):</strong> <a href="https://zestchat.vercel.app">https://zestchat.vercel.app</a></li>
  </ul>
  <p><strong>Availability & Location:</strong><br>
  I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer). I am currently based in Vijayawada, Andhra Pradesh, and available to relocate immediately to Hyderabad or Bengaluru for onsite/hybrid work.</p>
  <p>I have attached my resume (<strong>Murali_Krishna_Popuri_FullStack_Developer.pdf</strong>) for your review. If you have any suitable openings or keep a pipeline for talented engineers, I would welcome the opportunity to discuss how I can contribute to Winsen Labs.</p>
  <p>Thank you for your time and consideration, and I look forward to hearing from you.</p>
  <div class="sign">
    <strong>Murali Krishna Popuri</strong><br>
    +91 9347796811<br>
    <a href="mailto:popurimurali16@gmail.com">popurimurali16@gmail.com</a>
  </div>
</body>
</html>`;

async function main() {
  console.log(`Checking sent history for: ${recipientEmail}...`);
  if (isAlreadySent(recipientEmail)) {
    console.log(`[SKIP] Already sent to ${recipientEmail} previously.`);
    return;
  }

  console.log(`Sending inquiry email to: ${recipientEmail} (${company})...`);
  try {
    const result = await sendSingleEmail({
      to: recipientEmail,
      subject,
      text: plainBody,
      html: htmlBody,
      company,
      role,
    });
    console.log(`SUCCESS! Sent inquiry to ${recipientEmail}. Status:`, result);
  } catch (err) {
    console.error(`FAILED sending to ${recipientEmail}:`, err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Execution error:", err);
  process.exit(1);
});
