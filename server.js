const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'r00td@t@',
    database: 'company_db'
  },
  console.log(`Connected to the courses_db database.`)
);


// db.query(`DELETE FROM tbl_nm WHERE id = ?`, #, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Query database
db.query('SELECT * FROM tbl_nm', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`);
});