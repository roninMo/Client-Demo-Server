require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const sqlc = require("./db");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// to support JSON-encoded and URL-encoded bodies, and headers for handling requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(require("./middleware/headers"));

// Start the server
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
// Random server response from route
app.use("/api/test", function (req, res) {
  res.send("This is data from the /api/test endpoint. It's from the server");
});

// Initial connection
sqlc().connect((err) => {
  if (!err) console.log("You are now connected with mysql database...");
  else throw err;
});

/*******************************************
 * End of main server stuff
 *******************************************/

/*****************
 * Controllers *
 *****************/
const users = require("./controllers/userController");
const clients = require("./controllers/clientController");
const companies = require("./controllers/companyController");
const commissions = require("./controllers/commissionsController");

/********************
 * Exposed routes *
 ********************/
app.use("/users", users);

/**********************
 * Protected routes *
 **********************/
// Import the authentication
// app.use(require("./middleware/validatesession"));

// Now add the routes that will need authentication - reviews
app.use("/clients", clients);
app.use("/companies", companies);
app.use("/commissions", commissions);
