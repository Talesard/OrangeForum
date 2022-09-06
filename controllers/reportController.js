const Report = require('../models/report');
const Post = require('../models/post');

exports.getReportsList = async (request, response) => {
  let reportsList;
  try {
    reportsList = await Report.find({}).sort({ date: 1 });
  } catch (error) {
    console.log(error);
    response.status(404).render('error', { error_code: 404, error_message: 'Ошибка получения списка репортов.' });
    return;
  }
  response.render('reportView', { reports: reportsList });
};

exports.postReport = async (request, response) => {
  const { threadId, postId, reason } = request.body;
  if (threadId === '' || postId === '' || reason === '') { response.json({ status: 'fail' }); return; }
  const report = new Report({ thread_id: threadId, post_id: postId, reason });
  try {
    await report.save();
  } catch (error) {
    console.log(`error save report: ${error}`);
  }
  response.json({ status: 'ok' });
};

exports.deleteReport = async (request, response) => {
  const { reportId, postId, verdict } = request.body;
  if (postId === '' || verdict === '') { response.json({ status: 'fail' }); return; }
  if (verdict === 'delete') {
    try {
      await Post.findByIdAndDelete(postId);
      await Report.findByIdAndDelete(reportId);
    } catch (error) {
      console.log(`error delete reported post: ${error}`);
    }
  } else if (verdict === 'pass') {
    try {
      await Report.findByIdAndDelete(reportId);
    } catch (error) {
      console.log(`error pass reported post: ${error}`);
    }
  }
  response.json({ status: 'ok' });
};
