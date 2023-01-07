import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { BiBlanket } from "react-icons/bi";
import { TbBatteryCharging2 } from "react-icons/tb";
import { FaWifi, FaLocationArrow } from "react-icons/fa";
import { MdMovie, MdEmergency, MdStackedLineChart } from "react-icons/md";
import { GetLogID } from "../../api/postAPI/BusCompany";
import { getCompUserData } from "../../api/getAPI/api";
import uuid from "react-uuid";

const BusInformationForm = ({ busData, setBusData, nextStep }) => {
  const logID = getCompUserData()._id;
  const [files, setFiles] = useState([]);

  const handleImages = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const [checked, setChecked] = useState([]);

  const handleField = (e) => {
    setBusData({
      ...busData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    var updateList = [...checked];

    if (e.target.checked) {
      updateList = [...checked, e.target.value];
    } else {
      updateList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updateList);
  };

  const isEmpty = () => {
    if (
      busData.name === "" ||
      busData.bus_no === "" ||
      busData.singleRent === "" ||
      busData.doubleRent === "" ||
      busData.restPoint === "" ||
      busData.emergencyContact === "" ||
      busData.boardingPoint.length === 0 ||
      busData.droppingPoint.length === 0 ||
      busData.busaminities.length === 0
    ) {
      return true;
    }
    return false;
  };

  const handleButton = (e) => {
    e.preventDefault();
    busData.busaminities = checked;
    let formData = new FormData();

    for (let key of Object.keys(files)) {
      formData.append("files",files[key]);
    }

    // if (isEmpty()) {
    //   Swal.fire({
    //     title: "Empty Fields",
    //     text: "All fields are required",
    //     icon: "error",
    //     confirmButtonText: "Re-Fill",
    //   });
    //   return ;
    // }else{
    axios.post(`http://localhost:6969/busService/imagesUpload/${logID}`,formData)
    .then((res) => {
      window.localStorage.setItem('imagesId',res.data.data._id);
    });
    nextStep();
    
  };

  const aminities = [
    { element: <FaWifi />, label: "WIFI" },
    { element: <BiBlanket />, label: "Blanket" },
    { element: <TbBatteryCharging2 />, label: "Charging Point" },
    { element: <MdMovie />, label: "Movie" },
    { element: <FaLocationArrow />, label: "Track My Bus" },
    { element: <MdEmergency />, label: "Emergency Contact Number" },
  ];

  return (
    <div className="bg-white rounded-lg w-2/3 shadow-lg m-8">
      <div className="p-2 mx-2 my-4 text-2xl border-b-2 border-zinc-400">
        Bus Information
      </div>
      <div className="m-6">
        <form
          action="#"
          className="flex flex-col"
          encType="multipart/form-data"
        >
          <div className="w-full flex flex-col md:flex-row">
            <div className="basis-1/3 space-y-4">
              <div>
                <label>Name of Bus: </label>
                <br />
                <input
                  name="name"
                  type="text"
                  className="mt-2 border border-zinc-400 p-2 w-full focus:outline-none"
                  placeholder="e.g Royal Travels"
                  onChange={handleField}
                />
              </div>
              <div>
                <label>Bus Number: </label>
                <br />
                <input
                  name="bus_no"
                  type="text"
                  placeholder="e.g MH-01-LA-5992"
                  className="mt-2 border border-zinc-400 p-2 w-full focus:outline-none uppercase"
                  onChange={handleField}
                />
              </div>
              <div>
                <label>Seats Capcity: </label>
                <br />
                <input
                  name="seats"
                  type="number"
                  placeholder="e.g 40"
                  className="mt-2 border border-zinc-400 p-2 w-full focus:outline-none"
                  onChange={handleField}
                />
              </div>
              <div>
                <label>Single Seat Rent</label>
                <input
                  name="singleRent"
                  type="number"
                  placeholder="e.g Rs. 1800"
                  className="mt-2 border border-zinc-400 p-2 w-full focus:outline-none"
                  onChange={handleField}
                />
              </div>
              <div>
                <label>Add Images (At least 2)</label>
                <input
                  type={"file"}
                  name="uploadImages"
                  accept="image/*"
                  className="mt-2 border border-zinc-400 p-2 w-full focus:outline-none"
                  multiple
                  onChange={handleImages}
                />
              </div>
            </div>
            <div className="border-l-2 mx-4 hidden  border-zinc-500 md:block"></div>
            <div className="basis-1/3 space-y-4 mt-4 md:mt-0">
              <div>
                <label>Double Seat Rent: </label>
                <br />
                <input
                  name="doubleRent"
                  type="number"
                  className="mt-2 border border-zinc-400 p-2 w-full focus:outline-none"
                  placeholder="e.g Rs. 1500"
                  onChange={handleField}
                />
              </div>
              <div>
                <label>Boarding Point: </label>
                <br />
                <input
                  name="boardingCity"
                  type="text"
                  placeholder="e.g Pune"
                  className="mt-2 border border-zinc-400 p-2 w-full focus:outline-none"
                  onChange={handleField}
                />
              </div>
              <div>
                <label>Dropping Point: </label>
                <br />
                <input
                  name="droppingCity"
                  type="text"
                  placeholder="e.g Nagpur"
                  className="mt-2 border border-zinc-400 p-2 w-full focus:outline-none"
                  onChange={handleField}
                />
              </div>
              <div>
                <label>Rest Stop Point: </label>
                <br />
                <input
                  name="restPoint"
                  type="text"
                  placeholder="e.g Hotel Taj,Mumbai"
                  className="mt-2 border border-zinc-400 p-2 w-full focus:outline-none"
                  onChange={handleField}
                />
              </div>
              <div>
                <label>Emergency Contact Number: </label>
                <br />
                <input
                  name="emergencyContact"
                  min={10}
                  max={10}
                  type="number"
                  placeholder="e.g 7709493932"
                  className="mt-2 border border-zinc-400 p-2 w-full focus:outline-none"
                  onChange={handleField}
                />
              </div>
            </div>
            <div className="border-l-2 mx-4 hidden  border-zinc-500 md:block"></div>
            <div className="basis-1/3">
              <div>
                <label>Amenities: </label>
                <br />
                {aminities.map((val, index) => {
                  return (
                    <div className="flex" key={index}>
                      <input
                        type="checkbox"
                        value={val.label}
                        onChange={handleCheck}
                      />
                      <span className="flex flex-row p-1">
                        <div className="m-2 text-lg">{val.element}</div>
                        <div className="m-2 text-sm">{val.label}</div>
                      </span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handleButton}
                className="w-full border mt-2 p-2 bg-black text-white uppercase rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusInformationForm;
