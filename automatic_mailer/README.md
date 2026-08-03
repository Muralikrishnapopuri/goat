# 📧 Automatic Job Outreach Mailer

Automated, highly-personalized cold email system for job applications — built with Node.js and Gmail SMTP.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd automatic_mailer
npm install
```

### 2. Configure Gmail App Password
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Generate an app password for "Mail"
3. Edit `.env` and replace the placeholder:
```env
SENDER_EMAIL=popurimurali16@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

### 3. Add Your Data
Replace `job_applications.xlsx` with your real data. The Excel file must have these columns:

| Company Name | HR Email             | Job Link                         |
|--------------|----------------------|----------------------------------|
| Google       | hr@google.com        | https://careers.google.com/...   |
| Microsoft    | recruit@microsoft.com| https://careers.microsoft.com/...|

> **Supported formats:** `.xlsx`, `.xls`, `.csv`, `.docx`
>
> For `.docx`, use pipe-separated rows: `Company | email@hr.com | https://link`

### 4. Update Your Resume
Edit `resume.txt` with your actual skills and project experience. The script extracts keywords to personalize each email.

---

## 📋 Usage

### Preview Emails (Dry Run — No Emails Sent)
```bash
node send_jobs.js --dry-run
```
This generates `preview_emails.json` — review all drafts before sending.

### Send Emails
```bash
node send_jobs.js --send
```
Sends personalized emails with a **3-second delay** between each to avoid Gmail rate limits.

### Using npm Scripts
```bash
npm run dry-run   # Same as --dry-run
npm run send      # Same as --send
```

---

## 📁 Project Structure

```
automatic_mailer/
├── send_jobs.js           # Main script (dry-run & send modes)
├── create_sample_data.js  # Helper to generate sample Excel
├── job_applications.xlsx  # Input data (your companies/emails)
├── resume.txt             # Your resume for skill extraction
├── preview_emails.json    # Generated drafts (auto-created)
├── .env                   # Gmail credentials (git-ignored)
├── .gitignore             # Excludes .env & preview file
├── package.json           # Project config
└── README.md              # This file
```

---

## ✉️ Email Personalization

Each email is **individually tailored** per company:
- **Subject:** `Full-Stack Developer (React/Node) — [Company] Application` (< 8 words)
- **Opening:** References the specific company/role
- **Value prop:** Highlights relevant skills from your resume
- **Stack bullet:** React.js, Node.js, Express, MongoDB, SQL, TypeScript
- **Closing:** Low-friction ask for a 5-minute conversation

All emails are under **120 words** and sent in both plain text and HTML format.

---

## ⚠️ Important Notes

- **Never commit `.env`** — it contains your Gmail app password
- **Test with `--dry-run` first** — always review `preview_emails.json` before sending
- **Gmail daily limit:** ~500 emails/day for personal accounts
- **App Password required** — regular Gmail passwords won't work with SMTP
