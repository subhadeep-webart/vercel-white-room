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
          scale: 60,
          duration: 1,
          ease: "none",
          xPercent: 15,
          yPercent: 60,
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
      className="w-full h-[100vh] bg-black relative"
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

      <div className="svg_container" ref={maskRef}>
        <div className="svg_container origin-center" ref={svgRef}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 4948 2784"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className="logo"
          >
            <path
              d="M4948 2783.25H0V0H4948V2783.25ZM2200.52 1534.4V1549.29H2736.51L2741.87 1534.4H2200.52ZM2420.51 1296.36L2449.42 1357.87L2398.02 1467.2L2353.4 1297.51H2330.91L2392.31 1530.3L2461.38 1383.33L2530.46 1530.3L2585.97 1319.83H2621.12L2620.52 1319.2L2621.12 1319.44H2659.31C2674.3 1319.44 2684.66 1320.98 2691.08 1323.68C2697.51 1326.75 2702.51 1330.99 2706.43 1337.53C2710.36 1343.68 2712.14 1351 2712.14 1358.69C2712.14 1366.77 2710.36 1374.08 2706.43 1380.62C2702.5 1387.16 2697.15 1391.78 2690.37 1394.86C2683.23 1397.94 2672.52 1399.48 2658.24 1399.48L2621.12 1399.09L2711.43 1529.92H2738.2L2660.74 1421.8C2678.59 1421.41 2692.87 1419.1 2703.22 1414.1C2713.21 1409.1 2721.42 1401.79 2726.77 1392.17C2732.13 1382.55 2734.98 1371.39 2734.98 1358.69C2734.98 1343.3 2730.7 1330.61 2722.85 1320.22C2714.64 1309.83 2704.29 1302.9 2691.43 1299.82C2682.87 1297.9 2666.45 1296.74 2642.53 1296.74H2599.69V1297.13H2576.49V1297.51H2569.72L2524.74 1467.2L2473.46 1357.63L2502.25 1296.36L2478.34 1296.36L2461.52 1332.12L2444.79 1296.36H2420.51ZM2200.52 1258.78V1288.58H2269.56V1529.43H2295.45V1288.58H2702.71L2684.24 1258.78H2200.52ZM2200.53 1233.95V1248.85H2684.05L2688.88 1233.95H2200.53Z"
              fill="#0F1116"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ArtistSectionContainer;
