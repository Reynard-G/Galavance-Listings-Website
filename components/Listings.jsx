import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Chip } from '@nextui-org/chip';
import Carousel from './Carousel';
import SortButton from './SortButton';
import FiltersButton from './FiltersButton';

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

  return (
    <div className="listings max-h-screen max-w-screen md:w-1/3 flex flex-col">
      <div className="flex items-center justify-between py-5 shadow-lg flex-col flex">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-200 sm:truncate lg:text-3xl animate-fade animate-ease-in-out animate-duration-1000">Properties</h2>
          <p className="lg:text-md mt-3 text-sm text-gray-400 md:text-center animate-fade-up"><strong>{listings.length}</strong> listings found</p>
        </div>
        <div className="flex items-center justify-between p-2 gap-2 w-3/4">
          <SortButton listings={listings} setSortedListings={setSortedListings} />
          <FiltersButton />
        </div>
      </div>
      <div className="grid-container flex-grow overflow-auto no-scrollbar h-full">
        {sortedListings.length === 0 && (
          <div className="flex flex-col items-center justify-center h-1/2">
            <h3 className="text-2xl font-bold animate-fade-left animate-ease-in-out">No listings found</h3>
            <p className="text-sm text-gray-500 animate-fade-up animate-delay-200">Try changing your filters</p>
          </div>
        )}
        <div className="listings-container grid auto-rows-auto grid-cols-1 gap-2 p-4 md:grid-cols-1 2xl:grid-cols-2">
          {sortedListings.map((listing) => (
            <Card
              key={listing.plot}
              isPressable
              onClick={() => window.open(`/properties/${listing.plot}`, '_blank')}
              className='shadow-md !transition !duration-300 hover:shadow-2xl animate-fade'
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