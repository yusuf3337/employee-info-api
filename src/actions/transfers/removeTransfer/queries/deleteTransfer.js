const { submitQuery } = require("~root/lib/database");

const deleteTransfer = ({ transferId }) => submitQuery`
  DELETE FROM payment_transfers WHERE transfer_id = ${transferId}
`;

module.exports = deleteTransfer;
