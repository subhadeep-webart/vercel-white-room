"use client";

import Preloader from "@/components/loader/Preloader";
import BannerSection from "@/components/onthedaypage/BannerSection";
import WhatToExpectSection from "@/components/onthedaypage/WhatToExpectSection";
import { useGetOnTheDayPageContent } from "@/hooks/useGetOnTheDayPageContent";
import { getComponentByType } from "@/utils/helper";

const OnTheDay = () => {
  const { data: onthedayPage, loading: isOnthedayPageLoading } =
    useGetOnTheDayPageContent();
  const onthedayBanner = getComponentByType(onthedayPage, "banner");
  const onthedayContents = getComponentByType(onthedayPage, "contents");

  // if (isOnthedayPageLoading) return;
  return (
    <>
      <Preloader loading={isOnthedayPageLoading} />
      <BannerSection onthedayBanner={onthedayBanner} />
      <WhatToExpectSection onthedayContents={onthedayContents} />
    </>
  );
};

export default OnTheDay;
