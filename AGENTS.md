# AGENTS.md — Candidate Profile, Email Outreach & Anti-Spam Rules

Single Source of Truth for all Antigravity agent interactions across sessions for **Murali Krishna Popuri**.
Even if previous conversation history is truncated or unavailable, every agent **MUST** adhere strictly to all rules defined below.

---

## 1. Candidate Profile & Strict Constraints
- **Full Name:** Murali Krishna Popuri
- **Phone:** +91 9347796811
- **Email:** popurimurali16@gmail.com
- **Current Location:** Vijayawada, Andhra Pradesh
- **Relocation Availability:** Available to relocate **immediately** to **Hyderabad** or **Bengaluru** (Bangalore) for Onsite or Hybrid roles.
- **Experience Rule:** Strictly **2 years** of professional software engineering experience. Never write "2+ years", "2.5 years", or "fresher".
- **Availability / Notice Period Rule:**
  - Status: **Immediate Joiner**.
  - Official Last Working Day (LWD): **November 11**, negotiable for **immediate early release** upon receiving an offer.
  - Phrasing in emails: *"I am an immediate joiner (official Last Working Day of Nov 11, negotiable for immediate release upon offer)."*

---

## 2. Locked Core Tech Stack & Banned Skills
- **Core Stack:** React.js, Next.js, Node.js, Express.js, JavaScript (ES6+), TypeScript, SQL (MySQL, PostgreSQL), MongoDB, Electron.js, Redux, REST APIs, WebSockets, Git.
- **Banned Skills (Never include or search for):**
  - NO Java (Spring Boot, Core Java)
  - NO .NET (C#, ASP.NET)
  - NO Python (Django, Flask, FastAPI)
  - NO Kafka, NO ELK Stack, NO Grafana.

---

## 3. Critical Email Outreach Rules (User Mandate)

### Rule 1: Never Send Twice to the Same Email
- Before dispatching any email, always check `/home/murali-krishna/cluad/goat/automatic_mailer/sent_history.json`.
- If an email has already been sent to that address (`status === "SENT"`), **SKIP** it immediately.

### Rule 2: Experience > 3 Years or Extra Tools — Still Send with the Bridge Pitch
- If a job description asks for > 3 years of experience or requires extra tools outside the core stack:
  - **STILL SEND THE APPLICATION EMAIL.**
  - Include the exact bridge pitch:
    > *"While my primary core stack is centered on React.js, Node.js, Express, JavaScript, TypeScript, and modern APIs, I have a fast learning curve and when collaborating with engineering teams I pick up new tools, libraries, and frameworks within a week. I am confident I will match your team's technical expectations and look forward to proving my capabilities in the technical interview."*

### Rule 3: Tailor Content to the Specific Job Description
- Customize each email's text to mirror the specific role, technologies, and company requirements mentioned in the job post.

### Rule 4: Mandatory RestoSoft / YoungMinds Context (Exactly 2 Lines)
Every email must include:
> *"I am currently working as a Full-Stack Developer at YoungMinds Technology Solutions, where I build RestoSoft—an offline-first POS desktop system (Electron) with local LAN real-time synchronization and role-based web platforms."*

### Rule 5: Exactly 4 Permitted Work Links (No Others Allowed)
Only these 4 links may appear in the email:
1. Portfolio: `https://murali-portfolio-website.vercel.app`
2. LinkedIn: `https://linkedin.com/in/murali-krishna-popuri`
3. GitHub: `https://github.com/Muralikrishnapopuri`
4. Zestchat: `https://zestchat.vercel.app`
*(Do NOT include Pixel Polish or other side projects).*

### Rule 6: Always Attach the Resume PDF
- File Path: `/home/murali-krishna/cluad/goat/automatic_mailer/Murali_Krishna_Popuri_FullStack_Developer.pdf`
- Ensure the attachment is verified and included in every email.

### Rule 7: Zero Emojis & Polite Professional Tone
- **STRICTLY ZERO EMOJIS** anywhere in the email subject or body.
- Include a polite thank you note and complete contact signature.

---

## 4. Anti-Spam & Deliverability Protocol (Mandatory for safe_mailer.js)

To prevent emails from landing in Spam / Junk folders:
1. **Never Blast at Once:** Never send bulk emails with rapid 2–5 second intervals.
2. **Human Randomized Delay:** Wait **45 to 90 seconds (random jitter)** between each email dispatch.
3. **Micro-Batching:** Send in batches of maximum **10 emails** per session.
4. **Daily Safe Cap:** Maximum **35 to 45 cold emails per day** from `popurimurali16@gmail.com`.
5. **Subject Line Rotation:** Rotate between natural variations to prevent email hash clustering.
6. **Standard Email Headers:**
   - `replyTo: popurimurali16@gmail.com`
   - `X-Mailer: Apple Mail (2.3654.120.0.1)`
   - `Importance: Normal`
   - `X-Priority: 3`
7. **Polite Opt-Out Footnote:** Always append:
   > *"P.S. If you are not currently hiring for this role or are not the right person to reach out to, please feel free to disregard this note."*
   *(Prevents recipients from clicking Google's "Report as Spam" button).*

---

## 5. Execution Engine
- Always use `/home/murali-krishna/cluad/goat/automatic_mailer/safe_mailer.js` for dispatches.
- Proactively run terminal commands to execute code for the user—do not ask for permission for routine execution.
