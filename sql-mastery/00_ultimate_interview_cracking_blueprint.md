# 🎯 Ultimate SQL Interview-Cracking Blueprint
> **The fastest path to master SQL for technical interviews. Forget memorizing 100 queries; learn the 5 underlying core mental models.**

---

## 🧠 Part 1: Shift Your Mindset (Procedural vs. Declarative)

If you are coming from JavaScript/Node.js, SQL can be highly confusing because:
* **Javascript (Procedural):** You tell the computer *how* to do something step-by-step (e.g., `for` loops, `.filter()`, `.map()`).
* **SQL (Declarative):** You tell the computer *what data you want*, and the database engine decides *how* to fetch it.

### ⚠️ The Golden Rule: The Compiler's Order of Operations
In JS, you read code top-to-bottom. In SQL, the query looks like it starts with `SELECT`, but under the hood, **the database compiles it starting from the `FROM` clause!**

```
[Written Order]                       [Logical Execution Order]
1. SELECT                             1. FROM & JOINs (Where are we looking?)
2. DISTINCT                           2. WHERE (Filter individual rows)
3. FROM                               3. GROUP BY (Combine rows into buckets)
4. JOIN ... ON                        4. HAVING (Filter the bucketed groups)
5. WHERE                              5. SELECT (Choose the columns/values)
6. GROUP BY                           6. DISTINCT (Remove duplicate rows)
7. HAVING                             7. ORDER BY (Sort final results)
8. ORDER BY                           8. LIMIT / OFFSET (Slice the output)
9. LIMIT / OFFSET
```

> [!IMPORTANT]
> **Interview Trap #1:** Why can't you use `WHERE total_revenue > 1000`?
> Because `WHERE` runs in Step 2, but group aggregates (`SUM()`, `AVG()`) aren't computed until after Step 3. You must use `HAVING SUM(revenue) > 1000` (Step 4) instead!

---

## 🤝 Part 2: Visualizing Joins (Why Venn Diagrams Lie)

Traditional online tutorials use Venn diagrams, which are misleading because joins do not just filter sets; they **stitch rows horizontally** and can **multiply rows**.

Think of Joins as **Horizontal Fabric Stitching**:

| Join Type | What it does | If No Match Found... |
| :--- | :--- | :--- |
| **`INNER JOIN`** | Returns rows only when keys match in **both** tables. | Row is discarded completely. |
| **`LEFT JOIN`** | Keeps **all** rows from the Left table. | Right columns are padded with `NULL`. |
| **`RIGHT JOIN`** | Keeps **all** rows from the Right table. | Left columns are padded with `NULL` (Rarely used, rewrite as `LEFT JOIN`). |
| **`FULL OUTER`** | Keeps all rows from both tables. | Missing keys on either side are padded with `NULL`. |
| **`CROSS JOIN`** | Multiplies every row of Table A with every row of Table B. | Cartesian Product (e.g., 10 rows $\times$ 10 rows = 100 rows). |

### ⚠️ The Row Multiplication Trap
If Table A has 3 rows with `id = 1` and Table B has 4 rows with `id = 1`, an `INNER JOIN` will result in $3 \times 4 = 12$ rows! Always watch out for duplicate keys in joins.

---

## 🪟 Part 3: Window Functions (The Ultimate Interview "Cheat Code")

Window functions allow you to perform calculations (like aggregates, rankings) across a set of rows while **still keeping individual rows visible** (unlike `GROUP BY`, which collapses them).

### 1. The Big Three: `ROW_NUMBER()` vs. `RANK()` vs. `DENSE_RANK()`
Imagine three employees with salaries: **\$100k, \$100k, \$80k**. Here is how they rank:

| Salary | `ROW_NUMBER()` | `RANK()` | `DENSE_RANK()` | Explanation |
| :--- | :---: | :---: | :---: | :--- |
| **\$100k** | 1 | 1 | 1 | Co-leaders |
| **\$100k** | 2 | 1 | 1 | Co-leaders |
| **\$80k** | 3 | **3** | **2** | `RANK` skips numbers; `DENSE_RANK` stays consecutive. |

