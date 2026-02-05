"use client";

import dynamic from "next/dynamic";
import AboutUsSection from "@/components/homepage/AboutUsSection";
const ChooseUsSection = dynamic(
  () => import("@/components/homepage/ChooseUsSection"),
  { ssr: false }
);
import HomePageBannerColapse from "@/components/homepage/HomePageBannerColapse";
import PressCoverageSection from "@/components/homepage/PressCoverageSection";
import WRSection from "@/components/homepage/WRSection";
import { useGetHomePageContent } from "@/hooks/useGetHomePageContent";
import { useGetAboutPageContent } from "@/hooks/useGetAboutPageContent";
import { getComponentByType } from "@/utils/helper";
import TrustedBySection from "@/components/homepage/TrustedBySection";
import Preloader from "@/components/loader/Preloader";
import { useEffect, useState } from "react";
import ArtistSectionContainer from "@/components/homepage/ArtistSection/ArtistSectionContainer";
import { useGetInstagramMedia } from "@/hooks/useGetInstagramMedia";
import InstagramFeedSection from "@/components/homepage/InstagramFeedSection";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { data: homePage, loading: isHomePageLoading } =
    useGetHomePageContent();
  const { data: aboutPage, loading: isAboutPageLoading } =
    useGetAboutPageContent();
  const { instagramMediaData, loading: isInstagramLoading } = useGetInstagramMedia();
  console.log("Home Page====>", homePage);
  const bannerData = getComponentByType(homePage, "banner_section");
  const aboutData = getComponentByType(aboutPage, "about_us");
  const aboutImages = getComponentByType(aboutPage, "about_us_images");
  const pressCoverageData = getComponentByType(homePage, "press-coverage");
  const trustedByData = getComponentByType(homePage, "worked_for");
  const reviewData = getComponentByType(homePage, "review_section");
  const artistSectionData = getComponentByType(homePage, "artist_section");

  useEffect(() => {
    if (!isHomePageLoading && !isAboutPageLoading) {
      setTimeout(() => setIsLoading(false), 800);
    }
  }, [isHomePageLoading, isAboutPageLoading, isInstagramLoading]);

  console.log("Trusted By Data===>", trustedByData);

  return (
    <>
      <Preloader loading={isLoading} />
      <HomePageBannerColapse bannerData={bannerData} />
      <ArtistSectionContainer artistSectionData={artistSectionData} />
      <AboutUsSection aboutData={aboutData} aboutImages={aboutImages} />
      <InstagramFeedSection instagramMediaData={instagramMediaData} />
      <PressCoverageSection
        pressCoverageData={pressCoverageData}
        trustedByData={trustedByData}
      />
      <TrustedBySection trustedByData={trustedByData} />
      <ChooseUsSection reviewData={reviewData} />
    </>
  );
};

export default Home;
