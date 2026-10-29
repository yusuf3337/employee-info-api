const { submitQuery } = require("~root/lib/database");

const deleteEmployee = ({ employeeId }) => submitQuery`
  DELETE FROM employees WHERE employee_id = ${employeeId}
`;

module.exports = deleteEmployee;
