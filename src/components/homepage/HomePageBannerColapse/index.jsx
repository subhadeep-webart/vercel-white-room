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

  // useGSAP(
  //   () => {
  //     const video = videoRef.current;

  //     /* ---------------- INITIAL STATE ---------------- */

  //     gsap.set(video, {
  //       scale: 1,
  //       y: 0,
  //       autoAlpha: 1,
  //       transformOrigin: "center center",
  //       force3D: true,
  //       willChange: "transform",
  //     });

  //     // const finalY = -window.innerHeight / 2 + 80;

  //     let finalY;
  //     let finalScale;

  //     if (window.innerWidth >= 1024) {
  //       finalY = -window.innerHeight / 2 + 45;
  //       console.log("Final Y========>", finalY);
  //       finalScale = 0.18;
  //     } else if (window.innerWidth >= 768) {
  //       finalY = -window.innerHeight / 2 + 60;
  //       finalScale = 0.25;
  //     } else {
  //       finalY = -window.innerHeight / 2 + 40;
  //       finalScale = 0.35;
  //     }

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: videoSectionRef.current,
  //         start: "center center",
  //         end: "+=200",
  //         scrub: 3,
  //         onLeave: () => video.pause(),
  //         onEnterBack: () => video.play(),
  //       },
  //     });
  //     tl.to(video, {
  //       y: finalY,
  //       // scale: 0.18,
  //       scale: finalScale,
  //       ease: "power.inOut",
  //     });
  //   },
  //   { scope: bannerRef }
  // );

  useGSAP(
    () => {
      const video = videoRef.current;

      gsap.set(video, {
        scale: 1,
        y: 0,
        autoAlpha: 1,
        transformOrigin: "center center",
        force3D: true,
        willChange: "transform",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: "center center",
          end: "+=200",
          scrub: 3,
          onLeave: () => video.pause(),
          onEnterBack: () => video.play(),
        },
      });

      tl.to(video, {
        scale: () => {
          const width = window.innerWidth;

          if (width < 640) return 0.35;       // mobile
          if (width < 1024) return 0.25;      // tablet
          return 0.18;                        // desktop
        },

        // y: () => {
        //   const vh = ScrollTrigger.viewportHeight();
        //   const elHeight = video.offsetHeight;

        //   // 🔥 Grab header height dynamically
        //   const header = document.querySelector(".header_nav");
        //   const headerHeight = header?.offsetHeight || 0;

        //   let scale;
        //   const width = window.innerWidth;

        //   if (width < 640) scale = 0.35;
        //   else if (width < 1024) scale = 0.25;
        //   else scale = 0.18;

        //   const scaledHeight = elHeight * scale;

        //   // 🔥 Correct geometric positioning
        //   return headerHeight + scaledHeight / 2 - vh / 2;
        // },
        y: () => {
          const vh = window.visualViewport
            ? window.visualViewport.height
            : window.innerHeight;

          const elHeight = video.offsetHeight;

          const header = document.querySelector(".header_nav");
          const headerHeight = header?.offsetHeight || 0;

          let scale;
          const width = window.innerWidth;

          if (width < 640) scale = 0.35;
          else if (width < 1024) scale = 0.25;
          else scale = 0.18;

          const scaledHeight = elHeight * scale;

          return headerHeight + scaledHeight / 2 - vh / 2 - 70;
        },

        ease: "power.inOut",
      });

      ScrollTrigger.refresh();
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
                   pointer-events-none !py-4"
        style={{
          mixBlendMode: "screen",
          zIndex: 999,
        }}
      />
    </div>
  );
};

export default HomePageBannerColapse;
