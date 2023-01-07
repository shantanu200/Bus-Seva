import React,{useState} from 'react'
import OTPValidation from '../../../components/User/Register/OTPValidation'
import Register from '../../../components/User/Register/Register';

const UserRegister = () => {
  const [isOTP,setIsOTP] = useState(false);
  const [userReg,setUserReg] = useState({});
  return (
   <div className='min-h-screen w-full bg-zinc-900 flex items-center justify-center'>
   {isOTP ? <OTPValidation userReg={userReg} /> : <Register setIsOTP={setIsOTP} setUserReg={setUserReg} />}
   </div>
  )
}

export default UserRegister