const removeSalary = require("~root/actions/salaries/removeSalary");
const handleError = require("../../payroll/handleError");
const { validateId } = require("../../payroll/validation");

const deleteSalary = async (req, res) => {
  try {
    const salaryId = await validateId(req.params.id);
    const result = await removeSalary({ salaryId });
    res.json(result);
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = deleteSalary;
