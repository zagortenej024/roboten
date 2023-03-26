const express = require("express");
const connectionController = require("./controllers/connection.js");
const userController = require("./controllers/user.js");
const companyController = require("./controllers/company.js");
const absenceController = require("./controllers/absence.js");


const router = express.Router();


// Connection

router.get("/healthcheck", connectionController.getHealthcheck);


// User

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.patch("/users/:id", userController.updateUserById);
router.delete("/users/:id", userController.deleteUserById);

router.get("/users/:company_id", (req, res) => {
    const employees = userController.getAllEmployeesByCompanyId(req, res);
    res.render("employee", { employees });
});

// Company

router.get("/companies", companyController.getAllCompanies);
router.get("/companies/:id", companyController.getCompanyById);
router.post("/companies", companyController.createCompany);
router.patch("/companies/:id", companyController.updateCompanyById);
router.delete("/companies/:id", companyController.deleteCompanyById);

router.get("/companies/:user_id", (req, res) => {
    const companies = companyController.getAllCompaniesByAdminUserId(req, res);
    res.render("company", { companies });
});

// Absence

router.get("/absences", absenceController.getAllAbsences);
router.get("/absences/:id", absenceController.getAbsenceById);
router.post("/absences", absenceController.createAbsence);
router.patch("/absences/:id", absenceController.updateAbsenceById);
router.delete("/absences/:id", absenceController.getAllAbsences);

router.get("/absences/:user_id", (req, res) => {
    const absences = absenceController.getAbsencesByEmployeeId(req, res);
    res.render("absence", { absences });
});


module.exports = router;
