const router = require('express').Router();
const $ = require('express-async-handler');

const { User } = require('../../db/models');
const restoreUser = require('../../utils/auth/restoreUser');
const createSessionCookie = require('../../utils/auth/createSessionCookie');
const limitPermittedKeys = require('../../utils/middleware/limitPermittedKeys');

router.get('/', restoreUser, (req, res) => {
  const user = req.user && req.user.info;

  res.json({ user });
});

router.post(
  '/',
  limitPermittedKeys('email', 'password'),
  $(async (req, res) => {
    const user = (await User.LogIn(req.body)).info;
    createSessionCookie(res, user.id);
    res.json({ user });
  })
);

router.delete('/', (_req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

module.exports = router;
