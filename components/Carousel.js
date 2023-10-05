import { Image } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";

const Carousel = ({ slides, options }) => {
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.images.map((image, index) => (
            <div className="embla__slide" key={index}>
              <Image
                src={image}
                alt={slides.plot}
                className="embla__slide__img object-cover z-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;