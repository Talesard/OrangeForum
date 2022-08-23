const express = require('express');
const reportController = require('../controllers/reportController');

const reportRouter = express.Router();

reportRouter.get('/', reportController.getReportsList);
reportRouter.post('/', reportController.postReport);
reportRouter.delete('/', reportController.deleteReport);

module.exports = reportRouter;
