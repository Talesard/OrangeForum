const Thread = require("../models/thread")

exports.getThreadsList = async (request, response) => {
    let threads_list;
    try {
        threads_list = await Thread.find({}).sort({date: -1});
    } catch (error) {
        console.log(error);
        response.sendStatus(400);
    }
    response.render("threadView", {threads: threads_list});
};

exports.postThread = async (request, response) => {
    if(!request.body) return response.sendStatus(400);
    const title = request.body.title;
    const first_post_text = request.body.first_post_text;
    const thread = new Thread({title:title, first_post_text:first_post_text});
    try {
        await thread.save();
    } catch (error) {
        console.log(error);
    }
    response.redirect("/threads");
};