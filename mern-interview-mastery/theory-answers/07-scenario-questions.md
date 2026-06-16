# Scenario Questions — Expert Answers

---

## 1. API Called Twice

**Problem:** API call fires twice on component mount.

**Root causes & fixes:**
1. **React 18 StrictMode** — Double-invokes effects in dev mode.
   ```jsx
   // Fix: Use AbortController (proper cleanup)
   useEffect(() => {
     const controller = new AbortController();
     fetch(url, { signal: controller.signal }).then(/* ... */);
     return () => controller.abort();
   }, [url]);
   ```
2. **Missing/wrong dependency array** — `useEffect` without `[]` runs every render.
3. **Parent re-render** — Parent state change re-renders child → effect re-runs.
4. **Component mounting twice** — Check if component is rendered in two places.

---

## 2. Component Re-rendering

**Diagnosis steps:**
1. Use **React DevTools Profiler** → Identify which components re-render and why
2. Check: Is parent re-rendering? Are objects/arrays created inline? Are callbacks recreated?

**Fixes:**
```jsx
// 1. Memoize child component
const Child = React.memo(({ data, onClick }) => <div onClick={onClick}>{data}</div>);

// 2. Memoize callback
const handleClick = useCallback(() => doSomething(id), [id]);

// 3. Memoize computed values
const filtered = useMemo(() => items.filter(i => i.active), [items]);

// 4. Move state down — keep state close to where it's used
// 5. Split context — separate frequently changing values from static ones
```

---

## 3. JWT Expired

**Handling strategy:**
```js
// Axios interceptor — automatic token refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const { data } = await axios.post('/api/auth/refresh'); // Uses httpOnly cookie
        localStorage.setItem('accessToken', data.accessToken);
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(error.config); // Retry original request
      } catch {
        // Refresh token also expired → force logout
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

---

## 4. Server Down

**Handling approach:**
- **Frontend:** Show user-friendly error message, implement retry with exponential backoff
- **Backend:** Use PM2/Docker for auto-restart, health check endpoints, monitoring (Uptime Robot)
- **Architecture:** Load balancer + multiple instances, graceful shutdown handling

```js
// Frontend: Retry logic
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch {
      if (i === retries - 1) throw new Error('Server is currently unavailable');
      await new Promise(r => setTimeout(r, delay * Math.pow(2, i))); // Exponential backoff
    }
  }
}
```

---

## 5. API Timeout

```js
// Set timeout on requests
const api = axios.create({
  baseURL: '/api',
  timeout: 10000, // 10 seconds
});

// Handle timeout specifically
api.interceptors.response.use(null, (error) => {
  if (error.code === 'ECONNABORTED') {
    return Promise.reject(new Error('Request timed out. Please try again.'));
  }
  return Promise.reject(error);
});

// AbortController timeout pattern
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000);
fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timeoutId));
```

---

## 6. Multiple Users Updating Same Data

**Solutions:**
1. **Optimistic Locking (version field):**
   ```js
   const schema = new Schema({ name: String, __v: Number });
   // Update only if version matches
   const result = await Product.findOneAndUpdate(
     { _id: id, __v: currentVersion },
     { $set: updates, $inc: { __v: 1 } },
     { new: true }
   );
   if (!result) return res.status(409).json({ error: 'Data was modified by another user. Please refresh.' });
   ```

2. **Real-time sync with Socket.IO:**
   ```js
   io.on('connection', (socket) => {
     socket.on('updateOrder', async (data) => {
       const order = await Order.findByIdAndUpdate(data.id, data.updates, { new: true });
       io.emit('orderUpdated', order); // Notify ALL clients
     });
   });
   ```

---

## 7. Render 100,000 Records

**Never render all at once.** Solutions:

1. **Virtualization (best):** Only render visible rows
   ```jsx
   import { FixedSizeList } from 'react-window';
   <FixedSizeList height={600} itemCount={100000} itemSize={50} width="100%">
     {({ index, style }) => <div style={style}>{items[index].name}</div>}
   </FixedSizeList>
   ```

2. **Pagination:** Load 50 per page from server
3. **Infinite scroll:** Load more on scroll
4. **Server-side filtering:** Send search/filter to API, return only matching results

---

## 8. Optimize Slow Dashboard

**Step-by-step approach:**
1. **Profile:** React DevTools Profiler → Find slowest components
2. **API:** Are multiple API calls sequential? → Make them parallel with `Promise.all`
3. **Data:** Too much data on initial load? → Paginate, lazy load sections
4. **Caching:** Cache API responses (React Query, SWR, or manual cache)
5. **Computation:** Heavy calculations in render? → Move to `useMemo` or Web Worker
6. **Components:** Memoize with `React.memo`, virtualize long lists
7. **Bundle:** Code split dashboard into lazy-loaded sections
8. **Backend:** Add indexes, use aggregation, add Redis cache for dashboard stats

---

## 9. File Upload Interrupted

```js
// Solution: Chunked upload with resume capability
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

