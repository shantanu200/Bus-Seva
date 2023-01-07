import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { GetLogID } from '../../api/postAPI/BusCompany';
import BusesDataSingle from './BusesDataSingle';

const BusesData = () => {
  const [logID,setLOGID] = useState(GetLogID());
  const [busesData,setBusesData] = useState([]);
  
  useEffect(() => {
    async function getData(){
        await axios.get(`http://localhost:6969/busComp/getAllBuses/${logID}`)
        .then((res) => {
            setBusesData(res.data);    
        }).catch((err) => {
          
        })
    }
    getData();
  },[]);
  return (
    <div className='m-4 min-h-min w-full flex flex-col items-center justify-center md:flex-row md:flex-wrap'>
    <BusesDataSingle data={busesData}/>
    </div>
    
  )
}

export default BusesData