import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { imageLoader } from '@lib/ListingsUtils';

import AdminNavbar from '@components/AdminNavbar';
import ListingCard from '@components/ListingCard';
import SortableImageList from '@components/SortableImageList';
import UploadButton from '@components/UploadButton';

const EditListing = ({ listing, statuses, propertyTypes, towns }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    id: listing.id,
    plot: listing.plot,
    location: listing.location,
    status: listing.status,
    price: listing.price,
    beds: listing.beds,
    bathrooms: listing.bathrooms,
    sq_meters: listing.sq_meters,
    property_type: listing.property_type,
    town: listing.town,
    images: listing.images
  });
  const [priceRange, setPriceRange] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const requiredFields = ['plot', 'location', 'status', 'price', 'property_type', 'town'];
    const isFieldInvalid = (field) => !form[field];

    setSubmitDisabled(false);

    if (form.price[0] == undefined) {
      setSubmitDisabled(true);
    } else if (priceRange && form.price[1] == undefined) {
      setSubmitDisabled(true);
    }

    if (requiredFields.some(isFieldInvalid)) {
      setSubmitDisabled(true);
    }

    if (priceRange && form.price[1] <= form.price[0]) {
      setSubmitDisabled(true);
    }

    const bounds = { x: 6000, z: 6000 };
    if (form.location.some((coord) => coord < -bounds.x || coord > bounds.x)) {
      setSubmitDisabled(true);
    }

    if (form.price.some((price) => price < 0)) {
      setSubmitDisabled(true);
    }
  }, [form, priceRange]);

  useEffect(() => {
    if (uploadedImage) {
      setForm({ ...form, images: [...form.images, uploadedImage] });
      setUploadedImage("");
    }
  }, [form, uploadedImage]);

  const isValueInvalid = (value) => {
    return value == undefined || value == "";
  };

  const handleFormSubmit = async (e) => {
    setIsSubmitting(true);

    await fetch('/api/editListing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then((res) => {
      if (res.status == 200) {
        router.push('/admin/listings');
      } else {
        setIsSubmitting(false);
      }
    }).catch((err) => {
      console.log(err);
      setIsSubmitting(false);
    });
  };

  const handlePriceRange = () => {
    setPriceRange(!priceRange);

    if (priceRange) {
      setForm({ ...form, price: [form.price[0]] });
    }
  };

  const replaceIdsWithNames = (listing) => {
    const newListing = { ...listing };
    newListing.town = towns.find((town) => town.id == listing.town)?.name || "Unknown";
    newListing.property_type = propertyTypes.find((propertyType) => propertyType.id == listing.property_type)?.name || "Unknown";

    return newListing;
  };

  return (
    <>
      <Head>
        <title>HFR Admin | Edit Listing</title>
        <meta property="og:title" content="HFR Admin | Edit Listing" />
        <meta property="og:description" content="Edit a listing through the HFR Admin Dashboard" />
        <meta name="description" content="Edit a listing through the HFR Admin Dashboard" />
      </Head>

      <AdminNavbar />

      <div className="flex justify-center items-center">
        <Card className="w-full sm:w-3/4 md:w-1/2 lg:w-2/6 2xl:w-1/4 3xl:w-1/5 shadow-lg mx-4 mt-2">
          <CardHeader className="pt-2 px-4 flex-col items-start">
            <h3 className="text-lg font-medium text-left">Preview</h3>
            <p className="text-sm text-gray-400">Preview the listing below</p>
          </CardHeader>
          <CardBody>
            <ListingCard listing={replaceIdsWithNames(form)} />
          </CardBody>
        </Card>
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 pb-4 md:px-0 w-full sm:w-3/4 md:w-1/2 space-y-6 mx-auto mt-5">
        <div>
          <h3 className="text-lg font-medium text-left">Edit a Listing</h3>
          <p className="text-sm text-gray-400">Edit the listing below</p>
        </div>
        
        <Divider />

        <div className="max-lg:flex max-lg:flex-col max-lg:space-y-4 lg:grid lg:grid-cols-2 lg:gap-4">
          <Input
            type="text"
            label="Plot"
            placeholder="Plot"
            variant="faded"
            isRequired
            isInvalid={isValueInvalid(form.plot)}
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
                label={priceRange ? "Min Price" : "Price"}
                placeholder={priceRange ? "Min Price" : "Price"}
                variant="faded"
                isRequired
                isInvalid={isValueInvalid(form.price[0])}
                defaultValue={listing.price[0]}
                onValueChange={(value) => {
                  if (priceRange && form.price[1]) {
                    setForm({ ...form, price: [value || undefined, form.price[1]] });
                  } else {
                    setForm({ ...form, price: [value || undefined] });
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
                  <span className="text-gray-400">-</span>
                  <Input
                    type="number"
                    label="Max Price"
                    placeholder="Max Price"
                    variant="faded"
                    isRequired
                    isInvalid={isValueInvalid(form.price[1]) || form.price[1] <= form.price[0]}
                    defaultValue={listing.price[1]}
                    onValueChange={(value) => {
                      setForm({ ...form, price: [form.price[0], value || undefined] });
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
                onPress={handlePriceRange}
              >
                {priceRange ? "Single Price" : "Price Range"}
              </Button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center">
              <Input
                label="X Coordinate"
                type="number"
                placeholder="Enter the X coordinate"
                variant="faded"
                isRequired
                isInvalid={isValueInvalid(form.location[0])}
                defaultValue={listing.location[0]}
                onValueChange={(value) => setForm({ ...form, location: [value, form.location?.[1]] })}
                className="w-1/2 mr-2"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">X:</span>
                  </div>
                }
              />
              <Input
                label="Z Coordinate"
                type="number"
                placeholder="Enter the Z coordinate"
                variant="faded"
                isRequired
                isInvalid={isValueInvalid(form.location[1])}
                defaultValue={listing.location[1]}
                onValueChange={(value) => setForm({ ...form, location: [form.location?.[0], value] })}
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
            variant="faded"
            isRequired
            isInvalid={isValueInvalid(form.status)}
            defaultSelectedKeys={[listing.status.toString()]}
            onSelectionChange={(value) => setForm({ ...form, status: Array.from(value).join(',') || undefined })}
          >
            {statuses.map((status) => (
              <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
            ))}
          </Select>

          <Select
            label="Property Type"
            variant="faded"
            isRequired
            isInvalid={isValueInvalid(form.property_type)}
            defaultSelectedKeys={[listing.property_type.toString()]}
            onSelectionChange={(value) => setForm({ ...form, property_type: Array.from(value).join(',') || undefined })}
          >
            {propertyTypes.map((propertyType) => (
              <SelectItem key={propertyType.id} value={propertyType.id}>{propertyType.name}</SelectItem>
            ))}
          </Select>

          <Select
            items={towns}
            label="Town"
            variant="faded"
            isRequired
            isInvalid={isValueInvalid(form.town)}
            defaultSelectedKeys={[listing.town.toString()]}
            onSelectionChange={(value) => setForm({ ...form, town: Array.from(value).join(',') || undefined })}
            className="col-span-2"
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.data.id} className="flex items-center gap-2">
                  <Avatar alt={item.data.name} src={imageLoader({ src: item.data.icon, width: 24 })} className="w-6 h-6 text-tiny" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.data.name}</span>
                  </div>
                </div>
              ));
            }}
          >
            {(town) => (
              <SelectItem key={town.id} value={town.id} textValue={town.name}>
                <div className="flex items-center gap-2">
                  <Avatar alt={town.name} src={imageLoader({ src: town.icon, width: 24 })} className="w-6 h-6 text-tiny" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{town.name}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
          <SortableImageList images={form.images} setImages={(images) => setForm({ ...form, images })} className="hidden lg:block col-span-full" />

          <UploadButton plot={form.plot} setImages={setUploadedImage} className="lg:hidden col-span-full" />

          <Button size="md" color="primary" variant="shadow" isDisabled={isSubmitDisabled} isLoading={isSubmitting} className="col-span-2" onPress={handleFormSubmit}>Submit</Button>
        </div>
      </div>
    </>
  );
};

export default EditListing;

import sql from '@lib/db';

export async function getStaticPaths() {
  const listings = await sql`
    SELECT plot FROM listings
  `;

  const paths = listings.map((listing) => ({
    params: { plot: listing.plot }
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const listing = (await sql`
    SELECT *,
      EXTRACT(epoch FROM updated_at) as updated_at,
      EXTRACT(epoch FROM created_at) as created_at
    FROM listings WHERE plot = ${params.plot}
  `)[0];

  if (!listing) {
    return {
      notFound: true,
    };
  }

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
      listing,
      statuses,
      propertyTypes,
      towns
    }
  };
}