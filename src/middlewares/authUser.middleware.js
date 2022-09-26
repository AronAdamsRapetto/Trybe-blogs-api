const { verifyToken } = require('../utils/JWT');

const authUser = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const user = verifyToken(authorization);
  req.user = { ...user };
  next(); 
};

module.exports = authUser;