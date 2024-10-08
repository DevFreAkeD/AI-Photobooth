// Package Imports
import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

// View Imports
import HomeView from "../Views/Home/HomeView";
import CameraView from "../Views/Home/CameraView";
import SelectAvatarView from "../Views/Home/SelectAvatar/SelectAvatarView";
import Registration from "../Views/Home/Registration/Registration";
import Thankyou from '../Views/Home/ThankYou/Thankyou'
import ResultView from "../Views/Home/ResultView";
import StartingView from "../Views/Home/StartingPage/StartingView";
import Dashboard from "../Views/Home/Dashboard/Dashboard";
import StrikePose from "../Views/Home/StrikePose";
const HomeRoute = () => {
  return (
    <Routes>
      <Route path="/#/camera" element={<CameraView />} />
      <Route path="/#/avatar" element={<SelectAvatarView />} />
      <Route path="/#/" element={<StartingView />} />
      <Route path="/#/register" element={<Registration/>} />      
      <Route path="/#/thankyou" element={<Thankyou />} />
      <Route path="/#/result" element={<ResultView/>} />
      <Route path="/#/dashboard" element={<Dashboard/>} />
      <Route path="/#/pose" element={<StrikePose/>} />
    </Routes>
  );
};

export default HomeRoute;
