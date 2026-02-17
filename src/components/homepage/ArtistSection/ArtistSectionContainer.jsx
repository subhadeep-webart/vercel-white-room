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
          scale: 120,
          duration: 1,
          ease: "none",
          xPercent: 27,
          yPercent: 120,
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
        {/**
         *
         * 
         * <object
          data="/assets/images/twr_svg_logo.svg"
          type="image/svg+xml"
          width="250"
          height="150"
          className="logo"
          ref={svgRef}
        ></object>
         */}

        {/* <svg
          viewBox="480 800 280 150"
          className="logo"
          ref={svgRef}
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            d="M 488.177032 836.022095 L 488.177032 825.24231 L 549 825.24231 L 549 836.022095 L 524.208008 836.022095 L 524.208008 935 L 512.968994 935 L 512.968994 836.022095 L 488.177032 836.022095 Z"
          />
          <path
            fill="#fff"
            d="M 483 819.087891 L 752.306885 819.087891 L 755 809 L 483 809 Z"
          />
          <path
            fill="#fff"
            d="M 483 825.055176 L 724.76947 825.055176 L 734 841.87207 L 483 841.87207 Z"
          />
          <path
            fill="#fff"
            d="M 621.601013 845.134033 L 614.302002 859.538025 L 607.034973 845.134033 L 596.497986 845.134033 L 609.047974 869.907043 L 586.735962 913.936035 L 567.365967 845.598022 L 557.602966 845.598022 L 584.255981 939.348999 L 614.240967 880.15802 L 644.226013 939.348999 L 668.323975 854.585022 L 683.58197 854.585022 L 683.323975 854.330994 L 683.58197 854.429993 L 700.162964 854.429993 C 706.670959 854.429993 711.164978 855.050049 713.954956 856.13501 C 716.743958 857.375 718.914001 859.079041 720.617981 861.71405 C 722.322998 864.192993 723.096985 867.138 723.096985 870.237 C 723.096985 873.491028 722.32196 876.434998 720.617981 879.070007 C 718.912964 881.704041 716.588989 883.564026 713.644958 884.804016 C 710.545959 886.044006 705.896973 886.664001 699.697998 886.664001 L 683.58197 886.509033 L 722.786987 939.196045 L 734.408997 939.196045 L 700.781982 895.652039 C 708.529968 895.497009 714.729004 894.567017 719.221985 892.55304 C 723.560974 890.539001 727.125 887.593994 729.448975 883.720032 C 731.77301 879.846008 733.013 875.352051 733.013 870.238037 C 733.013 864.040039 731.153015 858.926025 727.743958 854.742004 C 724.179993 850.558044 719.685974 847.769043 714.106995 846.529053 C 710.388 845.754028 703.26001 845.289001 692.877014 845.289001 L 674.281982 845.289001 L 674.281982 845.444031 L 664.209961 845.444031 L 664.209961 845.598999 L 661.269958 845.598999 L 641.744995 913.937012 L 619.481995 869.809998 L 631.981995 845.13501 L 621.599976 845.13501 Z"
          />
        </svg> */}
        <div className="svg_container" ref={svgRef}>
          <svg
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
          </svg>
        </div>

        {/* <Image src="/assets/images/twr_svg_logo.svg" height={200} width={200} className="logo" ref={svgRef} /> */}
      </div>
    </section>
  );
};

export default ArtistSectionContainer;