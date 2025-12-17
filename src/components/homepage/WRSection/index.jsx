"use client";

import { use, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./wrsection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const WRSection = () => {
  const wrContainerRef = useRef(null);
  const centerBoxRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 768) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrContainerRef.current,
        start: "top -1%",
        end: "200% top",
        scrub: true,
        pin: true,
        onEnter: () => {
          // Set pin-spacer background color when pinned
          const pinSpacer = wrContainerRef.current?.parentElement;
          if (pinSpacer) {
            gsap.set(pinSpacer, { backgroundColor: "white" });
          }
        },
        // markers: true,
      },
    });

    tl.to(centerBoxRef.current, {
      scale: 10,
      opacity: 1,
      duration: 0.8,
    }).to(centerBoxRef.current, {
      opacity: 0,
      scale: 10,
      duration: 1,
    });
  });

  return (
    <>
      <section ref={wrContainerRef} className={`${styles.gallery_section}`}>
        <div className="container h-full">
          <div className={styles.centerBox} ref={centerBoxRef}></div>
        </div>
      </section>
      <section className="w-full bg-white h-[500px] md:h-[160%] relative" ref={buttonRef}>
        <div
          className="flex flex-col justify-center items-center gap-4 pb-4 container lg:px-48 lg:py-24"
          ref={buttonRef}
        >
          <h3 className="text-black font-bold text-xl md:text-[30px] mb-6 w-full ml-[17px] md:ml-0">
            LATEST RELEASES
          </h3>
          <div className="flex flex-col md:flex-row md:justify-between justify-center md:items-start items-center space-y-2 md:space-y-0 stack-card w-full">
            <div className={`${styles.stack_card}`}>
              <Image
                src={"/assets/images/dummy_feed2.png"}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 600px) 100vw, 500px"
              />
            </div>

            <div className="w-[1px] h-[200px] md:h-[500px] bg-gray-400 mx-4 hidden md:block" />

            <div className={`${styles.stack_card}`}>
              <Image
                src={"/assets/images/dummy_feed4.png"}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 600px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WRSection;
