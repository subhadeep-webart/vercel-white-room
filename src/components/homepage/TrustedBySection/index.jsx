"use client"
import { useRef } from "react";
import Image from "next/image";
import TickerWrapper from "@/components/common/TickerWrapper";
import { poppins } from "@/lib/font";
const TrustedBySection = ({ trustedByData }) => {
    const scrollRef = useRef(null);
    const sectionRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -250,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 250,
                behavior: "smooth",
            });
        }
    };
    return (
        <section className="w-full relative bg-[#0F1116] commonBg">
            <div className="py-8">
                <div className="mb-[50px] md:mb-[100px] mt-[100px] md:mt-[200px]">
                    <TickerWrapper isRight={false}>
                        <h3 className={`${poppins.className} outline_text text-center uppercase`}>
                            {trustedByData.title}
                        </h3>
                    </TickerWrapper>
                </div>
                <div className="container !py-12">
                    <div className="flex items-start gap-4 mt-4 lg:mt-24">
                        <div
                            ref={scrollRef}
                            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full justify-center items-center"
                            style={{ scrollBehavior: "smooth" }}
                        >
                            {trustedByData?.images?.length > 0 ? (
                                trustedByData?.images?.map((imgSrc, index) => (
                                    <Image
                                        key={index}
                                        src={imgSrc}
                                        alt={`Trusted by logo ${index + 1}`}
                                        width={210}
                                        height={135}
                                        className="flex-shrink-0 object-contain w-[210px] h-[135px]"
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500">No trusted logos available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrustedBySection;