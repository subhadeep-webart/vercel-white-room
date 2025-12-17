"use client";

import { useRef } from "react";
import HomeBanner from "../HomeBanner";
import HomeVideo from "../HomeVideo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "../HomeVideo/homevideo.module.scss";

const HomePageBannerColapse = ({ bannerData }) => {
  const bannerRef = useRef(null);
  const videoRef = useRef(null);
  const logoRef = useRef(null);
  const videoSectionRef = useRef(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      const logo = logoRef.current;

      // Make sure logo is initially hidden and small
      gsap.set(logo, { opacity: 0, scale: 0.5, y: 50, visibility: "hidden" });
      gsap.set(video, { opacity: 1, scale: 1, y: 0 });

      // Fade out video and fade in logo on scroll

      // gsap.to(bannerSectionRef.current, {
      //   scale: 1,
      //   y: -150,
      //   ease: "power1.out",
      //   duration: 0.5,
      //   scrollTrigger: {
      //     trigger: bannerSectionRef.current,
      //     scroller: "body",
      //     start: "top top",
      //     end: "+=600",
      //     scrub: true,
      //     pin: true,
      //     pinSpacing: false,
      //     // markers: true,
      //   },
      // });

      gsap.to(video, {
        opacity: 0,
        scale: 1,
        y: 0,
        duration: 1.0,
        pointerEvents: "none",
        scrollTrigger: {
          trigger: video,
          scroller: "body",
          start: "bottom top",
          end: "+=100",
          scrub: true,
          // markers: true,
        },
      });

      gsap.to(logo, {
        opacity: 1,
        scale: 1,
        y: 0,
        visibility: "visible",
        scrollTrigger: {
          trigger: video,
          scroller: "body",
          start: "bottom top",
          end: "bottom +50%",
          scrub: true,
          // markers: true,
        },
      });
    },
    { scope: bannerRef.current }
  );

  return (
    <div ref={bannerRef}>
      <div
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
      >
        <HomeBanner />
      </div>
      <div className="w-full h-screen"></div>
      <div ref={videoSectionRef} className={styles.home_video_container}>
        <HomeVideo bannerData={bannerData} />
      </div>
      <video
        className={`fixed top-[335px] left-1/2 md:top-1/2 md:left-1/2 w-full md:w-full h-[50vh] md:h-full object-contain transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none`}
        src="/assets/videos/home-logo-animation.webm"
        autoPlay
        loop
        muted
        playsInline
        style={{ mixBlendMode: "screen" }}
        ref={videoRef}
      />
      <img
        src="/assets/images/logo.png"
        alt="Sticky Logo"
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 w-30`}
        style={{ zIndex: 999 }}
        ref={logoRef}
      />
    </div>
  );
};

export default HomePageBannerColapse;
