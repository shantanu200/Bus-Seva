import React from "react";

const Footer = () => {
  return (
    <div className="m-0 p-4 bg-zinc-800">
      <div className="m-6 border-t-2"></div>
      <div>
        <div className="flex space-x-4 justify-center">
            <i class="fa-brands fa-google rounded-full bg-white p-2 hover:scale-105 duration-200"></i>
            <i class="fa-brands fa-facebook rounded-full bg-white p-2 hover:scale-105 duration-200"></i>
            <i class="fa-brands fa-square-instagram rounded-full bg-white p-2 hover:scale-105 duration-200"></i>
            <i class="fa-brands fa-twitter rounded-full bg-white p-2 hover:scale-105 duration-200"></i>
        </div>
        <div>
            <div className="flex space-x-4 text-white justify-center mt-6">
                <span>Info</span>
                <span>Support</span>
                <span>Marketing</span>
            </div>
            <div className="flex space-x-4 text-white justify-center mt-2">
                <span>Terms of Use</span>
                <span>Privacy Policy</span>
            </div>
        </div>
        <div className="text-zinc-400 text-center mt-2 font-semibold">@2022 Bus Seva</div>
      </div>
    </div>
  );
};

export default Footer;
