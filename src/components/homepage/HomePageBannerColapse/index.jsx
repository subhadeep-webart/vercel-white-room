"use client";
import { useRef } from "react";
import HomeBanner from "../HomeBanner";
import HomeVideo from "../HomeVideo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../HomeVideo/homevideo.module.scss";

gsap.registerPlugin(ScrollTrigger);

const HomePageBannerColapse = ({ bannerData }) => {
  const bannerRef = useRef(null);
  const videoRef = useRef(null);
  const logoRef = useRef(null);
  const videoSectionRef = useRef(null);

  useGSAP(
    () => {
      const video = videoRef.current;

      // Initially set video to full screen
      gsap.set(video, {
        opacity: 1,
        scale: 1,
        y: 0,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: "center center",
          end: "+=400",
          scrub: 1,
          // zIndex: 20,
          onLeave: () => {
            video.pause();
          },
          onEnterBack: () => {
            video.play();
          }
        },
      });

      tl.to(video, {
        y: () => {
          const videoRect = video.getBoundingClientRect();
          const targetY = 50; // target from top
          const currentCenter = window.innerHeight / 2;
          return -(currentCenter - targetY);
        },
        scale: 0.25,
        ease: "power2.inOut",
      });
    },
    { scope: bannerRef, dependencies: [] }
  )
  return (
    <div ref={bannerRef}>
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
        <HomeBanner />
      </div>
      <div className="w-full h-screen"></div>
      <div ref={videoSectionRef} className={styles.home_video_container}>
        <HomeVideo bannerData={bannerData} />
      </div>
      <video
        className="fixed top-[335px] left-1/2 md:top-1/2 md:left-1/2 w-full md:w-full h-[50vh] md:h-full object-contain transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        src="/assets/videos/home-logo-animation.webm"
        autoPlay
        loop
        muted
        playsInline
        style={{ mixBlendMode: "screen", zIndex: 99 }}
        ref={videoRef}
      />
      {/* <img
        src="/assets/images/logo.png"
        alt="Sticky Logo"
        className="fixed top-5 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 w-30"
        style={{ zIndex: 999 }}
        ref={logoRef}
      /> */}
    </div>
  );
};

export default HomePageBannerColapse;