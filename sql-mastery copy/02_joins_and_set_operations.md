# 02. Joins & Set Operations

Joins are the heart of relational database systems. Interviews almost always test your mental model of join mechanics, query planner execution strategies, and set operations.

---

## 🧩 Join Types & Mechanics

At the theoretical level, any join starts as a **Cartesian Product (Cross Join)** of two tables, which is then filtered down by the `ON` join predicate and `WHERE` filter conditions.

```
                  ┌───────────────────────────────┐
                  │          CROSS JOIN           │
                  │   (Cartesian Product: M * N)  │
                  └───────────────┬───────────────┘
                                  │
                       [Apply ON filter criteria]
                                  │
                                  ▼
                  ┌───────────────────────────────┐
                  │          INNER JOIN           │
                  │    (Only matching keys)       │
                  └───────────────┬───────────────┘
                                  │
                      [Add unmatched outer rows]
                                  │
                                  ▼
                  ┌───────────────────────────────┐
                  │          OUTER JOINS          │
                  │  (LEFT / RIGHT / FULL OUTER)  │
                  └───────────────────────────────┘
```

### 1. `INNER JOIN`
Returns rows when there is a match in both tables. If a key exists in Table A but not Table B, those rows are completely omitted.

### 2. `LEFT (OUTER) JOIN`
Returns all rows from the left table, and the matched rows from the right table. If no match is found, columns of the right table are filled with `NULL`.

### 3. `RIGHT (OUTER) JOIN`
The inverse of a `LEFT JOIN`. It is rarely used in practice because queries are generally written left-to-right for readability.
* **Interview tip:** Any `RIGHT JOIN` can be rewritten as a `LEFT JOIN` by swapping the tables.

### 4. `FULL (OUTER) JOIN`
Returns rows when there is a match in *either* the left or right table. Unmatched keys from either side are padded with `NULL`.

### 5. `CROSS JOIN`
Computes the Cartesian product of two tables. If Table A has $M$ rows and Table B has $N$ rows, the result contains $M \times N$ rows.
* **Usage:** Generating lookup grids, test data, or permutations.

### 6. `SELF JOIN`
A table joined with itself. It is not a distinct keyword; you simply refer to the same table twice using two different aliases.
* **Usage:** Adjacency lists (e.g., matching employees to their managers).
```sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
INNER JOIN employees m ON e.manager_id = m.id;
```

---

## ⚠️ The Ultimate Interview Trap: `ON` vs. `WHERE` in Outer Joins

This is a favorite senior engineer question. Look at these two queries:

### Query A
```sql
SELECT u.id, u.name, o.order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.order_date > '2026-01-01';
```

### Query B
```sql
SELECT u.id, u.name, o.order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.order_date > '2026-01-01';
```

### Do they return the same results?
**Absolutely NOT!**

* **Query A** performs a `LEFT JOIN`. If a user has no orders after `2026-01-01`, they **are still returned** in the result set, but their `order_date` will show as `NULL`. The filtering occurs *during* the join phase.
* **Query B** performs a standard `LEFT JOIN`, but then applies a `WHERE` filter *after* the join (due to logical execution order). Because unmatched users have a `NULL` `order_date`, the condition `o.order_date > '2026-01-01'` evaluates to `UNKNOWN` (treated as `FALSE`), filtering them out! **Query B behaves exactly like an `INNER JOIN`.**

> [!IMPORTANT]
> Putting a filter condition on the *nullable (right)* table of a `LEFT JOIN` inside the `WHERE` clause **implicitly converts it into an `INNER JOIN`**. To preserve the `LEFT JOIN` behavior, place the filter inside the `ON` clause.

---

## 🛠️ Join Algorithms Under the Hood (Physical Joins)

Database engines don't just execute joins one way; the query optimizer evaluates statistics and chooses one of three primary physical join strategies:

### 1. Nested Loop Join
* **How it works:** Loops through the outer table, and for each row, looks up the matching row in the inner table.
* **Complexity:** $O(M \times N)$ without index, $O(M \log N)$ with index on the inner table.
* **Best for:** Small datasets where the inner table has an index on the join column.

### 2. Hash Join
* **How it works:** Reads the smaller table, builds a hash table of the join keys in memory, then scans the larger table and probes the hash table.
* **Complexity:** $O(M + N)$ time, but requires $O(\min(M, N))$ space.
* **Best for:** Large, unsorted datasets where join columns are not indexed.

### 3. Sort-Merge Join
* **How it works:** Sorts both datasets on the join key (if not already sorted by an index), then scans both sorted inputs in parallel to merge them.
* **Complexity:** $O(M \log M + N \log N)$ for sorting, $O(M + N)$ for merging.
* **Best for:** Large datasets where the inputs are already sorted (e.g. by index) or when performing inequality joins (`<`, `>`).

---

## 🔀 Set Operations

Set operations combine the **results of two distinct select statements** vertically, whereas Joins combine columns horizontally.

```
     [ JOIN ]                       [ SET OPERATION ]
   Table A | Table B                   Query 1
  ┌───┬───┐ ┌───┬───┐                 ┌───┬───┐
  │Key│Col│ │Key│Col│                 │Col│Col│
  └───┴───┘ └───┴───┘                 └───┴───┘
       ▼     ▼                            ▼
  ┌───┬───┬───┬───┐                  Query 2 (Appended Vertically)
  │Key│Col│Key│Col│                 ┌───┬───┐
  └───┴───┴───┴───┘                 │Col│Col│
                                    └───┴───┘
```

### Constraints:
1. Both queries must project the **same number of columns**.
2. Corresponding columns must have **compatible data types**.

### 1. `UNION` vs. `UNION ALL`
* **`UNION ALL`**: Simply appends the second result set to the first. It is extremely fast ($O(N)$) because it performs no data analysis.
* **`UNION`**: Appends the results and then performs an **implicit deduplication** (equivalent to running `DISTINCT` on the final output).
* **Performance Impact:** `UNION` is vastly slower because it requires sorting or hashing all rows to find and remove duplicates.
* **Interview Rule:** **Always default to `UNION ALL`** unless you explicitly need duplicate rows removed.

### 2. `INTERSECT`
Returns only rows that are present in the output of **both** queries.

### 3. `EXCEPT` (or `MINUS` in Oracle)
Returns rows that are present in the first query's output but **not** in the second.

---

## 🎯 Interview Checkpoints & Questions

1. **What is the difference between a `LEFT JOIN` and a `LEFT JOIN` with a `WHERE` condition on the right table?**
   * *Answer:* If the `WHERE` condition filters on columns in the right table (e.g. `right_col = 'val'`), it filters out rows where `right_col` is `NULL` (since `NULL = 'val'` is UNKNOWN). This effectively converts the outer join into an `INNER JOIN`. To maintain outer join behavior, the condition must go in the `ON` clause.
2. **When would you use a `CROSS JOIN` in a real-world scenario?**
   * *Answer:* I would use a `CROSS JOIN` to generate combinations of data, such as a complete schedule grid of dates and employee IDs, or to perform configuration matrix generation. It is also used in reporting to cross-reference dimensions that do not share direct foreign keys.
3. **Why is `UNION ALL` preferred over `UNION`?**
   * *Answer:* `UNION ALL` simply appends rows without checking for duplicates, running in $O(N)$ time. `UNION` performs an implicit `DISTINCT` sorting/hashing operation to deduplicate rows, which has a time complexity of $O(N \log N)$ and can spill to disk if memory limits are exceeded.
