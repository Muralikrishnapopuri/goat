# 08. Database Design & Normalization

Database schema design lays the foundation for data integrity, storage efficiency, and developer productivity. Understanding normalization normal forms and constraints is essential for designing highly maintainable systems that scale.

---

## 🔑 Keys, Constraints & Referential Integrity

Constraints are rules enforced at the database level to ensure data accuracy and reliability.

### 1. Primary Keys (PK) vs. Unique Keys
* **Primary Key**:
  * Uniquely identifies each row in a table.
  * Must contain **unique, non-null values**.
  * Only **one** primary key is allowed per table.
* **Unique Key**:
  * Guarantees that all values in a column are distinct.
  * **Allows `NULL` values** (in most databases, you can have multiple `NULL` values in a unique column because `NULL != NULL` is unknown).
  * Multiple unique keys are allowed per table.

### 2. Foreign Keys & Delete Actions
A Foreign Key (FK) establishes a relationship between two tables, ensuring **referential integrity**. When a parent record is deleted or updated, we must define what happens to its child records:

* **`ON DELETE CASCADE`**: Automatically deletes all child rows when the parent row is deleted. Use with caution (e.g. deleting a user deletes all their posts).
* **`ON DELETE SET NULL`**: Sets the child foreign key column to `NULL` when the parent row is deleted. The parent-child link is broken, but child rows remain.
* **`ON DELETE RESTRICT / NO ACTION`**: Rejects the deletion of the parent row if any child rows reference it. This is the default safety setting.

---

## 📐 Database Normalization (1NF ➡️ BCNF)

Normalization is the process of structuring a relational database to **reduce data redundancy** and **prevent write anomalies** (insertion, update, and deletion anomalies).

```
   ┌────────────────────────────────────────────────────────┐
   │                          1NF                           │
   │               (Atomic Values, No Repeating)            │
   └───────────────────────────┬────────────────────────────┘
                               │
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │                          2NF                           │
   │            (No Partial Key Dependencies)               │
   └───────────────────────────┬────────────────────────────┘
                               │
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │                          3NF                           │
   │           (No Transitive Dependencies)                 │
   └───────────────────────────┬────────────────────────────┘
                               │
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │                         BCNF                           │
   │          (Every Determinant is a Super Key)            │
   └────────────────────────────────────────────────────────┘
```

### 1. First Normal Form (1NF)
* **Rules:**
  1. Each table cell must contain a single, **atomic** value (no comma-separated lists or arrays inside a column).
  2. Columns must contain data of the same type.
  3. Every row must be uniquely identifiable (has a primary key).

### 2. Second Normal Form (2NF)
* **Rules:**
  1. Must be in **1NF**.
  2. Must eliminate **partial key dependencies**. Every non-key column must depend on the *entire* primary key, not just a subset of it (only relevant when the primary key is composite).
* **Example of violation:**
  * Table: `student_courses(student_id, course_id, course_name, grade)`
  * Composite PK: `(student_id, course_id)`
  * Grade depends on both student and course (valid).
  * `course_name` depends *only* on `course_id` (a subset of the PK). This is a partial dependency.
* **Fix:** Split into two tables: `grades(student_id, course_id, grade)` and `courses(course_id, course_name)`.

### 3. Third Normal Form (3NF)
* **Rules:**
  1. Must be in **2NF**.
  2. Must eliminate **transitive dependencies**. Non-key columns must not depend on other non-key columns. Every attribute must depend *"on the key, the whole key, and nothing but the key."*
* **Example of violation:**
  * Table: `employees(id, name, department_id, department_name)`
  * PK: `id`
  * `department_id` depends on `id`.
  * `department_name` depends on `department_id` (a non-key column).
* **Fix:** Split into `employees(id, name, department_id)` and `departments(department_id, department_name)`.

### 4. Boyce-Codd Normal Form (BCNF)
* **Rules:**
  1. Must be in **3NF**.
  2. For every functional dependency $X \rightarrow Y$, $X$ must be a **super key** (a primary key or unique key). BCNF is a slightly stricter version of 3NF that handles edge cases where multiple overlapping composite candidate keys exist.

---

## 🎛️ Pragmatic Denormalization

While normalization is excellent for data integrity and write performance, it can severely hurt read performance on high-throughput analytics databases by forcing complex multi-table joins.

### When to Denormalize:
1. **Read-Heavy Architectures:** When your system performs thousands of reads for every write (e.g. e-commerce product catalogs).
2. **Dashboard Analytics:** Aggregating data across dozens of tables is too slow. Storing pre-aggregated data or combined tables saves huge CPU overhead.
3. **Historical Snapshots:** Keeping a copy of invoice details (like address and prices) inside the order record. If a product's price changes later, the past invoice historical records must remain unaffected.

---

## 🖼️ Views vs. Materialized Views

For reporting and modularity, database developers use virtual tables.

| Feature | Standard View | Materialized View |
| :--- | :--- | :--- |
| **Physical Storage** | **No physical storage.** It is simply a saved, named query definition. | **Stored physically on disk** as a concrete table. |
| **Read Performance** | Normal (executes the underlying query from scratch every time it is called). | Extremely Fast (reads directly from the cached disk pages). |
| **Data Freshness** | **Always 100% fresh.** | **Stale** until explicitly refreshed. |
| **Indexable?** | Generally No (depends on DB, e.g. Indexed Views in SQL Server). | **Yes.** You can build B-Tree indexes on Materialized Views for even faster searches! |
| **Update Mechanism** | Computes dynamically on read. | Refreshed manually or on a cron schedule (`REFRESH MATERIALIZED VIEW`). |

---

## 🎯 Interview Checkpoints & Questions

1. **What is a "transitive dependency" in the context of 3NF?**
   * *Answer:* A transitive dependency occurs when a non-key column $B$ depends on the primary key $A$, and another non-key column $C$ depends on $B$ ($A \rightarrow B \rightarrow C$). This violates 3NF because $C$ depends on the primary key transitively through $B$. To resolve it, $B$ and $C$ must be split out into a separate table.
2. **What is the difference between `ON DELETE CASCADE` and `ON DELETE SET NULL`?**
   * *Answer:* `ON DELETE CASCADE` propagates the deletion of a parent record down to all referencing child records, deleting them. `ON DELETE SET NULL` preserves the child records but updates their foreign key fields to `NULL` to clear the link, maintaining database integrity without loss of child data.
3. **When would you choose a Materialized View over a Standard View?**
   * *Answer:* I would choose a Materialized View when querying a complex dataset involving expensive calculations or multi-table joins where query performance is critical and real-time freshness is not mandatory (e.g., daily sales dashboards). A Standard View is preferred for simple encapsulation where real-time accuracy is required.
