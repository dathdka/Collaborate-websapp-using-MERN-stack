import React, { useState } from "react";
import CustomButton from "../../shared/components/CustomButton";
import AddFriendDialog from "./AddFriendDialog";

const additionalStyles = {
  marginTop: "10px",
  marginLeft: "5px",
  width: "80%",
  height: "30px",
  background: "#3ba55d",
};

const AddFriendButton = () => {
  const [isDialogOpen,setIsDialogOpen] = useState('');
  const handleOpenAddFriendDialog = () => {
      setIsDialogOpen(true);
    };
  const handleCloseAddFriendDialog = () =>{
    setIsDialogOpen(false);
  }

  return (
    <>
      <CustomButton
        lable="add friend"
        additionalStyles={additionalStyles}
        onClick={handleOpenAddFriendDialog}
      />
      <AddFriendDialog
        isDialogOpen = {isDialogOpen}
        closeDialogHandler = {handleCloseAddFriendDialog}
      />
    </>
  );
};

export default AddFriendButton;
