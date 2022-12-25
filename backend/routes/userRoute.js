const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user");
const { verifyUser, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyAdmin, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", verifyAdmin, getUsers);

module.exports = router;
