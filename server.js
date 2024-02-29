
let express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cors = require("cors");

dotenv.config();

const app = express();

// const dbConnect = require("./utils/dbConnect");
// dbConnect();

// #TODO: ADD PASSPORT CONFIG


//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
}); 

const http = require("http");
const server = http.createServer(app);
//api routes

server.listen(5000, () => console.log(`Server running on port 5000`));