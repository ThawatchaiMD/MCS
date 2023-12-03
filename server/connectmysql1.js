let mysql = require('mysql2');
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
})

conn.connect((err) => {
    if (err) throw err;
    console.log('connect to database success');
})

module.exports = conn;