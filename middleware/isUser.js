const passport = require('passport');
const isUser = (req, res, next) => {
    // Check if the user has the 'admin' role
    if (req.user && req.user.role === 'user') {
      return next(); // Allow access to the route
    }
    
    // If the user is not an admin, send a 403 Forbidden response
    return res.status(403).json({ message: "Access denied: users only" });
  };
  
  module.exports = isUser;