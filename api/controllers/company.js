const { Company } = require("../models");
const { serverError } = require("../utils.js")


getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.findAll();
      res.status(200).json(companies);
    } catch (err) {
      serverError(res);
    }
};
  
  createCompany = async (req, res) => {
    try {
      const company = await Company.create(req.body);
      res.status(201).json(company);
    } catch (err) {
      serverError(res);
    }
};
  
  getCompanyById = async (req, res) => {
    try {
      const company = await Company.findByPk(req.params.id);
      if (!company) {
        res.status(404).json({ message: "Company not found" });
        return;
      }
      res.status(200).json(company);
    } catch (err) {
      serverError(res);
    }
};
  
  updateCompanyById = async (req, res) => {
    try {
      const [numAffectedRows, [company]] = await Company.update(req.body, {
        returning: true,
        where: { companyId: req.params.id },
      });
      if (numAffectedRows === 0) {
        res.status(404).json({ message: "Company not found" });
        return
      }
      res.status(200).json(company);
    } catch (err) {
      serverError(res);
    }
};
  
  deleteCompanyById = async (req, res) => {
    try {
      const numAffectedRows = await Company.destroy({
        where: { companyId: req.params.id },
      });
      if (numAffectedRows === 0) {
        res.status(404).json({ message: "Company not found" });
        return;
      }
      res.sendStatus(200);
    } catch (err) {
      serverError(res);
    }
};
  

module.exports = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompanyById,
    deleteCompanyById,
};
