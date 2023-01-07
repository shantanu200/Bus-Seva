import React from "react";
import { UpperSeatMatrix, LowerSeatMatrix } from "../../constants/SeatMatrix";
import { MdOutlineEventSeat, MdEventSeat } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ShowBookUserDetails from "./ShowBookUserDetails";

const SeatMatrix = () => {
  const location = useLocation();
  const [data, setData] = useState();
  const [sUser, setSUser] = useState({
    passDetails: [],
    bookingUserDetails: {},
  });
  const [userSelect, setUserSelect] = useState(false);
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    async function getData() {
      await axios
        .get(`http://localhost:6969/busService/busDetails/${path}`)
        .then((res) => {
          
          setData(res.data.data);
        });
    }
    getData();
  }, []);

  const handleSelectSeat = (seat) => {
    setUserSelect(!userSelect);
    const seatUser = data?.userInfo;
    for (var i = 0; i < seatUser.length; i++) {
      if (seatUser[i]?.seats.includes(seat)) {
        setSUser({
          passDetails: seatUser[i],
          bookingUserDetails: seatUser[i].bookUserDetail,
        });
      }
    }
  };

  const handleSeat = (seat) => {
    if (data?.seatsArr?.includes(seat)) {
      return <MdEventSeat onClick={() => handleSelectSeat(seat)} />;
    } else {
      return <MdOutlineEventSeat />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-center">
      <div className="bg-white w-10/12 md:w-1/2 rounded-sm my-4">
        <div className="p-2 m-2 text-xl md:text-2xl font-semibold uppercase border-b-2 border-zinc-400">
          Bus Booking Details
          
        </div>
        <div className="flex md:flex-row flex-col">
          <div className="basis-1/2 p-2 m-2 border rounded-lg border-zinc-300">
            <div className="text-center mb-4 text-lg font-semibold">
              Lower Section
            </div>
            {LowerSeatMatrix?.map((val, id) => {
              return (
                <div className="flex text-3xl md:text-4xl">
                  <div className="basis-1/2 flex items-center justify-center">
                    {handleSeat(val.left[0])}
                  </div>
                  <div className="border-l-2 border-zinc-400"></div>
                  <div className="basis-1/2 flex items-center justify-center py-2 space-x-4">
                    {handleSeat(val.right[0])}
                    {handleSeat(val.right[1])}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-l-2 my-2 border-zinc-600"></div>
          <div className="basis-1/2 p-2 m-2 border border-zinc-300 rounded-lg">
            <div className="text-center mb-4 text-lg font-semibold">
              Upper Section
            </div>
            {UpperSeatMatrix?.map((val, id) => {
              return (
                <div className="flex text-3xl md:text-4xl">
                  <div className="basis-1/2 flex items-center justify-center">
                    {handleSeat(val.left[0])}
                  </div>
                  <div className="border-l-2 border-zinc-400"></div>
                  <div className="basis-1/2 flex items-center justify-center py-2 space-x-4">
                    {handleSeat(val.right[0])}
                    {handleSeat(val.right[1])}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {userSelect && <ShowBookUserDetails data={sUser} userSelect={userSelect} setUserSelect={setUserSelect} />}
    </div>
  );
};

export default SeatMatrix;
