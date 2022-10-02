module.exports = (req, res, next) => {
  if (req.user) {
    return next();
  }

  // if a user attempts to access a restricted route, prefer feigning
  // ignorance to discourage brute force attacks
  res.sendStatus(404);
};
