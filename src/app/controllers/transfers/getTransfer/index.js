const fetchTransfer = require("~root/actions/transfers/fetchTransfer");
const handleError = require("../../payroll/handleError");
const { validateId } = require("../../payroll/validation");

const getTransfer = async (req, res) => {
  try {
    const transferId = await validateId(req.params.id);
    const { transfer } = await fetchTransfer({ transferId });
    res.json({ transfer });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = getTransfer;
