const adminAuth = async (req, res, next) => {
  if (req.userRole === 'administrator') { 
    next();
  } else {
    return res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = adminAuth;
