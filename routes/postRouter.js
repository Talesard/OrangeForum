const express = require("express");
const postController = require("../controllers/postController.js");
const postRouter = express.Router();
 
postRouter.get("/:thread_id", postController.getPostsList);
postRouter.post("/:thread_id", postController.postPost);
 
module.exports = postRouter;