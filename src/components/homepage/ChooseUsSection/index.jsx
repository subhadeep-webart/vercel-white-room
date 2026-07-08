"use client";

import FiveStar from "@/components/common/ui/five-star";
import { useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import TickerWrapper from "@/components/common/TickerWrapper";
import { poppins } from "@/lib/font";

const ChooseUsSection = ({ reviewData }) => {
  const reviews = reviewData?.reviews ?? [];
  const swiperRef = useRef(null);
  const rafRef = useRef(null);

  // Blend between two [r,g,b] colors. p=0 -> a, p=1 -> b.
  const mix = (a, b, p) =>
    `rgb(${Math.round(a[0] + (b[0] - a[0]) * p)}, ${Math.round(
      a[1] + (b[1] - a[1]) * p
    )}, ${Math.round(a[2] + (b[2] - a[2]) * p)})`;

  // Dark (side) and light (spotlight) endpoints for each animated element.
  const CARD_DARK = [27, 30, 37]; // #1B1E25
  const CARD_LIGHT = [201, 201, 201]; // #C9C9C9
  const COMMENT_DARK = [158, 158, 158]; // #9E9E9E
  const COMMENT_LIGHT = [61, 61, 61]; // #3D3D3D
  const AUTHOR_DARK = [255, 255, 255]; // #fff
  const AUTHOR_LIGHT = [61, 61, 61]; // #3D3D3D

  // Brighten whichever slide sits under the fixed center spotlight and
  // dim the rest by distance from center. Read live on-screen positions
  // every frame so it stays accurate during autoplay + loop.
  const applySpotlight = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) return;
    const vpRect = swiper.el.getBoundingClientRect();
    const vpCenter = vpRect.left + vpRect.width / 2;
    swiper.slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const dist = Math.abs(slideCenter - vpCenter);
      // t: 1 at dead center, easing to 0 by one full slide away.
      const t = Math.max(0, Math.min(1, 1 - dist / (rect.width + 20)));
      // The centered (spotlight) card scales up and turns light; the rest
      // shrink slightly, dim, and stay dark.
      const isCenter = dist < rect.width / 2;
      const card = slide.querySelector(".choose-card");
      if (card) {
        card.style.opacity = String(0.35 + t * 0.65);
        // Continuous scale: side cards sit at 0.9, spotlight grows to 1.15.
        card.style.transform = `scale(${0.9 + t * 0.25})`;

        // Color ramp: sharpen t so the card is fully light near center but
        // still blends smoothly frame-by-frame instead of snapping at a
        // threshold. p eases in over the last ~half slide toward center.
        const p = Math.pow(t, 2);
        card.style.backgroundColor = mix(CARD_DARK, CARD_LIGHT, p);
        card.style.boxShadow = `0 20px 60px rgba(0,0,0,${0.15 + p * 0.35})`;
        card.style.zIndex = isCenter ? "500" : "1";

        const comment = card.querySelector(".choose-comment");
        const author = card.querySelector(".choose-author");
        if (comment) {
          comment.style.color = mix(COMMENT_DARK, COMMENT_LIGHT, p);
        }
        if (author) {
          author.style.color = mix(AUTHOR_DARK, AUTHOR_LIGHT, p);
        }
      }
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
    <section className="w-full bg-[#0F1116] relative">
      <section className="bg-no-repeat bg-center commonBg flex flex-col">
        <div className="!z-10 relative mb-[50px] md:mb-[100px] mt-[100px] md:mt-[200px]">
          <TickerWrapper isRight={false}>
            <h3
              className={`${poppins.className} outline_text text-center uppercase`}
            >
              {reviewData?.title}
            </h3>
          </TickerWrapper>
        </div>
        <div className="container !z-0 !py-12">
          <div
            className="relative w-full mx-auto overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            }}
          >
            {reviews.length > 0 ? (
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                centeredSlides={true}
                // loopedSlides={reviews.length}
                // loopAdditionalSlides={reviews.length}
                spaceBetween={24}
                loop={true}
                grabCursor={true}
                speed={3000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="!ease-linear w-full"
              >
                {[...reviews, ...reviews].map((review, index) => (
                  <SwiperSlide
                    key={review?._id ?? index}
                    className="!w-[350px] flex items-center justify-center"
                  >
                    <div className="choose-card relative w-full h-[340px] flex flex-col gap-4 md:gap-6 justify-center items-center bg-[#1B1E25] text-white py-10 px-9 will-change-transform overflow-hidden">
                      <div className="flex flex-row gap-4 justify-center items-center choose-stars">
                        <FiveStar rating={review?.rating} />
                      </div>

                      <p className="choose-comment text-center text-sm md:text-[16px] choose-line text-[#9E9E9E] line-clamp-4">
                        {review?.comment}
                      </p>

                      <p className="choose-author font-bold text-base md:text-lg choose-line text-center text-white">
                        {review?.name} ,<span> {review?.position} </span>
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-gray-500 text-center">No reviews available</p>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default ChooseUsSection;
