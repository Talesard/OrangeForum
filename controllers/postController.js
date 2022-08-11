const Post = require('../models/post');
const Thread = require('../models/thread'); // По идее этого здесь быть не должно. Но как тогда получить оп пост?

exports.getPostsList = async (request, response) => {
  const { threadId } = request.params;
  let postsList;
  let currThread;
  try {
    postsList = await Post.find({ thread_id: threadId }).sort({ date: 1 });
    currThread = await Thread.findOne({ _id: threadId });
  } catch (error) {
    // console.log(`err get posts by thread id: ${threadId}`);
    response.status(404).send('ERROR 404. NOT FOUND.');
    return;
  }
  response.render('postView', { thread: currThread, posts: postsList });
};

exports.postPost = async (request, response) => {
  const { threadId } = request.params;
  const { text } = request.body;
  const post = new Post({ thread_id: threadId, text });
  try {
    await post.save();
  } catch (error) {
    console.log(error);
  }
  response.redirect(`/thread/${threadId}`);
};
