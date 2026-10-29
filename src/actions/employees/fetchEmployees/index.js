const selectEmployees = require("./queries/selectEmployees");

const fetchEmployees = async () => {
  const employees = await selectEmployees();
  return { employees };
};

module.exports = fetchEmployees;
