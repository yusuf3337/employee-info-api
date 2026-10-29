const yup = require("yup");
const {
  id,
  amount,
  date,
  text,
  optionalText
} = require("../../payroll/validation");

const transferSchema = yup
  .object()
  .shape({
    salaryId: id,
    amount,
    currency: yup
      .string()
      .matches(/^[A-Z]{3}$/)
      .required(),
    transferDate: date,
    reference: text(100),
    status: yup
      .string()
      .oneOf(["pending", "completed", "failed"])
      .required(),
    notes: optionalText(500)
  })
  .noUnknown();

module.exports = transferSchema;
