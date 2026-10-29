const { submitQuery, getInsertId } = require("~root/lib/database");

const insertSalary = data => submitQuery`
  INSERT INTO salaries (employee_id, gross_amount, currency, effective_date, notes)
  VALUES (${data.employeeId}, ${data.grossAmount}, ${data.currency},
    ${data.effectiveDate}, ${data.notes || null})
`;

module.exports = getInsertId(insertSalary);
