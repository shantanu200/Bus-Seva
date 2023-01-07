import axios from "axios";
import React, { useState, useEffect } from "react";
import BusListComp from "../../components/BusListComponets/BusListComp";

const BusList = () => {
  const [rData, setRData] = useState();

  const data = JSON.parse(window.localStorage.getItem("searchData"));
  const from = data?.from.toLowerCase().replace(",", "").replace(" ", "");
  const to = data?.to.toLowerCase().replace(",", "").replace(" ", "");
  const date = data?.date;

  useEffect(() => {
    async function getData() {
      await axios
        .get("http://localhost:6969/busService/allbusDetails")
        .then((res) => {
          setRData(res.data);
        });
    }
    getData();
  }, []);

  const filtered = rData?.filter(
    (data) =>
      from.includes(data?.boardingCity?.toLowerCase()) &&
      to.includes(data?.droppingCity?.toLowerCase()) &&
      date === data.busDate
  );



  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-800 flex-col">
      {filtered?.length > 0 &&
        filtered?.map((val, idx) => {
          return <BusListComp key={idx} data={val} />;
        })}
      {filtered?.length == 0 && (
        <div className="bg-white p-2 m-2 rounded-sm text-red-600 font-semibold w-1/3">
          <div className="text-center my-4">404 No such data found in Database</div>
          <div className="my-2 text-center">
            <button className="border text-white bg-red-600 p-2 text-center">Send Query</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusList;
