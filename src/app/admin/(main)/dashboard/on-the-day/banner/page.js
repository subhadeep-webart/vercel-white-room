"use client";

import CommonBannerForm from "@/components/admin/_components/common/CommonBannerForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetOnTheDayPageContent } from "@/hooks/useGetOnTheDayPageContent";
import { useUpdateOnTheDayComponent } from "@/hooks/useUpdateOnTheDayComponent";

const BannerPage = () => {
  const {
    data: onTheDayContent,
    loading: isGetOnTheDayLoading,
    refetch,
  } = useGetOnTheDayPageContent("banner");

  const {
    handleUpdateOnTheDayComponent,
    loading: isUpdatingOnTheDayComponent,
  } = useUpdateOnTheDayComponent(refetch);

  const onBannerSubmit = async (data) => {
    const payload = {
      type: "banner",
      data,
    };

    await handleUpdateOnTheDayComponent(payload, refetch);
  };

  if (isGetOnTheDayLoading) {
    return <AdminPageLoader content={"Loading On The Day Banner Content"} />;
  }
  return (
    <div className="p-3 bg-[#f0f3f8] min-h-screen">
      <div className="flex py-2 justify-between gap-2 items-center">
        <p className="text-black text-xl font-semibold my-4">
          On The Day Page Banner Content
        </p>
      </div>
      <CommonBannerForm
        defaultValues={onTheDayContent ?? {}}
        isLoading={isUpdatingOnTheDayComponent}
        onSubmitHandler={onBannerSubmit}
      />
    </div>
  );
};

export default BannerPage;
