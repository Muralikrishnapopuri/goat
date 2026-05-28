# 09. Top 50+ SQL Interview Questions & Scenarios

This guide compiles **50+ high-frequency SQL interview questions** ranging from technical coding challenges to deep architectural and system design scenarios. Each coding problem includes the query, explanations, and runtime complexity analysis.

---

## 💻 Section 1: Classic Practical Coding Challenges

### 1. Find the N-th Highest Salary
* **The Question:** *"Find the 3rd highest salary from the `employees` table."*

#### Solution A: Using `LIMIT/OFFSET` (Fast, Dialect-Specific)
```sql
SELECT DISTINCT salary 
FROM employees 
ORDER BY salary DESC 
LIMIT 1 OFFSET 2; -- Skips top 2, returns the 3rd
```
* *Pros:* Simple, very fast on indexed columns ($O(\log N)$).
* *Cons:* Fails if there are fewer than 3 unique salaries.

#### Solution B: Using Correlated Subquery (Universal ANSI)
```sql
SELECT DISTINCT e1.salary
FROM employees e1
WHERE 3 = (
    SELECT COUNT(DISTINCT e2.salary)
    FROM employees e2
    WHERE e2.salary >= e1.salary
);
```
* *How it works:* Finds the salary where exactly 3 unique salaries are greater than or equal to it.
* *Complexity:* Slow ($O(N^2)$) as it executes the subquery for every row.

#### Solution C: Using Window Functions (Best Practice)
```sql
WITH RankedSalaries AS (
    SELECT salary, 
           DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
)
SELECT salary 
FROM RankedSalaries 
WHERE rnk = 3
LIMIT 1;
```
* *Pros:* Correctly handles duplicate salaries using `DENSE_RANK()`.

---

### 2. Delete Duplicate Records (Keep only the minimum ID)
* **The Question:** *"You have a table `users(id, email, name)` with duplicate email records. Delete the duplicates, keeping only the record with the lowest `id`."*

```sql
-- 🛠️ Solution using a Subquery Join
DELETE FROM users
WHERE id NOT IN (
    SELECT min_id FROM (
        SELECT MIN(id) AS min_id 
        FROM users 
        GROUP BY email
    ) AS temp
);
```
* *Note:* The double nesting (`FROM (SELECT...) AS temp`) is required in MySQL to avoid the error: *"You can't specify target table for update in FROM clause"*.

---

### 3. The Gaps and Islands Problem (Active User Login Streaks)
* **The Question:** *"Find all users who logged in for at least 3 consecutive days."*
* **Schema:** `logins (user_id, login_date)`

This is a legendary senior SQL question designed to test how you group contiguous sequences ("islands") separated by gaps.

#### 🚀 The Elegant Row Number Difference Technique:
If we assign a sequential row number to a user's chronological logins, and subtract that row number from the login date, **consecutive dates will yield the exact same anchor date!**

| User | Login Date | Row Number | Difference Date (Login - RowNum) |
| :--- | :--- | :--- | :--- |
| 1 | 2026-05-01 | 1 | **2026-04-30** (Consecutive Island 1) |
| 1 | 2026-05-02 | 2 | **2026-04-30** (Consecutive Island 1) |
| 1 | 2026-05-03 | 3 | **2026-04-30** (Consecutive Island 1) |
| 1 | 2026-05-06 | 4 | **2026-05-02** (New Island 2) |

```sql
WITH RankedLogins AS (
    -- 1. Get unique daily logins per user and sort them chronologically
    SELECT DISTINCT user_id, login_date
    FROM logins
),
GroupedIslands AS (
    -- 2. Subtract row number from date to create a constant "island key"
    SELECT user_id, login_date,
           (login_date - INTERVAL '1 day' * ROW_NUMBER() OVER (
               PARTITION BY user_id ORDER BY login_date
           )) AS island_key
    FROM RankedLogins
)
-- 3. Group by the island key and filter those with count >= 3
SELECT user_id, MIN(login_date) AS streak_start, MAX(login_date) AS streak_end, COUNT(*) AS streak_length
FROM GroupedIslands
GROUP BY user_id, island_key
HAVING COUNT(*) >= 3;
```

---

### 4. Department-Wise Top Earners
* **The Question:** *"Find the highest-paid employee in each department."*

```sql
WITH RankedSales AS (
    SELECT name, department_id, salary,
           RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
    FROM employees
)
SELECT name, department_id, salary
FROM RankedSales
WHERE rnk = 1;
```
* *Why `RANK()`?* If two employees in a department share the highest salary, `RANK()` ensures both are returned.

---

### 5. Calculating Running Balances / Totals
* **The Question:** *"Given a `transactions(id, account_id, date, amount)` table, write a query to compute the running balance for each account over time."*

