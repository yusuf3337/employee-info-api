const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectEmployee = ({ employeeId }) => submitQuery`
  SELECT employee_id, first_name, last_name, email, phone, department,
    job_title, hire_date, status, created_at, updated_at
  FROM employees WHERE employee_id = ${employeeId}
`;

module.exports = getFirst(camelKeys(selectEmployee));
