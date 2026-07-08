"use client";
import Preloader from "@/components/loader/Preloader";
import BannerTestimonial from "@/components/testimonialpage/BannerTestimonial";
import RatingSection from "@/components/testimonialpage/RatingSection";
import WhatTheySaySection from "@/components/testimonialpage/WhatTheySaySection";
import { useGetHomePageContent } from "@/hooks/useGetHomePageContent";
import { useGetTestimonialPageContent } from "@/hooks/useGetTestimonialPageContent";
import { getComponentByType } from "@/utils/helper";

const Testimonials = () => {
  const { data: homePage, loading: isHomePageLoading } =
    useGetHomePageContent();
  const reviewData = getComponentByType(homePage, "review_section");
  const { data: testimonialPage, loading: isTestimonialPageLoading } =
    useGetTestimonialPageContent();
  const testimonialBanner = getComponentByType(testimonialPage, "banner");
  const whatTheySay = getComponentByType(testimonialPage, "what_they_say");

  // if(isHomePageLoading || isTestimonialPageLoading) return;

  return (
    <>
      <Preloader loading={isTestimonialPageLoading} />
      <BannerTestimonial testimonialBanner={testimonialBanner} />
      <WhatTheySaySection whatTheySay={whatTheySay} />
      <RatingSection reviewData={reviewData} />
    </>
  );
};

export default Testimonials;
