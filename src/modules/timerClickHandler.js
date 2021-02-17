

const timerClickHandler = (state, callSetState) => {
    // console.log('[timerClickHandler] start')

    const newPomodoroData = state.pomodoroData;
    newPomodoroData.timerActive = !newPomodoroData.timerActive;
    callSetState({
        pomodoroData: newPomodoroData
    });

};

export default timerClickHandler;