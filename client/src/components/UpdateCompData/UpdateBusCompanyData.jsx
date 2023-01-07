// Remain: Integration with OTP Auth ....
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const UpdateBusCompanyData = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.split("/")[2];

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [nameOP, setNameOP] = useState("");
  const [busCount, setBusCount] = useState(0);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");


  useEffect(() => {
    async function getData() {
      await axios.get(`http://localhost:6969/busComp/getSingleComp/${path}`)
        .then((res) => {
          setName(res.data.name);
          setBusCount(res.data.busesCount);
          setDate(res.data.registerDate);
          setNameOP(res.data.nameOfOperator);
          setEmail(res.data.email);
          setContact(res.data.contact);
          setAddress(res.data.address);
        })
    }
    getData();
  }, [path]);

  const handleButton = (e) => {
    e.preventDefault();

    const postObj = {
      name,
      date,
      busCount,
      nameOP,
      email,
      contact,
      address
    }

    try {
      axios.post(`http://localhost:6969/busComp/updateData/${path}`, postObj)
        .then((res) => {
          Swal.fire(res.data.alert);
          if(res.data.status){
            navigate(`/compDash`);
          }
        })
    } catch (err) {
      
    }
  }

  return (
    <div className='min-h-screen w-full bg-zinc-800 flex items-center justify-center'>
      <div className='bg-white rounded-lg w-2/3 md:w-1/2 m-4'>
        <div className='uppercase mx-2 my-4 text-2xl p-2 font-semibold border-b-2 border-zinc-400'>Update Details</div>
        <div className='m-6'>
          <form action="#" className='flex w-full flex-col'>
          <div className='w-full flex md:flex-row flex-col'>
            <div className='basis-1/2 mx-4 space-y-4'>
              <div>
                <label>Name of Company: </label>
                <br />
                <input className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' value={name} onChange={(e) => {setName(e.target.value)}} />
              </div>
              <div>
                <label>Date of Registration: </label>
                <br />
                <input className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' value={date} type={"date"} onChange={(e) => {setDate(e.target.value)}} />
              </div>
              <div>
                <label>Total Bus Count: </label>
                <br />
                <input className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' value={busCount} onChange={(e) => {setBusCount(e.target.value)}} />
              </div>
              <div>
                <label>Name of Operator: </label>
                <br />
                <input className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' value={nameOP} onChange={(e) => {setNameOP(e.target.value)}} />
              </div>
            </div>
            <div className='border-l-2 border-zinc-400'></div>
            <div className='basis-1/2 mx-4 space-y-4 mt-4 md:mt-0'>
              <div>
                <label>Email: </label>
                <br />
                <input className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' value={email} onChange={(e) => {setEmail(e.target.value)}} />
              </div>
              <div>
                <label>Contact: </label>
                <br />
                <input className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none' value={contact} onChange={(e) => {setContact(e.target.value)}} />
              </div>
              <div>
                <label>Address of Office: </label>
                <br />
                <textarea cols={28} rows={5} className='w-full mt-2 border border-zinc-600 p-2 focus:outline-none resize-none' value={address} onChange={(e) => {setAddress(e.target.value)}} />
              </div>
            </div>
          </div>
          <div className='w-full'><button onClick={handleButton} className='w-full my-2 bg-zinc-700 rounded-sm hover:bg-zinc-600 text-white p-2'>Submit</button></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateBusCompanyData