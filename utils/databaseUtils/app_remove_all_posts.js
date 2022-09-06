const { MongoClient } = require('mongodb');
const config = require('../config/config');

const url = config.mongoUrl;
const mongoClient = new MongoClient(url);

async function deleteAllPosts() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db('2chdb');
    const postsCollection = db.collection('posts');
    await postsCollection.deleteMany({});
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
}

deleteAllPosts();
