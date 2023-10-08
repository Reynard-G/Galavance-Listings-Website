import { isMobile } from "react-device-detect";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Tabs, Tab } from "@nextui-org/tabs";

import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';

const FiltersButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
          <ModalHeader className="flex justify-center">
            <Tabs aria-label="Sale or Rent Tabs">
              <Tab key="sale" title="For Sale">
                
              </Tab>
              <Tab key="rent" title="For Rent">

              </Tab>
            </Tabs>
          </ModalHeader>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FiltersButton;