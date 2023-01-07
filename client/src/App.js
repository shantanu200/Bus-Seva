import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CompData from "./pages/CompanyData/CompData";
import Auth from "./pages/Auth/Auth";
import BookSeat from "./pages/BookSeat/BookSeat";
import BusCompany from "./pages/BusCompany/BusCompany";
import UpdatePage from "./pages/UpdateBusData/UpdatePage";
import AddBusData from "./pages/AddBusData/AddBusData";
import UserRegister from "./pages/User/AuthRegister/UserRegister";
import UserLogin from "./pages/User/AuthLogin/UserLogin";
import HomePage from "./pages/User/HomePage/HomePage";
import UserProfile from "./pages/User/UserProfile/UserProfile";
import CompDashBoard from "./pages/BusCompanyDashboard/CompDashBoard";
import BusDetail from "./pages/BusDetail/BusDetail";
import BookingDetails from "./pages/BookingDetails/BookingDetails";
import BusList from "./pages/FilterBusList/BusList";
import UserSettings from "./pages/User/Setting/UserSettings";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [compUser,setCompUser] = useState();
  useEffect(() => {
    async function getData() {
      const logUser = window.localStorage.getItem("LogUser");
      const compUser = window.localStorage.getItem("compLogUser");
      setCompUser(JSON.parse(compUser));
      setUser(JSON.parse(logUser));
    }
    getData();
  }, []);

  const ErrorComp = () => {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-800">
        <div className="p-4 bg-white w-2/5 text-center">
          <span className="text-xl text-red-600 font-semibold">User is not Logged In</span> 
          <div className="my-2">
            <button className="p-2 text-center bg-zinc-400 text-white" onClick={() => navigate(`/userLogin`)}>Login Here</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/busComp" element={<BusCompany />} />
        <Route path="/compData" element={<CompData />} />
        <Route path="/updateCompData/:id" element={<UpdatePage />} />
        <Route path="/addBusData/:id" element={<AddBusData />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route
          path="/selectSeat/:id"
          element={user && user._id ? <BookSeat /> : ErrorComp()}
        />
        <Route path="/compDash" element={compUser && compUser._id ? <CompDashBoard /> : <BusCompany />} />
        <Route path="/busDetails/:id" element={<BusDetail />} />
        <Route path="/bookingDetails/:id" element={<BookingDetails />} />
        <Route path="/searchBus" element={<BusList />} />
        <Route path="/userSetting/:id" element={<UserSettings />} />
      </Routes>
    </div>
  );
}

export default App;
