

const timerClickHandler = (state, callSetState) => {

    const newPomodoroData = state.pomodoroData;
    newPomodoroData.timerActive = !newPomodoroData.timerActive;
    if (newPomodoroData.timerActive) {
        callSetState({
            actMode: 'stopped'
        });
    }
    callSetState({
        pomodoroData: newPomodoroData
    });

};

export default timerClickHandler;