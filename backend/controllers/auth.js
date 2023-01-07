import { generateOTP } from "../services/OTP.js";
import { sendMail } from "../services/MAIL.js";
import BusCompany from "../models/busComp.js";

export async function signUpUser(req, res) {
  const { email, password } = req.body;

  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    BusCompany.findOne({ email: email }, function (err, db) {
      if (db) {
        if (db.password === password) {
          const otp = generateOTP();
          try {
            sendMail({
              to: email,
              OTP: otp,
            });
            db.otp = otp;
            db.save()
              .then(() => {
                res.status(200).json({
                  status: true,
                  data: db,
                  alert: {
                    title: "Success!!",
                    text: "Please Enter the OTP",
                    icon: "success",
                    confirmButtonText: "OK!!",
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
        } else {
          res.status(400).json({
            status: false,
            alert: {
              title: "Error!!",
              text: "Password not matched!!",
              icon: "error",
              confirmButtonText: "Re-Enter!",
            },
          });
        }
      }
    });
  } else {
    res.status(200).json({
      alert: {
        title: "Error!!",
        text: "User not found on that email",
        icon: "error",
        confirmButtonText: "Re-Enter",
      },
    });
  }
}

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  res.send(user);
};

const findUserByEmail = async (email) => {
  const user = await BusCompany.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const validateUserSignUp = async (email, otp) => {
  const user = await BusCompany.findOne({
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
  if (user && user.otp !== otp) {
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
    user: user,
    alert: {
      title: "Success!!",
      text: "Login Successfull!!",
      icon: "success",
      confirmButtonText: "OK!!",
    },
  };
};
const createUser__ = (email, password) => {
  BusCompany.findOne({ email: email }, function (err, db) {
    if (db) {
      if (password === db.password) {
        const otp = generateOTP();
        try {
          sendMail({
            to: email,
            OTP: otp,
          });
          db.otp = otp;
          db.save()
            .then(() => {
              return [true, db];
            })
            .catch((error) => {
              return [false, error];
            });
        } catch (error) {
          return [false, "Unable to sign up, Please try again later", error];
        }
      } else {
        return [false, "Password Not Matched"];
      }
    }
  });
};

async function createUser(email, password) {
  BusCompany.findOne({ email: email }, function (err, db) {
    if (db) {
      if (db.password === password) {
        const otp = generateOTP();
        try {
          sendMail({
            to: email,
            OTP: otp,
          });
          db.otp = otp;
          db.save()
            .then(() => {
              return [true, db];
            })
            .catch((error) => {
              return [false, error];
            });
        } catch (error) {
          return [false, "Unable to login,Please try later", error];
        }
      }
    }
  });
}
