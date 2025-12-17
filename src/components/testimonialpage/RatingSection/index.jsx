"use client";

import { useRef } from "react";
import RatingCard from "../RatingCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NoiseComponent from "@/components/common/NoiseComponent";

gsap.registerPlugin(ScrollTrigger);

const RatingSection = ({ reviewData }) => {
  const containerRef = useRef(null);
  // const cards = [1, 2, 3, 4, 5]; // Number of RatingCards

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const elements = gsap.utils.toArray(".rating-card");

    elements.forEach((el, index) => {
      const direction = index % 2 === 0 ? -100 : 100;

      gsap.from(el, {
        x: direction,
        opacity: 0,
        duration: 0.8,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  const reviews = reviewData?.reviews;

  return (
    <section ref={containerRef} className="bg-[#0F1116] relative overflow-hidden">
      <NoiseComponent/>
      <div className="container px-10 space-y-4 md:space-y-6">
        {reviews?.length > 0 ? (
          reviews?.map((review, index) => (
            <div
              key={index}
              className={`w-full flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } items-center`}
            >
              <div className="rating-card">
                <RatingCard review={review} />
              </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center md:text-2xl text-base ">
            No Reviews Yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default RatingSection;
