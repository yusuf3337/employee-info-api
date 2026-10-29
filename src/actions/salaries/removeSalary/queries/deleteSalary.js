const { submitQuery } = require("~root/lib/database");

const deleteSalary = ({ salaryId }) => submitQuery`
  DELETE FROM salaries WHERE salary_id = ${salaryId}
`;

module.exports = deleteSalary;
