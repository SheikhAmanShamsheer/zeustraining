import express from 'express'
import mysql from 'mysql2'
// import csvExtractor from './extractor.js'
import fastcsv from 'fast-csv';
// const fs = require("fs");
import fs from 'fs'
import cors from 'cors'
import multer from 'multer'
const app = express()
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zeus@123',
    database: 'test'
})
db.connect((err) => {
    if (err) {
        console.log("failed to connect to the MySQL server");
        console.log(err);
    } else {
        console.log("Connected to the Database");
    }
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})
app.use(express.urlencoded({ extended: false }))
const upload = multer({ storage: storage })
app.use(cors())

app.get('/', (req, res) => {
    res.json("hello this is backend")
})

app.get('/files', (req, res) => {
    const start = req.query.answer
    console.log(start)
    var q = `SELECT * FROM files`
    q += ` LIMIT 10 OFFSET ${start}`;
    db.query(q, [start], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
app.post('/files', upload.single('file'), (req, res) => {
    const q = 'INSERT IGNORE INTO files(`username`,`email`,`firstName`,`lastName`) VALUES ?'
    const data = []
    fs.createReadStream(req.file.path)
        .pipe(fastcsv.parse({ delimiter: ",", from_line: 1 }))
        .on("data", function (columns) {
            // console.log(columns)
            // const columns = row[0].split(",");
            // console.log(columns)
            const hasNullUndefined = columns.some(col => col === 'null' || col === 'undefined' || col.trim() === "");
            if ((columns.length !== 0) && !hasNullUndefined) {
                data.push(columns);
            }
        })
        .on("error", function (error) {
            // if(err.)
            console.error("on error " + error.message);
            res.json(error.message); // Reject the Promise with the error message
        })
        .on("end", function () {
            // resolve(data);
            db.query(q, [data], (err, data) => {
                if (err) return res.json(err)
                    console.log("File has been uploaded")
                return res.json('File has been uploaded')
            }) // Resolve the Promise with the parsed data
        });

})

// app.post('/files', upload.single('file'), async (req, res) => {
//     const q = 'INSERT INTO files(`username`,`email`,`firstName`,`lastName`) VALUES ?'
//     // const values = await csvExtractor(req.file.path)
//     db.query(q, [values], (err, data) => {
//         if (err) return res.json(err)
//         return res.json('File has been uploaded')
//     })
//     // return res.redirect('/')
// })



app.listen(8800, () => {
    console.log("connected to backend")
})