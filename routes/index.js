var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var io = require("../socketapi").io;

mongoose.connect("mongodb://localhost:27017/chatSocket", (err) => {
  console.log("mongodb connected", err);
});
var Message = mongoose.model("Message", { name: String, message: String });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile("index.html");
});

router.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

router.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) sendStatus(500);
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});

module.exports = router;
