import React, { useState } from 'react';
import './App.css';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import pomodoroContext from './context/pomodoroContext';

import timerClickHandler from './modules/timerClickHandler';

function App() {
  const [state, setState] = useState({
    pomodoroData: {
      timer: 60 * 25,
      timerActive: false,
      nextPomodoroMode: 'shortBreak', //work
  },
  })
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
