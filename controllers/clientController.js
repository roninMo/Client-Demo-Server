const express = require("express");
const router = express.Router();
const sqlc = require("../db");
const validateSession = require("../middleware/validateSession");

/*********************************
 * ROUTES
 *********************************/

// Get all clients
router.get(
  "/all",
  /*validateSession,*/ (req, res) => {
    const query = `SELECT * FROM Client`;

    sqlc().query(query, (err, rows, fields) => {
      if (err) {
        console.log(`clientController/all:: Failed to query for clients`, err);
        res
          .status(500)
          .send({ message: "error querying all clients", error: err });
        return;
      }
      res.status(200).json({ message: "Passing all clients", clients: rows });
    });
  }
);

// Get a client by id
router.get(
  "/:id",
  /*validateSession,*/ (req, res) => {
    const userId = req.params.id;
    const query = `SELECT * FROM Client WHERE id=?`;
    sqlc().query(query, [userId], (err, rows, fields) => {
      if (err) {
        console.log(`clientController/all:: Failed to query for a client`, err);
        res
          .status(500)
          .send({ message: "error querying all clients", error: err });
        return;
      }

      if (rows)
        res.status(200).json({
          message: `Passing client with id of ${userId}`,
          client: rows,
        });
      else
        res.status(204).json({ message: "No users were found with that id" });
    });
  }
);

/* Psuedo Todo Codarino */
/* Update a client */
/* Delete a client */
/* Store all clients in database, show boolean to show/hide clients from database rather than deleting them */
/* Get Client Search, not an exact search, from multiple different tables. 
  ie Search for Mark in Clients, Companies, Business Book, Mailing list, and Commission reports */

module.exports = router;
