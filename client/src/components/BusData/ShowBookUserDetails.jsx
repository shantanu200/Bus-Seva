import React from 'react'
import { useState } from 'react';
import {FaMale,FaFemale} from "react-icons/fa";


const ShowBookUserDetails = ({data,userSelect,setUserSelect}) => {
  const [bookUser,setBookUser] = useState(data?.bookingUserDetails);
  const [users,setUsers] = useState(data?.passDetails);

  const MaleFemale = (gender) => {
    if(gender === "Male"){
        return <FaMale />
    }else{
        return <FaFemale />
    }
  }
  return (
    <div className='md:w-1/3 w-10/12 my-4  mx-4  bg-white rounded-sm'>
        <div className='p-2 m-2 border-b-2 border-zinc-400 text-xl font-semibold flex justify-between'>Booking Details <i class="fa-solid fa-xmark" onClick={() => setUserSelect(!userSelect)}></i></div>
        <div className='m-2 p-2'>
        <div>
            <div className=''>User Name: <span className='text-lg font-semibold'>{bookUser?.name}</span></div>
            <div className='my-2'>User Email: <span className='text-lg font-semibold'>{bookUser?.email}</span></div>
            <div className='my-2'>User Contact: <span className='text-lg font-semibold'>+91 {bookUser?.mobileNo}</span></div>
        </div>
        <div className='border-t-2 border-zinc-400 mx-2'></div>
        <div>
            {users?.passengerDetails.map((val,id) => {
               return(
                <div className='my-4'>
                    <div>Seat No: <span className='text-lg font-semibold text-red-600'>{val.seatsNo}</span></div>
                    <div> <span className='text-lg font-semibold flex items-center space-x-2'><p>{MaleFemale(val.gender)}</p> <p>{val.name}</p> <p>({val.age})</p></span></div>
                </div>
               )
            })}
        </div>
        <div className='border-t-2 border-zinc-400 mx-2'></div>
        <div className='my-4'>
        <span className='mr-4 font-semibold'>{users?.boardingPoint}</span>
        <i class="fa-solid fa-arrow-right-arrow-left"></i>
        <span className='ml-4 font-semibold'>{users?.droppingPoint}</span>
        </div>
        <div className='flex justify-evenly my-2 p-2'>
          <button className='p-2 w-1/3 bg-green-600 text-white rounded-sm hover:bg-green-500 duration-200'><i class="fa-solid fa-message mr-1"></i>Send Message</button>
          <button className='p-2 w-1/3 bg-blue-600 text-white rounded-sm hover:bg-blue-500 duration-200'><i class="fa-solid fa-phone"></i> Call User</button>
        </div>
        </div>

    </div>
  )
}

export default ShowBookUserDetails