### 2. Syntax Template
```sql
<Window_Function> OVER (
    PARTITION BY <column_to_group_by>
    ORDER BY <column_to_sort_by>
)
```
* **`PARTITION BY`**: Acts like a `GROUP BY` but doesn't merge the rows. Think of it as putting rows into mini-categories.
* **`ORDER BY`**: Sorts the rows *inside* each category.

---

## 📋 Part 4: The 5 Classic Query Patterns (Your Cheat Sheet)

Almost every coding interview question boils down to one of these five patterns. Memorize the templates below:

### Pattern 1: The N-th Highest Value (e.g. Salary, Order Amount)
* **Problem:** Find the 3rd highest salary.
* **Formula:** Use a CTE with `DENSE_RANK()`.

```sql
WITH RankedSalaries AS (
    SELECT employee_id, salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
)
SELECT salary 
FROM RankedSalaries
WHERE rnk = 3;
```

---

### Pattern 2: Self-Joins (Comparing Rows to Other Rows in the Same Table)
* **Problem:** Find employees who earn more than their managers.
* **Schema:** `employees (id, name, salary, manager_id)`

```sql
SELECT emp.name AS Employee_Name
FROM employees emp
INNER JOIN employees mgr ON emp.manager_id = mgr.id
WHERE emp.salary > mgr.salary;
```

---

### Pattern 3: Running Totals / Cumulative Sums
* **Problem:** Calculate the running balance of bank deposits over time.
* **Schema:** `transactions (account_id, date, amount)`

```sql
SELECT account_id, date, amount,
       SUM(amount) OVER (
           PARTITION BY account_id 
           ORDER BY date
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_balance
FROM transactions;
```

---

### Pattern 4: Conditional Aggregation (Pivoting Rows to Columns)
* **Problem:** Given sales of years and quarters, display quarters as individual columns.
* **Schema:** `sales (year, quarter, revenue)`

```sql
SELECT year,
       SUM(CASE WHEN quarter = 1 THEN revenue ELSE 0 END) AS Q1_revenue,
       SUM(CASE WHEN quarter = 2 THEN revenue ELSE 0 END) AS Q2_revenue,
       SUM(CASE WHEN quarter = 3 THEN revenue ELSE 0 END) AS Q3_revenue,
       SUM(CASE WHEN quarter = 4 THEN revenue ELSE 0 END) AS Q4_revenue
FROM sales
GROUP BY year;
```

---

### Pattern 5: Gaps and Islands (Streaks / Consecutive Days)
* **Problem:** Find users who logged in on 3 consecutive days.
* **Schema:** `logins (user_id, login_date)`

```sql
WITH UniqueLogins AS (
    -- Remove duplicate logins on the same day
    SELECT DISTINCT user_id, login_date FROM logins
),
DatedGroups AS (
    -- Subtract row index (in days) from the date. 
    -- Consecutive dates will resolve to the SAME start date anchor!
    SELECT user_id, login_date,
           login_date - CAST(ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY login_date) AS INT) AS group_date
    FROM UniqueLogins
)
SELECT user_id, COUNT(*) AS consecutive_days
FROM DatedGroups
GROUP BY user_id, group_date
HAVING COUNT(*) >= 3;
```

---

## 🗣️ Part 5: How to "Talk SQL" to Pass the Interview

When the interviewer gives you a SQL query problem, **do not start coding immediately**. Follow this conversational script:

1. **Ask about `NULL`s and duplicates:** 
   * *"Should I assume the column has `NULL` values? How should they be handled?"*
   * *"Are there duplicate rows in the input?"*
2. **Explain the Logical Execution Order:** 
   * *"I'll start by building the data set using `FROM` and `JOIN`, then apply the `WHERE` filter, group the data, and finally project it using `SELECT`."*
3. **Mention Indexing and Optimization:**
   * If they ask how to optimize a query, suggest:
     * **Create a composite index** on the `WHERE` and `JOIN` columns.
     * **Avoid functions** on columns in the `WHERE` clause (e.g. `WHERE YEAR(date) = 2026` is slow. Write `WHERE date >= '2026-01-01' AND date <= '2026-12-31'` instead—this is called keeping the query **SARGable**).
4. **Use CTEs instead of Subqueries:**
   * CTEs (`WITH` clauses) make your SQL code look like clean, professional, modular production code, which interviewers love.
