import { useState } from 'react';
import Head from 'next/head';
import AdminNavbar from '@components/AdminNavbar';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';

const EditListing = ({ listing, statuses, propertyTypes, towns }) => {
  // Create an example form with the listing data
  const [form, setForm] = useState({
    plot: listing.plot,
    status: listing.status,
    price: listing.price,
    beds: listing.beds,
    bathrooms: listing.bathrooms,
    sq_meters: listing.sq_meters,
    property_type: listing.property_type,
    town: listing.town,
    images: listing.images
  });
  console.log(form);

  const [priceRange, setPriceRange] = useState(false);

  const handlePriceRange = () => {
    setPriceRange(!priceRange);
    setForm({ ...form, price: "" });
  };

  return (
    <>
      <Head>
        <title>HFR Admin | Edit Listing</title>
        <meta name="description" content="Edit a listing through the HFR Admin Dashboard" />
      </Head>

      <AdminNavbar />
      <div className="flex-1 flex flex-col justify-center w-1/2 space-y-6 mx-auto mt-5">
        <div>
          <h3 className="text-lg font-medium text-left">Edit Listing</h3>
          <p className="text-sm text-gray-500">Edit the listing below</p>
        </div>
        <Divider />
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="Plot"
            placeholder="Plot"
            variant="faded"
            isRequired
            defaultValue={listing.plot}
            onValueChange={(value) => setForm({ ...form, plot: value })}
          />
          <Input
            type="number"
            label="Square Meters"
            placeholder="Square Meters"
            variant="faded"
            defaultValue={listing.sq_meters}
            onValueChange={(value) => setForm({ ...form, sq_meters: value })}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">m<sup>2</sup></span>
              </div>
            }
          />
          <Input
            type="number"
            label="Bedrooms"
            placeholder="Bedrooms"
            variant="faded"
            defaultValue={listing.beds}
            onValueChange={(value) => setForm({ ...form, beds: value })}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">bds</span>
              </div>
            }
          />
          <Input
            type="number"
            label="Bathrooms"
            placeholder="Bathrooms"
            variant="faded"
            defaultValue={listing.bathrooms}
            onValueChange={(value) => setForm({ ...form, bathrooms: value })}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">ba</span>
              </div>
            }
          />
          <div className="flex flex-col">
            <div className="flex items-center">
              <Input
                type="number"
                placeholder={priceRange ? "Min Price" : "Price"}
                variant="faded"
                isRequired
                defaultValue={listing.price[0]}
                onValueChange={(value) => {
                  if (priceRange) {
                    setForm({ ...form, price: [value, form.price[1]] });
                  } else {
                    setForm({ ...form, price: [value] });
                  }
                }}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                className={`${priceRange ? "w-1/2" : "w-full"} mr-2`}
              />
              {priceRange ? (
                <>
                  <span className="text-gray-500">-</span>
                  <Input
                    type="number"
                    placeholder="Max Price"
                    variant="faded"
                    defaultValue={listing.price[1]}
                    onValueChange={(value) => {
                      setForm({ ...form, price: [form.price[0], value] });
                    }}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    className="w-1/2 ml-2 mr-2"
                  />
                </>
              ) : null}
              <Button
                size="md"
                variant="bordered"
                onClick={handlePriceRange}
              >
                {priceRange ? "Single Price" : "Price Range"}
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <Input
                type="number"
                placeholder="x"
                variant="faded"
                isRequired
                defaultValue={listing.location[0]}
                onValueChange={(value) => setForm({ ...form, location: [value || 0, form.location?.[1] || 0] })}
                className="w-1/2 mr-2"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">X:</span>
                  </div>
                }
              />
              <span className="text-gray-500">, </span>
              <Input
                type="number"
                placeholder="z"
                variant="faded"
                isRequired
                defaultValue={listing.location[1]}
                onValueChange={(value) => setForm({ ...form, location: [form.location?.[0] || 0, value || 0] })}
                className="w-1/2 ml-2"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">Z:</span>
                  </div>
                }
              />
            </div>
          </div>
          <Select
            label="Property Status"
            placeholder="Status"
            variant="faded"
            defaultValue={listing.status}
            onSelectionChange={(value) => setForm({ ...form, status: value.currentKey })}
          >
            {statuses.map((status) => (
              <SelectItem key={status.id} value={status.name}>{status.name}</SelectItem>
            ))}
          </Select>
          {/*
            * Town and Images are not implemented yet
          */}
        </div>
      </div>
    </>
  );
};

export default EditListing;

import sql from "@lib/db";

export async function getStaticProps({ params }) {
  const listing = (await sql`
    SELECT *,
      EXTRACT(epoch FROM updated_at) as updated_at,
      EXTRACT(epoch FROM created_at) as created_at
    FROM listings WHERE plot = ${params.plot}
  `)[0];
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

  console.log(listing, statuses, propertyTypes, towns);

  return {
    props: {
      listing,
      statuses,
      propertyTypes,
      towns
    }
  };
}

export async function getStaticPaths() {
  const listings = await sql`
    SELECT plot FROM listings
  `;

  const paths = listings.map((listing) => ({
    params: { plot: listing.plot }
  }));

  return { paths, fallback: 'blocking' };
}