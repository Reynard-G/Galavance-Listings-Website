import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { imageLoader } from "@lib/ListingsUtils";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ImageCarousel = ({ listing, width = 480, height = 240 }) => {
  return (
    <Swiper
      loop={true}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ dynamicBullets: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      style={{
        '--swiper-pagination-color': '#D4D4D8',
        '--swiper-pagination-bullet-inactive-color': '#D4D4D8',
        '--swiper-navigation-color': '#D4D4D8',
        '--swiper-navigation-size': '1.5rem'
      }}
    >
      {listing.images.map((image, index) => (
        <SwiperSlide key={image}>
          <Image
            as={NextImage}
            src={imageLoader({ src: image, width: width })}
            alt={listing.plot}
            width={width}
            height={height}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;