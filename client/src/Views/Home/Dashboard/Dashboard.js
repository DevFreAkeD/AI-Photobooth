import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { combineReducers } from "redux";
import loder from "../../../Assets/loder.gif";
import axios from "axios";
import { sendEmailService, userDetailListService } from "../../../Services/userDetailService";

function convertTimestampTo12HourClock(timestampMs) {
  // Convert timestamp from milliseconds to seconds
  const timestampSeconds = timestampMs / 1000;

  // Create a Date object using the Unix timestamp in seconds
  const date = new Date(timestampSeconds * 1000);

  // Get the components of the date
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Determine AM or PM
  const amPm = hours < 12 ? "AM" : "PM";

  // Convert the hours to 12-hour format
  hours %= 12;
  hours = hours || 12; // Handle midnight (0 hours)

  // Format the date and time as 12-hour clock (AM/PM)
  const formattedDate = `${padZero(day)}/${padZero(month)}/${year}`;
  const time12HourClock = `${hours}:${padZero(minutes)} ${amPm}`;

  // Function to pad a single-digit number with a leading zero
  function padZero(number) {
    return (number < 10 ? "0" : "") + number;
  }

  return `${formattedDate} ${time12HourClock}`;
}

const userType = [
  { no: 1, type: "Google" },
  { no: 2, type: "Finalist " },
  { no: 3, type: "Jury" },
  { no: 4, type: "Grand Jury" },
  { no: 5, type: "Guest" },
];

const ImageUrlButton = ({ value }) => {
  return (
    <a href={value} target="_blank" rel="noopener noreferrer">
      <Button>Image</Button>
    </a>
  );
};

const Image = ({ value }) => {
  const Resultdata="data:image/png;base64,"+value;
  return (
    <img src={Resultdata} alt="afterLaunch" style={{height:'100%'}}/>
  );
};

function Dashboard() {
  const [loader, setLoader] = useState(true);
  const [userState, setUserState] =useState(undefined);

  const getdata=async()=>{
    const data=await userDetailListService();
    
    setUserState(data)
    return;
  }
  useEffect(() => {
    setLoader(true);
    getdata()
  }, []);

  //State For DataGrid Row
  const [row, setRow] = useState([]);

  const columns = [
    { field: "col1", headerName: "Name", width: 180, editable: false },
    { field: "col2", headerName: "Email", width: 250, editable: false },
    { field: "col3", headerName: "Gender", width: 200, editable: false },
    { field: "col4", headerName: "Image Before Launch", width: 150, editable: false ,
    renderCell: (params) => ImageUrlButton(params)},
    { field: "col5", headerName: "Image After Launch", width: 150, editable: false ,
    renderCell: (params) => Image(params)},
    { field: "col6", headerName: "Email Send", width: 150, editable: false }
    
  ];
  
  useEffect(() => {
    
    if (userState !== undefined) {
        
      let rows = [];
      for (let x of userState) {
        if (x._id) {
        
          let rowObject = {
            id: x._id,
            col1: x?.name === undefined ? "NOT Provided" : x?.name,
            col2: x?.email === undefined ? "NOT Provided" : x?.email,
            col3: x?.gender === undefined ? "NOT Provided" : x?.gender,
            col4: x?.imageBeforeLaunch === undefined ? "NOT Provided" : x?.imageBeforeLaunch,
            col5: x?.imageAfterLaunch === undefined ? "NOT Provided" : x?.imageAfterLaunch,
            col6: x?.emailSend === undefined ? "NOT Provided" : x?.emailSend,
          };
          rows.push(rowObject);
          setLoader(false);
        }
      }
      setRow(rows);
    }
  }, [userState]);

  const handleSendEmail=async()=>{
    await sendEmailService()
  }
  return (
    <div >
    <div style={{display:'flex', justifyContent:'flex-end',padding:'30px' }}>
        <button style={{height:'50px',width:'100px'}} onClick={handleSendEmail}>Send Email</button>
    </div>
      <Box
        pl={3}
        pr={3}
        sx={{
          // padding:,
          height: "100%",
          overflow: "auto",
          scrollBehavior: "smooth",
          backgroundColor:'white',
          overFlow:''
          //  paddingTop:"2%"
        }}
      >
        {loader ? (
          <div
            style={{
              height: "75%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={loder} alt="loader" style={{ height: "6%" }} />
          </div>
        ) : (
          <div>
            <DataGrid
              sx={{ flex: "auto" }}
              height="auto"
              rows={row}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        )}
      </Box>
    </div>
  );
}




export default Dashboard;
