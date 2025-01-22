const passport = require('passport');

const isAdmin = (req, res, next) => {
    // Check if the user has the 'admin' role
    if (req.user && req.user.role === 'admin') {
      return next(); // Allow access to the route
    }
    
    // If the user is not an admin, send a 403 Forbidden response
    return res.status(403).json({ message: "Access denied: Admins only" });
  };
  
  module.exports = isAdmin;
  