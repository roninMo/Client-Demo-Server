const express = require("express");
const router = express.Router();
const sqlc = require("../db");
const vs = require("../middleware/validateSession");

// Get all Companies
router.get(
  "/all",
  /*vs,*/ (req, res) => {
    const query = `SELECT * FROM Company`;

    sqlc().query(query, (err, rows, fields) => {
      if (err) res.status(500).json({ message: "Error querying companies" });
      else
        res
          .status(200)
          .json({ message: "success querying companies", companies: rows });
    });
  }
);

// Get a company by id
router.get(
  "/:id",
  /*vs,*/ (req, res) => {
    const query = `SELECT * FROM Company WHERE clientId=?`;

    sqlc().query(query, [req.params.id], (err, rows, fields) => {
      if (err)
        res.status(500).json({ message: "Error querying client's companies" });
      else
        res
          .status(200)
          .json({ message: "success querying companies", companies: rows });
    });
  }
);

// Create Company
router.post(
  "/create/:id",
  /*vs,*/ (req, res) => {
    const query = `INSERT INTO Company (name, type, prem, mode, payment, appDate, effectDate, policy, clientId)`;

    sqlc.query(
      query,
      [
        req.body.name,
        req.body.type,
        req.body.prem,
        req.body.mode,
        req.body.payment,
        req.body.appDate,
        req.body.effectDate,
        req.body.policy,
        req.params.id,
      ],
      (err, results) => {
        if (err) res.status(500).json({ message: "error inserting company" });
        else
          res.status(200).json({
            message: "successfully inserted company",
            company: {
              id: results.insertId,
              name: req.body.name,
              type: req.body.type,
              prem: req.body.prem,
              mode: req.body.mode,
              payment: req.body.payment,
              appDate: req.body.appDate,
              effectDate: req.body.effectDate,
              policy: req.body.policy,
              clientId: req.params.id,
            },
          });
      }
    );
  }
);

// Update Company
router.put(
  "/:id",
  /*vs,*/ (req, res) => {
    let query = `UPDATE Company SET `;
    let insertedValues = [];

    let bodyParams = [
      `name`,
      `type`,
      `prem`,
      `mode`,
      `payment`,
      `appDate`,
      `effectDate`,
      `policy`,
    ];
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
        res.status(500).json({ message: "Error updating company" });
      } else {
        res.status(200).json({
          message: `Successfully updated company with an clientId of ${req.params.id}`,
          results: results,
        });
      }
    });
  }
);

// Delete Company
router.delete(
  "/:id",
  /*vs,*/ (req, res) => {
    const query = `DELETE FROM Company WHERE clientId=?`;

    sqlc.query(query, [req.params.id], (err, results) => {
      if (err) res.status(500).json({ message: "Error deleting company" });
      else
        res
          .status(200)
          .json({ message: "Successfully deleted company", results: results });
    });
  }
);

module.exports = router;
