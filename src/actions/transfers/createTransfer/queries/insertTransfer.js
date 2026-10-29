const { submitQuery, getInsertId } = require("~root/lib/database");

const insertTransfer = data => submitQuery`
  INSERT INTO payment_transfers
    (salary_id, amount, currency, transfer_date, reference, status, notes)
  VALUES (${data.salaryId}, ${data.amount}, ${data.currency},
    ${data.transferDate}, ${data.reference}, ${data.status}, ${data.notes ||
  null})
`;

module.exports = getInsertId(insertTransfer);
