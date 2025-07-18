exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure it's not null or incorrect
    req.user = decoded; // Should contain id, role, name
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
