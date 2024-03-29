const Thread = require('../models/thread');
const imageUtils = require('../utils/imageUtils');
const config = require('../config/config');

exports.getThreadsList = async (request, response) => {
  const { board } = request.params;
  if (config.boardsList.indexOf(board) === -1) {
    response.status(404).render('error', { error_code: 404, error_message: 'Доска не найдена.' });
    return;
  }
  let threadsList;
  try {
    threadsList = await Thread.find({ board }).sort({ date: -1 });
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
  response.render('threadView', { threads: threadsList, board });
};

exports.postThread = async (request, response) => {
  if (!request.body) return response.sendStatus(400);
  const { title } = request.body;
  const { board } = request.params;
  if (config.boardsList.indexOf(board) === -1) {
    response.status(404).render('error', { error_code: 404, error_message: 'Доска не найдена.' });
    return;
  }
  const firstPostText = request.body.first_post_text;
  const thread = new Thread({ title, first_post_text: firstPostText, board });
  if (request.files) {
    const { image } = request.files;
    if (imageUtils.isImageFile(image)) {
      const imageName = imageUtils.uniqueImageName(image);
      image.mv(`./public/img/uploads/${imageName}`);
      thread.image_name = imageName;
    }
  }
  try {
    await thread.save();
  } catch (error) {
    console.log(error);
  }
  response.redirect(`/threads/${board}`);
};
