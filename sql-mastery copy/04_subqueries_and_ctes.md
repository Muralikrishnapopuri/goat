# 04. Subqueries & CTEs

Complex datasets require modular query structures. This guide covers how to write, optimize, and choose between inline subqueries, correlated subqueries, and Common Table Expressions (CTEs)—including the crucial interview-favorite: **Recursive CTEs**.

---

## 🔗 Subqueries: Anatomy & Types

A subquery is simply a query nested inside another query. They are categorized based on **how they communicate with the outer query** and **what data structure they return**.

```
                           ┌───────────────────────────┐
                           │      Subquery Types       │
                           └─────────────┬─────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
     ┌───────────────────────┐                       ┌───────────────────────┐
     │      By Context       │                       │       By Return       │
     └───────────┬───────────┘                       └───────────┬───────────┘
                 │                                               │
        ┌────────┴────────┐                             ┌────────┼────────┐
        ▼                 ▼                             ▼        ▼        ▼
   [Correlated]    [Non-Correlated]                 [Scalar]  [Column] [Table]
```

### 1. Classification by Return Value
* **Scalar Subquery:** Returns exactly **one column and one row** (a single value). Can be used anywhere an expression is allowed (e.g., `SELECT`, `WHERE`, `HAVING`).
  ```sql
  SELECT name, salary, 
         (SELECT AVG(salary) FROM employees) AS company_avg
  FROM employees;
  ```
* **Column Subquery:** Returns a single column containing multiple rows. Used with operators like `IN`, `ANY`, `ALL`, or `NOT IN`.
* **Table Subquery:** Returns an entire multi-column, multi-row virtual table. Must be placed in the `FROM` or `JOIN` clause and given an alias.

### 2. Correlated vs. Non-Correlated Subqueries
* **Non-Correlated Subquery:** The inner query is completely independent of the outer query. It runs **exactly once**, and its output is passed to the outer query.
* **Correlated Subquery:** The inner query references one or more columns from the outer query.
  * **How it executes:** Conceptually, the database executes the inner query **once for every single row** processed by the outer query.
  * **Example:** *"Find all employees who earn more than the average salary of their specific department."*
  ```sql
  SELECT o.name, o.department_id, o.salary
  FROM employees o
  WHERE o.salary > (
      SELECT AVG(i.salary) 
      FROM employees i 
      WHERE i.department_id = o.department_id -- Correlation Clause
  );
  ```

---

## ⚡ EXISTS vs. IN: Performance Mechanics

This is a classic performance question.

### Under the Hood:
* **`IN`**: The database compiles the subquery list first. If the inner list is small, it stores it in memory. If it is large, it can cause overhead.
* **`EXISTS`**: Returns a boolean (`TRUE`/`FALSE`) and **short-circuits (stops scanning) as soon as the first matching record is found**. It does not return data.

### 💡 The Senior Rule:
Historically, `EXISTS` was faster for correlated subqueries, and `IN` was faster for independent subqueries.
In modern database optimizers, the query planner translates both `IN` and `EXISTS` into **Semi-Joins** (specifically, hash or merge semi-joins). Thus, their performance is identical in most cases.

**However, they behave completely differently with `NULL` values!** (Review Guide `01` regarding the `NOT IN` with `NULL` trap). Always default to `NOT EXISTS` rather than `NOT IN` for safety.

---

## 📦 Common Table Expressions (CTEs)

A CTE is a temporary result set defined within the scope of a single query. It is defined using the `WITH` keyword.

### Why CTEs are vastly superior to nested subqueries:
1. **Readability:** Moves nested query blocks to the top of the script, enabling a clean, sequential flow (left-to-right, top-to-bottom reading).
2. **Reusability:** A CTE can be referenced multiple times within the same query (e.g. joining a CTE to itself or using it in multiple union blocks).

```sql
WITH DeptAverage AS (
    SELECT department_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
)
SELECT e.name, e.salary, d.avg_sal
FROM employees e
INNER JOIN DeptAverage d ON e.department_id = d.department_id
WHERE e.salary > d.avg_sal;
```

---

## 🚀 Recursive CTEs (Deep Dive)

Recursive CTEs are the only way in native SQL to traverse hierarchical data models (e.g. Org charts, category trees, bill of materials) or generate custom series on the fly.

### Structure of a Recursive CTE:
A recursive CTE contains three core parts:
1. **Anchor Member:** The starting point of the recursion. Runs once and establishes the baseline result set.
2. **`UNION` / `UNION ALL`:** Appends subsequent recursive runs.
3. **Recursive Member:** A query that references the CTE itself. It joins the CTE with the underlying table to "step down/up" the hierarchy.

```
   ┌────────────────────────────────────────────────────────┐
   │                     Anchor Member                      │
   │               (Initial Top-Level Row)                  │
   └───────────────────────────┬────────────────────────────┘
                               │
                               ▼
              ┌─────────────────────────────────┐
              │           UNION ALL             │
              └────────────────┬────────────────┘
                               │
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │                   Recursive Member                     │
   │      (Joins CTE back to target table to loop)          │
   └───────────────────────────┬────────────────────────────┘
                               │
                    [Repeats until no rows returned]
```

### Org Chart Example: Find Employee Hierarchy Level
Assume table `employees (id, name, manager_id)`:

```sql
WITH RECURSIVE OrgChart AS (
    -- 1. Anchor: Get the CEO (who has no manager)
    SELECT id, name, manager_id, 1 AS lvl
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- 2. Recursive Member: Join OrgChart back to employees to find direct reports
    SELECT e.id, e.name, e.manager_id, o.lvl + 1
    FROM employees e
    INNER JOIN OrgChart o ON e.manager_id = o.id
)
SELECT * FROM OrgChart ORDER BY lvl, name;
```

---

## 🎛️ CTE Optimization: Materialization Boundaries

One of the most important advanced concepts is how databases handle CTE memory.

### Materialization:
* If a CTE is **materialized**, the database executes the CTE once, writes the results into a temporary in-memory table, and then queries that temporary table.
* If a CTE is **inlined**, the query optimizer expands the CTE definition and embeds it directly into the main query, allowing standard index lookups.

### Database Behaviors:
* **PostgreSQL:** Prior to version 12, CTEs were *always* materialized. This acted as an "optimization barrier," which could prevent indexing optimizations. In Postgres 12+, CTEs are inlined by default unless you explicitly declare it as `MATERIALIZED` or if the CTE is referenced multiple times.
  ```sql
  -- Force materialization (Postgres 12+)
  WITH cte_name AS MATERIALIZED (
      SELECT * FROM very_large_table
  )
  ...
  ```
* **SQL Server / MySQL:** These engines treat CTEs as inline views, and the optimizer decides the execution plan automatically.

---

## 🎯 Interview Checkpoints & Questions

1. **What makes a subquery correlated, and what are its performance impacts?**
   * *Answer:* A subquery is correlated if it references a column from the outer query. It cannot be evaluated independently. In the worst-case scenario, the database performs a nested loop, evaluating the inner query for every single outer row, scaling in $O(M \times N)$ complexity.
2. **How does a Recursive CTE know when to stop executing?**
   * *Answer:* The recursion automatically stops when the recursive member's query returns an empty result set (0 rows). At that point, the engine completes the final `UNION ALL` stack.
3. **What is the difference between inline views (subqueries in `FROM`) and CTEs?**
   * *Answer:* At runtime, they usually produce the exact same execution plan. However, CTEs make the query significantly more readable, modular, and allow you to reference the same temporary dataset multiple times in a single query. Inline subqueries must be duplicated if needed in multiple clauses.
