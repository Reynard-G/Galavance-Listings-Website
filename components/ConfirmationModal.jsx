import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useState } from "react";

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

const ConfirmationModal = ({ visible, children, title, buttonText, onConfirmed, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmed = async () => {
    setIsLoading(true);
    await onConfirmed();
    setIsLoading(false);
  };

  return (
    <Modal isOpen={visible} onClose={onCancel} className="w-11/12 md:w-1/2 mx-auto">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="flex justify-center">
            <ErrorOutlineRoundedIcon className="text-red-500" sx={{ fontSize: '500%' }} />
          </div>
          <p className="text-center">{children}</p>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-center gap-2">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button isLoading={isLoading} color="danger" variant="ghost" onClick={handleConfirmed}>
              {buttonText}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal >
  );
};

export default ConfirmationModal;