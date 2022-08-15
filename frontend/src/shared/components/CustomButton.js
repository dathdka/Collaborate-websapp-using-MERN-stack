import React from 'react';
import Button from '@mui/material/Button';
const CustomButton = ({lable, additionalStyles, disabled, onClick}) => {
    return (
        <Button variant="outlined" sx={{ bgcolor : 'black', color : 'white'}}
        style = {additionalStyles ? additionalStyles: {}}
        disabled = {disabled}
        onClick = {onClick}>{lable}</Button>
    );
};

export default CustomButton;