import { useGSAP } from "@gsap/react";
import styles from "./artistsection.module.scss";
import { useRef } from "react";
import gsap from "gsap";
const DemoSectionContainer = () => {
  const artists = [{ atist_name: "subhadeep" }];
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
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
    },
    { scope: containerRef }
  );
  return (
    <section className="w-full h-[100vh] relative bg-white" ref={containerRef}>
      {/* outer section */}
      <div className={styles.heroContent} ref={sectionRef}>
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
              <span className="ticker_item">{artists?.artist_name}</span>
            ))}
          </h1>
          <h1 className={styles.heroTitle} style={{ animationDelay: "-10s" }}>
            {[...artists, ...artists]?.map((artists) => (
              <span className="ticker_item">{artists?.artist_name}</span>
            ))}
          </h1>
          <h1 className={styles.heroTitle} style={{ animationDelay: "-20s" }}>
            {[...artists, ...artists]?.map((artists) => (
              <span className="ticker_item">{artists?.artist_name}</span>
            ))}
          </h1>
        </div>

        <button className={styles.signupButton}>SIGN UP</button>
      </div>

      {/*mask*/}
      <div
        className="absolute z-20 flex m-auto w-full h-full inset-0 [mask-image:url('/assets/images/twr_svg_logo1.svg')] [mask-repeat:no-repeat]"
        // style={{ maskSize: "250px", maskPosition: "center center" }}
        ref={maskRef}
      >
        {/* Inner for masking */}
        <div className={styles.heroContent}>
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
                <span className="ticker_item">{artists?.artist_name}</span>
              ))}
            </h1>
            <h1 className={styles.heroTitle} style={{ animationDelay: "-10s" }}>
              {[...artists, ...artists]?.map((artists) => (
                <span className="ticker_item">{artists?.artist_name}</span>
              ))}
            </h1>
            <h1 className={styles.heroTitle} style={{ animationDelay: "-20s" }}>
              {[...artists, ...artists]?.map((artists) => (
                <span className="ticker_item">{artists?.artist_name}</span>
              ))}
            </h1>
          </div>

          <button className={styles.signupButton}>SIGN UP</button>
        </div>
      </div>
    </section>
  );
};

export default DemoSectionContainer;
