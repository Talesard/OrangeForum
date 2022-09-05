const { request, response } = require('express');

exports.getLogin = async (request, response) => {
  response.render('loginView');
};

exports.postLogin = async (request, response) => {
  const { username, password } = request.body;
  console.log(username, password);
  const status = true;
  if (status) {
    response.redirect('/reports');
  } else {
    response.render('loginView', { error: 'Login error :(' });
  }
};
