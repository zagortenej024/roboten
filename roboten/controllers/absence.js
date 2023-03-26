const { Absence } = require("../models");
const { serverError } = require("../utils.js")
const { absencePostSchema, absencePatchSchema } = require("../schemas.js");


getAllAbsences = async (req, res) => {
    try {
      const absences = await Absence.findAll();
      res.status(200).json(absences);
    } catch (err) {
      serverError(res, err);
    }
};
  
getAbsenceById = async (req, res) => {
    try {
      const absence = await Absence.findByPk(req.params.id);
      if (!absence) {
        return res.status(404).json({ message: "Absence not found" });
      }
      res.status(200).json(absence);
    } catch (err) {
      serverError(res, err);
    }
};

const getAbsencesByEmployeeId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const absences = await Absence.findAll({ where: { userId: userId } });
    return res.status(200).json({ absences });
  } catch (error) {
    serverError(res, err);
  }
};

createAbsence = async (req, res) => {
  try {
    const { value, error } = absencePostSchema.validate(req.body);
    if(error) {
      return res.status(422).json({ message: error });
    }
    const absence = await Absence.create(value);
    res.status(201).json(absence);
  } catch (err) {
    serverError(res, err);
  }
};

updateAbsenceById = async (req, res) => {
    try {
      const { value, error } = absencePatchSchema.validate(req.body);
      if(error) {
        return res.status(422).json({ message: error });
      }
      const [numAffectedRows, [absence]] = await Absence.update(value, {
        returning: true,
        where: { absenceId: req.params.id },
      });
      if (numAffectedRows === 0) {
        res.status(404).json({ message: "Absence not found" });
        return
      }
      res.status(200).json(absence);
    } catch (err) {
      serverError(res, err);
    }
};
  
deleteAbsenceById = async (req, res) => {
    try {
      const numAffectedRows = await Absence.destroy({
        where: { absenceId: req.params.id },
      });
      if (numAffectedRows === 0) {
        return res.status(404).json({ message: "Absence not found" });
      }
      res.sendStatus(200);
    } catch (err) {
      serverError(res, err);
    }
};
  

module.exports = {
    getAllAbsences,
    getAbsenceById,
    getAbsencesByEmployeeId,
    createAbsence,
    updateAbsenceById,
    deleteAbsenceById,
};
