import axios from "axios";
import React,{useState,useEffect} from "react";
import { getCompUserData } from "../../api/getAPI/api";
import Charts from "./DashComp/Charts";
import LeftCol from "./DashComp/LeftCol";
import Navbar from "./DashComp/Navbar";
import RightCol from "./DashComp/RightCol";

const DashBoardComp = () => {
  const LOGID = getCompUserData()._id;
  const [data,setData] = useState();
  
  
  useEffect(() => {
    async function getData(){
      await axios.get(`http://localhost:6969/busService/busesData/${LOGID}`)
      .then((res) => {setData(res.data.data)})
      .catch((err) => {});
    }
    getData();
  },[data]);
  
  
  return (
    <div className="bg-white w-10/12 rounded-sm m-8">
      
      <Navbar data={data} />
      <div className="border-b-2 mx-8 border-zinc-300"></div>
      <div className="flex md:flex-row flex-col">
        <LeftCol data={data} />
        <div className="border-l-2 m-4 border-zinc-400"></div>
        <RightCol data={data} />
      </div>
    </div>
  );
};

export default DashBoardComp;
