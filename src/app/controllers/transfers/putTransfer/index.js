const modifyTransfer = require("~root/actions/transfers/modifyTransfer");
const handleError = require("../../payroll/handleError");
const { validateBody, validateId } = require("../../payroll/validation");
const transferSchema = require("../schemas/transferSchema");

const putTransfer = async (req, res) => {
  try {
    const transferId = await validateId(req.params.id);
    const data = await validateBody(transferSchema, req.body);
    const { transfer } = await modifyTransfer({ transferId, data });
    res.json({ transfer });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = putTransfer;
