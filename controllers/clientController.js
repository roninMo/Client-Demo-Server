const express = require("express");
const router = express.Router();
const connection = require("../db");
const validateSession = require("../middleware/validateSession");
const sqlc = require("../db");

/*********************************
 * ROUTES
 *********************************/

// Get all clients
router.get(
  "/all",
  /*validateSession,*/ (req, res) => {
    const query = `SELECT * FROM Client`;

    sqlc().query(query, (err, rows, fields) => {
      if (err) console.log(`Failed to query for users`, err);
      res.json(rows);
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
      if (err) console.log(`Failed to query for users`, err);
      res.json(rows);
    });
  }
);

module.exports = router;
