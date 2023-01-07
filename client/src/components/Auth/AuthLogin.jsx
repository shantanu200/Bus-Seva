import React,{useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

const AuthLogin = ({setLogUser,setIsStatus}) => {
  const [user,setUser] = useState({
    email:"",
    password:""
  });

  const handleField = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    });
  }

  const handleButton = (e) => {
    e.preventDefault();
     
    axios.post("http://localhost:6969/busComp/login",user)
    .then((res) => {
      setLogUser(res.data.data);
      setIsStatus(res.data.status);
      Swal.fire(res.data.alert);
    })
  };

  return(
    <div className='flex items-center justify-center bg-zinc-800 w-full min-h-screen'>
      <div className='bg-white m-4 rounded-lg w-3/4 md:w-1/3'>
      <div className='text-3xl font-semibold p-4 mx-2 my-4 border-b-2 border-gray-400 uppercase'>Sign In</div>
      <div className='m-6'>
        <form action="#" className='flex flex-col space-y-4'>
          <div>
            <label>Email: </label>
            <br />
            <input type="text" name='email' placeholder='Email' className='w-full border border-zinc-600 p-2 mt-2 focus:outline-none' onChange={handleField}/>
          </div>
          <div>
            <label>Password: </label>
            <br />
            <input type="password" name="password" placeholder='Password' className='w-full border border-zinc-600 p-2 mt-2 focus:outline-none' onChange={handleField} />
          </div>
          <button className='w-full bg-black p-2 text-white uppercase hover:bg-gray-700 duration-200 hover:border-gray-700' onClick={handleButton}>Submit</button>
        </form>
      </div>
      <div className='text-center py-2'>
        <span>New User?<a href='/busComp' className='text-green-600 cursor-pointer'> Register Here</a></span>
      </div>
      </div>
    </div>
  )
}

export default AuthLogin;