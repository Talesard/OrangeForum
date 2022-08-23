const express = require('express');
const reportController = require('../controllers/reportController');

const reportRouter = express.Router();

const jsonParser = express.json();

reportRouter.get('/', reportController.getReportsList);
reportRouter.post('/', reportController.postReport);
reportRouter.delete('/', ()=>{});

module.exports = reportRouter;