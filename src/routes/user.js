const router = require('express').Router();

const { authorize } = require('../middlewares/isAuth');

const { getUser, getUsers } = require('../controllers/user');

router.get('/:userId', getUser);

router.get('/', authorize(['admin']), getUsers);

module.exports = router;