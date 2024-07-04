import axios from "axios";
import React, { useEffect } from "react";
import { server } from "../utlits/Variables";
import { Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const getUser = async () => {
    await axios
      .get(`${server}api/user/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((e) => {
        if (e.data.id) {
        } else {
          window.location.href = "/";
        }
      })
      .catch((e) => {
        window.location.href = "/";
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return <Outlet />;
};

export default ProtectRoute;
