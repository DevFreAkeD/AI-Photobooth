// Package Imports
import React from "react";

// Hooks Imports
import { useState } from "react";

// Material UI Imports
import { Box, Button, Drawer, Fab, Typography } from "@mui/material";

const HomeView = () => {
  // Radio Button
  const [value, setValue] = useState(false);

  // console.log('Value', value);

  //#region Handle Change
  const handleChange = () => {
    setValue((prevState) => !prevState);
  };
  //#endregion

  return (
    <>
      <Drawer anchor="left" open={value} onClose={() => setValue(false)}>
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            Side Pannel
          </Typography>
        </Box>
      </Drawer>
      <Button onClick={handleChange}>Test</Button>
    </>
  );
};

export default HomeView;
