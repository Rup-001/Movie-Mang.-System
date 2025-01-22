require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const app = express();
const database = require("./config/database")
const authRoute = require('./routes/auth.router')
const movieRoute = require('./routes/movie.route')
const reportRoute = require('./routes/report.router')
const passport = require('./config/passportConfig');
app.use(passport.initialize());

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Sample route for testing
app.use("/", authRoute);
app.use("/movie", movieRoute);
app.use("/report", reportRoute);


// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).send("Route not found");
});

module.exports = app;
