import React from "react";
import { Typography } from "@mui/material";

const FriendTitle = ({ title }) => {
  return (
    <Typography
      sx={{
        textTransform: "uppercase",
        color: "black",
        fontSize: "14px",
        marginTop: "10px",
      }}
    >
      {title}
    </Typography>
  );
};

export default FriendTitle;
