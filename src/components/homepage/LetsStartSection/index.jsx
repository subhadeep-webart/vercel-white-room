"use client";

import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const LetsStartSection = () => {
  const sectionRef = useRef(null);
  const letsRef = useRef(null);
  const startRef = useRef(null);
  const journeyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        letsRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: letsRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        startRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: startRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        journeyRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.6,
          scrollTrigger: {
            trigger: journeyRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="bg-black h-full p-8 md:p-20" ref={sectionRef}>
        <div className="flex justify-center items-center mb-10 md:mb-20">
          <Image
            src="/assets/icons/logo-1.svg"
            alt="Logo"
            width={311}
            height={175}
            className="w-[150px] md:w-[311px] h-auto"
          />
        </div>

        <div className="text-white font-bold">
          <p className="text-4xl md:text-9xl mb-6 md:mb-20" ref={letsRef}>
            LETS
          </p>
          <p
            className="text-4xl md:text-9xl mb-6 md:mb-20 pl-[60px] md:pl-[250px]"
            ref={startRef}
          >
            START
          </p>
          <p
            className="text-4xl md:text-9xl whitespace-nowrap pl-[118px] md:pl-[550px]"
            ref={journeyRef}
          >
            THE JOURNEY
          </p>
        </div>
      </section>
    </>
  );
};

export default LetsStartSection;
