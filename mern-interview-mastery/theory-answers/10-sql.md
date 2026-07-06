# SECTION J: SQL & Relational Databases — Expert Answers

---

## 1. Tables & Relationships

In relational databases, data is stored in structured **tables** (relations) consisting of rows (tuples) and columns (attributes). **Relationships** between tables are enforced via keys and constraints.

### Key Constraints:
- **PRIMARY KEY**: Uniquely identifies each record in a table. Cannot be NULL.
- **FOREIGN KEY**: A column (or combination of columns) that establishes a link between data in two tables, enforcing referential integrity.
- **UNIQUE**: Ensures all values in a column are distinct.
- **NOT NULL**: Prevents NULL values from being inserted.
- **CHECK**: Enforces domain integrity by limiting the values that can be placed in a column (e.g., `age >= 18`).
- **DEFAULT**: Provides a default value when none is specified.

```sql
-- Create Users table (Parent Table)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT CHECK (age >= 18),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders table (Child Table referencing Users)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount > 0),
    status VARCHAR(20) DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 2. SQL vs NoSQL

The choice between relational (SQL) and non-relational (NoSQL) databases depends on structural requirements, scaling needs, and transactions.

| Feature | Relational (SQL) | Non-Relational (NoSQL) |
| :--- | :--- | :--- |
| **Data Model** | Tabular (Rows & Columns) | Documents, Key-Value, Columns, Graphs |
| **Schema** | Static, predefined schema | Dynamic, schema-less / flexible |
| **Scaling** | Vertical (Scale-up) | Horizontal (Scale-out / Sharding) |
| **Joins** | Native via SQL `JOIN` statements | Application-level or `$lookup` aggregation |
| **Transactions** | Strong ACID compliance | BASE (Eventually consistent), limited ACID |
| **Best For** | Structured data, complex queries, financial apps | Unstructured data, rapid prototyping, massive scale |

### Query Comparison:
```sql
-- SQL: Retrieve user with their orders
SELECT u.username, o.id, o.total_amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```
```js
// MongoDB Equivalent: Retrieve user with their orders
db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "userOrders"
    }
  }
]);
```

---

## 3. Normalization (1NF, 2NF, 3NF, BCNF)

Normalization is the process of organizing database fields and tables to minimize redundancy and dependency.

### Normal Forms:
1. **First Normal Form (1NF)**: All column values must be atomic (no arrays or multi-valued attributes), and each row must have a unique identifier (Primary Key).
2. **Second Normal Form (2NF)**: Must be in 1NF, and all non-key columns must be fully functionally dependent on the entire primary key (no partial dependencies on composite keys).
3. **Third Normal Form (3NF)**: Must be in 2NF, and no non-key column can be transitively dependent on another non-key column. All fields must depend "only on the key, the whole key, and nothing but the key."
4. **Boyce-Codd Normal Form (BCNF)**: A stronger version of 3NF. For every non-trivial functional dependency $X \rightarrow Y$, $X$ must be a superkey.

### Normalization Example (Denormalized to 3NF):
*Denormalized Table:*
`[OrderID, CustomerID, CustomerName, ItemID, ItemName, Quantity]`

*Normalized Structure (3NF):*
- **Customers Table**: `[CustomerID (PK), CustomerName]`
- **Items Table**: `[ItemID (PK), ItemName]`
- **Orders Table**: `[OrderID (PK), CustomerID (FK), OrderDate]`
- **OrderItems Table**: `[OrderID (FK), ItemID (FK), Quantity] (Composite PK: OrderID, ItemID)`

---

## 4. Denormalization

Denormalization is the process of strategically adding redundant data to a normalized database to improve read performance.

### When to Denormalize:
- **Read-heavy systems**: When joining multiple large tables degrades query response time.
- **Reporting & Analytics**: When aggregation operations (e.g., computing a user's total spending) are executed frequently.
- **Historical snapshots**: Storing the price of an item inside the `order_items` table at the moment of purchase, preventing price changes from retroactively altering past invoices.

```sql
-- Denormalized: Storing total_spent directly on user to avoid computing SUM(orders) on every profile load
ALTER TABLE users ADD COLUMN total_spent DECIMAL(12, 2) DEFAULT 0.00;

