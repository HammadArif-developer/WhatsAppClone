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
    let roomName = req.body.room_name;
    let createdBy = req.body.user_id;
    let password = req.body.password;
    let lastMessage = null;
    if (req.body.message_id != null ) {
        lastMessage = req.body.message_id
        connection.query("INSERT INTO chatrooms (room_name, created_by, last_message, password) VALUES (?,?,?,?)",[roomName, createdBy, lastMessage, password],async function (error,results,fields) {
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
    } else {
        connection.query("INSERT INTO chatrooms (room_name, created_by, password) VALUES (?,?,?)",[roomName, createdBy, password],async function (error,results,fields) {
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
};
