const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const mongoClient = new MongoClient(url);

async function deleteThreadsWithoutBoard() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db('2chdb');
    const threadsCollection = db.collection('threads');
    const threadsWithoutBoard = await threadsCollection.find({ board: { $exists: false } }).toArray();
    const threadsWithoutBoardIds = [];
    for (let i = 0; i < threadsWithoutBoard.length; i++) {
      threadsWithoutBoardIds.push(threadsWithoutBoard[i]._id);
    }
    console.log(threadsWithoutBoardIds);
    const postsCollection = db.collection('posts');
    for (let i = 0; i < threadsWithoutBoard.length; i++) {
      console.log(123);
      await postsCollection.deleteMany({ thread_id: threadsWithoutBoard[i]._id });
    }
    await threadsCollection.deleteMany({ board: { $exists: false } });
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
}

deleteThreadsWithoutBoard();
