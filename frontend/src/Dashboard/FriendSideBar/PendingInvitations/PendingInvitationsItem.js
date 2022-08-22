import React, { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { Avatar } from "@mui/material";
import InvitationDecisionButtons from './InvitationDecisionButton';
import { connect } from "react-redux";
import {getActions} from '../../../store/actions/friendAction';

const PendingInvitationsItem = ({
  id,
  username,
  mail,
  acceptFriendInvitation = () => {},
  rejectFriendInvitation = () => {},
}) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const handlerAccept = () => {
    console.log('test');
    acceptFriendInvitation({ id });
    setButtonDisable(true);
  };
  const handlerReject = () => {
    console.log('test');
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
            acceptFriendInvitation={handlerAccept}
            rejectFriendInvitation={handlerReject}
          />
        </div>
      </div>
    </Tooltip>
  );
};

const mapActionsToProps = (dispatch) =>{
  return {
    ...getActions(dispatch),
  }
}

export default connect(null,mapActionsToProps) (PendingInvitationsItem);
