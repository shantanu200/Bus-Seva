import React,{useState} from 'react'



const BoardingDropping = ({fullData,data,setData,type}) => {
  
  let tempArr = [];

  for(var i=0;i<data.length;i++){
    tempArr.push(data[i]);
  }


  const [board,setBoard] = useState(tempArr);

  const handleInput = (e,id) => {
    const {name,value} = e.target;
    let list = [...board];
    list[id][name] = value;
    setBoard(list);
    
  }

  const AddNew = () => {
    setBoard([...board,{location:"",time:""}]);
  }

  const trimData = () => {
    for(var i=0;i<board.length;i++){
        if(board[i].location ==="" || board.time === ""){
           board.splice(i,1);
        }
    }
  }

  const handleSubmit = () => {
    if(type === "board"){
        trimData();
        setData({...fullData,boardingPoint:board});
    }
    if(type === "drop"){
       trimData();
       setData({...fullData,droppingPoint:board});
    }
  }
  
  return (
    <div className='bg-white md:w-2/3 m-4 w-10/12'>
        <div className='p-2 m-2 uppercase border-b-2 text-xl font-semibold rounded-sm border-zinc-400 flex justify-between'>Update Locations and time
        <button className='px-4 text-sm text-white bg-green-600' onClick={AddNew}>ADD NEW</button>
        </div>
        <div>
            {board.map((val,id) => {
                return(
                    <div className='p-2 m-2 flex'>
                        <input name='location' value={val.location} className="border border-zinc-400 w-2/3 p-2 focus:outline-none mr-4" onChange={(e) => {handleInput(e,id)}} />
                        <input name='time' type={"time"} value={val.time} className="border border-zinc-400 w-1/3 p-2" onChange={(e) => {handleInput(e,id)}} />
                    </div>
                )
            })}
        </div>
        <div className='p-2 m-2'>
            <button onClick={handleSubmit} className='border p-2 w-full bg-zinc-800 hover:bg-zinc-700 duration-200 text-white'>Save Changes</button>
        </div>
    </div>
  )
}

export default BoardingDropping