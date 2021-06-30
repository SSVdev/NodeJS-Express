const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const apiPath = '/api/';

app.use(express.json());
app.use(express.urlencoded());
// load html file
// app.use(express.static('public'));
// app.get('/', function (req, res) {
//    res.sendFile(__dirname + '/' + 'upload.html');
// })
// website index
app.use(express.static('Client'));

// làm static page
// app.get('/test', function (req, res) {
//     res.send('wellcome to expressJS');
//  })
// // làm web API
//  app.get('/users', function (req, res) {
//     res.send([{name:'Hao',address:'VN'},{name:'honsu',address:'Jap'}]);
//  })
// làm routers
app.use(apiPath + 'users', require('./routes/users.route'));
// làm upload file
app.use(apiPath + 'upload', require('./routes/upload.route'));

// server run
app.listen(port, function () {
	const host = 'localhost';
	console.log('Example app listening at http://%s:%s', host, port);
});