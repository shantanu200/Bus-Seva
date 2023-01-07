import React,{useRef, useState} from 'react'
import { useJsApiLoader,Autocomplete } from '@react-google-maps/api';



const Test = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAyiYqBDkr0lyLYEGwQO2blfW8-0_NFJeI",
    libraries: ["places"],
  });

  const boardingRef = useRef([]);

  const [boarding, setBoarding] = useState([
    {
      location: "",
      time: "",
    },
  ]);

  const [dropping, setDropping] = useState([
    {
      location: "",
      time: "",
    },
  ]);

  const handleBoarding = (e, id) => {
    const { name, value } = e.target;
    let list = [...boarding];
    list[id][name] = boardingRef[id].current.value;
    setBoarding(list);
  };

  const handleDropping = (e, id) => {
    const { name, value } = e.target;
    let list = [...dropping];
    list[id][name] = value;
    setDropping(list);
  };

  const handleAddBoarding = () => {
    setBoarding([...boarding, { location: "", time: "" }]);
  };
  const handleAddDropping = () => {
    setDropping([...dropping, { location: "", time: "" }]);
  };

  const isEmpty = (source) => {
    for (var i = 0; i < source.length; i++) {
      if (source[i].location === "" || source[i].time === "") {
        return true;
      }
    }
    return false;
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    // if (isEmpty(boarding) || isEmpty(dropping)) {
    //   Swal.fire({
    //     title: "Empty Fields",
    //     text: "Please fill all the fields",
    //     icon: "error",
    //     confirmButtonText: "Fill Details",
    //   });
    //   return;
    // }
  };

  if (!isLoaded) {
    return <div className="bg-white p-2">
      <h1 className="text-2xl text-red-600 font-semibold">404 Error Occured Map not found</h1>
    </div>;
  }

  return (
    <div className="w-10/12 md:w-2/3 bg-white rounded-sm m-8">
      <div className="p-2 m-4 uppercase font-semibold text-xl md:text-2xl border-b-2 border-zinc-400">
        Dropping and Boarding Point
      </div>
      <div className="p-2 m-4 flex flex-col md:flex-row">
        <div className="basis-1/2 flex flex-col">
          <div className="mb-8 flex justify-between">
            <span className="font-semibold text-lg underline">
              Boarding Points
            </span>
            <button
              onClick={handleAddBoarding}
              className="p-1 ml-4 rounded-sm bg-green-600 text-white"
            >
              <i className="fa-sharp fa-solid fa-plus"></i> Add New
            </button>
          </div>
          {boarding.map((val, id) => {
            return (
              <div
                key={id}
                className="flex flex-col md:flex-row justify-between md:mt-4"
              >
                <Autocomplete>
                <input
                  ref={boardingRef[id]}
                  name="location"
                  onChange={(e) => handleBoarding(e, id)}
                  className="border border-zinc-400 p-2 focus:outline-none w-full md:w-2/3 mb-2 md:mb-0"
                  type={"text"}
                  placeholder="Destination"
                />
                </Autocomplete>
                
                <input
                  name="time"
                  onChange={(e) => handleBoarding(e, id)}
                  className="border border-zinc-400 p-2 focus:outline-none w-full md:w-1/3 md:ml-4 mb-4 md:mb-0"
                  type={"time"}
                />
              </div>
            );
          })}
        </div>
        <div className="md:border-l-2 md:mx-4 md:border-zinc-200"></div>
        <div className="basis-1/2 flex flex-col mt-4 md:mt-0">
          <div className="mb-8 flex justify-between">
            <button
              onClick={handleAddDropping}
              className="p-1 ml-4 rounded-sm bg-red-600 text-white"
            >
              <i className="fa-sharp fa-solid fa-plus"></i> Add New
            </button>
            <span className="font-semibold text-lg underline">
              Dropping Points
            </span>
          </div>
          {dropping.map((val, id) => {
            return (
              <div
                key={id}
                className="flex flex-col md:flex-row justify-between md:mt-4"
              >
                <input
                  name="location"
                  onChange={(e) => handleDropping(e, id)}
                  className="border border-zinc-400 p-2 focus:outline-none w-full md:w-2/3 mb-2 md:mb-0"
                  type={"text"}
                  placeholder="Destination"
                />
                <input
                  name="time"
                  onChange={(e) => handleDropping(e, id)}
                  className="border border-zinc-400 p-2 focus:outline-none w-full md:w-1/3 md:ml-4 mb-4 md:mb-0"
                  type={"time"}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-2 m-4 text-center">
        <button
          onClick={handleSubmitButton}
          className="w-full md:w-2/3 rounded-sm border p-2 text-white bg-zinc-700 hover:bg-zinc-600 duration-200"
        >
          Submit Details
        </button>
      </div>
    </div>
  );
}

export default Test