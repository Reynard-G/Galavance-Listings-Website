import Head from 'next/head';
import { Divider } from '@nextui-org/divider';
import PropertyNavbar from '@components/PropertyNavbar';
import ImageCarousel from '@components/ImageCarousel';
import { secondsToText } from '@lib/secondsToText';

import SquareFootRoundedIcon from '@mui/icons-material/SquareFootRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';

const Property = ({ listing }) => {
  const formattedPrice = listing.price[1] // If listing.price has two values, format it as a range
    ? `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listing.price[0])} - ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listing.price[1])}`
    : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listing.price);

  return (
    <>
      <Head>
        <title>HFR | {listing.plot}</title>
        <meta property="og:title" content={`HFR | ${listing.plot}`} />
        <meta property="og:description" content="Hamilton Family Realty is a premier real estate agency based in the Commonwealth of Redmont.
            We aim to be the top real estate firm in the nation, helping clients buy, sell, or rent the property of their dreams." />
        <meta name="description" content="Hamilton Family Realty is a premier real estate agency based in the Commonwealth of Redmont.
            We aim to be the top real estate firm in the nation, helping clients buy, sell, or rent the property of their dreams." />
      </Head>

      <PropertyNavbar />

      <div className="flex flex-col md:flex-row justify-center mt-6">
        <div className="w-full md:w-3/4 lg:w-7/12 px-4 md:px-0">
          <ImageCarousel
            listing={listing}
            width={2048}
            height={1024}
          />

          <div className="flex justify-between pt-6">
            <div className="flex flex-col space-y-1">
              <h1 className="text-3xl font-bold">{formattedPrice}</h1>
              <h2 className="text-xl">{listing.plot}</h2>
            </div>

            {/* Desktop only */}
            <div className="hidden md:flex items-center gap-10">
              <div className="flex items-center">
                <SquareFootRoundedIcon className="shrink-0" fontSize="large" />
                <div className="ml-2">
                  <p className="font-bold text-lg text-neutral-200">Plot Size</p>
                  <p className="text-lg text-neutral-400">{listing.sq_meters || '--'} m<sup>2</sup></p>
                </div>
              </div>
              <div className="flex items-center">
                <HotelRoundedIcon className="shrink-0" fontSize="large" />
                <div className="ml-2">
                  <p className="font-bold text-lg text-neutral-200">Beds</p>
                  <p className="text-lg text-neutral-400">{listing.beds || '--'} bds</p>
                </div>
              </div>
              <div className="flex items-center">
                <ShowerRoundedIcon className="shrink-0" fontSize="large" />
                <div className="ml-2">
                  <p className="font-bold text-lg text-neutral-200">Baths</p>
                  <p className="text-lg text-neutral-400">{listing.bathrooms || '--'} ba</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile only */}
          <div className="flex md:hidden justify-between pt-2">
            <div className="flex items-center">
              <SquareFootRoundedIcon className="shrink-0" fontSize="small" />
              <div className="ml-2">
                <p className="text-lg text-neutral-400">{listing.sq_meters || '--'} m<sup>2</sup></p>
              </div>
            </div>

            <Divider orientation="vertical" className="h-auto" />

            <div className="flex items-center">
              <HotelRoundedIcon className="shrink-0" fontSize="small" />
              <div className="ml-2">
                <p className="text-lg text-neutral-400">{listing.beds || '--'} bds</p>
              </div>
            </div>

            <Divider orientation="vertical" className="h-auto" />

            <div className="flex items-center">
              <ShowerRoundedIcon className="shrink-0" fontSize="small" />
              <div className="ml-2">
                <p className="text-lg text-neutral-400">{listing.bathrooms || '--'} ba</p>
              </div>
            </div>
          </div>

          <Divider orientation="horizontal" className="my-4" />

          <p className="font-bold text-2xl text-neutral-200">What&apos;s Special</p>
          <p className="text-lg text-pretty text-neutral-400 whitespace-pre-line mt-6">{listing.description || 'No description provided.'}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-6">
            <div className="flex items-center min-w-max p-3 rounded bg-neutral-900">
              <Person2RoundedIcon className="shrink-0 mr-2" fontSize="large" />
              <p className="text-lg text-neutral-400">Listed by <span className="underline underline-offset-4 decoration-dotted">{listing.created_by_user}</span></p>
            </div>

            <div className="flex items-center min-w-max p-3 rounded bg-neutral-900">
              <AccessTimeRoundedIcon className="shrink-0 mr-2" fontSize="large" />
              <p className="text-lg text-neutral-400"><span className="underline underline-offset-4 decoration-dotted">{secondsToText(Date.now() / 1000 - listing.created_at)}</span> on HFR</p>
            </div>

            <div className="flex items-center min-w-max p-3 rounded bg-neutral-900">
              <MapsHomeWorkRoundedIcon className="shrink-0 mr-2" fontSize="large" />
              <p className="text-lg text-neutral-400"><span className="underline underline-offset-4 decoration-dotted">{listing.property_type}</span> plot</p>
            </div>

            <div className="flex items-center min-w-max p-3 rounded bg-neutral-900">
              <LocationCityRoundedIcon className="shrink-0 mr-2" fontSize="large" />
              <p className="text-lg text-neutral-400">Located in <span className="underline underline-offset-4 decoration-dotted">{listing.town}</span></p>
            </div>

            <div className="flex items-center min-w-max p-3 rounded bg-neutral-900">
              <AttachMoneyRoundedIcon className="shrink-0 mr-2" fontSize="large" />
              <p className="text-lg text-neutral-400">{listing.status}</p>
            </div>

            <div className="flex items-center min-w-max p-3 rounded bg-neutral-900">
              <UpdateRoundedIcon className="shrink-0 mr-2" fontSize="large" />
              <p className="text-lg text-neutral-400">Updated <span className="underline underline-offset-4 decoration-dotted">{secondsToText(Date.now() / 1000 - listing.updated_at)} ago</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Property;

import sql from '@lib/db';

export async function getStaticPaths() {
  const rows = await sql`
      SELECT id
      FROM listings
      `;

  const paths = rows.map((row) => ({
    params: { plot: row.id.toString() }
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const rows = await sql`
      SELECT listings.*,
      EXTRACT(epoch FROM listings.updated_at) as updated_at,
      EXTRACT(epoch FROM listings.created_at) as created_at,
      property_types.name as property_type,
      towns.name as town,
      accounts.username as created_by_user,
      statuses.name as status
      FROM listings
      JOIN property_types ON listings.property_type = property_types.id
      JOIN towns ON listings.town = towns.id
      JOIN accounts ON listings.created_by_user = accounts.id
      JOIN statuses ON listings.status = statuses.id
      WHERE listings.id = ${params.plot}
      `;

  return {
    props: {
      listing: rows[0]
    }
  };
};