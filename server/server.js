const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql');
const PORT = 3001;

// database configurations
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sam'
});
connection.connect();

// app configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});
app.listen(PORT);
console.log('API server started on: ' + PORT);

// routes configurations
const routes = function(app) {
  app.route('/students').get(function(req, res) {
    connection.query("SELECT * FROM students", function (err, students) {
      res.send(students);
    });
  })
};
routes(app); //register the routes