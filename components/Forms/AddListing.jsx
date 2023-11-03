import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Select, SelectItem } from '@nextui-org/select';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Divider } from '@nextui-org/divider';
import ErrorModal from '@components/ErrorModal';
import { imageLoader } from '@lib/ListingsUtils';

const initialFormState = {
  plot: '',
  sq_meters: '',
  beds: '',
  bathrooms: '',
  price: [],
  location: [],
  operationType: undefined,
  propertyType: undefined,
  town: undefined,
  images: []
};

const AddListing = ({ statuses, propertyTypes, towns }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPriceRange, setIsPriceRange] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const res = await fetch('/api/addListing', {
      method: 'POST',
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setIsSubmitting(false);
      setForm(initialFormState);
      router.reload();
    } else {
      setIsSubmitting(false);
      setIsErrorModalVisible(true);
    }
  };

  const isPlotInvalid = form.plot === '';
  const isFirstPriceInvalid = isNaN(form.price[0]);
  const isSecondPriceInvalid = isNaN(form.price[1]) || Number(form.price[0]) > Number(form.price[1]);
  const isXLocationInvalid = isNaN(form.location[0]) || form.location[0] > 6000;
  const isZLocationInvalid = isNaN(form.location[1]) || form.location[1] > 6000;
  const isOperationTypeInvalid = isNaN(form.operationType);
  const isPropertyTypeInvalid = isNaN(form.propertyType);
  const isTownInvalid = isNaN(form.town);

  useEffect(() => {
    if (form.price[1] === undefined && isPriceRange) {
      setForm({ ...form, price: [form.price[0]] });
    }
  }, [form, isPriceRange]);

  return (
    <>
      <Head>
        <title>HFR Admin | Add Listing</title>
        <meta property="og:title" content="HFR Admin | Add Listing" />
        <meta property="og:description" content="Add a listing through the HFR Admin Dashboard" />
        <meta name="description" content="Add a listing through the HFR Admin Dashboard" />
      </Head>

      <ErrorModal
        visible={isErrorModalVisible}
        title="Error"
        onConfirmed={() => setIsErrorModalVisible(false)}
      >
        An error occurred while trying to add the listing. Check to see if any
        restriction are being violated such as identical plots, locations, etc.
        If the problem persists, contact administration.
      </ErrorModal>

      <div className="space-y-4 w-full sm:w-3/4 md:w-1/2 p-4 mx-auto">
        <div>
          <h3 className="text-lg font-medium">Add a Listing</h3>
          <p className="text-sm text-gray-400">Fill out the form below to add a new listing.</p>
        </div>

        <Divider />

        <div className="grid grid-flow-row auto-rows-auto gap-4">
          <Input
            type="text"
            label="Plot"
            value={form.plot}
            placeholder="Enter the plot ID"
            variant="faded"
            isRequired
            isInvalid={isPlotInvalid}
            onValueChange={(value) => setForm({ ...form, plot: value })}
          />

          <Input
            type="number"
            label="Square Meters"
            value={form.sq_meters}
            placeholder="Enter the square/block meters"
            variant="faded"
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
            value={form.beds}
            placeholder="Enter the # of bedrooms"
            variant="faded"
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
            value={form.bathrooms}
            placeholder="Enter the # of bathrooms"
            variant="faded"
            onValueChange={(value) => setForm({ ...form, bathrooms: value })}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">ba</span>
              </div>
            }
          />

          <div className="flex col-span-2 gap-4 items-center">
            <Input
              type="text"
              label={isPriceRange ? "Minimum Price" : "Price"}
              value={form.price[0]}
              placeholder={isPriceRange ? "Enter the minimum price" : "Enter the price"}
              variant="faded"
              isRequired
              isInvalid={isFirstPriceInvalid}
              onValueChange={(value) => {
                if (isPriceRange) {
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
            />
            {isPriceRange && (
              <Input
                type="text"
                label="Maximum Price"
                value={form.price[1]}
                placeholder="Enter the maximum price"
                variant="faded"
                isRequired
                isInvalid={isSecondPriceInvalid}
                onValueChange={(value) => setForm({ ...form, price: [form.price[0], value || undefined] })}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
            )}
            <Button
              size="md"
              variant="bordered"
              onPress={() => setIsPriceRange(!isPriceRange)}
            >
              {isPriceRange ? "Price" : "Price Range"}
            </Button>
          </div>

          <Input
            type="number"
            label="X Coordinate"
            value={form.location[0]}
            placeholder="Enter the X coordinate"
            variant="faded"
            isRequired
            isInvalid={isXLocationInvalid}
            onValueChange={(value) => setForm({ ...form, location: [value || undefined, form.location[1]] })}
          />
          <Input
            type="number"
            label="Z Coordinate"
            value={form.location[1]}
            placeholder="Enter the Z coordinate"
            variant="faded"
            isRequired
            isInvalid={isZLocationInvalid}
            onValueChange={(value) => setForm({ ...form, location: [form.location[0], value || undefined] })}
          />

          <Select
            label="Status"
            value={form.operationType}
            placeholder="Select a status"
            variant="faded"
            onSelectionChange={(value) => setForm({ ...form, operationType: Array.from(value).join(',') || undefined })}
            isRequired
            isInvalid={isOperationTypeInvalid}
          >
            {statuses.map((status) => (
              <SelectItem key={status.id} value={status.id}>
                {status.name}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Property Type"
            value={form.propertyType}
            placeholder="Select a property type"
            variant="faded"
            onSelectionChange={(value) => setForm({ ...form, propertyType: Array.from(value).join(',') || undefined })}
            isRequired
            isInvalid={isPropertyTypeInvalid}
          >
            {propertyTypes.map((propertyType) => (
              <SelectItem key={propertyType.id} value={propertyType.id}>
                {propertyType.name}
              </SelectItem>
            ))}
          </Select>

          <Select
            items={towns}
            label="Town"
            value={form.town}
            placeholder="Select a town"
            variant="faded"
            onSelectionChange={(value) => setForm({ ...form, town: Array.from(value).join(',') || undefined })}
            isRequired
            isInvalid={isTownInvalid}
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
              <SelectItem key={town.id} value={town.id}>
                <div className="flex items-center gap-2">
                  <Avatar alt={town.name} src={imageLoader({ src: town.icon, width: 24 })} className="w-6 h-6 text-tiny" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{town.name}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>

          <Button
            color="primary"
            variant="shadow"
            className="col-span-2"
            isDisabled={
              isPlotInvalid ||
              isFirstPriceInvalid ||
              isXLocationInvalid ||
              isZLocationInvalid ||
              isOperationTypeInvalid ||
              isPropertyTypeInvalid ||
              isTownInvalid ||
              (isPriceRange && isSecondPriceInvalid)
            }
            isLoading={isSubmitting}
            onPress={handleSubmit}
          >
            Add Listing
          </Button>

        </div>
      </div>
    </>
  );
};

export default AddListing;