import AdminNavbar from "@components/AdminNavbar";
import SortButton from "@components/SortButton";
import FiltersButton from "@components/FiltersButton";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";

const AdminListings = () => {
  return (
    <div>
      <AdminNavbar />
      <Tabs fullWidth variant="bordered" className="flex w-1/2 justify-center mx-auto mt-5">
        <Tab title="Listings">
          <div className="flex justify-between">
          </div>
        </Tab>
        <Tab title="Add Listing">
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminListings;