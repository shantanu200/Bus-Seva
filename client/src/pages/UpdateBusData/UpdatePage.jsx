import React from 'react';
import UpdateBusCompanyData from '../../components/UpdateCompData/UpdateBusCompanyData';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

const UpdatePage = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [data,setData] = useState();
  
  useEffect(() => {
    async function getData(){
      await axios.get(`http://localhost:6969/busComp/getSingleComp/${path}`)
      .then((res) => {
        setData(res.data);
      }).catch((error) => {
        
      })
    }
    getData();
  },[])
  

  return (
    <UpdateBusCompanyData data={data} />
  )
}

export default UpdatePage