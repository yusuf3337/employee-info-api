const fetchApiReference = require("~root/actions/admin/fetchApiReference");
const handleAPIError = require("~root/utils/handleAPIError");

const getApiReference = async (req, res) => {
  try {
    const content = await fetchApiReference();
    res.type("text/markdown").send(content);
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getApiReference;
