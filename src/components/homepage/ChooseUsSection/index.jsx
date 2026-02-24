"use client";

import FiveStar from "@/components/common/ui/five-star";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { A11y } from "swiper";
import "swiper/css";
import TickerWrapper from "@/components/common/TickerWrapper";

SwiperCore.use([A11y]);

const ChooseUsSection = ({ reviewData }) => {
  gsap.registerPlugin(ScrollTrigger);

  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".choose-card");

    cards.forEach((card, i) => {
      const stars = card.querySelector(".choose-stars");
      const lines = card.querySelectorAll(".choose-line");

      // Flip in card
      gsap.from(card, {
        rotateY: 90,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (stars) {
        gsap.from(stars, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.3 + 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      gsap.from(lines, {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        delay: i * 0.3 + 0.8,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  }, []);

  return (
    <section className="w-full bg-[#0F1116] relative">
      <section
        className="bg-no-repeat bg-center py-12 commonBg flex flex-col"
        ref={sectionRef}
      >
        <div className="!z-10 relative mb-[100px] mt-[200px]">
          <TickerWrapper>
            <h3 className="outline_text text-4xl md:text-[150px] text-center uppercase">
              {reviewData?.title} &nbsp;  {reviewData?.title} &nbsp; {reviewData?.title} &nbsp; {reviewData?.title} &nbsp; {reviewData?.title} &nbsp;
              {reviewData?.title} &nbsp;  {reviewData?.title} &nbsp; {reviewData?.title} &nbsp;
            </h3>
          </TickerWrapper>
        </div>
        <div className="container !z-0 !py-12">
          <div className="w-full mx-auto">
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              grabCursor={true}
              freeMode={true}
              style={{ alignItems: "center", display: "flex" }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {reviewData?.reviews?.length > 0 ? (
                reviewData?.reviews?.map((review, index) => {
                  const isDark = index % 2 === 0;
                  const cardWidth = isDark
                    ? "w-full min-h-[296px]"
                    : "w-full min-h-[392px]";

                  return (
                    <SwiperSlide
                      key={review?._id}
                      style={{ alignItems: "center", display: "flex" }}
                    >
                      <div
                        className={`choose-card ${cardWidth} flex flex-col gap-4 md:gap-8 justify-center items-center shadow-2xl
      ${isDark ? "bg-[#1B1E25] text-white" : "bg-[#C9C9C9] text-[#3D3D3D]"}
      py-14 px-9`}
                      >
                        <div className="flex flex-row gap-4 justify-center items-center choose-stars">
                          <FiveStar rating={review?.rating} />
                        </div>

                        <p
                          className={`text-center text-sm md:text-[16px] choose-line ${isDark ? "text-[#9E9E9E]" : "text-[#3D3D3D]"
                            }`}
                        >
                          {review?.comment}
                        </p>

                        <p
                          className={`font-bold text-base md:text-lg choose-line text-center ${isDark ? "text-white" : "text-[#3D3D3D]"
                            }`}
                        >
                          {review?.name} ,<span> {review?.position} </span>
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })
              ) : (
                <p className="text-gray-500">No reviews available</p>
              )}
            </Swiper>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ChooseUsSection;
