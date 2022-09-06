const express = require('express');
const User = require('../models/user');
const { checkPassword } = require('../utils/authUtils');

exports.basicAuth = async (req, res, next) => {
  let authResult = false;
  try {
    const [, b64auth = ''] = (req.headers.authorization || '').split(' ');
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    // if (!username || !password) throw new Error('username or password is empty');
    const user = await User.findOne({ username });
    if (!user) throw new Error(`Can't find user ${username}`);
    authResult = await checkPassword(password, user.password);
  } catch (err) {
    console.log(err);
  }
  if (authResult) {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).send('Authentication required.');
};
