const Hotel = require("../models/hotelModel");
const Room = require("../models/roomModel");
const asynchandler = require("express-async-handler");

const createRoom = asynchandler(async (req, res) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }

    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
    res.status(200).json("Room has been deleted.");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

module.exports = {
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom,
};
