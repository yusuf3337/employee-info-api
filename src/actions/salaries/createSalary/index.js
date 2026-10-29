const fetchSalary = require("~root/actions/salaries/fetchSalary");
const insertSalary = require("./queries/insertSalary");

const createSalary = async data => {
  const salaryId = await insertSalary(data);
  return fetchSalary({ salaryId });
};

module.exports = createSalary;
