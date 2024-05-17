const router = require('express').Router();

const { authorize } = require('../middlewares/isAuth');

const { getUser, getUsers, chargeCoins } = require('../controllers/user');

router.post('/charge', authorize(['admin', 'user']), chargeCoins);

router.get('/:userId', authorize(['admin', 'user']), getUser);

router.get('/', authorize(['admin', 'user']), getUsers);

module.exports = router;