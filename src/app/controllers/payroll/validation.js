const yup = require("yup");

const id = yup
  .number()
  .integer()
  .positive()
  .required();
const text = max =>
  yup
    .string()
    .trim()
    .max(max)
    .required();
const optionalText = max =>
  yup
    .string()
    .trim()
    .max(max)
    .nullable();
const date = yup
  .string()
  .required()
  .test("date", "Date must be a valid YYYY-MM-DD date", value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
    const parsed = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(parsed.getTime()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  });
const amount = yup
  .string()
  .required()
  .matches(
    /^(?!0+(?:\.0{1,2})?$)\d{1,10}(?:\.\d{1,2})?$/,
    "Amount must be positive with at most two decimal places"
  );

const validateBody = async (schema, body) =>
  schema.validate(body, {
    abortEarly: false,
    strict: true,
    stripUnknown: false
  });

const validateId = async value => id.validate(Number(value), { strict: true });

module.exports = {
  id,
  text,
  optionalText,
  date,
  amount,
  validateBody,
  validateId
};
