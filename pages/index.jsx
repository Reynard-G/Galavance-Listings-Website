import Head from 'next/head';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

import Map from '@components/MapComponent/Map';
import Listings from '@components/Listings';

export default function Home({ listings }) {
  const [listingsInBounds, setListingsInBounds] = useState(listings);
  const [filteredListings, setFilteredListings] = useState(listings);

  return (
    <>
      <Head>
        <title>HFR | Listings</title>
        <meta name="description" content="Hamilton Family Realty is a premier real estate agency based in the Commonwealth of Redmont.
            We aim to be the top real estate firm in the nation, helping clients buy, sell, or rent the property of their dreams." />
      </Head>

      <div className="flex">
        <Map listings={listings} filteredListings={filteredListings} setListingsInBounds={isMobile ? null : setListingsInBounds} />
        <Listings listings={listingsInBounds} setFilteredListings={setFilteredListings} />
      </div>
    </>
  );
};

import sql from "@lib/db";

export async function getServerSideProps() {
  const rows = await sql`
    SELECT listings.*,
      EXTRACT(epoch FROM listings.created_at) as created_at,
      property_types.name as property_type,
      towns.name as town,
      statuses.name as status
    FROM listings
    JOIN property_types ON listings.property_type = property_types.id
    JOIN towns ON listings.town = towns.id
    JOIN statuses ON listings.status = statuses.id
  `;

  return {
    props: {
      listings: rows,
    },
  };
}