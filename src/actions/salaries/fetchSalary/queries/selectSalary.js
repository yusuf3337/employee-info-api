const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectSalary = ({ salaryId }) => submitQuery`
  SELECT salary_id, employee_id, gross_amount, currency, effective_date,
    notes, created_at, updated_at
  FROM salaries WHERE salary_id = ${salaryId}
`;

module.exports = getFirst(camelKeys(selectSalary));