```sql
SELECT account_id, date, amount,
       SUM(amount) OVER (
           PARTITION BY account_id 
           ORDER BY date, id
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_balance
FROM transactions;
```

---

### 6. Dynamic Pivoting (Rows to Columns)
* **The Question:** *"Convert the table `monthly_sales(year, month, revenue)` into a pivot table showing columns for `Q1_revenue`, `Q2_revenue`, etc."*

```sql
SELECT year,
       SUM(CASE WHEN month IN (1,2,3) THEN revenue ELSE 0 END) AS Q1_revenue,
       SUM(CASE WHEN month IN (4,5,6) THEN revenue ELSE 0 END) AS Q2_revenue,
       SUM(CASE WHEN month IN (7,8,9) THEN revenue ELSE 0 END) AS Q3_revenue,
       SUM(CASE WHEN month IN (10,11,12) THEN revenue ELSE 0 END) AS Q4_revenue
FROM monthly_sales
GROUP BY year;
```

---

### 7. Managers with 5+ Direct Reports
* **The Question:** *"Find the names of managers who supervise at least 5 direct reports."*

```sql
SELECT m.name
FROM employees e
INNER JOIN employees m ON e.manager_id = m.id
GROUP BY m.id, m.name
HAVING COUNT(e.id) >= 5;
```

---

### 8. Calculate Daily Active Users (DAU) & Monthly Active Users (MAU)
* **The Question:** *"Find the ratio of DAU to MAU for user login activity."*

```sql
WITH DailyActive AS (
    SELECT login_date, COUNT(DISTINCT user_id) AS dau
    FROM logins
    GROUP BY login_date
),
MonthlyActive AS (
    SELECT DATE_TRUNC('month', login_date) AS month, COUNT(DISTINCT user_id) AS mau
    FROM logins
    GROUP BY DATE_TRUNC('month', login_date)
)
SELECT d.login_date, d.dau, m.mau,
       ROUND(d.dau::NUMERIC / m.mau, 4) AS engagement_ratio
FROM DailyActive d
INNER JOIN MonthlyActive m ON DATE_TRUNC('month', d.login_date) = m.month;
```

---

### 9. Find Products Bought by All Customers
* **The Question:** *"Find products purchased by every customer in the database."*

```sql
SELECT product_id
FROM purchases
GROUP BY product_id
HAVING COUNT(DISTINCT customer_id) = (SELECT COUNT(*) FROM customers);
```

---

### 10. Swap Genders / Flip Values in Single Update
* **The Question:** *"In the `salary` table, swap all 'f' and 'm' values in the `sex` column with a single `UPDATE` query."*

```sql
UPDATE salary
SET sex = CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END;
```

---

## 🏛️ Section 2: Theoretical & Architectural Scenarios

### 11. Why is `SELECT *` discouraged in production?
* **Answer:**
  1. **Network Overhead:** Pulls unnecessary columns (especially large `TEXT` or `BLOB` fields), exhausting network bandwidth.
  2. **Covering Indexes:** Prevents the query planner from using an Index-Only Scan.
  3. **Schema Instability:** If columns are added or removed, it can break application models mapping query inputs.
  4. **Memory Utilization:** Causes extra work for database sorting/hashing operations.

### 12. How do you troubleshoot a slow query in production?
* **Answer:**
  1. **Measure Metrics:** Use APM tools to get query runtimes and database CPU usage.
  2. **Profile with `EXPLAIN ANALYZE`:** Review the execution plan. Check for Sequential Scans, hash/nest loops, and disk spills.
  3. **Check Indexes:** Ensure the columns used in `WHERE`, `JOIN`, and `ORDER BY` are properly indexed.
  4. **Look for non-SARGable code:** Remove functions on indexed columns.
  5. **Analyze Statistics:** Run `ANALYZE table_name` to update the query planner's row distribution estimation.

### 13. How does MVCC work under the hood?
* **Answer:** **Multi-Version Concurrency Control (MVCC)** allows writers to not block readers, and vice versa. Instead of locking a row during updates, the database writes a *new version* of the row. Transactions read a consistent snapshot of the database at a specific point in time (determined by Transaction IDs). Older versions are cleaned up later by a background process (like Postgres Vacuum).

### 14. What are candidate keys vs. primary keys?
* **Answer:**
  * **Candidate Key:** A column or set of columns that can uniquely identify a row. There can be multiple candidate keys in a table.
  * **Primary Key:** The single candidate key selected by the database designer to act as the primary unique identifier.
  * **Alternate Key:** Any candidate key that was *not* chosen as the primary key.

