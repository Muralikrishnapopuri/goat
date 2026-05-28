# 01. SQL Fundamentals & Filtering

Understanding the foundational concepts of SQL is not just about memorizing syntax—it's about understanding **how the SQL engine compiles and executes** your query under the hood. This guide covers fundamental keywords, logical order of execution, 3-valued logic, and query pagination optimizations.

---

## ⚙️ The Logical Order of Query Execution

In standard programming languages, code runs sequentially from top to bottom. In SQL, **the order you write a query is NOT the order the database executes it.**

### Written Order vs. Execution Order

```
[Written Order]                   [Logical Execution Order]
1. SELECT                         1. FROM / JOIN
2. DISTINCT                       2. WHERE
3. FROM                           3. GROUP BY
4. JOIN ... ON                    4. HAVING
5. WHERE                          5. SELECT
6. GROUP BY                       6. DISTINCT
7. HAVING                         7. ORDER BY
8. ORDER BY                       8. LIMIT / OFFSET
9. LIMIT / OFFSET
```

### 🧠 Why this matters for interviews:
* **The `HAVING` vs `WHERE` rule:** You cannot use aggregate functions inside a `WHERE` clause because `WHERE` runs in Step 2, *before* groups are created in Step 3. You must use `HAVING` (Step 4) instead.
* **Column Aliases:** You cannot reference a column alias defined in the `SELECT` clause (Step 5) inside the `WHERE` clause (Step 2). For example:
  ```sql
  -- ❌ Invalid! will throw "unknown column 'total_price'"
  SELECT price * quantity AS total_price 
  FROM orders 
  WHERE total_price > 100;
  
  --  Valid!
  SELECT price * quantity AS total_price 
  FROM orders 
  WHERE (price * quantity) > 100;
  ```
  *Note: Some database engines (like MySQL/PostgreSQL) allow aliases in `ORDER BY` because it runs after `SELECT`.*

---

## 3-Valued Logic (3VL) & `NULL` Handling

In SQL, a boolean expression can evaluate to one of three values:
1. `TRUE`
2. `FALSE`
3. `UNKNOWN`

Any comparison with `NULL` (using `=`, `!=`, `<`, `>`, `LIKE`) evaluates to `UNKNOWN`—not `TRUE` or `FALSE`.

### Truth Table with `UNKNOWN`
* `TRUE AND UNKNOWN` ➡️ `UNKNOWN`
* `FALSE AND UNKNOWN` ➡️ `FALSE`
* `TRUE OR UNKNOWN` ➡️ `TRUE`
* `FALSE OR UNKNOWN` ➡️ `UNKNOWN`
* `NOT UNKNOWN` ➡️ `UNKNOWN`

### 💡 High-Yield Interview Gotcha: `NOT IN` with `NULL`s
Consider this question: *"Find all employees who are not managers."*
```sql
-- Table: employees (id, name, manager_id)
-- Assume manager_id contains NULL for the CEO.

-- ❌ THIS WILL RETURN ZERO ROWS!
SELECT name 
FROM employees 
WHERE id NOT IN (SELECT manager_id FROM employees);
```
**Why?**
The subquery returns a list containing `NULL` (e.g., `[1, 2, NULL]`).
The `NOT IN` clause translates to:
`id != 1 AND id != 2 AND id != NULL`
Since `id != NULL` evaluates to `UNKNOWN`, the entire logical expression becomes `UNKNOWN` (due to `AND` rules), and no rows are returned!

**The Correct Solution:**
Use `NOT EXISTS` (which handles nulls correctly) or filter out `NULL` in the subquery:
```sql
--  Solution A: Using NOT EXISTS
SELECT e.name 
FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM employees m WHERE m.manager_id = e.id
);

--  Solution B: Filtering NULL
SELECT name 
FROM employees 
WHERE id NOT IN (
    SELECT manager_id FROM employees WHERE manager_id IS NOT NULL
);
```

---

## 📌 Keywords & Operations

### 1. `DISTINCT`
Removes duplicates.
* **Performance Impact:** `DISTINCT` requires the database to sort or hash the entire result set in memory or disk to find duplicates. Do not use it unless absolutely necessary.
* **Alternative:** Often, a correct `JOIN` or `EXISTS` query removes the need for `DISTINCT` entirely.

