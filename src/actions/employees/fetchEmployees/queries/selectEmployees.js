const { submitQuery, camelKeys } = require("~root/lib/database");

const selectEmployees = () => submitQuery`
  SELECT employee_id, first_name, last_name, email, phone, department,
    job_title, hire_date, status, created_at, updated_at
  FROM employees ORDER BY employee_id DESC
`;

module.exports = camelKeys(selectEmployees);
