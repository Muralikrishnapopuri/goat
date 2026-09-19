#!/usr/bin/env python3
import subprocess
import json
import csv
import re
import os

base_dir = os.path.dirname(os.path.abspath(__file__))
full_pdf = os.path.join(base_dir, "800+ IT companies master data for freshers.pdf")

print(f"Extracting layout text from {full_pdf}...")
raw_text = subprocess.check_output(["pdftotext", "-layout", full_pdf, "-"]).decode("utf-8", errors="ignore")

# Split by section
sections = raw_text.split("2. ALL AVAILABLE EMAIL CONTACTS")
sec1 = sections[0]
sec2 = sections[1] if len(sections) > 1 else ""

# ─── PARSE SECTION 1: MASTER DIRECTORY ───────────────────────────
companies = {}
current_sno = None

lines_sec1 = sec1.splitlines()
for line in lines_sec1:
    stripped = line.strip()
    if not stripped or "MASTER COMPANY" in stripped or "S.No." in stripped or "1. MASTER COMPANY DIRECTORY" in stripped:
        continue
    
    # Check if starts with digit index
    m = re.match(r"^\s*(\d{1,4})\s{2,}(.*?)$", line)
    if m:
        sno = int(m.group(1))
        current_sno = sno
        rest = m.group(2).strip()
        parts = [p.strip() for p in re.split(r"\s{2,}", rest) if p.strip()]
        
        comp_name = parts[0] if len(parts) > 0 else ""
        career = parts[1] if len(parts) > 1 else ""
        linkedin = parts[2] if len(parts) > 2 else ""
        email_part = parts[3] if len(parts) > 3 else ""
        
        if linkedin == "—": linkedin = ""
        if email_part == "—": email_part = ""
        
        career_url = ("https://" + career) if career and not career.startswith("http") else career
        
        emails = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", email_part)
        
        companies[sno] = {
            "s_no": sno,
            "company": comp_name,
            "career_url": career_url,
            "linkedin_url": linkedin,
            "emails": [e.lower() for e in emails]
        }
    else:
        # Check continuation line
        if current_sno and current_sno in companies:
            emails = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", stripped)
            for em in emails:
                if em.lower() not in companies[current_sno]["emails"]:
                    companies[current_sno]["emails"].append(em.lower())

# ─── PARSE SECTION 2: ALL EMAIL CONTACTS ─────────────────────────
email_records = []
lines_sec2 = sec2.splitlines()
for line in lines_sec2:
    stripped = line.strip()
    if not stripped or "S.No." in stripped or "Separate outreach" in stripped or "Page " in stripped:
        continue
    
    m = re.match(r"^\s*(\d{1,4})\s{2,}(.*?)$", line)
    if m:
        rest = m.group(2).strip()
        parts = [p.strip() for p in re.split(r"\s{2,}", rest) if p.strip()]
        if len(parts) >= 2:
            comp_name = parts[0]
            email_val = parts[1]
            emails = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", email_val)
            for em in emails:
                email_records.append({
                    "company": comp_name,
                    "email": em.lower()
                })
    else:
        emails = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", stripped)
        if emails and email_records:
            for em in emails:
                if em.lower() != email_records[-1]["email"]:
                    email_records.append({
                        "company": email_records[-1]["company"],
                        "email": em.lower()
                    })

# Merge Section 2 emails into matching companies in Section 1
for rec in email_records:
    comp_norm = rec["company"].lower().strip()
    em = rec["email"]
    matched = False
    for sno, c in companies.items():
        if c["company"].lower().strip() == comp_norm:
            if em not in c["emails"]:
                c["emails"].append(em)
            matched = True
            break
    if not matched:
        # Fuzzy match
        for sno, c in companies.items():
            if comp_norm in c["company"].lower().strip() or c["company"].lower().strip() in comp_norm:
                if em not in c["emails"]:
                    c["emails"].append(em)
                matched = True
                break

# Convert companies dict to sorted list
master_list = list(companies.values())
master_list.sort(key=lambda x: x["s_no"])

# Known prominent Hyderabad tech hubs / offices from the list
hyd_keywords = [
    "adonmo", "bluesemi", "blusaphire", "whistledrive", "zenoti", "accenture", 
    "capgemini", "cognizant", "infosys", "wipro", "tcs", "hcl", "tech mahindra",
    "deloitte", "oracle", "microsoft", "amazon", "service now", "servicenow",
    "salesforce", "virtusa", "epm", "cyient", "cigniti", "broadridge", "adp",
    "factset", "dxc", "hexaware", "persistent", "zensar", "birlasoft", "l&t",
    "hitachi", "synopsys", "qualcomm", "micron", "optum", "invesco", "cbre", "dtcc"
]

all_email_leads = []
for c in master_list:
    for em in c["emails"]:
        is_hyd = any(k in c["company"].lower() for k in hyd_keywords)
        all_email_leads.append({
            "company": c["company"],
            "email": em,
            "career_url": c["career_url"],
            "linkedin_url": c["linkedin_url"],
            "is_hyd_hub": is_hyd
        })

print(f"Total Companies in Master Directory: {len(master_list)}")
print(f"Total Verified Email Outreach Leads: {len(all_email_leads)}")
print(f"Unique Email Addresses: {len(set(l['email'] for l in all_email_leads))}")

# Save JSON directory
with open(os.path.join(base_dir, "companies_master.json"), "w", encoding="utf-8") as f:
    json.dump(master_list, f, indent=2)

# Save Email Leads to CSV
with open(os.path.join(base_dir, "companies_email_leads.csv"), "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["company", "email", "career_url", "linkedin_url", "is_hyd_hub"])
    writer.writeheader()
    for l in all_email_leads:
        writer.writerow(l)

# Save Hyd Hubs to dedicated CSV
hyd_leads = [l for l in all_email_leads if l["is_hyd_hub"]]
with open(os.path.join(base_dir, "companies_hyderabad_email_leads.csv"), "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["company", "email", "career_url", "linkedin_url"])
    writer.writeheader()
    for l in hyd_leads:
        writer.writerow({
            "company": l["company"],
            "email": l["email"],
            "career_url": l["career_url"],
            "linkedin_url": l["linkedin_url"]
        })

print("Export completed successfully!")
