const notFound = require("~root/actions/payroll/notFound");
const selectSalary = require("./queries/selectSalary");

const fetchSalary = async ({ salaryId }) => {
  const salary = await selectSalary({ salaryId });
  if (!salary) throw notFound("Salary");
  return { salary };
};

module.exports = fetchSalary;
