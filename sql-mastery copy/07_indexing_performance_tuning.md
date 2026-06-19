# 07. Indexing & Query Performance Tuning

Query optimization separates senior engineers from developers. Designing the correct indexes and writing queries that leverage those indexes is the single most effective way to scale database systems.

---

## 🏗️ Physical Index Structures

An index is a separate data structure (typically a tree or hash map) that points to physical row locations. It speeds up reads at the cost of slower writes (due to index update overhead).

```
   ┌────────────────────────────────────────────────────────┐
   │                       B-Tree Index                     │
   │               (Optimal for Range & Sorting)            │
   └───────────────────────────┬────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
  ┌──────────────────┐                  ┌──────────────────┐
  │    Node [A-M]    │                  │    Node [N-Z]    │
  └────────┬─────────┘                  └────────┬─────────┘
           │                                     │
     ┌─────┴─────┐                         ┌─────┴─────┐
     ▼           ▼                         ▼           ▼
  [Alice]     [Frank]                   [Peter]     [Zach]
```

### 1. B-Tree Index (Balanced Tree)
* **How it works:** Keeps data sorted and allows search, sequential access, insertions, and deletions in logarithmic time $O(\log N)$.
* **Capabilities:** Highly versatile. Excellent for exact matches (`=`), range queries (`<`, `>`, `BETWEEN`), pattern matching starting with prefixes (`LIKE 'abc%'`), and sorting (`ORDER BY`).
* **The Golden Standard:** B-Tree is the default index type in almost all databases.

### 2. Hash Index
* **How it works:** Uses a hash function to map keys to value pointers.
* **Capabilities:** Extremely fast exact match lookups ($O(1)$ complexity).
* **Limitations:** **Cannot** perform range searches, sorting, or prefix matching. Completely useless for `<` or `>`. Only available in select dialects (e.g., memory tables in MySQL, explicitly declared in Postgres).

---

## ⚔️ Clustered vs. Non-Clustered Indexes

This is an essential architectural concept that interviewers love to test.

| Feature | Clustered Index | Non-Clustered Index |
| :--- | :--- | :--- |
| **Physical Storage** | Dictates the **physical layout of rows on disk**. The leaf nodes *are* the actual data rows. | A completely separate data structure. The leaf nodes contain pointers (Row IDs or Clustered Keys) to the actual data rows. |
| **Quantity Limit** | **Max 1 per table** (data can only be ordered physically in one way). | **Multiple** (usually up to 999 depending on the database). |
| **Creation** | Automatically created when defining a Primary Key in most DBs. | Created manually with `CREATE INDEX`. |
| **Disk Overhead** | Zero extra storage space (it is the table itself). | Substantial disk footprint because it duplicates index keys and row pointers. |

---

## 🧩 The Leftmost Prefix Rule (Composite Indexes)

A composite index is an index built on multiple columns, e.g. `INDEX idx_user_loc (country, state, city)`.

> [!IMPORTANT]
> **The Ordering Rule:** The order of columns in a composite index matters immensely. You can think of a composite index like a phone book, which is sorted first by *Last Name*, then *First Name*. If you only search by *First Name*, the sorted phone book is useless.

Suppose we have an index on columns `(A, B, C)`:
* **`WHERE A = 1 AND B = 2 AND C = 3`** ➡️ **Uses full index.**
* **`WHERE A = 1 AND B = 2`** ➡️ **Uses partial index** (A and B).
* **`WHERE A = 1`** ➡️ **Uses partial index** (A only).
* **`WHERE B = 2 AND C = 3`** ➡️ ❌ **Cannot use index.** (Violates the Leftmost Prefix Rule because column `A` is missing).
* **`WHERE A = 1 AND C = 3`** ➡️ **Uses index for A only.** It cannot use the index for C because B was skipped.

---

## 🔎 Analyzing Execution Plans (`EXPLAIN`)

