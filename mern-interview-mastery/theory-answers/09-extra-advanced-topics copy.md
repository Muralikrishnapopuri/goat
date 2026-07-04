# Extra Advanced Topics — System Design & Advanced Engineering

---

## 1. GraphQL N+1 Query Problem & DataLoader

**The Problem:**
When querying a list of items and fetching their related data (e.g., a list of orders and their corresponding user details), a naive resolver will call the database once to fetch the list of orders ($1$ query) and then call the database *once for each order* to get its user details ($N$ queries). This results in $N+1$ database roundtrips.

```graphql
# GraphQL Query
query {
  orders {
    id
    total
    user {
      name # Triggers a separate DB query per order
    }
  }
}
```

**The Solution: DataLoader**
`DataLoader` is a utility developed by Facebook that solves the N+1 problem using **batching** and **caching**.
1. **Batching:** Instead of executing database queries immediately, DataLoader collects all requested keys (user IDs) during a single tick of the event loop. It then executes a single batch query (e.g., `User.find({ _id: { $in: ids } })`).
2. **Caching:** If the same key is requested multiple times in the same request execution, DataLoader returns the cached promise.

```js
// DataLoader Setup
const DataLoader = require('dataloader');
const User = require('./models/User');

const userLoader = new DataLoader(async (userIds) => {
  // 1. Fetch all users in a single query
  const users = await User.find({ _id: { $in: userIds } });
  
  // 2. Map users back to the exact order of incoming IDs
  const userMap = {};
  users.forEach(user => { userMap[user._id.toString()] = user; });
  return userIds.map(id => userMap[id.toString()] || null);
});

// GraphQL Resolver
const resolvers = {
  Order: {
    user: (parent) => {
      // Instead of User.findById(parent.userId), call the loader
      return userLoader.load(parent.userId);
    }
  }
};
```

---

## 2. REST vs GraphQL vs gRPC

| Feature | REST | GraphQL | gRPC |
|---|---|---|---|
| **Protocol / Transport** | HTTP/1.1 or HTTP/2 | HTTP/1.1 or HTTP/2 | HTTP/2 (bidirectional streaming) |
| **Payload Format** | JSON, XML, Text | JSON | Protocol Buffers (Binary, compact) |
| **Data Fetching** | Fixed endpoints (may over-fetch / under-fetch) | Single endpoint, client-defined queries | Code-generated client stubs, RPC style |
| **Type Safety** | Schema is optional (Swagger/OpenAPI) | Strongly typed schema (SDL) | Strongly typed schema (Proto files) |
| **Best For** | Public APIs, CRUD services | Frontends needing flexible data aggregation | Internal microservice-to-microservice communication |

**Key Tradeoffs:**
* **Choose REST** for simplicity, standard HTTP caching support, and wide ecosystem compatibility.
* **Choose GraphQL** when building APIs for complex frontend layouts where pages require aggregated data from multiple resources, eliminating multiple roundtrips and over-fetching.
* **Choose gRPC** for high-performance, low-latency communication between internal microservices, leveraging HTTP/2 multiplexing and binary serialization.

---

## 3. Detecting and Debugging Memory Leaks in Node.js

A memory leak occurs when a script holds references to objects in memory that are no longer needed, preventing the Garbage Collector from freeing them.

**Diagnosis Steps:**
1. **Monitor Heap Growth:** Check memory usage in production using `process.memoryUsage()`. Inspect `heapUsed` and `external`.
2. **Generate Heap Snapshots:** Run Node.js with debugging enabled (`node --inspect server.js`). Open Chrome DevTools → Connection to Node → Memory Tab → Take Heap Snapshots.
3. **Compare Snapshots:** Take Snapshot 1 (on start), perform a load test (using `autocannon` or `artillery`), and take Snapshot 2. Filter by "Objects allocated between Snapshot 1 and 2" to identify which classes/closures are growing.

**Common Leaks & Fixes:**
* **Uncleaned Event Listeners:**
  ```js
  // ❌ Bad: Adds listener on every request, never removes
  app.get('/data', (req, res) => {
    process.on('message', (msg) => { /* ... */ });
  });
  
  // ✅ Good: Use once() or remove listener on request completion
  app.get('/data', (req, res) => {
    const handler = (msg) => { /* ... */ };
    process.once('message', handler);
  });
  ```
