const express = require("express");

const { ADMIN } = require("~root/constants/userTypes");
const postLogin = require("./controllers/users/login");
const postUser = require("./controllers/users/register");
const putUserDetails = require("./controllers/users/putUserDetails");
const authentication = require("./middlewares/authentication");
const authorise = require("./middlewares/authorisation");
const getUserTypes = require("./controllers/users/userTypes");
const putPassword = require("./controllers/password-recovery/putPassword");
const postRecoveryRequest = require("./controllers/password-recovery/postRecoveryRequest");
const healthcheck = require("./platform/healthcheck");
const getEmployees = require("./controllers/employees/getEmployees");
const getEmployee = require("./controllers/employees/getEmployee");
const postEmployee = require("./controllers/employees/postEmployee");
const putEmployee = require("./controllers/employees/putEmployee");
const deleteEmployee = require("./controllers/employees/deleteEmployee");
const getSalaries = require("./controllers/salaries/getSalaries");
const getSalary = require("./controllers/salaries/getSalary");
const postSalary = require("./controllers/salaries/postSalary");
const putSalary = require("./controllers/salaries/putSalary");
const deleteSalary = require("./controllers/salaries/deleteSalary");
const getTransfers = require("./controllers/transfers/getTransfers");
const getTransfer = require("./controllers/transfers/getTransfer");
const postTransfer = require("./controllers/transfers/postTransfer");
const putTransfer = require("./controllers/transfers/putTransfer");
const deleteTransfer = require("./controllers/transfers/deleteTransfer");
const getApiReference = require("./controllers/admin/getApiReference");

const router = express.Router();

// USER MANAGEMENT
router.post("/login", postLogin);

router.post(
  "/register",
  authentication,
  authorise({ roles: [ADMIN] }),
  postUser
);

router.put("/edit/user", authentication, putUserDetails);

router.get("/user-types", getUserTypes);

router.post("/recovery-request", postRecoveryRequest);

router.put("/update-password/:shortcode", putPassword);

router.get("/healthcheck", healthcheck);

const payrollAccess = [authentication, authorise({ roles: [ADMIN] })];

router.get("/admin/developer/api-reference", payrollAccess, getApiReference);

router.get("/employees", payrollAccess, getEmployees);
router.get("/employees/:id", payrollAccess, getEmployee);
router.post("/employees", payrollAccess, postEmployee);
router.put("/employees/:id", payrollAccess, putEmployee);
router.delete("/employees/:id", payrollAccess, deleteEmployee);

router.get("/salaries", payrollAccess, getSalaries);
router.get("/salaries/:id", payrollAccess, getSalary);
router.post("/salaries", payrollAccess, postSalary);
router.put("/salaries/:id", payrollAccess, putSalary);
router.delete("/salaries/:id", payrollAccess, deleteSalary);

router.get("/transfers", payrollAccess, getTransfers);
router.get("/transfers/:id", payrollAccess, getTransfer);
router.post("/transfers", payrollAccess, postTransfer);
router.put("/transfers/:id", payrollAccess, putTransfer);
router.delete("/transfers/:id", payrollAccess, deleteTransfer);

module.exports = router;
