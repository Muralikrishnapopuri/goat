# SECTION D: MongoDB — Expert Answers

---

## 1. Collections

A **collection** is a group of MongoDB documents (equivalent to a table in SQL). Collections don't enforce a schema by default.

```js
// Create collection implicitly
db.users.insertOne({ name: 'Murali', age: 25 });

// Create explicitly with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email'],
      properties: {
        name: { bsonType: 'string' },
        email: { bsonType: 'string', pattern: '^.+@.+$' },
      }
    }
  }
});
```

---

## 2. Documents

A **document** is a single record in a collection (equivalent to a row in SQL). Stored as **BSON** (Binary JSON).

```js
{
  _id: ObjectId("507f1f77bcf86cd799439011"), // Auto-generated unique ID
  name: "Murali",
  email: "murali@example.com",
  address: {                    // Embedded document
    city: "Hyderabad",
    state: "Telangana"
  },
  skills: ["React", "Node"],    // Array
  createdAt: ISODate("2026-01-01T00:00:00Z")
}
```

**Max document size:** 16MB

---

## 3. Embedded vs Referenced

**Embedded (Denormalized):** Store related data inside the same document.
```js
// Embedded: Blog post with comments
{
  title: "MERN Stack",
  comments: [
    { user: "Alice", text: "Great!" },
    { user: "Bob", text: "Thanks!" }
  ]
}
// ✅ One query, fast reads
// ❌ Document can grow large, hard to query comments independently
```

**Referenced (Normalized):** Store related data in separate collections with ObjectId references.
```js
// Referenced: Order references User
// users collection
{ _id: ObjectId("u1"), name: "Murali" }

// orders collection
{ _id: ObjectId("o1"), userId: ObjectId("u1"), total: 500 }
// ✅ No data duplication, flexible
// ❌ Requires $lookup/populate (extra query)
```

| Use Embedded When | Use Referenced When |
|-------------------|-------------------|
| Data is read together | Data is accessed independently |
| 1:1 or 1:few relationship | 1:many or many:many |
| Data doesn't grow unbounded | Data grows unbounded |

---

## 4. Indexing

Indexes improve query performance by avoiding full collection scans.

```js
// Single field index
db.users.createIndex({ email: 1 });        // 1 = ascending, -1 = descending

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Text index (full-text search)
db.products.createIndex({ name: 'text', description: 'text' });

// TTL index (auto-delete after time)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// View indexes
db.users.getIndexes();

// Drop index
db.users.dropIndex('email_1');
```

**Without index:** Full collection scan O(n). **With index:** B-tree lookup O(log n).

---

## 5. Compound Index

Index on multiple fields. **Order matters** (follows leftmost prefix rule).

```js
db.orders.createIndex({ userId: 1, createdAt: -1, status: 1 });

// This index supports:
db.orders.find({ userId: "u1" });                        // ✅ Uses index
db.orders.find({ userId: "u1", createdAt: { $gte: date } }); // ✅ Uses index
db.orders.find({ userId: "u1", createdAt: date, status: "shipped" }); // ✅
db.orders.find({ status: "shipped" });                   // ❌ Can't skip userId
db.orders.find({ createdAt: date });                     // ❌ Can't skip userId
```

**ESR Rule:** Equality → Sort → Range fields in your compound index.

---

## 6. Aggregation Pipeline

Process documents through a series of stages. Each stage transforms the data.

```js
db.orders.aggregate([
  { $match: { status: 'completed' } },                    // Filter
  { $group: { _id: '$userId', totalSpent: { $sum: '$amount' } } }, // Group
  { $sort: { totalSpent: -1 } },                          // Sort
  { $limit: 10 },                                         // Top 10
  { $lookup: {                                             // Join with users
    from: 'users', localField: '_id', foreignField: '_id', as: 'user'
  }},
  { $unwind: '$user' },                                   // Flatten array
  { $project: { name: '$user.name', totalSpent: 1 } }    // Shape output
]);
```

---

## 7. $lookup

Performs a left outer join with another collection (like SQL JOIN).

```js
// Basic
db.orders.aggregate([
  {
    $lookup: {
      from: 'users',           // Collection to join
      localField: 'userId',    // Field in orders
      foreignField: '_id',     // Field in users
      as: 'userDetails'        // Output array field
    }
  },
  { $unwind: '$userDetails' }  // Convert array to object
]);

// Pipeline lookup (advanced, with conditions)
{
  $lookup: {
    from: 'products',
    let: { productIds: '$items.productId' },
    pipeline: [
      { $match: { $expr: { $in: ['$_id', '$$productIds'] } } },
      { $project: { name: 1, price: 1 } }
    ],
    as: 'productDetails'
  }
}
```

---

## 8. $match

Filters documents (like `WHERE` in SQL). Place early in pipeline for performance.

```js
{ $match: { status: 'active', age: { $gte: 18 } } }

// With regex
{ $match: { name: { $regex: /^mur/i } } }

// With date range
{ $match: { createdAt: { $gte: new Date('2026-01-01'), $lt: new Date('2026-07-01') } } }
```

