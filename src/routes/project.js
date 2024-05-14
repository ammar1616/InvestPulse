const router = require('express').Router();

const multerConfig = require("../configurations/image");

const { authorize } = require('../middlewares/isAuth');

const { add, getByUser, search, getAll, like, comment, getOne, deleteProject, status } = require('../controllers/project');

router.post('/', authorize(['user', 'admin']), multerConfig.postMedia.fields([{ name: 'image' }, { name: 'video' }]), add);

router.get('/status/:status', authorize(['user', 'admin']), status);

router.get('/search', authorize(['user', 'admin']), search);

router.delete('/delete/:id', authorize(['user', 'admin']), deleteProject);

router.get('/get/:id', authorize(['user', 'admin']), getOne);

router.get('/:userId', authorize(['user', 'admin']), getByUser);

router.get('/', authorize(['user', 'admin']), getAll);

router.post('/like', authorize(['user', 'admin']), like);

router.post('/comment', authorize(['user', 'admin']), comment);


module.exports = router;