import React from "react";
import { useState } from "react";
import validator from "validator";
import Swal from "sweetalert2";
import axios from "axios";

const Login = ({setUserLog,setIsOTP}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAPI = async () => {
    let response;
    await axios
      .post("http://localhost:6969/user/login", user)
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        response = err;
      });

    return response;
  };

  const handleButton = async (e) => {
    e.preventDefault();

    if (validator.isEmpty(user.email) || validator.isEmpty(user.password)) {
      Swal.fire({
        title: "Error ❌",
        icon: "error",
        text: "All fields are required",
        confirmButtonText: "Re-Submit",
      });
    }
    if (!validator.isEmail(user.email)) {
      Swal.fire({
        title: "Error ❌",
        icon: "error",
        text: "Invalid Email Entered",
        confirmButtonText: "Re-Submit",
      });
    }

    const response = await handleAPI();

    setIsOTP(response.status);
    if(response.status) setUserLog(response.data);
  };

  return (
    <div className="bg-white rounded-lg w-10/12 md:w-1/2 m-4">
      <div className="flex p-4">
        <div className="m-4 p-4 w-full md:w-1/2">
          <div className="uppercase font-semibold text-2xl text-center mb-2">
            Sign In
          </div>
          <form className="flex flex-col space-y-4">
            <div>
              <label>Email:</label>
              <br />
              <input
                name="email"
                type={"email"}
                onChange={handleInput}
                className="p-2 border border-zinc-400 w-full focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div>
              <label>Password:</label>
              <br />
              <input
                name="password"
                type={"password"}
                onChange={handleInput}
                className="p-2 border border-zinc-400 w-full focus:outline-none"
                placeholder="Password"
              />
            </div>
            <button
              onClick={handleButton}
              className="bg-zinc-800 p-2 rounded-lg text-white hover:bg-zinc-700 duration-200"
            >
              Submit
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="">
              New User?{" "}
              <a href="/userRegister" className="text-green-600">
                Register Here
              </a>
            </span>
          </div>
        </div>
        <div className="md:border-l-2 md:m-4"></div>
        <div className="md:w-1/2 md:m-4 md:p-4 hidden md:block">
          <img
            alt=""
            src="images/userLogin_2.svg"
            className="h-64 w-64 hover:scale-105 duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
