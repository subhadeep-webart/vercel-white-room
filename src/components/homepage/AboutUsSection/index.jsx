"use client";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./aboutsection.module.scss";
import { useGSAP } from "@gsap/react";
import TickerWrapper from "@/components/common/TickerWrapper";

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = ({ aboutData, aboutImages }) => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 400;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 400;
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
          // markers: true
        },
      });

      tl.from(".about-text", {
        x: -200,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          ".about-text > *",
          {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.5,
          },
          "-=0.4"
        )
        .from(
          ".about-image",
          {
            x: 200,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: "power2.out",
          },
          "<"
        );
    },
    { scope: sectionRef }
  );
  return (
    <section className="w-full bg-[#0F1116] relative">
      <div className="w-full relative z-10 commonBg py-4 bg-[#0F1116]">
        <TickerWrapper isRight={false}>
          <h3 className="outline_text text-4xl md:text-[150px] text-center uppercase">
            {aboutData?.title}
          </h3>
        </TickerWrapper>
      </div>
      <section
        ref={sectionRef}
        className={`${styles.aboutsection_container} container pt-4 pb-12`}
      >
        <div className={`grid grid-cols-12 md:gap-4 py-4 px-2`}>
          <div className="py-16 px-12 col-span-12 lg:col-span-5 bg-black about-text">
            <div
              className="text-[#8F8F8F] font-normal text-base md:text-xl mb-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData?.description }}
            />
          </div>
          <div className="col-span-12 lg:col-span-7 flex items-center about-image">
            <div className="w-[443px] h-[458px] md:w-[745px] lg:w-[879px] lg:h-[526px] relative">
              <Image
                src={
                  "/assets/images/face-home-1.png"
                }
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {aboutImages?.images?.length > 0 && <div className="flex items-center w-full mx-auto z-10">
          <div className="flex flex-col space-y-4 lg:mr-64 mr-6">
            <button
              onClick={scrollLeft}
              className="bg-black bg-opacity-50 text-white rounded-full cursor-pointer"
            >
              <Image
                src="/assets/icons/left-swipe.svg"
                alt="Previous"
                width={94}
                height={94}
              />
            </button>

            <button
              onClick={scrollRight}
              className="bg-black bg-opacity-50 text-white rounded-full cursor-pointer"
            >
              <Image
                src="/assets/icons/right-swipe.svg"
                alt="Next"
                width={94}
                height={94}
              />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar about-image"
            style={{ scrollBehavior: "smooth" }}
          >
            {
              aboutImages?.images?.map((img, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[190px] h-[160px] md:w-[365px] md:h-[262px] rounded overflow-hidden"
                >
                  <Image
                    src={img || "/assets/images/slider-img-1.png"}
                    alt={`Image ${index + 1}`}
                    width={365}
                    height={262}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))
            }
          </div>
        </div>}
      </section>
    </section>
  );
};

export default AboutUsSection;
