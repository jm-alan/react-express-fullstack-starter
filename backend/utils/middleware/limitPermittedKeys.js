module.exports = (...validKeys) => (req, res, next) => {
  if (Object.keys(req.body) > validKeys.length) {
    return res.sendStatus(400);
  }

  for (const key in req.body) {
    if (!validKeys.includes(key)) {
      delete req.body[key];
    }
  }
  next();
};
