const removeEmployee = require("~root/actions/employees/removeEmployee");
const handleError = require("../../payroll/handleError");
const { validateId } = require("../../payroll/validation");

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = await validateId(req.params.id);
    const result = await removeEmployee({ employeeId });
    res.json(result);
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = deleteEmployee;
