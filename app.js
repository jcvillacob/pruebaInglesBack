const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Modules
const user = require('./modules/users');
const functions = require('./functions');

// Login and requests
const login = require('./modules/login');

const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config({path : 'variables.env'});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// middleware
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/users', user.userRoutes);
app.use('/functions', functions.functionRoutes);

// Login
app.use('/login', login.loginRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});