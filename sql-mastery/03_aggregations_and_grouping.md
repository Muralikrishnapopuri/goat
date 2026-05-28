# 03. Aggregations & Grouping

Aggregation and grouping let us summarize raw records into high-level business intelligence. This guide covers how SQL groups data, the difference between row-level and group-level filtering, aggregate functions, and critical edge cases with `NULL`s.

---

## 🔍 WHERE vs. HAVING: The Definitive Guide

This is one of the most frequently asked junior-to-mid level interview questions. The difference lies entirely in **which step of the logical execution pipeline** the filter is applied.

```
                    ┌────────────────────────┐
                    │      1. FROM/JOIN      │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │    2. WHERE Filter     │ <--- Row-level filtering
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │      3. GROUP BY       │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │    4. HAVING Filter    │ <--- Group-level filtering
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │       5. SELECT        │
                    └────────────────────────┘
```

### Comparison Key differences:

| Feature | `WHERE` | `HAVING` |
| :--- | :--- | :--- |
| **Pipeline Step** | Step 2 (Before `GROUP BY`) | Step 4 (After `GROUP BY`) |
| **Operating Scope** | Operates on individual rows. | Operates on grouped/aggregated results. |
| **Aggregates Allowed?**| **No.** `WHERE COUNT(*) > 10` throws an error. | **Yes.** `HAVING COUNT(*) > 10` is valid. |
| **Performance** | Faster. Discards irrelevant rows early, reducing grouping memory. | Slower. Groups must be formed *before* rows are discarded. |

#### 🚀 Optimization Pro-Tip:
If a filter does not depend on an aggregate function, always place it in the `WHERE` clause instead of `HAVING`.

```sql
-- ❌ Poor Performance (Filters post-grouping)
SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id
HAVING department_id IN (1, 2, 3);

--  Excellent Performance (Filters pre-grouping)
SELECT department_id, AVG(salary)
FROM employees
WHERE department_id IN (1, 2, 3)
GROUP BY department_id;
```

---

## 🔢 The Legendary Battle: `COUNT(*)` vs. `COUNT(1)` vs. `COUNT(column)`

Almost every SQL interview contains a variation of this question.

Let's assume we have a table `users`:
| id | name | email |
| :--- | :--- | :--- |
| 1 | Alice | alice@example.com |
| 2 | Bob | `NULL` |
| 3 | Charlie| `NULL` |

### 1. `COUNT(*)`
* **Behavior:** Counts **every row** in the table, regardless of whether it contains null values.
* **Result for table above:** `3`

### 2. `COUNT(1)`
* **Behavior:** Replaces every row in the partition with the constant value `1` and then counts them.
* **Result for table above:** `3`
* **Performance Myth:** In the 1990s, some DB engines optimized `COUNT(1)` better than `COUNT(*)`. **This is no longer true.** In all modern relational databases (PostgreSQL, MySQL, SQL Server, Oracle), the query planner parses them into the exact same execution plan. They perform identically.

### 3. `COUNT(column)`
* **Behavior:** Counts **only rows where the specified column is NOT NULL**.
* **Result for `COUNT(email)`:** `1` (Bob and Charlie's emails are null, so they are ignored).

---

## 🧮 How Aggregations Handle `NULL` Values

Understanding how mathematical operations treat missing data is critical to avoiding structural bugs in production reports.

### 1. Simple Aggregates: `SUM`, `AVG`, `MIN`, `MAX`
All basic aggregate functions **ignore `NULL` values entirely**.

#### The Average Bias Gotcha:
Consider a column `scores` with values: `[100, 80, NULL, 60]`.
* What is `AVG(scores)`?
* If the engine counted the null as `0`, the average would be: $\frac{100+80+0+60}{4} = 60$.
* However, because SQL ignores nulls, it calculates: $\frac{100+80+60}{3} = 80$.

> [!WARNING]
> If you want missing values to count as `0` in your aggregates, you must explicitly use `COALESCE` **inside** the aggregate function:
> ```sql
> -- Computes average ignoring nulls (Result: 80)
> SELECT AVG(scores) FROM game;
>
> -- Computes average treating nulls as zero (Result: 60)
> SELECT AVG(COALESCE(scores, 0)) FROM game;
> ```

### 2. Empty Groups & All-NULL Columns
If a table has no rows, or if the grouped column has only `NULL` values:
* `COUNT(column)` returns `0`.
* `SUM(column)` returns `NULL` (not `0`!).
* `AVG(column)` returns `NULL`.
* `MIN(column)` and `MAX(column)` return `NULL`.

---

## 🔗 List Aggregations (Concatenating Grouped Values)

Often, a business query requires concatenating rows of text within a group into a single comma-separated string. The syntax varies drastically across database dialects:

```sql
--  PostgreSQL
SELECT department_id, STRING_AGG(name, ', ' ORDER BY name) AS employee_list
FROM employees
GROUP BY department_id;

-- 🐬 MySQL
SELECT department_id, GROUP_CONCAT(name ORDER BY name SEPARATOR ', ') AS employee_list
FROM employees
GROUP BY department_id;

-- 🔴 Oracle
SELECT department_id, LISTAGG(name, ', ') WITHIN GROUP (ORDER BY name) AS employee_list
FROM employees
GROUP BY department_id;
```

---

## 📊 Advanced Grouping: `ROLLUP`, `CUBE`, and `GROUPING SETS`

For enterprise-level reporting, databases provide extensions to the standard `GROUP BY` clause to compute multiple sub-totals and grand totals in a single query.

### 1. `ROLLUP`
Computes hierarchical sub-totals.
```sql
SELECT region, city, SUM(sales)
FROM transactions
GROUP BY ROLLUP(region, city);
```
* **Generates aggregates for:**
  1. `(region, city)` - standard group.
  2. `(region)` - regional sub-total.
  3. `()` - grand total.

### 2. `CUBE`
Computes all possible combinations of grouping keys.
```sql
GROUP BY CUBE(region, city);
```
* **Generates aggregates for:** `(region, city)`, `(region)`, `(city)`, and `()`.

### 3. `GROUPING SETS`
Allows you to specify the exact custom grouping combinations you want to execute in a single pass.
```sql
GROUP BY GROUPING SETS ((region), (city));
```

---

## 🎯 Interview Checkpoints & Questions

1. **Why does `AVG(column)` not equal `SUM(column) / COUNT(*)`?**
   * *Answer:* `AVG` ignores `NULL` values, whereas `COUNT(*)` counts all rows. If there are any `NULL`s in the column, the denominator in `SUM/COUNT(*)` will be larger than the actual number of aggregated rows, skewing the result downward. The correct equivalent is `SUM(column) / COUNT(column)`.
2. **What is the difference between `WHERE` and `HAVING`?**
   * *Answer:* `WHERE` filters rows *before* they are grouped (Step 2 of execution), making it fast and efficient. `HAVING` filters groups *after* they are formed (Step 4 of execution) and can utilize aggregate functions (e.g. `HAVING COUNT(*) > 5`).
3. **If you run `SUM` on an empty table or a column with only `NULL` values, what is the result?**
   * *Answer:* The result is `NULL`. To safely default it to a numeric `0` for application usage, you should wrap it: `COALESCE(SUM(column), 0)`.
