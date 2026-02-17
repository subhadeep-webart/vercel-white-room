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
          yPercent: 100,
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
      className="w-full h-screen relative overflow-hidden bg-white"
      ref={containerRef}
    >
      {/* <div className="hero">
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
      </div> */}

      <div className="mask" ref={maskRef}>
        <div className="svg_container" ref={svgRef}>
          {/* <svg
            width="100%"
            height="100%"
            viewBox="0 0 4948 2784"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            shape-rendering="geometricPrecision"
            className="logo"
          >
            <path
              d="M4948 2783.25H0V0H4948V2783.25ZM2200.52 1534.4V1549.29H2736.51L2741.87 1534.4H2200.52ZM2420.51 1296.36L2449.42 1357.87L2398.02 1467.2L2353.4 1297.51H2330.91L2392.31 1530.3L2461.38 1383.33L2530.46 1530.3L2585.97 1319.83H2621.12L2620.52 1319.2L2621.12 1319.44H2659.31C2674.3 1319.44 2684.66 1320.98 2691.08 1323.68C2697.51 1326.75 2702.51 1330.99 2706.43 1337.53C2710.36 1343.68 2712.14 1351 2712.14 1358.69C2712.14 1366.77 2710.36 1374.08 2706.43 1380.62C2702.5 1387.16 2697.15 1391.78 2690.37 1394.86C2683.23 1397.94 2672.52 1399.48 2658.24 1399.48L2621.12 1399.09L2711.43 1529.92H2738.2L2660.74 1421.8C2678.59 1421.41 2692.87 1419.1 2703.22 1414.1C2713.21 1409.1 2721.42 1401.79 2726.77 1392.17C2732.13 1382.55 2734.98 1371.39 2734.98 1358.69C2734.98 1343.3 2730.7 1330.61 2722.85 1320.22C2714.64 1309.83 2704.29 1302.9 2691.43 1299.82C2682.87 1297.9 2666.45 1296.74 2642.53 1296.74H2599.69V1297.13H2576.49V1297.51H2569.72L2524.74 1467.2L2473.46 1357.63L2502.25 1296.36L2478.34 1296.36L2461.52 1332.12L2444.79 1296.36H2420.51ZM2200.52 1258.78V1288.58H2269.56V1529.43H2295.45V1288.58H2702.71L2684.24 1258.78H2200.52ZM2200.53 1233.95V1248.85H2684.05L2688.88 1233.95H2200.53Z"
              fill="#0F1116"
            />
          </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" viewBox="0 0 1920 1080" className="logo"><path fill="#0f1116" d="M1920 1080H0V0h1920zM853.882 595.4v5.782h207.978l2.08-5.782zm85.363-92.366 11.218 23.868-19.944 42.422-17.315-65.844h-8.726l23.824 90.33 26.802-57.031 26.803 57.031 21.543-81.67h13.64l-.23-.245.23.095h14.82c5.82 0 9.83.597 12.33 1.643 2.49 1.195 4.43 2.837 5.95 5.376 1.53 2.388 2.22 5.226 2.22 8.212 0 3.135-.69 5.971-2.22 8.509-1.52 2.538-3.6 4.331-6.23 5.526-2.77 1.195-6.93 1.792-12.47 1.792l-14.4-.15 35.04 50.764h10.39l-30.06-41.954c6.93-.149 12.47-1.046 16.48-2.986 3.88-1.941 7.07-4.779 9.15-8.511 2.07-3.733 3.18-8.062 3.18-12.989 0-5.972-1.66-10.9-4.71-14.931-3.18-4.031-7.2-6.718-12.19-7.913-3.32-.747-9.69-1.195-18.98-1.195h-16.62v.149h-8.999v.149h-2.628l-17.454 65.844-19.9-42.516 11.174-23.774-9.279-.001-6.525 13.878-6.496-13.878zm-85.363-14.582v11.563h26.788v93.459h10.046v-93.459h158.034l-7.17-11.563zm0-9.635v5.782h187.628l1.87-5.782z" /></svg>
        </div>

        {/* <Image src="/assets/images/twr_svg_logo.svg" height={200} width={200} className="logo" ref={svgRef} /> */}
      </div>
    </section>
  );
};

export default ArtistSectionContainer;