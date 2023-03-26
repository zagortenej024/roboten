const { Company } = require("../models");
const { serverError } = require("../utils.js")


getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.findAll();
      res.status(200).json(companies);
    } catch (err) {
      serverError(res, err);
    }
};
  
createCompany = async (req, res) => {
    try {
      const company = await Company.create(req.body);
      res.status(201).json(company);
    } catch (err) {
      serverError(res, err);
    }
};
  
getCompanyById = async (req, res) => {
    try {
      const company = await Company.findByPk(req.params.id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.status(200).json(company);
    } catch (err) {
      serverError(res, err);
    }
};

getAllCompaniesByAdminUserId = async (req, res) => {
  try {
    const userId = req.param.user_id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const companies = await Company.findAll({
      include: [
        {
          model: User,
          attributes: [],
          through: { 
            model: UserCompany,
            where: { userId: userId, isAdmin: true }
          }
        }
      ]
    });
    return res.status(200).json(companies);
  } catch (err) {
    serverError(res, err);
  }
}
  
updateCompanyById = async (req, res) => {
    try {
      const [numAffectedRows, [company]] = await Company.update(req.body, {
        returning: true,
        where: { companyId: req.params.id },
      });
      if (numAffectedRows === 0) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.status(200).json(company);
    } catch (err) {
      serverError(res, err);
    }
};
  
deleteCompanyById = async (req, res) => {
  try {
      const numAffectedRows = await Company.destroy({
        where: { companyId: req.params.id },
      });
      if (numAffectedRows === 0) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.sendStatus(200);
    } catch (err) {
      serverError(res, err);
    }
};
  

module.exports = {
    getAllCompanies,
    getCompanyById,
    getAllCompaniesByAdminUserId,
    createCompany,
    updateCompanyById,
    deleteCompanyById,
};
