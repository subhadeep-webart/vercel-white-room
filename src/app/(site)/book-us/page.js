"use client";

import dynamic from "next/dynamic";
import { useGetBookingPageContent } from "@/hooks/useGetBookingPageContent";
import { getComponentByType } from "@/utils/helper";

// Dynamically import all components with SSR disabled
const BannerBooking = dynamic(() => import("@/components/bookinguspage/BannerBooking"), { ssr: false });
const BespokeProduction = dynamic(() => import("@/components/bookinguspage/BespokeProduction"), { ssr: false });
const ForLargerShows = dynamic(() => import("@/components/bookinguspage/ForLargerShows"), { ssr: false });
const OptionalAddOns = dynamic(() => import("@/components/bookinguspage/OptionalAddOns"), { ssr: false });
const TheBookingProcess = dynamic(() => import("@/components/bookinguspage/TheBookingProcess"), { ssr: false });
const WhatDoYouGet = dynamic(() => import("@/components/bookinguspage/WhatDoYouGet"), { ssr: false });

const BookingUs = () => {
  const { data: bookingPage } = useGetBookingPageContent();
  const bookingBanner = getComponentByType(bookingPage, "banner");
  const bookingProcess = getComponentByType(bookingPage, "booking_process");
  const getWithBoking = getComponentByType(bookingPage, "get_with_booking");
  const optionalAddOn = getComponentByType(bookingPage, "optional_add_on");
  const largerShows = getComponentByType(bookingPage, "larger_shows");
  const spokeProduction = getComponentByType(bookingPage, "spoke_production");

  return (
    <>
      <BannerBooking bookingBanner={bookingBanner} />

      <TheBookingProcess bookingPage={bookingPage} bookingProcess={bookingProcess} />

      <WhatDoYouGet getWithBoking={getWithBoking} />

      <OptionalAddOns optionalAddOn={optionalAddOn} />

      <ForLargerShows largerShows={largerShows} />

      <BespokeProduction spokeProduction={spokeProduction} />
    </>
  );
};

export default BookingUs;
