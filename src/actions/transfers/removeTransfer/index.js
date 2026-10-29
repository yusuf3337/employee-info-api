const notFound = require("~root/actions/payroll/notFound");
const deleteTransfer = require("./queries/deleteTransfer");

const removeTransfer = async ({ transferId }) => {
  const result = await deleteTransfer({ transferId });
  if (!result.affectedRows) throw notFound("Transfer");
  return { deleted: true };
};

module.exports = removeTransfer;
