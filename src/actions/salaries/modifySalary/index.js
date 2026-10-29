const notFound = require("~root/actions/payroll/notFound");
const fetchSalary = require("~root/actions/salaries/fetchSalary");
const updateSalary = require("./queries/updateSalary");

const modifySalary = async ({ salaryId, data }) => {
  const result = await updateSalary({ salaryId, data });
  if (!result.affectedRows) throw notFound("Salary");
  return fetchSalary({ salaryId });
};

module.exports = modifySalary;
