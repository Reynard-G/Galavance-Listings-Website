import Head from 'next/head';
import AdminNavbar from '@components/AdminNavbar';

const Admin = () => {
  return (
    <>
      <Head>
        <title>HFR Admin | Dashboard</title>
        <meta name="description" content="Hamilton Family Realty's Admin Dashboard" />
      </Head>
      
      <div>
        <AdminNavbar />
        <p>Admin Dashboard</p>
      </div>
    </>
  );
};

export default Admin;