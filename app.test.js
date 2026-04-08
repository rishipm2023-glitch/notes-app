const request = require('supertest');
const app = require('./app');

describe('Notes CRUD API Tests', () => {
  
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'Test', content: 'Testing 123' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test');
  });

  it('should get all notes', async () => {
    const res = await request(app).get('/notes');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should delete a note', async () => {
    const res = await request(app).delete('/notes/1');
    expect(res.statusCode).toEqual(204);
  });
});