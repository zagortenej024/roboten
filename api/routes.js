const express = require("express");
const controller = require("./controllers");


const router = express.Router();


router.get("/healthcheck", controller.getHealthcheck);
router.get("/users", controller.getAllUsers);
router.get("/companies", controller.getAllCompanies);
router.get("/absences", controller.getAllAbsences);


module.exports = router;
