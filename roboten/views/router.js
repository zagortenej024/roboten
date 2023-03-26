const express = require("express");
const userController = require("./controllers/user.js");
const companyController = require("./controllers/company.js");
const absenceController = require("./controllers/absence.js");


const router = express.Router();


router.get("/users", (req, res) => {
  const users = userController.getAllEmployeesByCompanyId(req);
  res.render("users.ejs", { users });
});

router.get("/companies/:id/", (req, res) => {
  const companies = companyController.getAllCompaniesByAdminUserId();
  res.render("companies.ejs", { companies });
});

router.get("/absences", (req, res) => {
  const absences = absenceController.getAbsencesByEmployeeId();
  res.render("absences.ejs", { absences });
});

module.exports = router;