---

## 9. $group

Groups documents by a key and applies accumulator expressions.

```js
{
  $group: {
    _id: '$category',                      // Group by category
    totalSales: { $sum: '$amount' },       // Sum
    avgPrice: { $avg: '$price' },          // Average
    count: { $sum: 1 },                    // Count
    products: { $push: '$name' },          // Array of names
    maxPrice: { $max: '$price' },          // Maximum
    firstSale: { $first: '$createdAt' },   // First value
  }
}

// Group by multiple fields
{ $group: { _id: { year: { $year: '$date' }, month: { $month: '$date' } }, total: { $sum: 1 } } }
```

---

## 10. $sort

```js
{ $sort: { price: -1, name: 1 } }  // Price descending, name ascending
```

---

## 11. $skip

```js
{ $skip: 20 }  // Skip first 20 documents (for pagination)
```

---

## 12. $limit

```js
{ $limit: 10 }  // Return only 10 documents

// Pagination combo: page 3, 10 per page
[
  { $skip: 20 },
  { $limit: 10 }
]
```

---

## 13. Transactions

ACID transactions across multiple documents/collections (MongoDB 4.0+).

```js
const session = await mongoose.startSession();
session.startTransaction();

try {
  await Account.findByIdAndUpdate(fromId, { $inc: { balance: -amount } }, { session });
  await Account.findByIdAndUpdate(toId, { $inc: { balance: amount } }, { session });
  await Transaction.create([{ from: fromId, to: toId, amount }], { session });

  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}
```

---

## 14. Replication

**Replica Set** — Group of MongoDB instances maintaining the same data for high availability.

```
Primary (read/write) → Secondary 1 (read replica) → Secondary 2 (read replica)
```

- **Primary** handles all writes
- **Secondaries** replicate data asynchronously
- If primary goes down → automatic **election** of new primary
- **Read preference:** primary, primaryPreferred, secondary, secondaryPreferred, nearest

---

## 15. Sharding

Distributes data across multiple servers for **horizontal scaling**.

```
               ┌─── Shard 1 (users A-M)
Client → Mongos Router ─┼─── Shard 2 (users N-Z)
               └─── Config Servers (metadata)
```

**Shard key** determines data distribution. Choose carefully — it can't be changed easily.

Good shard key: high cardinality, even distribution, frequently queried.

---

## 16. Schema Design

**Design principles:**
1. Design for your **query patterns**, not for normalization
2. Embed data that's read together
3. Reference data that's accessed independently
4. Avoid unbounded arrays (use bucketing)

```js
// E-commerce schema design
// Users (referenced)
{ _id, name, email, hashedPassword, role }

// Products (referenced)
{ _id, name, price, category, stock, images: [] }

// Orders (embedded items, referenced user)
{
  _id, userId: ObjectId, status: 'pending',
  items: [{ productId, name, price, qty }],  // Embedded (snapshot)
  total: 1500, shippingAddress: { /* embedded */ },
  createdAt
}
```

---

## 17. Mongoose

ODM (Object Data Modeling) library for MongoDB + Node.js.

```js
const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true }); // Adds createdAt, updatedAt

// Pre-save hook
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

const User = mongoose.model('User', userSchema);
```

---

## 18. populate()

Replaces ObjectId references with actual documents from other collections.

```js
// Schema
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [{ productId: { type: Schema.Types.ObjectId, ref: 'Product' }, qty: Number }],
});

// Populate
const order = await Order.findById(id)
  .populate('userId', 'name email')                // Select specific fields
  .populate('items.productId', 'name price');       // Nested populate

// Deep populate
const order = await Order.findById(id)
  .populate({
    path: 'userId',
    select: 'name',
    populate: { path: 'address', select: 'city' }  // Nested
  });
```

**Caveat:** Each `populate` = additional DB query. For complex joins, use `$lookup` in aggregation.

---

## 19. lean()

Returns plain JavaScript objects instead of Mongoose documents. **Much faster** for read-only operations.

```js
// Without lean: Returns Mongoose document (with methods, change tracking, getters)
const user = await User.findById(id);       // ~3x slower, more memory

// With lean: Returns plain object
const user = await User.findById(id).lean(); // ✅ Faster, less memory
// user.save() ❌ Not available — it's a plain object
```

**Use lean when:** You just need to read data (API responses, rendering).
**Don't use when:** You need to modify and save the document.

---

## 20. Virtual Fields

Fields that are NOT stored in the database but computed from other fields.

```js
const userSchema = new Schema({
  firstName: String,
  lastName: String,
});

// Virtual: fullName (not in DB)
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual populate (replace manual refs)
userSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'userId',
});

// Must enable in toJSON/toObject
userSchema.set('toJSON', { virtuals: true });

const user = await User.findById(id);
user.fullName; // "Murali Krishna" (computed, not stored)
```
