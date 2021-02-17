import React from 'react';
import './CircleIndicator.css';

export default function CircleIndicator(props) {

    const { percent, size, color = 'black' } = props;

    const circleStyle = {
        height: size,
        width: size,
        borderColor: color,
    }

    const circleStatusStyle = {
        height: `${percent}%`,
        backgroundColor: color
    }

    return (
        <div className="circle-indicator" style={circleStyle} >
            <div className="circle-indicator__status"
                style={circleStatusStyle}>
            </div>
        </div>
    )
}
