import { ReactSortable } from "react-sortablejs";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { imageLoader } from "@lib/ListingsUtils";

const SortableImageList = ({ images, setImages }) => {
  return (
    <Card className="col-span-full">
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
            <Image
              key={image}
              src={imageLoader({ src: image, width: 296 })}
              alt={image}
              className="rounded-md shadow-md cursor-move"
              draggable={false}
            />
          ))}
        </ReactSortable>
      </CardBody>
    </Card>
  );
};

export default SortableImageList;