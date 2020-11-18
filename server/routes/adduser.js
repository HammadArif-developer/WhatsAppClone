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
    let userName = req.body.user_name;
    let password = req.body.password;
    connection.query("INSERT INTO users (username, password) VALUES (?,?)",[userName, password],async function (error,results,fields) {
        if (error) {
            res.send({
            'code': 404,
            'message': 'Server error'
        });
        } else {
            res.send({
                'code': 201,
                'message': 'Successfull'
            });
        }
        });
};
