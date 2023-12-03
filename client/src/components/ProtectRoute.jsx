import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  let navigate = useNavigate();
  const [isLogIn, setIsisLogIn] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://119.59.105.226:3333/authen", {
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
  }, [token]);

  if (isLogIn === true) {
    return <Outlet />;}
  // } else {
  //   return 
  //   <Navigate to="/login" />;
  // };

};



export default ProtectedRoute;

