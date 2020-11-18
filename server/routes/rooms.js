const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port:'3306',
  database: 'chatapp'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

exports.display = async function(req, res){
    connection.query("SELECT * FROM chatrooms",async function (error,results,fields) {
      if (error) {
        res.send({
          'code': 404,
          'message': 'Server error'
      });
      } else {
        results = JSON.parse(JSON.stringify(results));
        res.send(results);
      }
    });
};