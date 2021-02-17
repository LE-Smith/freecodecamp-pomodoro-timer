import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import './App.css';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import pomodoroContext from './context/pomodoroContext';

import timerClickHandler from './modules/timerClickHandler';

function App() {
  const [state, setState] = useState({
    pomodoroData: {
      timer: 60,
      timerActive: false,
      nextPomodoroMode: 'shortBreak', //work
  },
  })
  const stateRef = useRef(state);
  stateRef.current = state;


  useEffect(() => {
    setInterval(() => {

      const newPomodoroData = { ...stateRef.current.pomodoroData };
      const actTimeStamp = moment().valueOf();
      const storedTimeStamp = newPomodoroData.timeStamp
  
      if (newPomodoroData.timerActive) {
          newPomodoroData.timer = newPomodoroData.timer - Math.round((actTimeStamp - storedTimeStamp) / 1000);
          if (newPomodoroData.timer <= 0) {
              newPomodoroData.timerActive = false;
              if (newPomodoroData.nextPomodoroMode === 'shortBreak') {
                  newPomodoroData.timer = 30;
                  newPomodoroData.nextPomodoroMode = 'work';
  
              }
              else if (newPomodoroData.nextPomodoroMode === 'work') {
                  newPomodoroData.timer = 60;
                  newPomodoroData.nextPomodoroMode = 'shortBreak';
              }
          }
      }
  
      newPomodoroData.timeStamp = actTimeStamp;
  
      setState({
          pomodoroData: newPomodoroData
      });

    }, 1000);
  }, []);

  return (
    <div className="App">
      <pomodoroContext.Provider
        value={{
          pomodoroData: state.pomodoroData,
          timerClickHandler: () =>
            timerClickHandler(state, setState),
        }}
      >
        <PomodoroTimer />
      </pomodoroContext.Provider>
    </div>
  );
}

export default App;
