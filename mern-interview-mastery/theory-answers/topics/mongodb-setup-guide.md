# MongoDB Quick Start Guide — From Zero to Connected 🚀

> **Goal:** Learn MongoDB basics, set up a Node.js backend server, and connect to both **MongoDB Cloud (Atlas)** and **Local MongoDB** — all in one short guide.

---

## 📌 PART 1: What is MongoDB?

### Definition
MongoDB is a **NoSQL database** that stores data in **JSON-like documents** (BSON format) instead of traditional rows & columns (SQL tables).

### SQL vs MongoDB — Quick Comparison

| SQL (MySQL/PostgreSQL) | MongoDB |
|----------------------|---------|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| JOIN | `$lookup` / `populate()` |
| Schema required | Schema optional (flexible) |

### Why MongoDB?
- **Flexible Schema** — No need to define structure upfront, documents can have different fields
- **JSON Format** — Perfect for JavaScript/Node.js (no conversion needed)
- **Scalable** — Horizontal scaling with sharding
- **Fast** — Reads are very fast for document-based queries
     
### Document Example
```js
// This is ONE document in a "users" collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),  // auto-generated unique ID
  name: "Murali",
  email: "murali@example.com",
  age: 25,
  skills: ["React", "Node", "MongoDB"],       // arrays allowed
  address: {                                   // nested objects allowed
    city: "Hyderabad",
    state: "Telangana"
  }
}
```

---

## 📌 PART 2: Setup Node.js Backend Server (Express)

### Step 1: Create Project

```bash
mkdir my-backend
cd my-backend
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install express mongoose dotenv
npm install -D nodemon
```

| Package | Why |
|---------|-----|
| `express` | Web server framework |
| `mongoose` | MongoDB ODM (makes DB operations easy) |
| `dotenv` | Load environment variables from `.env` file |
| `nodemon` | Auto-restart server on file changes (dev only) |

### Step 3: Create Folder Structure

```
my-backend/
├── .env                  # Secret keys, DB URL
├── .gitignore            # Ignore node_modules, .env
├── package.json
├── server.js             # Entry point
├── config/
│   └── db.js             # Database connection logic
├── models/
│   └── User.js           # Mongoose schema/model
└── routes/
    └── userRoutes.js     # API routes
```

### Step 4: Add Scripts in `package.json`

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 5: Create `.gitignore`

```
node_modules
.env
```

---

## 📌 PART 3: Connect MongoDB — Cloud (Atlas) ☁️

> **MongoDB Atlas** = Free cloud-hosted MongoDB. No installation needed.

