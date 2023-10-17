import { useState, useEffect } from "react";
import Head from "next/head";
import { Tabs, Tab } from "@nextui-org/tabs";
import AdminNavbar from "@components/AdminNavbar";
import SortButton from "@components/SortButton";
import FiltersButton from "@components/FiltersButton";
import SearchBar from "@components/SearchBar";
import ListingCard from "@components/ListingCard";
import { sortAndFilter } from "@lib/ListingsUtils";

const AdminListings = ({ listings }) => {
  const [processedListings, setProcessedListings] = useState(listings);
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filters, setFilters] = useState({
    propertyStatus: "For Sale",
    "For Sale": {
      price: [0, 1000000],
      beds: [],
      bathrooms: [],
      homeType: ""
    },
    "For Rent": {
      price: [0, 10000],
      beds: [],
      bathrooms: []
    }
  });

  useEffect(() => {
    const filteredListings = sortAndFilter(listings, filters, sortValue);
    const searchResults = filteredListings.filter((listing) => listing.plot.toLowerCase().includes(search));

    setProcessedListings(searchResults);
  }, [listings, search, sortValue, filters]);

  return (
    <>
      <Head>
        <title>HFR Admin | Listings</title>
        <meta name="description" content="View and edit listings through the HFR Admin Dashboard" />
      </Head>

      <div>
        <AdminNavbar />
        <Tabs fullWidth variant="bordered" className="flex w-1/2 justify-center mx-auto mt-5">
          <Tab title="Listings">
            <div className="flex items-center justify-between p-2 w-full md:w-1/2 mx-auto gap-2">
              <SearchBar setSearch={setSearch} />
              <SortButton setSortValue={setSortValue} />
              <FiltersButton filters={filters} setFilters={setFilters} />
            </div>
            <div className="listings-container grid auto-rows-auto gap-2 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {processedListings.map((listing) => (
                <ListingCard key={listing.plot} listing={listing} link={`/admin/listings/edit/${listing.plot}`} />
              ))}
            </div>
          </Tab>
          <Tab title="Add Listing">
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default AdminListings;

import sql from "@lib/db";

export async function getServerSideProps() {
  const rows = await sql`
    SELECT listings.*,
      EXTRACT(epoch FROM listings.updated_at) as updated_at,
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