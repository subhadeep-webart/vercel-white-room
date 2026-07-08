"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaStar } from "react-icons/fa";

const MovingStar = ({ size }) => {
  const starRef = useRef(null);

  // GSAP hover handlers
  const handleMouseEnter = () => {
    gsap.to(starRef.current, {
      scale: 1.3,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(starRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseMove = (e) => {
    const rect = starRef?.current?.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // subtle movement based on cursor position inside the star
    gsap.to(starRef.current, {
      x: x / 10,
      y: y / 10,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={starRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="cursor-pointer"
      style={{ display: "inline-block" }}
    >
      <FaStar size={size} className="neon-purple-stars" />
    </div>
  );
};

export default MovingStar;
