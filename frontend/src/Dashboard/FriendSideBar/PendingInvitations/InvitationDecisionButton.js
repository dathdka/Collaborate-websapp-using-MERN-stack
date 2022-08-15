import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import RejectIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";

const InvitationDecisionButton = ({disabled,acceptFriendInvitation ,rejectFriendInvitation}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton style={{ color: "white" }} disabled={disabled}  onClick={acceptFriendInvitation}>
        <CheckIcon/>
      </IconButton>
      <IconButton style={{ color: "white" }} disabled={disabled}  onClick={rejectFriendInvitation}>
        <RejectIcon/>
      </IconButton>  
    </Box>
  );
};

export default InvitationDecisionButton;
