"use client";

import { useEffect, useRef, useState } from "react";
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
                    maskPosition: "48% 50%",
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


    useEffect(() => {
        if (show) {
            const scrollY = window.scrollY;

            // lock scroll
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
        } else {
            // restore scroll
            const scrollY = document.body.style.top;

            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";

            // restore scroll position
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
        };
    }, [show]);

    if (!show) return null;

    return (
        <div ref={preloaderRef} className={styles.preloader}>
            <div
                ref={maskRef}
                className="absolute inset-0 !z-[9999999999999999999999] bg-white animate-pulse"
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