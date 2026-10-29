const notFound = require("~root/actions/payroll/notFound");
const deleteEmployee = require("./queries/deleteEmployee");

const removeEmployee = async ({ employeeId }) => {
  const result = await deleteEmployee({ employeeId });
  if (!result.affectedRows) throw notFound("Employee");
  return { deleted: true };
};

module.exports = removeEmployee;
