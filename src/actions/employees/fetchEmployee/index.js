const notFound = require("~root/actions/payroll/notFound");
const selectEmployee = require("./queries/selectEmployee");

const fetchEmployee = async ({ employeeId }) => {
  const employee = await selectEmployee({ employeeId });
  if (!employee) throw notFound("Employee");
  return { employee };
};

module.exports = fetchEmployee;
