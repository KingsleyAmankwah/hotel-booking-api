const Hotel = require("../models/hotelModel");
// const Room = require("../models/roomModel");
const asynchandler = require("express-async-handler");

const createHotel = asynchandler(async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
const updateHotel = asynchandler(async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const deleteHotel = asynchandler(async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getHotel = asynchandler(async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getHotels = asynchandler(async (req, res) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
};
