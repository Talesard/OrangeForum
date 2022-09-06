const express = require('express');
const reportController = require('../controllers/reportController');
const { basicAuth } = require('../middleware/basicAuth');

const reportRouter = express.Router();

reportRouter.get('/', reportController.getReportsList);
reportRouter.post('/', reportController.postReport);
reportRouter.delete('/', basicAuth, reportController.deleteReport);

module.exports = reportRouter;
