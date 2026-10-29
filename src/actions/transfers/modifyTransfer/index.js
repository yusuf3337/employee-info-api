const notFound = require("~root/actions/payroll/notFound");
const fetchTransfer = require("~root/actions/transfers/fetchTransfer");
const updateTransfer = require("./queries/updateTransfer");

const modifyTransfer = async ({ transferId, data }) => {
  const result = await updateTransfer({ transferId, data });
  if (!result.affectedRows) throw notFound("Transfer");
  return fetchTransfer({ transferId });
};

module.exports = modifyTransfer;
