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
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      serverError(res, err);
    }
};


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
        res.status(404).json({ message: "User not found" });
        return
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
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.sendStatus(200);
    } catch (err) {
      serverError(res, err);
    }
};
  

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
};