* **Global Variables:** Creating variables without `let`, `const`, or `var` attaches them to the `global` object, preventing garbage collection. Use `'use strict';` to prevent this.

---

## 4. Web Security Deep-Dive: CSRF vs XSS

### Cross-Site Scripting (XSS)
**What it is:** An attacker injects malicious client-side script into web pages viewed by other users.
* **Stored XSS:** Script is saved in the database (e.g., a malicious comment) and executed when other users view the comment.
* **Reflected XSS:** Script is part of a request URL (e.g., query params) and reflected back in the HTML response.

**Prevention:**
1. **Context-aware Escaping:** React automatically escapes variables rendered in JSX, preventing simple HTML injections.
2. **Avoid Dangerous React Props:** Never use `dangerouslySetInnerHTML` with unsanitized user input. If required, sanitize it first using `DOMPurify`:
   ```jsx
   import DOMPurify from 'dompurify';
   const cleanHtml = DOMPurify.sanitize(userInput);
   return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
   ```
3. **Content Security Policy (CSP):** Set HTTP headers restricting script origins and blocking inline script executions.

---

### Cross-Site Request Forgery (CSRF)
**What it is:** An attacker tricks a victim's browser into performing unwanted actions on a trusted site where the user is currently authenticated. Since browsers automatically attach cookies to cross-site requests, the attacker's request succeeds.

**Prevention:**
1. **SameSite Cookie Attribute:** Set cookie properties to `SameSite=Lax` or `SameSite=Strict`. This stops the browser from sending cookies on cross-origin requests.
2. **Anti-CSRF Tokens (Double Submit Cookie Pattern):** Generate a cryptographically secure random token, store it in the user's session (or a non-httpOnly cookie), and require the client to send this token in custom request headers (e.g., `X-CSRF-Token`). The backend compares the header value with the cookie.

---

## 5. BOLA (Broken Object Level Authorization)

**What it is:**
Also known as IDOR (Insecure Direct Object Reference). It occurs when an application exposes a database document's unique ID in the URL or request body, and fails to verify if the currently authenticated user actually has permissions to access/modify that specific document.

**Vulnerable Endpoint:**
```js
// URL: PATCH /api/orders/65824c000000000000000002
router.patch('/orders/:id', authenticate, async (req, res) => {
  // ❌ Vulnerable: Anyone logged in can edit any order if they guess the ID!
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});
```

**Secure Endpoint:**
```js
router.patch('/orders/:id', authenticate, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  // ✅ Secure: Verify ownership before performing actions
  if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized to modify this order' });
  }

  Object.assign(order, req.body);
  await order.save();
  res.json(order);
});
```

---

## 6. Horizontal vs Vertical Scaling

```
VERTICAL SCALING (Scale Up)          HORIZONTAL SCALING (Scale Out)
     ┌───────────┐                        ┌─────┐ ┌─────┐ ┌─────┐
     │           │                        │ VM1 │ │ VM2 │ │ VM3 │
     │  BIG VM   │                        └─────┘ └─────┘ └─────┘
     │ (More CPU/│                           ▲       ▲       ▲
     │   RAM)    │                           └───────┼───────┘
     └───────────┘                               ┌───┴───┐
                                                 │  LB   │ (Load Balancer)
                                                 └───────┘
```

| Dimension | Vertical Scaling | Horizontal Scaling |
|---|---|---|
| **Definition** | Adding more CPU, RAM, or Disk to a single server. | Adding more server instances to the resource pool. |
| **State Management** | Simple. State can reside in local memory. | Complex. Requires stateless servers and a external database/Redis. |
| **Max Capacity Limit** | Hard hardware limits. | Practically infinite. |
| **Downtime** | Requires server restart (causes downtime). | Zero downtime. Load balancer routes around upgrades. |
| **Cost** | Costs scale non-linearly (enterprise hardware is expensive). | Costs scale linearly. Uses commodity hardware. |

