module.exports = (...exclusions) => (req, _res, next) => {
  for (const key in req.body) {
    if (!exclusions.includes(key) && !req.body[key]) {
      delete req.body[key];
    }
  }
  next();
};
