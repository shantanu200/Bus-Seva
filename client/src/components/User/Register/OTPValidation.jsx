import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const OTPValidation = ({userReg}) => {
  const navigate = useNavigate();
  const [otpDetails,setOtpDetails] = useState({
    email:userReg?.email,
    otp:""
  });

  async function handleButton(e){
    e.preventDefault();
    
    await axios.post("http://localhost:6969/user/verify",otpDetails)
    .then((res) => {
        Swal.fire(res.data.alert);
        if(res.data.status){
          window.localStorage.setItem("LogUser",JSON.stringify(res.data.data));
          navigate("/");
        }
    }).catch((err) => {
      
    });
    

  }

  return (
    <div className='bg-white rounded-lg md:w-1/2 w-10/12 '>
      <div className='flex flex-col md:flex-row p-4 m-4 space-y-4 md:space-y-0'>
      <div className='md:w-1/2 flex items-center justify-center'>
      <img className='h-64 w-64 hover:scale-105 duration-200' alt='' src='images/otp.svg' />
      </div>
      <div className='border-l-2'></div>
      <div className='md:w-1/2 p-2 w-full flex flex-col'>
        <div className='text-center text-2xl uppercase font-semibold'>OTP Details</div>
        <div className='m-4'>
            <label>Enter OTP Here: </label>
            <br/>
            <input name="otp" onChange={(e) => setOtpDetails({...otpDetails,[e.target.name]:e.target.value})} className='mt-2 w-full border border-zinc-400 p-2 focus:outline-none' type={"text"} placeholder='OTP' />
        </div>
        <div className='m-4'>
            <button onClick={handleButton} className='uppercase rounded-lg bg-zinc-800 p-2 text-white hover:bg-zinc-700 duration-200 w-full'>Submit</button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default OTPValidation