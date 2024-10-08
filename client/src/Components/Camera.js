import React, { useRef, useEffect, useCallback, useState } from "react";

const CameraCapture = ({ onClick }) => {
  const videoRef = useRef(null);
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1920);
  const [startTimer, setStartTimer] = useState(false);
  const [timer, setTimer] = useState(4);
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: 1920,
          height: 1080,
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }, [videoRef.current]);

  useEffect(() => {
    const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    const initializeCamera = async () => {
      await startCamera();
    };

    // Update dimensions when the window is resized
    window.addEventListener("resize", updateDimensions);

    // Initial update
    updateDimensions();

    // Initialize the camera after the component is mounted
    initializeCamera();

    // Clean up the camera stream and event listener when the component unmounts
    return () => {
      const cleanup = async () => {
        const video = videoRef.current;
        if (!video) return;

        const stream = video.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      };

      cleanup();

      // Remove the resize event listener
      window.removeEventListener("resize", updateDimensions);
    };
  }, [startCamera]);
  const captureImage = async () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = true;

    // Flip the canvas on the Y-axis (180-degree rotation)
    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    // Draw the video frame onto the flipped canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // You can now use the captured image data (canvas.toDataURL(), etc.)
    const imageData = canvas.toDataURL("image/png");

    onClick(imageData, "preview");
  };
  useEffect(() => {
    if (!startTimer) return;
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);

        if (timer === 1) {
          captureImage();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, startTimer]);
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        overflow: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        objectFit: "contain",
      }}
    >
      <div
        style={{
          textAlign: "center",
          // borderRight: "140px solid black",
          width: "75%",
          position: "absolute",
          // borderLeft: "140px solid black",
          zIndex: 1,
          fontSize: "100px",
          color: "white",
        }}
      >
        {timer - 1 > 0 ? timer - 1 : "Smile!"}
      </div>
      <video
        width={width}
        height={height}
        ref={videoRef}
        autoPlay
        style={{
          transform: "scaleX(-1)",
        }}
      ></video>
      <button
        onClick={() => {
          setStartTimer(true);
        }}
        style={{
          display: startTimer ? "none" : "block",
          marginBottom: "30px",
          position: "absolute",
          bottom: "100px",
          height: "150px",
          width: "150px",
          borderRadius: "50%",
          backgroundColor: "white",
          border: "3px solid red",
          padding: "2px",
          zIndex: 2,
        }}
      ></button>
    </div>
  );
};

export default CameraCapture;
