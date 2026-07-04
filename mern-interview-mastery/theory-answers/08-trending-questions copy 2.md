# Trending Questions — Expert Answers

---

## 1. Explain Your Entire Authentication Flow

> "Our auth system uses JWT with access + refresh token pattern:
>
> **Login:** User submits email/password → Server validates with bcrypt → Generates 15min access token (in response body) + 7-day refresh token (httpOnly secure cookie) → Frontend stores access token in memory, sets Authorization header via Axios interceptor.
>
> **Protected requests:** Every API call includes `Authorization: Bearer <token>` → Auth middleware verifies JWT → Extracts user from payload → Attaches to `req.user` → Route handler proceeds.
>
> **Token refresh:** When access token expires → API returns 401 → Axios response interceptor catches it → Calls `/api/auth/refresh` (sends httpOnly cookie automatically) → Server verifies refresh token → Issues new access token → Interceptor retries the original request seamlessly.
>
> **Logout:** Frontend clears access token → Calls `/api/auth/logout` → Server clears refresh token cookie → Optionally blacklists the refresh token in Redis.
>
> **Role-based access:** JWT contains user role → Backend `authorize('admin')` middleware checks role → Frontend `<ProtectedRoute>` component checks role before rendering.
>
> **Multi-tab sync:** Uses `window.addEventListener('storage')` to detect login/logout across tabs."

---

## 2. Write Event Loop Output

```js
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => console.log('5'), 0);
});

console.log('6');

// OUTPUT: 1, 6, 4, 2, 3, 5

// Explanation:
// Sync: 1, 6 (call stack)
// Microtask: 4 (Promise.then runs, schedules setTimeout for '5')
// Macrotask: 2 (setTimeout callback runs, schedules Promise for '3')
// Microtask: 3 (Promise from inside setTimeout)
// Macrotask: 5 (setTimeout scheduled from inside Promise)
```

---

## 3. Build Paginated API

```js
// Backend
router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || '-createdAt';
  const search = req.query.search || '';

  const query = search ? { name: { $regex: search, $options: 'i' } } : {};

  const [products, total] = await Promise.all([
    Product.find(query).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
    Product.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: products,
    pagination: {
      page, limit, total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  });
});

// Frontend hook
function usePagination(url, initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState({ items: [], pagination: {} });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`${url}?page=${page}&limit=10`)
      .then(res => setData({ items: res.data.data, pagination: res.data.pagination }))
      .finally(() => setLoading(false));
  }, [url, page]);

  return { ...data, loading, setPage };
}
```

---

## 4. Implement Debouncing

```js
// Generic debounce function
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// React hook
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]); // Only fires 300ms after user stops typing
}
```

---

## 5. Why useEffect Called Twice?

> "In React 18 with StrictMode enabled (development only), React intentionally mounts → unmounts → remounts every component to help detect:
> 1. Effects without proper cleanup
> 2. Race conditions in data fetching
> 3. Stale subscriptions
>
> **It does NOT happen in production.** The solution is not to remove StrictMode, but to write effects with proper cleanup:
> ```jsx
> useEffect(() => {
>   const controller = new AbortController();
>   fetch(url, { signal: controller.signal });
>   return () => controller.abort(); // Proper cleanup
> }, [url]);
> ```
> This ensures your app works correctly even if effects run twice."

---

## 6. React.memo vs useMemo

| Aspect | React.memo | useMemo |
|--------|-----------|---------|
| **What** | HOC that memoizes a **component** | Hook that memoizes a **value** |
| **Purpose** | Skip re-render if props unchanged | Skip re-computation if deps unchanged |
| **Comparison** | Shallow comparison of all props | Dependency array comparison |
| **Returns** | Memoized component | Memoized value |

```jsx
// React.memo: Prevent child from re-rendering when parent re-renders
const MemoChild = React.memo(({ name }) => <div>{name}</div>);

// useMemo: Avoid re-computing expensive value
const sorted = useMemo(() => items.sort((a, b) => a.price - b.price), [items]);
```

---

## 7. Context API vs Redux

> "Context API is React's built-in solution for avoiding prop drilling. Redux is a dedicated state management library.
>
> **Choose Context when:** State is simple, updates are infrequent (theme, auth, locale), you don't need middleware or time-travel debugging.
>
> **Choose Redux when:** State is complex and shared across many components, you need predictable state updates (actions → reducers), you need middleware for async operations (thunk/saga), you want DevTools with time-travel.
>
> **Performance difference:** Context re-renders ALL consumers when value changes. Redux uses selectors — only components that read changed state re-render.
>
> In practice: Context + useReducer handles 80% of cases. Use Redux (or Zustand) for truly complex, high-frequency state."

