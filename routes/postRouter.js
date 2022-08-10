const express = require('express');
const postController = require('../controllers/postController');

const postRouter = express.Router();

postRouter.get('/:threadId', postController.getPostsList);
postRouter.post('/:threadId', postController.postPost);

module.exports = postRouter;
