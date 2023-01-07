import React,{useState} from 'react'
import BusComp from '../../components/BusCompany/BusComp_1';
import BusComp_2 from '../../components/BusCompany/BusComp_2';
import BusComp_3 from '../../components/BusCompany/BusComp_3';

const BusCompany = () => {
  const [step,setStep] = useState(1);
  const [busCompData,setBusCompData] = useState({
    name: "",
    date:"",
    busCount:"",
    des:"",
    name_operator:"",
    email:"",
    contact:"",
    address:"",
    username:"",
    password:""
  });

  const nextStep = () => {
    setStep(step+1);
  }

  const GetComponent = () => {
    switch(step){
      case 1:
        return <BusComp nextStep={nextStep} busCompData={busCompData} setBusCompData={setBusCompData} />
      
      case 2:
        // eslint-disable-next-line react/jsx-pascal-case
        return <BusComp_2 nextStep={nextStep} busCompData={busCompData} setBusCompData={setBusCompData} />
      
      case 3:
        // eslint-disable-next-line react/jsx-pascal-case
        return <BusComp_3 busCompData={busCompData} setBusCompData={setBusCompData} />
      
      default:
        return ;
    }
  } 

  return (
    <>
    {GetComponent()}
    </>
  )
}

export default BusCompany