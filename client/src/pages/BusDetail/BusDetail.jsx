import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCompUserData } from "../../api/getAPI/api";
import ViewBusData from "../../components/BusData/ViewBusData";

const BusDetail = () => {
  const [data, setData] = useState();
  const [images, setImages] = useState();
  const LOGID = getCompUserData()._id;

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  useEffect(() => {
    async function getData() {
      await axios
        .get(`http://localhost:6969/busService/busDetails/${id}`)
        .then((res) => {
          
          setData(res.data.data);
        })
        .catch((err) => (err));
    }
    getData();
  }, [id]);


  return (
    <div className="min-h-screen w-full bg-zinc-800 flex items-center justify-center">
      <ViewBusData setData={setData}  data={data} id={id} />
    </div>
  );
};

export default BusDetail;
