import React, { useState } from "react";
import { getCompUserData } from "../../api/getAPI/api";
import AddSingleBusData from "../../components/AddSingleBusData/AddSingleBusData";
import BusesBoardDrop from "../../components/AddSingleBusData/BusesBoardDrop";
import BusInformationForm from "../../components/AddSingleBusData/BusInformationForm";
import Test from "../../components/AddSingleBusData/Test";

const AddBusData = () => {
  const logID = getCompUserData();
  const [step, setStep] = useState(1);
  const [busData, setBusData] = useState({
    name: "",
    bus_no: "",
    seats: 0,
    singleRent: 0,
    doubleRent: 0,
    boardingCity:"",
    droppingCity:"",
    boardingPoint: [],
    droppingPoint: [],
    restPoint: "",
    emergencyContact: "",
    busaminities: [],
    busCompID:getCompUserData()._id
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const renderComponent = () => {
    let choice = step;
    switch (choice) {
      case 1:
        return <BusInformationForm busData={busData} setBusData={setBusData} nextStep={nextStep} />;

      case 2:
        return <BusesBoardDrop logID={logID} busData={busData} setBusData={setBusData} />;
      
      default:
        return;
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-800">
    {renderComponent()}
    </div>
  );
};

export default AddBusData;
