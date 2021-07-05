const mysql = require('mysql');
const jwt = require('jsonwebtoken');
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
    let username = req.body.username;
    let password = req.body.password;
    connection.query("SELECT * FROM users where username = ?",[username],async function (error,results,fields) {
      if (error) {
        res.send({
          'code': 404,
          'message': 'Server error'
      });
      } else {
        results = JSON.parse(JSON.stringify(results));
        if (results[0].username == username && results[0].password == password) {
            jwt.sign({results}, 'hammadapi', {expiresIn: '2h'} , (err, token) => {
                res.send({
                    'code': 201,
                    'message': 'LogIn Successfull',
                    'userid': results[0].id,
                    'token': token
                });
            });
        } else {
          res.send({
            'code': 404,
            'message': 'Wrong Password'
          });
        }
      }
    });
};