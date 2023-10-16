import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const imageLoader = ({ src, width }) => {
  return `https://ik.imagekit.io/milklegend/tr:w-${width}/${src}`;
}

const Carousel = ({ listing }) => {
  const width = 480;
  const height = 240;

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
      {listing.images.map((image, index) => (
        <SwiperSlide key={image}>
          <Image
            as={NextImage}
            src={imageLoader({ src: image, width: width })}
            alt={listing.plot}
            priority={index === 0 ? true : false}
            width={width}
            height={height}
            isZoomed
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;