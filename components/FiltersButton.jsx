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

const FiltersButton = ({ filters, setFilters }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handlePropertyStatusChange = (value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      propertyStatus: value
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
          beds: []
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
          baths: []
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
            onSelectionChange={(propertyStatus) => handlePropertyStatusChange(propertyStatus)}
            selectedKey={filters.propertyStatus}
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
                  {[
                    { type: 1, textValue: "1" },
                    { type: 2, textValue: "2" },
                    { type: 3, textValue: "3" },
                    { type: 4, textValue: "4" },
                    { type: 5, textValue: "5+" }
                  ].map(({ type, textValue }) => (
                    <Button
                      key={type}
                      variant={filters.sale.beds.includes(type) ? "solid" : "ghost"}
                      onClick={() => handleBedsChange([type], "sale")}
                    >
                      {textValue}
                    </Button>
                  ))}
                </ButtonGroup>
                <Divider />
                <h3 className="text-2xl font-bold text-left">Baths</h3>
                <ButtonGroup size={isMobile ? 'sm' : 'md'}>
                  {[
                    { type: 1, textValue: "1" },
                    { type: 2, textValue: "2" },
                    { type: 3, textValue: "3" },
                    { type: 4, textValue: "4" },
                    { type: 5, textValue: "5+" }
                  ].map(({ type, textValue }) => (
                    <Button
                      key={type}
                      variant={filters.sale.baths.includes(type) ? "solid" : "ghost"}
                      onClick={() => handleBathsChange([type], "sale")}
                    >
                      {textValue}
                    </Button>
                  ))}
                </ButtonGroup>
                <Divider />
                <h3 className="text-2xl font-bold text-left">Home Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { type: "house", textValue: "House", icon: <HomeRoundedIcon /> },
                    { type: "apartment", textValue: "Apartment", icon: <ApartmentRoundedIcon /> },
                    { type: "industrial", textValue: "Industrial", icon: <FactoryRoundedIcon /> },
                    { type: "store", textValue: "Store", icon: <LocalGroceryStoreRoundedIcon /> },
                    { type: "skyscraper", textValue: "Skyscraper", icon: <BusinessRoundedIcon /> }
                  ].map(({ type, textValue, icon }) => (
                    <Button
                      key={type}
                      variant={filters.sale.homeType === type ? "solid" : "ghost"}
                      onClick={() => handleHomeTypeChange(type, "sale")}
                    >
                      {icon}
                      {textValue}
                    </Button>
                  ))}
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
                  {[
                    { type: 1, textValue: "1" },
                    { type: 2, textValue: "2" },
                    { type: 3, textValue: "3" },
                    { type: 4, textValue: "4" },
                    { type: 5, textValue: "5+" }
                  ].map(({ type, textValue }) => (
                    <Button
                      key={type}
                      variant={filters.rent.beds.includes(type) ? "solid" : "ghost"}
                      onClick={() => handleBedsChange([type], "rent")}
                    >
                      {textValue}
                    </Button>
                  ))}
                </ButtonGroup>
                <Divider />
                <h3 className="text-2xl font-bold text-left">Baths</h3>
                <ButtonGroup size={isMobile ? 'sm' : 'md'}>
                  {[
                    { type: 1, textValue: "1" },
                    { type: 2, textValue: "2" },
                    { type: 3, textValue: "3" },
                    { type: 4, textValue: "4" },
                    { type: 5, textValue: "5+" }
                  ].map(({ type, textValue }) => (
                    <Button
                      key={type}
                      variant={filters.rent.baths.includes(type) ? "solid" : "ghost"}
                      onClick={() => handleBathsChange([type], "rent")}
                    >
                      {textValue}
                    </Button>
                  ))}
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