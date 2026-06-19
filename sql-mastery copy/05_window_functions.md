# 05. Advanced Window Functions

Window functions perform calculations across a set of table rows that are related to the current row. Unlike standard aggregate operations, **window functions do not collapse rows** into a single output row. Every input row retains its unique identity.

---

## ⚙️ Core Syntax & Anatomy

```sql
SELECT column_name,
       FUNCTION() OVER (
           PARTITION BY partition_column
           ORDER BY sort_column
           ROWS/RANGE BETWEEN frame_start AND frame_end
       ) AS window_result
FROM table_name;
```

### The Three Components of `OVER()`:
1. **`PARTITION BY`**: Divides the rows into groups (partitions) that share the same values. If omitted, the entire table is treated as a single partition.
2. **`ORDER BY`**: Defines the physical sequence of rows within each partition. This determines how values are evaluated sequentially.
3. **`ROWS/RANGE` (Frame Specification)**: Constrains the set of rows (the "frame") relative to the current row within the partition.

---

## 🎖️ Ranking Window Functions: The Tie-Breaker Battle

Interviews frequently test your knowledge of `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`. Let's compare their behaviors when they encounter identical values (ties).

Assume a table of user exam scores:
| Student | Score | `ROW_NUMBER()` | `RANK()` | `DENSE_RANK()` |
| :--- | :--- | :--- | :--- | :--- |
| Alice | 100 | **1** | **1** | **1** |
| Bob | 90 | **2** | **2** | **2** |
| Charlie | 90 | **3** | **2** | **2** |
| David | 80 | **4** | **4** | **3** |

### Detailed Comparison:

* **`ROW_NUMBER()`**:
  * **Rule:** Assigns a unique, sequential integer starting at 1.
  * **Tie Handling:** Does not tolerate ties. Even if two scores are equal, it assigns different sequential numbers (arbitrarily or based on the fallback sorting key).
  * **Result sequence:** `1, 2, 3, 4`

* **`RANK()`**:
  * **Rule:** Assigns a rank with gaps if ties exist.
  * **Tie Handling:** Rows with equal values get the same rank. However, the next rank assigned is skipped by the number of tied rows.
  * **Result sequence:** `1, 2, 2, 4` (Notice rank `3` is skipped).

* **`DENSE_RANK()`**:
  * **Rule:** Assigns a rank with no gaps (densely packed).
  * **Tie Handling:** Rows with equal values get the same rank, and the very next rank is incremented by exactly 1.
  * **Result sequence:** `1, 2, 2, 3`

---

## 📊 Value & Analytical Functions

These functions allow you to peek into other rows inside the partition without doing self-joins.

### 1. `LEAD(column, offset, default)`
* Peeks forward into the partition by $N$ rows (default is 1).
* **Usage:** Calculating month-over-month growth, time differences between events.

### 2. `LAG(column, offset, default)`
* Peeks backward into the partition by $N$ rows.
* **Usage:** Finding previous account balance, calculating speed or intervals.

### 3. `FIRST_VALUE(column)`
* Returns the value of the specified column at the first row in the window frame.

### 4. `LAST_VALUE(column)`
* Returns the value of the specified column at the last row in the window frame.
* > [!WARNING]
  > **The Last Value Trap:** By default, the window frame is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. This means `LAST_VALUE` will simply return the **current row's value**! To fix this, you must expand the frame definition:
  > `LAST_VALUE(col) OVER (ORDER BY sort_col ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)`

---

## 📦 Sliding Window Frames (`ROWS` vs. `RANGE`)

Window frames allow you to specify dynamic sliding frames, which is essential for computing moving averages and cumulative aggregates.

```
                    ┌─────────────────────────┐
                    │    UNBOUNDED PRECEDING  │ (First row of partition)
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      1 PRECEDING        │ (Row immediately before)
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │       CURRENT ROW       │ <--- Current Row
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │       1 FOLLOWING       │ (Row immediately after)
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │    UNBOUNDED FOLLOWING  │ (Last row of partition)
                    └─────────────────────────┘
```

### 1. Running Total (Cumulative Sum)
```sql
SELECT date, sales,
       SUM(sales) OVER (
           ORDER BY date 
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM sales_data;
```

### 2. Moving Average (3-Day Sliding Window)
```sql
SELECT date, sales,
       AVG(sales) OVER (
           ORDER BY date 
           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS moving_avg_3_day
FROM sales_data;
```

### 3. `ROWS` vs. `RANGE` (The Physical Difference)
* **`ROWS`**: Acts on the physical row count. `ROWS BETWEEN 1 PRECEDING AND CURRENT ROW` always operates on exactly 2 rows.
* **`RANGE`**: Acts on the value boundary of the sorted column.
  * If your `ORDER BY` column has duplicate values, `RANGE` treats those duplicate rows as a **single logical entity**.
  * By default, if you specify an `ORDER BY` but omit the frame, it defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. If there are duplicate ordering values, **they will be added together simultaneously in a running total**, rather than sequentially row-by-row. Use `ROWS` to guarantee sequential row-by-row aggregation.

---

## 🎯 Interview Checkpoints & Questions

1. **How do you find the top 3 highest-earning employees in each department using window functions?**
   * *Answer:* I would use `DENSE_RANK()` partitioned by department and ordered by salary descending. Then, I would wrap that query in a CTE or subquery and filter where the rank is $\le 3$.
   ```sql
   WITH RankedEmployees AS (
       SELECT name, department_id, salary,
              DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
       FROM employees
   )
   SELECT * FROM RankedEmployees WHERE rnk <= 3;
   ```
2. **What is the difference between `RANK()` and `DENSE_RANK()`?**
   * *Answer:* Both rank values and assign equal ranks to tied values. However, `RANK()` skips ranks to account for the duplicates (e.g. `1, 2, 2, 4`), while `DENSE_RANK()` maintains a contiguous sequence without skipping any ranks (e.g. `1, 2, 2, 3`).
3. **Why does `LAST_VALUE` often return the current row instead of the actual last row?**
   * *Answer:* Because the default window frame with `ORDER BY` is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Under this frame, the "last row" of the frame is the current row. To get the actual last row of the partition, the frame must be explicitly overridden: `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.
