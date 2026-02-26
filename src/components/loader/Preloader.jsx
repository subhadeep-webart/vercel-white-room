"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./preloader.module.scss";

const Preloader = ({ loading }) => {
    const preloaderRef = useRef(null);
    const maskRef = useRef(null);
    const [show, setShow] = useState(true);

    useGSAP(
        () => {
            if (!loading && maskRef.current && preloaderRef.current) {
                const tl = gsap.timeline({
                    onComplete: () => setShow(false),
                });

                // 🚀 Expand mask BIG (prevents pixelation)
                tl.to(maskRef.current, {
                    maskSize: "5000px",
                    WebkitMaskSize: "5000px",
                    maskPosition:"48% 50%",
                    duration: 1.3,
                    ease: "expo.out",
                });

                // Fade out container smoothly
                tl.to(
                    preloaderRef.current,
                    {
                        opacity: 0,
                        duration: 0.6,
                    },
                    "-=1.1"
                );
            }
        },
        { dependencies: [loading], scope: preloaderRef }
    );

    if (!show) return null;

    return (
        <div ref={preloaderRef} className={styles.preloader}>
            <div
                ref={maskRef}
                className="absolute inset-0 z-10 bg-white"
                style={{
                    maskImage: "url('/assets/images/twr_svg_logo.svg')",
                    WebkitMaskImage: "url('/assets/images/twr_svg_logo.svg')",
                    maskSize: "200px",
                    WebkitMaskSize: "200px",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "50% 50%",
                    WebkitMaskPosition: "50% 50%",
                }}
            />
        </div>
    );
};

export default Preloader;