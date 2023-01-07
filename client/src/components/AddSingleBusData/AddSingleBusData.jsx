import React, { useState } from 'react'
import BusInformationForm from './BusInformationForm';
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import BusesData from '../BusesData/BusesData';
import BusesBoardDrop from './BusesBoardDrop';

const AddSingleBusData = () => {
  const [isClicked, setIsClicked] = useState(false);
  const handleADD = () => {
    setIsClicked(!isClicked);
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <BusesBoardDrop />
    </div>
  )
}

export default AddSingleBusData