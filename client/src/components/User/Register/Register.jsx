import React, { useState } from "react";
import Swal from "sweetalert2";
import validator from "validator";
import axios from "axios";

const Register = ({setIsOTP,setUserReg}) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleAPI = async () => {
    let response;
    await axios.post("http://localhost:6969/user/register",user)
    .then((res) => {
      response =  res.data;
    }).catch((err) => {
      response =  err;
    });
    return response;
  }

  const handleButton = async (e) => {
    e.preventDefault();

    if (
      validator.isEmpty(user.name) ||
      validator.isEmpty(user.email) ||
      validator.isEmpty(user.mobileNo) ||
      validator.isEmpty(user.password)
    ) {
      Swal.fire({
        title: "Error!! ❌",
        icon: "error",
        text: "All Fields are required",
        confirmButtonText: "Re-Submit",
      });
    }
    if (!validator.isEmail(user.email)) {
      Swal.fire({
        title: "Error!! ❌",
        icon: "error",
        text: "Invalid Email is Entered",
        confirmButtonText: "Re-Submit",
      });
    }
    if (!validator.isMobilePhone(user.mobileNo)) {
      Swal.fire({
        title: "Error!! ❌",
        icon: "error",
        text: "Invalid Mobile Number is Entered",
        confirmButtonText: "Re-Submit",
      });
    }

    const response = await handleAPI();
    
    if(response.status){
      setUserReg(user);
    }
    setIsOTP(response.status);
    Swal.fire(response.alert);


  };

  return (
    <div className="bg-white rounded-lg w-10/12 md:w-1/2 flex">
      <div className="w-1/2 p-4 m-4 md:flex hidden ">
        <img className="w-64 hover:scale-105 duration-200" alt="" src="images/userLogin.svg" />
      </div>
      <div className="md:border-l-2 md:m-2"></div>
      <div className="w-full md:w-1/2 p-4 m-4">
        <div className="uppercase text-3xl font-semibold text-center">
          Sign-Up
        </div>
        <div className="m-2">
          <form className="flex flex-col space-y-4">
            <div>
              <label>Full Name:</label>
              <br />
              <input
                name="name"
                type={"text"}
                className="border border-zinc-400 p-2 w-full focus:outline-none"
                placeholder="Full Name"
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Email:</label>
              <br />
              <input
                name="email"
                type={"email"}
                className="border border-zinc-400 p-2 w-full focus:outline-none"
                placeholder="Email"
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Mobile No:</label>
              <br />
              <input
                name="mobileNo"
                type={"Number"}
                className="border border-zinc-400 p-2 w-full focus:outline-none "
                placeholder="Mobile No"
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Password:</label>
              <br />
              <input
                name="password"
                type={"password"}
                className="border border-zinc-400 p-2 w-full focus:outline-none"
                placeholder="Password"
                onChange={handleInput}
              />
            </div>
            <button
              onClick={handleButton}
              className="bg-zinc-800 text-white p-2 rounded-lg duration-200 hover:bg-zinc-600"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="my-4 text-center">
          <span className="">
            Already a User?
            <a href="/userLogin" className="text-green-600">
              Login Here
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
