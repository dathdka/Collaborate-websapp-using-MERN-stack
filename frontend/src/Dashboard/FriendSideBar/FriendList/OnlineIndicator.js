import { Box } from "@mui/material";
import React from "react";
import Icon from "@mui/icons-material/FiberManualRecord";

const OnlineIndicator = () => {
  return (
    <Box
      sx={{
        color: "#3ba55d",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: "5px",
      }}
    >
        <Icon/>
    </Box>
  );
};

export default OnlineIndicator;
