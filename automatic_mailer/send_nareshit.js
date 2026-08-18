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

const subject = "Naresh IT Alumni — Seeking Placement Assistance (Completed YoungMinds Bond) | Murali Krishna Popuri";

const body = `Dear Eswar Karthic,

I hope this email finds you well. My name is Murali Krishna Popuri, and I am a proud alumnus of Naresh IT. I completed the UI Full Stack Web Development course last year and was placed at YoungMinds Technology Solutions through your placement program.

First of all, I want to thank you and the Naresh IT team for the excellent training and placement support that helped me launch my career.

I am ACTIVELY LOOKING FOR NEW JOB OPPORTUNITIES. I have been working as a Full-Stack Developer at YoungMinds, gaining 2 years of valuable hands-on experience building offline-first POS systems and ERP web platforms. My initial bond/agreement with YoungMinds is now completed, and I am looking for a job shift (job switch) to find new opportunities. 

I would be extremely grateful if you could guide me or share any active placement drives and job references that match my profile.

My Profile Summary:
• Name: Murali Krishna Popuri
• Status: Actively Looking for Opportunities / Job Switch
• Course Completed: UI Full Stack Web Development (Naresh IT)
• Current Company: YoungMinds Technology Solutions Pvt Ltd (Placed via Naresh IT)
• Total Experience: 2 Years
• Notice Period: 40 Days (Negotiable, contract/bond completed)
• Preferred Locations: Hyderabad, Bengaluru

Technical Skills:
• Frontend: React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express.js, PHP, REST APIs, WebSockets, Electron.js
• Databases: PostgreSQL, MySQL, SQLite, MongoDB, Redis
• Tools: Git, GitHub, AWS, Ubuntu Linux, Apache

I have attached my updated resume (MURALI-KRISHNA_Aug17.pdf) for your reference. You can also view my online profiles below:
• Portfolio: https://murali-portfolio-website.vercel.app
• GitHub: https://github.com/Muralikrishnapopuri
• LinkedIn: https://linkedin.com/in/murali-krishna-popuri

Thank you for your continuous support. I look forward to hearing from you.

Warm regards,
Murali Krishna Popuri
Phone: +91 9347796811
Email: popurimurali16@gmail.com`;

const htmlBody = `
  <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 680px;">
    <p>Dear <strong>Eswar Karthic</strong>,</p>
    
    <p>I hope this email finds you well. My name is <strong>Murali Krishna Popuri</strong>, and I am a proud alumnus of <strong>Naresh IT</strong>. I completed the UI Full Stack Web Development course last year and was placed at <strong>YoungMinds Technology Solutions</strong> through your placement program.</p>
    
    <p>First of all, I want to thank you and the Naresh IT team for the excellent training and placement support that helped me launch my career.</p>
    
    <p>I am <span style="background-color: #ffeeba; padding: 2px 5px; font-weight: bold; color: #856404;">ACTIVELY LOOKING FOR NEW JOB OPPORTUNITIES</span>.</p>
    
    <p>I have been working as a Full-Stack Developer at YoungMinds, gaining 2 years of valuable hands-on experience building offline-first POS systems and ERP web platforms. My initial bond/agreement with YoungMinds is now completed, and <strong>I am looking for a job shift (job switch)</strong> to find new opportunities.</p>
    
    <p>I would be extremely grateful if you could guide me or share any active placement drives and job references that match my profile.</p>

    <hr style="border: 1px dashed #ccc; margin: 20px 0;" />

    <p><strong>📋 My Profile Summary:</strong></p>
    <ul>
      <li><strong>Current Status:</strong> <span style="color: #0056b3; font-weight: bold;">Actively Looking for Opportunities (Job Switch)</span></li>
      <li><strong>Name:</strong> Murali Krishna Popuri</li>
      <li><strong>Course Completed:</strong> UI Full Stack Web Development (Naresh IT)</li>
      <li><strong>Current Company:</strong> YoungMinds Technology Solutions Pvt Ltd (Placed via Naresh IT)</li>
      <li><strong>Total Experience:</strong> 2 Years</li>
      <li><strong>Notice Period:</strong> 40 Days (Negotiable, contract/bond completed)</li>
      <li><strong>Preferred Locations:</strong> Hyderabad, Bengaluru</li>
    </ul>

    <p><strong>🛠️ Technical Skills:</strong></p>
    <ul>
      <li><strong>Frontend:</strong> React.js, Next.js, Redux, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</li>
      <li><strong>Backend:</strong> Node.js, Express.js, PHP, REST APIs, WebSockets, Electron.js</li>
      <li><strong>Databases:</strong> PostgreSQL, MySQL, SQLite, MongoDB, Redis</li>
      <li><strong>Tools:</strong> Git, GitHub, AWS, Ubuntu Linux, Apache</li>
    </ul>

    <p>I have attached my updated resume (<strong>MURALI-KRISHNA_Aug17.pdf</strong>) for your reference. You can also view my online profiles below:</p>
    <ul>
      <li><strong>Portfolio:</strong> <a href="https://murali-portfolio-website.vercel.app" target="_blank">murali-portfolio-website.vercel.app</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/Muralikrishnapopuri" target="_blank">github.com/Muralikrishnapopuri</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/murali-krishna-popuri" target="_blank">linkedin.com/in/murali-krishna-popuri</a></li>
    </ul>

    <p>Thank you for your continuous support. I look forward to hearing from you.</p>
    <br/>
    <p>Warm regards,<br/>
    <strong>Murali Krishna Popuri</strong><br/>
    Phone: +91 9347796811<br/>
    Email: popurimurali16@gmail.com</p>
  </div>
`;

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "eswarkarthicpro@gmail.com",
  subject: subject,
  text: body,
  html: htmlBody,
  attachments: [
    {
      filename: "MURALI-KRISHNA_Aug17.pdf",
      path: path.join(__dirname, "MURALI-KRISHNA_Aug17.pdf"),
    }
  ]
};

async function send() {
  console.log("Sending email to eswarkarthicpro@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
