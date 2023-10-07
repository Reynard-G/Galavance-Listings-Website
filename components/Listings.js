import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Chip, Select, SelectItem } from '@nextui-org/react';
import Carousel from './Carousel';

import SquareFootRoundedIcon from '@mui/icons-material/SquareFootRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';

const Listings = ({ listings }) => {
  const [sortedListings, setSortedListings] = useState(listings);
  const [sortValue, setSortValue] = useState('newest');

  const iconStatusDict = {
    "For Sale": <AttachMoneyRoundedIcon fontSize='md' />,
    "For Rent": <KeyRoundedIcon fontSize='md' />
  };
  const iconPropertyDict = {
    "House": <HomeRoundedIcon fontSize='md' />,
    "Apartment": <ApartmentRoundedIcon fontSize='md' />,
    "Industrial": <FactoryRoundedIcon fontSize='md' />,
    "Store": <LocalGroceryStoreRoundedIcon fontSize='md' />,
    "Skyscraper": <BusinessRoundedIcon fontSize='md' />
  };
  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price (High to Low)', value: 'priceHigh' },
    { label: 'Price (Low to High)', value: 'priceLow' },
    { label: 'Size (High to Low)', value: 'sizeHigh' },
    { label: 'Size (Low to High)', value: 'sizeLow' },
    { label: 'Beds (High to Low)', value: 'bedsHigh' },
    { label: 'Beds (Low to High)', value: 'bedsLow' },
    { label: 'Baths (High to Low)', value: 'bathsHigh' },
    { label: 'Baths (Low to High)', value: 'bathsLow' },
  ];

  const sortListings = (value) => {
    let sortedListings = [...listings];
    switch (value) {
      case 'newest':
        sortedListings.sort((a, b) => b.listedOn - a.listedOn);
        break;
      case 'priceHigh':
        sortedListings.sort((a, b) => b.price - a.price);
        break;
      case 'priceLow':
        sortedListings.sort((a, b) => a.price - b.price);
        break;
      case 'sizeHigh':
        sortedListings.sort((a, b) => b.propertySizeSq - a.propertySizeSq);
        break;
      case 'sizeLow':
        sortedListings.sort((a, b) => a.propertySizeSq - b.propertySizeSq);
        break;
      case 'bedsHigh':
        sortedListings.sort((a, b) => b.beds - a.beds);
        break;
      case 'bedsLow':
        sortedListings.sort((a, b) => a.beds - b.beds);
        break;
      case 'bathsHigh':
        sortedListings.sort((a, b) => b.baths - a.baths);
        break;
      case 'bathsLow':
        sortedListings.sort((a, b) => a.baths - b.baths);
        break;
      default:
        break;
    }

    setSortValue(value);
    setSortedListings(sortedListings);
  };

  // Update sorted listings on map bounds change
  useEffect(() => {
    sortListings(sortValue);
  }, [listings]);

  return (
    <div className="listings max-h-screen max-w-screen md:w-1/3 flex flex-col">
      <div className="flex items-center justify-between py-5 shadow-lg flex-col flex">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-200 sm:truncate lg:text-3xl">Properties</h2>
          <p className="lg:text-md mt-3 text-sm text-gray-400 md:text-center">{listings.length} listings found</p>
        </div>
        <div className="flex items-center justify-between p-3 w-3/4">
          <Select
            size="sm"
            radius="md"
            label="Sort by"
            className="shadow-lg"
            onChange={(e) => sortListings(e.target.value)}
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid-container flex-grow overflow-auto no-scrollbar h-full">
        <div className="listings-container grid auto-rows-auto grid-cols-1 gap-2 p-4 md:grid-cols-1 2xl:grid-cols-2">
          {sortedListings.map((listing) => (
            <Card
              key={listing.plot}
              isPressable
              onClick={() => window.open(`/properties/${listing.plot}`, '_blank')}
              className='shadow-md !transition !duration-300 hover:shadow-2xl'
            >
              <div className="carousel-container relative w-full">
                <Chip startContent={iconStatusDict[listing.status]} color="success" size="sm" variant="shadow" className="absolute top-2 right-2 z-10">
                  {listing.status}
                </Chip>
                <Chip startContent={iconPropertyDict[listing.propertyType]} color="secondary" radius="sm" size="sm" variant="shadow" className="absolute bottom-2 left-2 z-10">
                  {listing.propertyType}
                </Chip>
                <Carousel listing={listing} />
              </div>
              <CardBody className="overflow-hidden pt-2 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <SquareFootRoundedIcon className="mr-1" fontSize='md' />
                    <p className="text-sm text-gray-500">{listing.propertySizeSq} m<sup>2</sup></p>
                  </div>
                  <div className="flex items-center">
                    <HotelRoundedIcon className="mr-1" fontSize='md' />
                    <p className="text-sm text-gray-500">{listing.beds} bds</p>
                  </div>
                  <div className="flex items-center">
                    <ShowerRoundedIcon className="mr-1" fontSize='md' />
                    <p className="text-sm text-gray-500">{listing.baths} ba</p>
                  </div>
                </div>
              </CardBody>
              <Divider />
              <CardHeader className="pt-2">
                <p className="text-lg font-bold">{listing.price[1]
                  ? `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listing.price[0])} - ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listing.price[1])}`
                  : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listing.price)}</p>
              </CardHeader>
              <CardFooter className="flex items-center justify-between pt-0">
                <p className="text-sm text-gray-500">{listing.plot}</p>
                <p className="text-sm text-gray-500">{listing.city}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;;