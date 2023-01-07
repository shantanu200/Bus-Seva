import React from "react";
import { MdFamilyRestroom } from "react-icons/md";

const TravelPKG = () => {
  return (
    <div className="p-4 m-6">
      <div className="font-semibold text-xl md:text-3xl uppercase hover:scale-105 duration-200 my-8 border-b-2 text-center">
        Travel INDIA Packeges
      </div>
      <div className="flex flex-col md:flex-row justify-evenly space-y-4 md:space-y-0">
        <div className="md:w-1/3  p-4 border border-zinc-400 rounded-lg mx-2">
          <div className="uppercase text-xl font-semibold border-b-2 border-zinc-400 p-2">
            Purple Travels
          </div>
          <div className="m-4">
            <img
              src="images/red-fort.jpg"
              className="rounded-lg hover:scale-105 duration-200"
            />
          </div>
          <div className="mx-4 my-8">
            <i className="fa-solid fa-check mr-2 text-green-600"></i> <span>Adults and Childern</span><br />
            <i className="fa-solid fa-check mr-2 text-green-600"></i> <span>Food charges and Hotel rent included</span>
            <br />
            <i className="fa-solid fa-check mr-2 text-green-600"></i> <span>1-2 Months Trip</span>
            <br />
            <i className="fa-solid fa-check mr-2 text-green-600"></i> <span>Emergency Services Included</span>
            <br />
          </div>
          <div className="m-4">
            <button className="bg-zinc-800 w-full rounded-lg p-2 text-white uppercase hover:bg-zinc-700 duration-200">
              Book Now
            </button>
          </div>
        </div>
        <div className="md:w-1/3 p-4 border border-zinc-400 rounded-lg mx-2">
          <div className="uppercase text-xl font-semibold border-b-2 border-zinc-400 p-2">
            Sanjay Travels
          </div>
          <div className="m-4">
            <img
              src="images/taj-mahal.jpg"
              className="rounded-lg hover:scale-105 duration-200"
            />
          </div>
          <div className="mx-4 my-8">
            <i className="fa-solid fa-check mr-2 text-green-600"></i> <span>Adults and Childern</span><br />
            <i class="fa-solid fa-check mr-2 text-green-600"></i> <span>Food charges and Hotel rent included</span>
            <br />
            <i class="fa-solid fa-check mr-2 text-green-600"></i> <span>1-2 Months Trip</span>
            <br />
            <i class="fa-solid fa-check mr-2 text-green-600"></i> <span>Emergency Services Included</span>
            <br />
          </div>
          <div className="m-4">
            <button className="bg-zinc-800 w-full rounded-lg p-2 text-white uppercase hover:bg-zinc-700 duration-200">
              Book Now
            </button>
          </div>
        </div>
        <div className="md:w-1/3 p-4 rounded-lg mx-2 border border-zinc-400">
          <div className="uppercase text-xl font-semibold border-b-2 border-zinc-400 p-2">
            Royal Travels
          </div>
          <div className="m-4">
            <img
              src="images/varanasi.jpg"
              className="rounded-lg hover:scale-105 duration-200"
            />
          </div>
          <div className="mx-4 my-8">
            <i class="fa-solid fa-check mr-2 text-green-600"></i> <span>Adults and Childern</span><br />
            <i class="fa-solid fa-check mr-2 text-green-600"></i> <span>Food charges and Hotel rent included</span>
            <br />
            <i class="fa-solid fa-check mr-2 text-green-600"></i> <span>1-2 Months Trip</span>
            <br />
            <i class="fa-solid fa-check mr-2 text-green-600"></i> <span>Emergency Services Included</span>
            <br />
          </div>
          <div className="m-4">
            <button className="bg-zinc-800 w-full rounded-lg p-2 text-white uppercase hover:bg-zinc-700 duration-200">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPKG;