**Application Checklist for Horizontal Scaling:**
1. **Stateless Servers:** Never store user sessions, upload files, or socket connection states in-memory on the server instance. Use Redis for session stores, S3 for file storage, and Redis Adapters for WebSockets.
2. **Load Balancer:** Use Nginx or AWS Application Load Balancer to distribute incoming traffic.

---

## 7. Monolith vs Microservices & Data Consistency

### Monolithic Architecture
All components (Auth, Orders, Billing, Inventory) reside in a single codebase, run in a single process, and share a single database.
* **Pros:** Simple deployment, easy transaction management (ACID across tables).
* **Cons:** Single point of failure, scaling one component requires scaling the whole app, slow build/deploy cycles.

---

### Microservices Architecture
Application is split into small, independent services, each running its own process and managing its own database ("Database-per-Service").
* **Pros:** Independent tech stacks, scaling, and deployments. Fault isolation.
* **Cons:** Distributed transactions are difficult, network latency, complex monitoring.

### Handling Data Consistency: The Saga Pattern
Since databases are split, we cannot use database-level ACID transactions across services. Instead, we use the **Saga Pattern**:
A Saga is a sequence of local transactions. Each transaction updates data within a single service. If a step fails, the Saga runs **compensating transactions** to undo the changes made by preceding steps.

* **Choreography:** Services listen to events and trigger local transactions independently. (Decentralized).
* **Orchestration:** A central controller service instructs participant services to execute local transactions step-by-step. (Centralized).

---

## 8. Message Queues: HTTP vs RabbitMQ / Kafka

* **HTTP (Synchronous):** Client sends request and waits for response. Blocks execution.
* **Message Queue (Asynchronous):** Sender publishes message to queue and immediately proceeds. Receivers process messages asynchronously.

```
SYNCHRONOUS (HTTP)
Client ─────────── (Request) ───────────► Server (Blocks until complete)
Client ◄────────── (Response) ─────────── Server

ASYNCHRONOUS (Message Queue)
Producer ─── (Publish Event) ───► Queue ─── (Delivered later) ───► Consumer
```

**Choose Message Queues when:**
1. **Decoupling Services:** User uploads a video → backend writes message `video.uploaded` to queue → Video processing service picks it up. The main API responds immediately to the user.
2. **Handling Traffic Spikes (Load Leveling):** If thousands of users place orders simultaneously, write orders to a queue. The inventory/fulfillment service consumes messages at a steady, manageable rate, preventing server crashes.
3. **Guaranteed Delivery:** If a consuming service goes down, messages remain in the queue and are processed once the service restarts.

---

## 9. CI/CD: Dockerizing a MERN Application

Using Docker ensures the application runs identically across development, staging, and production environments.

**Multi-stage Dockerfile for React (Frontend):**
```dockerfile
# Stage 1: Build the React Application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom Nginx configuration to handle React Router client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Custom `nginx.conf` snippet:**
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html; # Redirects missing paths to index.html (React Router)
    }
}
```

---

## 10. CSS Performance: CSS-in-JS vs CSS Modules vs Tailwind CSS

| Aspect | CSS-in-JS (Styled Components) | CSS Modules | Tailwind CSS |
|---|---|---|---|
| **Compilation** | Runtime execution (JavaScript computes styles in browser). | Build-time compilation to static CSS files. | Build-time compilation of utility classes used. |
| **Bundle Size** | Larger (requires JS library runtime parser). | Zero JS overhead. Static CSS files. | Tiny (Tailwind purges unused utility classes). |
| **Performance** | Slower for high-frequency renders due to style recalculations. | Fast (native browser CSS parsing). | Fast (native browser CSS parsing). |
| **Development Experience** | Dynamic props styling support (`color: ${props => props.active ? 'red' : 'blue'}`). | Scoped local class names, clean HTML files. | Utility classes inline. Rapid styling, high cognitive load. |

**Recommendation:**
* Use **Tailwind CSS** or **CSS Modules** for performance-critical, consumer-facing applications (such as E-commerce sites) to ensure fast loading times and zero runtime layout recalculation overhead.
* Use **CSS-in-JS** for dashboards, internal tools, or design systems where dynamic styling based on complex JavaScript states is highly utilized.
