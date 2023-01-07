import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { GetLogID } from '../../api/postAPI/BusCompany';
import CompSingleData from '../../components/CompData/CompSingleData';


const CompData = () => {
  const [compData,setCompData] = useState({});
  const [path,setPath] = useState(GetLogID());
  
  useEffect(() => {
    async function getData(){
      await axios.get(`http://localhost:6969/busComp/getSingleComp/${path}`)
      .then((res) => {
        setCompData(res.data);
      })
    }
    getData();
  },[]);
  return (
    <>
    <CompSingleData user={compData}/>
    </>
    
  )
}

export default CompData;