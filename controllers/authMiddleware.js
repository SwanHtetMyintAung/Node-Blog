const authMiddleware = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      // User is not logged in, redirect to the login page
      res.redirect('/user/login');
    }
  };
  
  module.exports = authMiddleware;
  