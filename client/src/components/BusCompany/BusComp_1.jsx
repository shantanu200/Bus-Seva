import React, { useState } from "react";
import axios from "axios";
import CompanyData from "../../api/postAPI/BusCompany";
import Swal from "sweetalert2";
import validator from "validator";

const BusComp = ({ nextStep, setBusCompData, busCompData }) => {
  const handleField = (e) => {
    setBusCompData({
      ...busCompData,
      [e.target.name]: e.target.value,
    });
  };

  const handleButton = (e) => {
    e.preventDefault();

    if (
      validator.isEmpty(busCompData.name) ||
      validator.isEmpty(busCompData.date) ||
      validator.isEmpty(busCompData.busCount) ||
      validator.isEmpty(busCompData.des)
    ) {
      Swal.fire({
        title: "Error!!",
        text: "All Fields are Compulsory",
        icon: "error",
        confirmButtonText: "Re-Enter",
      });
    } else {
      Swal.fire({
        title: "Success!!",
        text: "Please Fill Contact Details",
        icon: "success",
        confirmButtonText: "NextStep",
      });
      nextStep();
    }
  };

  return (
    <div className="flex items-center justify-center bg-zinc-800 min-h-screen w-full">
      <div className="bg-white rounded-lg m-4 w-3/4 md:w-1/3">
        <div className="text-3xl p-4 mx-2 my-4 uppercase font-semibold border-b-2  border-gray-400">
          Company Details
        </div>
        <div className="m-6">
          <form action="#" className="flex flex-col space-y-4">
            <div>
              <label className="text-lg">Company Name</label>
              <br />
              <input
                className="mt-2 w-full p-2 border border-zinc-600 focus:outline-none"
                name="name"
                placeholder="Company Name"
                onChange={handleField}
              />
            </div>
            <div>
              <label>Company Registration Date</label>
              <br />
              <input
                className="mt-2 w-full p-2 border border-zinc-600 focus:outline-none"
                type="date"
                name="date"
                onChange={handleField}
              />
            </div>
            <div>
              <label>Total Count of Buses</label>
              <br />
              <input
                className="mt-2 w-full p-2 border border-zinc-600 focus:outline-none"
                name="busCount"
                type="Number"
                placeholder="Buses Count"
                onChange={handleField}
              />
            </div>
            <div>
              <label>Description about Company</label>
              <br />
              <textarea
                rows="4"
                className="mt-2 w-full p-2 border resize-none border-zinc-600 focus:outline-none"
                name="des"
                placeholder="Description..."
                onChange={handleField}
              />
            </div>
            <button
              className="border border-black bg-black text-white uppercase p-2 rounded-md hover:bg-gray-700 hover:border-gray-700"
              onClick={handleButton}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="text-center py-2">
          <span>Alredy Registered?<a href="/login" className="cursor-pointer text-green-600"> Login Here</a></span>
        </div>
      </div>
    </div>
  );
};

export default BusComp;
