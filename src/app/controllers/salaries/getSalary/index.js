const fetchSalary = require("~root/actions/salaries/fetchSalary");
const handleError = require("../../payroll/handleError");
const { validateId } = require("../../payroll/validation");

const getSalary = async (req, res) => {
  try {
    const salaryId = await validateId(req.params.id);
    const { salary } = await fetchSalary({ salaryId });
    res.json({ salary });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = getSalary;
