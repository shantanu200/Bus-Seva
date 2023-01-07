import React from 'react'
import { useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [contactData,setContactData] = useState({
    fullname:"",
    email:"",
    message:"",
  });

  const handleInput = (e) => {
    const {name,value} = e.target;

    setContactData({
        ...contactData,
        [name]:value
    });
  }

  const handleAPI = async () => {
    let response;
    await axios.post("http://localhost:6969/contact/contact",contactData)
    .then((res) => {
      response = res.data;
    }).catch((err) => {
      response = err;
    });
    return response;
  }

  const handleButton = async (e) => {
    e.preventDefault();
    
    const response = await handleAPI();

    Swal.fire(response.alert);
  }

  return (
    <div className='m-0 p-4 bg-zinc-800 flex'>
        <div className='m-4 p-2 w-1/2 hidden md:flex flex-col items-center justify-center space-y-8'>
            <img alt="" src="images/contact.svg" className='w-10/12 h-2/3 hover:scale-105 duration-200 cursor-pointer' />
            <div className='text-white text-2xl font-semibold uppercase'>Contact Us for your quries</div>
        </div>
        <div className='w-full md:w-1/2 m-4 flex items-center justify-center '>
         <div className='bg-white w-full md:w-10/12 rounded-lg'>
            <div className='p-2 m-4 text-xl md:text-2xl uppercase font-semibold border-b-2 border-zinc-400'>Connect US</div>
            <form className='flex flex-col space-y-4 m-4'>
                <input type={'text'} name='fullname' onChange={handleInput} className='p-2 border border-zinc-400 focus:outline-none' placeholder='Full Name' />
                <input type={'text'} name='email' onChange={handleInput} className='p-2 border border-zinc-400 focus:outline-none' placeholder='Email' />
                <textarea name='message' cols={"30"} rows={"6"} onChange={handleInput} className='p-2 border border-zinc-400 focus:outline-none resize-none' placeholder='Message for Us'/>
                <button onClick={handleButton} className='border border-zinc-400 p-2 uppercase bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg'>Send Message</button>
            </form>
         </div>
        </div>
    </div>
  )
}

export default ContactForm