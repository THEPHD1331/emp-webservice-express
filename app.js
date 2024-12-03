// Import required libraries
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const route = require("./routes/routes");

// Set the environment, ie configure the project

//configure by Specifying views folder to contain dynamic view files 
app.set("views", 

    // Concatenates the path together
    path.join(__dirname, "views"));

// Set template engine for generation of dynamic content
// eg. Thymeleaf
app.set("view engine", "ejs");

// Use middleware fn to set css files path
//app.use("/css", express.static(path.resolve(__dirname, "public/css")));

// Middleware fn to intercept every request and print log
app.use((req, res, next) => {
    console.log(req.url+" -:- "+req.method)
    next();
})

// Returns middleware that only parses urlencoded bodies
// Used for post request processing
app.use(bodyParser.urlencoded({extended:false}));

// Use router for url-based page routing
app.use('/', route);

// Start the server 
app.listen(4023, () => {
    console.log(new Date().toLocaleString()+": Server Node for Emp App started at port 4023")
});