-- Maintain consistency via application logic or database triggers
CREATE OR REPLACE FUNCTION update_user_spent()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET total_spent = total_spent + NEW.total_amount 
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_order_inserted
AFTER INSERT ON orders
FOR EACH ROW EXECUTE FUNCTION update_user_spent();
```

---

## 5. Indexes (Clustered vs Non-Clustered)

Indexes are database lookup structures that accelerate queries at the cost of slower writes and extra disk usage.

### Clustered Index:
- Dictates the physical order of data storage on the disk.
- Only **one** clustered index is allowed per table.
- Created automatically when a Primary Key constraint is defined.

### Non-Clustered Index:
- Maintains a separate structure containing the indexed column values and a pointer (RowID or clustered key value) to the actual data row.
- Multiple non-clustered indexes can be created per table.
- Implemented as B-Tree structures in most Relational DBs (like PostgreSQL, MySQL).

```sql
-- Create non-clustered index on email column to speed up user lookups
CREATE INDEX idx_users_email ON users(email);

-- Drop index
DROP INDEX idx_users_email;
```

---

## 6. Composite Indexes

A composite index is an index built on multiple columns (e.g., `INDEX (col1, col2, col3)`).

### Leftmost Prefix Rule:
The query optimizer can only use a composite index if the query filters include the leftmost columns in the exact order they are defined.

```sql
-- Create composite index
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- ✅ Optimizer uses the index
SELECT * FROM orders WHERE user_id = 45;
SELECT * FROM orders WHERE user_id = 45 AND status = 'shipped';

-- ❌ Optimizer CANNOT use the index (skips the leftmost prefix user_id)
SELECT * FROM orders WHERE status = 'shipped';
```

---

## 7. SQL Joins

Joins combine rows from two or more tables based on a related column between them.

```
      INNER JOIN                      LEFT JOIN
    ┌───┐    ┌───┐                  ┌───┐    ┌───┐
    │   │ █▓ │   │                  │ █ │ █▓ │   │
    │ A │ █▓ │ B │                  │ A │ █▓ │ B │
    │   │ █▓ │   │                  │   │ █▓ │   │
    └───┘    └───┘                  └───┘    └───┘
 Matches in both tables           All A + matching B
```

### Join Types:
- **INNER JOIN**: Returns records that have matching values in both tables.
- **LEFT (OUTER) JOIN**: Returns all records from the left table, and matching records from the right table. Non-matching right rows are populated with NULL.
- **RIGHT (OUTER) JOIN**: Returns all records from the right table, and matching records from the left.
- **FULL (OUTER) JOIN**: Returns all records when there is a match in either left or right table.
- **CROSS JOIN**: Returns the Cartesian product of the two tables (every row of A paired with every row of B).
- **SELF JOIN**: A regular join, but the table is joined with itself.

```sql
-- Real-world multi-table join
SELECT 
    u.username,
    o.id AS order_id,
    o.total_amount,
    p.name AS product_name
FROM users u
INNER JOIN orders o ON u.id = o.user_id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id;
```

---

## 8. Subqueries vs Joins

A **subquery** is a query nested inside another query (e.g., inside `SELECT`, `FROM`, or `WHERE`).

### Subquery Types:
- **Non-correlated**: Evaluated once, independently of the outer query.
- **Correlated**: References columns of the outer query, evaluating once for every candidate row in the outer execution loop.

```sql
-- Subquery: Find users who spent more than the average order total
SELECT username 
FROM users 
WHERE id IN (
    SELECT user_id 
    FROM orders 
    WHERE total_amount > (SELECT AVG(total_amount) FROM orders)
);
```

### Performance Implication:
**Joins** are generally preferred over subqueries. Modern query optimizers flatten joins into efficient join trees, allowing the database to perform index scans/seeks. Correlated subqueries can act like nested loops, resulting in $O(N^2)$ execution times if not properly optimized.

---

## 9. Common Table Expressions (CTEs)

A Common Table Expression (CTE) is a temporary, named result set that exists solely within the execution scope of a single SQL statement.

### Benefits:
- Enhances query readability by replacing nested subqueries.
- Supports **Recursive Queries** (essential for handling hierarchical trees like organizational charts or nested categories).

```sql
-- CTE: Calculate user summaries and filter in a clean manner
WITH user_order_summary AS (
    SELECT 
        user_id,
        COUNT(id) AS total_orders,
        SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY user_id
)
SELECT u.username, s.total_orders, s.total_spent
FROM users u
INNER JOIN user_order_summary s ON u.id = s.user_id
WHERE s.total_spent > 1000.00;
```

---

## 10. Window Functions

Window functions perform calculations across a set of table rows related to the current row, without collapsing them into a single summary row (unlike `GROUP BY`).

### Syntax:
`FUNCTION() OVER (PARTITION BY partition_col ORDER BY sort_col)`

### Key Functions:
- `ROW_NUMBER()`: Assigns a unique sequential integer starting from 1.
- `RANK()`: Assigns ranking with gaps if duplicate values exist.
- `DENSE_RANK()`: Assigns ranking without gaps for duplicate values.
- `LEAD()` / `LAG()`: Accesses values from subsequent or preceding rows.

```sql
-- Window Function: Rank orders per user by total amount
SELECT 
    user_id,
    id AS order_id,
    total_amount,
    DENSE_RANK() OVER (PARTITION BY user_id ORDER BY total_amount DESC) as spending_rank