---

## 8. Explain JWT Refresh Token Flow

(See Scenario Questions #3 and Authentication #3 for detailed flow)

> "Access tokens are short-lived (15min) for security. If stolen, the damage window is small. Refresh tokens are long-lived (7 days) but stored in httpOnly cookies — inaccessible to JavaScript (prevents XSS theft).
>
> When the access token expires, the frontend's Axios interceptor automatically sends the refresh token to get a new access token, then retries the failed request. The user experiences zero interruption.
>
> For extra security: implement refresh token rotation (issue new refresh token with each refresh, invalidate the old one) and maintain a blacklist for logout."

---

## 9. Explain CORS

> "CORS (Cross-Origin Resource Sharing) is a browser security mechanism. When frontend (localhost:3000) makes a request to backend (localhost:5000), the browser blocks it because they're different origins (different port = different origin).
>
> **How it works:** For non-simple requests, the browser sends a **preflight** OPTIONS request asking 'Can I make this request?' The server responds with headers like `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`. If the origin is allowed, the browser proceeds with the actual request.
>
> **Fix in Express:**
> ```js
> app.use(cors({ origin: 'https://myapp.com', credentials: true }));
> ```
>
> **Origin = protocol + domain + port.** `http://localhost:3000` ≠ `http://localhost:5000`."

---

## 10. Design E-Commerce Order API

```js
// Models
// Order: { userId, items: [{productId, name, price, qty}], status, total, address, payment }
// Status flow: pending → confirmed → processing → shipped → delivered / cancelled

// Routes
POST   /api/orders              // Place order (validate stock, calculate total, create)
GET    /api/orders               // List user's orders (paginated)
GET    /api/orders/:id           // Order details
PATCH  /api/orders/:id/status    // Update status (admin)
POST   /api/orders/:id/cancel    // Cancel order (with refund logic)

// Place order (with transaction)
router.post('/', authenticate, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { items, addressId } = req.body;
    // 1. Validate stock & calculate total
    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (product.stock < item.qty) throw new AppError(`${product.name} out of stock`, 400);
      await Product.updateOne({ _id: item.productId }, { $inc: { stock: -item.qty } }, { session });
      total += product.price * item.qty;
    }
    // 2. Create order
    const order = await Order.create([{ userId: req.user.id, items, total, address: addressId }], { session });
    await session.commitTransaction();
    res.status(201).json(order[0]);
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally { session.endSession(); }
});
```

---

## 11. Populate React UI from API

```jsx
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    api.get('/products', { signal: controller.signal })
      .then(res => setProducts(res.data.data))
      .catch(err => { if (err.name !== 'CanceledError') setError(err.message); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  if (loading) return <Skeleton count={6} />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!products.length) return <EmptyState message="No products found" />;

  return (
    <div className="grid">
      {products.map(product => <ProductCard key={product._id} product={product} />)}
    </div>
  );
}
```

---

## 12. Optimize API Calls

> "1. **Debounce** search inputs (300ms delay)
> 2. **AbortController** to cancel stale requests
> 3. **Caching** — React Query/SWR with staleTime, or manual cache
> 4. **Pagination** — Don't load all data at once
> 5. **Parallel requests** — `Promise.all` instead of sequential awaits
> 6. **Request deduplication** — Prevent same API from being called simultaneously
> 7. **Conditional fetching** — Only fetch if data is stale or missing
> 8. **Backend:** Add Redis caching, proper indexes, select only needed fields (`.select('name price')`)"

---

## 13. Explain Project Architecture

> "We follow a **layered architecture** with clear separation of concerns:
>
> **Frontend (React):** Feature-based folder structure. Each feature (auth, orders, products) has its own components, hooks, and services. Shared UI components (Button, Modal, Table) in a common folder. API calls abstracted into service functions — components never call axios directly.
>
> **Backend (Node/Express):** Routes → Controllers → Services → Models. Controllers handle HTTP (parse request, send response). Services contain business logic. Models define data shape and validation. Middleware for cross-cutting concerns (auth, error handling, logging).
>
> **Database (MongoDB):** Schema designed for query patterns. Indexes on frequently queried fields. Aggregation pipelines for reports. Transactions for multi-document operations."

---

## 14. Explain Database Schema

> "Take an e-commerce example:
> - **Users:** `{ name, email, password(hashed), role, addresses: [embedded], createdAt }`
> - **Products:** `{ name, description, price, category, stock, images: [], isActive }` — Indexed on `{category, price}` for filtered queries
> - **Orders:** `{ userId(ref), items: [{productId, name, price, qty}], total, status, address(embedded), paymentMethod, createdAt }` — Items are embedded (snapshot at order time, price won't change if product price changes later)
> - **Reviews:** `{ userId(ref), productId(ref), rating, comment }` — Compound index `{productId, userId}` unique
>
> Design decisions: Embedded product info in orders (denormalized) because we always read them together and need a price snapshot. Addresses embedded in users because they're 1:few. Reviews referenced because they can be queried independently."

---

## 15. Write Reusable Component

```jsx
// Reusable Button with variants
function Button({ children, variant = 'primary', size = 'md', loading, disabled, onClick, ...props }) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
}

// Reusable DataTable
function DataTable({ columns, data, loading, onRowClick, emptyMessage = 'No data found' }) {
  if (loading) return <TableSkeleton columns={columns.length} />;
  if (!data.length) return <EmptyState message={emptyMessage} />;
  return (
    <table>
      <thead>
        <tr>{columns.map(col => <th key={col.key}>{col.label}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={row.id || i} onClick={() => onRowClick?.(row)}>
            {columns.map(col => <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage
<DataTable
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price', render: (row) => `₹${row.price}` },
    { key: 'actions', label: '', render: (row) => <Button onClick={() => edit(row.id)}>Edit</Button> },
  ]}
  data={products}
  loading={loading}
/>
```

---

## 16. Handle Multi-Tab Login

(See Scenario Questions #10 for implementation)

> "Use the `storage` event listener. When Tab A sets `accessToken` in localStorage, Tab B receives a `storage` event and can read the new token. On logout, Tab A removes the token → Tab B detects removal → auto-redirects to login.
>
> For more complex scenarios, use the `BroadcastChannel` API which allows direct tab-to-tab messaging."

---

## 17. Explain Production Issue You Solved

> "We had an issue where the dashboard API was taking 8+ seconds during peak hours. I investigated:
> 1. Added query timing logs → Found the aggregation pipeline was doing a collection scan
> 2. Ran `.explain('executionStats')` → Confirmed no index was being used
> 3. Added a compound index `{ createdAt: -1, status: 1 }` → Query dropped to 200ms
> 4. Added Redis caching (5-minute TTL) for dashboard stats → Subsequent requests: 5ms
> 5. Set up PM2 monitoring alerts so we catch performance regressions early
>
> Lesson: Always check query execution plans before deploying aggregation pipelines."

---

## 18. Explain Deployment Process

> "1. Developer pushes to feature branch → Creates PR → Code review
> 2. GitHub Actions CI: Install deps → Lint → Run tests
> 3. Merge to `main` → Triggers CD pipeline
> 4. Build frontend (`npm run build`) → Deploy static files to Vercel
> 5. Build backend Docker image → Push to registry → Deploy to AWS/Render
> 6. Environment variables in platform secrets (never in code)
> 7. MongoDB Atlas (auto-backup, monitoring)
> 8. Cloudflare for DNS + SSL + CDN
> 9. PM2 for process management with zero-downtime reload
> 10. Monitoring: Uptime Robot (availability), Sentry (errors), LogRocket (user sessions)"

---

## 19. Git Conflict Resolution

> "1. `git pull origin main` → Conflict detected
> 2. Open conflicted files → Look for `<<<<<<< HEAD`, `=======`, `>>>>>>> branch`
> 3. Understand BOTH changes — don't blindly pick one side
> 4. Manually merge: keep both changes if compatible, or choose the correct version
> 5. Remove conflict markers
> 6. Test the merged code
> 7. `git add .` → `git commit -m 'resolve merge conflicts'` → `git push`
>
> Prevention: Pull frequently, keep branches short-lived, communicate with team about shared files."

---

## 20. Optimize React Application

> "**Rendering:** React.memo for expensive components, useMemo/useCallback to stabilize references, virtualize long lists (react-window), avoid inline object/function creation in JSX.
>
> **Bundle:** Code split with lazy/Suspense (per route), analyze with webpack-bundle-analyzer, tree-shake unused imports, dynamic import heavy libraries.
>
> **Network:** Debounce API calls, cancel stale requests (AbortController), cache responses, use pagination/infinite scroll.
>
> **Assets:** Lazy load images (loading='lazy'), use WebP format, compress assets, use CDN.
>
> **State:** Keep state local, split contexts to avoid unnecessary re-renders, avoid deep nesting in state.
>
> **Profiling:** Use React DevTools Profiler to identify bottlenecks. Use Lighthouse for overall performance scoring."

---

## 21. React 19 Features & The React Compiler

> "React 19 brings major updates, focusing on removing manual optimizations and simplifying async state management:
>
> 1. **React Compiler (React Forget):** A build-time tool that automatically memoizes components, props, and dependency arrays. It eliminates the need for manual `useMemo`, `useCallback`, and `React.memo` for performance tuning.
> 2. **Server Actions:** Seamlessly invoke backend database functions directly from frontend forms.
> 3. **`useActionState` (formerly `useFormState`):** Simulates pending states, returns the form response, and coordinates action execution.
> 4. **`useFormStatus`:** A hook to read parent form status (e.g., pending state) from nested inputs or buttons.
> 5. **`useOptimistic`:** Hook for rendering optimistic UI updates during async transactions.
> 6. **The `use` Hook:** Read Promises and Context inline, allowing conditional context consumption.
> 7. **Ref as a Prop:** Refs can now be passed as a standard prop; `forwardRef` is deprecated.
>
> **Action State Example:**
> ```jsx
> // React 19 Form Action usage
> function ProfileForm() {
>   const [state, formAction, isPending] = useActionState(updateProfile, null);
>   return (
>     <form action={formAction}>
>       <input name="username" defaultValue={state?.username} />
>       <SubmitButton />
>     </form>
>   );
> }
> function SubmitButton() {
>   const { pending } = useFormStatus();
>   return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>;
> }
> ```"

---

## 22. React Server Components (RSC) vs Client Components (RCC)

| Feature | React Server Components (RSC) | Client Components (RCC) |
|---|---|---|
| **Execution Place** | Exclusively on the server | Initial load on server (SSR), interactive hydration on client |
| **Bundle Size Impact** | Zero (dependencies are kept on the server) | Adds to client bundle size |
| **Data Fetching** | Can query DB directly, write async/await directly | Uses `useEffect` / React Query to fetch via API endpoints |
| **Direct Access** | File system, internal services, server-only environment variables | Browser APIs (local storage, window, document) |
| **State & Effects** | **No** state (`useState`) or lifecycle effects (`useEffect`) | Fully supports state, effects, and event handlers |

> **Interview answer:**
> "RSCs and RCCs are not a replacement for SSR, but a complement. RSCs run only on the server, allowing us to fetch database data directly and keep massive dependencies (like Markdown parsers or date utilities) out of the client bundle. RCCs represent interactive UI parts marked with `'use client'` that run on the client, maintaining state and responding to browser events. By default in Next.js App Router, all components are RSCs unless marked otherwise."

---

## 23. CommonJS vs ES Modules (ESM) in Node.js

| Aspect | CommonJS (CJS) | ES Modules (ESM) |
|---|---|---|
| **Syntax** | `const module = require('./module')` / `module.exports` | `import module from './module'` / `export default` |
| **Loading** | Synchronous, blocking | Asynchronous, non-blocking |
| **Evaluation** | Runtime | Static (at parse time) |
| **`__dirname` / `__filename`** | Available globally | Unavailable (must construct via `import.meta.url`) |
| **Tree Shaking** | Extremely difficult | Native support (static analysis allows dead code removal) |
| **Dynamic Import** | `require()` anywhere | `import()` returns a promise |

> **How to construct `__dirname` in ESM:**
> ```js
> import { fileURLToPath } from 'url';
> import { dirname } from 'path';
> const __filename = fileURLToPath(import.meta.url);
> const __dirname = dirname(__filename);
> ```
>
> **Interview answer:**
> "CommonJS is the legacy module system in Node.js, loading modules synchronously at runtime. ESM is the modern JavaScript standard, analyzing module trees statically prior to execution. Static analysis enables bundlers to perform 'tree shaking' (dead-code elimination). Node.js supports ESM if you add `"type": "module"` in `package.json` or use the `.mjs` extension."

---

## 24. Node.js 20/22+ Native Features

> "Recent Node.js releases focus on reducing third-party dependency creep by introducing native alternatives:
>
> 1. **Native Env File Loading:** Load `.env` files without `dotenv`.
>    - Usage: `node --env-file=.env server.js`
>    - Variables are accessed normally: `process.env.PORT`.
> 2. **Native Test Runner (`node:test`):** Eliminates dependencies on Jest or Mocha for basic testing.
>    - Usage:
>      ```js
>      import { test, describe } from 'node:test';
>      import assert from 'node:assert';
>      describe('Math service', () => {
>        test('should add numbers correctly', () => {
>          assert.strictEqual(2 + 2, 4);
>        });
>      });
>      ```
> 3. **Native Watch Mode:** Restarts the process on file changes without Nodemon.
>    - Usage: `node --watch server.js`
> 4. **Native WebSocket Client:** WebSockets are globally available (`globalThis.WebSocket`) in Node.js 22 without requiring the `ws` package."

---

## 25. Prevent NoSQL Injection in Express/Mongoose

**Vulnerable Code:**
```js
// URL: /api/users/login?email[$ne]=admin@test.com&password[$ne]=secret
app.post('/login', async (req, res) => {
  const { email, password } = req.body; // If passed query objects
  const user = await User.findOne({ email, password }); // Matches any non-matching document!
});
```

**Prevention Strategies:**
> 1. **Sanitize user inputs:** Use `express-mongo-sanitize` middleware to strip out keys beginning with `$` or `.`.
>    ```js
>    const mongoSanitize = require('express-mongo-sanitize');
>    app.use(mongoSanitize());
>    ```
> 2. **Explicit Type Casting:** Ensure fields are cast to strings or expected primitive types.
>    ```js
>    const email = String(req.body.email);
>    const password = String(req.body.password);
>    ```
> 3. **Define strict Schema rules:** Mongoose enforces schema definitions. Avoid using `Schema.Types.Mixed` unnecessarily."

---

## 26. Redis Caching Strategies & Cache Stampede

> "In high-traffic MERN apps, caching API responses in Redis is essential. We use two primary strategies:
>
> 1. **Cache-Aside (Lazy Loading):** Application checks Redis first → if miss, queries MongoDB → writes to Redis with a TTL (Time-To-Live) → returns response.
> 2. **Cache Stampede (Cache Avalanche):** Occurs when a highly popular cache key expires, and thousands of concurrent requests attempt to query MongoDB simultaneously, overloading the database.
>
> **Prevention (Locking & Mutual Exclusion):**
> - **Mutual Exclusion (Locking):** Use a distributed lock (e.g., Redlock) so only the first request queries the DB and updates the cache, while others wait or return stale data.
> - **Background refresh:** Re-compute and refresh the cache in the background *before* the key actually expires.
>
> ```js
> // Cache-Aside pattern with Lock mitigation
> async function getCachedData(key, fetchFromDb, ttl = 300) {
>   const cached = await redis.get(key);
>   if (cached) return JSON.parse(cached);
>
>   // Set distributed lock key to prevent stampede
>   const lockKey = `lock:${key}`;
>   const acquiredLock = await redis.set(lockKey, 'locked', 'NX', 'PX', 5000);
>   if (!acquiredLock) {
>     // Wait a bit and retry cache check, or return empty/stale data
>     await new Promise(r => setTimeout(r, 100));
>     return getCachedData(key, fetchFromDb, ttl);
>   }
>
>   try {
>     const freshData = await fetchFromDb();
>     await redis.set(key, JSON.stringify(freshData), 'EX', ttl);
>     return freshData;
>   } finally {
>     await redis.del(lockKey);
>   }
> }
> ```"

---

## 27. WebSockets vs Server-Sent Events (SSE)

| Feature | WebSockets | Server-Sent Events (SSE) |
|---|---|---|
| **Communication** | Bidirectional (Duplex) | Unidirectional (Server-to-Client only) |
| **Protocol** | Custom `ws://` or `wss://` (starts with HTTP upgrade) | Standard HTTP (`text/event-stream`) |
| **Transport** | TCP | HTTP/1.1 or HTTP/2 |
| **Reconnection** | Must be handled manually in JavaScript | Native auto-reconnection by the browser |
| **Firewalls/Proxies** | Can be blocked by strict firewalls | Highly firewall-friendly (standard HTTP) |
| **Best For** | Chat apps, multi-player games, collaborative editors | Dashboards, live feeds, notification ticks |

> **Interview answer:**
> "WebSockets are best when real-time, low-latency, two-way data streaming is required (like chats or gaming). SSE is an elegant, lightweight alternative when the client only needs to receive streams of notifications or events from the server (like dashboard updates). SSE operates over standard HTTP, has automatic reconnection out of the box, and handles proxy/firewall traversal seamlessly."

---

## 28. Optimistic vs Pessimistic Locking in MongoDB

> "When multiple clients edit the same document concurrently, database conflicts occur.
>
> 1. **Optimistic Locking:** Assumes conflicts are rare. Each document has a version field (like `__v` in Mongoose). Updates only proceed if the version on the server matches the version fetched by the client. If not, the transaction fails, and the client is forced to refetch and retry.
>    ```js
>    // Mongoose automatic versioning under update
>    const doc = await Product.findById(id);
>    doc.price = 200;
>    await doc.save(); // Fails with VersionError if modified elsewhere in between
>    ```
> 2. **Pessimistic Locking:** Assumes conflicts are common. Locks the document/record at read time, blocking other sessions from writing to it until the transaction commits.
>    - MongoDB does not have a direct `SELECT FOR UPDATE` block. However, we can simulate it using a custom status field (e.g., `isLocked: true`) or by running updates within an ACID transaction session using a lock document.
>
> **Which to choose:** Use optimistic locking for web apps and APIs (lower overhead, avoids deadlocks). Use pessimistic locking only when data consistency is critical and conflicts are guaranteed (financial transaction settlement)."

---

## 29. JWT Revocation & Blacklisting in Production

> "Because JWTs are stateless, they cannot be invalidated before their expiry time by default.
>
> **Production Revocation Strategies:**
>
> 1. **Redis Blacklist (Recommended):** When a user logs out, store their token ID (`jti`) or the token signature in Redis with a TTL equal to the token's remaining life. The auth middleware checks Redis on every request.
> 2. **Database Token Versioning:** Store a `tokenVersion` counter on the `User` model. Include this counter in the JWT payload. To invalidate all tokens (e.g., force logout/password change), increment the counter in the DB. Tokens with the old version will fail verification.
> 3. **Short Expirations:** Keep the access token expiry extremely short (e.g., 5-15 mins) to minimize the damage window of an un-revoked token, and handle regeneration via the refresh token flow.
>
> **Auth Middleware with Redis Blacklist Check:**
> ```js
> const authenticate = async (req, res, next) => {
>   const token = req.headers.authorization?.split(' ')[1];
>   if (!token) return res.status(401).json({ error: 'Access denied' });
>
>   try {
>     const decoded = jwt.verify(token, process.env.JWT_SECRET);
>     // Check if blacklisted in Redis
>     const isBlacklisted = await redis.get(`blacklist:${decoded.jti}`);
>     if (isBlacklisted) return res.status(401).json({ error: 'Token is revoked' });
>
>     req.user = decoded;
>     next();
>   } catch (err) {
>     res.status(401).json({ error: 'Invalid token' });
>   }
> };
> ```"

---

## 30. Deep-Dive: MongoDB Execution Plan & Indexing Optimization

> "To optimize slow database queries, we analyze the query's execution plan:
>
> **How to run:** `db.collection.find(query).explain('executionStats')`
>
> **Key Metrics to Inspect:**
> 1. **WinningStage:**
>    - `IXSCAN` (Index Scan): Excellent. The query uses an index.
>    - `COLLSCAN` (Collection Scan): Dangerous. The query scans every document.
> 2. **totalKeysExamined:** How many index entries were scanned. Ideally equal to `nReturned`.
> 3. **totalDocsExamined:** How many documents were loaded into memory. If `winningStage` is `IXSCAN` but this value is high, the index is not fully selective or covers only part of the filter.
> 4. **nReturned:** The number of documents returned.
>
> **Optimal Compound Indexing (The ESR Rule):**
> When creating compound indexes, arrange fields in this exact order:
> 1. **E**quality: Fields checked with exact values (e.g., `status: 'active'`).
> 2. **S**ort: Fields used for sorting (e.g., `createdAt: -1`).
> 3. **R**ange: Fields checked with operators like `$gt`, `$lt`, `$in` (e.g., `price: { $gte: 100 }`).
>
> *Note:* Placing a range field before a sort field forces MongoDB to perform an expensive in-memory sort."

