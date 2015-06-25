var knexConfig = require('./knexfile');
var knex = require('knex')(knexConfig);
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get('/todo', function (req, res) {
    console.log(req);
    res.send(JSON.stringify({value : counter1}));
});

// app.put('/counter/1', function (req, res) {
//     console.log(req.body);
//     counter1 = req.body.value;
//     res.end();
// });

app.listen(3000, function () {
    console.log("server started");
});