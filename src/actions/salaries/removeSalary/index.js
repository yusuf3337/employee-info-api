const notFound = require("~root/actions/payroll/notFound");
const deleteSalary = require("./queries/deleteSalary");

const removeSalary = async ({ salaryId }) => {
  const result = await deleteSalary({ salaryId });
  if (!result.affectedRows) throw notFound("Salary");
  return { deleted: true };
};

module.exports = removeSalary;
