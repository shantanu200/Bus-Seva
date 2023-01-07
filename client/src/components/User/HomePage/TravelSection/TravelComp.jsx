import React from 'react'

const TravelComp = () => {
  return (
    <div className='p-4 m-6 flex flex-col justify-around md:flex-row space-y-4 md:space-y-0'>
        <div className='basis-1/2 flex justify-center items-center'> 
            <img alt='' src='images/travel1.svg' className='w-10/12 h-2/3 hover:scale-105 duration-200 cursor-pointer' />
        </div>
        <div className='basis-1/2 text-center p-4 flex flex-col items-center justify-center space-y-4 '>
            <div className='text-xl md:text-3xl font-semibold border-b-2 border-zinc-400'>Travel and make memories</div>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam excepturi, alias animi, explicabo perferendis ea id hic quasi placeat, dolor maiores. Aperiam, quibusdam itaque laborum reiciendis inventore nam minus nisi?</div>
            <button className='border w-2/3 md:w-1/3 p-2 rounded-sm text-white bg-zinc-800 hover:bg-zinc-700 duration-200 my-2'>Get Started</button>
        </div>
        
    </div>
  )
}

export default TravelComp