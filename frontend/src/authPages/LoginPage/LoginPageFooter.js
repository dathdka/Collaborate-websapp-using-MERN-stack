import  { React, useEffect } from "react";
import CustomButton from "../../shared/components/CustomButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail address and password";
};
const getFormValidMessage = () => {
  return `Let's go!!!`;
};
const LoginPageFooter = ({ handlerLogin, isFormValid }) => {
  const navigate = useNavigate();
  const HandlePushToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomButton
            lable="login"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handlerLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="create account now "
        redirectText="Register"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={HandlePushToRegister}
      />
    </>
  );
};

export default LoginPageFooter;
