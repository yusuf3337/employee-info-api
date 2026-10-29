const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectTransfer = ({ transferId }) => submitQuery`
  SELECT t.transfer_id, t.salary_id, s.employee_id, t.amount, t.currency,
    t.transfer_date, t.reference, t.status, t.notes, t.created_at, t.updated_at
  FROM payment_transfers t
  JOIN salaries s ON t.salary_id = s.salary_id
  WHERE t.transfer_id = ${transferId}
`;

module.exports = getFirst(camelKeys(selectTransfer));
