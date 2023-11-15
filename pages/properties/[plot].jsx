import { useRouter } from 'next/router';

import { imageLoader } from '@lib/ListingsUtils';
import ImageCarousel from '@components/ImageCarousel';

const Property = ({ listing }) => {
  return <p>Property: {listing.plot}</p>;
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
}