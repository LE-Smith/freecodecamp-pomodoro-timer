import React from 'react';
import './ResetButton.css';

const ResetButton = props => {
  return (
    <div className="reset-button" onClick={props.onClick}>
        <div id="reset">RESET</div>
    </div>
  );
};

export default ResetButton;
