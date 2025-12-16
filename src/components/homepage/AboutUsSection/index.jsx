"use client";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./aboutsection.module.scss";
import { useGSAP } from "@gsap/react";

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

  // const scrollLeft = () => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollBy({
  //       left: -365,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // const scrollRight = () => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollBy({
  //       left: 365,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.fromTo(
  //       ".about-text",
  //       { x: -150, opacity: 0 },
  //       {
  //         scrollTrigger: {
  //           trigger: ".about-text",
  //           start: "top 50%",
  //           toggleActions: "play reverse play reverse",
  //         },
  //         x: 0,
  //         opacity: 1,
  //         ease: "power2.out",
  //         duration: 0.25,
  //       }
  //     );

  //     gsap.fromTo(
  //       ".about-image",
  //       {
  //         x: 100,
  //         opacity: 0,
  //         scale: 0.9,
  //       },
  //       {
  //         scrollTrigger: {
  //           trigger: ".about-image",
  //           start: "top 30%",
  //           toggleActions: "play reverse play reverse",
  //         },
  //         x: 0,
  //         opacity: 1,
  //         scale: 1,
  //         ease: "power1.out",
  //         duration: 0.1,
  //       }
  //     );

  //   }, sectionRef);

  //   return () => ctx.revert();
  // }, [sectionRef]);

  // useEffect(() => {
  //   const animationConfig = {
  //     opacity: 0,
  //     y: 40,
  //     ease: "power2.out",
  //     duration: 0.3,
  //   };

  //   gsap.from(".follow-instagram", {
  //     ...animationConfig,
  //     x: -100,
  //     scrollTrigger: {
  //       trigger: ".follow-instagram",
  //       toggleActions: "play reverse play reverse",
  //       scrub: false,
  //     },
  //   });

  //   gsap.from(".latest-concert", {
  //     ...animationConfig,
  //     x: 100,
  //     scrollTrigger: {
  //       trigger: ".latest-concert",
  //       toggleActions: "play reverse play reverse",
  //     },
  //   });

  //   gsap.from(".latest-image", {
  //     opacity: 0,
  //     y: 50,
  //     ease: "power2.out",
  //     duration: 0.3,
  //     scrollTrigger: {
  //       trigger: ".latest-image",
  //       toggleActions: "play reverse play reverse",
  //     },
  //   });

  //   return () => {
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  //   };
  // }, []);

  // useGSAP(() => {
  //   gsap.from(
  //     ".about-text",
  //     // { x: -250, opacity: 0 },
  //     {
  //       scrollTrigger: {
  //         trigger: ".about-text",
  //         start: "top center",
  //         toggleActions: "restart pause reverse pause",
  //       },
  //       x: -800,
  //       opacity: 1,
  //       ease: "power2.out",
  //       duration: 0.5,
  //     }
  //   );

  //   gsap.fromTo(
  //     ".about-image",
  //     {
  //       x: 250,
  //       opacity: 0,
  //       scale: 0.9,
  //     },
  //     {
  //       scrollTrigger: {
  //         trigger: ".about-image",
  //         start: "top -30%",
  //         toggleActions: "play reverse play reverse",
  //         markers: true
  //       },
  //       x: 0,
  //       opacity: 1,
  //       scale: 1,
  //       ease: "power1.out",
  //       duration: 0.1,
  //     }
  //   );
  // }, { scope: sectionRef.current })

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
          "<" // This means: start at same time as previous (parallel animation)
        );
    },
    { scope: sectionRef }
  );
  return (
    <section className="w-full bg-[#0F1116] relative">
      <section
        ref={sectionRef}
        className={`${styles.aboutsection_container} container py-12`}
      >
        <div className={`grid grid-cols-12 md:gap-4 py-4 px-2`}>
          <div className="py-16 px-12 col-span-12 lg:col-span-5 bg-black about-text">
            <h3 className="text-white font-bold text-xl md:text-[45px] mb-6">
              {aboutData?.title}
            </h3>

            <div
              className="text-[#8F8F8F] font-normal text-base md:text-xl mb-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData?.description }}
            />
          </div>
          <div className="col-span-12 lg:col-span-7 mt-[20px] lg:mt-[204px] about-image">
            <div className="w-[443px] h-[458px] md:w-[745px] lg:w-[879px] lg:h-[526px] relative">
              <Image
                src={
                  aboutImages?.images?.[0] ?? "/assets/images/face-home-1.png"
                }
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center w-full mx-auto z-10 mt-[-36px] md:mt-[-71px]">
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
            {aboutImages?.images?.length > 0 ? (
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
            ) : (
              <p className="text-gray-500">No images available</p>
            )}
          </div>
        </div>

        {/* <div
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 17, 22, 0.38) 21.74%, #0F1116 63.13%, rgba(15, 17, 22, 0.13) 100%)",
          }}
        >
          <div className="grid grid-cols-12 gap-1 z-10 mt-36 relative">
            <div className="col-span-5 relative follow-instagram">
              <div>
                <Image
                  src="/assets/images/face-latest-2.png"
                  alt=""
                  width={622}
                  height={652}
                />
              </div>

              <div className="mt-[-287px]">
                <Image
                  src="/assets/images/face-latest-3.png"
                  alt=""
                  width={622}
                  height={652}
                />
              </div>

              <div className="mt-[137px] ">
                <h3 className="text-white font-bold text-[45px] whitespace-nowrap">
                  FOLLOW US ON INSTAGRAM
                </h3>
                <button className="border border-white py-[17px] px-20 mt-8 text-white whitespace-nowrap text-[17px]">
                  @THEWHITEROOMSBAND
                </button>
              </div>
            </div>

            <div className="col-span-7 ml-36 ">
              <div className="text-right w-2xl latest-concert">
                <h3 className="text-white font-bold text-[45px] mb-6">
                  LATEST CONCERTS
                </h3>
                <p className="text-[#8F8F8F] font-normal text-xl mb-6">
                  Integer et pretium libero. Donec in arcu mollis, consectetur
                  leo id, mollis leo. Mauris sit amet nunc
                </p>
                <p className="text-[#8F8F8F] font-normal text-xl mb-6">
                  {" "}
                  quis diam facilisis mollis. Proin dapibus ante a nulla cursus
                  consequat. In hac habitasse
                </p>
              </div>

              <div className="latest-image">
                <Image
                  src="/assets/images/face-latest.png"
                  alt=""
                  width={743}
                  height={457}
                />
              </div>

              <div>
                <button className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium text-[17px] py-[17px] px-[73px] mt-11 overflow-hidden transition-all duration-300 hover:text-white">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </section>
  );
};

export default AboutUsSection;
