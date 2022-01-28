const router = require('express').Router();
const verify = require('../controllers/verifyToken');
const verifyAdmin = require('../controllers/verifyAdminToken');
const articleController = require('../controllers/articleController');
const upload = require('../controllers/upload');

// creating an article
router.post(
  '/create',
  verifyAdmin,
  upload.single('article-image'),
  articleController.create_article
);

// updating an article
router.put('/update/:id', verifyAdmin, articleController.update_article);

// deleting an article
router.delete('/delete/:id', verifyAdmin, articleController.delete_article);

// getting all articles
router.get('/', articleController.gett_all_article);

// getting single article
router.get('/:id', articleController.get_single_article);

// commenting on an article
router.post('/comment/:id', verify, articleController.comment_article);

module.exports = router;
