// ============================================================
// 🚀 TASK 1.1: PROJECT SETUP WITH VITE (Recommended in 2024+)
// ============================================================

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 WHY VITE?
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Lightning-fast dev server (uses native ES modules)
// 2. Hot Module Replacement (HMR) in milliseconds
// 3. Optimized production builds with Rollup
// 4. CRA is deprecated — Vite is the official recommendation

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 STEP 1: CREATE A NEW PROJECT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// With JavaScript:
// $ npm create vite@latest my-react-app -- --template react
//
// With TypeScript:
// $ npm create vite@latest my-react-app -- --template react-ts
//
// Then:
// $ cd my-react-app
// $ npm install
// $ npm run dev    → starts dev server at http://localhost:5173

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 STEP 2: FOLDER STRUCTURE (What each file does)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
my-react-app/
├── public/              ← Static files (favicon, images)
│   └── vite.svg
├── src/                 ← ALL your React code lives here
│   ├── assets/          ← Images, fonts imported in components
│   ├── App.jsx          ← Root component
│   ├── App.css          ← Styles for App component
│   ├── main.jsx         ← 🔥 ENTRY POINT (mounts React to DOM)
│   └── index.css        ← Global styles
├── index.html           ← Single HTML file (SPA)
├── package.json         ← Dependencies & scripts
├── vite.config.js       ← Vite configuration
└── node_modules/        ← Installed packages
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 STEP 3: UNDERSTANDING main.jsx (Entry Point)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
// main.jsx — This is what runs FIRST

import React from 'react'                    // React library
import ReactDOM from 'react-dom/client'       // DOM rendering
import App from './App.jsx'                   // Root component
import './index.css'                          // Global styles

// EXECUTION FLOW:
// 1. Browser loads index.html
// 2. index.html has <div id="root"></div>
// 3. main.jsx finds that div
// 4. Creates a React root and renders <App /> into it
// 5. React takes over the DOM from here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// React.StrictMode:
// - Only runs in development
// - Renders components TWICE to detect side effects
// - Warns about deprecated APIs
// - Does NOT affect production build
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 STEP 4: HOW VITE WORKS INTERNALLY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
DEVELOPMENT MODE (npm run dev):
┌──────────────────────────────────────────┐
│ Browser requests → Vite Dev Server       │
│    ↓                                     │
│ Vite serves files as native ES modules   │
│ (no bundling needed!)                    │
│    ↓                                     │
│ Only transforms files that are requested │
│    ↓                                     │
│ HMR: Only updates changed module         │
│ (not full page reload)                   │
└──────────────────────────────────────────┘

PRODUCTION BUILD (npm run build):
┌──────────────────────────────────────────┐
│ Vite uses Rollup under the hood          │
│    ↓                                     │
│ Tree-shaking (removes unused code)       │
│    ↓                                     │
│ Code splitting (lazy loaded chunks)      │
│    ↓                                     │
│ Minification + optimization              │
│    ↓                                     │
│ Output → dist/ folder (deploy this)      │
└──────────────────────────────────────────┘
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 VITE CONFIG (vite.config.js)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],         // Enables JSX transform + Fast Refresh
  server: {
    port: 3000,               // Custom port
    open: true,               // Auto-open browser
  },
  build: {
    outDir: 'dist',           // Build output folder
    sourcemap: true,          // Enable source maps for debugging
  },
  resolve: {
    alias: {
      '@': '/src',            // Import shortcut: '@/components/...'
    },
  },
})
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎯 INTERVIEW QUESTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
Q1: "Why is Vite faster than Webpack/CRA?"
A: Vite uses native ES modules in dev mode. It doesn't bundle your
   entire app before serving. It only transforms files on-demand.
   Webpack bundles EVERYTHING before the first page load.

Q2: "What is HMR (Hot Module Replacement)?"
A: HMR updates only the changed module in the browser without a 
   full page reload. Your app state is preserved during development.

Q3: "What does React.StrictMode do?"
A: In dev mode only, it:
   - Renders components twice to detect impure renders
   - Re-runs effects twice to detect missing cleanup
   - Warns about deprecated lifecycle methods
   It has ZERO effect in production.

Q4: "What is the entry point of a React application?"
A: main.jsx (or index.js in CRA). It calls ReactDOM.createRoot()
   to mount the root component into the DOM.
*/

console.log("✅ Task 1.1 Complete — You understand Vite project setup!");
