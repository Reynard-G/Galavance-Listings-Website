import { Card, CardHeader, CardBody, CardFooter, Chip } from '@nextui-org/react';

const Listings = ({ listings }) => {
  return (
    <div className="max-h-screen w-full md:w-1/3 flex flex-col">
      <div className="flex items-center justify-between py-5 shadow-lg md:flex-col hidden md:flex">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-200 sm:truncate lg:text-3xl">Properties</h2>
          <p className="lg:text-md mt-3 text-sm text-gray-400 md:text-center">{listings.length} listings found</p>
        </div>
      </div>
      <div className="grid-container flex-grow overflow-auto no-scrollbar h-full">
        <div className="listings-container grid auto-rows-auto grid-cols-1 gap-2 p-4 md:grid-cols-1 2xl:grid-cols-2">
          {listings.map((listing) => (
            <Card
              key={listing.plot}
              isPressable
              className='shadow-md !transition !duration-300 hover:shadow-2xl'
            >
              <div className="carousel-container relative h-full w-full">
                <Chip color="success" size="sm" variant="flat" className="absolute top-2 right-2">
                  {listing.status}
                </Chip>
                <Chip color="secondary" radius="sm" size="sm" variant="flat" className="absolute bottom-2 left-2">
                  {listing.propertyType}
                </Chip>
              </div>
              <CardHeader>
                <p className="text-lg font-bold">${listing.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              </CardHeader>
              <CardBody>
                <p>{listing.propertySizeSq} sq ft</p>
                <p>{listing.beds} beds</p>
                <p>{listing.baths} baths</p>
              </CardBody>
              <CardFooter>
                <p className='text-sm text-gray-500'>{listing.plot}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;