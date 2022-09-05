const express = require('express');
const postController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.get('/register');
authRouter.post('/register');
authRouter.get('/login', postController.getLogin);
authRouter.post('/login', postController.postLogin);

module.exports = authRouter;
