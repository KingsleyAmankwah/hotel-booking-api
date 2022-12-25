const asynchandler = require("express-async-handler");
const User = require("../models/userModel");

const getUser = asynchandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getUsers = asynchandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const deleteUser = asynchandler(async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const updateUser = asynchandler(async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
