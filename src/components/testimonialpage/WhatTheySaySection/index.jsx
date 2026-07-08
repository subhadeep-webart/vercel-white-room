"use client";

import NoiseComponent from "@/components/common/NoiseComponent";
import { useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const WhatTheySaySection = ({ whatTheySay }) => {
  const clients = whatTheySay?.clients ?? [];
  const swiperRef = useRef(null);
  const rafRef = useRef(null);

  // Brighten whichever slide is under the fixed center spotlight and
  // dim the rest based on distance from center. Read live on-screen
  // positions every frame so it stays accurate during autoplay + loop.
  const applySpotlight = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) return;
    const vpRect = swiper.el.getBoundingClientRect();
    const vpCenter = vpRect.left + vpRect.width / 2;
    swiper.slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const dist = Math.abs(slideCenter - vpCenter);
      const t = Math.max(0, Math.min(1, 1 - dist / (rect.width * 0.9)));
      slide.style.opacity = String(0.3 + t * 0.7);
    });
  }, []);

  // Drive the spotlight on every animation frame while mounted.
  useGSAP(() => {
    const tick = () => {
      applySpotlight();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applySpotlight]);

  return (
    <>
      <section className="pt-20 pb-20 bg-black relative overflow-hidden">
        <NoiseComponent />
        <div className="container">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-white font-bold text-xl md:text-[45px] ">
              {whatTheySay?.title}
            </h3>
            <p className="text-base md:text-xl font-normal text-[#8F8F8F] text-center">
              {whatTheySay?.description}
            </p>
          </div>

          <div
            className="relative overflow-hidden py-12 md:py-16"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent)",
            }}
          >
            {/* Fixed center spotlight box — never moves. */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[129px] bg-[#1B1E25] z-0" />

            {clients.length > 0 && (
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                centeredSlides={true}
                loop={true}
                grabCursor={true}
                speed={2000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="relative z-10"
              >
                {clients.map((client, index) => (
                  <SwiperSlide
                    key={index}
                    className="!w-[350px] flex flex-col items-center justify-center text-center"
                  >
                    <p className="font-bold text-white text-xl whitespace-nowrap">
                      {client?.client_name}
                    </p>
                    <p className="font-normal text-[15px] text-[#8F8F8F] whitespace-nowrap">
                      {client?.client_location}
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="flex items-center justify-center md:pb-20">
            <button
              onClick={() => window.open(whatTheySay?.button_url, "_blank")}
              className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium text-[17px] w-[163px] h-[54px] overflow-hidden transition-all duration-300 hover:text-white"
            >
              {whatTheySay?.button_text}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatTheySaySection;
