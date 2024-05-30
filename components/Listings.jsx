import { useState, useMemo, useContext } from 'react';

import SortButton from '@components/Buttons/SortButton';
import FiltersButton from '@components/Buttons/FiltersButton';
import ListingCard from '@components/ListingCard';
import { sortAndFilter } from 'lib/ListingsUtils';

import ListingsContext from '@context/ListingsContext';
import DiscordButton from '@components/Buttons/DiscordButton';
import FilterButtonTabKeys from "constants/FilterButtonTabKeys";

const Listings = () => {
  const { listingsInBounds, filteredListings, setFilteredListings } = useContext(ListingsContext);
  const [sortValue, setSortValue] = useState('');
  const [filters, setFilters] = useState({
    propertyStatus: FilterButtonTabKeys.All,
    [FilterButtonTabKeys.All]: {
      price: [0, 100000],
      beds: [],
      bathrooms: [],
      homeType: ""
    },
    [FilterButtonTabKeys.For_Sale]: {
      price: [0, 100000],
      beds: [],
      bathrooms: [],
      homeType: ""
    },
    [FilterButtonTabKeys.For_Rent]: {
      price: [0, 10000],
      beds: [],
      bathrooms: []
    }
  });

  useMemo(() => {
    const sortedListings = sortAndFilter(listingsInBounds, filters, sortValue);

    setFilteredListings(sortedListings);
  }, [listingsInBounds, filters, sortValue, setFilteredListings]);

  return (
    <div className="listings max-h-screen w-full md:w-1/3 flex flex-col">
      <DiscordButton className="absolute top-2 right-2" height="1.5rem" fill="#a3a3a3" />
      <div className="flex items-center justify-between py-5 flex-col">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-neutral-200 sm:truncate lg:text-3xl animate-fade animate-ease-in-out animate-duration-1000">Properties</h2>
          <p className="lg:text-md mt-3 text-sm text-neutral-400 md:text-center animate-fade-up"><strong>{filteredListings.length}</strong> listings found</p>
        </div>
        <div className="flex items-center justify-between p-2 gap-2 w-3/4">
          <SortButton sortValue={sortValue} setSortValue={setSortValue} />
          <FiltersButton filters={filters} setFilters={setFilters} />
        </div>
      </div>
      <div className="grid-container flex-grow overflow-auto shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)] no-scrollbar h-full">
        {filteredListings.length === 0 && (
          <div className="flex flex-col items-center justify-center h-1/2">
            <h3 className="text-2xl font-bold animate-fade-left animate-ease-in-out">No listings found</h3>
            <p className="text-sm text-neutral-400 animate-fade-up animate-delay-200">Try changing your filters or hovering over a larger area</p>
          </div>
        )}
        <div className="listings-container grid auto-rows-auto grid-cols-1 gap-2 p-4 md:grid-cols-1 2xl:grid-cols-2">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.plot} listing={listing} link={`/properties/${listing.id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;