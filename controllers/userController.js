// Dont forget to use bcrypt, all the other controllers will use Validate session before their req, res arrow function for authentication, but we need this one to encrypt the password. Also connection.end when you're logging out (;
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const sqlc = require("../db");


/************************* 
 * Create Account
*************************/
router.post("/create", (req, res) => {
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10); //  passwordhash: bcrypt.hashSync(password, 10)
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  // Check if username is already taken
  const checkQuery = `SELECT * FROM Users WHERE Email=?`;
  const rowsCheck; 
  sqlc.query(checkQuery, [email], (err, rows, fields) => {
    if (err) {
      res
        .status(500)
        .json({ message: "failed to query for users", error: err });
      return;
    }
    rowsCheck = rows;
  });

  // Query the data into the db
  if (!rowsCheck) { // If query is empty, no user named that already, then create it
    const createQuery = `INSERT INTO Users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)`;
    sqlc().query(
      createQuery,
      [email, password, firstName, lastName],
      (err, results, fields) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Failed to insert new query", error: err });
          return;
        }
  
        console.log(`Entered a new user with an id of ` + results.InsertId);
        res.end();
      }
    );
  } else {
    res.status(418).json({message: "User with that name has already been created", alreadyUser: true});
  }
});


/************************* 
 * Login to Account
*************************/
router.get("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = `SELECT * FROM Users WHERE Email=?`;

  sqlc().query(query, [email], (err, rows, fields) => {
    if (err) {
      res
        .status(403)
        .json({ message: "no user with that name in the db", error: err });
      return;
    }

    console.log(`This is the returned data`, rows);
    bcrypt.compare(password, rows[0].password, function (err, matches) {
      if (matches) {
        let token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        res.json({
          message: "Successfully authenticated",
          user: rows[0],
          sessionToken: token,
        });
      } else res.status(403).json({ message: "Authentication failed, password does not match", error: err });
    });
    res.end();
  });
});

module.exports = router;
