import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI Imports
import { Grid, Typography } from '@mui/material';

const Alert = ({ alerts }) => {
    if (alerts !== null && alerts.length > 0) {
        return alerts.map((alert) => (
            <Grid container my={1} key="alert.id">
                <Grid item xs={12} bgcolor={alert.alertType} p={1}>
                    <Typography variant="h6" color="white">
                        {alert.msg}
                    </Typography>
                </Grid>
            </Grid>
        ));
    }
};

// Defining Proptype
Alert.prototype = {
    alerts: PropTypes.array.isRequired,
};

// Access Redux State
const mapStateToProps = (state) => ({
    alerts: state.alertState,
});

export default connect(mapStateToProps)(Alert);