### 2. Wildcards: `LIKE` vs `ILIKE` / `REGEXP`
* `%` matches zero or more characters.
* `_` matches exactly one character.
* `ILIKE` is case-insensitive (PostgreSQL specific).
* **Index Impact:**
  * `column LIKE 'prefix%'` is **SARGable** (Search Argument Able) and can use a standard B-Tree index.
  * `column LIKE '%suffix'` is **NOT SARGable** and forces a full table scan.

### 3. `LIMIT` and `OFFSET` (Pagination Pitfalls)
When implementing pagination, the standard approach is:
```sql
SELECT id, name FROM users ORDER BY created_at DESC LIMIT 10 OFFSET 50000;
```
> [!WARNING]
> **Performance Nightmare:** `OFFSET 50000` tells the database to read 50,010 rows, discard the first 50,000, and return the remaining 10. As the offset increases, the query gets slower and slower.

#### 🚀 Senior Interview Solution: Keyset Pagination (Seek Method)
Instead of skipping rows, filter on the last seen value:
```sql
-- Page 1
SELECT id, name, created_at 
FROM users 
ORDER BY created_at DESC, id DESC 
LIMIT 10;

-- Page 2 (Assume last row on Page 1 had created_at = '2026-05-28 12:00:00' and id = 405)
SELECT id, name, created_at 
FROM users 
WHERE (created_at < '2026-05-28 12:00:00') 
   OR (created_at = '2026-05-28 12:00:00' AND id < 405)
ORDER BY created_at DESC, id DESC 
LIMIT 10;
```
This query uses a composite index on `(created_at, id)` to instantly jump to the starting point, maintaining $O(\log N)$ performance regardless of the page number.

---

## ⚔️ The Ultimate Comparison: `DELETE` vs `TRUNCATE` vs `DROP`

This is a classic warm-up interview question designed to test your understanding of SQL command classifications (DML vs DDL), rollback safety, and system level execution.

| Feature | `DELETE` | `TRUNCATE` | `DROP` |
| :--- | :--- | :--- | :--- |
| **Command Category** | **DML** (Data Manipulation Language) | **DDL** (Data Definition Language) | **DDL** (Data Definition Language) |
| **How it Works** | Scans and deletes rows one-by-one. | De-allocates the data pages containing the table data. | Deletes the table definition, data, indexes, and triggers from disk. |
| **Transaction Safety** | **Safe.** Can be rolled back inside a transaction. | Depends on DB (Safe in PostgreSQL; cannot be rolled back in MySQL/Oracle). | Cannot be rolled back in most databases. |
| **Performance** | Slow (generates logs and system overhead per row). | Extremely Fast (constant time $O(1)$ operation). | Instantaneous. |
| **Triggers** | Fires `BEFORE/AFTER DELETE` triggers. | Does **NOT** fire any triggers. | Does **NOT** fire any triggers. |
| **Auto-Increment Reset**| Does **NOT** reset auto-increment seed counter. | Resets the auto-increment seed counter back to 1. | N/A (Table is deleted). |
| **WHERE Clause** | **Allowed** (can delete specific rows). | **Forbidden** (deletes all rows). | **Forbidden** (deletes the entire structure). |

---

## 🎯 Interview Checkpoints & Questions

1. **Why does `SELECT ColA, COUNT(*) FROM MyTable WHERE ColA = 1` fail in most SQL dialects?**
   * *Answer:* It fails because `ColA` is not in a `GROUP BY` clause. When using aggregate functions like `COUNT(*)`, all non-aggregated columns in the `SELECT` list must be explicitly grouped.
2. **What is three-valued logic and how does it affect boolean algebra?**
   * *Answer:* Three-valued logic includes `TRUE`, `FALSE`, and `UNKNOWN`. Any comparison with `NULL` yields `UNKNOWN`. In logic gates: `TRUE AND UNKNOWN` = `UNKNOWN`, whereas `FALSE AND UNKNOWN` = `FALSE`.
3. **If you have a table with 10 million rows, how would you design pagination for high scalability?**
   * *Answer:* I would avoid using `OFFSET` because it scales linearly $O(N)$ as pagination depth increases. Instead, I would use **Keyset Pagination (Seek Method)**, filtering on the last-retrieved tuple `(sort_column, primary_key)` which utilizes a composite index for an $O(\log N)$ point search.
