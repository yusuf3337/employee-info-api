const selectSalaries = require("./queries/selectSalaries");

const fetchSalaries = async ({ employeeId } = {}) => {
  const salaries = await selectSalaries({ employeeId });
  return { salaries };
};

module.exports = fetchSalaries;
