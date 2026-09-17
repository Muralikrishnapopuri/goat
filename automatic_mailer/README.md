# 📧 Automated Job Outreach Mailer & Tracker

Automated, highly-personalized cold email outreach and application tracker system for Full-Stack / Frontend / Backend developer roles — built with Node.js and Gmail SMTP.

---

## 🚀 Key Features

1. **Automatic PDF Resume Attachment**:
   - Automatically attaches `Murali_Krishna_Popuri_Full_Stack_Dev.pdf` to all outreach emails.
2. **Concise & High-Impact Emails**:
   - Complies with recruiter checklist in `mail_instructions.txt` (5–8 sentences, no messy resume dumps in email text, clear role-matching tech stack, immediate joiner status, and clickable links to Portfolio, GitHub, LinkedIn, and Live Projects).
3. **Sent History & Duplicate Guard (`sent_history.json`)**:
   - Automatically tracks every sent email (timestamp, recipient, role, message ID).
   - Skips already-contacted recruiters on future runs to prevent spamming.
4. **Multi-Source Job Ingestion**:
   - Supports `.xlsx`, `.xls`, `.csv`, `.md` (Markdown lists), `.docx`, and `.json`.
   - Supports quick single-lead CLI input via `--add`.
5. **Anti-Spam Delay & Jitter**:
   - Includes random delays (3–5s) between sends to protect your Gmail reputation.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd automatic_mailer
npm install
```

### 2. Configure Gmail Credentials
Create / edit `.env` in the `automatic_mailer` directory:
```env
SENDER_EMAIL=popurimurali16@gmail.com
GMAIL_APP_PASSWORD=your_16_digit_app_password
```
*(Generate an App Password at [Google App Passwords](https://myaccount.google.com/apppasswords))*

---

## 📋 Commands & Usage

### 1. Preview Drafts (Dry Run — Safe, No Emails Sent)
```bash
npm run dry-run
# or
node send_jobs.js --dry-run
```
*Generates `preview_emails.json` with all generated drafts and checks for duplicates.*

### 2. Send Outreach Emails
```bash
npm run send
# or
node send_jobs.js --send
```
*Sends personalized emails with PDF resume attached and updates `sent_history.json`.*

### 3. View Sent Outreach History
```bash
npm run history
# or
node send_jobs.js --history
```
*Displays total dispatched applications, companies, dates, and statuses.*

### 4. Custom Input Source (e.g. Markdown or CSV)
```bash
node send_jobs.js --input job_opportunities_curated.md --dry-run
node send_jobs.js --input job_applications.xlsx --send
```

### 5. Quickly Add & Send a Single Lead via CLI
```bash
node send_jobs.js --add "Company Name | hr@company.com | Full Stack Developer | Hyderabad" --dry-run
node send_jobs.js --add "Company Name | hr@company.com | Full Stack Developer | Hyderabad" --send
```

### 6. Force Re-send to Already Contacted Emails
```bash
node send_jobs.js --dry-run --force
node send_jobs.js --send --force
```

---

## 📁 Supported Input File Formats

### Excel / CSV (`.xlsx`, `.xls`, `.csv`)
Columns supported (case-insensitive):
- `Company Name` (or `Company`)
- `HR Email` (or `Email`, `Target Email`, `Recruiter Email`)
- `Role` (or `Job Role`, `Position`)
- `Location` (or `City`)
- `Job Link` (optional)

### Markdown (`.md`)
Formatted lists like `job_opportunities_curated.md`:
```markdown
### 1. 🏢 Acme Corp
* **Role:** Full-Stack Developer
* **Location:** Hyderabad
* **Target Email:** `careers@acmecorp.com`
```

---

## 🛡️ Anti-Spam & Delivery Best Practices
- **Max limit:** ~50–100 emails/day recommended for personal Gmail.
- **Delay:** Default 3–5 seconds randomized jitter between dispatches.
- **Attachments:** PDF resume verified automatically before dispatch.
