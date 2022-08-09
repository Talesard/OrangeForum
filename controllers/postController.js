const Post = require("../models/post");
const Thread = require("../models/thread") // По идее этого здесь быть не должно. Но как тогда получить оп пост?

exports.getPostsList = async (request, response) => {
    const thread_id = request.params.thread_id;
    let posts_list;
    let thread;
    try {
        posts_list = await Post.find({thread_id: thread_id}).sort({date: 1});
        thread = await Thread.findOne({_id: thread_id});
    } catch (error) {
        console.log("err get posts by thread id: " + thread_id);
        response.status(404).send("ERROR 404. NOT FOUND!");
        return;
    }
    response.render("postView", {thread: thread, posts: posts_list});
};

exports.postPost = async (request, response) => {
    const thread_id = request.params.thread_id;
    const text = request.body.text;
    let post = new Post({thread_id: thread_id, text: text});
    try {
        await post.save();
    } catch (error) {
        console.log(error);
    }
    response.redirect(`/thread/${thread_id}`);
};