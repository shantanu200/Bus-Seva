import express from "express";
import { signUpUser, verifyEmail } from "../controllers/auth.js";
import BusCompany from "../models/busComp.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { addBusData } from "../controllers/AddBusData.js";
import { v4 as uuidv4 } from "uuid";
import { runInNewContext } from "vm";


const router = express.Router();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const DIR = "./uploads";

router.post("/postCompanyData", function (req, res) {
  if (!req.body) res.status(500).json("Data not recieved");

  const {
    name,
    date,
    busCount,
    des,
    name_operator,
    email,
    contact,
    address,
    username,
    password,
  } = req.body;

  BusCompany.findOne({ email: email }, function (err, compData) {
    if (compData)
      res.status(200).json({
        title: "Error!!",
        text: "Already a user exist on these mail",
        icon: "success",
        confirmButton: "Re-Enter",
        isSuccess: false,
      });
    if (err) res.status(500).json(err);
    else {
      const userData = new BusCompany({
        name: name,
        registerDate: date,
        busesCount: busCount,
        compDescription: des,
        nameOfOperator: name_operator,
        email: email,
        contact: contact,
        address: address,
        username: username,
        password: password,
      });

      userData.save().then(() => {
        res.status(200).json({
          title: "Success!!",
          text: "Please fill Login Details",
          icon: "success",
          confirmButton: "Next-Step",
          isSuccess: true,
        });
      });
    }
  });
});

router.get("/registerCompanies", function (req, res) {
  BusCompany.find({}, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.post("/login", signUpUser);
router.post("/verify", verifyEmail);

router.get("/getSingleComp/:id", function (req, res) {
  let id = req.params.id;

  BusCompany.findOne({ _id: id }, (err, data) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(data);
  });
});

router.post("/updateData/:id", function (req, res) {
  let id = req.params.id;

  const { name, date, busCount, nameOP, email, contact, address } = req.body;

  BusCompany.findOne({ _id: id }, (err, data) => {
    if (err) res.status(500).json(err);

    if (data) {
      data.name = name;
      data.registerDate = date;
      data.busesCount = busCount;
      data.nameOfOperator = nameOP;
      data.email = email;
      data.contact = contact;
      data.address = address;

      data
        .save()
        .then(() => {
          res.status(200).json({
            status: true,
            data: data,
            alert: {
              title: "Success!!",
              text: "Company Data has been updated",
              icon: "success",
              confirmButtonText: "OK!!",
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: false,
            data: err,
            alert: {
              title: "Error!!",
              text: "Error occured in Updating",
              icon: "error",
              confirmButtonText: "Wait!!",
            },
          });
        });
    }
  });
});

//Images Addition
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.toLowerCase().split(" ").join("-"));
  },
});

const upload = multer({
  storage: storage,
});

router.post("/imagesUpload/:id", upload.array("files", 10), (req, res) => {
  let id = req.params.id;
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + "/uploads/" + req.files[i].filename);
  }

  BusCompany.findById(id,(err,user) => {
    if(err) res.status(500).json(err);

    if(user){
      user.images.push(reqFiles);

      user.save().then(() => {
        res.status(200).json({status:true,message:"user is updated"});
      }).catch((err) => {
        res.status(500).json({status:false,message:"Error"});
      })
    }
  })
});

router.post("/addBusInfo/:id", (req, res) => {
  let id = req.params.id;
  if (!req.body) res.status(400).json({ error: "No data found" });

  const data = req.body;

  BusCompany.findById(id, (err, user) => {
    if (err) res.status(400).json({ status: false, error: err });
    else {
      user.buses.push(data);

      user
        .save()
        .then(() => {
          res.status(200).json({
            status: true,
            data: user,
            alert: {
              title: "Bus Created",
              icon: "success",
              text: "Bus Data is added to Database",
              confirmButtonText: "OK!",
            },
          });
        })
        .catch((err) => {
          res.status(500).json({ status: false, data: err });
        });
    }
  });
});



router.get("/getAllBuses/:id", function (req, res) {
  let id = req.params.id;

  BusCompany.findById(id, (err, data) => {
    if (err) res.status(500).json(err);

    if (data) {
      res.status(200).json(data.buses);
    }
  });

});

router.get("/busesData/:id",(req,res) => {
  let id = req.params.id;

  BusCompany.findById(id,(err,user) => {
    if(err) res.status(200).json(err);

    if(user) res.status(200).json({data:user.buses,images:user.images});
  })
})

router.post("/updateBusData/:id/:index",(req,res) => {
  let id = req.params.id;
  let index = req.params.index;
  
  const reqData = req.body;

  BusCompany.findById(id,(err,user) => {
    if(err) res.status(400).json("Error!, No data found");
    
    if(user){
      user.buses[index] = reqData;

      user.save().then(() => {
        res.status(200).json({status:true,alert:{
          text:"Data Updated",
          icon:"success",
          title:"Update Success",
          confirmButtonText:"OK"
        }});
      }).catch((err) => {
        res.status({status:false,data:err});
      })
    }
  })
})

export default router;
