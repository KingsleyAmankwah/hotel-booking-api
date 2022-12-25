const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401);
    throw new Error("You are not authenticated!");
  }

  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error) {
      res.status(403);
      throw new Error("Token is not valid!");
    }

    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403);
      throw new Error("You are not authorized!");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403);
      throw new Error("You are not an authorized admin!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
