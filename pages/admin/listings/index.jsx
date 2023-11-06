import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

import AdminNavbar from "@components/AdminNavbar";
import SortButton from "@components/Buttons/SortButton";
import FiltersButton from "@components/Buttons/FiltersButton";
import SearchBar from "@components/SearchBar";
import ListingCard from "@components/ListingCard";
import ListingDeleteButton from "@components/Buttons/ListingDeleteButton";
import AddListing from '@components/Forms/AddListing';
import { sortAndFilter } from "@lib/ListingsUtils";

import EditRoundedIcon from '@mui/icons-material/EditRounded';

const AdminListings = ({ listings, statuses, propertyTypes, towns }) => {
  const router = useRouter();
  const [isEditLoading, setIsEditLoading] = useState({});
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
        <meta property="og:title" content="HFR Admin | Listings" />
        <meta property="og:description" content="View and edit listings through the HFR Admin Dashboard" />
        <meta name="description" content="View and edit listings through the HFR Admin Dashboard" />
      </Head>

      <div>
        <AdminNavbar />

        <Tabs fullWidth variant="bordered" className="flex w-full md:w-1/2 justify-center mx-auto p-4 mt-5">
          <Tab title="Listings">
            <div className="flex items-center justify-between p-2 w-full md:w-1/2 mx-auto gap-2">
              <SearchBar setSearch={setSearch} />
              <SortButton setSortValue={setSortValue} />
              <FiltersButton filters={filters} setFilters={setFilters} />
            </div>
            <div className="listings-container grid auto-rows-auto gap-2 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
              {processedListings.map((listing) => (
                <Card key={listing.id} shadow>
                  <CardBody className="pb-0">
                    <ListingCard key={listing.id} listing={listing} />
                  </CardBody>
                  <CardFooter className="flex gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      variant="ghost"
                      isLoading={isEditLoading[listing.id]}
                      startContent={!isEditLoading[listing.id] && <EditRoundedIcon fontSize="small" />}
                      className="w-1/2"
                      onPress={async () => {
                        setIsEditLoading({ ...isEditLoading, [listing.id]: true });
                        await router.push(`/admin/listings/edit/${listing.id}`);
                        setIsEditLoading({ ...isEditLoading, [listing.id]: false });
                      }}
                    >
                      Edit
                    </Button>
                    <ListingDeleteButton
                      id={listing.id}
                      plot={listing.plot}
                      onDelete={() => router.reload()}
                    />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Tab>
          <Tab title="Add Listing">
            <AddListing statuses={statuses} propertyTypes={propertyTypes} towns={towns} />
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
      accounts.username as created_by_user,
      statuses.name as status
    FROM listings
    JOIN property_types ON listings.property_type = property_types.id
    JOIN towns ON listings.town = towns.id
    JOIN accounts ON listings.created_by_user = accounts.id
    JOIN statuses ON listings.status = statuses.id
  `;

  const statuses = (await sql`
    SELECT *,
      EXTRACT(epoch FROM created_at) as created_at
    FROM statuses
  `);
  const propertyTypes = (await sql`
    SELECT *,
      EXTRACT(epoch FROM created_at) as created_at
    FROM property_types
  `);
  const towns = (await sql`
    SELECT *,
      EXTRACT(epoch FROM created_at) as created_at
    FROM towns
  `);

  return {
    props: {
      listings: rows,
      statuses,
      propertyTypes,
      towns,
    },
  };
}