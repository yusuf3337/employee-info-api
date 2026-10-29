const { submitQuery, sql, camelKeys } = require("~root/lib/database");

const selectTransfers = ({ employeeId } = {}) => submitQuery`
  SELECT t.transfer_id, t.salary_id, s.employee_id, t.amount, t.currency,
    t.transfer_date, t.reference, t.status, t.notes, t.created_at, t.updated_at
  FROM payment_transfers t
  JOIN salaries s ON t.salary_id = s.salary_id
  WHERE ${employeeId ? sql`s.employee_id = ${employeeId}` : sql`1 = 1`}
  ORDER BY t.transfer_date DESC, t.transfer_id DESC
`;

module.exports = camelKeys(selectTransfers);
