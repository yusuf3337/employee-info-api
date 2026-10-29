const yup = require("yup");
const { text, optionalText, date } = require("../../payroll/validation");

const employeeSchema = yup
  .object()
  .shape({
    firstName: text(100),
    lastName: text(100),
    email: yup
      .string()
      .email()
      .max(255)
      .required(),
    phone: optionalText(30),
    department: optionalText(100),
    jobTitle: text(100),
    hireDate: date,
    status: yup
      .string()
      .oneOf(["active", "inactive"])
      .required()
  })
  .noUnknown();

module.exports = employeeSchema;
