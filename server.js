const express = require('express');
require('inquirer')
require('console.table')
// Import and require mysql2
const mysql = require('mysql2/promise');

// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create the connection, specify bluebird as Promise
const db = await mysql.createConnection(
    {
        host:'localhost', 
        user: 'root', 
        database: 'test', 
        Promise: bluebird},
        console.log(`Connected to the courses_db database.`)
);

// query database
const [rows, fields] = await db.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`);
});