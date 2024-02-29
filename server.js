
let express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cors = require("cors");

dotenv.config();

const app = express();

const dbConnect = require("./utils/dbConnect");
dbConnect();

// #TODO: ADD PASSPORT CONFIG

app.use(passport.initialize());
require("./utils/passport")(passport);

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(cors());
//API routers
const users = require("./routes/userRoutes");


//adding routes to the app object
app.use("/api/users", users);

const http = require("http");
const server = http.createServer(app);
//api routes

server.listen(5000, () => console.log(`Server running on port 5000`));