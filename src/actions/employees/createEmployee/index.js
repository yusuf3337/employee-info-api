const fetchEmployee = require("~root/actions/employees/fetchEmployee");
const insertEmployee = require("./queries/insertEmployee");

const createEmployee = async data => {
  const employeeId = await insertEmployee(data);
  return fetchEmployee({ employeeId });
};

module.exports = createEmployee;
