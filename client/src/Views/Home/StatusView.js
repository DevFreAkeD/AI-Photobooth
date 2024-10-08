import React, { useEffect, useState } from "react";
import { PingService } from "../../Services/userDetailService";

function StatusView() {
  const [status, setStatus] = useState();
  //   useEffect(() => {
  //     setInterval(async () => {
  //       const result = await PingService();
  //       console.log(result);
  //       setStatus(result);
  //     }, [5000]);
  //   }, []);

  return (
    <>
      {status === 1 && (
        <div
          style={{
            border: "2px solid green",
            borderRadius: "30px",
            width: "20px",
            height: "20px",
            position: "absolute",
            top: "10px",
            backgroundColor: "green",
            right: "20px",
          }}
        ></div>
      )}
    </>
  );
}

export default StatusView;
