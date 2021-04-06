const { 
    findNumberOfDays,
    findMeetingsOnThisDay ,
    putMeetingsInOrder ,
    updateTimeSlot,
    timeConvert
} = require('../src/helperFunctions');

const meetingData = [
    {day: 1, start: 480, end: 500},
    {day: 3, start: 580, end: 800},
    {day: 6, start: 480, end: 1070}
];

test('should find how many to run time slot function on', () => {
    const numberOfDays = findNumberOfDays(meetingData);
    expect(numberOfDays).toBe(6);
});

test('should find all the meetings on that day', () => {
    const meetings = findMeetingsOnThisDay(meetingData, 1);
    expect(meetings).toEqual([
        {day: 1, start: 480, end: 500}
    ]);
});

test('should put all meetings in order of start time', () => {
    const meetings = putMeetingsInOrder(meetingData);
    expect(meetings).toEqual([
        {day: 1, start: 480, end: 500},
        {day: 6, start: 480, end: 1070},
        {day: 3, start: 580, end: 800}
    ]);
})

test('this should update next time slot to a later time', () => {
    const time = updateTimeSlot(480, 789);
    expect(time).toBe(789);
})

test('should convert minites into 24hour time', () => {
    const time = timeConvert(480);
    expect(time).toBe('08:00');
});

