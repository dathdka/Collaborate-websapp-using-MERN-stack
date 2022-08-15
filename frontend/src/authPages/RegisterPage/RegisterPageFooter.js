import { React, useEffect } from "react";
import CustomButton from "../../shared/components/CustomButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail, username ,password";
};
const getFormValidMessage = () => {
  return `Let's go!!!`;
};

const RegisterPageFooter = (props) => {
    const {isFormValid, handlerRegister} = props;
  const navigate = useNavigate();
  const HandlePushToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomButton
            lable="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handlerRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Already have an account? "
        redirectText="Login"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={HandlePushToLogin}
      />
    </>
  );
};

export default RegisterPageFooter;
