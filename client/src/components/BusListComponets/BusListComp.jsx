import React from "react";
import { FaWifi, FaLocationArrow } from "react-icons/fa";
import { BiBlanket } from "react-icons/bi";
import { TbBatteryCharging2 } from "react-icons/tb";
import { MdMovie, MdEmergency } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BusListComp = ({ data }) => {
  const navigate = useNavigate();
  const aminitiesArr = [];
  const aminities = [
    { element: <FaWifi />, label: "WIFI" },
    { element: <BiBlanket />, label: "Blanket" },
    { element: <TbBatteryCharging2 />, label: "Charging Point" },
    { element: <MdMovie />, label: "Movie" },
    { element: <FaLocationArrow />, label: "Track My Bus" },
    { element: <MdEmergency />, label: "Emergency Contact Number" },
  ];

  for (var i = 0; i < aminities.length; i++) {
    if (data?.busaminities?.includes(aminities[i].label)) {
      aminitiesArr.push(aminities[i]);
    }
  }

  const handleButton = (e, id) => {
    e.preventDefault();

    navigate(`/selectSeat/${id}`);
  };

  if (data.length == 0) {
    return <h1 className="text-red-800">404 No Such Loaction Found!</h1>;
  }

  return (
    <div className="md:w-2/3 w-10/12 bg-white rounded-sm mt-8">
      <div className="p-2 text-lg font-semibold border-b-2 mx-4 my-2 flex justify-between">
        <div>
          <i class="fa-solid fa-bus-simple mr-2"></i> {data?.name}
        </div>
        <div>
          <i class="fa-regular fa-clock mr-2"></i>
          {data?.boardingPoint[0].time} -{" "}
          {data?.droppingPoint[data?.droppingPoint.length - 1].time}
        </div>
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="p-2 mx-4 my-2 text-sm md:text-lg">
          {" "}
          <span>{data?.boardingPoint[0].location}</span>{" "}
          <i class="fa-solid fa-arrow-right-arrow-left mx-2"></i>{" "}
          <span>{data?.droppingPoint[0].location}</span>{" "}
        </div>
       
        <div className="flex flex-col md:flex-row p-2 mx-4 my-2 md:space-x-8">
          {aminitiesArr.map((val, id) => {
            return (
              <div className="text-lg flex items-center text-zinc-500 hover:text-zinc-700 hover:scale-105 duration-200">
                <div className="mr-2 font-semibold text-black">
                  {val.element}
                </div>
                <div>{val.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-between md:flex-row border-b-2 md:border-b-0 border-zinc-400 mx-4">
        <div className="p-2  text-zinc-600">
          Available Seats:
          <span className="ml-2 text-black font-semibold">{data?.seats}</span>
        </div>
        <div className="p-2  text-zinc-600">
          Boarding Points:
          <span className="ml-2 text-black font-semibold">
            {data?.boardingPoint.length}
          </span>
        </div>
        <div className="p-2  text-zinc-600">
          Dropping Points:
          <span className="ml-2 text-black font-semibold">
            {data?.droppingPoint.length}
          </span>
        </div>
      </div>
      <div className="p-2 mx-4 my-2 flex md:flex-row flex-col border-b-2 border-zinc-400 md:border-b-0">
        <div className="md:w-1/2 my-2 flex">
          Single Rent:{" "}
          <span className="ml-2 font-semibold text-green-600">
            Rs. {data?.singleRent}
          </span>
        </div>
        <div className="md:w-1/2 my-2 flex">
          Double Rent:{" "}
          <span className="ml-2 font-semibold text-green-600">
            Rs. {data?.doubleRent}
          </span>
        </div>
      </div>
      <div className="p-2 mx-4 my-2 text-end mr-4 flex md:flex-row items-center justify-between flex-col">
        <div className="text-red-600">*Terms and Condition are applied</div>
        <button
          onClick={(e) => {
            handleButton(e, data?._id);
          }}
          className="mt-2 px-4 py-2 rounded-lg md:w-[25%] w-full bg-zinc-800 text-white hover:bg-zinc-700 duration-200"
        >
          Book Seats
        </button>
      </div>
    </div>
  );
};

export default BusListComp;
