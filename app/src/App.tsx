import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Base from "./shared/Base/Base";
import { fetchUser, setState } from "./Redux/States/users";
import { validate } from "./utils/checkConnection";
import SideBarProfil from "./pages/SideBarProfil/SideBarProfil";
import UserProfil from "./pages/UserProfil/UserProfil";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Home from "./pages/Home/Home";
import Moderation from "./pages/Moderation/Moderation";
import UsersManagement from "./pages/UsersManagement/UsersManagement";
import ErrorManagement from "./pages/ErrorsManagement/ErrorsManagement";

import io, { Socket } from "socket.io-client";

const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_URL_PROD
    : process.env.REACT_APP_URL_DEV;

export const App = () => {
  const [checkingToken, setCheckingToken] = useState<boolean>(true);

  const dispatch = useDispatch();

  const socket = useRef<Socket | null>(null);

  const userConnected = useSelector(fetchUser);

  useEffect(() => {
    validate()
      .then((data) => {
        axios.defaults.headers.post["Authorization"] = `Basic ${
          localStorage.getItem("TOKEN") || ""
        } ${data.id}`;
        axios.defaults.headers.put["Authorization"] = `Basic ${
          localStorage.getItem("TOKEN") || ""
        } ${data.id}`;
        axios.defaults.headers.delete["Authorization"] = `Basic ${
          localStorage.getItem("TOKEN") || ""
        } ${data.id}`;

        dispatch(
          setState({
            isConnected: data.isConnected,
            id: data.id,
            username: data.username,
            mail: data.mail,
            accessToken: localStorage.getItem("TOKEN") || "",
            isAdmin: data.isAdmin,
            isValidated: data.isValidated,
            isBannished: data.isBannished,
            Nom: data.Nom,
            Prenom: data.Prenom,
          })
        );

        setCheckingToken(false);
      })
      .catch((data) => {
        dispatch(
          setState({
            isConnected: data.isConnected,
            id: data.id,
            username: data.username,
            mail: data.mail,
            accessToken: localStorage.getItem("TOKEN") || "",
            isAdmin: data.isAdmin,
            isValidated: data.isValidated,
            isBannished: data.isBannished,
            Nom: data.Nom,
            Prenom: data.Prenom,
          })
        );

        setCheckingToken(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (url) {
      socket.current = io(url, { autoConnect: false });

      if (userConnected.isValidated && !userConnected.isBannished) {
        socket.current.auth = { username: userConnected.id };
        socket.current.connect();
        console.log("debug App", socket.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConnected, url]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Base checkingToken={checkingToken}>
                <Home socket={socket.current} />
              </Base>
            </>
          }
        />
        <Route
          path="/create/account"
          element={
            <>
              <CreateAccount />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Base checkingToken={checkingToken}>
                <div style={{ display: "flex" }}>
                  <SideBarProfil page="info perso" />
                  <UserProfil />
                </div>
              </Base>
            </>
          }
        />
        <Route
          path="/moderation"
          element={
            <>
              <Base checkingToken={checkingToken}>
                <Moderation />
              </Base>
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <Base checkingToken={checkingToken}>
                <UsersManagement />
              </Base>
            </>
          }
        />
        <Route
          path="/errors"
          element={
            <>
              <Base checkingToken={checkingToken}>
                <ErrorManagement socket={socket.current} />
              </Base>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;
