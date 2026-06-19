-- =====================================================================
-- LESSON 1: GROUP BY & HAVING
-- Copy any query from 00_interactive_tutorial.md here and run:
-- node sql-mastery/run-sql.js
-- =====================================================================

SELECT department_id, 
       COUNT(*) AS total_employees, 
       SUM(salary) AS total_spending
FROM employees
GROUP BY department_id
HAVING total_spending > 100000;
