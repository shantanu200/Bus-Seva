import React from 'react';
import {useNavigate} from "react-router-dom";
import { getCompUserData } from '../../../api/getAPI/api';


const Navbar = ({data}) => {
  
  const navigate = useNavigate();
  const LOGCOMPDATA = getCompUserData();
  const LOGID = getCompUserData()._id;
  return (
    <div className='bg-white p-4 m-2 flex justify-between'>
    <div>
      <span className='text-xl md:text-2xl uppercase font-semibold'><i className="fa-solid fa-bus mx-2"></i>{LOGCOMPDATA?.name}</span>
    </div>
    <div className='mr-12'>
      <nav>
        <ul className='hidden md:flex md:space-x-8 items-center'>
        <li className='text-lg font-semibold hover:scale-105 duration-200 text-zinc-500 hover:text-black'>Buses</li>
        <li className='text-lg font-semibold hover:scale-105 duration-200 text-zinc-500 hover:text-black'>Bookings</li>
        <li>
          <i class="fa-solid fa-user text-lg text-zinc-500 hover:text-black hover:scale-105 duration-200" onClick={() => navigate(`/updateCompData/${LOGID}`)}></i>
        </li>
        <li>
          <li>
           <button className='p-2 bg-zinc-800 hover:bg-zinc-700 duration-200 rounded-lg text-white' onClick={() => navigate(`/addBusData/${LOGID}`)}><i class="fa-solid fa-plus mr-2"></i> Add New Bus</button>
          </li>
        </li>
        </ul>
      </nav>
    </div>
    </div>
  )
}

export default Navbar