const { submitQuery } = require("~root/lib/database");

const updateTransfer = ({ transferId, data }) => submitQuery`
  UPDATE payment_transfers SET salary_id = ${data.salaryId}, amount = ${
  data.amount
},
    currency = ${data.currency}, transfer_date = ${data.transferDate},
    reference = ${data.reference}, status = ${
  data.status
}, notes = ${data.notes || null}
  WHERE transfer_id = ${transferId}
`;

module.exports = updateTransfer;
