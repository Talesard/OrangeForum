const Thread = require('../models/thread');

exports.getThreadsList = async (request, response) => {
  let threadsList;
  try {
    threadsList = await Thread.find({}).sort({ date: -1 });
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
  response.render('threadView', { threads: threadsList });
};

exports.postThread = async (request, response) => {
  if (!request.body) return response.sendStatus(400);
  const title = request.body.title;
  const firstPostText = request.body.first_post_text;
  const thread = new Thread({ title: title, first_post_text: firstPostText });
  try {
    await thread.save();
  } catch (error) {
    console.log(error);
  }
  response.redirect('/threads');
};
