import React, { useState } from "react";
import { getUserData, signOut } from "../../../../api/getAPI/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserData());
  const [signMenu, setSignInMenu] = useState(false);

  const [dropDown, setDropDown] = useState(false);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to sign out from application",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
        Swal.fire(
          "Sign Out Success!",
          "You can re-login anytime again.",
          "success"
        );
        window.location.reload(true);
      }
    });
  };

  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <div className="w-full p-4 text-white bg-zinc-900 flex justify-between">
      <div className="uppercase font-semibold text-2xl p-2 hover:scale-105 duration-200">
        <i className="fa-solid fa-bus mx-2"></i> Bus Seva
      </div>
      <div className="p-2 text-2xl md:hidden">
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="p-2 hidden md:block">
        <nav>
          <ul className="flex items-center justify-evenly space-x-8 uppercase">
            <li>
              <a href="/">Home</a>
            </li>
            <div className="text-white">|</div>
            <li>
              <a href="/">Book</a>
            </li>
            <div className="text-white">|</div>
            <li>
              <a href="/">Contact</a>
            </li>

            <div className="text-white">|</div>
            <li>
              <a href="/compDash">Company Login</a>
            </li>
            <div className="text-white">|</div>
            <li>
              {!user && (
                <button
                  className="bg-white py-2 px-4 rounded-lg text-black uppercase"
                  onClick={() => {
                    navigate("/userLogin");
                  }}
                >
                  Sign UP
                </button>
              )}
              {user && user._id && (
                <>
                  <a href="#" className="flex items-center space-x-2">
                    <p>{user?.name}</p>
                    <i
                      onClick={() => setDropDown(!dropDown)}
                      className="fas fa-angle-down"
                    ></i>
                  </a>
                  {dropDown && (
                    <div className="absolute text-black bg-white p-6 rounded-sm m-4 duration-200">
                      <ul>
                        <li>
                          <a href={`/profile/${user?._id}`} className="flex">
                            <i className="fas fa-user mr-2"></i>Profile
                          </a>
                        </li>
                        <li>
                          <a
                            href={`/userSetting/${user?._id}`}
                            className="flex"
                          >
                            <i className="fas fa-sliders-h mr-2"></i>Settings
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={handleSignOut} className="flex">
                            <i className="fas fa-sign-out-alt mr-2"></i>SignOUT
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
      {/* {nav && <div>Navbar Display</div>} */}
    </div>
  );
};

export default Navbar;
