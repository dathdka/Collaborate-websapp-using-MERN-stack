import React, { useEffect, useState } from "react";
import { validateMail } from "../../shared/utils/Validators";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import InputWithLable from "../../shared/components/InputWithLabel";
import CustomButton from "../../shared/components/CustomButton";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/friendAction"; 

const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation = () => {},
}) => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState("");
  const [open, setOpen] = useState(false);
  const handleSendInvitation = () => {
    console.log('invite has been sent!!!')
    sendFriendInvitation({
      targetMailAddress: mail,
    },
    handleCloseDialog)
  };
  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };
  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);

  useEffect(()=>{
    setOpen (isDialogOpen ? true : false); 
  },[isDialogOpen])

  return (
    <div>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography>Invite friend</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component={'span'}>Enter email address you want to invite</Typography>
          </DialogContentText>
          <InputWithLable
            label="Mail"
            value={mail}
            type="text"
            setValue={setMail}
            placeholder="Enter mail address"
          />
          <DialogActions>
            <CustomButton
              onClick={handleSendInvitation}
              disabled={!isFormValid}
              lable="Send"
            />
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null,mapActionsToProps) (AddFriendDialog);
