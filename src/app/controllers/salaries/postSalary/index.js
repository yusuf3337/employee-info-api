const createSalary = require("~root/actions/salaries/createSalary");
const handleError = require("../../payroll/handleError");
const { validateBody } = require("../../payroll/validation");
const salarySchema = require("../schemas/salarySchema");

const postSalary = async (req, res) => {
  try {
    const data = await validateBody(salarySchema, req.body);
    const { salary } = await createSalary(data);
    res.status(201).json({ salary });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = postSalary;
