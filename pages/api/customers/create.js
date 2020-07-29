import { query as q } from 'faunadb';
import { serverClient } from '../../../utils/fauna-auth';

export default async (req, res) => {
  const { firstName, lastName, telephone, creditCardNumber } = req.body;

  try {
    await serverClient.query(
      q.Create(q.Collection('customers'), {
        data: {
          firstName,
          lastName,
          telephone,
          creditCard: {
            number: creditCardNumber,
          },
        },
      })
    );
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
