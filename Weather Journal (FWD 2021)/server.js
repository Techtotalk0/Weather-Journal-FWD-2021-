const cors = require('cors'); 
const express = require('express');
const bodyParser = require('body-parser');

/** The listing port */
const port = 4800;

// declare an empty object to work as an end point for all routes
projectData = {};

// decalre a new instanse
const app = express();



/* Mediator*/
//To configure express to use body-parser as mediator.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//To make Cors for cross origin custom
app.use(cors());

// To start the main project files
app.use(express.static('website'));

// Server start
app.listen(port, () => {
    console.log(`Server listening On: http://localhost:${port}`);
});



// Express routes
/**
 * To get all data
 */
app.get('/getAll', (req, res) => {
    res.send(projectData).status(200).end();
});



/**
 * To post data
 */
app.post('/postData', (req, res) => {
    //The data to be post
    projectData={
        temp:request.body.temp,
        date:request.body.date,
        content:request.body.content
    };
    res.send(projectData).status(404).end();
});