### 15. What is the difference between sharding and partitioning?
* **Answer:**
  * **Partitioning:** Splitting a large table into smaller physical parts *within the same database engine* (e.g. partitioning sales by year). The application still queries a single table.
  * **Sharding:** Distributing rows across **multiple independent physical database servers** (horizontal scaling). The application must route queries to the correct database instance.

---

## ⚡ Section 3: Rapid-Fire Key Concepts (Questions 16–50)

Here is a compiled checklist of 35 additional core terms and short-answer questions critical for final-round engineering interviews:

| # | Question / Concept | Core Interview Concept & Takeaway |
| :--- | :--- | :--- |
| **16** | **Write-Ahead Logging (WAL)** | Log written to disk *before* data pages are updated. Guarantees Durability. |
| **17** | **Phantom vs. Non-Repeatable Read** | Non-repeatable = row *updates*. Phantom = row *inserts/deletions*. |
| **18** | **Index cardinality** | The uniqueness of values in a column. Low cardinality (e.g. Gender) = poor index candidate. |
| **19** | **Covering Index** | An index that contains all columns queried. Resolves to Index Only Scan. |
| **20** | **SARGable** | Search Argument Able. Queries structured to directly utilize B-Tree indices. |
| **21** | **Star Schema vs Snowflake Schema** | Star: Fact table joined to denormalized Dimension tables. Snowflake: Normalized Dimensions. |
| **22** | **Dirty Read** | Reading data from a transaction that has not committed yet. |
| **23** | **Foreign Key RESTRICT vs NO ACTION** | RESTRICT checks immediately; NO ACTION checks at end of transaction statement. |
| **24** | **OLTP vs OLAP** | OLTP: Operational transactional databases (fast writes). OLAP: Analytics (huge reads). |
| **25** | **B-Tree search time** | $O(\log N)$ average and worst case. |
| **26** | **Hash Join memory usage** | High space overhead. Requires building a memory hash table of the smaller table. |
| **27** | **Recursive CTE anchor** | The initial static query that kicks off the recursive query chain. |
| **28** | **Correlated Subquery cost** | Evaluates the inner query for *every* outer row. Very low efficiency. |
| **29** | **LAG vs LEAD** | LAG looks back; LEAD looks ahead. |
| **30** | **NULL behavior with standard math** | `10 + NULL` or `5 * NULL` returns `NULL`. |
| **31** | **Safe string aggregation** | Avoids string truncation limits by using database-specific arrays or custom limits. |
| **32** | **CTE Materialization barrier** | Prior to Postgres 12, CTEs acted as limits, preventing outer index injection. |
| **33** | **Index-Only Scan requirement** | Selected columns must be part of the index; index pages must be in memory. |
| **34** | **What resets Auto-Increment seed?** | `TRUNCATE` resets seed; `DELETE` maintains it. |
| **35** | **CAP Theorem inside SQL** | RDBMS prioritizes **C**onsistency and **A**vailability over **P**artition Tolerance. |
| **36** | **Clustered index limit** | Strictly 1 per table. Rows can physically exist in only one sorted order. |
| **37** | **Deadlock wait timeout** | Database system cancels transaction if lock is blocked beyond configured limit. |
| **38** | **Optimistic lock version** | Safe integer or timestamp updated upon every write check. |
| **39** | **Nested Loop Join best case** | Outer table is tiny, inner table has a B-Tree index on join column. |
| **40** | **Composite Index column order** | Put high-selectivity and equality columns first, ranges last. |
| **41** | **COALESCE vs IFNULL** | COALESCE takes multiple arguments (ANSI standard); IFNULL takes exactly 2 (MySQL). |
| **42** | **Venn Diagram Joins limitations** | A JOIN is a Cartesian product filtering matching keys, not simple set intersections. |
| **43** | **DB Vacuuming / Auto-vacuum** | Reclaims dead row pages generated by MVCC inserts and updates. |
| **44** | **Database Connection Pools** | Limits connection establishment latency by reusing active DB threads. |
| **45** | **Write Amplification** | Multi-index tables force one insert to trigger multiple index write operations. |
| **46** | **Denormalization trade-offs** | Drastically speeds up reads, but risks data inconsistencies and slows writes. |
| **47** | **Prepared Statements** | Pre-compiles execution plans, protecting databases from SQL Injection. |
| **48** | **Window Partition vs Group By** | Partition calculates values without collapsing rows. Group By reduces row count. |
| **49** | **S-Lock and X-Lock compatibility** | S-Locks are compatible with S-Locks. X-Locks are incompatible with all locks. |
| **50** | **Zero-Downtime Migration** | 1. Add nullable column. 2. Write values. 3. Deploy code. 4. Remove old column. |
| **51** | **Cursor performance** | Row-by-row procedural scan. Extremely slow in relational engines; avoid in favor of set operations. |
