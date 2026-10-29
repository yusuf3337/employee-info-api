const removeTransfer = require("~root/actions/transfers/removeTransfer");
const handleError = require("../../payroll/handleError");
const { validateId } = require("../../payroll/validation");

const deleteTransfer = async (req, res) => {
  try {
    const transferId = await validateId(req.params.id);
    const result = await removeTransfer({ transferId });
    res.json(result);
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = deleteTransfer;
