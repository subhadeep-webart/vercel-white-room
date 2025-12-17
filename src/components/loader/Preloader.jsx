"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./preloader.module.scss";

const Preloader = ({ loading }) => {
    const preloaderRef = useRef(null);
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (!loading && preloaderRef.current) {
            gsap.to(preloaderRef.current, {
                opacity: 0,
                scale: 20,
                duration: 2.5,
                ease: "power2.out",
                onComplete: () => setShow(false),
            });
        }
    }, [loading]);

    if (!show) return null;

    return (
        <div ref={preloaderRef} className={styles.preloader}>
            <div className={styles.centerBox}>
                <Image
                    src="/assets/images/twr_svg_logo1.svg"
                    alt="twr_logo"
                    width={150}
                    height={150}
                    className="animate-pulse"
                />
            </div>
        </div>
    );
};

export default Preloader;
