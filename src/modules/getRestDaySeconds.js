import moment from 'moment';




const getRestDaySeconds = (state, callSetState ) => {

    const actDate = new Date();
    const hour = actDate.getHours();
    const minute = actDate.getMinutes();
    const second = actDate.getSeconds();
    const sumSeconds = second + minute * 60 + hour * 60 * 60;




    const newPomodoroData = { ...state.pomodoroData };
    const actTimeStamp = moment().valueOf();
    const storedTimeStamp = newPomodoroData.timeStamp


    if (newPomodoroData.timerActive) {
        newPomodoroData.timer = newPomodoroData.timer - Math.round((actTimeStamp - storedTimeStamp) / 1000);
        if (newPomodoroData.timer <= 0) {
            newPomodoroData.timerActive = false;
            if (newPomodoroData.nextPomodoroMode === 'shortBreak') {
                newPomodoroData.timer = 5 * 60;
                newPomodoroData.nextPomodoroMode = 'work';

            }
            else if (newPomodoroData.nextPomodoroMode === 'work') {
                newPomodoroData.timer = 25 * 60;
                newPomodoroData.nextPomodoroMode = 'shortBreak';
            }
        }
    }

    newPomodoroData.timeStamp = actTimeStamp;

    callSetState({
        pomodoroData: newPomodoroData
    });

};

export default getRestDaySeconds;