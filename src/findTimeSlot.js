const {
    findFileWith,
    splitFileDataIntoObjects,
    findNumberOfDays,
    findMeetingsOnThisDay,
    putMeetingsInOrder,
    updateTimeSlot,
    timeConvert,
} = require('./helperFunctions');

exports.findFirstFreeTimeSlot = (fileName) => {
    const file = findFileWith(fileName);
    const data = splitFileDataIntoObjects(file);
    return searchEachWeekdayForAvailablity({data, fileName});
}    

const searchEachWeekdayForAvailablity = (filePacket) => {
    const numberOfDays = findNumberOfDays(filePacket.data);
    let allAvailableSlots = [];
    for (let i = 0; i < numberOfDays; i++) {
        const slot = findTimeSlot(i + 1, filePacket);
        if(slot !== null) {
            allAvailableSlots.push(slot);
        }
    }
    return allAvailableSlots[0];
}

const findTimeSlot = (dayOfweek, {data, fileName}) => {
    const startOfDay = 480;
    const endOfDay = 1079

    let currentDay = findMeetingsOnThisDay(data, dayOfweek);
    currentDay = putMeetingsInOrder(currentDay);

    let nextTimeSlot = startOfDay - 1;
    let firstAvailableTime = null;

    currentDay.forEach((meeting, index) => {

        // if there is space at the beginning of the day
        if (index === 0 && meeting.start >= startOfDay + 60) {
            if (firstAvailableTime === null) {
                firstAvailableTime = `${fileName}: ${meeting.day} ${timeConvert(startOfDay)}-${timeConvert(startOfDay + 59)}`;
            }
        }

        // if there is space in the middle of the day
        if(meeting.start > nextTimeSlot + 60 && meeting.start < endOfDay - 59) {
            if (firstAvailableTime === null) {
                firstAvailableTime = `${fileName}: ${meeting.day} ${timeConvert(nextTimeSlot + 1)}-${timeConvert(nextTimeSlot + 60)}`;
            }
            nextTimeSlot = updateTimeSlot(meeting.end, nextTimeSlot);
        } else {
            nextTimeSlot = updateTimeSlot(meeting.end, nextTimeSlot);
        }

        // if there is space at the end of the day
        if (index === currentDay.length - 1 && meeting.start <= endOfDay - 59 && nextTimeSlot < endOfDay - 59) {
            if (firstAvailableTime === null) {
                firstAvailableTime = `${fileName}: ${meeting.day} ${timeConvert(nextTimeSlot + 1)}-${timeConvert(nextTimeSlot + 60)}`;
            }
        }
    });
    return firstAvailableTime;
}

