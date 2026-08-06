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

const rawTextContent = `FREE & PAID LEARNING / CERTIFICATION RESOURCES

=== FREE LEARNING PLATFORMS ===
1. freeCodeCamp (Full Stack / React / JavaScript)
https://www.freecodecamp.org/

2. Great Learning Academy (Full Stack, React, Node.js, AI)
https://www.mygreatlearning.com/academy

3. Simplilearn SkillUp (Full Stack, MERN, React, AI)
https://www.simplilearn.com/skillup-free-online-courses

4. Infosys Springboard (Full Stack, React, AI)
https://infyspringboard.onwingspan.com/

5. Microsoft Learn (Azure, AI, GitHub, Web Development)
https://learn.microsoft.com/training/

6. Google Cloud Skills Boost (AI, Cloud, Generative AI)
https://www.cloudskillsboost.google/

7. Oracle University (Oracle APEX, Java, OCI)
https://education.oracle.com/

8. SoloLearn (JavaScript, React, Web Development)
https://www.sololearn.com/

9. MindLuster (Web Development, React, AI)
https://www.mindluster.com/

10. Kaggle Learn (Python, ML, AI)
https://www.kaggle.com/learn

11. Hugging Face Courses (LLMs, AI)
https://huggingface.co/learn

12. DeepLearning.AI Short Courses (AI, LLMs, Agents)
https://www.deeplearning.ai/short-courses/

=== PAID / CERTIFICATION PLATFORMS ===
1. IBM Full Stack Software Developer Professional Certificate
https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer

2. Meta Front-End Developer Professional Certificate
https://www.coursera.org/professional-certificates/meta-front-end-developer

3. Meta Back-End Developer Professional Certificate
https://www.coursera.org/professional-certificates/meta-back-end-developer

4. Microsoft Full-Stack Developer Professional Certificate
https://www.coursera.org/professional-certificates/microsoft-full-stack-developer

5. Google AI Essentials
https://www.coursera.org/learn/google-ai-essentials

6. Google Cybersecurity Professional Certificate
https://www.coursera.org/professional-certificates/google-cybersecurity

7. DeepLearning.AI Generative AI Specializations
https://www.coursera.org/partners/deeplearning-ai

8. AWS Certified Developer – Associate
https://aws.amazon.com/certification/certified-developer-associate/

9. Microsoft Azure AI Engineer Associate (AI-102)
https://learn.microsoft.com/certifications/azure-ai-engineer/

10. Microsoft Azure Developer Associate (AZ-204)
https://learn.microsoft.com/certifications/azure-developer/

11. Oracle Java Professional Certification
https://education.oracle.com/

12. Udemy (React, MERN, Full Stack, AI)
https://www.udemy.com/

13. Codecademy Pro (Full Stack, React)
https://www.codecademy.com/

14. LinkedIn Learning
https://www.linkedin.com/learning/

15. edX Professional Certificates
https://www.edx.org/professional-certificate`;

function convertTextToHtml(text) {
  // Replace URLs with clickable anchors
  let html = text.replace(/(https?:\/\/[^\s\)]+)/g, '<a href="$1" target="_blank">$1</a>');
  // Replace newlines with <br/>
  html = html.split('\n').join('<br/>');
  return `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6; max-width: 650px; margin: 0 auto; padding: 10px;">
      ${html}
    </div>
  `;
}

const mailOptions = {
  from: `"Murali Krishna Popuri" <${SENDER_EMAIL}>`,
  to: "popurimuralikrishna04@gmail.com",
  subject: "Free & Paid Learning / Certification Resources",
  text: rawTextContent,
  html: convertTextToHtml(rawTextContent),
};

async function send() {
  console.log("Sending learning resources email to popurimuralikrishna04@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: ", info.messageId);
}

send().catch((err) => {
  console.error("Error sending email:", err);
  process.exit(1);
});
