const fetchTransfer = require("~root/actions/transfers/fetchTransfer");
const insertTransfer = require("./queries/insertTransfer");

const createTransfer = async data => {
  const transferId = await insertTransfer(data);
  return fetchTransfer({ transferId });
};

module.exports = createTransfer;
