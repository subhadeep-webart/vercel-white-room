import { useRef } from "react";
import CoverageSliderNavigation from "./CoverageSliderNavigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Mousewheel } from "swiper/modules";
import FlippingCard from "./FlippingCard";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const CoverageCardSwipper = ({ coverageData }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full flex justify-center relative">
      <Swiper
        modules={[FreeMode, Navigation]}
        // slidesPerView={3}
        // spaceBetween={24}
        speed={600}
        grabCursor={true}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.8,
          momentumBounce: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
             spaceBetween: 12
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 12
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 12
          },
        }}
        loop={true}
        centeredSlides={true}
        // mousewheel={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        className="!py-4"
      >
        {coverageData?.map((item) => (
          <SwiperSlide key={item?._id} className="coverage_swiper_slider">
            <FlippingCard pressCoverages={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <CoverageSliderNavigation prevRef={prevRef} nextRef={nextRef} />
    </div>
  );
};

export default CoverageCardSwipper;
