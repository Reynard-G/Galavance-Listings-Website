import Map from '@components/MapComponent/Map';
import Listings from '@components/Listings';

// Testing Data
const listings = [
  {
    plot: "C023",
    city: "Reveille",
    price: 100000,
    propertyType: "Store",
    propertySizeSq: 1000,
    status: "For Sale",
    beds: 3,
    baths: 2,
  },
  {
    plot: "S001",
    city: "Reveille",
    price: 150000,
    propertyType: "Skyscraper",
    propertySizeSq: 2000,
    status: "For Sale",
    beds: 4,
    baths: 3,
  },
  {
    plot: "I005",
    city: "Klondike",
    price: 200000,
    propertyType: "Condo",
    propertySizeSq: 1500,
    status: "For Rent",
    beds: 2,
    baths: 2,
  },
  {
    plot: "CBD001",
    city: "Willow",
    price: 500000,
    propertyType: "Penthouse",
    propertySizeSq: 3000,
    status: "For Sale",
    beds: 5,
    baths: 4,
  },
  {
    plot: "R010",
    city: "Aventura",
    price: 80000,
    propertyType: "House",
    propertySizeSq: 800,
    status: "For Rent",
    beds: 2,
    baths: 1,
  },
];

/*
Possible property types:
- House
- Apartment
- Industrial
- Store
- Skyscraper
- Office
*/

export default function Home() {
  return (
    <div className="flex">
      <Map />
      <Listings listings={listings} />
    </div>
  );
};
/*
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}*/