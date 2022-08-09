const express = require("express");
const threadController = require("../controllers/threadController.js");
const threadRouter = express.Router();
 
threadRouter.get("/", threadController.getThreadsList);
threadRouter.post("/", threadController.postThread);
 
module.exports = threadRouter;