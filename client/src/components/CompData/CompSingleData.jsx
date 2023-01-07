import React from 'react';
import { useNavigate } from 'react-router-dom';


const CompSingleData = ({ user }) => {
  const navigate = useNavigate();
  const handleUpdate = (id) => {
    navigate(`/updateCompData/${id}`);
  }
  return (
    <div className='w-full min-h-screen bg-gray-600 flex items-center justify-center'>
      <div className='bg-white m-4 rounded-lg w-2/3 md:w-1/3'>
        <div className='text-3xl font-semibold p-2 mx-2 my-4 border-b-2 border-zinc-400 uppercase'>Company Data</div>
        <div className='m-6 flex flex-col space-y-4'>
          <div className='text-lg'>Name of Company : <span className='font-semibold uppercase'>{user?.name}</span></div>
          <div className='text-lg'>Date of Registration : <span className='font-semibold'>{user?.registerDate}</span></div>
          <div className='text-lg'>Total Buses Count : <span className='font-semibold'>{user?.busesCount}</span></div>
          <div className='text-lg'>Name of Operator: <span className='font-semibold uppercase'>{user?.nameOfOperator}</span></div>
          <div className='text-lg'>Register Email : <span className='font-semibold'>{user?.email}</span></div>
          <div className='text-lg'>Register Contact : <span className='font-semibold'>{user?.contact}</span></div>
          <div className='text-lg'>Address : <span className='font-semibold ml-2'>{user?.address}</span></div>
          <div className='text-lg'>Username : <span className='font-semibold'>{user?.username}</span></div>
          <div className='border-t-2 border-zinc-400'></div>
          <div className='flex justify-between items-center'>
            <button className='bg-zinc-900 rounded-lg  p-2 text-white hover:bg-zinc-700 duration-200 uppercase' onClick={() =>{handleUpdate(user?._id)}} >Update Details</button>
            <button className='bg-zinc-900 rounded-lg  p-2 text-white hover:bg-zinc-700 duration-200 uppercase'>Add Bus Data</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompSingleData;