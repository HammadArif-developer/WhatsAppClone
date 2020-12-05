var express = require("express");
var bodyParser = require("body-parser");
let cors = require("cors");
const jwt = require('jsonwebtoken');
var getrooms = require("./routes/rooms");
var getroom = require("./routes/singleroom");
var addroom = require("./routes/addroom");
var getusers = require("./routes/users");
var adduser = require("./routes/adduser");
var getmessages = require("./routes/messages");
var addmessage = require("./routes/addmessage");
var signin = require("./routes/signin");
var updatechat = require("./routes/updatechat");
var roompass = require("./routes/roompasscheck");
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.get("/", function (req, res) {
    res.send({ message: "welcome to our upload module apis" });
});
router.all("/rooms",cors(),verifyToken, getrooms.display);
router.all("/singleroom",cors(),verifyToken, getroom.display);
router.all("/addroom"  ,cors(),verifyToken, addroom.display);
router.all("/users",cors(), verifyToken, getusers.display);
router.all("/signup"  ,cors(),verifyToken, adduser.display);
router.all("/messages",cors(),verifyToken, getmessages.display);
router.all("/addmessage"  ,cors(),verifyToken, addmessage.display);
router.all("/refreshchat"  ,cors(),verifyToken, updatechat.display);
router.all("/roomaccess"  ,cors(),verifyToken, roompass.display);
router.all("/signin",cors(),signin.display);

function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.use("/chatapp", router);
app.listen(4000);
console.log("server is listening...");