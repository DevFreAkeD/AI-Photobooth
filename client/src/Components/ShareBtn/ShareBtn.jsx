import React from "react";
import "./style.css";

function ShareBtn({ onClick }) {
  return (
    <div className="tooltip-container">
      <div className="button-content">
        <span className="text">Share</span>
        <svg
          className="share-icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
        </svg>
      </div>
      <div className="tooltip-content">
        <div className="social-icons">
          <a
            href="#"
            className="social-icon twitter"
            onClick={() => onClick(true, "qr")}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.5 21H7A7 7 0 0 1 5.276 7.223 5.995 5.995 0 0 1 14.6 4.2l-1.2 1.6a3.994 3.994 0 0 0-6.324 2.46l-.131.7-.7.106A5 5 0 0 0 7 19h10.5a4.5 4.5 0 0 0 3.682-7.087l1.636-1.151A6.5 6.5 0 0 1 17.5 21z" />
              <path d="m17 16.414-3.707-3.707 1.414-1.414L17 13.586l2.293-2.293 1.414 1.414L17 16.414z" />
              <path d="M16 5h2v10h-2z" />
            </svg>
          </a>
          {/* email */}
          {/* <a
            href="#"
            className="social-icon linkedin"
            onClick={() => onClick(true, "email")}
          >
            <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor">
              <path d="M29,4H3A3,3,0,0,0,0,7V25a3,3,0,0,0,3,3H29a3,3,0,0,0,3-3V7A3,3,0,0,0,29,4Zm-.72,2L16,14.77,3.72,6ZM2,24.59V7.23l10.12,7.23ZM3.41,26,13.77,15.64l1.64,1.17a1,1,0,0,0,1.16,0l1.64-1.17L28.59,26ZM30,24.59,19.88,14.46,30,7.23Z" />
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default ShareBtn;
