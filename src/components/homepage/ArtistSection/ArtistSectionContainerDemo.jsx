import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import "./demo.css";
import { useRouter } from "next/navigation";
import { poppins } from "@/lib/font";

gsap.registerPlugin(ScrollTrigger);

const ArtistSectionContainerDemo = ({ artistSectionData = {} }) => {
  const containerRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const maskRef = useRef(null);

  const router = useRouter();

  const {
    file_url = "",
    buttonText = "",
    buttonLink = "#",
    artists = [],
  } = artistSectionData || {};

  const handleButtonClick = () => {
    if (buttonLink == "#") return;
    router.push(buttonLink);
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      const maskEl = maskRef.current;
      const bgEl = backgroundImageRef.current;

      if (!container || !maskEl || !bgEl) return;

      gsap.set(bgEl, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top -10%",
          end: "+=1000",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            if (self.progress > 0.2) {
              gsap.set(maskEl, { pointerEvents: "none" });
            } else {
              gsap.set(maskEl, { pointerEvents: "auto" });
            }
          },
        },
      });

      tl.to(
        bgEl,
        {
          autoAlpha: 1,
          ease: "none",
          duration: 3,
        },
        0,
      );

      tl.fromTo(
        maskEl,
        {
          maskSize: "200px",
          WebkitMaskSize: "200px",
          maskPosition: "50% 50%",
          WebkitMaskPosition: "50% 50%",
        },
        {
          maskSize: "2500px",
          WebkitMaskSize: "2500px",
          maskPosition: "43% 55%",
          WebkitMaskPosition: "43% 55%",
          ease: "none",
          duration: 2,
          opacity: 0,
        },
        0,
      );
    },
    { scope: containerRef },
  );
  console.log("Artists======>", artistSectionData);
  return (
    <div ref={containerRef} className="h-[120vh] relative bg-black !z-[999]">
      {/* Background */}
      {/* <div
        className="absolute inset-0 bg-[url('/assets/images/about-us-bg.png')] bg-cover bg-center z-0"
        ref={backgroundImageRef}
      /> */}
      <div className="hero" ref={backgroundImageRef}>
        <div className="person-image relative">
          {file_url && (
            <img src={file_url} alt="Hero" className="person-image" />
          )}
          <button className="btn" onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>

        <div className="text-lines">
          <div className="scroll-container">
            <div className="text-group">
              <h1 className="text">
                {artists?.header1?.map((artist) => (
                  <span
                    className={`${poppins.className} word`}
                    key={artist?._id}
                  >
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
            <div className="text-group">
              <h1 className="text">
                {artists?.header1?.map((artist) => (
                  <span
                    className={`${poppins.className} word`}
                    key={artist?._id}
                  >
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          <div className="scroll-container reverse">
            <div className="text-group">
              <h1 className="text-reverse">
                {artists?.header2?.map((artist) => (
                  <span
                    className={`${poppins.className} word`}
                    key={artist?._id}
                  >
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
            <div className="text-group">
              <h1 className="text-reverse">
                {artists?.header2?.map((artist) => (
                  <span
                    className={`${poppins.className} word`}
                    key={artist?._id}
                  >
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          <div className="scroll-container">
            <div className="text-group">
              <h1 className="text">
                {artists?.header3?.map((artist) => (
                  <span
                    className={`${poppins.className} word`}
                    key={artist?._id}
                  >
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
            <div className="text-group">
              <h1 className="text">
                {artists?.header3?.map((artist) => (
                  <span
                    className={`${poppins.className} word`}
                    key={artist?._id}
                  >
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Mask layer */}
      <div
        ref={maskRef}
        className="absolute inset-0 z-10 bg-white"
        style={{
          maskImage: "url('/assets/images/twr_svg_logo.svg')",
          WebkitMaskImage: "url('/assets/images/twr_svg_logo.svg')",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "50% 50%",
          WebkitMaskPosition: "50% 50%",
        }}
      >
        {/* <div
          className="sticky inset-0 bg-[url('/assets/images/about-us-bg.png')] bg-cover bg-center z-0"
          ref={backgroundImageRef}
        /> */}
      </div>
    </div>
  );
};

export default ArtistSectionContainerDemo;
