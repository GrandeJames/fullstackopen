import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        };
    });

    return (
        <div>
            <div style={{ display: visible ? 'none' : '' }}>
                <button type="button" onClick={toggleVisibility}>
                    {buttonLabel}
                </button>
            </div>
            <div style={{ display: visible ? '' : 'none' }}>
                {children}
                <button type="button" onClick={toggleVisibility}>
                    cancel
                </button>
            </div>
        </div>
    );
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Togglable;
