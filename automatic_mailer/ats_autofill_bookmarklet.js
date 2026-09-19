/**
 * ============================================================
 *  ⚡ 1-CLICK ATS CAREER PORTAL AUTO-FILL BOOKMARKLET
 *  Author: Murali Krishna Popuri
 * ============================================================
 *  Target Platforms:
 *   • Workday
 *   • Greenhouse (boards.greenhouse.io)
 *   • Lever (jobs.lever.co)
 *   • SmartRecruiters
 *   • Ashby (jobs.ashbyhq.com)
 *   • BambooHR
 *   • Custom Company Career Portal Forms
 * ============================================================
 */

// ── 1. Candidate Truth-Base Profile ──
const CANDIDATE = {
  fullName: "Murali Krishna Popuri",
  firstName: "Murali Krishna",
  lastName: "Popuri",
  email: "popurimurali16@gmail.com",
  phone: "9347796811",
  fullPhone: "+91 9347796811",
  city: "Vijayawada",
  preferredLocation: "Hyderabad / Bengaluru",
  experienceYears: "2",
  currentRole: "Full-Stack Developer",
  currentCompany: "YoungMinds Technology Solutions",
  noticePeriod: "Immediate (Official LWD: Nov 11, Negotiable)",
  portfolio: "https://murali-portfolio-website.vercel.app",
  github: "https://github.com/Muralikrishnapopuri",
  linkedin: "https://linkedin.com/in/murali-krishna-popuri",
  summary:
    "Full-Stack Developer with 2 years of experience specializing in React.js, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, and Electron. Serving notice period with official LWD on Nov 11 (negotiable for early release).",
};

// ── 2. Field Matcher & Injector ──
function autoFillCareerForm() {
  let filledCount = 0;

  function setVal(input, val) {
    if (!input || input.disabled || input.readOnly) return false;
    // Don't overwrite if already filled with correct val
    if (input.value && input.value.trim() === val.trim()) return false;

    input.focus();
    input.value = val;
    // Dispatch React / Angular / Vue synthetic events
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new Event("blur", { bubbles: true }));
    filledCount++;
    return true;
  }

  // Iterate over all text-like inputs and textareas
  const inputs = Array.from(document.querySelectorAll("input, textarea, select"));

  inputs.forEach((el) => {
    const name = (el.name || "").toLowerCase();
    const id = (el.id || "").toLowerCase();
    const placeholder = (el.placeholder || "").toLowerCase();
    const aria = (el.getAttribute("aria-label") || "").toLowerCase();
    const label = el.labels && el.labels[0] ? el.labels[0].innerText.toLowerCase() : "";
    const descriptor = `${name} ${id} ${placeholder} ${aria} ${label}`;

    // Full Name
    if (descriptor.includes("full name") || descriptor.includes("candidate_name") || descriptor.includes("your name")) {
      setVal(el, CANDIDATE.fullName);
    }
    // First Name
    else if (descriptor.includes("first name") || descriptor.includes("firstname") || descriptor.includes("fname")) {
      setVal(el, CANDIDATE.firstName);
    }
    // Last Name
    else if (descriptor.includes("last name") || descriptor.includes("lastname") || descriptor.includes("lname") || descriptor.includes("surname")) {
      setVal(el, CANDIDATE.lastName);
    }
    // Email
    else if (el.type === "email" || descriptor.includes("email") || descriptor.includes("e-mail")) {
      setVal(el, CANDIDATE.email);
    }
    // Phone
    else if (el.type === "tel" || descriptor.includes("phone") || descriptor.includes("mobile") || descriptor.includes("contact number")) {
      setVal(el, descriptor.includes("code") ? "91" : CANDIDATE.fullPhone);
    }
    // LinkedIn
    else if (descriptor.includes("linkedin")) {
      setVal(el, CANDIDATE.linkedin);
    }
    // GitHub
    else if (descriptor.includes("github") || descriptor.includes("git repository")) {
      setVal(el, CANDIDATE.github);
    }
    // Portfolio / Website
    else if (descriptor.includes("portfolio") || descriptor.includes("website") || descriptor.includes("personal url")) {
      setVal(el, CANDIDATE.portfolio);
    }
    // City / Location
    else if (descriptor.includes("city") || descriptor.includes("current location")) {
      setVal(el, CANDIDATE.city);
    }
    // Preferred Location
    else if (descriptor.includes("preferred location") || descriptor.includes("relocate")) {
      setVal(el, CANDIDATE.preferredLocation);
    }
    // Current Company
    else if (descriptor.includes("current company") || descriptor.includes("employer")) {
      setVal(el, CANDIDATE.currentCompany);
    }
    // Current Title
    else if (descriptor.includes("current title") || descriptor.includes("current role") || descriptor.includes("designation")) {
      setVal(el, CANDIDATE.currentRole);
    }
    // Experience Years
    else if (descriptor.includes("years of experience") || descriptor.includes("total experience") || descriptor.includes("experience (years)")) {
      setVal(el, CANDIDATE.experienceYears);
    }
    // Notice Period
    else if (descriptor.includes("notice period") || descriptor.includes("joining date") || descriptor.includes("availability") || descriptor.includes("how soon")) {
      setVal(el, CANDIDATE.noticePeriod);
    }
    // Cover Letter / Summary / Comments
    else if (el.tagName.toLowerCase() === "textarea" && (descriptor.includes("cover letter") || descriptor.includes("summary") || descriptor.includes("additional information") || descriptor.includes("about you"))) {
      setVal(el, CANDIDATE.summary);
    }
  });

  // Notification Toast
  const banner = document.createElement("div");
  banner.innerText = `✔ Auto-filled ${filledCount} field(s) for Murali Krishna Popuri!`;
  banner.style.cssText =
    "position:fixed;top:15px;right:15px;background:#1a365d;color:#fff;padding:12px 18px;border-radius:8px;font-family:sans-serif;font-size:13px;font-weight:600;box-shadow:0 4px 15px rgba(0,0,0,0.25);z-index:999999;";
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 4000);
}

