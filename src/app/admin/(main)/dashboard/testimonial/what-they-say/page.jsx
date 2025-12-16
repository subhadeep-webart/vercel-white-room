"use client";

import WhatTheySayForm from "@/components/admin/_components/testimonial/WhatTheySayForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetTestimonialPageContent } from "@/hooks/useGetTestimonialPageContent";
import { getComponentByType } from "@/utils/helper";

const WhatTheySay = () => {
  const {
    data: whatTheySaySectionContent,
    loading: isTestimonialDataLoading,
    refetch,
  } = useGetTestimonialPageContent();

  const contents = getComponentByType(
    whatTheySaySectionContent,
    "what_they_say"
  );
  console.log("what_they_say", contents);

  console.log({ contents });

  if (isTestimonialDataLoading) {
    return <AdminPageLoader content={"Loading What The Say Section Content"} />;
  }
  return (
    <div className="p-3 bg-[#f0f3f8] min-h-screen">
      <div className="flex py-2 justify-between gap-2 items-center">
        <p className="text-black text-xl font-semibold my-4">
          What They Say Section Content
        </p>
      </div>
      <WhatTheySayForm defaultValues={contents} refetch={refetch} />
    </div>
  );
};

export default WhatTheySay;
