import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { PropertyImageDto } from "../../_types/property";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
interface ImageCarouselProps {
  images: PropertyImageDto[];
  name?: string;
}

export function ImageCarousel({ images, name }: ImageCarouselProps) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-gray-400">
          image_not_supported
        </span>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      className="rounded-xl shadow-md"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src.file}
            alt={`${name || "Imagen"} ${index + 1}`}
            className="w-full h-80 object-cover rounded-xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
