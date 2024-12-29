import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarNotification = ({ type, message, onClose }) => {
    return (
        <Snackbar
            open={!!message}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarNotification;