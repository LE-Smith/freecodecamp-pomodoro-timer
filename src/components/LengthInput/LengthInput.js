import React from 'react';
import './LengthInput.css';

const LengthInput = props => {
  return (
    <div className="length-input">

        <div className="length-input__increment"id={props.ids.increment}>+</div>
        <div className="length-input__label"id={props.ids.label}>{props.label}</div>
        <div className="length-input__length"id={props.ids.length}>{props.length}</div>
        <div className="length-input__decrement"id={props.ids.decrement}>-</div>

    </div>
  );
};

export default LengthInput;
