const fetchEmployee = require("~root/actions/employees/fetchEmployee");
const handleError = require("../../payroll/handleError");
const { validateId } = require("../../payroll/validation");

const getEmployee = async (req, res) => {
  try {
    const employeeId = await validateId(req.params.id);
    const { employee } = await fetchEmployee({ employeeId });
    res.json({ employee });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = getEmployee;
