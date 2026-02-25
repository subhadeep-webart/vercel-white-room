import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ArtistSectionContainerDemo = () => {
    const containerRef = useRef(null);
    const maskRef = useRef(null);

    useGSAP(() => {
        const container = containerRef.current;
        const maskEl = maskRef.current;

        if (!container || !maskEl) return;

        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=3000",
                scrub: true,
                pin: true,
            },
        }).fromTo(
            maskEl,
            {
                maskSize: "400px",
                WebkitMaskSize: "400px",
            },
            {
                maskSize: "14000px",
                WebkitMaskSize: "14000px",
                ease: "none",
            },

        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="h-[300vh] relative bg-white">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/assets/images/about-us-bg.png')] bg-cover bg-center z-0" />

            {/* Mask layer */}
            <div
                ref={maskRef}
                className="absolute inset-0 z-10 bg-white"
                style={{
                    maskImage: "url('/assets/images/twr_svg_logo.svg')",
                    WebkitMaskImage: "url('/assets/images/twr_svg_logo.svg')",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center 100px",
                    WebkitMaskPosition: "center 100px",
                }}
            />
        </div>
    );
};

export default ArtistSectionContainerDemo;