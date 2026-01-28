import { useRouter } from "next/navigation";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import "./demo.css";
import Image from "next/image";

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

      tl.to(svg, {
        scale: 60, duration: 1, ease: "none", xPercent: 120, yPercent: 200
      }, 0)
        .to(maskEl, { opacity: 0, duration: 1, ease: "none" }, 0)
    },
    { scope: containerRef }
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
    <section className="w-full h-[110vh] relative bg-black overflow-hidden" ref={containerRef}>
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
        <svg viewBox="480 800 280 150" className="logo" ref={svgRef} preserveAspectRatio="xMidYMid meet">
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
        </svg>
        {/* <Image src="/assets/images/twr_svg_logo.svg" height={200} width={200} className="logo" ref={svgRef} /> */}
      </div>
    </section>
  );
};

export default ArtistSectionContainer;
