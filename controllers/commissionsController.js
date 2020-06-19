const express = require("express");
const router = express.Router();
const sqlc = require("../db");
const vs = require("../middleware/validateSession");

/***************************
 * Commission Reports
 ***************************/
router.get(
  "/reports/all",
  /*vs,*/ (req, res) => {
    const query = `SELECT * FROM CommReport`;

    sqlc().query(query, (err, rows, fields) => {
      if (err) res.status(500).json({ message: "Error querying CommReports" });
      else
        res.status(200).json({
          message: "Successfully queried CommReports",
          CommReports: rows,
        });
    });
  }
);

// Get a specific company's commission reports
router.get(
  "/reports/:id",
  /*vs,*/ (req, res) => {
    const query = `SELECT * FROM CommReport WHERE companyId=?`;

    sqlc().query(query, [req.params.id], (err, rows, fields) => {
      if (err) res.status(500).json({ message: "Error querying CommReports" });
      else
        res.status(200).json({
          message: "Successfully queried CommReports",
          CommReports: rows,
        });
    });
  }
);

// Create a Commission Report
router.post(
  "/reports/create",
  /*vs,*/ (req, res) => {
    const query = `INSERT INTO CommReport (jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, total, companyId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    sqlc().query(
      query,
      [
        req.body.jan,
        req.body.feb,
        req.body.mar,
        req.body.apr,
        req.body.may,
        req.body.jun,
        req.body.jul,
        req.body.aug,
        req.body.sep,
        req.body.oct,
        req.body.nov,
        req.body.dec,
        req.body.total,
        req.body.companyId,
      ],
      (err, results) => {
        if (err) res.status(500).json({ message: "Error creating CommReport" });
        else
          res.status(200).json({
            message: "Successfully Created CommReport",
            commReport: {
              id: results.insertId,
              jan: req.body.jan,
              feb: req.body.feb,
              mar: req.body.mar,
              apr: req.body.apr,
              may: req.body.may,
              jun: req.body.jun,
              jul: req.body.jul,
              aug: req.body.aug,
              sep: req.body.sep,
              oct: req.body.oct,
              nov: req.body.nov,
              dec: req.body.dec,
              total: req.body.total,
              companyId: req.body.companyId,
            },
          });
      }
    );
  }
);

// Update Commission Report
router.put(
  "/report/:id",
  /*vs,*/ (req, res) => {
    let query = `UPDATE CommReport SET `;
    let insertedValues = [];

    let bodyParams = [
      `jan`,
      `feb`,
      `mar`,
      `apr`,
      `may`,
      `jun`,
      `jul`,
      `aug`,
      `sep`,
      `oct`,
      `nov`,
      `dec`,
      `total`,
      `companyId`,
    ];
    for (let i = 0; i < 4; i++) {
      if (req.body[bodyParams[i]]) {
        insertedValues.push(req.body[bodyParams[i]]);
        query += `${bodyParams[i]}=?, `;
      }
    }
    query = query.substr(0, query.length - 2) + ` WHERE id=?`;
    insertedValues.push(req.params.id);

    sqlc().query(query, insertedValues, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error updating commission report" });
      } else {
        res.status(200).json({
          message: `Successfully updated Commission report`,
          results: results,
        });
      }
    });
  }
);

// Delete a Commission Report
router.delete(
  "report/:id",
  /*vs,*/ (req, res) => {
    let query = `DELETE FROM CommReport WHERE id=?`;

    sqlc().query(query, [req.params.id], (err, results) => {
      if (err)
        res.status(500).json({ message: "Error deleting commission report" });
      else
        res.status(200).json({
          message: "Successfully deleted commission report",
          results: results,
        });
    });
  }
);

/***************************
 * Commission by Company
 ***************************/
router.get(
  "/byCompany/all",
  /*vs,*/ (req, res) => {
    const query = `SELECT * FROM CommByCompany`;

    sqlc().query(query, (err, rows, fields) => {
      if (err) res.status(500).json({ message: "Error querying Commissions" });
      else
        res.status(200).json({
          message: "Successfully queried Commissions",
          Commissions: rows,
        });
    });
  }
);

// Get a specific client's commissions
router.get(
  "/byCompany/:id",
  /*vs,*/ (req, res) => {
    const query = `SELECT * FROM CommByCompany WHERE clientId=?`;

    sqlc().query(query, [req.params.id], (err, rows, fields) => {
      if (err) res.status(500).json({ message: "Error querying Commissions" });
      else
        res.status(200).json({
          message: "Successfully queried Commissions",
          Commissions: rows,
        });
    });
  }
);

// Create a Commission
router.post(
  "/byCompany/create",
  /*vs,*/ (req, res) => {
    const query = `INSERT INTO CommByCompany (commissionId, effectDate, type, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, clientId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    sqlc().query(
      query,
      [
        req.body.commissionId,
        req.body.effectDate,
        req.body.type,
        req.body.jan,
        req.body.feb,
        req.body.mar,
        req.body.apr,
        req.body.may,
        req.body.jun,
        req.body.jul,
        req.body.aug,
        req.body.sep,
        req.body.oct,
        req.body.nov,
        req.body.dec,
        req.body.clientId,
      ],
      (err, results) => {
        if (err) res.status(500).json({ message: "Error creating Commission" });
        else
          res.status(200).json({
            message: "Successfully Created Commission",
            commReport: {
              id: results.insertId,
              commissionId: req.body.commissionId,
              effectDate: req.body.effectDate,
              type: req.body.type,
              jan: req.body.jan,
              feb: req.body.feb,
              mar: req.body.mar,
              apr: req.body.apr,
              may: req.body.may,
              jun: req.body.jun,
              jul: req.body.jul,
              aug: req.body.aug,
              sep: req.body.sep,
              oct: req.body.oct,
              nov: req.body.nov,
              dec: req.body.dec,
              clientId: req.body.clientId,
            },
          });
      }
    );
  }
);

// Update Commission Report
router.put(
  "/byCompany/:id",
  /*vs,*/ (req, res) => {
    let query = `UPDATE CommByCompany SET `;
    let insertedValues = [];

    let bodyParams = [
      `commissionId`,
      `effectDate`,
      `type`,
      `jan`,
      `feb`,
      `mar`,
      `apr`,
      `may`,
      `jun`,
      `jul`,
      `aug`,
      `sep`,
      `oct`,
      `nov`,
      `dec`,
      `clientId`,
    ];
    for (let i = 0; i < 4; i++) {
      if (req.body[bodyParams[i]]) {
        insertedValues.push(req.body[bodyParams[i]]);
        query += `${bodyParams[i]}=?, `;
      }
    }
    query = query.substr(0, query.length - 2) + `clientId  WHERE id=?`;
    insertedValues.push(req.params.id);

    sqlc().query(query, insertedValues, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error updating commission" });
      } else {
        res.status(200).json({
          message: `Successfully updated Commission`,
          results: results,
        });
      }
    });
  }
);

// Delete a Commission Report
router.delete(
  "byCompany/:id",
  /*vs,*/ (req, res) => {
    let query = `DELETE FROM CommReport WHERE id=?`;

    sqlc().query(query, [req.params.id], (err, results) => {
      if (err)
        res.status(500).json({ message: "Error deleting commission report" });
      else
        res.status(200).json({
          message: "Successfully deleted commission report",
          results: results,
        });
    });
  }
);

module.exports = router;
