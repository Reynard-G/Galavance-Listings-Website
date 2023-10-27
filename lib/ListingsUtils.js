export function sortAndFilter(listings, filters, sortValue) {
  // Filter
  let filteredListings = [...listings];
  // Filter by property status
  filteredListings = filteredListings.filter(listing => listing.status.toLowerCase() === filters.propertyStatus.toLowerCase());
  // Filter by price & price ranges
  filteredListings = filteredListings.filter(listing => listing.price >= filters[filters.propertyStatus].price[0] && listing.price[0] <= filters[filters.propertyStatus].price[1] || (filters[filters.propertyStatus].price[0] <= listing.price[0] && listing.price[0] <= filters[filters.propertyStatus].price[1]) || (filters[filters.propertyStatus].price[0] <= listing.price[1] && listing.price[1] <= filters[filters.propertyStatus].price[1]));
  // Filter by beds
  if (filters[filters.propertyStatus].beds.length > 0) {
    filteredListings = filteredListings.filter(listing => filters[filters.propertyStatus].beds.includes(listing.beds));
  }
  // Filter by baths
  if (filters[filters.propertyStatus].bathrooms.length > 0) {
    filteredListings = filteredListings.filter(listing => filters[filters.propertyStatus].bathrooms.includes(listing.bathrooms));
  }
  // Filter by home type
  if (filters[filters.propertyStatus].homeType !== "" && filters[filters.propertyStatus].homeType != null) {
    filteredListings = filteredListings.filter(listing => listing.property_type.toLowerCase() === filters[filters.propertyStatus].homeType);
  }

  // Sort
  let sortedListings = [...filteredListings];
  switch (sortValue) {
    case 'newest':
      sortedListings.sort((a, b) => b.created_at - a.created_at);
      break;
    case 'priceHigh':
      sortedListings.sort((a, b) => b.price[0] - a.price[0]);
      break;
    case 'priceLow':
      sortedListings.sort((a, b) => a.price[0] - b.price[0]);
      break;
    case 'sizeHigh':
      sortedListings.sort((a, b) => b.sq_meters - a.sq_meters);
      break;
    case 'sizeLow':
      sortedListings.sort((a, b) => a.sq_meters - b.sq_meters);
      break;
    default:
      break;
  }

  return sortedListings;
}

export const imageLoader = ({ src, width }) => {
  return `https://ik.imagekit.io/milklegend/tr:w-${width}/${src}`;
};