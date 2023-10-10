import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Carousel = ({ listing }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      lazyPreloadPrevNext={1}
      loop={true}
      pagination={{ dynamicBullets: true }}
      modules={[Pagination]}
      style={{
        '--swiper-pagination-color': '#D4D4D8',
        '--swiper-pagination-bullet-inactive-color': '#D4D4D8',
      }}
    >
      {listing.images.map((image) => (
        <SwiperSlide key={image}>
          <Image
            as={NextImage}
            src={image}
            alt={listing.plot}
            width={400}
            height={200}
            isZoomed
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;