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

    // ONTO QUERYING THE DATA
    //* 0-437 clients within the database *//
    // QUERYING NOTES, COMPANIES, COMMISSIONS BELOW
    let clientNotesInsert = [];
    let companiesInsert = [
      "Tri Health",
      "Insure Choices",
      "Geico",
      "Progressive",
      "State Farm",
      "Panda Express",
      "Autozone",
      "Chipotle",
      "Insurance Company A",
      "Insurance Company B",
      "Insurance Company C",
      "Insurance Company D",
    ];
    let commissionsInsert = [];

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

    // ClientNotes data
    for (let i = 0; i < 437; i++) {
      clientNotesAmount = Math.floor(Math.random() * 6);
      commissionsAmount = Math.floor(Math.random() * 5 + 1);

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
          randomTime(new Date("4-10-2004 10:30"), new Date("9-23-2010 02:10")),
          randomTime(new Date("4-10-2010 10:30"), new Date("9-23-2020 02:10")),
          sampleTypes[Math.floor(Math.random() * 5)],
          `Policy # ${(i * 10000) % 100}`,
          i * 10,
          i * 20,
          i * 30,
          i * 40,
          i * 50,
          i * 60,
          i * 70,
          i * 80,
          i * 90,
          i * 100,
          i * 110,
          i * 120,
          // let months = parseFloat((Math.random() * 100).toFixed(4));
          sampleCommNotes[Math.floor(Math.random() * 10)],
          i,
          Math.floor(Math.random() * 12),
        ];
        commissionsInsert.push(commission);
      }
    }

    console.log(`Finished creating the sample data!`);
    // console.log(`Client Notes`, clientNotesInsert);
    // console.log(`Commissions`, commissionsInsert);

    // Query the Client data
    const createQuery = `INSERT INTO Clients (lastName, firstName, address, city, state, zip) VALUES ?`;
    sqlc().query(createQuery, [csvData], (err, results, fields) => {
      if (err) console.log(`Error inserting csv data`, err);
      else
        console.log(
          `Successfully queried csv data, here are the results`,
          results
        );
    });

    // Query the ClientNotes data
    const notesQuery = `INSERT INTO ClientNotes (client_id, title, description) VALUES ?`;
    sqlc().query(notesQuery, [clientNotesInsert], (err, results, fields) => {
      if (err) console.log(`Error inserting clientNotes data`, err);
      else
        console.log(
          `Successfully queried clientNotes, here are the results`,
          results
        );
    });

    // Query the Companies data
    const companiesData = `INSERT INTO Companies (name) VALUES ?`;
    sqlc().query(companiesData, [companiesInsert], (err, results, fields) => {
      if (err) console.log(`Error inserting companies`, err);
      else
        console.log(
          `Successfully queried companies, here are the results`,
          results
        );
    });

    // Query the Commissions data
    const commissionsData = `INSERT INTO Commissions (appDate, effectDate, type, policy, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, notes, clientId, companyId)`;
    sqlc().query(
      commissionsData,
      [commissionsInsert],
      (err, results, fields) => {
        if (err) console.log(`Error inserting commissions`);
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
