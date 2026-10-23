/**
 * SEND URGENT LEAD - BURRI RUCHITHA (MAGNEQ SOFTWARE) TO TEST EMAIL
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

async function sendUrgentLead() {
  const whatsappNumber = "8790713728";
  const whatsappLink = `https://wa.me/91${whatsappNumber}`;
  
  const pitch = `Hi Ruchitha,

This is Murali Krishna Popuri connecting from LinkedIn as requested.

I have strictly 2 years of professional software engineering experience specializing in Full-Stack Development (React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript, REST APIs, and SQL/MongoDB).

I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms.

I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate early release upon offer) and available in Hyderabad for onsite/hybrid roles.

Portfolio: https://murali-portfolio-website.vercel.app
LinkedIn: https://linkedin.com/in/murali-krishna-popuri
GitHub: https://github.com/Muralikrishnapopuri
Zestchat: https://zestchat.vercel.app

I have attached my resume PDF for your review. Could you please share the job details and next steps?

Best regards,
Murali Krishna Popuri
+91 9347796811`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>URGENT LEAD: Burri Ruchitha (Magneq Software) - WhatsApp Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; background-color: #f6f8fa; margin: 0; padding: 24px;">
  <div style="max-width: 750px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #d0d7de; padding: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
    
    <div style="background-color: #dafbe1; border: 1px solid #aceebb; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
      <h2 style="margin: 0 0 6px 0; color: #1a7f37; font-size: 20px;">🔥 HOT LEAD: Recruiter Requested Direct WhatsApp!</h2>
      <p style="margin: 0; font-size: 14px; color: #24292f;">
        <strong>Burri Ruchitha</strong> (HR Specialist at Magneq Software) just messaged you on LinkedIn: <em>"8790713728 pin me in whatsapp"</em>.
      </p>
    </div>

    <div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 18px; margin-bottom: 20px; background-color: #ffffff;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 14px;">
        <tr>
          <td style="width: 140px; padding: 6px 0; color: #57606a; font-weight: 600;">Recruiter Name:</td>
          <td style="padding: 6px 0; color: #24292f; font-weight: 700;">Burri Ruchitha (HR Specialist, Magneq Software)</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #57606a; font-weight: 600;">Phone / WhatsApp:</td>
          <td style="padding: 6px 0;">
            <a href="tel:+91${whatsappNumber}" style="color: #0969da; font-weight: bold; font-size: 16px; text-decoration: none;">+91 ${whatsappNumber}</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="${whatsappLink}" target="_blank" style="display: inline-block; background-color: #25d366; color: white; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 13px;">Chat on WhatsApp Now</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #57606a; font-weight: 600;">Location:</td>
          <td style="padding: 6px 0; color: #24292f;">Hyderabad</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #57606a; font-weight: 600;">Notice Status:</td>
          <td style="padding: 6px 0; color: #1a7f37; font-weight: bold;">Immediate Joiner (Nov 11 LWD / Negotiable)</td>
        </tr>
      </table>

      <div style="background-color: #f6f8fa; border-left: 4px solid #1a7f37; padding: 14px; border-radius: 0 4px 4px 0;">
        <div style="font-size: 12px; font-weight: bold; color: #57606a; margin-bottom: 8px;">READY-TO-SEND WHATSAPP MESSAGE (COPY & PASTE):</div>
        <pre style="margin: 0; font-family: SFMono-Regular, Consolas, monospace; font-size: 13px; white-space: pre-wrap; word-break: break-word; color: #24292f; background: #ffffff; padding: 12px; border: 1px solid #d0d7de; border-radius: 4px;">${pitch}</pre>
      </div>
    </div>

  </div>
</body>
</html>`;

  const mailOptions = {
    from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
    to: TARGET_EMAIL,
    subject: "🔥 URGENT LEAD: Burri Ruchitha (Magneq Software) - WhatsApp 8790713728",
    text: `URGENT LEAD: Burri Ruchitha (HR Specialist @ Magneq Software) just messaged you on LinkedIn:
"8790713728 pin me in whatsapp"

WhatsApp Number: +91 8790713728
Direct WhatsApp Link: ${whatsappLink}

Ready-to-copy WhatsApp message:
${pitch}
`,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Urgent Lead sent to test email successfully!");
  console.log("Message ID:", info.messageId);
}

sendUrgentLead().catch(err => {
  console.error("Error sending urgent lead:", err);
  process.exit(1);
});
