import { query as q } from 'faunadb';
import { serverClient } from '../../../../utils/fauna-auth';

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const customer = await serverClient.query(
      q.Get(q.Ref(q.Collection('customers'), id))
    );
    res.status(200).json(customer.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
