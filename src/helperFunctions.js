const fs = require('fs');
const path = require("path");

exports.findFileWith = (fileName) => {
    return fs.readFileSync(path.resolve(__dirname, `../data/${fileName}`), 'utf8');
}

exports.splitFileDataIntoObjects = (file) => {
    let data = file.split('\n');
    return data.map(date => convertFileDataToObject(date));
}
const convertFileDataToObject = (date) => {
    const times = date.split(' ');
    const start = times[1].split('-')[0];
    const end = times[1].split('-')[1];
    return {
        day: parseInt(times[0]),
        start: convertToMinutes(start),
        end: convertToMinutes(end),
    }
}
const convertToMinutes = (time) => {
    const numberValues = time.split(':');
    return (parseInt(numberValues[0]) * 60) + parseInt(numberValues[1]);
}

exports.findNumberOfDays = (data) => {
    let days = data.map(({day}) => day);
    return Math.max(...days);
}

exports.findMeetingsOnThisDay = (data, dayOfweek) => {
    return data.filter(({ day }) => day === dayOfweek);
}

exports.putMeetingsInOrder = (daysMeetings) => {
    return daysMeetings.sort((a, b) => a.start - b.start);
}

exports.updateTimeSlot = (meetingEnd, nextTimeSlot) => {
    return meetingEnd > nextTimeSlot ? meetingEnd : nextTimeSlot;
}

exports.timeConvert = (number) => {
    let hours = (number / 60);
    let roundedHours = Math.floor(hours);
    roundedHours = addZeroToNumber(roundedHours);
    let roundedMinutes = Math.round((hours - roundedHours) * 60);
    roundedMinutes = addZeroToNumber(roundedMinutes);
    return `${roundedHours}:${roundedMinutes}`;
}
const addZeroToNumber = (number) => {
    return number < 10 ? `0${number}`: number;
}