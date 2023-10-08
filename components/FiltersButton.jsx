import { useState } from "react";
import { isMobile } from "react-device-detect";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import { Tabs, Tab } from "@nextui-org/tabs";

import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';

const FiltersButton = ({ listings, setListings }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filters, setFilters] = useState({
    propertyType: "",
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

  const handlePropertyTypeChange = (value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      propertyType: value
    }));
  };

  const handlePriceChange = (value, type) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: {
        ...prevFilters[type],
        price: value
      }
    }));
  };

  const handleBedsChange = (value, type) => {
    // If the user already selected the value, remove it
    if (filters[type].beds.includes(value[0])) {
      setFilters(prevFilters => ({
        ...prevFilters,
        [type]: {
          ...prevFilters[type],
          beds: prevFilters[type].beds.filter(bed => bed !== value[0])
        }
      }));
      return;
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: {
        ...prevFilters[type],
        beds: value
      }
    }));
  };

  const handleBathsChange = (value, type) => {
    // If the user already selected the value, remove it
    if (filters[type].baths.includes(value[0])) {
      setFilters(prevFilters => ({
        ...prevFilters,
        [type]: {
          ...prevFilters[type],
          baths: prevFilters[type].baths.filter(bath => bath !== value[0])
        }
      }));
      return;
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: {
        ...prevFilters[type],
        baths: value
      }
    }));
  };

  const handleHomeTypeChange = (value, type) => {
    // If the user already selected the value, remove it
    if (filters[type].homeType === value) {
      setFilters(prevFilters => ({
        ...prevFilters,
        [type]: {
          ...prevFilters[type],
          homeType: ""
        }
      }));
      return;
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: {
        ...prevFilters[type],
        homeType: value
      }
    }));
  };

  /* 
  Title: Filters
  Header: For Sale & For Rent Buttons
  Content:
    - Price Range (2 way Slider)
    - Bedrooms Range
    - Bathrooms Range
    - Property Type (Button Icons)
  */

  return (
    <>
      <Button
        size="lg"
        radius="sm"
        onPress={onOpen}
        startContent={<FilterAltRoundedIcon />}
        className="shadow-lg"
      >
        Filters
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <Tabs
            aria-label="Sale or Rent Tabs"
            className="flex flex-col items-center justify-center mt-4"
            onSelectionChange={(propertyType) => handlePropertyTypeChange(propertyType)}
            selectedKey={filters.propertyType}
          >
            <Tab key="sale" title="For Sale">
              <Divider />
              <ModalBody>
                <h3 className="text-2xl font-bold text-left">Price</h3>
                {/* Slider Range */}
                <p>Slider Here</p>
                <Divider />
                <h3 className="text-2xl font-bold text-left">Beds</h3>
                <ButtonGroup size={isMobile ? 'sm' : 'md'}>
                  <Button
                    variant={filters.sale.beds.includes(1) ? "solid" : "ghost"}
                    onClick={() => handleBedsChange([1], "sale")}
                  >
                    1
                  </Button>
                  <Button
                    variant={filters.sale.beds.includes(2) ? "solid" : "ghost"}
                    onClick={() => handleBedsChange([2], "sale")}
                  >
                    2
                  </Button>
                  <Button
                    variant={filters.sale.beds.includes(3) ? "solid" : "ghost"}
                    onClick={() => handleBedsChange([3], "sale")}
                  >
                    3
                  </Button>
                  <Button
                    variant={filters.sale.beds.includes(4) ? "solid" : "ghost"}
                    onClick={() => handleBedsChange([4], "sale")}
                  >
                    4
                  </Button>
                  <Button
                    variant={filters.sale.beds.includes(5) ? "solid" : "ghost"}
                    onClick={() => handleBedsChange([5], "sale")}
                  >
                    5+
                  </Button>
                </ButtonGroup>
                <Divider />
                <h3 className="text-2xl font-bold text-left">Baths</h3>
                <ButtonGroup size={isMobile ? 'sm' : 'md'}>
                  <Button
                    variant={filters.sale.baths.includes(1) ? "solid" : "ghost"}
                    onClick={() => handleBathsChange([1], "sale")}
                  >
                    1
                  </Button>
                  <Button
                    variant={filters.sale.baths.includes(2) ? "solid" : "ghost"}
                    onClick={() => handleBathsChange([2], "sale")}
                  >
                    2
                  </Button>
                  <Button
                    variant={filters.sale.baths.includes(3) ? "solid" : "ghost"}
                    onClick={() => handleBathsChange([3], "sale")}
                  >
                    3
                  </Button>
                  <Button
                    variant={filters.sale.baths.includes(4) ? "solid" : "ghost"}
                    onClick={() => handleBathsChange([4], "sale")}
                  >
                    4
                  </Button>
                  <Button
                    variant={filters.sale.baths.includes(5) ? "solid" : "ghost"}
                    onClick={() => handleBathsChange([5], "sale")}
                  >
                    5+
                  </Button>
                </ButtonGroup>
                <Divider />
                <h3 className="text-2xl font-bold text-left">Home Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <Button
                    variant={filters.sale.homeType === "house" ? "solid" : "ghost"}
                    onClick={() => handleHomeTypeChange("house", "sale")}
                  >
                    <HomeRoundedIcon />
                    House
                  </Button>
                  <Button
                    variant={filters.sale.homeType === "apartment" ? "solid" : "ghost"}
                    onClick={() => handleHomeTypeChange("apartment", "sale")}
                  >
                    <ApartmentRoundedIcon />
                    Apartment
                  </Button>
                  <Button
                    variant={filters.sale.homeType === "industrial" ? "solid" : "ghost"}
                    onClick={() => handleHomeTypeChange("industrial", "sale")}
                  >
                    <FactoryRoundedIcon />
                    Industrial
                  </Button>
                  <Button
                    variant={filters.sale.homeType === "store" ? "solid" : "ghost"}
                    onClick={() => handleHomeTypeChange("store", "sale")}
                  >
                    <LocalGroceryStoreRoundedIcon />
                    Store
                  </Button>
                  <Button
                    variant={filters.sale.homeType === "skyscraper" ? "solid" : "ghost"}
                    onClick={() => handleHomeTypeChange("skyscraper", "sale")}
                  >
                    <BusinessRoundedIcon />
                    Skyscraper
                  </Button>
                </div>
              </ModalBody>
            </Tab>
            <Tab key="rent" title="For Rent">
              <Divider />
              <ModalBody>
                <h3 className="text-2xl font-bold text-left">Price</h3>
                {/* Slider Range */}
                <p>Slider Here</p>
                <Divider />
                <h3 className="text-2xl font-bold text-left">Beds</h3>
                <ButtonGroup size={isMobile ? 'sm' : 'md'}>
                  <Button
                    variant={filters.rent.beds.includes(1) ? "solid" : "ghost"}
                    onClick={() => handleBedsChange([1], "rent")}
                  >
                    1
                  </Button>
                  <Button
                    variant={filters.rent.beds.includes(2) ? "solid" : "ghost"}
                    onClick={() => handleBedsChange([2], "rent")}
                  >
                    2
                  </Button>
                  <Button
                    variant={filters.rent.beds.includes(3) ? "solid" : "ghost"}
                    onClick={() => handleBedsChange([3], "rent")}
                  >
                    3
                  </Button>
                  <Button
                    variant={filters.rent.beds.includes(4) ? "solid" : "ghost"}
                    onClick={() => handleBedsChange([4], "rent")}
                  >
                    4
                  </Button>
                  <Button
                    variant={filters.rent.beds.includes(5) ? "solid" : "ghost"}
                    onClick={() => handleBedsChange([5], "rent")}
                  >
                    5+
                  </Button>
                </ButtonGroup>
                <Divider />
                <h3 className="text-2xl font-bold text-left">Baths</h3>
                <ButtonGroup size={isMobile ? 'sm' : 'md'}>
                  <Button
                    variant={filters.rent.baths.includes(1) ? "solid" : "ghost"}
                    onClick={() => handleBathsChange([1], "rent")}
                  >
                    1
                  </Button>
                  <Button
                    variant={filters.rent.baths.includes(2) ? "solid" : "ghost"}
                    onClick={() => handleBathsChange([2], "rent")}
                  >
                    2
                  </Button>
                  <Button
                    variant={filters.rent.baths.includes(3) ? "solid" : "ghost"}
                    onClick={() => handleBathsChange([3], "rent")}
                  >
                    3
                  </Button>
                  <Button
                    variant={filters.rent.baths.includes(4) ? "solid" : "ghost"}
                    onClick={() => handleBathsChange([4], "rent")}
                  >
                    4
                  </Button>
                  <Button
                    variant={filters.rent.baths.includes(5) ? "solid" : "ghost"}
                    onClick={() => handleBathsChange([5], "rent")}
                  >
                    5+
                  </Button>
                </ButtonGroup>
              </ModalBody>
            </Tab>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FiltersButton;