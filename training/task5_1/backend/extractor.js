// // const { parse } = require("csv-parse");
// import {parse} from 'csv-parse';
// // const fs = require("fs");
// import fs from 'fs'

// // specify the path of the CSV file
// const path = "./username.csv";

// // Create a readstream
// // Parse options: delimiter and start from line 1
// const csvExtractor =  (path) =>{
//     // var data = []
//     // fs.createReadStream(path)
//     // .pipe(parse({ delimiter: ",", from_line: 1 }))
//     // .on("data", function (row) {
//     //     // executed for each row of data
//     //     // console.log(row[0])
//     //     const columns = row[0].split(";");
//     //     // console.log(columns)
//     //     // Check if any component is null, undefined, or empty
//     //     const hasNullUndefined = columns.some(col => col === 'null' || col === 'undefined' || col.trim() === "");

//     //     // If any component is null, undefined, or empty, skip processing the row
//     //     if((row[0].length !== 0) && !hasNullUndefined) {
//     //         data.push(row[0].split(';'))
//     //     }
//     // })
//     // .on("error", function (error) {
//     //     // Handle the errors
//     //     return error.message;
//     // })
//     // .on("end", function () {
//     //     // executed when parsing is complete
//     //     console.log(data)
//     //     return data
//     // });
//     return new Promise((resolve, reject) => {
//         const data = [];
//         fs.createReadStream(path)
//             .pipe(parse({ delimiter: ",", from_line: 1 }))
//             .on("data", function (row) {
//                 const columns = row[0].split(";");
//                 const hasNullUndefined = columns.some(col => col === 'null' || col === 'undefined' || col.trim() === "");
//                 if ((row[0].length !== 0) && !hasNullUndefined) {
//                     data.push(row[0].split(';'));
//                 }
//             })
//             .on("error", function (error) {
//                 reject(error.message); // Reject the Promise with the error message
//             })
//             .on("end", function () {
//                 resolve(data); // Resolve the Promise with the parsed data
//             });
//     });
// }
// // csvExtractor(path)
// export default csvExtractor