const handleAPIError = require("~root/utils/handleAPIError");

const handleError = (res, err) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  if (err.code === "ER_DUP_ENTRY") {
    return res
      .status(409)
      .json({ error: "A record with this unique value already exists" });
  }
  if (err.code === "ER_ROW_IS_REFERENCED_2") {
    return res.status(409).json({ error: "Delete related records first" });
  }
  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(404).json({ error: "Related record not found" });
  }
  return handleAPIError(res, err);
};

module.exports = handleError;
