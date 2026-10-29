const modifySalary = require("~root/actions/salaries/modifySalary");
const handleError = require("../../payroll/handleError");
const { validateBody, validateId } = require("../../payroll/validation");
const salarySchema = require("../schemas/salarySchema");

const putSalary = async (req, res) => {
  try {
    const salaryId = await validateId(req.params.id);
    const data = await validateBody(salarySchema, req.body);
    const { salary } = await modifySalary({ salaryId, data });
    res.json({ salary });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = putSalary;
