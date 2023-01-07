import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import uuid from "react-uuid";
import { getUserData } from "../../api/getAPI/api";
import BordingDropping from "../../components/BookSeat/BordingDropping";
import PassengerDetails from "../../components/BookSeat/PassengerDetails";
import PaymentBill from "../../components/BookSeat/PaymentBill";
import SelectSeat from "../../components/BookSeat/SelectSeat";

const BookSeat = () => {
  const userLogID = getUserData();
  const [step, setStep] = useState(1);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [dbData,setdbData] = useState([]);
  const [userData, setUserData] = useState({
    seats: [],
    passengerDetails: [],
    boardingPoint: "",
    droppingPoint: "",
    rent: 0,
    isPaymentDone: false,
    paymentDetails: {},
    bookId:uuid(),
    bookUserDetail:userLogID,
    busID:path
  });

  useEffect(() => {
    async function getData(){
      await axios.get(`http://localhost:6969/busService/busDetails/${path}`)
      .then((res) => {setdbData(res.data.data)})
    };

    getData();
  },[]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const renderComponents = () => {
    let choice = step;
    switch (choice) {
      case 1:
        return (
          <SelectSeat
            user={userData}
            setUser={setUserData}
            nextStep={nextStep}
            path={path}
            userLogID={userLogID._id}
            dbData={dbData}
          />
        );

      case 2:
        return (
          <PassengerDetails
            user={userData}
            setUser={setUserData}
            nextStep={nextStep}
            path={path}
            userLogID={userLogID._id}
            dbData = {dbData}
          />
        );
      case 3:
        return (
          <BordingDropping
            user={userData}
            setUser={setUserData}
            nextStep={nextStep}
            path={path}
            userLogID={userLogID._id}
            dbData = {dbData}
          />
        );

      case 4:
        return (
          <PaymentBill dbData={dbData} user={userData} setUser={setUserData} path={path} userLogID={userLogID._id} />
        );
      
        default:
          return ;
    }
  };
  return (
    <div className="min-h-screen w-full bg-zinc-800 flex items-center justify-center">
      {renderComponents()}
    </div>
  );
};

export default BookSeat;
