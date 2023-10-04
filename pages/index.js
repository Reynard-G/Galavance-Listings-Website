import Map from '@components/MapComponent/Map';
import Listings from '@components/Listings';

// Testing Data
const listings = [
  {
    plot: "C023",
    city: "Reveille",
    location: [3102, 4096],
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
    location: [2210, 3865],
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
    location: [1853, 3483],
    price: 200000,
    propertyType: "Apartment",
    propertySizeSq: 1500,
    status: "For Rent",
    beds: 2,
    baths: 2,
  },
  {
    plot: "CBD001",
    city: "Willow",
    location: [2595, 3152],
    price: 500000,
    propertyType: "Industrial",
    propertySizeSq: 3000,
    status: "For Sale",
    beds: 5,
    baths: 4,
  },
  {
    plot: "R010",
    city: "Aventura",
    location: [3022, 3656],
    price: 80000,
    propertyType: "House",
    propertySizeSq: 800,
    status: "For Rent",
    beds: 2,
    baths: 1,
  },
];

export default function Home() {
  return (
    <div className="flex">
      <Map listings={listings} />
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