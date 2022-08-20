const crypto = require('crypto');
const Post = require('../models/post');
const Thread = require('../models/thread'); // По идее этого здесь быть не должно. Но как тогда получить оп пост?

const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

exports.getPostsList = async (request, response) => {
  const { threadId } = request.params;
  let postsList;
  let currThread;
  try {
    postsList = await Post.find({ thread_id: threadId }).sort({ date: 1 });
    currThread = await Thread.findOne({ _id: threadId });
  } catch (error) {
    // console.log(`err get posts by thread id: ${threadId}`);
    response.status(404).render('error', { error_code: 404, error_message: 'Тред не найден.' });
    return;
  }
  response.render('postView', { thread: currThread, posts: postsList });
};

exports.postPost = async (request, response) => {
  const { threadId } = request.params;
  const { text, replyTo } = request.body;
  const post = replyTo ? new Post({ thread_id: threadId, text, reply_to: replyTo }) : new Post({ thread_id: threadId, text });
  try {
    let savedId;
    if (request.files) {
      const { image } = request.files;
      const ext = image.mimetype.split('/')[1];
      if (imageExtensions.indexOf(ext) !== -1) {
        const imageName = `${crypto.createHash('md5').update(image.data).digest('hex') + Math.floor(Date.now() / 1000)}.${ext}`;
        image.mv(`./public/img/uploads/${imageName}`);
        post.image_name = imageName;
      }
    }
    /*
     * ! Разобраться как залить несколько картинок, ограничим до 4-х штук
    */
    await post.save()
      .then(async (savedPost) => {
        savedId = savedPost._id;
        if (replyTo) {
          await Post.findByIdAndUpdate({ _id: replyTo }, { $push: { reply_from: savedId } });
        }
      });
  } catch (error) {
    console.log(error);
  }
  response.redirect(`/thread/${threadId}`);
};
