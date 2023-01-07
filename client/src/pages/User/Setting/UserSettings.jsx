import React,{useState,useEffect} from "react";
import Header from "../../../components/User/Settings/Header";
import SingleBook from "../../../components/User/Settings/SingleBook";
import axios from "axios";
import { useLocation } from "react-router-dom";


const UserSettings = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    async function getData() {
      await axios
        .get(`http://localhost:6969/user/bookingDetails/${id}`)
        .then((res) => {
          setData(res.data);
        });
    }
    getData();
  }, [id]);
  return (
    <div className="min-h-screen w-full bg-zinc-800 flex items-center justify-center flex-col">
      <Header />
      {data?.map((val,id) => {
        return(
          <SingleBook data={val} />
        )
      })}
    </div>
  );
};

export default UserSettings;
