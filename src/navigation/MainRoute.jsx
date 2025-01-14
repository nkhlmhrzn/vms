import { Route, Routes } from "react-router-dom";
import Register from "../pages/REGISTERPAGE";
import VMSInterface from "../pages/recordingStarted";
import ScanFailed from "../pages/SCANFAILEDPAGE";
import Scanning from "../pages/SCANNINGPAGE";
import VideoCapturedNotification from "../pages/SUCCESSPAGE";
import OptionPage from "../pages/RECORDINGOPTIONPAGE";
import PassFail from "../pages/PASSORFAIL";
import VMSStartPage from "../pages/STARTRECORDING";
import LoginPage from "../pages/LOGINPAGE";

const MainRoute = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<VMSStartPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/recordingStarted" element={<VMSInterface />}></Route>
        <Route path="/scanFailed" element={<ScanFailed />}></Route>
        <Route path="/scanningPage" element={<Scanning />}></Route>
        <Route
          path="/successPage"
          element={<VideoCapturedNotification />}
        ></Route>
        <Route path="/recordingOptionPage" element={<OptionPage />}></Route>
        <Route path="/passOrFail" element={<PassFail />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </>
  );
};

export default MainRoute;