To understand how a database executes a query, prefix it with `EXPLAIN` (or `EXPLAIN ANALYZE` for real-time execution statistics).

Key terms you must look for in query plans:
1. **Sequential Scan (Seq Scan) / Full Table Scan (ALL)**:
   * *Meaning:* The engine scans every single row on disk. **Bad** for large tables.
2. **Index Scan (Index Scan)**:
   * *Meaning:* The engine traverses the B-Tree to find matching keys, then fetches the actual row from disk. Good.
3. **Index Only Scan (Covering Index)**:
   * *Meaning:* The engine gets all the required data directly from the index structure without ever looking at the physical table disk pages. **The fastest possible query.**
4. **Bitmap Index Scan**:
   * *Meaning:* (PostgreSQL) Finds matching pointers in the index, builds an in-memory bitmap, then fetches table pages in physical disk order to minimize read-head movements.

---

## 🚫 SARGable Queries: Writing Search-Optimized SQL

A query is **SARGable** (Search Argument Able) if the query planner can utilize an index to speed up execution. If you apply calculations, cast types, or manipulate columns in your `WHERE` filter, you make the query **non-SARGable**, forcing a full table scan.

### Side-by-Side Optimization Guide:

| Non-SARGable (❌ Bad / Slow) | SARGable ( SARGable / Fast) | Why? |
| :--- | :--- | :--- |
| `WHERE YEAR(created_at) = 2026` | `WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'` | Wrapping `created_at` in a function forces the engine to run the function on *every single row* before matching. |
| `WHERE price * 1.10 > 100` | `WHERE price > 100 / 1.10` | Keep the indexed column isolated on one side of the operator. |
| `WHERE name LIKE '%john%'` | `WHERE name LIKE 'john%'` | Leading wildcards prevent B-Tree index traversal. |
| `WHERE COALESCE(status, 'active') = 'active'` | `WHERE status = 'active' OR status IS NULL` | Functions like `COALESCE` block index utilization. |

---

## ⚠️ The N+1 Query Problem

While technically an ORM/application problem, the N+1 query pattern is the #1 cause of database performance degradation in production web apps.

### The Scenario:
You want to list 100 blog posts and display their authors' names.
* **ORM Behavior (Lazy Loading):**
  * Query 1: `SELECT * FROM posts LIMIT 100;` (1 query)
  * Loop through each post:
    * Query 2..101: `SELECT * FROM authors WHERE id = [post.author_id];` (**N queries**)
  * **Total Queries:** $1 + 100 = 101$ queries!

### The Solution:
Perform a single query utilizing an explicit `JOIN` or tell your ORM to **Eager Load** using subselects:
```sql
-- Clean SQL Eager Join Solution (1 Query!)
SELECT p.*, a.name AS author_name
FROM posts p
INNER JOIN authors a ON p.author_id = a.id
LIMIT 100;
```

---

## 🎯 Interview Checkpoints & Questions

1. **Why does placing a function on a column in the `WHERE` clause hurt performance?**
   * *Answer:* It makes the query non-SARGable. The B-Tree index is built on the raw column values, not the outputs of the function. To evaluate `WHERE FUNCTION(col) = value`, the engine is forced to scan the entire table and run the function on every single row.
2. **What is a "Covering Index" and why is it so fast?**
   * *Answer:* A covering index is an index that contains all the columns projected in the `SELECT` list and referenced in the `WHERE` / `JOIN` clauses. Because all required data resides inside the index, the query planner can execute an **Index Only Scan**, skipping the expensive step of retrieving raw rows from the physical disk table.
3. **If you have a composite index on `(last_name, first_name)`, will a query searching `WHERE first_name = 'John'` use the index?**
   * *Answer:* No, it will not. Composite indexes obey the Leftmost Prefix Rule. Because the index is sorted hierarchically starting with `last_name`, searching by the second column `first_name` alone is like looking for a first name in a standard phone book without knowing the last name—it forces a full scan.
