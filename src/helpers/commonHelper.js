const { ObjectID } = require("mongodb");
// const axios = require("axios");
const crypto = require("crypto");
// const moment= require("moment");
// const momenttz = require("moment-timezone");
const _ = require('lodash');
// const multer = require("multer");

function generateRandomString(stringLength) {
    let randomString = "";
    let asciiLow = 65;
    let asciiHigh = 90;

    for (let i = 0; i < stringLength; i++) {
        let randomAscii = Math.floor(
            Math.random() * (asciiHigh - asciiLow) + asciiLow
        );
        randomString += String.fromCharCode(randomAscii);
    }

    return randomString + crypto.randomBytes(10).toString("hex");
}





// const excelFilter = (req, file, cb) => {
//     if (
//         file.mimetype.includes("excel") ||
//     file.mimetype.includes("spreadsheetml")
//     ) {
//         cb(null, true);
//     } else {
//         cb("Please upload only excel file.", false);
//     }
// };

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./public/logs/exceltodb");
//     },
//     filename: (req, file, cb) => {
//         console.log(file.originalname);
//         cb(null, `${Date.now()}-excel-${file.originalname}`);
//     }
// });

// let uploadFile = multer({ storage: storage, fileFilter: excelFilter });






module.exports = {
    
    generateRandomString,
};
