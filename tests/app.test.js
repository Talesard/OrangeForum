const request = require('supertest');
const assert = require('assert');

const { app } = require('../app');

const getRandomString = (len) => {
  const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  const randomArray = Array.from(
    { length: len },
    (v, k) => chars[Math.floor(Math.random() * chars.length)],
  );
  const randomString = randomArray.join('');
  return randomString;
};

const randomTitle = getRandomString(20);
const randomFirstPostText = getRandomString(50);
const testThreadId = '62f50dbf0ebc0b4da97ad487';
const randomThreadPostText = getRandomString(50);

it('error 404 on unknown path', (done) => {
  request(app)
    .get('/unknownpath')
    .expect(404)
    .expect('ERROR 404. NOT FOUND.')
    .end(done);
});

it('error 404 on unknown threadId', (done) => {
  request(app)
    .get('/thread/unknownThreadId')
    .expect(404)
    .expect('ERROR 404. NOT FOUND.')
    .end(done);
});

it('can get threads list', (done) => {
  request(app)
    .get('/threads')
    .expect(200)
    .end(done);
});

it('can get posts in thread', (done) => {
  const threadId = '62f50dbf0ebc0b4da97ad487';
  request(app)
    .get(`/thread/${threadId}`)
    .expect(200)
    .end(done);
});

it('can create new thread', (done) => {
  request(app)
    .post('/threads')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send({ title: randomTitle, first_post_text: randomFirstPostText })
    .expect(302) // redirect
    .end(done);
});

it('can get created thread', (done) => {
  request(app)
    .get('/threads')
    .expect(200)
    .expect((response) => {
      assert.equal(response.text.includes(randomTitle), true);
      assert.equal(response.text.includes(randomFirstPostText), true);
    })
    .end(done);
});

it('can add post to thread', (done) => {
  request(app)
    .post(`/thread/${testThreadId}`)
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .type('form')
    .send({ text: randomThreadPostText })
    .expect(302) // redirect
    .end(done);
});

it('can get added post', (done) => {
  request(app)
    .get(`/thread/${testThreadId}`)
    .expect(200)
    .expect((response) => {
      assert.equal(response.text.includes(randomThreadPostText), true);
    })
    .end(done);
});
