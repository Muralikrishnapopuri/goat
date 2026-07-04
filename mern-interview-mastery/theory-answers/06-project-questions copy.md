# Project Questions — Expert Answers

---

## 1. Explain Your Project

**Template answer (adapt to your project):**

> "I worked on a **Restaurant Management System** — a full-stack MERN application that handles dine-in orders, takeaway, home delivery, billing, and kitchen display. The frontend uses React with Context API for state management. Backend is Node.js + Express with JWT authentication. MongoDB handles all data — menus, orders, users, and billing.
>
> Key features I built: **real-time table management** with status tracking, **role-based access** (admin, cashier, waiter, kitchen), **invoice generation** with thermal printer integration, and **report dashboards** with aggregation pipelines.
>
> Architecture: Feature-based folder structure. API follows REST conventions. Authentication uses JWT access + refresh tokens with httpOnly cookies."

**Tips:** Always mention: tech stack, your specific contributions, challenges you solved, architecture decisions.

---

## 2. Folder Structure

```
project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Button, Modal, Table)
│   │   ├── pages/          # Route components (Dashboard, Orders)
│   │   ├── hooks/          # Custom hooks (useAuth, useFetch)
│   │   ├── context/        # Global state (AuthContext, ThemeContext)
│   │   ├── services/       # API layer (axios instances, API functions)
│   │   ├── utils/          # Helpers (formatDate, formatCurrency)
│   │   ├── constants/      # Enums, config values
│   │   ├── routes/         # Route config, ProtectedRoute
│   │   └── assets/         # Images, fonts
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/             # DB connection, env validation
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express route definitions
│   ├── middleware/          # Auth, error handler, validation
│   ├── utils/              # Helpers (generateToken, sendEmail)
│   ├── services/           # Business logic layer
│   └── server.js           # Entry point
└── package.json
```

---

## 3. Authentication Flow

> "We use JWT with access + refresh token pattern. On login, the server validates credentials, generates a 15-minute access token and a 7-day refresh token. The access token is stored in memory/localStorage and sent in the Authorization header. The refresh token is stored in an httpOnly secure cookie.
>
> When the access token expires, an Axios interceptor catches the 401 error, calls the refresh endpoint automatically, gets a new access token, and retries the original request — seamless to the user.
>
> Role-based access: JWT payload contains the user's role. Both frontend (route guards) and backend (authorize middleware) check roles."

---

## 4. API Structure

> "We follow RESTful conventions. Routes are organized by resource:
> - `POST /api/auth/login` — Login
> - `GET /api/orders?page=1&status=active` — Paginated, filtered orders
> - `POST /api/orders` — Create order
> - `PATCH /api/orders/:id` — Update order
>
> Controller-Service-Model pattern: Routes → Controllers (handle HTTP) → Services (business logic) → Models (database).
>
> Error handling: Custom `AppError` class + global error middleware. Async errors caught by `asyncHandler` wrapper."

---

## 5. State Management

> "We use Context API + useReducer for global state (auth, theme, notifications) and component-level useState for local state. For server state, we use custom hooks with caching logic.
>
> Decision criteria: If state is shared across 3+ components → Context. If it's complex with many actions → useReducer. If it's just a single component → useState."

---

## 6. Why Redux?

> "Redux is best when: multiple components need the same data, state is complex with many sub-values, state changes need to be predictable and debuggable (Redux DevTools time-travel), and you need middleware for async operations (Thunk/Saga).
>
> In our project, we used Redux for the cart and order management because multiple components (cart drawer, checkout, order summary, kitchen display) all needed real-time access to order state."

---

## 7. Why Context?

> "Context API is sufficient when: updates are infrequent (theme, auth, locale), the data shape is simple, and you don't need middleware or DevTools. It's built into React — no extra dependency.
>
> We used Context for auth state because it changes rarely (login/logout) and is consumed by route guards and the navbar — simple and lightweight."

---

## 8. Database Design

> "We designed the schema based on access patterns, not normalization:
> - **Users**: Embedded address, referenced orders via virtual populate
> - **Products**: Embedded category info, indexed by name and category
> - **Orders**: Embedded items (snapshot of product at order time), referenced userId. Compound index on `{userId, createdAt}` for user order history.
> - **Transactions**: Referenced orderId and userId. Indexed by date range for reports.
>
> We use aggregation pipelines for dashboards — daily sales, category-wise revenue, peak hours."

---

## 9. Deployment Process

> "Frontend: Built with `npm run build` → deployed to Vercel/Netlify (auto-deploys from GitHub main branch).
> Backend: Dockerized Node.js app → deployed to AWS EC2 / Railway / Render.
> Database: MongoDB Atlas (managed cluster with automatic backups).
>
> CI/CD: GitHub Actions — on push to main → run tests → build → deploy.
> Environment variables managed via platform secrets (never in code).
> Domain + SSL via Cloudflare."

---

## 10. Performance Improvements

> "1. **React:** Implemented code splitting with lazy/Suspense (reduced initial bundle 40%). Used React.memo + useCallback for expensive list components. Added virtualization (react-window) for 10K+ row tables.
> 2. **API:** Added Redis caching for frequently read data (menu items, config). Implemented pagination + cursor-based scrolling instead of loading all records.
> 3. **Database:** Added compound indexes based on query patterns. Used lean() for read-only queries. Moved analytics to aggregation pipelines instead of application-level computation.
> 4. **Network:** Implemented debounced search (300ms). Added AbortController to cancel stale requests."

---

## 11. Biggest Challenge

> "The biggest challenge was implementing real-time order synchronization across kitchen display, waiter app, and cashier terminal. Multiple users could update the same order simultaneously.
>
> Solution: Implemented optimistic locking with a version field in MongoDB. Each update includes the current version — if it doesn't match, the update is rejected and the client refetches. Combined with Socket.IO for real-time push notifications to all connected clients when order status changes."

---

## 12. Production Bug Fixed

> "We had a memory leak in production — the Node.js process kept growing until it crashed every 12-18 hours. Using `process.memoryUsage()` logging and heap snapshots, I traced it to an EventEmitter with listeners being added on each request but never removed.
>
> Fix: Added proper listener cleanup in the response close event. Also added PM2 monitoring with auto-restart and memory limit. After the fix, memory stayed stable at ~150MB."

---

## 13. Team Collaboration

> "Team of 4 developers. We used Agile/Scrum — 2-week sprints with daily standups. Task management in Jira. Each feature had a spec document before coding.
>
> Code reviews: Every PR required at least one approval. We had coding standards documented and ESLint + Prettier enforced.
>
> Knowledge sharing: Weekly tech sessions where someone presented a topic or demoed their feature."

---

## 14. Git Workflow

> "We follow **Git Flow**:
> - `main` — production-ready code
> - `develop` — integration branch
> - `feature/feature-name` — individual features
> - `hotfix/bug-name` — urgent production fixes
>
> Workflow: Create feature branch from develop → code + commit → push → create PR → code review → merge to develop → QA testing → merge to main → deploy.
>
> Commit convention: `feat: add login API`, `fix: resolve token expiry bug`, `refactor: extract auth middleware`."

---

## 15. CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm test

  build-and-deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - name: Deploy to production
        run: # rsync, Docker push, or platform CLI
```

> "Our CI/CD: Push to any branch → lint + test. Merge to main → build + deploy to production. Environment secrets stored in GitHub Secrets. Zero-downtime deployment using PM2 reload."
