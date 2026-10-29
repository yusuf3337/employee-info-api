const fetchEmployees = require("~root/actions/employees/fetchEmployees");
const yup = require("yup");
const handleError = require("../../payroll/handleError");

const getEmployees = async (req, res) => {
  try {
    if (req.query.employeeId !== undefined) {
      throw new yup.ValidationError("employeeId filter is not supported here");
    }
    const { employees } = await fetchEmployees();
    res.json({ employees });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = getEmployees;