FROM orders;
```

---

## 11. Transactions & ACID Compliance

A transaction is a single unit of database work. Relational databases maintain data integrity via ACID principles:

- **Atomicity**: All statements in a transaction succeed, or the entire transaction is rolled back (All-or-Nothing).
- **Consistency**: Relational state transitions strictly respect schema constraints, foreign keys, and unique checks.
- **Isolation**: Concurrent transactions execute without interfering with each other's uncommitted modifications.
- **Durability**: Committed data is written to non-volatile storage (write-ahead logs) and survives crashes.

```sql
-- Transaction handling transfer of funds
BEGIN TRANSACTION;

UPDATE accounts 
SET balance = balance - 100.00 
WHERE user_id = 1 AND balance >= 100.00;

-- Check if deduction succeeded
-- If balance was insufficient, raise error and rollback

UPDATE accounts 
SET balance = balance + 100.00 
WHERE user_id = 2;

COMMIT; -- Or ROLLBACK if any error occurs
```

---

## 12. Transaction Isolation Levels

Concurrency phenomena occur when multiple transactions execute simultaneously:
- **Dirty Read**: Reading uncommitted changes made by another transaction.
- **Non-Repeatable Read**: Re-reading a row inside a transaction and finding different data because another transaction updated it.
- **Phantom Read**: Re-running a query returning a set of rows and finding new rows inserted by another transaction.

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :--- | :---: | :---: | :---: |
| **READ UNCOMMITTED** | Allowed | Allowed | Allowed |
| **READ COMMITTED** | Prevented | Allowed | Allowed |
| **REPEATABLE READ** | Prevented | Prevented | Allowed (MySQL InnoDB prevents it) |
| **SERIALIZABLE** | Prevented | Prevented | Prevented |

```sql
-- Set isolation level for current transaction
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

---

## 13. Query Optimization & EXPLAIN

Query tuning involves identifying slow operations in execution pipelines.

### Using EXPLAIN:
Prepend `EXPLAIN` or `EXPLAIN ANALYZE` (runs the query and records actual timings) to a query to view execution plans.

```sql
EXPLAIN ANALYZE 
SELECT * FROM users WHERE email = 'murali@example.com';
```

### Plan Node Analysis:
- **Seq Scan (Sequential Scan)**: Full table scan. $O(N)$ complexity. Indicates a missing index.
- **Index Scan / Index Seek**: B-Tree index lookup. $O(\log N)$ complexity. Efficient.
- **Nested Loop / Hash Join**: Indicates how tables are being merged.

### Optimization Rules:
- Avoid `SELECT *`. Retrieve only columns needed.
- Use index-friendly queries (avoid leading wildcards like `LIKE '%murali'`).
- Avoid using `OFFSET` for pagination on large datasets. Use **keyset pagination** (`WHERE id > last_seen_id LIMIT 10`).

---

## 14. Connection Pooling

Establishing a new database connection requires performing a TCP handshake, TLS negotiation, and database authentication, which introduces significant latency (often 50–100ms per request).

**Connection Pooling** maintains a cache of active database connections, permitting requests to borrow, use, and return connections to the pool immediately.

```js
// Node.js Connection Pool using pg (PostgreSQL driver)
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  max: 20,              // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Timeout if connection takes > 2 seconds
});

// Middleware usage
app.get('/api/users', async (req, res) => {
  let client;
  try {
    client = await pool.connect(); // Borrow connection from pool
    const result = await client.query('SELECT id, username FROM users LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (client) client.release(); // Return connection back to pool
  }
});
```

---

## 15. ORM vs Query Builder vs Raw SQL

Different database interaction libraries strike different balances between abstraction and performance.

| Approach | Developer Velocity | Execution Performance | Type Safety / Schema Sync |
| :--- | :--- | :--- | :--- |
| **Raw SQL** (e.g., `pg`, `mysql2`) | Low (Manual parsing) | **High** (Direct database driver execution) | Low (Manual type definitions) |
| **Query Builder** (e.g., `Knex.js`) | Medium | High | Medium |
| **ORM** (e.g., `Prisma`, `Sequelize`) | **High** (Auto-mapping, relations) | Medium (Abstraction overhead) | **High** (Auto-generated TypeScript types) |

