import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDetailAction } from "../../../Redux/Actions/userDetailAction";
import "./Starting.css"; // Ensure this file contains the necessary styles
import arrow from "../../../Assets/back_button.png";
import logo1 from "../../../Assets/logo1.png";
import logo2 from "../../../Assets/logo2.png";

function StartingView({ userDetailAction }) {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/register");
  };

  return (
    <div className="starting-view">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo1} alt="Logo Left" className="logo" />
        <img src={logo2} alt="Logo Right" className="logo" />
      </div>

      {/* Text Section */}
      <div className="text-container">
        <h1 className="main-text">Create your own Avatar</h1>
        <span className="sub-text">Select Style. Pose. Click. Print</span>
      </div>

      {/* Start Button Section */}
      <div 
        className="start-button" 
        onClick={handleNext}
        role="button" 
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleNext()} 
      >
        <img src={arrow} alt="Navigate to the next step" />
      </div>
    </div>
  );
}

// Defining PropTypes
StartingView.propTypes = {
  userDetailAction: PropTypes.func.isRequired,
};

export default connect(null, { userDetailAction })(StartingView);