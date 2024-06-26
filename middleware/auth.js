const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).send({ message: "Not Authorized", error: err });
        } else {
          next();
        }
      });
    } else {
      res.status(401).redirect("/");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send(error);
  }
};
exports.resetAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).send({ message: "Not Authorized", error: err });
        } else {
          next();
        }
      });
    } else {
      res
        .status(401)
        .send("<h1>This link is expired , do try again  , try again </h1> ");

      // location.assign('/')
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send(error);
  }
};