async function uploadFile(file) {
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const uploadId = crypto.randomUUID();

  for (let i = 0; i < totalChunks; i++) {
    const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('chunkIndex', i);
    formData.append('totalChunks', totalChunks);
    formData.append('uploadId', uploadId);

    await retryUpload(() => axios.post('/api/upload/chunk', formData), 3);
    updateProgress((i + 1) / totalChunks * 100);
  }

  // Finalize: server assembles chunks
  await axios.post('/api/upload/complete', { uploadId, filename: file.name });
}
```

---

## 10. Multiple Browser Tabs Authentication

**Problem:** User logs in on Tab 1, Tab 2 should also be logged in. User logs out on Tab 1, Tab 2 should also log out.

```js
// Solution: Listen to localStorage changes across tabs
useEffect(() => {
  const handleStorageChange = (e) => {
    if (e.key === 'accessToken') {
      if (e.newValue) {
        setUser(parseJwt(e.newValue)); // Logged in on another tab
      } else {
        setUser(null); // Logged out on another tab
        navigate('/login');
      }
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);

// BroadcastChannel API (modern)
const channel = new BroadcastChannel('auth');
channel.postMessage({ type: 'LOGOUT' });
channel.onmessage = (e) => {
  if (e.data.type === 'LOGOUT') { clearAuth(); navigate('/login'); }
};
```

---

## 11. Search API Optimization

```js
// Frontend: Debounce + cancel previous request
function useSearch(query) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const { data } = await api.get(`/search?q=${query}`, { signal: controller.signal });
      setResults(data);
    }, 300); // 300ms debounce

    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);

  return results;
}

// Backend: Text index + autocomplete
db.products.createIndex({ name: 'text', description: 'text' });
router.get('/search', async (req, res) => {
  const results = await Product.find(
    { $text: { $search: req.query.q } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } }).limit(20);
  res.json(results);
});
```

---

## 12. Rate Limiting Implementation

```js
// In-memory (simple)
const rateLimit = require('express-rate-limit');
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Redis-based (production, distributed)
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

app.use('/api/', rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redisClient.call(...args) }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => req.ip, // or req.user?.id for per-user limiting
}));

// Sliding window (custom)
// Track requests per IP in Redis sorted set with timestamps
```

---

## 13. Role-Based Routing

```jsx
const roleRoutes = {
  admin: ['/dashboard', '/users', '/settings', '/reports'],
  cashier: ['/billing', '/orders'],
  waiter: ['/tables', '/orders'],
  kitchen: ['/kitchen-display'],
};

function RoleBasedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  return children;
}

// Dynamic sidebar based on role
function Sidebar() {
  const { user } = useAuth();
  const allowedRoutes = roleRoutes[user.role] || [];
  return <nav>{allowedRoutes.map(route => <NavLink to={route} key={route} />)}</nav>;
}
```

---

## 14. Real-Time Notifications

```js
// Backend: Socket.IO
const io = require('socket.io')(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId;
  socket.join(`user:${userId}`); // Join user-specific room

  // Send notification to specific user
  io.to(`user:${targetUserId}`).emit('notification', {
    type: 'ORDER_UPDATE',
    message: 'Your order has been shipped',
    timestamp: new Date(),
  });
});

// Frontend: React hook
function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io(SOCKET_URL, { auth: { userId } });
    socket.on('notification', (data) => {
      setNotifications(prev => [data, ...prev]);
      showToast(data.message); // Visual notification
    });
    return () => socket.disconnect();
  }, []);

  return notifications;
}
```

---

## 15. Prevent Duplicate API Calls

```js
// 1. AbortController — Cancel previous request
useEffect(() => {
  const controller = new AbortController();
  fetchData({ signal: controller.signal });
  return () => controller.abort();
}, [dependency]);

// 2. Disable button after click
const [submitting, setSubmitting] = useState(false);
const handleSubmit = async () => {
  if (submitting) return;
  setSubmitting(true);
  try { await api.post('/orders', data); }
  finally { setSubmitting(false); }
};

// 3. Request deduplication (cache ongoing requests)
const pendingRequests = new Map();
async function deduplicatedFetch(url) {
  if (pendingRequests.has(url)) return pendingRequests.get(url);
  const promise = fetch(url).then(r => r.json()).finally(() => pendingRequests.delete(url));
  pendingRequests.set(url, promise);
  return promise;
}

// 4. Backend: Idempotency key
router.post('/orders', async (req, res) => {
  const idempotencyKey = req.headers['x-idempotency-key'];
  const existing = await Order.findOne({ idempotencyKey });
  if (existing) return res.json(existing); // Return cached result
  const order = await Order.create({ ...req.body, idempotencyKey });
  res.status(201).json(order);
});
```
