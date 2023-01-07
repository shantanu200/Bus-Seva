import mongoose from "mongoose";

const BusDetails = new mongoose.Schema({
  name: {
    type: String,
  },
  busDate:{
    type:String
  },
  bus_no: {
    type: String,
  },
  seats: {
    type: Number,
  },
  singleRent: {
    type: Number,
  },
  doubleRent: {
    type: Number,
  },
  boardingPoint: {
    type: Array,
  },
  droppingPoint: {
    type: Array,
  },
  boardingCity:{
    type:String
  },
  droppingCity:{
    type:String
  },
  restPoint: {
    type: String,
  },
  emergencyContact: {
    type: String,
  },
  busaminities: {
    type: Array,
  },
  images: {
    type: Array,
  },
  busCompID:{
    type:String
  },
  seatsArr:{
    type:Array
  },
  userInfo:{
    type:Array
  }
});

export default mongoose.model("SingleBus",BusDetails);
