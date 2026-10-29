const { submitQuery } = require("~root/lib/database");

const updateEmployee = ({ employeeId, data }) => submitQuery`
  UPDATE employees SET first_name = ${data.firstName}, last_name = ${
  data.lastName
},
    email = ${data.email}, phone = ${data.phone || null},
    department = ${data.department || null}, job_title = ${data.jobTitle},
    hire_date = ${data.hireDate}, status = ${data.status}
  WHERE employee_id = ${employeeId}
`;

module.exports = updateEmployee;
