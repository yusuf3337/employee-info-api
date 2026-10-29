const notFound = require("~root/actions/payroll/notFound");
const fetchEmployee = require("~root/actions/employees/fetchEmployee");
const updateEmployee = require("./queries/updateEmployee");

const modifyEmployee = async ({ employeeId, data }) => {
  const result = await updateEmployee({ employeeId, data });
  if (!result.affectedRows) throw notFound("Employee");
  return fetchEmployee({ employeeId });
};

module.exports = modifyEmployee;
