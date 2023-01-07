import React,{useRef, useState} from 'react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey : "AIzaSyAyiYqBDkr0lyLYEGwQO2blfW8-0_NFJeI",
    libraries:["places"],
    region:"in"
  });

  const [locations,setLocation] = useState({
    from:"",
    to:"",
    date:""
  });

  const fromRef = useRef();
  const toRef = useRef();
  
  const handleButton = async (e) => {
    e.preventDefault();
    locations.from = fromRef.current.value;
    locations.to = toRef.current.value;
    
    window.localStorage.setItem("searchData",JSON.stringify(locations));
    navigate(`/searchBus`);
  }
  



  if(!isLoaded) return <h1 className='text-red-600 text-center my-2'>Error 404 Google API not loaded</h1>
  return (
    <div className='bg-zinc-900 md:h-96 h-2/3 w-full flex items-center flex-col'>
    <div className='mx-4 my-16 p-2 border-b-2 border-white text-white text-xl md:text-3xl'>Book Bus and Enjoy Travelling</div>
    <div className='w-2/3 md:w-10/12 m-4'>
      <form className='flex items-center md:flex-row md:space-x-4 flex-col space-y-4 md:space-y-0'>
        <Autocomplete className='w-full'>
        <input ref={fromRef} name='from' type={"text"} className='w-full p-4 border border-zinc-400 focus:outline-none' placeholder='From' />
        </Autocomplete>
        <Autocomplete className='w-full'>
        <input  ref={toRef}  type={"text"} className='w-full p-4 border border-zinc-400 focus:outline-none' placeholder='To' />
        </Autocomplete>
        <input type={"date"} className='w-full p-4 border border-zinc-400 focus:outline-none' placeholder='Date' onChange={(e) => setLocation({...locations,date:e.target.value})}/>
        <button onClick={handleButton}  className='w-full p-4 bg-zinc-600 border border-zinc-600 text-white hover:bg-zinc-500 duration-200 uppercase'>Search Bus</button>
      </form>
    </div>
    </div>
  )
}

export default Search