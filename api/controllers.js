const { User, Company, Absence } = require("./models");


getHealthcheck = async (req, res) => {
    res.status(200).json({"message": "I am alive and well!"});
};


getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.findAll();
      res.status(200).json(companies);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
};


getAllAbsences = async (req, res) => {
    try {
      const absences = await Absence.findAll();
      res.status(200).json(absences);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    getHealthcheck,
    getAllUsers,
    getAllCompanies,
    getAllAbsences
}
