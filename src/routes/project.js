const router = require('express').Router();

const multerConfig = require("../configurations/image");

const { authorize } = require('../middlewares/isAuth');

const { add, getByUser, search, getAll, like, comment, getOne, deleteProject } = require('../controllers/project');

router.post('/', authorize(['user', 'admin']), multerConfig.postImage.single('image'), add);

router.get('/search', authorize(['user', 'admin']), search);

router.get('/:userId', authorize(['user', 'admin']), getByUser);

router.get('/', authorize(['user', 'admin']), getAll);

router.post('/like', authorize(['user', 'admin']), like);

router.post('/comment', authorize(['user', 'admin']), comment);

router.get('/get/:id', authorize(['user', 'admin']), getOne);

router.delete('/delete/:id', authorize(['user', 'admin']), deleteProject);


module.exports = router;