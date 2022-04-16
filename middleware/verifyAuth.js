const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (req.cookies.auth) {
    jwt.verify(
      req.cookies.auth,
      process.env.SECRET_KEY,
      (error, decodedToken) => {
        if (error) res.status(403).json("Token invalid");
        else {
          req.user = decodedToken;
          next();
        }
      }
    );
  } else return res.status(401).json("You are not authenticated");
};

const verifyAuthorisation = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id._id === req.params.id || req.user.id.isAdmin) next();
    else res.status(403).json("You are not allowed to do that");
  });
};

const verifyIsAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id.isAdmin) next();
    else res.status(403).json("You are not allowed to do that");
  });
};

module.exports = { verifyToken, verifyAuthorisation, verifyIsAdmin };
