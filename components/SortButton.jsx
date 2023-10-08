import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/select";

const SortButton = ({ listings, setListings }) => {
  const [sortValue, setSortValue] = useState('newest');

  const sortOptions = [
    { label: 'Newest', textValue: 'Newest', value: 'newest' },
    { label: 'Price', subLabel: 'High to Low', textValue: 'Price (High to Low)', value: 'priceHigh' },
    { label: 'Price', subLabel: 'Low to High', textValue: 'Price (Low to High)', value: 'priceLow' },
    { label: 'Square meter', subLabel: 'High to Low', textValue: 'Square meter (High to Low)', value: 'sizeHigh' },
    { label: 'Square meter', subLabel: 'Low to High', textValue: 'Square meter (Low to High)', value: 'sizeLow' }
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
      default:
        break;
    }

    setListings(sortedListings);
  };

  // Update sorted listings on map bounds change and sort value change
  useEffect(() => {
    sortListings(sortValue);
  }, [listings, sortValue]);

  return (
    <Select
      size="sm"
      radius="md"
      label="Sort by"
      className="shadow-lg"
      onChange={(e) => setSortValue(e.target.value)}
    >
      {sortOptions.map((option) => (
        <SelectItem key={option.value} textValue={option.textValue}>
          <p className="text-sm">{option.label}</p>
          <p className="text-tiny text-gray-500">{option.subLabel}</p>
        </SelectItem>
      ))}
    </Select>
  );
};

export default SortButton;