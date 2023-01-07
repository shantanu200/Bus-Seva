import React,{useState} from "react";
import { BoardingPoint } from "../../constants/SeatMatrix";

const BordingDropping = ({dbData,user,setUser,nextStep,path,userLogID}) => {
  const [location,setLocation] = useState({
    boarding:"",
    dropping:""
  });
  const handleRadio = (e) => {
    const {name,value} = e.target;
    setLocation({...location,[name]:value});
  }

  const handleButton = async (e) => {
    e.preventDefault();
    if(location.boarding==="" || location.dropping===""){
        alert("Please select one place")
    }
    else{
       user.boardingPoint = location.boarding;
       user.droppingPoint = location.dropping;
    }
    nextStep();
  }
  return (
    <div className="bg-white w-10/12 md:w-1/2 rounded-sm">
      <div className="p-2 m-4 border-b-2 font-semibold border-zinc-400 text-xl md:text-2xl uppercase">
        Boarding and Dropping Point
      </div>
      <div className="flex">
        <div className="basis-1/2 text-center flex flex-col space-y-4">
        <div className="text-lg font-semibold underline">Boarding Points</div>
        {dbData?.boardingPoint.map((val, id) => {
          return (
            <div key={id}>
              <input onChange={handleRadio} name="boarding" type={"radio"} value={val.location+" "+val.time} className="mr-2" />{val.location+" "+val.time}
            </div>
          );
        })}
        </div>
        <div className="border-l-2 m-2 border-zinc-400"></div>
        <div className="basis-1/2 text-center flex flex-col space-y-4">
        <div className="text-lg font-semibold underline">Dropping Points</div>
        {dbData?.droppingPoint.map((val, id) => {
          return (
            <div key={id}>
              <input name="dropping" onChange={handleRadio} type={"radio"} value={val.location+" "+val.time} className="mr-2" />{val.location+" "+val.time}
            </div>
          );
        })}
        </div>
      </div>
      <div className="p-2 m-4">
        <button onClick={handleButton} className="w-full p-2 text-white bg-zinc-700 hover:bg-zinc-600 duration-200">Pay the Bill</button>
      </div>
    </div>
  );
};

export default BordingDropping;
