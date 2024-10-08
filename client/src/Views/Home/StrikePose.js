import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from '../../Assets/logo.svg'
import { userDetailAction } from "../../Redux/Actions/userDetailAction";
// import "./Starting.css";

function StrikePose({ userDetailAction }) {
  const navigate = useNavigate();
 

  useEffect(()=>{
    setTimeout(()=>{
        navigate('/camera')
    },5000)
  },[])
  return (
    <div className="container">
      <img src={logo} alt="" className="logo" />
      <div className="box" style={{height:'auto'}}>
        <div className="box-1">
        <h1 style={{fontSize:'43px'}}>Strike a Pose - Ready, set, smile</h1>
        </div>
      </div>
    </div>
  );
}

// Defining Proptypes
StrikePose.prototype = {
  userDetailAction: PropTypes.func.isRequired,
};

export default connect(null, { userDetailAction })(StrikePose);
