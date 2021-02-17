import React, { useContext } from 'react';
import './PomodoroTimer.css';
import pomodoroContext from '../../context/pomodoroContext';
import CircleIndicator from '../CircleIndicator/CircleIndicator';

export default function PomodoroTimer(props) {

    const { pomodoroData, timerClickHandler } = useContext(pomodoroContext);

    const minutes = Math.floor(pomodoroData.timer / 60);
    const seconds = Math.floor(pomodoroData.timer % 60);
    let percent = 0;
    if (pomodoroData.nextPomodoroMode === 'shortBreak') {
        percent = 100 - (((minutes*60+seconds)/(pomodoroData.sessionLength*60))*100)
    }
    else if (pomodoroData.nextPomodoroMode === 'work') {
        percent = (((minutes*60+seconds)/(pomodoroData.breakLength*60))*100)
    }

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    let sizeOfCircle = null;
    let sizeOfFont = null;
    let shadowOfBox = null;
    if (vh > vw){
        sizeOfCircle = '70vw'
        sizeOfFont = '20vw'
        shadowOfBox = '0 0 40px #8098b1bf'
    }else{
        sizeOfCircle = '50vh'
        sizeOfFont = '15vh'
        shadowOfBox = '0 0 20px #8098b1bf'
    }

    

    return (

        <div id="start_stop" className="pomodoro-timer" style={{ height: sizeOfCircle, width: sizeOfCircle, fontSize: sizeOfFont, boxShadow: shadowOfBox }} onClick={timerClickHandler}>
            <CircleIndicator percent={percent} size={sizeOfCircle} color="#8098b1" />
            <div className="pomodoro-timer__label" id="timer-label">
                {props.label}
            </div>
            <div className="pomodoro-timer__text" id="time-left">
                {minutes < 10 ? `0${minutes}`: minutes}:{seconds < 10 ? `0${seconds}`: seconds}
            </div>
        </div>
    )
}
