const router = require('express').Router();

const { authorize } = require('../middlewares/isAuth');

const { getUser, getUsers } = require('../controllers/user');
const { chargeCoins } = require('../controllers/chargeCoins');

router.get('/:userId', getUser);

router.get('/', authorize(['admin']), getUsers);

router.post('/charge', authorize(['user', 'admin']), chargeCoins);

module.exports = router;