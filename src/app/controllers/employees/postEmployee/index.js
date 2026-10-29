const createEmployee = require("~root/actions/employees/createEmployee");
const handleError = require("../../payroll/handleError");
const { validateBody } = require("../../payroll/validation");
const employeeSchema = require("../schemas/employeeSchema");

const postEmployee = async (req, res) => {
  try {
    const data = await validateBody(employeeSchema, req.body);
    const { employee } = await createEmployee(data);
    res.status(201).json({ employee });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = postEmployee;
