import request from 'supertest';
import Application from '../../app';

describe('Index Controller', () => {
  it('Check if Endpoint is Working', async () => {
    const res = await request(Application).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('Check if User is Authenticated', async () => {
    const res = await request(Application).get('/auth');
    expect(res.statusCode).toEqual(200);
  });

  it('Check if return a server error 500', async () => {
    const res = await request(Application).get('/server-error');
    expect(res.statusCode).toEqual(500);
  });

  it('Check if return a specific error, example unauthorized 401', async () => {
    const res = await request(Application).get('/auth-error');
    expect(res.statusCode).toEqual(401);
  });
});
