import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import GppBadRoundedIcon from '@mui/icons-material/GppBadRounded';

const ErrorModal = ({ visible, children, title, onConfirmed }) => {
  return (
    <Modal backdrop="blur" isOpen={visible} className="w-11/12 md:w-1/2 mx-auto">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="flex justify-center">
            <GppBadRoundedIcon className="text-red-500" sx={{ fontSize: '500%' }} />
          </div>
          <p className="text-center">{children}</p>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-center gap-2">
            <Button variant="ghost" color="warning" onPress={onConfirmed}>
              I understand
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal >
  );
}

export default ErrorModal;