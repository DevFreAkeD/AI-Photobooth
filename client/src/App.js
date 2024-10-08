// Package Imports
import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

// Component Imports

// Route Imports

import HomeRoute from "./Routes/HomeRoute";
import { ToastContainer } from "react-toastify";
import { PingService } from "./Services/userDetailService";
import StatusView from "./Views/Home/StatusView";

const App = () => {
  return (
    <Router>
      <Fragment>
        <ToastContainer/>
        <HomeRoute />
        <StatusView/>
      </Fragment>
    </Router>
  );
};

export default App;
