import Head from 'next/head';
import { Hanken_Grotesk } from 'next/font/google';
import AdminNavbar from '@components/AdminNavbar';
/*import StatsCard from '@components/StatsCard';
import StatsSegmentsCard from '@components/StatsSegmentsCard';

import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';*/

const hankenGrotesk = Hanken_Grotesk({ subsets: ['latin'], display: 'swap' });

const Admin = ({ listings }) => {
  /*const currentDate = new Date();
  const currentMonthStartUnix = Math.floor(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime() / 1000);
  const previousMonthStartUnix = Math.floor(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1).getTime() / 1000);

  const forSaleListings = listings.filter((listing) => listing.status === 'For Sale');
  const forRentListings = listings.filter((listing) => listing.status === 'For Rent');
  const currentMonthSaleListings = forSaleListings.filter((listing) => listing.created_at >= currentMonthStartUnix);
  const currentMonthRentListings = forRentListings.filter((listing) => listing.created_at >= currentMonthStartUnix);
  const previousMonthSaleListings = forSaleListings.filter((listing) => listing.created_at >= previousMonthStartUnix && listing.created_at < currentMonthStartUnix);
  const previousMonthRentListings = forRentListings.filter((listing) => listing.created_at >= previousMonthStartUnix && listing.created_at < currentMonthStartUnix);

  const totalSaleListingsInCurrentMonth = forSaleListings.filter((listing) => listing.created_at >= currentMonthStartUnix);
  const totalRentListingsInCurrentMonth = forRentListings.filter((listing) => listing.created_at >= currentMonthStartUnix);
  const listingsDiff = Math.round(((currentMonthSaleListings.length + currentMonthRentListings.length) - (previousMonthSaleListings.length + previousMonthRentListings.length)) / (previousMonthSaleListings.length + previousMonthRentListings.length) * 100);

  const totalSaleListingsValue = forSaleListings.reduce((acc, listing) => acc + Math.min(...listing.price), 0);
  const totalRentListingsValue = forRentListings.reduce((acc, listing) => acc + Math.min(...listing.price), 0);
  const valueDiff = Math.round(((totalSaleListingsValue + totalRentListingsValue) - (previousMonthSaleListings.reduce((acc, listing) => acc + Math.min(...listing.price), 0) + previousMonthRentListings.reduce((acc, listing) => acc + Math.min(...listing.price), 0))) / (previousMonthSaleListings.reduce((acc, listing) => acc + Math.min(...listing.price), 0) + previousMonthRentListings.reduce((acc, listing) => acc + Math.min(...listing.price), 0)) * 100);

  const stats = {
    totalListingsDiff: listingsDiff,
    totalSaleListingsValue: forSaleListings.reduce((acc, listing) => acc + Math.min(...listing.price), 0),
    totalRentListingsValue: forRentListings.reduce((acc, listing) => acc + Math.min(...listing.price), 0),
    averageListingPrice: listings.reduce((acc, listing) => acc + Math.min(...listing.price), 0) / listings.length,
  };*/

  return (
    <>
      <Head>
        <title>HFR Admin | Dashboard</title>
        <meta property="og:title" content="HFR Admin | Dashboard" />
        <meta property="og:description" content="Hamilton Family Realty's Admin Dashboard" />
        <meta name="description" content="Hamilton Family Realty's Admin Dashboard" />
      </Head>

      <main className={hankenGrotesk.className}>
        <AdminNavbar>
          {/*<div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
            <StatsSegmentsCard
              description="Value of all listings compared to last month"
              values={[{ label: "For Sale", value: totalSaleListingsValue, color: 'teal' }, { label: "For Rent", value: totalRentListingsValue, color: 'red' }]}
              difference={valueDiff}
              icon={<PaidRoundedIcon style={{ color: "#A1A1AA" }} />}
              format={Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format}
            />
            <StatsSegmentsCard
              description="Number of listings compared to last month"
              values={[{ label: "For Sale", value: totalSaleListingsInCurrentMonth.length, color: 'teal' }, { label: "For Rent", value: totalRentListingsInCurrentMonth.length, color: 'red' }]}
              difference={stats.totalListingsDiff}
              icon={<FormatListBulletedRoundedIcon style={{ color: "#A1A1AA" }} />}
            />
            <StatsSegmentsCard
              description="Number of page views compared to last month"
              values={[{ label: "Desktop", value: 5348, color: 'teal' }, { label: "Mobile", value: 9384, color: 'red' }]}
              difference={47}
              icon={<VisibilityIcon style={{ color: "#A1A1AA" }} />}
            />
            <StatsCard
              title="Average Listing Price"
              description="Average price of all listings"
              value={stats.averageListingPrice}
              difference={-2.5}
              icon={<PaidRoundedIcon style={{ color: "#A1A1AA" }} />}
              format={Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format}
            />
          </div>
          */}
        </AdminNavbar>
      </main>
    </>
  );
};

export default Admin;

/*import sql from '@lib/db';

export async function getServerSideProps() {
  const listings = await sql`
    SELECT *,
      EXTRACT(epoch FROM listings.created_at) as created_at,
      EXTRACT(epoch FROM listings.updated_at) as updated_at,
      property_types.name as property_type,
      towns.name as town,
      accounts.username as created_by_user,
      statuses.name as status
    FROM listings
    JOIN property_types ON listings.property_type = property_types.id
    JOIN towns ON listings.town = towns.id
    JOIN accounts ON listings.created_by_user = accounts.id
    JOIN statuses ON listings.status = statuses.id
  `;

  return {
    props: {
      listings,
    },
  };
};*/