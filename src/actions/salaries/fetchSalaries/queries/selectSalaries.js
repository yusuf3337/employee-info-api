const { submitQuery, sql, camelKeys } = require("~root/lib/database");

const selectSalaries = ({ employeeId } = {}) => submitQuery`
  SELECT salary_id, employee_id, gross_amount, currency, effective_date,
    notes, created_at, updated_at
  FROM salaries
  WHERE ${employeeId ? sql`employee_id = ${employeeId}` : sql`1 = 1`}
  ORDER BY effective_date DESC, salary_id DESC
`;

module.exports = camelKeys(selectSalaries);
