const { MongoClient } = require('mongodb');
const { hashPassword } = require('./authUtils');
const config = require('../config/config');

const url = config.mongoUrl;
const mongoClient = new MongoClient(url);

async function addNewUser(user) {
  const hash = await hashPassword(user.password);
  user.password = hash;
  try {
    await mongoClient.connect();
    const db = mongoClient.db('2chdb');
    const usersCollection = db.collection('users');
    await usersCollection.insertOne(user);
  } catch (err) {
    console.log(err);
  }
}

const user = {
  username: 'test',
  password: 'test',
  email: 'test@test.com',
  date_reg: Date.now(),
  last_log: Date.now(),
};

addNewUser(user);
