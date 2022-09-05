const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const config = require('./config/config');

const threadRouter = require('./routes/threadRouter');
const postRouter = require('./routes/postRouter');
const reportRouter = require('./routes/reportRouter');
const authRouter = require('./routes/authRouter');

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static(`${__dirname}/public`));
app.use(fileUpload({ createParentPath: true }));

app.use('/threads', threadRouter);
app.use('/thread', postRouter);
app.use('/reports', reportRouter);
app.use('/auth', authRouter);

app.get('/', (request, response) => { response.redirect('/threads/b/'); });

app.use(async (request, response) => { response.status(404).render('error', { error_code: 404, error_message: 'URL не существует.' }); });

const run = () => {
  mongoose.connect(config.mongoUrl, { useUnifiedTopology: true })
    .catch((err) => { console.log(`Mongodb err: ${err}`); })
    .then(() => { app.listen(config.appPort); })
    .catch((err) => { console.log(`Express server err: ${err}`); })
    .then(() => { console.log(`Сервер ожидает подключения http://localhost:${config.appPort}`); });
};

run();

module.exports.app = app;
