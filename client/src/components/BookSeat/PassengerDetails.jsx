import React, { useState } from "react";

const PassengerDetails = ({dbData, user, setUser, nextStep,path,userLogID }) => {
  const [seatsNo, setSeatNo] = useState(user?.seats);

  const passArray = [];

  for (var e = 0; e < seatsNo.length; e++) {
    passArray.push({
      seatsNo:seatsNo[e],
      name: "",
      age: 0,
      gender: "",
    });
  }

  const [passDetails, setPassDetails] = useState(passArray);

 const handlePassName = (e,id) => {
  const newArr = [...passDetails];
  newArr[id]["name"] = e.target.value;
  setPassDetails(newArr);
 }

 const handlePassAge = (e,id) => {
  const newArr = [...passDetails];
  newArr[id]["age"] = e.target.value;
  setPassDetails(newArr);
 }

 const handlePassGender = (e,id) => {
  const newArr = [...passDetails];
  newArr[id]["gender"] = e.target.value;
  setPassDetails(newArr);
 }

 const isEmpty = () => {
  for(var e=0;e<passDetails.length;e++){
    if(passDetails[e].age===0 || passDetails[e].name==="" || passDetails[e].gender===""){
      return true;
    }
  }
  return false;
 }

 const hadleButton = async (e) => {
    e.preventDefault();   

    if(isEmpty()){
      alert("All fields are required");
    }else{
      user.passengerDetails = passDetails;
      nextStep();
    }
    
 }

  return (
    <div className="bg-white w-2/3 md:w-1/2 rounded-sm m-8">
      <div className="p-4 m-2 uppercase text-xl md:text-2xl font-semibold border-b-2 border-zinc-400">
        Passenger Details
      </div>
      <div className="p-4 m-2">
        {seatsNo.map((val, id) => {
          return (
            <div key={id}>
              <div>
                Seat No:
                <span className="ml-2 text-red-600 font-semibold">{val}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-evenly my-4">
                <input name="name" type={"text"} onChange={(e) => handlePassName(e,id)} className="border border-zinc-400 p-2 md:w-1/3 md:mr-2 mt-2 md:mt-0 focus:outline-none" placeholder="Full Name" />
                <input name="age" type={"number"} onChange={(e) => handlePassAge(e,id)} className="border border-zinc-400 p-2 md:w-1/3 md:mr-2 mt-2 md:mt-0 focus:outline-none" placeholder="Age"/>
                <div className="flex justify-around p-2 md:w-1/3 md:mr-2 mt-2 md:mt-0" onChange={(e) => handlePassGender(e,id)}>
                  <div>
                    <input type={"radio"} className="mr-2 font-semibold" name={"gender"+id} value="Male" />Male
                  </div>
                  <div>
                    <input type={"radio"} className="mr-2 font-semibold" name={"gender"+id} value="Female"  />Female
                  </div>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-2">
        <button onClick={hadleButton} className="w-full p-2 bg-zinc-700 text-white hover:bg-zinc-600 duration-200">Submit Details</button>
      </div>
    </div>
  );
};

export default PassengerDetails;
