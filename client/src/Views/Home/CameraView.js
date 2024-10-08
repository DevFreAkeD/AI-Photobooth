import React, { useEffect, useState } from "react";
import CameraCapture from "../../Components/Camera";
import load from "../../Assets/loder.gif";
import axios from "axios";
import { userImageAction } from "../../Redux/Actions/userDetailAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useNavigate } from "react-router";
import "./cameraview.css";

import { userDetailService } from "../../Services/userDetailService";
import Navbar from "../../Components/Common/Navbar";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading/Loading";
import logo1 from "../../Assets/logo1.png"; // Adjust path if necessary
import logo2 from "../../Assets/logo2.png"; // Adjust path if necessary

const convertBase64ToFile = (base64Image, fileName) => {
  try {
    const matches = base64Image.match(
      /^data:image\/(png|jpeg|jpg|gif);base64/,
    );
    if (!matches) {
      throw new Error("Invalid base64 image string");
    }

    const fileType = matches[1];
    const base64String = base64Image.split(";base64,").pop();
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: `image/${fileType}` });
    return new File([blob], fileName, { type: `image/${fileType}` });
  } catch (error) {
    console.error("Error converting base64 to file:", error);
    return null;
  }
};

function CameraView({ userImageAction, userDetailList }) {
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (image, type) => {
    setImage(image);
  };

  const onSubmit = async () => {
    try {
      setLoader(true);

      if (!userDetailList?.gender) {
        toast.error("Please select your gender");
        setLoader(false);
        return;
      }
      if (!userDetailList?.avatar) {
        toast.error("Please select your avatar");
        setLoader(false);
        return;
      }
      const newFace = convertBase64ToFile(image, "avatar.img");
      const data = {
        image: newFace,
        gender: userDetailList?.gender,
        avatar: userDetailList?.avatar,
      };
      await userImageAction(data);
      setLoader(false);
      navigate("/thankyou");
    } catch (error) {
      console.error("Error submitting image:", error);
      toast.error("Something went wrong please try again ");
      setLoader(false);
    }
  };

  if (loader) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-container">
      {/* Logos at the top left and right */}
      {image !== null && (
        <div className="logo-container">
          <img src={logo1} alt="Logo 1" className="logo logo-left" />
          <img src={logo2} alt="Logo 2" className="logo logo-right" />
        </div>
      )}
      
      {image !== null ? (
        <div className="img-container">
          <img
            src={image}
            id="image"
            alt="userImage"
            className="displayed-image"
          />
          <div className="bttn-container">
            <button
              className="bttn bttn-container"
              onClick={() => setImage(null)}
            >
              Retake
            </button>
            <button className="bttn-container bttn" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <CameraCapture onClick={handleClick} />
      )}
      <Navbar />
    </div>
  );
}

// Defining PropTypes
CameraView.propTypes = {
  userDetailAction: PropTypes.func.isRequired,
  userDetailService: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userDetailList: state.userDetailState.userDetailList,
});
export default connect(mapStateToProps, { userImageAction })(CameraView);