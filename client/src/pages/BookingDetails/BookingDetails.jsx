import React from 'react'
import SeatMatrix from '../../components/BusData/SeatMatrix'
import { useLocation } from 'react-router-dom'

const BookingDetails = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  
  return (
    <div className='bg-zinc-800 min-h-screen w-full flex items-center justify-center'>
    <SeatMatrix />
    </div>
  )
}

export default BookingDetails