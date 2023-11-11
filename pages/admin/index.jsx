import Head from 'next/head';
import AdminNavbar from '@components/AdminNavbar';

const Admin = () => {
  return (
    <>
      <Head>
        <title>HFR Admin | Dashboard</title>
        <meta property="og:title" content="HFR Admin | Dashboard" />
        <meta property="og:description" content="Hamilton Family Realty's Admin Dashboard" />
        <meta name="description" content="Hamilton Family Realty's Admin Dashboard" />
      </Head>

      <AdminNavbar>
        <p>Admin Dashboard</p>
      </AdminNavbar>
    </>
  );
};

export default Admin;

import sql from '@lib/db';

export async function getServerSideProps() {
  /**
   * # of listings
   * Graph of sale/rent listings over time
   * 
   */

  const listings = await sql`
    SELECT *,
      EXTRACT(epoch FROM created_at) as created_at,
      EXTRACT(epoch FROM updated_at) as updated_at
    FROM listings
  `;

  return {
    props: {
      listings,
    },
  };
};