# 🎓 SQL Concepts Explained Simply (With Sandbox Exercises)

This guide takes you from knowing only `SELECT`, `FROM`, `WHERE`, and `INSERT` to mastering advanced, interview-critical database queries.

For each topic, we discuss:
1. **Definition**: What is it?
2. **The Problem**: Why do we need it?
3. **The Concept**: How does it work under the hood?
4. **Interview Pitch**: How to explain it to an interviewer.
5. **Run in Sandbox**: The exact query you can copy into `sandbox.sql` and run using `node sql-mastery/run-sql.js`.

---

## 📂 Table of Contents
1. [GROUP BY & HAVING](#1-group-by--having)
2. [JOINS (INNER, LEFT, SELF)](#2-joins-inner-left-self)
3. [CTEs (Common Table Expressions)](#3-ctes-common-table-expressions)
4. [Subqueries (Correlated vs. Non-Correlated)](#4-subqueries-correlated-vs-non-correlated)
5. [Window Functions (ROW_NUMBER, RANK, DENSE_RANK)](#5-window-functions-row_number-rank-dense_rank)

---

## 1. GROUP BY & HAVING

### 📝 Definition
* **`GROUP BY`** collapses rows that have matching values in specified columns into aggregate summaries (buckets).
* **`HAVING`** filters those aggregated summaries (buckets).

### ❓ The Problem
If you only know `WHERE`, you can filter individual rows (e.g., *"Find employees with salary > 80000"*). But what if the interviewer asks: 
> *"What is the total salary spent per department, but only show departments that spend more than $200,000 total?"*
* You cannot use `WHERE` for this, because `WHERE` filters individual rows **before** the sum is computed. You need a way to group rows by department and then filter the group sum.

### 🧠 The Concept (Logical Steps)
1. **Collect**: The database gathers the rows.
2. **Bucket (`GROUP BY`)**: It splits rows into separate buckets based on your grouped column.
3. **Compute**: It computes aggregate functions (`SUM`, `COUNT`, `AVG`) for each bucket.
4. **Filter (`HAVING`)**: It throws away buckets that don't match the condition.

```
[All Employee Rows] ➡️ Split by Department ➡️  [Bucket 101] (Alice, Bob, Charlie, David)
                                              [Bucket 102] (Eva, Frank, Grace)
                                              [Bucket NULL] (Henry)
```

### 🗣️ How to Explain in an Interview
> *"I use `GROUP BY` to partition rows into distinct groups based on matching key values, allowing me to run aggregate functions (like `SUM` or `COUNT`) over each group. I use `HAVING` to filter these final grouped results. I cannot use `WHERE` to filter aggregates because `WHERE` is executed before the groups are formed."*

### 💻 Run in Sandbox
Copy this query into `sql-mastery/sandbox.sql` and run `node sql-mastery/run-sql.js`:
```sql
SELECT department_id, 
       COUNT(*) AS total_employees, 
       SUM(salary) AS total_spending
FROM employees
GROUP BY department_id
HAVING total_spending > 100000;
```

---

## 2. JOINS (INNER, LEFT, SELF)

### 📝 Definition
A **JOIN** matches and stitches columns from two tables together horizontally based on a common key column.

### ❓ The Problem
In normalized databases, data is split into different tables to avoid duplication (e.g., employee details are in `employees`, department names are in `departments`). 
If you only use single-table SELECTs, you cannot answer:
> *"Show me the employee's name along with their department's name."*
You must stitch the tables together on `employees.department_id = departments.id`.

### 🧠 The Concept
* **`INNER JOIN`**: Keeps only rows where the join key matches in **both** tables. If an employee has no department (like Henry, whose `department_id` is NULL), they are excluded.
* **`LEFT JOIN`**: Keeps **all** rows from the left table (e.g., employees), even if they don't have a matching department. The missing department columns are filled with `NULL`.
* **`SELF JOIN`**: Joining a table to itself. Useful when a row points to another row in the same table (e.g. employee's `manager_id` pointing to the manager's `id` in the same `employees` table).

```
INNER JOIN:  [Employee: Bob (101)] <Matching Key> [Dept: Engineering (101)] ➡️ Joined Row
LEFT JOIN:   [Employee: Henry (NULL)] <No Match>  [Dept: NULL]              ➡️ Output Henry with NULL Dept
```

### 🗣️ How to Explain in an Interview
> *"An `INNER JOIN` returns rows only when there is a match in both tables. A `LEFT JOIN` returns all records from the left table and the matched records from the right table, padding unmatched right columns with NULLs. A `SELF JOIN` is when we join a table to itself using aliases, which is crucial for querying hierarchical structures like employee-manager relationships."*

### 💻 Run in Sandbox
#### Left Join Exercise (Find all employees and their department, including those without one):
```sql
SELECT e.name AS employee_name, d.name AS department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

#### Self Join Exercise (Find employees and their manager's name):
```sql
SELECT emp.name AS employee, mgr.name AS manager
FROM employees emp
LEFT JOIN employees mgr ON emp.manager_id = mgr.id;
```

---

## 3. CTEs (Common Table Expressions)

### 📝 Definition
A **CTE** is a temporary, named result set that you define at the start of a query. You can reference it just like a regular table within the query.

### ❓ The Problem
When queries get complex, you end up nesting subqueries inside subqueries (e.g., `SELECT * FROM (SELECT * FROM (SELECT...) ...)`). This makes the code unreadable, hard to debug, and difficult to explain to an interviewer.

### 🧠 The Concept
Instead of nesting, a CTE allows you to write sequential, step-by-step query definitions using the `WITH` keyword:
```sql
WITH Step1 AS (
  SELECT ...
),
Step2 AS (
  SELECT ... FROM Step1
)
SELECT * FROM Step2;
```

### 🗣️ How to Explain in an Interview
> *"A Common Table Expression, or CTE, is a temporary result set defined using the `WITH` clause. I prefer CTEs over nested subqueries because they improve readability, make code easier to test, and document query steps sequentially."*

### 💻 Run in Sandbox
Copy this CTE query to find departments whose average salary is higher than the overall company average:
```sql
WITH DepartmentAverage AS (
  SELECT department_id, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department_id
),
CompanyAverage AS (
  SELECT AVG(salary) AS comp_avg
  FROM employees
)
SELECT dept.name, da.avg_sal
FROM DepartmentAverage da
INNER JOIN departments dept ON da.department_id = dept.id
CROSS JOIN CompanyAverage ca
WHERE da.avg_sal > ca.comp_avg;
```

---

## 4. Subqueries (Correlated vs. Non-Correlated)

### 📝 Definition
A **Subquery** is simply a query nested inside another query (e.g. inside a `WHERE`, `SELECT`, or `FROM` clause).
* **Non-Correlated**: The nested query runs independently *once*, and returns a value (or list of values) to the outer query.
* **Correlated**: The nested query references a column from the outer query, meaning it must run *repeatedly* (once for every single row processed by the outer query).

### ❓ The Problem
You need to filter values based on a dynamic calculation. For instance:
> *"Find all employees who earn more than the average salary of the entire company."*
You first need to calculate the average salary (subquery) and then compare each employee's salary to it (outer query).

### 🧠 The Concept
* **Non-Correlated (Fast)**:
  1. Inner query runs once: `AVG(salary)` $\rightarrow$ returns `$87,500`.
  2. Outer query runs once: `WHERE salary > 87500`.
* **Correlated (Slow, $O(N^2)$)**:
  1. Outer query reads Employee 1 (Alice, Dept 101).
  2. Inner query calculates average salary *specifically for Dept 101* $\rightarrow$ `$97,500`.
  3. Compare Alice's salary to `$97,500`.
  4. Outer query reads Employee 5 (Eva, Dept 102).
  5. Inner query calculates average salary *specifically for Dept 102* $\rightarrow$ `$80,000`... and so on.

### 🗣️ How to Explain in an Interview
> *"A non-correlated subquery is independent of the outer query; it executes once, and its result is used by the outer query. A correlated subquery, however, references one or more columns from the outer query. Because of this dependency, the database must execute the inner query once for every candidate row in the outer query, which can make correlated subqueries slower on large datasets."*

### 💻 Run in Sandbox
#### Non-Correlated Subquery (Employees earning more than company average):
```sql
SELECT name, salary 
FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);
```

#### Correlated Subquery (Employees earning more than their own department's average):
```sql
SELECT e1.name, e1.salary, e1.department_id
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
);
```

---

## 5. Window Functions (ROW_NUMBER, RANK, DENSE_RANK)

### 📝 Definition
A **Window Function** performs calculations across a set of table rows that are related to the current row, without collapsing the rows (unlike `GROUP BY`).

### ❓ The Problem
If you use `GROUP BY department_id` to find the highest salary, you collapse all rows and get only one row per department. What if the interviewer asks:
> *"Rank the employees in each department by their salary, but show every employee's name and department alongside their rank."*
If you collapse the rows, you lose the names! You need a way to rank rows *while keeping them intact*.

### 🧠 The Concept
Window functions use the `OVER` clause to define the window (the group of rows to look at).
* **`PARTITION BY`**: Defines the boundary (e.g., group by department).
* **`ORDER BY`**: Dictates the ranking sort order within that boundary.
* **`ROW_NUMBER()`**: Generates consecutive numbers (`1, 2, 3, 4`).
* **`RANK()`**: Assigns equal ranks to duplicates, but skips numbers (`1, 1, 3`).
* **`DENSE_RANK()`**: Assigns equal ranks to duplicates without skipping numbers (`1, 1, 2`).

```
[Window Dept 101]
Alice    $120,000 ➡️ Rank 1
Bob      $95,000  ➡️ Rank 2 (tie)
Charlie  $95,000  ➡️ Rank 2 (tie)
David    $80,000  ➡️ Rank 3 (using DENSE_RANK) or Rank 4 (using RANK)
```

### 🗣️ How to Explain in an Interview
> *"Window functions perform multi-row calculations while preserving the individual row identities. By using the `OVER` clause, I can specify a `PARTITION BY` column to define my subset boundary and an `ORDER BY` clause to order elements within that boundary. I use `ROW_NUMBER` for unique sequential IDs, `RANK` when I want duplicate values to share a rank while skipping numbers, and `DENSE_RANK` when I want duplicates to share a rank without gaps in the sequence."*

### 💻 Run in Sandbox
Copy this window query to rank employees within their departments by salary:
```sql
SELECT name, department_id, salary,
       ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS row_num,
       RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk,
       DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dense_rnk
FROM employees;
```
