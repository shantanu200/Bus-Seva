import React from "react";
import { FaTicketAlt } from "react-icons/fa";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
  BsArrowLeftRight,
} from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { getUserData } from "../../../api/getAPI/api";
import Swal from "sweetalert2";

const SingleBook = ({ data }) => {
  const loguserid = getUserData()._id;
  const handleCancel = (id,busID,seats) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const postObj = {
          bookid:id,
          busId:busID,
          seats:seats
        }
        axios
          .post(`http://localhost:6969/user/cancelBook/${loguserid}`,postObj)
          .then((res) => {
            Swal.fire(res.data.response);
            window.location.reload(true);
          })
          .catch((err) => {});
      }
    });
  };
  return (
    <div className="bg-zinc-100 my-2 w-10/12 md:w-1/2 hover:scale-105 duration-300">
      <div className="flex items-center">
        <div className="p-4 m-2">
          <FaTicketAlt className="text-xl md:text-3xl" />
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-sm md:text-lg font-semibold">
            <BsFillArrowUpCircleFill className="mr-2" />
            {data?.boardingPoint}
          </div>
          <BsArrowLeftRight className="mx-4" />
          <div className="flex items-center text-sm md:text-lg font-semibold">
            <BsFillArrowDownCircleFill className="mr-2" />
            {data?.droppingPoint}
          </div>
        </div>
      </div>
      <div className="bg-zinc-600 flex items-center justify-evenly">
        <div className="p-4 text-white font-semibold">
          SEATS:
          <span className="ml-2">{data?.seats.join(", ")}</span>
        </div>
        <div className="p-4 text-white font-semibold">
          RENT:
          <span className="ml-2">{data?.rent}</span>
        </div>
        <div>
          <button
            className="flex items-center  p-2 bg-white font-semibold"
            onClick={() => handleCancel(data?.bookId,data?.busID,data?.seats)}
          >
            <MdCancel className="mr-2" />
            Cancel Seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
