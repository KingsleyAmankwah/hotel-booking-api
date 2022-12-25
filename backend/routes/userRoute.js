const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user");

const router = express.Router();

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/:id", getUser);

router.get("/", getUsers);

module.exports = router;
