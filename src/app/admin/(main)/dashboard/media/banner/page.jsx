"use client"

import CommonBannerForm from "@/components/admin/_components/common/CommonBannerForm";
import AdminPageLoader from "@/components/common/AdminPageLoader";
import { useGetBookingUsPageContent } from "@/hooks/useGetBookingUsPageContent";
import { useGetMediaPageContent } from "@/hooks/useGetMediaPageContent";
import useUpdateBookingPageComponent from "@/hooks/useUpdateBookingPageComponent";
import { useUpdateMediaBanner } from "@/hooks/useUpdateMediaBanner";
import { toast } from "sonner";

const BannerPage = () => {
    const { data: mediaContent, loading: isLoading, refetch } = useGetMediaPageContent("banner");
    const { handleUpdateMediaBanner, loading: isUpdatingMediaBanner } = useUpdateMediaBanner();
    const onBannerSubmit = async (data) => {
        const payload = {
            type: "banner",
            data,
        };

        await handleUpdateMediaBanner(payload, refetch);
    };

    console.log("Media Content======>", mediaContent);

    if (isLoading) {
        return <AdminPageLoader content={"Loading Media Banner Content"} />
    }
    return (
        <div className="p-3 bg-[#f0f3f8] min-h-screen">
            <div className="flex py-2 justify-between gap-2 items-center">
                <p className="text-black text-xl font-semibold my-4">Media Page Banner Content</p>
            </div>
            <CommonBannerForm defaultValues={mediaContent ?? {}} onSubmitHandler={onBannerSubmit} isLoading={isUpdatingMediaBanner} />
        </div>
    )
}

export default BannerPage;