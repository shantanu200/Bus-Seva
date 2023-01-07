import React, { useState } from "react";
import axios from "axios";
import { getCompUserData } from "../../api/getAPI/api";
import BoardingDropping from "./BoardingDropping";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ViewBusData = ({ data, images, setData, id }) => {
  const navigate = useNavigate();
  const LOGID = getCompUserData()._id;
  const [date, setDate] = useState({
    busDate: "",
  });
  const [updateMode, setUptMode] = useState(false);
  const [markRoute, setMarkRoute] = useState(false);

  const [board, setBoard] = useState(false);
  const [drop, setDrop] = useState(false);

  const handleData = async () => {
    let response;
    await axios
      .post(`http://localhost:6969/busService/updateBusData/${id}`, data)
      .then((res) => (response = res.data))
      .catch((err) => (err));

    return response;
  };

  if (!data) {
    return <h1 className="text-red-600">404 ERROR Entry Not Found</h1>;
  }

  const handleSubmit = async (e) => {
    setUptMode(!updateMode);
    e.preventDefault();
    const response = await handleData();
    
    Swal.fire(response.alert);
  };

  const handleDate = async (e) => {
    setMarkRoute(!markRoute);
    e.preventDefault();

    if (date === "" && markRoute) {
      Swal.fire({
        title: "Invaid Date",
        text: "Please Enter the Date",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    if (markRoute && date !== "") {
      axios
        .post(`http://localhost:6969/busService/markDate/${id}`, date)
        .then((res) => {
          Swal.fire(res.data.alert);
        });
    }
  };
  return (
    <div className="flex items-center justify-center flex-col w-full">
      <div className="bg-white rounded-sm m-8 w-10/12 md:w-2/3">
        <div className="p-2 m-2  uppercase  border-b-2 border-zinc-400 flex flex-col md:flex-row justify-between">
          <div className="font-bold text-lg md:text-2xl">Bus Details</div>
          <div className="">
            {markRoute && (
              <div className="text-end my-2">
                <label className="mr-4 text-lg font-semibold">Date:</label>
                <input
                  name="busDate"
                  className="border p-2 border-zinc-400"
                  onChange={(e) =>
                    setDate({ ...date, busDate: e.target.value })
                  }
                  type={"date"}
                  placeholder="Date"
                />{" "}
              </div>
            )}
            {!markRoute && (
              <div className="my-2">
                Date: <span className="ml-2 font-bold">{data?.busDate}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="p-2 m-2 md:basis-1/3 md:w-1/3 border border-zinc-300 rounded-lg flex justify-between flex-col">
            {data?.images.map((filePath, id) => {
              return (
                <div key={id}>
                  <img
                    className="w-full h-48 rounded-lg my-4 hover:scale-105 duration-200"
                    alt=""
                    src={filePath}
                  />
                </div>
              );
            })}
          </div>
          <div className="p-2 m-2 md:basis-2/3 md:w-2/3 flex flex-col md:flex-row border rounded-lg">
            <div className="md:w-1/2 p-4">
              <div>
                <i class="fa-solid fa-file-signature mr-2"></i>
                <label className="text-lg mb-2">Name</label>
                <br />
                {updateMode ? (
                  <input
                    className="p-2 border border-zinc-400 focus:outline-none font-semibold w-full"
                    value={data?.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                ) : (
                  <span className="text-lg font-semibold">{data?.name}</span>
                )}
              </div>
              <div className="mt-4">
                <i class="fa-solid fa-chair mr-2"></i>
                <label className="text-lg mb-2">Seats</label>
                <br />
                {updateMode ? (
                  <input
                    type={"number"}
                    className="p-2 border border-zinc-400 focus:outline-none font-semibold w-full"
                    value={data?.seats}
                    onChange={(e) =>
                      setData({ ...data, seats: e.target.value })
                    }
                  />
                ) : (
                  <span className="text-lg font-semibold">{data?.seats}</span>
                )}
              </div>
              <div className="mt-4">
                <i class="fa-solid fa-money-bills mr-2"></i>
                <label className="text-lg mb-2">Single Seat Rent</label>
                <br />
                {updateMode ? (
                  <input
                    type={"number"}
                    className="p-2 border border-zinc-400 focus:outline-none font-semibold w-full"
                    value={data?.singleRent}
                    onChange={(e) =>
                      setData({ ...data, singleRent: e.target.value })
                    }
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    Rs. {data?.singleRent}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <i class="fa-solid fa-money-bills mr-2"></i>
                <label className="text-lg mb-2">Double Seat Rent</label>
                <br />
                {updateMode ? (
                  <input
                    type={"number"}
                    className="p-2 border border-zinc-400 focus:outline-none font-semibold w-full"
                    value={data?.doubleRent}
                    onChange={(e) =>
                      setData({ ...data, doubleRent: e.target.value })
                    }
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    Rs. {data?.doubleRent}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <i class="fa-solid fa-hotel mr-2"></i>
                <label className="text-lg mb-2">Rest Point Hotel</label>
                <br />
                {updateMode ? (
                  <input
                    className="p-2 border border-zinc-400 focus:outline-none font-semibold w-full"
                    value={data?.restPoint}
                    type={"restPoint"}
                    onChange={(e) =>
                      setData({ ...data, restPoint: e.target.value })
                    }
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    {data?.restPoint}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <i class="fa-solid fa-gears mr-2"></i>
                <label className="text-lg mb-2">Aminities</label>
                <div className="text-sm font-semibold">
                  {data?.busaminities.join(", ")}
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-4 flex flex-col">
              <div className="">
                <i class="fa-solid fa-location-dot mr-2"></i>
                <label className="text-lg mb-2">Boarding Point:</label>
                {data?.boardingPoint.map((val, idx) => {
                  return (
                    <div className="text-sm font-semibold mb-2">
                      {val.location} {val.time}
                    </div>
                  );
                })}
                {updateMode && (
                  <button
                    onClick={() => setBoard(!board)}
                    className="p-2 mt-2 bg-zinc-800 text-white w-full"
                  >
                    Update Boarding Points
                  </button>
                )}
              </div>
              <div className="mt-4">
                <i class="fa-solid fa-location-dot mr-2"></i>
                <label className="text-lg mb-2">Dropping Point:</label>
                <br />
                {data?.droppingPoint.map((val, idx) => {
                  return (
                    <>
                      <span className="text-sm font-semibold mb-2">
                        {val.location} {val.time}
                      </span>
                      <br />
                    </>
                  );
                })}
                {updateMode && (
                  <button
                    onClick={() => setDrop(!drop)}
                    className="p-2 mt-2 bg-zinc-800 text-white w-full"
                  >
                    Update Dropping Points
                  </button>
                )}
              </div>
              <div className="mt-4">
                <i class="fa-solid fa-money-bills mr-2"></i>
                <label className="text-lg mb-2">Boarding City</label>
                <br />
                {updateMode ? (
                  <input
                    type={"text"}
                    className="p-2 border border-zinc-400 focus:outline-none font-semibold w-full"
                    value={data?.boardingCity}
                    onChange={(e) =>
                      setData({ ...data, boardingCity: e.target.value })
                    }
                  />
                ) : (
                  <span className="text-lg font-semibold">
                   {data?.boardingCity}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <i class="fa-solid fa-money-bills mr-2"></i>
                <label className="text-lg mb-2">Dropping City</label>
                <br />
                {updateMode ? (
                  <input
                    type={"text"}
                    className="p-2 border border-zinc-400 focus:outline-none font-semibold w-full"
                    value={data?.droppingCity}
                    onChange={(e) =>
                      setData({ ...data, droppingCity: e.target.value })
                    }
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    {data?.droppingCity}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-2 m-2"></div>
        <div className="w-full p-2 flex flex-col md:flex-row">
          <div className="md:w-1/2 flex md:justify-evenly my-2 justify-around">
            {updateMode ? (
            <button
              className="p-2 bg-green-800 hover:bg-green-700 text-white duration-200"
              onClick={handleSubmit}
            >
              Submit Details
            </button>
          ) : (
            <button
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white duration-200 rounded-lg"
              onClick={() => setUptMode(!updateMode)}
            >
              Update Details
            </button>
          )}

          <button
            className="p-2 bg-blue-700 text-white hover:bg-blue-600 duration-200 rounded-lg"
            onClick={() => navigate(`/bookingDetails/${id}`)}
          >
            Booking Details
          </button>
          </div>

          <div className="md:w-1/2 flex md:justify-evenly my-2 justify-around">
            <button
              className="p-2 text-white bg-purple-600 hover:bg-purple-500 duration-200 rounded-lg"
              onClick={handleDate}
            >
              {markRoute ? "Mark Date" : "Mark for Route"}
            </button>

            <button className="p-2 bg-red-800 hover:bg-red-700 text-white duration-200 rounded-lg">
              Delete Details
            </button>
          </div>
        </div>
      </div>

      {board && (
        <BoardingDropping
          fullData={data}
          data={data?.boardingPoint}
          setData={setData}
          type={"board"}
        />
      )}
      {drop && (
        <BoardingDropping
          fullData={data}
          data={data?.droppingPoint}
          setData={setData}
          type={"drop"}
        />
      )}
    </div>
  );
};

export default ViewBusData;
