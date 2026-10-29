const modifyEmployee = require("~root/actions/employees/modifyEmployee");
const handleError = require("../../payroll/handleError");
const { validateBody, validateId } = require("../../payroll/validation");
const employeeSchema = require("../schemas/employeeSchema");

const putEmployee = async (req, res) => {
  try {
    const employeeId = await validateId(req.params.id);
    const data = await validateBody(employeeSchema, req.body);
    const { employee } = await modifyEmployee({ employeeId, data });
    res.json({ employee });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = putEmployee;
