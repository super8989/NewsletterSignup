const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

require('dotenv').config();
const API = process.env.API;
// console.log(process.env);

app.listen(3000, () => console.log('Server is running on port 3000'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	};

	const jsonData = JSON.stringify(data);

	const options = {
		url: 'https://us4.api.mailchimp.com/3.0/lists/795a2a1b64',
		method: 'POST',
		headers: {
			Authorization: `sam ${API}`
		},
		body: jsonData
	};

	request(options, (error, response, body) => {
		if (error) {
			res.send('There was an error with singing up. Please try again');
		} else {
			if (response.statusCode === 200) {
				res.send('Successfully subscribed');
			} else {
				res.send('There was an error with singing up. Please try again');
			}
		}
	});
});

// List id
// 795a2a1b64
