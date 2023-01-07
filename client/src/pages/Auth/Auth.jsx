import React, { useState, useEffect } from "react";
import AuthLogin from "../../components/Auth/AuthLogin";
import AuthOTP from "../../components/Auth/AuthOTP";

const Auth = () => {
  const [user, setLogUser] = useState({});
  const [isStatus, setIsStatus] = useState(false);

  return (
    <>
      {isStatus ? (
        <AuthOTP user={user} />
      ) : (
        <AuthLogin setIsStatus={setIsStatus} setLogUser={setLogUser} />
      )}
    </>
  );
};

export default Auth;
