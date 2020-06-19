// Don't forget to connection.end() for when a user signs out
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const sqlc = require("../db");
const e = require("express");

/*************************
 * Create Account
 *************************/
router.post("/create", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = bcrypt.hashSync(
    req.body.password,
    parseInt(process.env.HASH_ITERATIONS, 10)
  );

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

      const token = jwt.sign({ id: results.insertId }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      const user = {
        id: results.insertId,
        email: email,
        password: req.body.password,
        passwordHash: password,
        firstName: firstName,
        lastName: lastName,
      };
      console.log(
        `userController/create:: Creating new user query, OK, data(user, token):`,
        user,
        token
      );
      res.status(200).json({
        message: "Created new user",
        user: user,
        sessionToken: token,
      });
    }
  );
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
      res.status(500).json({
        message: "error querying the request",
        error: err,
      });
      return;
    }

    if (rows) {
      console.log(`userController/login:: This is the returned data`, rows);
      bcrypt.compare(password, rows[0].password, function (err, matches) {
        if (matches) {
          let token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
          });
          res.status(200).json({
            message: "Successfully authenticated",
            user: rows[0],
            sessionToken: token,
          });
        } else res.status(403).json({ message: "Authentication failed, password does not match", error: err });
      });
    } else {
      console.log(`userController/login:: There were no users with that Email`);
      res.status(204).json({ message: "No user with that email" });
    }
  });
});

/*****************************
 * Check for taken username
 *****************************/
router.get("/uniqueUsername", (req, res) => {
  const checkQuery = `SELECT * FROM Users WHERE email=?`;

  sqlc().query(checkQuery, [req.body.email], (err, rows, fields) => {
    if (err) {
      res.status(500).json({ message: "failed to query for user", error: err });
      return;
    } else {
      if (rows == [])
        res
          .status(200)
          .json({ message: "Username not taken", uniqueUsername: true });
      else
        res
          .status(200)
          .json({ message: "Username already taken", uniqueUsername: false });
    }
  });
});

/*************************
 * Get all accounts
 *************************/
router.get("/all", (req, res) => {
  const query = `SELECT * FROM Users`;

  sqlc().query(query, (err, rows, fields) => {
    if (err) {
      res.status(500).json({ message: "Error querying all users", error: err });
    } else {
      res.status(200).json({
        message: "Found all the users",
        users: rows,
      });
    }
  });
});

/*************************
 * Edit an account
 *************************/
router.put("/:id", (req, res) => {
  let query = `UPDATE Users SET `;
  let insertedValues = [];
  req.body.password = bcrypt.hashSync(
    req.body.password,
    parseInt(process.env.HASH_ITERATIONS, 10)
  );

  let bodyParams = [`email`, `password`, `firstName`, `lastName`];
  for (let i = 0; i < 4; i++) {
    if (req.body[bodyParams[i]]) {
      insertedValues.push(req.body[bodyParams[i]]);
      query += `${bodyParams[i]}=?, `;
    }
  }
  query = query.substr(0, query.length - 2) + ` WHERE id=?`;
  insertedValues.push(req.params.id);

  sqlc().query(query, insertedValues, (err, results, fields) => {
    if (err) {
      res.status(500).json({ message: "Error updating user" });
    } else {
      res
        .status(200)
        .json({
          message: `Successfully updated user with an id of ${req.params.id}`,
          results: results,
        });
    }
  });
});

/*************************
 * Delete an account
 *************************/
router.delete("/:id", (req, res) => {
  const query = `DELETE FROM Users WHERE id=?`;

  sqlc().query(query, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error deleting user" });
    } else {
      res
        .status(200)
        .json({ message: "Successfully deleted user", results: results });
    }
  });
});

module.exports = router;
