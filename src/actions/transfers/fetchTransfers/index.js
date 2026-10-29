const selectTransfers = require("./queries/selectTransfers");

const fetchTransfers = async ({ employeeId } = {}) => {
  const transfers = await selectTransfers({ employeeId });
  return { transfers };
};

module.exports = fetchTransfers;
