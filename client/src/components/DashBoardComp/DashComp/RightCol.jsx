import React from 'react'
import { useNavigate } from 'react-router-dom';
import Charts from './Charts'

const RightCol = ({data}) => {
  const navigate = useNavigate();
  var count = 0;
  var busBookCount = 0;
  var seatsBooked = 0;

  for(var i=0;i<data?.length;i++){
    if(data[i]?.seatsArr.length !== 0){
      busBookCount++;
      seatsBooked += data[i]?.seatsArr.length;
    }
  }
  return (
    <div className='w-full md:w-2/3'>
        <div className='flex flex-col md:flex-row'>
            <div className='text-center md:text-left md:w-1/2 py-4 px-2 m-2 text-lg border rounded-xl'>Buses Booked <span className='ml-2 text-2xl font-bold'>{busBookCount}</span></div>
            <div className='text-center md:text-left md:w-1/2 py-4 px-2 m-2 text-lg border rounded-xl'>Buses Registered <span className='ml-2 text-2xl font-bold'>{data?.length}</span></div>
            <div className='text-center md:text-left md:w-1/2 py-4 px-2 m-2 text-lg border rounded-xl'>Seats Booked<span className='ml-2 text-2xl font-bold'>{seatsBooked}</span></div>
        </div>
        <Charts data={data}  />
    <div className='p-2 m-2'>
      <span className='text-lg font-semibold'>Ongoing Buses</span>
      <div className='border p-4 overflow-hidden hover:overflow-y-scroll h-44 rounded-xl scroll-smooth'>
      <table className='w-full'>
      <tr className='bg-zinc-800 text-white'>
        <th className='p-2'>ID</th>
        <th>Boarding</th>
        <th>Dropping</th>
        <th>Time</th>
        <th>Action</th>
      </tr>
      {data?.busDate !== "" && data?.map((val,id)=> {
        if(val.busDate !== ''){
          return(
            <tr className='text-center'>
             <td className='p-4'>{++count}</td>
             <td>{val.boardingCity}</td> 
             <td>{val.droppingCity}</td>
             <td>{val.busDate}</td>
             <td><button className='bg-zinc-800 hover:bg-zinc-700 p-2 text-white duration-200 rounded-sm' onClick={() => navigate(`/busDetails/${val._id}`)}>Details</button></td>
            </tr>
          )
        }
      })}
      </table>
      </div>
    </div>
    </div>
  )
}

export default RightCol;