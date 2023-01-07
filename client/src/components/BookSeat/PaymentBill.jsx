import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PaymentBill = ({ dbData, user, setUser, path, userLogID }) => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    cardNO: "",
    expiry: "",
    cvv: "",
  });

  const [feedback, setFeedback] = useState({});
  const handleAPI = async () => {
    let response;
    await axios
      .post(`http://localhost:6969/busService/bookSeat/${path}`, user)
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        response = err;
      });

    return response;
  };

  const handleCardDetails = (e) => {
    var { name, value } = e.target;

    if (name === "cardNO") {
      const limit = 19;
      setPaymentDetails({
        ...paymentDetails,
        cardNO: value
          .replace(/\W/gi, "")
          .replace(/(.{4})/g, "$1 ")
          .slice(0, limit),
      });
    } else {
      setPaymentDetails({
        ...paymentDetails,
        [name]: value,
      });
    }
  };

  const redirect = () => {
    if (feedback.status) {
      Swal.fire(feedback.alert);
      navigate(`/`);
    }
  };

  const handleButton = async (e) => {
    e.preventDefault();

    if (
      validator.isEmpty(paymentDetails.name) ||
      validator.isEmpty(paymentDetails.cardNO) ||
      validator.isEmpty(paymentDetails.expiry) ||
      validator.isEmpty(paymentDetails.cvv)
    ) {
      Swal.fire({
        title: "Empty Fields",
        text: "Empty fields required!!",
        icon: "error",
        confirmButtonText: "OK!!",
      });
      return;
    } else {
      if (paymentDetails.cardNO.length < 19) {
        Swal.fire({
          title: "Invalid Card No",
          text: "16 digit card number is required",
          icon: "error",
          confirmButtonText: "Re-Enter",
        });
        return;
      }
      if (paymentDetails.cvv.length < 3) {
        Swal.fire({
          title: "Invalid CVV",
          text: "3 digit cvv number required",
          icon: "error",
          confirmButtonText: "Re-Enter",
        });
        return;
      }
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm booking??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        user.paymentDetails = paymentDetails;
        user.isPaymentDone = !user.isPaymentDone;
        const response = handleAPI();
        setFeedback(response);
      }
    });

    if(feedback.status) Swal.fire(feedback.alert); navigate(`/`);
  };

  return (
    <div className="w-10/12 m-8 bg-white md:w-2/3 rounded-sm flex flex-col md:flex-row">
      <div className="basis-1/2 p-4 m-2 flex items-center justify-center ">
        <img className="h-10/12 w-2/3" src="images/payment.svg" alt="" />
      </div>
      <div className="basis-2/3 p-4 m-2">
        <div className="p-2 border-b-2 m-4 uppercase text-xl md:text-2xl font-semibold">
          Pay Bill
        </div>
        <div className="m-4 py-2">
          Payment Amount:
          <span className="text-lg font-semibold text-red-600 ml-2">
            Rs. {user?.rent}
          </span>
        </div>
        <div className="m-4">
          <form className="flex flex-col space-y-6">
            <div>
              <label>Card Holder Name: </label>
              <br />
              <input
                name="name"
                type={"text"}
                className="p-2 border border-zinc-400 w-full mt-2 focus:outline-none"
                placeholder="Name"
                onChange={handleCardDetails}
              />
            </div>
            <div>
              <label>Card Number: </label>
              <br />
              <input
                name="cardNO"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1");
                }}
                onChange={handleCardDetails}
                maxLength={16}
                type={"text"}
                className="p-2 border border-zinc-400 w-full mt-2 focus:outline-none"
                placeholder="Card-Number"
              />
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="basis-1/2">
                <label>Expiry Date:</label>
                <br />
                <input
                  type={"month"}
                  maxLength={5}
                  min="2022-09"
                  placeholder="MM/YY"
                  className="p-2 border mt-2 focus:outline-none border-zinc-400 w-full md:w-2/3"
                  name="expiry"
                  onChange={handleCardDetails}
                />
              </div>
              <div className="basis-1/2 mt-6 md:mt-0">
                <label>CVV:</label>
                <br />
                <input
                  name="cvv"
                  maxLength={3}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1");
                  }}
                  placeholder="CVV"
                  className="p-2 border border-zinc-400 mt-2 focus:outline-none w-full md:w-2/3"
                  onChange={handleCardDetails}
                />
              </div>
            </div>
            <button
              onClick={handleButton}
              className="p-2 bg-zinc-700 text-white rounded-sm"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentBill;
