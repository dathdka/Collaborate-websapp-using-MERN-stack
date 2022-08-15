import React from 'react';
import InputWithLabel from '../../shared/components/InputWithLabel';

const RegisterPageInputs = (props) => {
    const {mail,setMail,username,setUsername,password,setPassword} = props; 

    return (
        <>
          <InputWithLabel
          value={mail}
          setValue = {setMail}
          label = 'Email'
          type='text'
          placeholder='enter email'/>  
          <InputWithLabel
          value={username}
          setValue = {setUsername}
          label = 'Username'
          type='text'
          placeholder='enter username'/>  
          <InputWithLabel
          value={password}
          setValue = {setPassword}
          label = 'Password'
          type='password'
          placeholder='enter password'/>  
        </>
    );
};
export default RegisterPageInputs;