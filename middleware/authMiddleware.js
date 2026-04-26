const jwt = require('jsonwebtoken');

/* 🔐 Protect Route (Check Login) */
exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //  Check header exists and format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, access denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // : Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // : Attach user to request
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/*  Admin Only Middleware */
exports.adminOnly = (req, res, next) => {
  // Extra safety check
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }

  next();
};