const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} = require("../controllers/hotel");
const router = express.Router();

router.post("/", createHotel);

router.put("/:id", updateHotel);

router.delete("/:id", deleteHotel);

router.get("/find/:id", getHotel);

router.get("/", getHotels);

module.exports = router;
