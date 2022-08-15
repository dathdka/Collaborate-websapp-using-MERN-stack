export const validateLoginForm = ({ mail, password }) => {
    const isMailValid = validateMail(mail);
    const isPasswordValid = validatePassword(password);
  
    return isMailValid && isPasswordValid;
  };

export const validateRegisterForm = ({mail, username, password})=>{
    const isMailValid = validateMail(mail);
    const isPasswordValid = validatePassword(password);
    const isUsernameValid = validateUsername(username);

    return isMailValid && isPasswordValid && isUsernameValid;
}
  const validatePassword = (password) => {
    // console.log(password);
        // console.log(password.length > 5 && password.length <13);
      return password.length > 5 && password.length <13;

  };

  const validateUsername = (username) =>{
      return username.length> 5 && username.length<20;
  }
  export const validateMail = (mail) => {
    // console.log(mail);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // console.log(emailPattern.test(mail));
    return emailPattern.test(mail);
  };