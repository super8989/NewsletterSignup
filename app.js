const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));

app.listen(3000, () => console.log('Server is running on port 3000'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/signup.html');
});
