import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import AdminNavbar from "@components/AdminNavbar";
import SortButton from "@components/SortButton";
import FiltersButton from "@components/FiltersButton";
import { sortAndFilter } from "@lib/ListingsUtils";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const AdminListings = ({ listings }) => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <AdminNavbar />
      <Tabs fullWidth variant="bordered" className="flex w-1/2 justify-center mx-auto mt-5">
        <Tab title="Listings">
          <div className="flex justify-between w-1/2 mx-auto">
            <Input
              placeholder="Plot ID"
              startContent={<SearchRoundedIcon />}
              onValueChange={(value) => setSearch(value)}
            />
            <div className="flex gap-2">
            </div>
          </div>
        </Tab>
        <Tab title="Add Listing">
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminListings;

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