import React from 'react';
import PropTypes from 'prop-types';

function Notification({ notification }) {
    const { message } = notification;
    const { success } = notification;
    return (
        <div
            style={{
                border: `2px solid ${success ? 'green' : 'red'}`,
                borderRadius: '5px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                padding: '5px',
                color: `${success ? 'green' : 'red'}`,
                margin: '5px'
            }}
        >
            <p>{message}</p>
        </div>
    );
}

Notification.propTypes = {
    notification: PropTypes.shape({
        message: PropTypes.string.isRequired,
        success: PropTypes.bool.isRequired
    }).isRequired
};

export default Notification;
