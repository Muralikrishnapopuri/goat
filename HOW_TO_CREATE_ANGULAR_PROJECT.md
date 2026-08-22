# How to Create and Manage Angular Projects using Terminal (CLI)

---

## 🤔 1. What is `ng`?

**`ng`** is the terminal command name for the **Angular CLI (Command Line Interface)** tool.

- **Why `ng`?** It comes from **A<u>ng</u>ular** (the letters **N** and **G** in A**ng**ular).
- Just like `git` is for Git, `npm` is for Node Package Manager, and `docker` is for Docker, **`ng`** is the command name for all Angular development operations:
  - `ng new`: Create a new application
  - `ng serve`: Run local development server
  - `ng generate` (or `ng g`): Scaffold components, services, route guards
  - `ng build`: Compile for production

---

## 💡 2. Global `ng` Installation vs `npx` Workflow

There are **two ways** to run Angular terminal commands:

### Approach A: Install `ng` Globally (Recommended)
Installing globally makes the `ng` command directly available everywhere in your system terminal:

```bash
# Step 0: Install Angular CLI globally (run once)
npm install -g @angular/cli

# Step 1: Create a new app using direct "ng" command
ng new my-first-app --defaults

# Step 2: Navigate into folder
cd my-first-app

# Step 3: Generate Component and Service
ng g c components/header
ng g s services/auth

# Step 4: Start Development Server
ng serve --port 4200
```

---

### Approach B: Run without Global Installation (Using `npx`)
If `@angular/cli` is not installed globally on your machine, you can use **`npx`** to execute it on-the-fly:

```bash
# Step 1: Scaffold project using npx
npx @angular/cli new my-first-app --defaults

# Step 2: Navigate into folder
cd my-first-app

# Step 3: Generate Component and Service using npx
npx ng g c components/header
npx ng g s services/auth

# Step 4: Start Server using npm script (which calls project's local ng serve)
npm start
```

---

## 🛠️ 3. Useful Terminal Flags (Skip Prompts)

When running `ng new`, you can pass flags to skip interactive questions and automate setup:

```bash
# Create app with CSS, no git prompt, automatic defaults
ng new my-app --style=css --skip-git --defaults
```

### Common Flags:
- `--defaults`: Uses standard default settings (skips interactive prompts).
- `--style=css`: Sets stylesheet format to plain CSS (or `scss`).
- `--routing`: Enables Angular routing out of the box.
- `--skip-install`: Scaffolds files without running `npm install` immediately.

---

## 🏗️ 4. Angular CLI Cheatsheet (Generating Code)

Inside your project folder, use `ng generate` (or shorthand `ng g`) to instantly scaffold components, services, and route guards:

| Goal | Full Command | Shorthand Command |
| :--- | :--- | :--- |
| **Create Component** | `ng generate component components/user-card` | `ng g c components/user-card` |
| **Create Service** | `ng generate service services/user` | `ng g s services/user` |
| **Create Route Guard** | `ng generate guard guards/auth` | `ng g g guards/auth` |
| **Create Directive** | `ng generate directive directives/highlight` | `ng g d directives/highlight` |
| **Create Pipe** | `ng generate pipe pipes/custom-date` | `ng g p pipes/custom-date` |
| **Build for Production** | `ng build` | `ng build` |
