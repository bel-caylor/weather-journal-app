// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('Express');


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening () {
  console.log('server running')
  console.log(`localhost: ${port}`)
};


// routes
app.get('/all', getData);
// app.get('/', (req, res) => {res.send(projectData)});
// app.post('/', function (req, res) {
//   res.send('POST received')
// });
app.post('/', addData);

function getData (req, res) {
  // console.log(projectData);
  // console.log('test')
  // res.send('hello world');
  res.send(projectData);
  console.log('Data sent');
};

function addData (req, res) {
  console.log('Post received');

  let newData = req.body;
  let newEntry = {
    temp: newData.temperature,
    date: newData.date,
    resp: newData.userResponse
  };
  projectData.push(newEntry);
  console.log(projectData);

  // projectData.push(req.body);
  // console.log(req.body);
  // console.log(projectData);
  // console.log('test');
};
