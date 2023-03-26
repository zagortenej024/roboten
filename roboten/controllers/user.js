const { User } = require("../models");
const { serverError } = require("../utils.js")
const { userPostSchema, userPatchSchema } = require("../schemas.js")


getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      serverError(res, err);
    }
};


createUser = async (req, res) => {
    try {
      const { value, error } = userPostSchema.validate(req.body);
      if(error) {
        res.status(422).json({ message: error });
      }
      const user = await User.create(value);
      res.status(201).json(user);
    } catch (err) {
      serverError(res, err);
    }
};


getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      serverError(res, err);
    }
};

getAllEmployeesByCompanyId = async (req, res) => {
  try {
    const companyId = req.param.company_id;
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: "User not found" });
    }
    const employees = await User.findAll({
      include: [
        {
          model: Company,
          attributes: [],
          through: { 
            model: UserCompany,
            where: { companyId: companyId, isAdmin: false }
          }
        }
      ]
    });
    return employees;
  } catch (err) {
    serverError(res, err);
  }
}

updateUserById = async (req, res) => {
    try {
      const { value, error } = userPatchSchema.validate(req.body);
      if(error) {
        res.status(422).json({ message: error });
      }
      const userId = req.params.id;
      const [numAffectedRows, [user]] = await User.update(value, {
        returning: true,
        where: { userId:  userId},
      });
      if (numAffectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      serverError(res, err);
    }
};
  

deleteUserById = async (req, res) => {
    try {
      const numAffectedRows = await User.destroy({
        where: { userId: req.params.id },
      });
      if (numAffectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.sendStatus(200);
    } catch (err) {
      serverError(res, err);
    }
};
  

module.exports = {
    getAllUsers,
    getUserById,
    getAllEmployeesByCompanyId,
    createUser,
    updateUserById,
    deleteUserById,
};
