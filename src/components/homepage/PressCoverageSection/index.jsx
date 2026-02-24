"use client";

import { useRef } from "react";
import CoverageCardSwipper from "./CoverageCardSwipper";
import TickerWrapper from "@/components/common/TickerWrapper";

const PressCoverageSection = ({ pressCoverageData }) => {


  const pressCoverages = pressCoverageData?.coverages;

  console.log("Press Coverages======>", pressCoverages);
  return (
    <section className="w-full relative bg-[#0F1116] ">
      <section className="commonBg">
        <div className="py-8 flex flex-col">
          <div className="w-full relative z-10 mb-[100px] mt-[200px]">
            <TickerWrapper isRight={true}>
              <h3 className="outline_text text-4xl md:text-[150px] text-center uppercase">
               {pressCoverageData?.title} &nbsp;  {pressCoverageData?.title} &nbsp;  {pressCoverageData?.title} &nbsp;  {pressCoverageData?.title} &nbsp;  {pressCoverageData?.title} &nbsp;  {pressCoverageData?.title} &nbsp;  {pressCoverageData?.title} &nbsp;
              </h3>
            </TickerWrapper>
          </div>
          <div className="relative container z-0 !py-12">
            <div className="w-full overflow-hidden">
              <CoverageCardSwipper coverageData={pressCoverages} />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default PressCoverageSection;
