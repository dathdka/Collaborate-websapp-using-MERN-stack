import React from 'react';
import { Alert } from '@mui/material';
import {Snackbar} from '@mui/material';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/alertAction';

const AlertNotification = (props) => {
    const {showAlertMessage,closeAlertMessage, alertMessageContent} = props
    return (
        <Snackbar anchorOrigin={{vertical:'bottom',horizontal:'right'}}
        open={showAlertMessage}
        onClose={closeAlertMessage}
        autoHideDuration = {5000}
        >
            <Alert sererity= "warning"> {alertMessageContent}</Alert>
        </Snackbar>
    );
};
const mapStoreStateToProps = ({alert}) =>{
    return {
        ...alert
    }
}
const mapActionsToProps = (dispatch) =>{
    return {
        ...getActions(dispatch)
    }
}
export default connect(mapStoreStateToProps,mapActionsToProps)(AlertNotification);