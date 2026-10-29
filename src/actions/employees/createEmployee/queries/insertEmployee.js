const { submitQuery, getInsertId } = require("~root/lib/database");

const insertEmployee = data => submitQuery`
  INSERT INTO employees
    (first_name, last_name, email, phone, department, job_title, hire_date, status)
  VALUES
    (${data.firstName}, ${data.lastName}, ${data.email}, ${data.phone || null},
     ${data.department || null}, ${data.jobTitle}, ${data.hireDate}, ${
  data.status
})
`;

module.exports = getInsertId(insertEmployee);
