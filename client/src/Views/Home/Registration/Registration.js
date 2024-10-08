import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo1 from "../../../Assets/logo1.png"; // Adjust path if necessary
import logo2 from "../../../Assets/logo2.png"; // Adjust path if necessary
import MaleImg from "../../../Assets/male.png"; // Adjust path if necessary
import FemaleImg from "../../../Assets/female.png"; // Adjust path if necessary
import nextBtn from "../../../Assets/next.png"; // Path to your next button image
import { userDetailAction } from "../../../Redux/Actions/userDetailAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../../Components/Common/Navbar";
import "./Registration.css"; // Ensure this is used for your styles

function Registration({ userDetailAction }) {
  const navigate = useNavigate();
  const [disabledbtn, setDisabledbtn] = useState(true);
  const [formData, setFormData] = useState({
    gender: "",
  });

  useEffect(() => {
    if (formData.gender !== "") {
      setDisabledbtn(false);
    }
  }, [formData]);

  const handleNext = () => {
    if (formData.gender === "") {
      toast("Please select a gender.");
      return;
    }
    userDetailAction(formData);
    navigate("/#/avatar");
  };

  const handleInputChange = (value) => {
    setFormData({
      gender: value,
    });
  };

  return (
    <div className="registration-container">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo1} alt="Logo 1" className="logo logo-left" />
        <img src={logo2} alt="Logo 2" className="logo logo-right" />
      </div>

      <div className="heading">Select Gender</div>

      {/* Centered Image Buttons */}
      <div className="option-container">
        <div 
          className={`gender-button ${formData.gender === "male" ? "selected" : ""}`} 
          onClick={() => handleInputChange("male")}
          tabIndex={0} // Make the div focusable
        >
          <img src={MaleImg} alt="Select Male" />
        </div>
        <div 
          className={`gender-button ${formData.gender === "female" ? "selected" : ""}`} 
          onClick={() => handleInputChange("female")}
          tabIndex={0} // Make the div focusable
        >
          <img src={FemaleImg} alt="Select Female" />
        </div>
      </div>

      {/* Next Button */}
      <div 
        className={`next-button ${disabledbtn ? "disabled" : ""}`} 
        onClick={handleNext}
      >
        <img src={nextBtn} alt="Next" />
      </div>

      {/* Shift Navbar Up */}
      <Navbar className="shifted-navbar" />
    </div>
  );
}

// Defining PropTypes
Registration.propTypes = {
  userDetailAction: PropTypes.func.isRequired,
};

export default connect(null, { userDetailAction })(Registration);
