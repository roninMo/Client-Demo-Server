const jwt = require("jsonwebtoken");
const sqlc = require("../db");

module.exports = (req, res, next) => {
  if (req.methods === "OPTIONS") next();
  else {
    const sessionToken = req.headers.authorization;
    console.log(`validateSession:: This is the request token -`, sessionToken);

    // If no token is present, then 403 forbidden is returned
    if (!sessionToken)
      res.status(403).send({ auth: false, message: "No token provided" });
    else {
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded) {
          const userCheckQuery = `SELECT * FROM Users WHERE id=?`;
          sqlc().query(
            userCheckQuery,
            [req.params.userId],
            (err, rows, fields) => {
              if (err) {
                console.log(
                  `validateSession:: (not authorized) failed to query token for specific user, id: `,
                  req.params.userId
                );
                res.status(401).send({ error: "Not Authorized" });
                return;
              }
              req.user = rows;
              next();
            }
          );
        } else {
          res.status(400).send({ error: "Not decoded" });
        }
      });
    }
  }
};
