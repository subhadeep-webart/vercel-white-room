"use client"

import { NAV_MENU_ITEMS } from "@/utils/constants";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import styles from "./navmenu.module.css";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";

const NavMenu = ({ isOpen, toggleNavBar }) => {
    const [currentImageSrc, setCurrentImageSrc] = useState("/assets/images/menu-img.png");
    const [hoverImageSrc, setHoverImageSrc] = useState(null);
    const [hoverItem, setHoverItem] = useState(null);
    const containerRef = useRef(null);

    const tl = useRef();

    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { opacity: 0, x: "-100%" });

        tl.current = gsap.timeline({ paused: true })
            .to("#menu-link-holder", { duration: 0.6, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", ease: "sine.inOut" })
            .to(".menu-link-item-holder", { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power4.inOut" }, "-=0.6");
    }, { scope: containerRef.current });

    useEffect(() => {
        if (isOpen) tl.current.play();
        else tl.current.reverse();
    }, [isOpen]);

    const handleNavMenuMouseEnter = (item) => {
        if (item.key === hoverItem?.key) return;

        setHoverItem(item);
        setHoverImageSrc(item.imgSrc);

        gsap.to(`[data-key="${item.key}"] a`, { color: "#ffffff", duration: 0.5, scale: 1 });
        gsap.to(`.menu-link-item-holder:not([data-key="${item.key}"]) a`, { scale: 0.98, color: "#8f96a5", duration: 0.5 });
    };

    const handleImageFade = (img) => {
        gsap.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 0.5, onComplete: () => setCurrentImageSrc(hoverImageSrc) });
    };

    return (
        <div className={styles.nav_menu_background} id="menu-link-holder" ref={containerRef}>
            <div className="w-full h-full flex gap-10 px-20 py-14 mt-5">
                <div className="hidden md:block md:relative w-1/2 h-full menu-image-wrapper overflow-hidden z-10">
                    {/* Current Image */}
                    <Image
                        key={currentImageSrc}
                        src={currentImageSrc}
                        alt="Current Image"
                        fill
                        className="object-cover absolute top-0 left-0"
                        style={{ opacity: 1 }}
                    />

                    {/* Hover Image */}
                    {hoverImageSrc && hoverImageSrc !== currentImageSrc && (
                        <Image
                            key={hoverImageSrc}
                            src={hoverImageSrc}
                            alt="Hover Image"
                            fill
                            className="object-cover absolute top-0 left-0"
                            style={{ opacity: 0 }}
                            onLoadingComplete={handleImageFade}
                        />
                    )}
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <ul className="hide-scrollbar">
                        {NAV_MENU_ITEMS.map((item) => (
                            <li
                                key={item.key}
                                className="menu-link-item-holder pb-5"
                                data-key={item.key}
                                onMouseEnter={() => handleNavMenuMouseEnter(item)}
                            >
                                <Link
                                    href={item.href}
                                    className={styles.nav_menu_link_text}
                                    onClick={toggleNavBar}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="text-white font-bold text-md flex items-center gap-2">
                        Follow us on <FaInstagram size={23} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavMenu;