// ── 3. Minified Bookmarklet Code (For Browser Bookmarks Bar) ──
// javascript:(function(){const C={fullName:"Murali Krishna Popuri",firstName:"Murali Krishna",lastName:"Popuri",email:"popurimurali16@gmail.com",phone:"+91 9347796811",city:"Vijayawada",preferredLocation:"Hyderabad / Bengaluru",experienceYears:"2",currentRole:"Full-Stack Developer",currentCompany:"YoungMinds Technology Solutions",noticePeriod:"Immediate (Official LWD: Nov 11, Negotiable)",portfolio:"https://murali-portfolio-website.vercel.app",github:"https://github.com/Muralikrishnapopuri",linkedin:"https://linkedin.com/in/murali-krishna-popuri",summary:"Full-Stack Developer with 2 years of experience specializing in React.js, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, and Electron. Serving notice period with official LWD on Nov 11 (negotiable for early release)."};let count=0;function setV(el,v){if(!el||el.disabled||el.readOnly)return;if(el.value&&el.value.trim()===v.trim())return;el.focus();el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));el.dispatchEvent(new Event('blur',{bubbles:true}));count++;}document.querySelectorAll("input, textarea, select").forEach(el=>{const d=`${el.name||""} ${el.id||""} ${el.placeholder||""} ${el.getAttribute("aria-label")||""} ${el.labels&&el.labels[0]?el.labels[0].innerText:""}`.toLowerCase();if(d.includes("full name")||d.includes("candidate_name")||d.includes("your name"))setV(el,C.fullName);else if(d.includes("first name")||d.includes("firstname"))setV(el,C.firstName);else if(d.includes("last name")||d.includes("lastname"))setV(el,C.lastName);else if(el.type==="email"||d.includes("email"))setV(el,C.email);else if(el.type==="tel"||d.includes("phone")||d.includes("mobile"))setV(el,C.phone);else if(d.includes("linkedin"))setV(el,C.linkedin);else if(d.includes("github"))setV(el,C.github);else if(d.includes("portfolio")||d.includes("website"))setV(el,C.portfolio);else if(d.includes("city"))setV(el,C.city);else if(d.includes("preferred location"))setV(el,C.preferredLocation);else if(d.includes("current company"))setV(el,C.currentCompany);else if(d.includes("current role")||d.includes("current title"))setV(el,C.currentRole);else if(d.includes("years of experience")||d.includes("total experience"))setV(el,C.experienceYears);else if(d.includes("notice period")||d.includes("availability")||d.includes("how soon"))setV(el,C.noticePeriod);else if(el.tagName.toLowerCase()==="textarea"&&(d.includes("cover letter")||d.includes("summary")))setV(el,C.summary);});const b=document.createElement("div");b.innerText=`✔ Auto-filled ${count} fields for Murali Krishna Popuri!`;b.style.cssText="position:fixed;top:15px;right:15px;background:#1a365d;color:#fff;padding:12px 18px;border-radius:8px;font-family:sans-serif;font-size:13px;font-weight:600;box-shadow:0 4px 15px rgba(0,0,0,0.25);z-index:999999;";document.body.appendChild(b);setTimeout(()=>b.remove(),4000);})();
