const express = require('express');
const threadController = require('../controllers/threadController');

const threadRouter = express.Router();

threadRouter.get('/:board', threadController.getThreadsList);
threadRouter.post('/:board', threadController.postThread);

module.exports = threadRouter;
