import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Register from "../pages/REGISTERPAGE";
import VMSInterface from "../pages/recordingStarted";
import ScanFailed from "../pages/SCANFAILEDPAGE";
import Scanning from "../pages/SCANNINGPAGE";
import VideoCapturedNotification from "../pages/SUCCESSPAGE";
import OptionPage from "../pages/RECORDINGOPTIONPAGE";
import PassFail from "../pages/PASSORFAIL";
import VMSStartPage from "../pages/STARTRECORDING";
import LoginPage from "../pages/LOGINPAGE";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const MainRoute = ({ children }) => {
  const [userData, setUserData] = useContext(AuthContext);

  // Protected route logic
  const ProtectedRoutes = () => {
    return userData ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/startRecording" element={<VMSStartPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recordingStarted" element={<VMSInterface />} />
          <Route path="/scanFailed" element={<ScanFailed />} />
          <Route path="/scanningPage" element={<Scanning />} />
          <Route path="/successPage" element={<VideoCapturedNotification />} />
          <Route path="/OP" element={<OptionPage />} />
          <Route path="/passOrFail" element={<PassFail />} />
        </Route>

        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      { children }
    </>
  );
};

export default MainRoute;
