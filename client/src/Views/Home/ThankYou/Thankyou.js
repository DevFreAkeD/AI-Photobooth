import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo1 from "../../../Assets/logo1.png";
import logo2 from "../../../Assets/logo2.png";
import { userDetailAction } from "../../../Redux/Actions/userDetailAction";
import { userDetailService } from "../../../Services/userDetailService";
import Navbar from "../../../Components/Common/Navbar";
import PopUp from "../PopUp/PopUp";
import "./Thankyou.css";

function Thankyou({ userDetailAction, userDetailList, userDetailService }) {
  const navigate = useNavigate();
  const [thankyou, setThankyou] = useState(false);
  const [popup, setPopup] = useState(false);
  const [type, setType] = useState("");

  const handlePrintImage = () => {
    const imageUrl = userDetailList?.image || "https://via.placeholder.com/150"; // Fallback image URL

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Write HTML to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Image</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: white;
              overflow: hidden; /* Hide any overflow */
            }
            img {
              max-width: 100%; /* Ensures image fits within window */
              max-height: 100vh; /* Adjust for height */
              height: auto; /* Maintain aspect ratio */
            }
          </style>
        </head>
        <body>
          <img id="printImage" src="${imageUrl}" alt="Image to Print" />
          <script>
            const img = document.getElementById('printImage');
            img.onload = function() {
              window.print(); // Open the print dialog after the image has loaded
              window.setTimeout(() => {
                window.close(); // Close the print window after printing
                window.opener.postMessage('printDone', '*'); // Notify the opener window
              }, 100); // Optional delay before closing
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
  };

  const handlePopUp = (state, type) => {
    setPopup(state);
    setType(type);
  };

  // Effect to listen for print completion messages
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'printDone') {
        setThankyou(true); // Set thank you state
        setTimeout(() => {
          navigate("/"); // Navigate to home after 5 seconds
          window.location.reload(); // Reload the page
        }, 3000); // Delay for 3 seconds before navigating
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  if (thankyou) {
    return (
      <div className="thankyou-message">
        <div className="heading">
          Don't forget to collect <br />
          the print and save it<br />
          in the booklet
        </div>
      </div>
    );
  }

  return (
    <>
      {popup && (
        <PopUp
          type={type}
          val={userDetailList?.image ? userDetailList?.image : "www.google.com"}
          handlePopUp={handlePopUp}
        />
      )}
      <div className="thankyou-container">
        {/* Logo Section */}
        <div className="logo-container">
          <img src={logo1} alt="Logo 1" className="logo" />
          <img src={logo2} alt="Logo 2" className="logo" />
        </div>

        {/* User Image Section */}
        <div className="image-container">
          <img
            src={userDetailList?.image || "https://via.placeholder.com/150"} // Fallback image URL
            alt="userImage"
            className="final-image"
          />
        </div>

        {/* Buttons Section */}
        <div className="button-container">
          <button className="btn" onClick={() => handlePopUp(true, "QR")}>
            Show QR
          </button>
          <button className="btn" onClick={handlePrintImage}>
            Print
          </button>
        </div>

        <Navbar />
      </div>
    </>
  );
}

// Defining PropTypes
Thankyou.propTypes = {
  userDetailAction: PropTypes.func.isRequired,
  userDetailService: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userDetailList: state.userDetailState.userDetailList,
});

export default connect(mapStateToProps, {
  userDetailAction,
  userDetailService,
})(Thankyou);