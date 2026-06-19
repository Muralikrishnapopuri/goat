const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

// 1. Initialize an in-memory SQLite database
const db = new DatabaseSync(':memory:');

// 2. Pre-load mock data tables
db.exec(`
  CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    salary INTEGER NOT NULL,
    department_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY(department_id) REFERENCES departments(id),
    FOREIGN KEY(manager_id) REFERENCES employees(id)
  );

  CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    order_date TEXT NOT NULL
  );

  CREATE TABLE logins (
    user_id INTEGER NOT NULL,
    login_date TEXT NOT NULL
  );

  -- Insert departments
  INSERT INTO departments (id, name) VALUES 
    (101, 'Engineering'),
    (102, 'Sales'),
    (103, 'Marketing');

  -- Insert employees
  INSERT INTO employees (id, name, salary, department_id, manager_id) VALUES
    (1, 'Alice', 120000, 101, NULL),     -- Alice is the CEO/Top Manager
    (2, 'Bob', 95000, 101, 1),           -- Bob reports to Alice
    (3, 'Charlie', 95000, 101, 1),       -- Charlie reports to Alice
    (4, 'David', 80000, 101, 2),         -- David reports to Bob
    (5, 'Eva', 110000, 102, NULL),       -- Eva is Sales Lead
    (6, 'Frank', 70000, 102, 5),         -- Frank reports to Eva
    (7, 'Grace', 60000, 102, 5),         -- Grace reports to Eva
    (8, 'Henry', 50000, NULL, NULL);     -- Henry has no department

  -- Insert orders
  INSERT INTO orders (id, customer_id, amount, order_date) VALUES
    (1, 201, 150, '2026-06-01'),
    (2, 202, 300, '2026-06-01'),
    (3, 201, 50,  '2026-06-02'),
    (4, 203, 1200,'2026-06-03'),
    (5, 202, 450, '2026-06-03'),
    (6, 201, 250, '2026-06-04');

  -- Insert logins
  INSERT INTO logins (user_id, login_date) VALUES
    (1, '2026-06-01'),
    (1, '2026-06-02'),
    (1, '2026-06-03'),
    (1, '2026-06-05'),
    (2, '2026-06-01'),
    (2, '2026-06-03'),
    (2, '2026-06-04');
`);

// 3. Read sandbox.sql file
const sqlFilePath = path.join(__dirname, 'sandbox.sql');
if (!fs.existsSync(sqlFilePath)) {
  fs.writeFileSync(sqlFilePath, '-- Write your SQL query here and run "node run-sql.js"\nSELECT * FROM employees;\n');
}

const sql = fs.readFileSync(sqlFilePath, 'utf8').trim();

if (!sql) {
  console.log('sandbox.sql is empty. Write a query first!');
  process.exit(0);
}

console.log('Executing query in sandbox.sql:');
console.log('-------------------------------------');
console.log(sql);
console.log('-------------------------------------\n');

try {
  // Execute the query
  const query = db.prepare(sql);
  const rows = query.all();
  
  if (rows.length === 0) {
    console.log('Query executed successfully. Result: 0 rows returned.');
  } else {
    // Print the rows in a nice console table
    console.table(rows);
  }
} catch (error) {
  console.error('❌ SQL ERROR:', error.message);
}
