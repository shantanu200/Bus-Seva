import express from "express";
import User from "../models/User.js";
import { sendUserEmail, sendUserLoginEmail } from "../services/MAIL.js";
import { generateOTP } from "../services/OTP.js";
import SingleBus from "../models/BusDeatil.js";

const router = express.Router();

router.get("/:id", (req, res) => {
  let id = req.params.id;

  User.findById(id, (err, user) => {
    if (user) {
      res.status(200).json({
        userData: user,
      });
    }
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
  });
});

router.post("/register", (req, res) => {
  if (!req.body) res.status(500).json("Error: No Data Found");
  const { name, email, mobileNo, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(200).json({
        status: false,
        data: user,
        alert: {
          title: "ERROR!",
          icon: "error",
          text: "Already a User exist on these email",
          confirmButtonText: "Re-Submit",
        },
      });
    }
    if (err) {
      res.status(500).json({
        status: false,
        error: err,
      });
    }

    const otp = generateOTP();
    try {
      sendUserEmail({
        to: email,
        OTP: otp,
      });
      const user = new User({
        name,
        email,
        mobileNo,
        password,
        otp,
      });

      user
        .save()
        .then(() => {
          res.status(200).json({
            status: true,
            data: user,
            alert: {
              title: "Success!!",
              text: "Please Enter OTP",
              icon: "success",
              confirmButtonText: "Ok",
            },
          });
        })
        .catch((error) => {
          res.status(500).json({
            status: false,
            data: error,
            alert: {
              title: "Error!!",
              text: "Server Side Error Occured",
              icon: "error",
              confirmButtonText: "Wait!!",
            },
          });
        });
    } catch (error) {
      res.status(500).json({
        status: false,
        text: "Unable to login,Please try later",
        data: error,
      });
    }
  });
});

router.post("/verify", async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  res.send(user);
});

const validateUserSignUp = async (email, otp) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return {
      status: false,
      alert: {
        title: "Error!!",
        text: "User not found on that email",
        icon: "error",
        confirmButtonText: "Re-Enter",
      },
    };
  }
  if (user && otp !== user.otp) {
    return {
      status: false,
      alert: {
        title: "Error!!",
        text: "Invalid OTP Entered!!",
        icon: "error",
        confirmButtonText: "Re-Enter",
      },
    };
  }

  return {
    status: true,
    data: user,
    alert: {
      title: "Success!!",
      text: "Register Successfull!!",
      icon: "success",
      confirmButtonText: "OK!!",
    },
  };
};

router.post("/login", (req, res) => {
  if (!req.body) res.status(500).json("No Data Found");

  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err)
      return res.status(500).json({
        status: false,
        data: err,
        alert: {
          title: "Error ❌",
          icon: "error",
          text: "Server side error occur",
          confirmButtonText: "Wait!!",
        },
      });

    if (user) {
      if (user.password === password) {
        const otp = generateOTP();
        try {
          sendUserLoginEmail({
            to: email,
            OTP: otp,
          });

          user.otp = otp;
          user
            .save()
            .then(() => {
              res.status(200).json({
                status: true,
                data: user,
                alert: {
                  title: "Success!!",
                  text: "Please Enter OTP",
                  icon: "success",
                  confirmButtonText: "Ok",
                },
              });
            })
            .catch((error) => {
              res.status(500).json({
                status: false,
                data: error,
                alert: {
                  title: "Error!!",
                  text: "Server Side Error Occured",
                  icon: "error",
                  confirmButtonText: "Wait!!",
                },
              });
            });
        } catch (error) {
          res.status(500).json({
            status: false,
            text: "Unable to login,Please try later",
            data: error,
          });
        }
      }
      if (user.password !== password) {
        res.status(200).json({
          status: false,
          alert: {
            title: "Error ❌",
            icon: "error",
            text: "Password Not matched",
            confirmButtonText: "Re-Enter",
          },
        });
      }
    }
  });
});

router.post("/userUpdate/:id", (req, res) => {
  let id = req.params.id;
  if (!req.body) res.status(500).json("Data not found");

  User.findById(id, (err, user) => {
    if (err)
      res.status(200).json({
        status: false,
        alert: {
          title: "Error ❌",
          icon: "error",
          text: "Server side error occur",
          confirmButtonText: "Wait!",
        },
      });

    if (user) {
      const { name, email, mobileNo, gender, age } = req.body;
      user.name = name;
      user.email = email;
      user.mobileNo = mobileNo;
      user.gender = gender;
      user.age = age;

      user
        .save()
        .then(() => {
          res.status(200).json({
            status: true,
            data: user,
            alert: {
              title: "Success ✅",
              icon: "success",
              text: "User updated successfully",
              confirmButtonText: "Ok!",
            },
          });
        })
        .catch((err) => {
          res.status(200).json(err);
        });
    }
  });
});

router.get("/bookingDetails/:id", (req, res) => {
  let id = req.params.id;

  User.findById(id, (err, user) => {
    if (err) res.status(500).json(err);

    if (user) res.status(200).json(user.bookings);
  });
});

router.post("/cancelBook/:id", (req, res) => {
  let id = req.params.id;

  const { bookid, busId, seats } = req.body;

  User.findById(id, (err, user) => {
    if (err) res.status(200).json({ status: false, data: err });

    if (user) {
      SingleBus.findById(busId, (err, data) => {
        if (err) console.log(err);

        if (data) {
          const filterSeats = data?.seatsArr.filter((val, id) => {
            return !seats.includes(val);
          });
          const filterUser = data?.userInfo.filter((val, id) => {
            val.bookId !== bookid;
          });

          data.userInfo = filterUser;
          data.seatsArr = filterSeats;

          data
            .save()
            .then(() => {
              console.log("Seats Removed from Schema");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      const fData = user?.bookings.filter((val, id) => val.bookId !== bookid);
      user.bookings = fData;

      user
        .save()
        .then((data) => {
          res.status(200).json({ status: true, data: data });
        })
        .catch((err) => {
          res.status(200).json({ status: false, data: err });
        });
    }
  });
});

export default router;
