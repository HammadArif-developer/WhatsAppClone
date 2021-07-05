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
    jwt.verify(req.token, 'hammadapi', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let userId = req.body.user_id;
            let roomId = req.body.room_id;
            let message = req.body.message;
            connection.query("INSERT INTO messages (user_id, content, room_id) VALUES (?,?,?)",[userId, message, roomId],async function (error,results,fields) {
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
            }
        });
};
