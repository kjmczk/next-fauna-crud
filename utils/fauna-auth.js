import faunadb from 'faunadb';

export const serverClient = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_KEY,
});
