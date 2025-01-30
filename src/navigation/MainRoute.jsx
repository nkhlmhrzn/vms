import React, { useContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import Register from "../pages/REGISTERPAGE";
import VMSInterface from "../pages/recordingStarted";
import ScanFailed from "../pages/SCANFAILEDPAGE";
import Scanning from "../pages/SCANNINGPAGE";
//import VideoCapturedNotification from "../pages/SUCCESSPAGE";
import OptionPage from "../pages/RECORDINGOPTIONPAGE";
import PassFail from "../pages/PASSORFAIL";
import VMSStartPage from "../pages/STARTRECORDING";
import LoginPage from "../pages/LOGINPAGE";

import { AuthContext } from "../context/AuthProvider";

const MainRoute = ({ handleLogin, user }) => {
  const [userData, setUserData] = useContext(AuthContext);

  // Helper to check if we have a logged-in user from localStorage
  const isLoggedIn = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return !!loggedInUser; // true if there is any loggedInUser, false otherwise
  }

  // Protected route logic: if not logged in, redirect to /login
  const ProtectedRoutes = () => {
    return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Routes>
      {/* 
        Public Routes: 
        - Redirect root ("/") to /login 
        - /login 
        - /register
      */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/OP" element={<OptionPage />} />
        <Route path="/startRecording" element={<VMSStartPage />} />
        <Route path="/recordingStarted" element={<VMSInterface />} />
        <Route path="/scanFailed" element={<ScanFailed />} />
        <Route path="/scanningPage" element={<Scanning />} />
        <Route path="/passOrFail" element={<PassFail />} />
      </Route>
    </Routes>
  );
};

export default MainRoute;
