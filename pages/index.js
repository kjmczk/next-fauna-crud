import Link from 'next/link';
import useSWR from 'swr';
import Layout from '../components/layout';
import DataRow from '../components/data-row';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
  const { data, error } = useSWR('/api/customers', fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      <h1>Next Fauna CRUD</h1>

      <Link href="/customers/create">
        <a className="createNew">Create New Customer</a>
      </Link>

      <div className="table">
        <h2>Customer Data</h2>
        <div className="headerRow">
          <h4>name</h4>
          <h4>telephone</h4>
          <h4 className="creditCard">credit card</h4>
        </div>
        {data ? (
          data.map((d) => (
            <DataRow
              key={d.ref['@ref'].id}
              id={d.ref['@ref'].id}
              firstName={d.data.firstName}
              lastName={d.data.lastName}
              telephone={d.data.telephone}
              creditCard={d.data.creditCard.number}
            />
          ))
        ) : (
          <>
            <DataRow loading />
            <DataRow loading />
            <DataRow loading />
          </>
        )}
      </div>

      <style jsx>{`
        h2 {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          padding: 0 32px;
        }
        h4 {
          color: #555;
          font-size: 12px;
          font-weight: 400;
          text-transform: uppercase;
        }
        .createNew {
          display: inline-block;
          background-color: #0070f3;
          border-radius: 3px;
          color: #fff;
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
        }

        .createNew:hover {
          text-decoration: none;
        }

        .table {
          border: 1px solid #eaeaea;
          border-radius: 4px;
          min-width: 512px;
          padding-top: 24px;
        }

        .headerRow {
          display: grid;
          grid-auto-flow: column;
          grid-template-columns: 1fr 1fr 1fr;
          padding: 0 32px;
        }

        .creditCard {
          margin-left: auto;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
