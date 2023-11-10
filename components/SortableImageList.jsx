import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { imageLoader } from "@lib/ListingsUtils";

import ConfirmationModal from "@components/Modals/ConfirmationModal";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const SortableImageList = ({ images, setImages, ...props }) => {
  const [deleteImage, setDeleteImage] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDelete = (image) => {
    setDeleteImage(image);
    setConfirmVisible(true);
  }

  return (
    <>
      <ConfirmationModal
        visible={confirmVisible}
        title="Delete image"
        buttonText="Delete"
        onConfirmed={() => {
          setImages(images.filter((img) => img !== deleteImage));
          setConfirmVisible(false);
        }}
        onCancel={() => setConfirmVisible(false)}
      >
        Are you sure you want to delete the image <span className="font-bold">{deleteImage}</span>?
      </ConfirmationModal>

      <Card {...props}>
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md">Images</p>
            <p className="text-sm text-default-500">Sort images by dragging them</p>
          </div>
        </CardHeader>

        <CardBody>
          <ReactSortable
            list={images}
            setList={setImages}
            animation={250}
            className="grid grid-cols-4 gap-2"
          >
            {images.map((image) => (
              <div className="relative" key={image}>
                <Image
                  key={image}
                  src={imageLoader({ src: image, width: 296 })}
                  alt={image}
                  className="rounded-md shadow-md cursor-move"
                  draggable={false}
                />
                <DeleteRoundedIcon
                  className="absolute bottom-2 right-2 cursor-pointer z-10"
                  fontSize="medium"
                  onClick={() => handleDelete(image)}
                />
              </div>
            ))}
          </ReactSortable>
        </CardBody>
      </Card>
    </>
  );
};

export default SortableImageList;