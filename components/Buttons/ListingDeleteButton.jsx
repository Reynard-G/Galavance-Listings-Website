import { useState } from "react";
import { Button } from "@nextui-org/button";
import ConfirmationModal from "@components/Modals/ConfirmationModal";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

const ListingDeleteButton = ({ id, plot, onDelete }) => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleDelete = async () => {
    await fetch(`/api/listing`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).then(() => {
      setIsConfirmationVisible(false);
      onDelete();
    }).catch(() => {
      setIsConfirmationVisible(false);
    });
  };

  return (
    <>
      <ConfirmationModal
        visible={isConfirmationVisible}
        title="Delete Listing"
        buttonText="Delete"
        onConfirmed={handleDelete}
        onCancel={() => setIsConfirmationVisible(false)}
      >
        Are you sure you want to delete <b>{plot}</b>? There is no going back, all data will immediately be removed.
      </ConfirmationModal>

      <Button
        size="sm"
        color="danger"
        variant="ghost"
        className="w-1/2"
        onPress={() => setIsConfirmationVisible(true)}
        startContent={<DeleteRoundedIcon fontSize="small" />}
      >
        Delete
      </Button>
    </>
  );
};

export default ListingDeleteButton;