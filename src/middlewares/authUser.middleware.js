const { verifyToken } = require('../utils/JWT');

const authUser = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const { type, message } = verifyToken(authorization);

  if (type) return res.status(type).json({ message });
  req.user = { ...message };
  next(); 
};

module.exports = authUser;