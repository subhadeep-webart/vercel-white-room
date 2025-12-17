import Image from "next/image";
import styles from "./artistsection.module.scss";
import TickerWrapper from "@/components/common/TickerWrapper";
import { useRouter } from "next/navigation";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const ArtistSectionContainer = ({ artistSectionData = {} }) => {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const sectionRef = useRef(null);
  const innerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -20%",
          end: "+=1500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        maskRef.current,
        { maskSize: "200px", maskPosition: "center center" },
        {
          maskSize: "14000px",
          maskPosition: "center center",
          ease: "none",
          duration: 1,
        }
      );
      tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1 }, "-=0.5");
      tl.fromTo(
        maskRef.current,
        { maskSize: "14000px", maskPosition: "center center" },
        {
          maskSize: "200px",
          maskPosition: "center center",
          ease: "none",
          duration: 1,
        }
      );
      tl.fromTo(sectionRef.current, { opacity: 1 }, { opacity: 0 }, "-=0.5");
      // tl.fromTo(innerRef.current, { scale: 1.3 }, { scale: 1 }, "-=0.5")
    },
    { scope: containerRef }
  );

  const router = useRouter();

  // if (!artistSectionData) {
  //     return;
  // }
  const {
    file_url = "",
    buttonText = "",
    buttonLink = "#",
    artists = [{ artist_name: "Subhadeep" }],
  } = artistSectionData || {};

  const handleButtonClick = () => {
    if (buttonLink == "#") return;
    router.push(buttonLink);
  };
  return (
    <section className="w-full h-[150vh] relative bg-white" ref={containerRef}>
      {/* outer section */}
      <div className={styles.heroContent} ref={sectionRef}>
        <div className={styles.heroImage}>
          <img
            src={file_url || "/assets/images/red_black.png"}
            alt="Hero"
            className={`${styles.personImage}`}
          />
        </div>

        <div className={styles.textLines}>
          <h1 className={styles.heroTitle}>
            {[...artists, ...artists]?.map((artists) => (
              <>{artists?.artist_name}</>
            ))}
          </h1>
          <h1 className={styles.heroTitle} style={{ animationDelay: "-10s" }}>
            {[...artists, ...artists]?.map((artists) => (
              <>{artists?.artist_name}</>
            ))}
          </h1>
          <h1 className={styles.heroTitle} style={{ animationDelay: "-20s" }}>
            {[...artists, ...artists]?.map((artists) => (
              <>{artists?.artist_name}</>
            ))}
          </h1>
        </div>
        <button className={styles.signupButton}>SIGN UP</button>
      </div>

      {/*mask*/}
      <div
        className="absolute z-20 flex m-auto w-full h-[150vh] inset-0 [mask-image:url('/assets/images/twr_svg_logo1.svg')] [mask-repeat:no-repeat]"
        ref={maskRef}
      >
        {/* Inner for masking */}
        <div className={styles.heroContent} ref={innerRef}>
          <div className={styles.heroImage}>
            <img
              src={"/assets/images/red_black.png"}
              alt="Hero"
              className={styles.personImage}
            />
          </div>

          <div className={styles.textLines}>
            <h1 className={styles.heroTitle}>
              {[...artists, ...artists]?.map((artists) => (
                <>{artists?.artist_name}</>
              ))}
            </h1>
            <h1 className={styles.heroTitle} style={{ animationDelay: "-10s" }}>
              {[...artists, ...artists]?.map((artists) => (
                <>{artists?.artist_name}</>
              ))}
            </h1>
            <h1 className={styles.heroTitle} style={{ animationDelay: "-20s" }}>
              {[...artists, ...artists]?.map((artists) => (
                <>{artists?.artist_name}</>
              ))}
            </h1>
          </div>

          <button className={styles.signupButton} onClick={handleButtonClick}>{buttonText}</button>
        </div>
      </div>
    </section>
  );
};

export default ArtistSectionContainer;
