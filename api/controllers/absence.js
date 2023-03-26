const { Absence } = require("../models");
const { serverError } = require("../utils.js")


getAllAbsences = async (req, res) => {
    try {
      const absences = await Absence.findAll();
      res.status(200).json(absences);
    } catch (err) {
      serverError(res);
    }
};
  
  createAbsence = async (req, res) => {
    try {
      const absence = await Absence.create(req.body);
      res.status(201).json(absence);
    } catch (err) {
      serverError(res);
    }
};
  
  getAbsenceById = async (req, res) => {
    try {
      const absence = await Absence.findByPk(req.params.id);
      if (!absence) {
        res.status(404).json({ message: "Absence not found" });
        return;
      }
      res.status(200).json(absence);
    } catch (err) {
      serverError(res);
    }
};
  
  updateAbsenceById = async (req, res) => {
    try {
      const [numAffectedRows, [absence]] = await Absence.update(req.body, {
        returning: true,
        where: { absenceId: req.params.id },
      });
      if (numAffectedRows === 0) {
        res.status(404).json({ message: "Absence not found" });
        return
      }
      res.status(200).json(absence);
    } catch (err) {
      serverError(res);
    }
};
  
  deleteAbsenceById = async (req, res) => {
    try {
      const numAffectedRows = await Absence.destroy({
        where: { absenceId: req.params.id },
      });
      if (numAffectedRows === 0) {
        res.status(404).json({ message: "Absence not found" });
        return;
      }
      res.sendStatus(200);
    } catch (err) {
      serverError(res);
    }
};
  

module.exports = {
    getAllAbsences,
    getAbsenceById,
    createAbsence,
    updateAbsenceById,
    deleteAbsenceById,
};
