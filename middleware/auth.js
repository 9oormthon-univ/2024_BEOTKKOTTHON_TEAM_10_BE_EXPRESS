const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.accesstoken;
  if (!token) {
    return res.status(403).json({ message: 'NoToken' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'TokenFail' });
    }
    req.headers.userid = decoded.userid;
    next();
  });
}

module.exports = { verifyToken };