- **Choose Raw SQL / Knex** when maximizing raw execution speeds, or building analytical platforms requiring highly customized queries.
- **Choose ORMs** (like Prisma) for standard CRUD APIs, where rapid development, schema migrations, and relational type safety are critical.

---

## 16. N+1 Query Problem in Relational Databases

The N+1 problem occurs when an application executes $1$ query to fetch a list of parent records, and then executes $N$ additional queries to fetch child records for each parent.

### The Problem (Lazy Loading with ORM):
```js
// Fetch 100 orders (1 query)
const orders = await Order.findAll({ limit: 100 });

for (const order of orders) {
  // Triggers 1 query per order to get the user (100 additional queries)
  const user = await order.getUser(); 
}
// Total DB queries: 101 (N + 1)
```

### The Solution (Eager Loading / Joins):
```js
// Single query using LEFT JOIN inside ORM
const orders = await Order.findAll({
  limit: 100,
  include: [{ model: User }]
});
// Under the hood, this translates to:
// SELECT * FROM orders LEFT JOIN users ON orders.user_id = users.id LIMIT 100;
```

---

## 17. Database Scaling: Replication

Replication copies data across multiple database nodes to ensure high availability and load distribution.

```
                  ┌───────────────┐
                  │ Primary Node  │ (Handles WRITE transactions)
                  └───────┬───────┘
                          │
            Asynchronous Replication Pipeline
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
   │ Read Replica │ │ Read Replica │ │ Read Replica │ (Handles READ queries)
   └─────────────┘ └─────────────┘ └─────────────┘
```

### Architecture Details:
- **Primary Node**: Accepts all mutations (INSERT, UPDATE, DELETE). Writes changes to the Write-Ahead Log (WAL) first.
- **Replicas**: Stream the WAL to apply mutations locally. Used to offload search and read operations.
- **Replication Lag**: Since replication is typically asynchronous to prevent write blocks, replicas can be milliseconds or seconds behind the primary. Applications must direct critical reads (e.g., checking password verification right after updating it) to the Primary.

---

## 18. Database Scaling: Partitioning vs Sharding

When data outgrows the storage of a single node, we partition or shard the database.

### Partitioning (Single Instance):
Splitting a large table into smaller physical parts (partitions) on the same database server, while exposing it as a single logical table.
- **Range Partitioning**: Partition by date range (e.g., one partition per month).
- **List Partitioning**: Partition by values (e.g., country code).

### Sharding (Multiple Instances):
Distributing rows of a database table across completely separate database servers (shards) based on a **Shard Key**.
- **Challenges**:
  - Joins across different database servers are extremely expensive/unsupported.
  - Transactions spanning multiple shards require complex two-phase commit (2PC) protocols.
  - Re-sharding when a shard becomes a hotspot is operations-heavy.

---

## 19. Migrations & Schema Evolution

Database migrations track schema changes over time in source control, allowing developers to keep databases across production, staging, and local environments in sync.

Migrations are written as files containing two primary scripts:
- **UP**: Modifies the database schema (e.g., adds columns, creates tables).
- **DOWN**: Reverts the schema changes (e.g., drops columns, drops tables).

```sql
-- Migration File: 20260706_add_status_to_orders.up.sql
ALTER TABLE orders ADD COLUMN status VARCHAR(20) DEFAULT 'pending';
CREATE INDEX idx_orders_status ON orders(status);

-- Migration File: 20260706_add_status_to_orders.down.sql
DROP INDEX idx_orders_status;
ALTER TABLE orders DROP COLUMN status;
```

---

## 20. Database Security: SQL Injection (SQLi)

SQL Injection occurs when an attacker inputs malicious SQL statements into web inputs, tricking the database interpreter into executing unauthorized queries.

### Vulnerable Code (String Interpolation):
```js
// If input is: ' OR '1'='1
const query = `SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;

// Database executes:
// SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '...'
// Result: Authenticates attacker as the first user in the table.
```

### Secure Code (Parameterized Queries):
Parameterized queries compile the SQL query template first, and treat user inputs strictly as parameters (data), never as executable SQL code.

```js
// Parameterized query using placeholders
const text = 'SELECT * FROM users WHERE username = $1 AND password = $2';
const values = [req.body.username, req.body.password];

const res = await pool.query(text, values); // Secure
```
