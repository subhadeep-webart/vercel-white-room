"use client";

import { useMemo, useRef } from "react";
import styles from "./latestconcert.module.scss";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const LatestConcert = ({ latestConcertData }) => {
  console.log("latestConcertData", latestConcertData);
  gsap.registerPlugin(ScrollTrigger);
  const latestConcertRef = useRef(null);
  const stackCardContainerRef = useRef(null);

  const stackCardImages = useMemo(() => {
    if (!latestConcertData?.concerts) return [];
    return latestConcertData?.concerts?.map(
      (latestConcertDetails) => latestConcertDetails?.concert_image_url
    );
  }, [latestConcertData]);

  console.log("Stack CARDD iMAGES=====>", stackCardImages);

  // useGSAP(
  //   () => {
  //     gsap.fromTo(
  //       ".stack-card:not(:first-child)",
  //       {
  //         y: 1000,
  //       },
  //       {
  //         y: 0,
  //         stagger: 0.5,
  //         scrollTrigger: {
  //           pin: stackCardContainerRef.current,
  //           scrub: 0.5,
  //         },
  //       }
  //     );
  //   },
  //   { scope: latestConcertRef }
  // );

  useGSAP(
    () => {
      if (!stackCardImages.length) return; // prevent GSAP init with empty data

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".stack-card:not(:first-child)",
          {
            y: 1000,
          },
          {
            y: 0,
            stagger: 0.5,
            scrollTrigger: {
              pin: stackCardContainerRef.current,
              scrub: 0.5,
            },
          }
        );
      }, latestConcertRef);

      // Cleanup ScrollTrigger + GSAP context on unmount or data change
      return () => ctx.revert();
    },
    {
      scope: latestConcertRef,
      dependencies: [stackCardImages], // 👈 ADD THIS
    }
  );

  return (
    <section className="w-full relative bg-[#0F1116]">
      <section
        className={`${styles.latestconcert_container} container commonBg py-20 relative`}
        ref={latestConcertRef}
      >
        <div
          className="md:flex md:justify-between md:items-start md:gap-10 z-10 relative"
          ref={stackCardContainerRef}
        >
          <div
            className={`stacking-cards !relative w-full md:w-1/2 h-[482px] md:h-[652px] mb-10 md:mb-0`}
          >
            {stackCardImages.map((src, index) => (
              <div
                key={index}
                className={`${styles.stack_card} stack-card`}
                data-index={index}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 622px"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col jutsify-start items-end w-full md:w-1/2">
            <div className="text-right latest-concert">
              <h3 className="text-white font-bold text-xl md:text-[45px] mb-6">
                LATEST CONCERTS
              </h3>
              <p className="text-[#8F8F8F] font-normal text-base md:text-xl mb-6">
                Integer et pretium libero. Donec in arcu mollis, consectetur leo
                id, mollis leo. Mauris sit amet nunc
              </p>
              <p className="text-[#8F8F8F] font-normal text-base md:text-xl mb-6">
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
              <button className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium text-sm py-3.5 px-14 md:text-[17px] md:py-[17px] md:px-[73px] mt-11 overflow-hidden transition-all duration-300 hover:text-white">
                View All
              </button>
            </div>
          </div>
        </div>
        <div className="follow-instagram-animate mt-4">
          <h3 className="text-white font-bold text-xl md:text-[45px] whitespace-nowrap">
            FOLLOW US ON INSTAGRAM
          </h3>
          <button className="btn-12 border border-white py-3.5 px-4 md:py-[17px] md:px-20 mt-8 text-white whitespace-nowrap text-sm md:text-[17px]">
            @THEWHITEROOMSBAND
          </button>
        </div>
      </section>
    </section>

    // <section className="w-full relative bg-[#0F1116]">
    //   <section
    //     className={`${styles.latestconcert_container} container commonBg py-20`}
    //     ref={latestConcertRef}
    //   >
    //     <div
    //       className="md:flex md:justify-between md:items-start md:gap-10 z-10 relative"
    //       ref={stackCardContainerRef}
    //     >
    //       <div
    //         className={`stacking-cards !relative w-full md:w-1/2 h-[482px] md:h-[652px] mb-10 md:mb-0`}
    //       >
    //         {/* {latestConcertData?.concerts?.map((concert, index) => (
    //           <div
    //             key={concert._id}
    //             className={`${styles.stack_card} stack-card`}
    //             data-index={index}
    //           >
    //             <Link
    //               href={concert?.youtube_link}
    //               passHref
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="block w-full h-full"
    //             >
    //               <Image
    //                 src={concert?.concert_image_url}
    //                 alt={concert?.concert_name}
    //                 fill
    //                 style={{ objectFit: "cover" }}
    //                 sizes="(max-width: 768px) 100vw, 622px"
    //               />
    //             </Link>
    //           </div>
    //         ))} */}
    //         {latestConcertData?.concerts?.map((concert, index) => (
    //           <div
    //             key={concert._id}
    //             className={`${styles.stack_card} stack-card`}
    //             data-index={index}
    //             style={{ zIndex: latestConcertData.concerts.length - index }}
    //           >
    //             <Link
    //               href={concert?.youtube_link}
    //               passHref
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="block w-full h-full"
    //             >
    //               <Image
    //                 src={concert?.concert_image_url}
    //                 alt={concert?.concert_name}
    //                 fill
    //                 style={{ objectFit: "cover" }}
    //                 sizes="(max-width: 768px) 100vw, 622px"
    //               />
    //             </Link>
    //           </div>
    //         ))}
    //       </div>

    //       <div className="flex flex-col justify-start items-end w-full md:w-1/2">
    //         <div className="text-right latest-concert">
    //           <h3 className="text-white font-bold text-xl md:text-[45px] mb-6">
    //             {latestConcertData?.concerts?.[0]?.concert_name}
    //           </h3>
    //           <div
    //             className="text-[#8F8F8F] font-normal text-base md:text-xl mb-6 leading-relaxed"
    //             dangerouslySetInnerHTML={{
    //               __html: latestConcertData?.concerts?.[0]?.concert_description,
    //             }}
    //           />
    //         </div>

    //         <div className="latest-image">
    //           <Image
    //             src={
    //               latestConcertData?.concerts?.[0]?.concert_image_url ??
    //               "/assets/images/face-latest.png"
    //             }
    //             alt={latestConcertData?.concerts?.[0]?.concert_name}
    //             width={743}
    //             height={457}
    //           />
    //         </div>

    //         <div>
    //           <button className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium text-sm py-3.5 px-14 md:text-[17px] md:py-[17px] md:px-[73px] mt-11 overflow-hidden transition-all duration-300 hover:text-white">
    //             View All
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="follow-instagram-animate mt-[260px] sm:mt-[70px] md:mt-4">
    //       <h3 className="text-white font-bold text-xl md:text-[45px] whitespace-nowrap">
    //         FOLLOW US ON INSTAGRAM
    //       </h3>
    //       <button className="btn-12 border border-white py-3.5 px-4 md:py-[17px] md:px-20 mt-8 text-white whitespace-nowrap text-sm md:text-[17px]">
    //         @THEWHITEROOMSBAND
    //       </button>
    //     </div>
    //   </section>
    // </section>
  );
};

export default LatestConcert;
