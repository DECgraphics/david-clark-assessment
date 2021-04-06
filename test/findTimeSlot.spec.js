const {findFirstFreeTimeSlot} = require('../src/findTimeSlot');

test('should return a string with the first available time slot in file', () => {

    const input1timeSlot = findFirstFreeTimeSlot('input1.txt');
    expect(input1timeSlot).toBe('input1.txt: 1 13:00-13:59');

    const input2timeSlot = findFirstFreeTimeSlot('input2.txt');
    expect(input2timeSlot).toBe('input2.txt: 2 08:00-08:59');

    const input3timeSlot = findFirstFreeTimeSlot('input3.txt');
    expect(input3timeSlot).toBe('input3.txt: 2 08:00-08:59');

    const input4timeSlot = findFirstFreeTimeSlot('input4.txt');
    expect(input4timeSlot).toBe('input4.txt: 2 12:29-13:28');

    const input5timeSlot = findFirstFreeTimeSlot('input5.txt');
    expect(input5timeSlot).toBe('input5.txt: 3 13:18-14:17');

});