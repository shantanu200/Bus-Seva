import React from "react";
import {useNavigate} from "react-router-dom";

const LeftCol = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="md:w-1/3 m-0">
      <div className="p-6">
        <span className="text-lg font-semibold">Buses Data</span>
        <div className="border rounded-xl p-2 flex flex-col space-y-8 md:h-96 overflow-hidden hover:overflow-y-scroll scroll-smooth">
          {data?.map((val, id) => {
            return (
              <div>
                <div className="flex justify-between">
                  <div className="p-2 font-bold">
                    <div className="text-lg">{val.name}</div>
                    <div className="text-sm">{val.bus_no}</div>
                    </div>
                  <button onClick={() => {navigate(`/busDetails/${val._id}`)}} className="p-2 my-2 bg-zinc-800 text-white rounded-sm">
                    Check Details
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>
      <div className="p-6  m-2">
        <span className="m-2 md:text-lg text-lg font-semibold">
        Contact Us
        </span>
        <div className="mt-4 m-2 flex justify-between">
          <button className="rounded-sm p-2 bg-zinc-700 text-white w-2/3 mr-2">
            <i class="fa-sharp fa-solid fa-comment"></i> Chat
          </button>
          <button className="rounded-sm p-2 bg-zinc-700 text-white w-2/3 ml-2">
            <i class="fa-solid fa-envelope"></i> Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftCol;
