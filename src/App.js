import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import './App.css';

import LengthInput from './components/LengthInput/LengthInput';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import ResetButton from './components/ResetButton/ResetButton';

import pomodoroContext from './context/pomodoroContext';
import timerClickHandler from './modules/timerClickHandler';

function App() {
  const [state, setState] = useState({
    pomodoroData: {
      timer: 60 * 25,
      timerActive: false,
      nextPomodoroMode: 'shortBreak', //work,
      sessionLength: 25,
      breakLength: 5,
    },
  });
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    setInterval(() => {
      const newPomodoroData = { ...stateRef.current.pomodoroData };
      const actTimeStamp = moment().valueOf();
      const storedTimeStamp = newPomodoroData.timeStamp;

      if (newPomodoroData.timerActive) {
        newPomodoroData.timer =
          newPomodoroData.timer -
          Math.round((actTimeStamp - storedTimeStamp) / 1000);
        if (newPomodoroData.timer <= 0) {
          newPomodoroData.timerActive = false;
          if (newPomodoroData.nextPomodoroMode === 'shortBreak') {
            newPomodoroData.timer = state.pomodoroData.breakLength * 60;
            newPomodoroData.nextPomodoroMode = 'work';
          } else if (newPomodoroData.nextPomodoroMode === 'work') {
            newPomodoroData.timer = state.pomodoroData.sessionLength * 60;
            newPomodoroData.nextPomodoroMode = 'shortBreak';
          }
        }
      }

      newPomodoroData.timeStamp = actTimeStamp;

      setState({
        pomodoroData: newPomodoroData,
      });
    }, 1000);
  }, []);

  const breakIds = {
    label: 'break-label',
    increment: 'break-increment',
    decrement: 'break-decrement',
    length: 'break-length',
  };

  const sessionIds = {
    label: 'session-label',
    increment: 'session-increment',
    decrement: 'session-decrement',
    length: 'session-length',
  };

  return (
    <div className="App">
      <pomodoroContext.Provider
        value={{
          pomodoroData: state.pomodoroData,
          timerClickHandler: () => timerClickHandler(state, setState),
        }}
      >
        <PomodoroTimer label="Session" />
        <div className="button-container">
        <LengthInput ids={sessionIds} label="Session" length={25} />
        <ResetButton />
        <LengthInput ids={breakIds} label="Break" length={5} />
        </div>
      </pomodoroContext.Provider>
    </div>
  );
}

export default App;
