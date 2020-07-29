import { query as q } from 'faunadb';
import { serverClient } from '../../../../utils/fauna-auth';

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    await serverClient.query(q.Delete(q.Ref(q.Collection('customers'), id)));
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
