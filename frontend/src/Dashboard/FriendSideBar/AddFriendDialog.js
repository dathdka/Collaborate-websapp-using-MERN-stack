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

const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation = () => {},
}) => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState("");

  const handleSendInvitation = () => {};
  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };
  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography>Invite friend</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Enter email address you want to invite</Typography>
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
              onclick={handleSendInvitation}
              disabled={!isFormValid}
              lable="Send"
            />
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFriendDialog;
