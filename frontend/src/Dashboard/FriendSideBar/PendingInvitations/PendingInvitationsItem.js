import React, { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { Avatar } from "@mui/material";
import InvitationDecisionButtons from './InvitationDecisionButton';

const PendingInvitationsItem = ({
  id,
  username,
  mail,
  acceptFriendInvitation = () => {},
  rejectFriendInvitation = () => {},
}) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const handlerAccept = () => {
    acceptFriendInvitation({ id });
    setButtonDisable(true);
  };
  const handlerReject = () => {
    rejectFriendInvitation({ id });
    setButtonDisable(false);
  };
  return (
    <Tooltip title={mail}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            height: "42px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            textTransform: "none",
            color: "black",
            position: "relative",
          }}
        >
          <Avatar children={username.substring(0, 2)} />
          {username}
          <InvitationDecisionButtons
            disabled={buttonDisable}
            acceptInvitationHandler={handlerAccept}
            rejectInvitationHandler={handlerReject}
          />
        </div>
      </div>
    </Tooltip>
  );
};

export default PendingInvitationsItem;
