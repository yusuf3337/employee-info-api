const fetchSalaries = require("~root/actions/salaries/fetchSalaries");
const handleError = require("../../payroll/handleError");
const { validateId } = require("../../payroll/validation");

const getSalaries = async (req, res) => {
  try {
    const employeeId =
      req.query.employeeId === undefined
        ? undefined
        : await validateId(req.query.employeeId);
    const { salaries } = await fetchSalaries({ employeeId });
    res.json({ salaries });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = getSalaries;