### Step 1: Create Atlas Account
1. Go to → [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up (free)
3. Create a **Free Shared Cluster** (M0 — free forever)

### Step 2: Setup Database Access
1. Go to **Database Access** → Add New Database User
2. Create username & password (example: `murali` / `MyPassword123`)
3. Set role: **Read and write to any database**

### Step 3: Setup Network Access
1. Go to **Network Access** → Add IP Address
2. Click **"Allow Access from Anywhere"** → `0.0.0.0/0`
   - ⚠️ For production, whitelist specific IPs only

### Step 4: Get Connection String
1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string:
```
mongodb+srv://murali:<password>@cluster0.xxxxx.mongodb.net/myDatabaseName?retryWrites=true&w=majority
```
4. Replace `<password>` with your actual password
5. Replace `myDatabaseName` with your database name (e.g., `myapp`)

### Step 5: Create `.env` File

```env
PORT=5000
MONGO_URI=mongodb+srv://murali:MyPassword123@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority
```

---

## 📌 PART 4: Connect MongoDB — Local Server 💻

> **Local MongoDB** = MongoDB installed on your own computer.

### Step 1: Install MongoDB Locally

**Ubuntu/Linux:**
```bash
# Import MongoDB public GPG Key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repo
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod    # auto-start on boot

# Verify running
sudo systemctl status mongod
```

**Windows:**
1. Download from → [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run installer → Choose "Complete" setup
3. Check "Install MongoDB as a Service"
4. MongoDB runs automatically on `localhost:27017`

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

### Step 2: Local Connection String

```env
# In .env file — for LOCAL MongoDB
PORT=5000
MONGO_URI=mongodb://localhost:27017/myapp
```

> **Note:** `myapp` = database name. MongoDB creates it automatically when you first insert data.

### Step 3: Optional — Install MongoDB Compass (GUI)
- Download from → [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)
- Visual tool to see your collections, documents, and run queries
- Connect using: `mongodb://localhost:27017`

---

## 📌 PART 5: The Code — Putting It All Together

### `config/db.js` — Database Connection

```js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;
```

> **Key Point:** `mongoose.connect()` works the same for BOTH cloud and local.
> Just change `MONGO_URI` in `.env` — no code changes needed!

### `models/User.js` — Mongoose Schema & Model

```js
const mongoose = require('mongoose');

// Schema = Structure/rules for your document
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],  // Validation with custom message
      trim: true,                              // Remove extra spaces
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,                            // No duplicate emails
      lowercase: true,                         // Convert to lowercase
    },
    age: {
      type: Number,
      min: [1, 'Age must be at least 1'],
      max: [150, 'Age must be less than 150'],
    },
    isActive: {
      type: Boolean,
      default: true,                           // Default value
    },
  },
  {
    timestamps: true,  // Adds createdAt & updatedAt automatically
  }
);

// Model = Collection wrapper (collection name = "users" — auto pluralized)
const User = mongoose.model('User', userSchema);

module.exports = User;
```

### `routes/userRoutes.js` — CRUD API Routes

```js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ CREATE — POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ READ ALL — GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // Get all users
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ READ ONE — GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ UPDATE — PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,              // Return updated document
      runValidators: true,    // Run schema validations
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ DELETE — DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
```

### `server.js` — Main Entry Point

```js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware — parse JSON body
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: '🚀 Server is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

## 📌 PART 6: Run & Test

### Start the Server

```bash
npm run dev
```

**Expected Output:**
```
🚀 Server running on http://localhost:5000
✅ MongoDB Connected: cluster0-shard-00-02.xxxxx.mongodb.net    # Cloud
# OR
✅ MongoDB Connected: localhost                                   # Local
```

### Test with cURL or Postman

```bash
# CREATE a user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Murali", "email": "murali@example.com", "age": 25}'

# GET all users
curl http://localhost:5000/api/users

# GET one user (replace <id> with actual _id)
curl http://localhost:5000/api/users/<id>

# UPDATE a user
curl -X PUT http://localhost:5000/api/users/<id> \
  -H "Content-Type: application/json" \
  -d '{"name": "Murali Krishna"}'

# DELETE a user
curl -X DELETE http://localhost:5000/api/users/<id>
```

---

## 📌 PART 7: Cloud vs Local — Quick Switch

The **ONLY** thing you change is the `MONGO_URI` in `.env`:

```env
# ☁️ For Cloud (Atlas)
MONGO_URI=mongodb+srv://murali:MyPassword123@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority

# 💻 For Local
MONGO_URI=mongodb://localhost:27017/myapp
```

**Code stays 100% the same.** Just swap the URI and restart the server.

---

## 📌 PART 8: Common Mongoose Methods Cheat Sheet

| Operation | Mongoose Method |
|-----------|----------------|
| Create one | `Model.create({...})` |
| Create many | `Model.insertMany([{...}, {...}])` |
| Find all | `Model.find()` |
| Find with filter | `Model.find({ age: { $gte: 18 } })` |
| Find one | `Model.findOne({ email: "x@y.com" })` |
| Find by ID | `Model.findById(id)` |
| Update one | `Model.findByIdAndUpdate(id, {...}, { new: true })` |
| Update many | `Model.updateMany({ isActive: false }, { isActive: true })` |
| Delete one | `Model.findByIdAndDelete(id)` |
| Delete many | `Model.deleteMany({ isActive: false })` |
| Count | `Model.countDocuments({ role: "admin" })` |
| Exists? | `Model.exists({ email: "x@y.com" })` |
| Sort | `Model.find().sort({ createdAt: -1 })` |
| Limit | `Model.find().limit(10)` |
| Select fields | `Model.find().select('name email')` |
| Populate ref | `Model.find().populate('userId')` |

---

## 📌 PART 9: MongoDB Query Operators Cheat Sheet

```js
// Comparison
{ age: { $eq: 25 } }     // Equal
{ age: { $ne: 25 } }     // Not equal
{ age: { $gt: 25 } }     // Greater than
{ age: { $gte: 25 } }    // Greater than or equal
{ age: { $lt: 25 } }     // Less than
{ age: { $lte: 25 } }    // Less than or equal
{ age: { $in: [20, 25, 30] } }     // In array
{ age: { $nin: [20, 25, 30] } }    // Not in array

// Logical
{ $and: [{ age: { $gte: 18 } }, { isActive: true }] }
{ $or: [{ role: 'admin' }, { role: 'moderator' }] }
{ $not: { age: { $lt: 18 } } }

// Element
{ email: { $exists: true } }     // Field exists
{ age: { $type: 'number' } }     // Field type check

// Array
{ skills: { $all: ['React', 'Node'] } }   // Array contains ALL
{ skills: { $size: 3 } }                   // Array has exact size
{ skills: { $elemMatch: { $eq: 'React' } } }
```

---

## 📌 PART 10: Summary — Learning Order

| # | Topic | Status |
|---|-------|--------|
| 1 | What is MongoDB, SQL vs NoSQL | ✅ Done (Part 1) |
| 2 | Setup Node.js + Express server | ✅ Done (Part 2) |
| 3 | Connect MongoDB Cloud (Atlas) | ✅ Done (Part 3) |
| 4 | Connect MongoDB Local | ✅ Done (Part 4) |
| 5 | Mongoose Schema & Model | ✅ Done (Part 5) |
| 6 | CRUD Operations (Create, Read, Update, Delete) | ✅ Done (Part 5-6) |
| 7 | Common Methods & Query Operators | ✅ Done (Part 8-9) |
| 8 | **Next:** Study `04-mongodb.md` for advanced topics → Indexing, Aggregation, Transactions, etc. |

---

> **💡 Tip:** Once you're comfortable with this guide, move to `04-mongodb.md` for advanced MongoDB concepts like Aggregation Pipeline, Indexing, Transactions, Replication, Sharding, and more.
