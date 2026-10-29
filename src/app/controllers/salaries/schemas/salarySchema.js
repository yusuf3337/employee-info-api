const yup = require("yup");
const { id, amount, date, optionalText } = require("../../payroll/validation");

const salarySchema = yup
  .object()
  .shape({
    employeeId: id,
    grossAmount: amount,
    currency: yup
      .string()
      .matches(/^[A-Z]{3}$/)
      .required(),
    effectiveDate: date,
    notes: optionalText(500)
  })
  .noUnknown();

module.exports = salarySchema;
