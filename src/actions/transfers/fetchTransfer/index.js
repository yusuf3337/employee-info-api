const notFound = require("~root/actions/payroll/notFound");
const selectTransfer = require("./queries/selectTransfer");

const fetchTransfer = async ({ transferId }) => {
  const transfer = await selectTransfer({ transferId });
  if (!transfer) throw notFound("Transfer");
  return { transfer };
};

module.exports = fetchTransfer;
