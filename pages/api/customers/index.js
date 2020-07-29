import { query as q } from 'faunadb';
import { serverClient } from '../../../utils/fauna-auth';

export default async (req, res) => {
  try {
    const customers = await serverClient.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index('all_customers') // specify source
          )
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      )
    );
    // ok
    res.status(200).json(customers.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
