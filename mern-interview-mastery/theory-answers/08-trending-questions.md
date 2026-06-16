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
