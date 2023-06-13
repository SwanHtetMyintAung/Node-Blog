const handleCustomErrors = (req, res, next) => {
    const url = req.url;
    let errorMessage = '';
  
    if (url.includes('/user/')) {
      errorMessage = 'User not found';
    } else if (url.includes('/blog/')) {
      errorMessage = 'Blog not available';
    } else {
      errorMessage = 'Page not found';
    }
  
    if (errorMessage != "") {
      res.status(404).render('404', { message: errorMessage , title : '404' });
    }
  };
  module.exports = handleCustomErrors;