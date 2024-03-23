import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  let navigate = useNavigate();
  const [isLogIn, setIsisLogIn] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetch( import.meta.env.VITE_APP_API + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          setIsisLogIn(true);
        } else {
          navigate('/login')
          setIsisLogIn(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  //   if (token === 'adminJCA@gmail.com') {
  //   setIsisLogIn(true);
  // } else {
  //   navigate('/login')
  //   setIsisLogIn(false);
  // }
  
  }, [token]);

  

  if (isLogIn === true) {
    return <Outlet />;
  }
  // } else {
  //   return
  //   <Navigate to="/login" />;
  // };

};



export default ProtectedRoute;

