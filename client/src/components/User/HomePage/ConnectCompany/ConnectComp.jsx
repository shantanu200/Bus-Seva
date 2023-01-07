import React from 'react'
import { useNavigate } from 'react-router-dom'

const ConnectComp = () => {
  const navigate = useNavigate();
  return (
    <div className='m-6 p-4 flex flex-col space-y-4 md:flex-row md:space-y-0 justify-around'>
      <div className='basis-1/2 text-center p-4 flex flex-col items-center justify-center space-y-4'>
        <div className='text-xl md:text-3xl font-semibold border-b-2 border-zinc-400'>Become a Patner in Buisness</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus praesentium, voluptatem minus eum laboriosam aperiam qui quis deleniti ratione eveniet consequatur magnam vel. Harum minus adipisci eaque at quis ipsum!</div>
        <button className='border w-2/3 md:w-1/3 p-2 text-white bg-zinc-800 hover:bg-zinc-700 duration-200 rounded-sm' onClick={() => navigate(`/compDash`)}>Start Buisness</button>
      </div>
      <div className='basis-1/2 flex justify-center items-center cursor-pointer'>
        <img alt="" src='images/buisness.svg' className='w-10/12 h-2/3 hover:scale-105 duration-75' />
      </div>
    </div>
  )
}

export default ConnectComp