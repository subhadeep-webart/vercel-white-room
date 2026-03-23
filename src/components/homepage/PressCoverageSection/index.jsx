"use client";

import { useRef } from "react";
import CoverageCardSwipper from "./CoverageCardSwipper";
import TickerWrapper from "@/components/common/TickerWrapper";
import { poppins } from "@/lib/font";
import FlippingCard from "./FlippingCard";
import styles from "./coverage.module.scss"

const PressCoverageSection = ({ pressCoverageData }) => {


  const pressCoverages = pressCoverageData?.coverages;

  console.log("Press Coverages======>", pressCoverages);
  return (
    <section className="w-full relative bg-[#0F1116] ">
      <section className="commonBg">
        <div className="flex flex-col">
          <div className="w-full relative z-10 mb-[50px] md:mb-[100px] mt-[100px] md:mt-[200px]">
            <TickerWrapper isRight={true}>
              <h3 className={`${poppins.className} outline_text text-4xl md:text-[150px] text-center uppercase`}>
                {pressCoverageData?.title}
              </h3>
            </TickerWrapper>
          </div>
          <div className="relative container z-0 !py-12 !px-5">
            {/* <div className="w-full overflow-hidden">
              <CoverageCardSwipper coverageData={pressCoverages} />
            </div> */}
            <div className={styles.grid_card}>
              {pressCoverages?.map((item) => (
                <div key={item?._id} className="w-full">
                  <FlippingCard pressCoverages={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default PressCoverageSection;
