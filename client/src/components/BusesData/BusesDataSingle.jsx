import React,{useState} from 'react'
import { BiBus } from "react-icons/bi";
import { MdEventSeat } from 'react-icons/md';
import { BsCash } from "react-icons/bs";
import { FaWifi, FaLocationArrow } from 'react-icons/fa';
import { MdEmergency, MdMovie } from 'react-icons/md';
import { BiBlanket } from 'react-icons/bi';
import { TbBatteryCharging2 } from 'react-icons/tb';
import {GoLocation} from "react-icons/go";
import {AiOutlineFieldNumber} from "react-icons/ai";
import { useEffect } from 'react';

const BusesDataSingle = ({ data }) => {
  const [images,setImages] = useState("");
  
  

  const IconsAmninities = [
    { element: <FaWifi />, label: "WIFI" },
    { element: <BiBlanket />, label: "Blanket" },
    { element: <TbBatteryCharging2 />, label: "Charging Point" },
    { element: <MdMovie />, label: "Movie" },
    { element: <FaLocationArrow />, label: "Track My Bus" },
    { element: <MdEmergency />, label: "Emergency Contact Number" },
  ];

  const getAminitiesIcon = (am) => {
    return(
      IconsAmninities.filter((val) => {
        return val.label === am
      })
    )
  }

  return (
    <>
      {(getAminitiesIcon("WIFI")[0].element)}
      {data.map((val, index) => {
        return (
          <div className='bg-white p-4 m-4 w-2/3 md:w-2/5 rounded-lg'>
            <div className='text-2xl m-2 font-semibold uppercase border-b-2 border-zinc-400 flex space-x-2'> <BiBus /> <div>{val.boardingPoint} {"<-->"} {val.droppingPoint}</div></div>
            <div className='m-2 p-2'>Images</div>
            <div className='p-2 m-2 text-lg inline-flex space-x-2'><AiOutlineFieldNumber /> <div>Bus Number: <span className='font-semibold ml-2'>{val.bus_no}</span></div></div>
            <div className='p-2 m-2 text-lg inline-flex space-x-2'><MdEventSeat /> <div>Max Seats Available: <span className='font-semibold ml-2'>{val.seats}</span></div></div>
            <div className='p-2 m-2 text-lg flex space-x-2'><BsCash /> <div>Single Seat Rent: <span className='font-semibold ml-2'>Rs. {val.singleRent}</span></div></div>
            <div className='p-2 m-2 text-lg flex space-x-2'><BsCash /> <div>Double Seat Rent: <span className='font-semibold ml-2'>Rs. {val.doubleRent}</span></div></div>
            <div className='p-2 m-2 text-lg flex space-x-2'><GoLocation/> <div>Rest Point: <span className='font-semibold ml-2'>{val.restPoint}</span></div></div>
            <div className='p-2 m-2 text-lg'>Aminities: <span className='font-semibold ml-2'>
            {val.busaminities.map((aval,aindex) => {
              return(
                <div key={aindex} className="flex space-x-4 p-2">
                  <div>{getAminitiesIcon(aval)[0].element}</div>
                  <div>{aval}</div>
                </div>
              )
            })}
            </span></div>
          </div>
        )
      })}
    </>
  )
}

export default BusesDataSingle