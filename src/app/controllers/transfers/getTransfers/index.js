const fetchTransfers = require("~root/actions/transfers/fetchTransfers");
const handleError = require("../../payroll/handleError");
const { validateId } = require("../../payroll/validation");

const getTransfers = async (req, res) => {
  try {
    const employeeId =
      req.query.employeeId === undefined
        ? undefined
        : await validateId(req.query.employeeId);
    const { transfers } = await fetchTransfers({ employeeId });
    res.json({ transfers });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = getTransfers;
