import express from "express";
import BusCompany from "../models/busComp.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import SingleBus from "../models/BusDeatil.js";
import User from "../models/User.js";
import { sendBookingDetails } from "../services/MAIL.js";
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);

const DIR = "./uploads";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname.toLowerCase().split(" ").join("-"));
  },
});

const upload = multer({
  storage: storage,
});

function validBusCompID(id) {
  BusCompany.findById(id, (err, data) => {
    if (err) return false;

    if (data) return true;
  });
}

router.post("/imagesUpload/:id", upload.array("files", 10), (req, res) => {
  let id = req.params.id;
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + "/uploads/" + req.files[i].filename);
  }

  BusCompany.findById(id, (err, user) => {
    if (err) res.status(400).json(err);

    if (user) {
      const singlebus = new SingleBus({
        images: reqFiles,
      });

      singlebus
        .save()
        .then((data) => {
          res.status(200).json({ status: true, data: data });
        })
        .catch((err) => {
          res.status(400).json({ status: false, data: err });
        });
    }
  });
});

router.post("/addBusDetail/:id", (req, res) => {
  let id = req.params.id;
  if (!req.body) res.status(400).json("Error");

  const {
    name,
    bus_no,
    seats,
    singleRent,
    doubleRent,
    boardingCity,
    droppingCity,
    boardingPoint,
    droppingPoint,
    restPoint,
    emergencyContact,
    busaminities,
    busCompID,
  } = req.body;

  SingleBus.findById(id, (err, data) => {
    if (err) res.status(400).json({ status: false, data: err });

    if (data) {
      data.name = name;
      data.bus_no = bus_no;
      data.seats = seats;
      data.singleRent = singleRent;
      data.doubleRent = doubleRent;
      data.boardingPoint = boardingPoint;
      data.droppingPoint = droppingPoint;
      data.boardingCity = boardingCity;
      data.droppingCity = droppingCity;
      data.restPoint = restPoint;
      data.emergencyContact = emergencyContact;
      data.busaminities = busaminities;
      data.busCompID = busCompID;

      data
        .save()
        .then((rdata) => {
          res.status(200).json({
            status: true,
            data: rdata,
            alert: {
              title: "Bus Added!",
              text: "New bus added to system",
              icon: "success",
              confirmTextButton: "Ok!",
            },
          });
        })
        .catch((err) => {
          res.status(200).json({ status: false, data: err });
        });
    }
  });
});

router.get("/allbusDetails", (req, res) => {
  SingleBus.find({}, (err, data) => {
    if (err) res.status(400).json(err);

    if (data) res.status(200).json(data);
  });
});

router.get("/busDetails/:id", (req, res) => {
  let id = req.params.id;

  SingleBus.findById(id, (err, data) => {
    if (err) res.status(200).json(err);

    if (data) res.status(200).json({ status: true, data: data });
  });
});

router.get("/busesData/:id", (req, res) => {
  let id = req.params.id;

  SingleBus.find({ busCompID: id }, (err, data) => {
    if (err) res.status(400).json(err);

    if (data) res.status(200).json({ status: true, data: data });
  });
});

router.post("/updateBusData/:id", (req, res) => {
  let id = req.params.id;

  const reqData = req.body;

  SingleBus.findById(id, (err, user) => {
    if (err) res.status(400).json("Error!, No data found");

    if (user) {
      user.name = reqData.name;
      user.seats = reqData.seats;
      user.singleRent = reqData.singleRent;
      user.doubleRent = reqData.doubleRent;
      user.restPoint = reqData.restPoint;
      user.boardingPoint = reqData.boardingPoint;
      user.droppingPoint = reqData.droppingPoint;
      user.boardingCity = reqData.boardingCity;
      user.droppingCity = reqData.droppingCity;

      user
        .save()
        .then(() => {
          res.status(200).json({
            status: true,
            alert: {
              text: "Data Updated",
              icon: "success",
              title: "Update Success",
              confirmButtonText: "OK",
            },
          });
        })
        .catch((err) => {
          res.status({ status: false, data: err });
        });
    }
  });
});

router.post("/markDate/:id", (req, res) => {
  let id = req.params.id;

  SingleBus.findById(id, (err, user) => {
    if (err) res.status(400).json(err);

    if (user) {
      user.busDate = req.body.busDate;
      user
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            data: data,
            alert: {
              title: "Date Saved",
              text: `Bus Route is set for ${req.body.busDate}`,
              icon: "success",
              confirmButtonText: "Ok",
            },
          });
        })
        .catch((err) => {
          res.status(200).json({
            status: false,
            alert: {
              title: "Server Error",
              text: `Please try later due to server error`,
              icon: "error",
              confirmButtonText: "Ok",
            },
          });
        });
    }
  });
});

router.post("/bookseat/:id", (req, res) => {
  let id = req.params.id;

  const reqData = req.body;

  if (!reqData) res.status(200).json("No Data found");

  SingleBus.findById(id, (err, user) => {
    if (err) res.status(500).json({ status: false, data: err });

    if (user) {
      let userid = reqData.bookUserDetail._id;

      User.findById(userid, (err, data) => {
        if (err) res.status(500).json("Error");

        if (data) {
          data.bookings.push(reqData);

          data
            .save()
            .then((rData) => {
              console.log("User data is added to database");
            })
            .catch((err) => {
              console.log("Error occur at user side");
            });
        }
      });
      user.seatsArr = user.seatsArr.concat(reqData.seats);
      user.userInfo.push(reqData);

      user
        .save()
        .then((tData) => {
          res.status(200).json({
            status: true,
            data: tData,
            alert: {
              title: "Seats Booked",
              text: "Booking has been done,Please check your mail",
              icon: "success",
              confirmButtonText: "OK!",
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: false,
            data: err,
            alert: {
              title: "Server side Error occur",
              text: "Please try later due to error",
              icon: "error",
              confirmButtonText: "Sorry!",
            },
          });
        });
      //
    }
  });
});


export default router;
