import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SelectAvatarView.css";
import logo1 from "../../../Assets/logo1.png"; // Adjust path if necessary
import logo2 from "../../../Assets/logo2.png"; // Adjust path if necessary
import { userDetailAction } from "../../../Redux/Actions/userDetailAction";

// Import female avatars
import northF from "../../../Assets/female_01.png";
import southF from "../../../Assets/female_02.png";
import eastF from "../../../Assets/female_03.png";
import westF from "../../../Assets/female_04.png";
import centralF from "../../../Assets/female_05.png";

// Import male avatars
import northM from "../../../Assets/male_01.png";
import southM from "../../../Assets/male_02.png";
import eastM from "../../../Assets/male_03.png";
import westM from "../../../Assets/male_04.png";
import centralM from "../../../Assets/male_05.png";
import Navbar from "../../../Components/Common/Navbar";

function SelectAvatarView({ userDetailAction, userDetailList }) {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [Images, setImages] = useState({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  });

  const onImageClick = (image) => {
    setIsButtonDisabled(false);
    setSelectedImage(image);
  };

  const handleButtonClick = async () => {
    if (selectedImage === "") return;
    await userDetailAction(userDetailList, selectedImage);
    navigate("/camera");
  };

  useEffect(() => {
    if (userDetailList.gender === "male") {
      setImages({
        img1: northM,
        img2: southM,
        img3: eastM,
        img4: westM,
        img5: centralM,
      });
    } else {
      setImages({
        img1: northF,
        img2: southF,
        img3: eastF,
        img4: westF,
        img5: centralF,
      });
    }
  }, [userDetailList]);

  return (
    <div className="bg-container">
      <div className="logo-container">
        <img src={logo1} alt="Logo Left" className="logo" />
        <img src={logo2} alt="Logo Right" className="logo" />
      </div>
      
      <div className="heading">Select Avatar</div>

      <div className="avatar-container">
        <div className="avatar-row">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="avatar-item" onClick={() => onImageClick(`${index + 1}`)}>
              {selectedImage === `${index + 1}`}
              <img
                src={Images[`img${index + 1}`]}
                alt={`avatar${index + 1}`}
                className={selectedImage === `${index + 1}` ? "selected" : ""}
              />
            </div>
          ))}
        </div>
        <div className="avatar-row">
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index + 3} className="avatar-item" onClick={() => onImageClick(`${index + 4}`)}>
              {selectedImage === `${index + 4}`}
              <img
                src={Images[`img${index + 4}`]}
                alt={`avatar${index + 4}`}
                className={selectedImage === `${index + 4}` ? "selected" : ""}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={isButtonDisabled ? "btn disabledButton" : "btn"}>
        <button onClick={handleButtonClick}>Select</button>
      </div>

      <Navbar />
    </div>
  );
}

// PropTypes
SelectAvatarView.propTypes = {
  userDetailAction: PropTypes.func.isRequired,
  userDetailList: PropTypes.object.isRequired,
};

// Redux state
const mapStateToProps = (state) => ({
  userDetailList: state.userDetailState.userDetailList,
});

export default connect(mapStateToProps, { userDetailAction })(SelectAvatarView);