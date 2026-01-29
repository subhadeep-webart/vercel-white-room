import { useRouter } from "next/navigation";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import "./demo.css";

gsap.registerPlugin(ScrollTrigger);

const ArtistSectionContainer = ({ artistSectionData = {} }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const maskRef = useRef(null);
  // GSAP animation hook
  useGSAP(
    () => {
      const container = containerRef.current;
      const svg = svgRef.current;
      const maskEl = maskRef.current;

      if (!container || !svg || !maskEl) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "center center",
          end: "+=4000",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            maskEl.style.zIndex = self.progress > 0.4 ? "1" : "10";
          },
        },
      });

      tl.to(
        svg,
        {
          transform: "translate(120%, 200%) scale(60)",
          duration: 1,
          ease: "none",
        },
        0,
      ).to(maskEl, { opacity: 0, duration: 1, ease: "none" }, 0);
    },
    { scope: containerRef },
  );

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
  return (
    <section
      className="w-full h-[110vh] relative bg-black overflow-hidden"
      ref={containerRef}
    >
      <div className="hero">
        {file_url && <img src={file_url} alt="Hero" className="person-image" />}

        <div className="text-lines">
          <div className="scroll-container">
            <div className="text-group">
              <h1 className="text">
                {artists?.map((artist) => (
                  <span className="word" key={artist?._id}>
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
            <div className="text-group">
              <h1 className="text">
                {artists?.map((artist) => (
                  <span className="word" key={artist?._id}>
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          <div className="scroll-container reverse">
            <div className="text-group">
              <h1 className="text-reverse">
                {artists?.map((artist) => (
                  <span className="word" key={artist?._id}>
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
            <div className="text-group">
              <h1 className="text-reverse">
                {artists?.map((artist) => (
                  <span className="word" key={artist?._id}>
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          <div className="scroll-container">
            <div className="text-group">
              <h1 className="text">
                {artists?.map((artist) => (
                  <span className="word" key={artist?._id}>
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
            <div className="text-group">
              <h1 className="text">
                {artists?.map((artist) => (
                  <span className="word" key={artist?._id}>
                    {artist?.artist_name}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </div>

        <button className="btn" onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>

      <div className="mask" ref={maskRef}>
        <div className="giant-text" ref={svgRef}>
          TWR
        </div>
      </div>
    </section>
  );
};

export default ArtistSectionContainer;
