const { submitQuery } = require("~root/lib/database");

const updateSalary = ({ salaryId, data }) => submitQuery`
  UPDATE salaries SET employee_id = ${data.employeeId},
    gross_amount = ${data.grossAmount}, currency = ${data.currency},
    effective_date = ${data.effectiveDate}, notes = ${data.notes || null}
  WHERE salary_id = ${salaryId}
`;

module.exports = updateSalary;
