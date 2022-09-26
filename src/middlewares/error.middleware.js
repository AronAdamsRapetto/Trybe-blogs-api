const errorMiddleware = (err, _req, res, _next) => {
  if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
  }

  console.error('Middleware:', err);
  return res.status(500).json({ message: `Internal server error: ${err.message}` });
};

module.exports = errorMiddleware;