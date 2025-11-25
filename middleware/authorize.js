// middleware/authorize.js
function authorize(allowedRoles = []) {
  return (req, res, next) => {
    const userRole = req.user.role; // role comes from JWT payload

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  };
}

module.exports = authorize;
