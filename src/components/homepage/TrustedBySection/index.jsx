"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import TickerWrapper from "@/components/common/TickerWrapper";
import { poppins } from "@/lib/font";
import "swiper/css";

const TrustedBySection = ({ trustedByData }) => {
  const logos =
    trustedByData?.clients?.filter((client) => client?.client_logo) || [];

  return (
    <section className="w-full relative bg-[#0F1116] commonBg">
      <div className="py-8">
        <div className="mb-[50px] md:mb-[100px] mt-[100px] md:mt-[200px]">
          <TickerWrapper isRight={false}>
            <h3
              className={`${poppins.className} outline_text text-center uppercase`}
            >
              {trustedByData?.home_page_title || trustedByData?.title}
            </h3>
          </TickerWrapper>
        </div>
        <div className="container !py-12">
          <div className="mt-4 lg:mt-24">
            {logos.length > 0 ? (
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={24}
                loop={true}
                grabCursor={true}
                speed={2000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  reverseDirection: true,
                }}
                allowTouchMove={true}
                className="!ease-linear w-full trusted-swiper"
              >
                {logos.map((client, index) => (
                  <SwiperSlide key={index} className="!w-[350px] flex-shrink-0">
                    <Image
                      src={client.client_logo}
                      alt={
                        client?.client_name || `Trusted by logo ${index + 1}`
                      }
                      width={350}
                      height={160}
                      className="object-contain w-[350px] h-[160px]"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-gray-500 text-center">
                No trusted logos available
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
