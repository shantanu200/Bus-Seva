import React from 'react';
import validator from "validator";
import Swal from "sweetalert2";

const BusComp_2 = ({busCompData,setBusCompData,nextStep}) => {
  const handleField = (e) => {
    setBusCompData({
      ...busCompData,
      [e.target.name]:e.target.value
    });
  }

  const handleButton = (e) => {
    e.preventDefault();
    
    if(validator.isEmpty(busCompData.name_operator) || validator.isEmpty(busCompData.email) || validator.isEmpty(busCompData.contact) || validator.isEmpty(busCompData.address)){
      Swal.fire({
        title:"Error!!",
        text:"All Fields are Compulsory",
        icon:"error",
        confirmButtonText:"Re-Enter"
      })
    }else if(!validator.isEmail(busCompData.email)) {
      Swal.fire({
        title:"Error!!",
        text:"Invalid Email Details",
        icon:"error",
        confirmButtonText:"Re-Enter"
      })
    }else if(!validator.isMobilePhone(busCompData.contact)){
      Swal.fire({
        title:"Error!!",
        text:"Invalid Contact Details",
        icon:"error",
        confirmButtonText:"Re-Enter"
      })
    }else{
      Swal.fire({
        title:"Success!!",
        text:"Please fill Login Details",
        icon:"success",
        confirmButtonText:"Next-Step"
      });
      nextStep();
    }
  }
  return (
    <div className='min-h-screen flex bg-zinc-800 items-center justify-center w-full'>
      <div className='bg-white rounded-lg m-4 w-3/4 md:w-1/3'>
        <div className='text-3xl mx-2 my-4 p-4 font-semibold border-b-2 border-gray-400'>Contact Details</div>
        <div className='m-6'>
          <form action="#" className='flex flex-col space-y-6'>
            <div>
              <label>Name of Operator: </label>
              <br />
              <input type={"text"} placeholder='Name' name='name_operator' className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' onChange={handleField} />
            </div>
            <div>
              <label>Email: </label>
              <br />
              <input type={"email"} placeholder='Email' name="email" className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' onChange={handleField} />
            </div>
            <div>
              <label>Contact No.: </label>
              <br />
              <input type={"number"} minLength={"10"} placeholder='Contact (Only India)' name="contact" className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' onChange={handleField}/>
            </div>
            <div>
              <label>Address: </label>
              <br />
              <textarea type={"text"} placeholder='Permernant Address' name="address" cols="4" rows="4" className='w-full mt-2 border border-zinc-600 p-2 resize-none focus:outline-none' onChange={handleField} />
            </div>
            <button onClick={handleButton} className='border border-black p-2 bg-black text-white uppercase hover:bg-gray-800' >Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BusComp_2