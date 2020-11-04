const app = require('express')();
const request = require('request');
const cors = require('cors');

const host = 'localhost';
const port = 7000;

app.use(cors())

app.get('/api', (req, res) => {
  const {description, location, full_time, page} = req.query;

  const options = {
    method: 'GET',
    uri: 'https://jobs.github.com/positions.json',
    qs: {
        description: description,
        location: location,
        full_time: full_time,
        page: page
    }
}

request(options, function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
    res.status(200).type('application/json')
    res.send(body);
});


})
app.listen(port, host, function() {
  console.log(`Server listens http://${host}:${port}`)
})
