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
            src={image}
            alt={listing.plot}
            isZoomed
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;