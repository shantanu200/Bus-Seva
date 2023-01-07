import React, { useState } from 'react'
import validator from 'validator';
import Swal from 'sweetalert2';
import {CompanyData} from '../../api/postAPI/BusCompany';
import { useNavigate } from 'react-router-dom';

const BusComp_3 = ({ setBusCompData, busCompData }) => {
  const navigate = useNavigate();
  const [cPassword, setCpassword] = useState({
    cPassword: ""
  });

  const handleField = (e) => {
    setBusCompData({
      ...busCompData,
      [e.target.name]: e.target.value
    });
  };

  const handleButton = (e) => {
    e.preventDefault();

    if (validator.isEmpty(busCompData.username) || validator.isEmpty(busCompData.password) || validator.isEmpty(cPassword.cPassword)) {
      Swal.fire({
        title: "Error!!",
        text: "All Fields are Compulsory",
        icon: "error",
        confirmButtonText: "Re-Enter"
      })
    }

    else if (busCompData.password !== cPassword.cPassword) {
      Swal.fire({
        title: "Error!!",
        text: "Password not matched",
        icon: "error",
        confirmButtonText: "Re-Enter"
      })
    }

    else{
      const response = CompanyData(busCompData);
      if(response.status){
        navigate(`/login`);
      }
    }
  }



  return (
    <div className='flex items-center justify-center bg-zinc-800 w-full min-h-screen'>
      <div className='bg-white rounded-lg m-4 w-3/4 md:w-1/3'>
        <div className='text-3xl mx-2 my-4 border-b-2 border-gray-400 font-semibold p-4 uppercase'>Login Details</div>
        <div className='m-6' >
          <form action="#" className='flex flex-col space-y-6' autoComplete='off'>
            <div>
              <label>
                Username
              </label>
              <br />
              <input placeholder='Username' type={"text"} name="username" className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' onChange={handleField} />
            </div>
            <div>
              <label>
                Password
              </label>
              <input placeholder='Password' type={"password"} name="password" className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' onChange={handleField} />
            </div>
            <div>
              <label>
                Confirm Password
              </label>
              <input placeholder='Confirm Password' type={"password"} name='cPassword' className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' onChange={(e) => setCpassword({ ...cPassword, [e.target.name]: e.target.value })} />
            </div>
            <button className='border border-black p-2 bg-black text-white uppercase hover:bg-gray-800' onClick={handleButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BusComp_3