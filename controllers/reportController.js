const Report = require('../models/report');

exports.getReportsList = async (request, response) => {
    let reportsList;
    try {
        reportsList = await Report.find({}).sort({date: 1});
    } catch(error) {
        console.log(error);
        response.status(404).render('error', {error_code: 404, error_message: 'Ошибка получения списка репортов.'});
        return;
    }
    response.render('reportView', {reports: reportsList});
};

exports.postReport = async (request, response) => {
    const { threadId, postId, reason } = request.body;
    if (threadId === '' || postId === '' || reason === '') {response.status(404).render('error', {error_code: 404, error_message: 'Репорт не прошел валидацию'}); return;}
    const report = new Report({thread_id: threadId, post_id: postId, reason: reason});
    try {
      await report.save();
    } catch(error) {
      console.log(`error save report: ${error}`);
    }
    response.redirect('/reports');
};

exports.deleteReport = async (request, response) => {

};
