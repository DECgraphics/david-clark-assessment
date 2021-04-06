const fs = require('fs');
const path = require("path");

const {findFirstFreeTimeSlot} = require('./findTimeSlot');

var files = fs.readdirSync(path.resolve(__dirname, "../data/"));
const inputFiles = files.filter(fileName => fileName.startsWith('input'));

inputFiles.forEach(fileName => {
    const timeSlot = findFirstFreeTimeSlot(fileName);
    console.log(timeSlot);
});
