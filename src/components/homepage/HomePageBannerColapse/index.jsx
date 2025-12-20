"use client";
import { useRef } from "react";
import HomeBanner from "../HomeBanner";
import HomeVideo from "../HomeVideo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "../HomeVideo/homevideo.module.scss";

gsap.registerPlugin(ScrollTrigger);

const HomePageBannerColapse = ({ bannerData }) => {
  const bannerRef = useRef(null);
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  useGSAP(
    () => {
      const video = videoRef.current;

      /* ---------------- INITIAL STATE ---------------- */

      gsap.set(video, {
        scale: 1,
        y: 0,
        autoAlpha: 1,
        transformOrigin: "center center",
        force3D: true,
        willChange: "transform",
      });

      /* ---------------- SCROLL TIMELINE ---------------- */

      const finalY = -window.innerHeight / 2 + 60; // EXACT logo position

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: "center center",
          end: "+=800",
          scrub: 1,
          onLeave: () => video.pause(),
          onEnterBack: () => video.play(),
        },
      });
      tl.to(video, {
        y: finalY,
        scale: 0.18,
        ease: "power2.inOut",
      });
    },
    { scope: bannerRef }
  );

  return (
    <div ref={bannerRef}>
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
        <HomeBanner />
      </div>
      <div className="w-full h-screen" />
      <div ref={videoSectionRef} className={styles.home_video_container}>
        <HomeVideo bannerData={bannerData} />
      </div>

      <video
        ref={videoRef}
        src="/assets/videos/home-logo-animation.webm"
        autoPlay
        loop
        muted
        playsInline
        className="fixed left-1/2 top-1/2
                   w-full h-full object-contain
                   -translate-x-1/2 -translate-y-1/2
                   pointer-events-none"
        style={{
          mixBlendMode: "screen",
          zIndex: 999,
        }}
      />
    </div>
  );
};

export default HomePageBannerColapse;
