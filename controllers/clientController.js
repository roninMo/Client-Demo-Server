const express = require("express");
const router = express.Router();
const sqlc = require("../db");
const vs = require("../middleware/validateSession");

/****************************
 * Clients
 ****************************/
// Get all Clients
router.get(
  "/all",
  /*vs,*/ (req, res) => {
    const query = `SELECT * FROM Clients`;

    sqlc().query(query, (err, rows, fields) => {
      if (err) {
        res
          .status(500)
          .send({ message: "error querying all clients", error: err });
        return;
      }
      res.status(200).json({ message: "Passing all clients", clients: rows });
    });
  }
);

// Get Client by id
router.get(
  "/:id",
  /*vs,*/ (req, res) => {
    const query = `SELECT * FROM Clients WHERE id=?`;

    sqlc().query(query, [req.params.id], (err, rows, fields) => {
      if (err) {
        res
          .status(500)
          .send({ message: "error querying all clients", error: err });
      } else {
        if (rows)
          res.status(200).json({
            message: `Passing client with id of ${req.params.id}`,
            client: rows,
          });
        else
          res.status(204).json({ message: "No users were found with that id" });
      }
    });
  }
);

// Create a Client
router.post(
  "/create",
  /* vs, */ (req, res) => {
    const query = `INSERT INTO Clients (firstName, lastName) VALUES (?, ?)`;

    sqlc().query(
      query,
      [req.body.firstName, req.body.lastName],
      (err, results, fields) => {
        if (err) {
          res
            .status(500)
            .json({ message: `Error creating client`, error: err });
        } else {
          res.status(200).json({
            message: "Successfully created client",
            client: {
              id: results.insertId,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            },
          });
        }
      }
    );
  }
);

// Update a client
router.put(
  "/:id",
  /* vs, */ (req, res) => {
    let query = `UPDATE Clients SET `;
    let insertedValues = [];

    let bodyParams = [`firstName`, `lastName`];
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
        res.status(500).json({ message: "Error updating client" });
      } else {
        res.status(200).json({
          message: `Successfully updated client with an id of ${req.params.id}`,
          results: results,
        });
      }
    });
  }
);

// Delete a Client
router.delete(
  "/:id",
  /* vs, */ (req, res) => {
    const query = `DELETE FROM Clients WHERE id=?`;

    sqlc().query(query, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error deleting user" });
      } else {
        res
          .status(200)
          .json({ message: "Successfully deleted user", results: results });
      }
    });
  }
);

/****************************
 * Client Information
 ****************************/
// Client information by id
router.get(
  "/information/:id",
  /* vs, */ (req, res) => {
    const query = `SELECT * FROM ClientInformation WHERE clientId=?`;

    sqlc().query(query, [req.params.id], (err, rows, fields) => {
      if (err) {
        res
          .status(500)
          .json({ message: "error querying client information", error: err });
      } else {
        res.status(200).json({
          message: "successfully queried client's information",
          clientInformation: rows,
        });
      }
    });
  }
);

// Create Client Information
router.post(
  "/information/create/:id",
  /* vs, */ (req, res) => {
    const query = `INSERT INTO ClientInformation (address, city, state, zip, clientId) VALUES (?, ?, ?, ?, ?)`;

    sqlc().query(
      query,
      [
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.zip,
        req.params.id,
      ],
      (err, results, fields) => {
        if (err) {
          res
            .status(500)
            .json({ message: `Error creating client`, error: err });
        } else {
          res.status(200).json({
            message: "Successfully created client information",
            clientInformation: {
              id: results.insertId,
              address: req.body.address,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              clientId: req.params.id,
            },
          });
        }
      }
    );
  }
);

// Update Client Information
router.put(
  "/information/:id",
  /* vs, */ (req, res) => {
    const query = `UPDATE ClientInformation SET `;
    let insertedValues = [];

    let bodyParams = [`address`, `city`, `state`, `zip`];
    for (let i = 0; i < 4; i++) {
      if (req.body[bodyParams[i]]) {
        insertedValues.push(req.body[bodyParams[i]]);
        query += `${bodyParams[i]}=?, `;
      }
    }
    query = query.substr(0, query.length - 2) + ` WHERE clientId=?`;
    insertedValues.push(req.params.id);

    sqlc().query(query, insertedValues, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error updating client information" });
      } else {
        res.status(200).json({
          message: `Successfully updated client's information`,
          results: results,
        });
      }
    });
  }
);

// Delete Client Information
router.delete(
  "/information/:id",
  /* vs */ (req, res) => {
    const query = `DELETE FROM ClientInformation WHERE clientId=?`;

    sqlc().query(query, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error deleting client information" });
      } else {
        res.status(200).json({
          message: `Successfully deleted client's information`,
          results: results,
        });
      }
    });
  }
);

/****************************
 * Client Notes
 ****************************/
// Get Client's Notes
router.get(
  "/notes/:id",
  /* vs */ (req, res) => {
    const query = `SELECT * FROM ClientNotes WHERE clientId=?`;

    sqlc().query(query, [req.params.id], (err, rows, fields) => {
      if (err) {
        res.status(500).json({ message: "Error querying client's notes" });
      } else {
        res.status(200).json({
          message: "Successfully queried client's notes",
          clientNotes: rows,
        });
      }
    });
  }
);

// Create Client Notes
router.post(
  "/notes/create/:id",
  /* vs */ (req, res) => {
    const query = `INSERT INTO ClientNotes (description, clientId) VALUES (?, ?)`;

    sqlc().query(
      query,
      [req.body.description, req.params.id],
      (err, results, fields) => {
        if (err) {
          res
            .status(500)
            .json({ message: `Error creating client`, error: err });
        } else {
          res.status(200).json({
            message: `Successfully created client notes`,
            clientNotes: {
              id: results.insertId,
              description: req.body.description,
              clientId: req.params.id,
            },
          });
        }
      }
    );
  }
);

// Update Client Notes
router.put(
  "/notes/:id",
  /* vs */ (req, res) => {
    const query = `UPDATE ClientNotes SET description=? WHERE clientId=?`;

    sqlc().query(
      query,
      [req.body.description, req.params.id],
      (err, results) => {
        if (err) {
          res.status(500).json({ message: "Error updating client notes" });
        } else {
          res.status(200).json({
            message: `Successfully updated client's notes`,
            results: results,
          });
        }
      }
    );
  }
);

// Delete Client Notes
router.delete(
  "/notes/:id",
  /* vs */ (req, res) => {
    const query = `DELETE FROM ClientNotes WHERE clientId=?`;

    sqlc.query(query, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error deleting client notes" });
      } else {
        res.status(200).json({
          message: "Successfully deleted client notes",
          results: results,
        });
      }
    });
  }
);

/* Important Todo */
/* Get Client Search, not an exact search, from multiple different tables. 
ie Search for Mark in Clients, Companies, Business Book, Mailing list, and Commission reports, maybe this get's it's own controller */
/* Store all clients in database, show boolean to show/hide clients from database rather than deleting them */

module.exports = router;
