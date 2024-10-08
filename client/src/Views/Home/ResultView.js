import React, { createElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../../Components/Common/Navbar";

import { validate } from "../../GlobalVariable";
import mail_icon from "../../Assets/mail_icon.png";
function ResultView({ userDetailList }) {
  const [image, setImage] = useState(null);
  const [activeInput, setActiveInput] = useState("");
  const [formdata, setFormdata] = useState({
    email: "",
  });

  const [helperText, setHelperText] = useState({
    email: "",
  });

  useEffect(() => {
    const Resultdata = "data:image/png;base64," + userDetailList?.imageBase64;
    setImage(Resultdata);
  }, [userDetailList]);

  const handlePrint = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.png";
  };

  const handleKeyboardChange = (input) => {
    if (activeInput === "phone" && input.length > 10) return;
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [activeInput]: input,
    }));

    const err = validate(activeInput, input, "eng");
    console.log(err);
    setHelperText((prevHelperText) => ({
      ...prevHelperText,
      [activeInput]: err,
    }));
  };

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div className="bg-container">
        <div className="heading">Thank you for participating</div>
        <img src={image} alt="userimage" />
        <div className="btn">
          {/* <button onClick={handlePrint}>Print</button> */}
        </div>
      </div>
    </div>
  );
}

ResultView.prototype = {
  userDetailAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userDetailList: state.userDetailState.userDetailList,
});
export default connect(mapStateToProps, {})(ResultView);
