import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AuthOTP = ({user}) => {
  const navigate = useNavigate();
  const [otp,setOTP] = useState({otp:''});

  function handleButton(e){
    e.preventDefault();

    const user_auth = {email:user?.email,otp:otp.otp};

    axios.post("http://localhost:6969/busComp/verify",user_auth)
    .then((res) => {
        if(res.data.status){
          Swal.fire(res.data.alert);
          window.localStorage.setItem("compLogUser",JSON.stringify(res.data.user));
          navigate("/");
        }else{
            Swal.fire(res.data.alert)
        }
    }).catch((error) => {
        
    })

  }
  return (
    <div className='min-h-screen w-full bg-zinc-800 flex items-center justify-center'>
        <div className='rounded-lg m-4 bg-white w-2/3 md:w-1/3'>
        <div className='text-2xl uppercase p-2 my-4 mx-2 font-semibold border-b-2 border-gray-400' >OTP Details</div>
        <div className='m-6 '>
            <input placeholder='Enter OTP' name="otp" className='w-full p-2 border border-zinc-600 focus:outline-none' onChange={(e) => {setOTP({...otp,[e.target.name]:e.target.value})}}/>
            <button onClick={handleButton} className='uppercase w-full mt-4 bg-black text-white p-2 hover:bg-zinc-800 hover:border-zinc-800 duration-200 focus:outline-none'>Submit</button>
        </div>
        </div>
    </div>
  )
}

export default AuthOTP