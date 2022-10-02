const $ = require('express-async-handler');

const restoreUser = require('../../utils/auth/restoreUser');
const restoreOrReject = require('../../utils/auth/restoreOrReject');
const createSessionCookie = require('../../utils/auth/createSessionCookie');
const limitPermittedKeys = require('../../utils/middleware/limitPermittedKeys');
const { User } = require('../../db/models');

const router = require('express').Router();

router.post(
  '/',
  restoreUser,
  limitPermittedKeys('firstName', 'email', 'password'),
  $(async (req, res) => {
    const user = await User.SignUp(req.body);
    createSessionCookie(res, user.id);
    res.json({ user: user.info });
  })
);

router.patch(
  '/me',
  restoreOrReject,
  limitPermittedKeys('firstName', 'email', 'password'),
  $(async (req, res) => {
    const { user, body } = req;
    await user.update(body);
    res.json({ user: user.info });
  })
);

module.exports = router;
