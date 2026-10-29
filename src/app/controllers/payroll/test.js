/* eslint-disable import/no-extraneous-dependencies, no-underscore-dangle */
const httpMocks = require("node-mocks-http");

jest.mock("~root/actions/employees/createEmployee", () => jest.fn());
jest.mock("~root/actions/employees/fetchEmployee", () => jest.fn());

const createEmployee = require("~root/actions/employees/createEmployee");
const fetchEmployee = require("~root/actions/employees/fetchEmployee");
const postEmployee = require("../employees/postEmployee");
const getEmployee = require("../employees/getEmployee");

const validEmployee = {
  firstName: "Ayşe",
  lastName: "Yılmaz",
  email: "ayse@example.com",
  jobTitle: "Uzman",
  hireDate: "2026-10-27",
  status: "active"
};

test("creates a validated employee and returns 201", async () => {
  createEmployee.mockResolvedValue({
    employee: { employeeId: 7, ...validEmployee }
  });
  const req = httpMocks.createRequest({ method: "POST", body: validEmployee });
  const res = httpMocks.createResponse();

  await postEmployee(req, res);

  expect(res.statusCode).toBe(201);
  expect(createEmployee).toHaveBeenCalledWith(validEmployee);
  expect(JSON.parse(res._getData()).employee.employeeId).toBe(7);
});

test("rejects unknown fields before writing", async () => {
  createEmployee.mockClear();
  const req = httpMocks.createRequest({
    method: "POST",
    body: { ...validEmployee, salary: "999999" }
  });
  const res = httpMocks.createResponse();

  await postEmployee(req, res);

  expect(res.statusCode).toBe(400);
  expect(createEmployee).not.toHaveBeenCalled();
});

test("returns 404 for a missing employee", async () => {
  const error = new Error("Employee not found");
  error.statusCode = 404;
  fetchEmployee.mockRejectedValue(error);
  const req = httpMocks.createRequest({ method: "GET", params: { id: "99" } });
  const res = httpMocks.createResponse();

  await getEmployee(req, res);

  expect(res.statusCode).toBe(404);
  expect(JSON.parse(res._getData()).error).toBe("Employee not found");
});
