import React from "react";
import "./style.css";
import QRCode from "react-qr-code";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { validate } from "../../../GlobalVariable";
import { sendEmailService } from "../../../Services/userDetailService";
import { toast } from "react-toastify";
function PopUp({ type, val, handlePopUp }) {
  const [activeInput, setActiveInput] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
  });
  const [helperText, setHelperText] = React.useState({
    email: "",
  });

  const handleKeyboardChange = (input) => {
    if (activeInput === "phone" && input.length > 10) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [activeInput]: input,
    }));

    const err = validate(activeInput, input, "eng");
    setHelperText((prevHelperText) => ({
      ...prevHelperText,
      [activeInput]: err,
    }));
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await sendEmailService({ ...formData, imageUrl: val });
    } catch (error) {
      toast.error("Something went wrong please try again ");
    }
  };

  if (type === "email") {
    return (
      <div className="pop-up-container">
        <div>
          <div class="flex-container">
            <button
              class="item-5"
              onClick={() => handlePopUp(false, "")}
            ></button>
          </div>
          <div>
            <form class="search-wrapper cf" onSubmit={handleOnSubmit}>
              <input
                name="email"
                type="text"
                value={formData.email}
                placeholder="Enter your email..."
                required
                style={{
                  boxShadow: "none",
                }}
                onTouchStart={() => setActiveInput("email")}
                onClick={() => setActiveInput("email")}
              />
              <button type="submit">Send</button>
            </form>
            <div
              style={{
                color: "red",
                fontSize: 12,
                marginLeft: 16,
              }}
            >
              {helperText?.email}
            </div>
            {activeInput && (
              <div
                style={{
                  marginTop: 10,
                }}
              >
                <Keyboard
                  layout={{
                    default: [
                      "1 2 3 4 5 6 7 8 9 0 {bksp}",
                      "q w e r t y u i o p ",
                      "a s d f g h j k l ; '",
                      "z x c v b n m , . /",
                      "! @ # $ % ^ & * ( ) _ +",
                      ".com {space}",
                    ],
                  }}
                  onChange={handleKeyboardChange}
                  inputName={activeInput}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="pop-up-container">
      <div>
        <div class="flex-container">
          <button
            class="item-5"
            onClick={() => handlePopUp(false, "")}
          ></button>
        </div>
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 300,
            width: "100%",
            marginTop: 20,
            border: "1px solid black",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <QRCode
            size={300}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={val}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </div>
  );
}

export default PopUp;
