import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import AuthBox from "../../shared/components/AuthBox";
import RegisterPageFooter from "./RegisterPageFooter";
import RegisterPageInputs from "./RegisterPageInputs";
import { validateRegisterForm } from "../../shared/utils/Validators";
import {connect} from 'react-redux';
import { getActions } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
const RegisterPage = ({register}) => {
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsFormValid(validateRegisterForm({ mail,username, password }));
  }, [mail, password, username, setIsFormValid]);

  const handlerRegister = () => {
    const userDetails = {
      mail,
      username,
      password
    }
    register(userDetails,navigate);
  };
  return (
    <AuthBox>
      <Typography variant="h3" sx={{ color: "white" }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter isFormValid={isFormValid} handlerRegister= {handlerRegister}/>
    </AuthBox>
  );
};
const mapActionsToProps = (dispatch) =>{
  return {
    ...getActions(dispatch)
  }
}
export default connect(null,mapActionsToProps) (RegisterPage);
