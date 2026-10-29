const createTransfer = require("~root/actions/transfers/createTransfer");
const handleError = require("../../payroll/handleError");
const { validateBody } = require("../../payroll/validation");
const transferSchema = require("../schemas/transferSchema");

const postTransfer = async (req, res) => {
  try {
    const data = await validateBody(transferSchema, req.body);
    const { transfer } = await createTransfer(data);
    res.status(201).json({ transfer });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = postTransfer;
