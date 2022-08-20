const express = require('express');
const hbs = require("hbs");
const mongoose = require('mongoose');

const threadRouter = require('./routes/threadRouter');
const postRouter = require('./routes/postRouter');

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(`${__dirname}/public`));

app.use('/threads', threadRouter);
app.use('/thread', postRouter);

app.get('/', (request, response) => { response.redirect('/threads/b/'); });

app.use(async (request, response) => { response.status(404).render('error', { error_code: 404, error_message: 'URL не существует.' }); });

const run = () => {
  mongoose.connect('mongodb://localhost:27017/2chdb', { useUnifiedTopology: true })
    .catch((err) => { console.log(`Mongodb err: ${err}`); })
    .then(() => { app.listen(3000); })
    .catch((err) => { console.log(`Express server err: ${err}`); })
    .then(() => { console.log('Сервер ожидает подключения http://localhost:3000'); });
};

run();

module.exports.app = app;
