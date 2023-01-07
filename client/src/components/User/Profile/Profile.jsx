import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";



const Profile = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [newUser, setNewUser] = useState();
  const [updateMode, setUpdateMode] = useState(false);

  const handleAPI = async () => {
    let response;
    await axios
      .post(`http://localhost:6969/user/userUpdate/${path}`, newUser)
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        response = err;
      });

    return response;
  };

  useEffect(() => {
    async function getData() {
      await axios.get(`http://localhost:6969/user/${path}`).then((res) => {
        setNewUser(res.data.userData);
      });
    }
    getData();
  }, []);

  const handleButton = async (e) => {
    e.preventDefault();
   
    const response = await handleAPI();

    Swal.fire(response.alert);

    if(response.status){
      window.localStorage.removeItem("LogUser");
      window.localStorage.setItem("LogUser",JSON.parse(response.user));
    }

    window.location.reload(true);
  };

  return (
    <div className="p-4 m-4 bg-white md:w-1/2 w-2/3 flex justify-around rounded-sm">
      <div className="basis-1/2 flex items-center justify-center text-2xl font-semibold">
      <img src="images/profile.svg" alt="" />
      </div>
      <div className="basis-1/2">
        <div className="p-4 text-2xl uppercase border-b-2 m-2 font-semibold">
          Profile Data
        </div>
        <div className="p-4 flex flex-col space-y-4 justify-center text-sm md:text-lg">
          {updateMode ? (
            <div>
              <label className="font-semibold">Full Name: </label>
              <br />
              <input
                type={"text"}
                value={newUser?.name}
                className="mt-2 border p-2 w-full border-zinc-400 focus:outline-none"
                onChange={(e) => {
                  setNewUser({ ...newUser, name: e.target.value });
                }}
              />
            </div>
          ) : (
            <h1 className="flex">
              Name: <span className="ml-2 font-semibold">{newUser?.name}</span>
            </h1>
          )}
          {updateMode ? (
            <div>
              <label className="font-semibold">Email: </label>
              <br />
              <input
                type={"text"}
                value={newUser?.email}
                className="mt-2 border p-2 w-full border-zinc-400 focus:outline-none"
                onChange={(e) => {
                  setNewUser({ ...newUser, email: e.target.value });
                }}
              />
            </div>
          ) : (
            <h1 className="flex">
              Email:{" "}
              <span className="ml-2 font-semibold">{newUser?.email}</span>
            </h1>
          )}
          {updateMode ? (
            <div>
              <label className="font-semibold">Contact Number:</label>
              <br />
              <input
                type={"number"}
                value={newUser?.mobileNo}
                className="mt-2 border p-2 w-full border-zinc-400 focus:outline-none"
                onChange={(e) => {
                  setNewUser({ ...newUser, mobileNo: e.target.value });
                }}
              />
            </div>
          ) : (
            <h1 className="flex">
              Mobile Number:{" "}
              <span className="ml-2 font-semibold">{newUser?.mobileNo}</span>
            </h1>
          )}
          {updateMode ? (
            <h1 className="font-semibold">
              Gender:
              <div className="mt-2 flex space-x-8">
                <div>
                  <input
                    type={"radio"}
                    value="Male"
                    name="gender"
                    onChange={(e) =>
                      setNewUser({ ...newUser, gender: e.target.value })
                    }
                    className="mr-2"
                  />{" "}
                  <i class="fa-solid fa-person mr-2"></i> Male
                </div>
                <div>
                  <input
                    type={"radio"}
                    value="Female"
                    name="gender"
                    onChange={(e) =>
                      setNewUser({ ...newUser, gender: e.target.value })
                    }
                    className="mr-2"
                  />
                  <i class="fa-solid fa-person-dress mr-2"></i> Female
                </div>
              </div>
            </h1>
          ) : (
            <h1>
              Gender:{" "}
              <div className="mt-2 flex space-x-8">
                <div>
                  <input
                    type={"radio"}
                    value="Male"
                    name="gender"
                    className="mr-2"
                    checked = {newUser?.gender === "Male" ? true : false}
                  />{" "}
                  <i class="fa-solid fa-person mr-2"></i> Male
                </div>
                <div>
                  <input
                    type={"radio"}
                    value="Female"
                    name="gender"
                    className="mr-2"
                    checked = {newUser?.gender === "Female" ? true : false}
                  />
                  <i class="fa-solid fa-person-dress mr-2"></i> Female
                </div>
              </div>
            </h1>
          )}
          {updateMode ? (
            <div>
              <label className="font-semibold">Age: </label>
              <br />
              <input
                max="100"
                min="0"
                onChange={(e) =>
                  setNewUser({ ...newUser, age: e.target.value })
                }
                type={"number"}
                value={newUser?.age}
                className="w-full mt-2 border p-2 border-zinc-400 focus:outline-none "
                placeholder="Age"
              />
            </div>
          ) : (
            <h1 className="flex">
              Age :{" "}
              <span className="ml-2 font-semibold">
                {newUser?.age ? newUser?.age : "Not Set"}
              </span>
            </h1>
          )}
        </div>
        <div className="p-4">
          {!updateMode && (
            <button
              onClick={() => {
                setUpdateMode(!updateMode);
              }}
              className="bg-zinc-800 p-2 text-white"
            >
              Update Details
            </button>
          )}
          {updateMode && (
            <div className="flex justify-between">
              <button
                onClick={handleButton}
                className="bg-zinc-800 hover:bg-zinc-700 duration-200 rounded-sm p-2 text-white"
              >
                Change Details
              </button>
              <button
                onClick={() => {
                  setUpdateMode(!updateMode);
                }}
                className="bg-zinc-800 hover:bg-zinc-700 p-2 text-white rounded-sm duration-200"
              >
                Reset Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
