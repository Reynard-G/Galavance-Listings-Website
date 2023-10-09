import { useState, useMemo } from 'react';
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
  const [processedListings, setProcessedListings] = useState(listings);
  const [sortValue, setSortValue] = useState('');
  const [filters, setFilters] = useState({
    propertyStatus: "sale",
    sale: {
      price: [0, 1000000],
      beds: [],
      baths: [],
      homeType: ""
    },
    rent: {
      price: [0, 10000],
      beds: [],
      baths: []
    }
  });

  useMemo(() => {
    // Filter
    let filteredListings = [...listings];
    // Filter by property status
    filteredListings = filteredListings.filter(listing => listing.status.toLowerCase() === filters.propertyStatus.toLowerCase());
    // Filter by price & price ranges
    filteredListings = filteredListings.filter(listing => listing.price >= filters[filters.propertyStatus].price[0] && listing.price <= filters[filters.propertyStatus].price[1] || (filters[filters.propertyStatus].price[0] <= listing.price[0] && listing.price[0] <= filters[filters.propertyStatus].price[1]) || (filters[filters.propertyStatus].price[0] <= listing.price[1] && listing.price[1] <= filters[filters.propertyStatus].price[1]));
    // Filter by beds
    if (filters[filters.propertyStatus].beds.length > 0) {
      filteredListings = filteredListings.filter(listing => filters[filters.propertyStatus].beds.includes(listing.beds));
    }
    // Filter by baths
    if (filters[filters.propertyStatus].baths.length > 0) {
      filteredListings = filteredListings.filter(listing => filters[filters.propertyStatus].baths.includes(listing.baths));
    }
    // Filter by home type
    if (filters[filters.propertyStatus].homeType !== "" && filters[filters.propertyStatus].homeType != null) {
      filteredListings = filteredListings.filter(listing => listing.propertyType.toLowerCase() === filters[filters.propertyStatus].homeType);
    }

    // Sort
    let sortedListings = [...filteredListings];
    switch (sortValue) {
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
      default:
        break;
    }

    setProcessedListings(sortedListings);
  }, [listings, filters, sortValue]);

  const iconStatusDict = useMemo(() => ({
    "Sale": <AttachMoneyRoundedIcon fontSize='md' />,
    "Rent": <KeyRoundedIcon fontSize='md' />
  }), []);
  const iconPropertyDict = useMemo(() => ({
    "House": <HomeRoundedIcon fontSize='md' />,
    "Apartment": <ApartmentRoundedIcon fontSize='md' />,
    "Industrial": <FactoryRoundedIcon fontSize='md' />,
    "Store": <LocalGroceryStoreRoundedIcon fontSize='md' />,
    "Skyscraper": <BusinessRoundedIcon fontSize='md' />
  }), []);

  return (
    <div className="listings max-h-screen max-w-screen md:w-1/3 flex flex-col">
      <div className="flex items-center justify-between py-5 shadow-lg flex-col flex">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-200 sm:truncate lg:text-3xl animate-fade animate-ease-in-out animate-duration-1000">Properties</h2>
          <p className="lg:text-md mt-3 text-sm text-gray-400 md:text-center animate-fade-up"><strong>{processedListings.length}</strong> listings found</p>
        </div>
        <div className="flex items-center justify-between p-2 gap-2 w-3/4">
          <SortButton sortValue={sortValue} setSortValue={setSortValue} />
          <FiltersButton filters={filters} setFilters={setFilters} />
        </div>
      </div>
      <div className="grid-container flex-grow overflow-auto no-scrollbar h-full">
        {processedListings.length === 0 && (
          <div className="flex flex-col items-center justify-center h-1/2">
            <h3 className="text-2xl font-bold animate-fade-left animate-ease-in-out">No listings found</h3>
            <p className="text-sm text-gray-500 animate-fade-up animate-delay-200">Try changing your filters</p>
          </div>
        )}
        <div className="listings-container grid auto-rows-auto grid-cols-1 gap-2 p-4 md:grid-cols-1 2xl:grid-cols-2">
          {processedListings.map((listing) => (
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