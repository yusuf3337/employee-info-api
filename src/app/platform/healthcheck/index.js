const fs = require("fs");
const handleAPIError = require("~root/utils/handleAPIError");
const getMySQLVersion = require("./queries/getMySQLVersion");
const { version } = require("../../../../package.json");

const healthcheck = async (req, res) => {
  try {
    const mysqlVersion = await getMySQLVersion();
    const appVersion = fs.existsSync("./COMMIT_HASH")
      ? fs.readFileSync("./COMMIT_HASH", "utf8").trim()
      : version;

    res.status(200).send({ mysqlVersion, appVersion });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = healthcheck;
