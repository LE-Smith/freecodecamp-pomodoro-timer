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
    const timerText = document.getElementById('time-left')
    const timeLeft = timerText.innerText;
    const timerSound = document.getElementById('beep');
    if (timeLeft === '00:00') {
      timerSound.play();
    }
  }, [state]);
  
  
  useEffect(() => {
    setInterval(() => {
      const newPomodoroData = { ...stateRef.current.pomodoroData };
      const actTimeStamp = moment().valueOf();
      const storedTimeStamp = newPomodoroData.timeStamp;
      
      if (newPomodoroData.timerActive) {
        newPomodoroData.timer =
        newPomodoroData.timer -
        Math.round((actTimeStamp - storedTimeStamp) / 1000);

        if (newPomodoroData.timer < 0) {
          // const timerSound = document.getElementById('beep');
          // timerSound.play();
          // newPomodoroData.timerActive = false;
          if (newPomodoroData.nextPomodoroMode === 'shortBreak') {
            newPomodoroData.timer = newPomodoroData.breakLength * 60;
            newPomodoroData.nextPomodoroMode = 'work';
          } else if (newPomodoroData.nextPomodoroMode === 'work') {
            newPomodoroData.timer = newPomodoroData.sessionLength * 60;
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

  const onResetClickedHandler = () => {
    const newPomodoroData = { ...stateRef.current.pomodoroData };
    newPomodoroData.sessionLength = 25;
    newPomodoroData.breakLength = 5;
    newPomodoroData.timer = 25 * 60;
    newPomodoroData.nextPomodoroMode = 'shortBreak';
    newPomodoroData.timerActive = false;
    setState({
      pomodoroData: newPomodoroData,
    });
    const timerSound = document.getElementById('beep');
    timerSound.pause();
    timerSound.currentTime = 0;

  };

  const onIncrementClickedHandler = length => {
    const newPomodoroData = { ...stateRef.current.pomodoroData };
    if (newPomodoroData.timerActive) return;
    if (length === 'session') {
      if (newPomodoroData.sessionLength >= 60) return;
      newPomodoroData.sessionLength++;
      if (newPomodoroData.nextPomodoroMode !== 'work') {
        newPomodoroData.timer = newPomodoroData.sessionLength * 60;
      }
    } else if (length === 'break') {
      if (newPomodoroData.breakLength >= 60) return;
      newPomodoroData.breakLength++;
      if (newPomodoroData.nextPomodoroMode !== 'shortBreak') {
        newPomodoroData.timer = newPomodoroData.breakLength * 60;
      }
    }

    setState({
      pomodoroData: newPomodoroData,
    });
  };

  const onDecrementClickedHandler = length => {
    const newPomodoroData = { ...stateRef.current.pomodoroData };
    if (newPomodoroData.timerActive) return;
    if (length === 'session') {
      if (newPomodoroData.sessionLength <= 1) return;
      newPomodoroData.sessionLength--;
      if (newPomodoroData.nextPomodoroMode !== 'work') {
        newPomodoroData.timer = newPomodoroData.sessionLength * 60;
      }
    } else if (length === 'break') {
      if (newPomodoroData.breakLength <= 1) return;
      newPomodoroData.breakLength--;
      if (newPomodoroData.nextPomodoroMode !== 'shortBreak') {
        newPomodoroData.timer = newPomodoroData.breakLength * 60;
      }
    }

    setState({
      pomodoroData: newPomodoroData,
    });
  };

  const timerLabel =
    state.pomodoroData.nextPomodoroMode === 'shortBreak' ? 'Session' : 'Break';

  return (
    <div className="App">
      <pomodoroContext.Provider
        value={{
          pomodoroData: state.pomodoroData,
          timerClickHandler: () => timerClickHandler(state, setState),
        }}
      >
        <div>
          <audio
            id="beep"
            src="./sounds/a_tone_bell.mp3"
          />
        </div>
        <PomodoroTimer label={timerLabel} />
        <div className="button-container">
          <LengthInput
            ids={sessionIds}
            label="Session"
            length={state.pomodoroData.sessionLength}
            incrementClicked={onIncrementClickedHandler.bind(this, 'session')}
            decrementClicked={onDecrementClickedHandler.bind(this, 'session')}
          />
          <ResetButton onClick={onResetClickedHandler} />
          <LengthInput
            ids={breakIds}
            label="Break"
            length={state.pomodoroData.breakLength}
            incrementClicked={onIncrementClickedHandler.bind(this, 'break')}
            decrementClicked={onDecrementClickedHandler.bind(this, 'break')}
          />
        </div>
      </pomodoroContext.Provider>
    </div>
  );
}

export default App;
