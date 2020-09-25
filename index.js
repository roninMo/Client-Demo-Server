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

/*********************************
 * Temp/Sample data
 *********************************/
// This needs to be asynchronous, but since this is a one time thing I'm just gonna stick it in the index.js
console.log(`Manually inserting data into the db!`);
const csv = require("@fast-csv/parse");
let csvData = [];

// Initial client data into the db
csv
  .parseFile("./mailingList.csv")
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    csvData.shift();
    // console.log(`Parsing successfully completed, Here's the data: `, csvData);

    /********************************************************
     * ONTO QUERYING THE DATA
     * 0-437 clients within the database *
     * QUERYING NOTES, COMPANIES, COMMISSIONS BELOW
     ********************************************************/
    let clientNotesInsert = [];
    let commissionsInsert = [];
    let companiesInsert = [
      ["Tri Health"],
      ["Insure Choices"],
      ["Geico"],
      ["Progressive"],
      ["State Farm"],
      ["Panda Express"],
      ["Autozone"],
      ["Chipotle"],
      ["Insurance Company A"],
      ["Insurance Company B"],
      ["Insurance Company C"],
      ["Insurance Company D"],
    ];

    // Sample notes, Companies, and Commissions sample data
    let sampleTitles = [
      "Walk the kitty",
      "Client Condition",
      "Filing information",
      "Healthcare assistance",
      "Gardening",
      "Payment issue",
      "Insurance renewal",
      "New spouse information",
      "Data Cleanup",
    ];
    let sampleDescriptions = [
      "I forgot to walk the dog",
      "Check on the client's monthly condition",
      "Take care of the filing information for this client",
      "Assist with health care and life insurance for this client",
      "Tend to the garden",
      "Fix a payment issue with this client",
      "Renew the client's insurance cards",
      "Work with the spouse to add their new insurance information",
      "Clean up this client's data",
    ];
    let sampleCommNotes = [
      "Commission note A",
      "Commission note B",
      "Commission note C",
      "Commission note D",
      "Commission note E",
      "Commission note F",
      "Commission note G",
      "Commission note H",
      "Commission note I",
      "Commission note J",
    ];
    let sampleTypes = ["MAPD", "PDP", "MS", "MAPD", "MAPD"];

    for (let i = 1; i < 438; i++) {
      clientNotesAmount = Math.floor(Math.random() * 6);
      commissionsAmount = Math.floor(Math.random() * 5 + 1);

      // ClientNotes data
      for (let j = 0; j < clientNotesAmount; j++) {
        // Varying amounts of notes for each client (0-5)
        let note = [
          i,
          sampleTitles[Math.floor(Math.random() * 9)],
          sampleDescriptions[Math.floor(Math.random() * 9)],
        ]; // [clientId, title, description]
        clientNotesInsert.push(note);
      }

      // Commissions Data
      for (let j = 0; j < commissionsAmount; j++) {
        // [appDate, effectDate, type, policy, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, notes, clientId, companyId]
        let commission = [
          randomTime(new Date("4-10-2004 10:30"), new Date("9-23-2010 02:10"))
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          randomTime(new Date("4-10-2010 10:30"), new Date("9-23-2020 02:10"))
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          sampleTypes[Math.floor(Math.random() * 5)],
          `Policy # ${(i * 10000) % 100}`,
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          parseFloat((Math.random() * 10000).toFixed(4)),
          sampleCommNotes[Math.floor(Math.random() * 10)],
          i,
          Math.floor(Math.random() * 12 + 1),
        ];
        commissionsInsert.push(commission);
      }
    }

    console.log(`Finished creating the sample data!`);
    // console.log(`Client Notes`, clientNotesInsert);
    // console.log(`Companies`, companiesInsert);
    // console.log(`Commissions`, commissionsInsert);
    console.log(`Commission 0`, commissionsInsert[0]);
    console.log(
      `Final Commission:`,
      commissionsInsert[commissionsInsert.length - 1]
    );

    // // Query the Client data
    // const createQuery = `INSERT INTO Clients (lastName, firstName, address, city, state, zip) VALUES ?`;
    // sqlc().query(createQuery, [csvData], (err, results, fields) => {
    //   if (err) console.log(`Error inserting csv data`, err);
    //   else
    //     console.log(
    //       `Successfully queried csv data, here are the results`,
    //       results
    //     );
    // });

    // // Query the ClientNotes data
    // const notesQuery = `INSERT INTO ClientNotes (client_id, title, description) VALUES ?`;
    // sqlc().query(notesQuery, [clientNotesInsert], (err, results, fields) => {
    //   if (err) console.log(`Error inserting clientNotes data`, err);
    //   else
    //     console.log(
    //       `Successfully queried clientNotes, here are the results`,
    //       results
    //     );
    // });

    // // Query the Companies data
    // const companiesQuery = `INSERT INTO Companies (name) VALUES ?`;
    // sqlc().query(companiesQuery, [companiesInsert], (err, results, fields) => {
    //   if (err) console.log(`Error inserting companies`, err);
    //   else
    //     console.log(
    //       `Successfully queried companies, here are the results`,
    //       results
    //     );
    // });

    // Query the Commissions data
    const commissionsData = `INSERT INTO Commissions (appDate, effectDate, type, policy, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dece, notes, clientId, companyId) VALUES ?`;
    sqlc().query(
      commissionsData,
      [commissionsInsert],
      (err, results, fields) => {
        if (err) console.log(`Error inserting commissions`, err);
        else
          console.log(
            `Successfully queried commissions, here are the results`,
            commissions
          );
      }
    );
  });

// Functions section
function randomTime(start, end) {
  // get the difference between the 2 dates, multiply it by 0-1,
  // and add it to the start date to get a new date
  var diff = end.getTime() - start.getTime();
  var new_diff = diff * Math.random();
  var date = new Date(start.getTime() + new_diff);
  return date;
}
