import React, { useState } from "react";
import { UpperSeatMatrix, LowerSeatMatrix } from "../../constants/SeatMatrix";
import { MdOutlineEventSeat, MdSouthEast } from "react-icons/md";

const SelectSeat = ({dbData,user,setUser,nextStep,path,userLogID}) => {
  const [seats, setSeats] = useState([]);
  const [upperLower, setUpperLower] = useState("lower");
  const [rent, setRent] = useState(0);

  const handleRent = (value, par) => {
    if (value === "single") {
      setRent(rent + (dbData?.singleRent) * par);
    }
    if (value === "double") {
      setRent(rent + (dbData?.doubleRent) * par);
    }
    if (value === "end") {
      setRent(rent + 1200 * par);
    }
  };
  const handleSeat = (value, seatType) => {
    if (seats.length < 6) {
      if (!seats.includes(value)) {
        setSeats([...seats, value]);
        handleRent(seatType, 1);
      } else {
        const temp = [...seats];
        temp.splice(temp.indexOf(value), 1);
        setSeats(temp);
        handleRent(seatType, -1);
      }
    } else {
      if (seats.includes(value)) {
        const temp = [...seats];
        temp.splice(temp.indexOf(value), 1);
        setSeats(temp);
        handleRent(seatType, -1);
      }
    }
  };

  const handleHeaderButton = () => {
    if (upperLower === "lower") {
      setUpperLower("upper");
    } else {
      setUpperLower("lower");
    }
  };

  const haveSeat = (value) => {
    if (seats.includes(value)) {
      return true;
    } else {
      return false;
    }
  };

  const alreadyBooked = (seat) => {
    if(dbData?.seatsArr?.includes(seat)){
      return true;
    }else{
      return false;
    }
  }

  const handleSeatColor = (seat) => {
    if(alreadyBooked(seat)){
      return "text-zinc-400 "
    }
    if(haveSeat(seat)){
      return "text-green-600"
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser({...user,seats:seats,rent:rent});
    nextStep();
  };
  return (
    <div className="bg-white m-8 md:w-1/2 w-10/12 rounded-sm">
    
          <div className="uppercase p-2 m-4 border-b-2 border-zinc-400 flex justify-between flex-col md:flex-row">
          <div className="text-xl md:text-2xl font-semibold p-2">Seat Matrix</div>
          <div className="border p-2 rounded-lg my-2">Single Seat Rent: <span className="text-red-600 font-semibold">Rs. {dbData?.singleRent}</span></div>
          <div className="border p-2 rounded-lg my-2">Double Seat Rent: <span className="text-red-600 font-semibold">Rs. {dbData?.doubleRent}</span></div>
        </div>
      <div className="p-2 m-4">
        <div className="text-red-600 text-center">
          *Please select seat numbers
        </div>
        <div className="flex justify-around my-4">
          <button
            onClick={handleHeaderButton}
            className={
              upperLower === "upper"
                ? "basis-1/3 px-4 py-2 uppercase bg-zinc-700 text-white  hover:bg-zinc-600 duration-200"
                : "basis-1/3 px-4 py-2 uppercase bg-white text-black  hover:bg-zinc-600 hover:text-white  duration-200"
            }
          >
            Upper
          </button>
          <div className="border-l-2 border-zinc-400"></div>
          <button
            onClick={handleHeaderButton}
            className={
              upperLower === "lower"
                ? "basis-1/3 px-4 py-2 uppercase bg-zinc-700 text-white hover:bg-zinc-600 duration-200"
                : "basis-1/3 px-4 py-2 uppercase bg-white text-black  hover:bg-zinc-600 hover:text-white  duration-200"
            }
          >
            Lower
          </button>
        </div>
        {upperLower === "lower" &&
          LowerSeatMatrix?.map((val, id) => {
            return (
              <div className="flex text-3xl md:text-4xl">
                <div className="basis-1/2 flex items-center justify-center">
                  <MdOutlineEventSeat
                    onClick={() => {if(!alreadyBooked(val.left[0])) handleSeat(val.left[0],"single")}}
                    className={
                      handleSeatColor(val.left[0])
                    }
                  />
                </div>
                <div className="border-l-2 border-zinc-400"></div>
                <div className="basis-1/2 flex items-center justify-center py-2 space-x-4">
                  <MdOutlineEventSeat
                    onClick={() => {if(!alreadyBooked(val.right[0])) handleSeat(val.right[0],"double")}}
                    className={
                      handleSeatColor(val.right[0])
                    }
                  />
                  <MdOutlineEventSeat
                    onClick={() => {if(!alreadyBooked(val.right[1])) handleSeat(val.right[1],"double")}}
                    className={
                      handleSeatColor(val.right[1])
                    }
                  />
                </div>
              </div>
            );
          })}
        {upperLower === "upper" &&
          UpperSeatMatrix?.map((val, id) => {
            return (
              <div className="flex text-3xl md:text-4xl">
                <div className="basis-1/2 flex items-center justify-center">
                  <MdOutlineEventSeat
                    onClick={() => {if(!alreadyBooked(val.left[0])) handleSeat(val.left[0],"double")}}
                    className={
                      handleSeatColor(val.left[0])
                    }
                  />
                </div>
                <div className="border-l-2 border-zinc-400"></div>
                <div className="basis-1/2 flex items-center justify-center py-2 space-x-4">
                  <MdOutlineEventSeat
                    onClick={() => {if(!alreadyBooked(val.right[0])) handleSeat(val.right[0],"double")}}
                    className={
                      handleSeatColor(val.right[0])
                    }
                  />
                  <MdOutlineEventSeat
                    onClick={() => {if(!alreadyBooked(val.right[1])) handleSeat(val.right[1],"double")}}
                    className={
                      handleSeatColor(val.right[1])
                    }
                  />
                </div>
              </div>
            );
          })}
        {seats.length > 0 && seats.length <= 6 && (
          <>
            {seats.length >= 6 && (
              <div className="my-4 p-2 text-center text-red-600 font-semibold">
                You can select maximum 6 seats.
              </div>
            )}
            <div className="p-4 my-2 border border-zinc-400 flex justify-between">
              {" "}
              <div>
                Seats:{" "}
                <span className="mx-2 text-purple-600 font-semibold">
                  {seats.join(" ,")}
                </span>
              </div>{" "}
              <div>
                |{" "}
                <span className="text-green-600 font-semibold">Rs. {rent}</span>
              </div>
            </div>
            <div className="my-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-zinc-700 text-white p-2 hover:bg-zinc-600 duration-200"
              >
                Enter Passenger Details
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectSeat;
