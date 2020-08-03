import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import Layout from '../../../components/layout';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Customer = () => {
  const router = useRouter();
  const { id } = router.query;

  const onClick = async () => {
    try {
      const res = await fetch(`/api/customers/${id}/delete`, {
        method: 'DELETE',
      });
      if (res.status === 200) {
        router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error } = useSWR(`/api/customers/${id}`, fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      <h1>Customer</h1>
      <hr />
      {data ? (
        <div>
          <p className="name">
            {data.firstName} {data.lastName}
          </p>
          <p className="num">{data.telephone}</p>
          <p className="num">{data.creditCard.number}</p>

          <div className="buttons">
            <Link href="/customers/[id]/update" as={`/customers/${id}/update`}>
              <a className="editButton">Edit</a>
            </Link>
            <button onClick={onClick} className="deleteButton">
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}

      <style jsx>{`
        .name {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .buttons {
          text-align: right;
        }
        .editButton {
          display: inline-block;
          border: 1px solid #0070f3;
          border-radius: 3px;
          padding: 0.25rem 1rem;
          margin-right: 0.25rem;
        }
        .editButton:hover {
          text-decoration: none;
        }
        .deleteButton {
          background-color: inherit;
          border: 1px solid #d32f2f;
          border-radius: 3px;
          padding: 0.25rem 1rem;
          cursor: pointer;
          font-size: 1rem;
          color: #d32f2f;
        }
        .num {
          font-family: Roboto, 'Open Sans';
        }
      `}</style>
    </Layout>
  );
};

export default Customer;
