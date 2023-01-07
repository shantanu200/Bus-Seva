import React, { useState } from 'react'
import Login from '../../../components/User/Login/Login'
import OTPValidation from '../../../components/User/Register/OTPValidation';

const UserLogin = () => {
  const [userLog,setUserLog] = useState();
  const [isOTP,setIsOTP] = useState(false);
  return (
    <div className='min-h-screen w-full bg-zinc-800 flex items-center justify-center'>
    {isOTP ? <OTPValidation userReg={userLog} /> : <Login setUserLog={setUserLog} setIsOTP={setIsOTP} />}
    </div>
  )
}

export default UserLogin